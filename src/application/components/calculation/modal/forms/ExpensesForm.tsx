import React, {
  useCallback,
  useEffect,
  useState
} from 'react'
import {
  FORMAT_CURRENCY_STANDARD,
  IFieldsRefs,
  required,
  useValidation
} from '../../../../../validation'
import {
  formatPrice,
  toNumberFixed
}                               from '../../../../utils/Utils'
import { Paper }                from '../../../../../components/Paper'
import InputTextWithValidation  from '../../../../../components/withValidation/InputTextWithValidation'
import SelectTextWithValidation from '../../../../../components/withValidation/SelectTextWithValidation'
import DialogButtonsSaveUpdate  from '../../../_common/DialogButtonsSaveUpdate'
import { faHandHoldingUsd }     from '@fortawesome/free-solid-svg-icons'
import {
  IHeaderDocumentState,
  IInvoiceExpense
}                               from '../DocumentHeaderForm'
import _                        from 'lodash'
import { useVats }              from '../../../../../store/vats/useVats'

interface ICalculationExpensesAddEditRenderProps {
  successFunction : (cost : IInvoiceExpense) => void
  closeDialog ?: () => void
  state : IHeaderDocumentState
}

interface IExpenseFormState {
  financeVP : string
  financeMP : string
  tax : string
  description ?: string
  finance ?: string
  noVat ?: boolean
}

const ExpensesForm = ({successFunction, closeDialog, state} : ICalculationExpensesAddEditRenderProps) => {

  const validation = useValidation<IExpenseFormState>()
  const [focusElement, setFocusElement] : [IFieldsRefs, (r : IFieldsRefs) => void] = useState({} as IFieldsRefs)
  const {invoiceExpenses} = state
  const handlerCancelDialog = () => {
    closeDialog && closeDialog()
  }
  
  const {state: valState,setFieldValue,getFieldRef} = validation

  const {data: vats,getVat} = useVats()

  const currentVats = React.useMemo(() => !invoiceExpenses ? vats : vats && vats.filter(x => !invoiceExpenses.find(tax => `${tax.tax}` === `${x.id}`)), [invoiceExpenses,vats])
  const vatsOptions = React.useMemo(() => {
    let vatData : any = []
    if (vats && vats.length !== 0) {
      vatData = currentVats.map((vat : any) => {
        const vatValue = vat.values[0]
        return {
          label: `${vat.short} ${formatPrice(vatValue.value)} %`,
          value: `${vat.id}`
        }
      })
    }
    return [
      ...vatData
    ]
  }, [vats, currentVats])

  useEffect(() => {
    if (focusElement.ref && focusElement.ref.current) {
      focusElement.ref.current.focus()
      focusElement.ref.current.select()
    }
  }, [focusElement])

  const handlerSetFocus = useCallback((name: string) => {
    const fieldRef = getFieldRef(name)
    fieldRef && setFocusElement({...fieldRef})
  },[getFieldRef])


  useEffect(() => {
    setFieldValue('tax', vatsOptions.length > 0 ? vatsOptions[0].value : '1', false)
  }, [vatsOptions,setFieldValue])

  const handlerOnSubmit = async () => {
    const {error, data} = await validation.validate()
    if (error) {
      return
    }

    const _data = {
      financeMP: toNumberFixed(data.financeMP),
      financeVP: toNumberFixed(data.financeVP),
      tax: Number(data.tax),
      description: data.description ? data.description : void(0)
    } as any
    successFunction(_data)
    closeDialog && closeDialog()
  }

  const calcFinance = useCallback((noVat : boolean = false,val : number) => {
    const {value} = getVat(valState.tax)
    if (noVat) {
      const taxFinance = _.round(_.divide(_.multiply(val,toNumberFixed(value)),100),2)
      return formatPrice(_.round(_.add(toNumberFixed(val),taxFinance),2))
    } else {
      const taxFinance = _.round(_.divide(val,_.divide(_.add(100, Number(value)),Number(value))), 2)
      return formatPrice(_.round(_.subtract(val,taxFinance),2))
    }
  },[valState])

  const handlerChangeTaxValue = useCallback((e : any) => {
    // setFieldValue('tax',e.target.value,false)
   // const finVP = calculateFinances(false,toNumberFixed(valState.finance || 0),Number(e.target.value))
    handlerSetFocus('financeMP')
  },[valState,handlerSetFocus])
  
  useEffect(() => {
    if (!valState.tax || !valState.finance) {
      setFieldValue('financeMP','0.00',false)
      setFieldValue('financeVP','0.00',false)
      if (!focusElement) {
        handlerSetFocus('tax')
        return
      }
      handlerSetFocus('financeMP')
      return
    }
    const _fin = toNumberFixed(valState.finance)
    if (valState.noVat) {
      setFieldValue('financeMP',calcFinance(true,_fin) as any,false)
    } else {
      setFieldValue('financeVP', calcFinance(false, _fin) as any, false)
    }
  },[valState.tax, valState.finance, valState.noVat, setFieldValue])

  const handleChangeWithVat = useCallback((e : any) => {
    const val = toNumberFixed(e.target.value)
    setFieldValue('finance',val as any,false)
    setFieldValue('noVat',false as any,false)
  },[setFieldValue])
  
  const handleChangeNoVat = useCallback((e : any) => {
    const val = toNumberFixed(e.target.value)
    setFieldValue('finance',val as any,false)
    setFieldValue('noVat',true as any,false)
  },[setFieldValue])

  return (
    <Paper className={'d-flex flex-column hw-paper'} header={'Expenses'}>
      <div className={'d-flex flex-column hw-client-form-add-contact-form relative'}>
        <div className={'container'}>
          <div className={'col-4'}>
            <SelectTextWithValidation
                            label={'Tax'}
                            helperText={'choose tax'}
                            lined
                            focusOnMount
                            options={vatsOptions}
                            onChange={handlerChangeTaxValue}
                            validation={{
                              useValidation: validation,
                              model: 'tax',
                              rule: {
                                required,
                              }
                            }}
            />
          </div>
          <div className={'col-4'}>
            <InputTextWithValidation
                label={'Finance no vat'}
                helperText={'enter value'}
                align={'align-right'}
                lined
                onChange={handleChangeNoVat}
                validation={{
                  useValidation: validation,
                  model: 'financeVP',
                  format: {
                    rule: {
                      ...FORMAT_CURRENCY_STANDARD
                    },
                    validationMessage: 'Enter valid finance'
                  }
                }}
            />
          </div>
          <div className={'col-4'}>
            <InputTextWithValidation
                            label={'Finance with vat'}
                            helperText={'enter value'}
                            align={'align-right'}
                            lined
                            onChange={handleChangeWithVat}
                            validation={{
                              useValidation: validation,
                              model: 'financeMP',
                              format: {
                                rule: {
                                  ...FORMAT_CURRENCY_STANDARD
                                },
                                validationMessage: 'Enter valid finance'
                              }
                            }}
            />
          </div>
          <div className={'col-md-12 '}>
            <InputTextWithValidation
                            label={'Description'}
                            lined
                            fullWidth
                            validation={{
                              useValidation: validation,
                              model: 'description'
                            }}
                            maxLength={32}
            />
          </div>

          <DialogButtonsSaveUpdate
                        cancelFun={handlerCancelDialog}
                        submitFun={handlerOnSubmit}
                        icon={faHandHoldingUsd}
          />
        </div>
      </div>
    </Paper>
  )
}

export default ExpensesForm
