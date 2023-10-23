import React, {
  useCallback,
  useEffect,
  useState
}                                 from 'react'
import {
  FORMAT_CURRENCY_STANDARD,
  IFieldsRefs,
  required,
  useValidation
}                                 from '../../../../../validation'
import {
  formatPrice,
  toNumberFixed
}                                 from '../../../../utils/Utils'
import { Paper }                  from '../../../../../components/Paper'
import InputTextWithValidation    from '../../../../../components/withValidation/InputTextWithValidation'
import SelectTextWithValidation   from '../../../../../components/withValidation/SelectTextWithValidation'
import DialogButtonsSaveUpdate    from '../../../_common/DialogButtonsSaveUpdate'
import { faHandHoldingUsd }       from '@fortawesome/free-solid-svg-icons'
import _, { get as _get }         from 'lodash'
import { TExpenseItem }           from '../../../../../graphql/type_logic/types'
import {
  DialogModalRootComponent,
  EasyDialogApolloProvider
}                                 from '../../../../../components/EasyModel/EasyModal'
import { CenteredDialog }         from '../../../../../components/Dialog/DialogBasic'
import { FOCUS_ID }               from '../../../../constants/FocusElementIDs'
import { useVats }                from '../../../../../store/vats/useVats'
import { useTranslationFunction } from '../../../../../components/Translation/useTranslation'

interface ICalculationExpensesAddEditRenderProps {
  successFunction : (cost : TExpenseItem) => void
  closeDialog? : () => void
}

interface IExpenseFormState {
  financeVP : string
  financeMP : string
  tax : string
  description? : string
  finance? : string
  noVat? : boolean
}

const ExpensesForm = ({successFunction, closeDialog} : ICalculationExpensesAddEditRenderProps) => {

  const {translate} = useTranslationFunction()
  const validation = useValidation<IExpenseFormState>()
  const [focusElement, setFocusElement] : [IFieldsRefs, (r : IFieldsRefs) => void] = useState({} as IFieldsRefs)

  const handlerCancelDialog = () => {
    closeDialog && closeDialog()
  }

  const {state : valState, setFieldValue, setFieldError, getFieldRef} = validation

  const {data : vats, getVat} = useVats()

  useEffect(() => {
    if (focusElement.ref && focusElement.ref.current) {
      focusElement.ref.current.focus()
      focusElement.ref.current.select()
    }
  }, [focusElement])

  const vatsOptions = React.useMemo(() => {
    let vatData : any = []
    if (vats && vats.length !== 0) {
      vatData = vats.map((vat : any) => {
        const vatValue = vat.values[0]
        return {
          label : `${ vat.short } ${ formatPrice(vatValue.value) } %`,
          value : `${ vat.id }`
        }
      })
    }
    return [
      ...vatData
    ]
  }, [vats])

  useEffect(() => {
    setFieldValue('tax', vatsOptions.length > 0 ? vatsOptions[0].value : '1', false)
  }, [vatsOptions, setFieldValue])

  const handlerOnSubmit = async () => {
    const {error, data, refs, validations} = await validation.validate()
    if (error) {
      const fieldRef : IFieldsRefs | undefined = refs.find(({field}) => _get(validations, `validations.${ field }.error`))
      fieldRef && fieldRef.ref.current.focus()
      return
    }
    if (toNumberFixed(data.financeMP) === 0 || toNumberFixed(data.financeVP) === 0) {
      await setFieldError('financeMP', translate('EXPENSE_FORM_VALIDATION_MESSAGE'))
      handlerSetFocus('financeMP')
      return
    }

    const _data = {
      financeMP : toNumberFixed(data.financeMP),
      taxId : Number(data.tax),
      description : data.description ? data.description : void(0)
    } as any
    successFunction(_data)
    closeDialog && closeDialog()
  }

  const calcFinance = useCallback((noVat : boolean = false, val : number) => {
    const {value} = getVat(valState.tax)
    if (val === 0) {
      return formatPrice(0)
    }
    if (noVat) {
      const taxFinance = _.round(_.divide(_.multiply(val, toNumberFixed(value)), 100), 2)
      return formatPrice(_.round(_.add(toNumberFixed(val), taxFinance), 2))
    } else {
      const taxFinance = _.round(_.divide(val, _.divide(_.add(100, Number(value)), Number(value))), 2)
      return formatPrice(_.round(_.subtract(val, taxFinance), 2))
    }
  }, [valState, getVat])

  const handlerSetFocus = useCallback((name : string) => {
    const fieldRef = getFieldRef(name)
    fieldRef && setFocusElement({...fieldRef})
  }, [getFieldRef])

  const handlerChangeTaxValue = useCallback((e : any) => {
    handlerSetFocus('financeMP')
  }, [valState, handlerSetFocus])

  useEffect(() => {
    if (!valState.tax || !valState.finance) {
      setFieldValue('financeMP', '0.00', false)
      setFieldValue('financeVP', '0.00', false)
      if (!focusElement) {
        handlerSetFocus('tax')
        return
      }
      return
    }
    const _fin = toNumberFixed(valState.finance)
    if (valState.noVat) {
      setFieldValue('financeMP', calcFinance(true, _fin) as any, false)
    } else {
      setFieldValue('financeVP', calcFinance(false, _fin) as any, false)
    }
  }, [valState.tax, valState.finance, valState.noVat, setFieldValue])

  const handleChangeWithVat = useCallback((e : any) => {
    const val = toNumberFixed(e.target.value)
    setFieldValue('finance', val as any, false)
    setFieldValue('noVat', false as any, false)
  }, [setFieldValue])

  const handleChangeNoVat = useCallback((e : any) => {
    const val = toNumberFixed(e.target.value)
    setFieldValue('finance', val as any, false)
    setFieldValue('noVat', true as any, false)
  }, [setFieldValue])

  return (
    <Paper className={ 'd-flex flex-column hw-paper' } header={ translate('LABEL_EXPENSES') }>
      <div className={ 'd-flex flex-column hw-client-form-add-contact-form relative' }>
        <div className={ 'container' }>
          <div className={ 'col-4' }>
            <SelectTextWithValidation
                            label={ translate('LABEL_TAX') }
                            helperText={ translate('HELPER_TEXT_CHOOSE_TAX') }
                            lined
                            focusOnMount
                            options={ vatsOptions }
                            onChange={ handlerChangeTaxValue }
                            validation={ {
                              useValidation : validation,
                              model : 'tax',
                              rule : {
                                required: required({message: translate('REQUIRED_FIELD')})
                              }
                            } }
            />
          </div>
          <div className={ 'col-4' }>
            <InputTextWithValidation
                            label={ translate('EXPENSE_FORM_INPUT_LABEL_FINANCE_VP') }
                            helperText={ translate('ENTER_VALUE') }
                            align={ 'align-right' }
                            lined
                            selectOnFocus
                            onChange={ handleChangeNoVat }
                            validation={ {
                              useValidation : validation,
                              model : 'financeVP',
                              format : {
                                rule : {
                                  ...FORMAT_CURRENCY_STANDARD
                                },
                                validationMessage : 'Enter valid finance'
                              }
                            } }
            />
          </div>
          <div className={ 'col-4' }>
            <InputTextWithValidation
                            label={ translate('EXPENSE_FORM_INPUT_LABEL_FINANCE_MP') }
                            helperText={ translate('ENTER_VALUE') }
                            align={ 'align-right' }
                            lined
                            selectOnFocus
                            onChange={ handleChangeWithVat }
                            validation={ {
                              useValidation : validation,
                              model : 'financeMP',
                              format : {
                                rule : {
                                  ...FORMAT_CURRENCY_STANDARD
                                },
                                validationMessage : 'Enter valid finance'
                              }
                            } }
            />
          </div>
          <div className={ 'col-md-12 ' }>
            <InputTextWithValidation
                            label={ translate('LABEL_DESCRIPTION') }
                            lined
                            fullWidth
                            validation={ {
                              useValidation : validation,
                              model : 'description',
                              rule : {
                                required: required({message: translate('REQUIRED_FIELD')})
                              }
                            } }
                            maxLength={ 32 }
            />
          </div>

          <DialogButtonsSaveUpdate
                        cancelFun={ handlerCancelDialog }
                        submitFun={ handlerOnSubmit }
                        icon={ faHandHoldingUsd }
          />
        </div>
      </div>
    </Paper>
  )
}

export default ExpensesForm

export const openDialogInvoiceExpenses = (handlerSuccessFunction : (extraExpense : TExpenseItem) => void) => {
  EasyDialogApolloProvider((closeDialog : () => any, openDialog : (data : any) => any) => {
    openDialog(<DialogModalRootComponent name={ 'open-invoice-expenses-84938059' } closeFn={ closeDialog }>
      <CenteredDialog
                closeAction={ closeDialog }
                Component={ ExpensesForm }
                componentRenderProps={ {
                  closeDialog : closeDialog,
                  successFunction : handlerSuccessFunction
                } }
      />
    </DialogModalRootComponent>)
  }, FOCUS_ID.INVOICE.EXPENSES_FORM.ADD_BUTTON)
}
