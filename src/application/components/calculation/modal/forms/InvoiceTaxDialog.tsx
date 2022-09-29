import React, { useEffect }     from 'react'
import {
  FORMAT_CURRENCY_STANDARD,
  IFieldsRefs,
  required,
  useValidation
} from '../../../../../validation'
import { Paper }                from '../../../../../components/Paper'
import InputTextWithValidation  from '../../../../../components/withValidation/InputTextWithValidation'
import SelectTextWithValidation from '../../../../../components/withValidation/SelectTextWithValidation'
import DialogButtonsSaveUpdate  from '../../../_common/DialogButtonsSaveUpdate'
import { faPercent }            from '@fortawesome/free-solid-svg-icons'
import {
  IHeaderDocumentState,
  IInvoiceTax
}                               from '../DocumentHeaderForm'
import _                        from 'lodash'
import {
  formatPrice,
  toNumberFixed
}                               from '../../../../utils/Utils'
import { InputText }            from '../../../../../components/InputText'
import { useVats }              from '../../../../../store/vats/useVats'

interface ICalculationInvoiceTaxesAddRenderProps {
  successFunction : (tax : IInvoiceTax) => void
  closeDialog ?: () => void
  state : IHeaderDocumentState
  totalToAddTax : number
}

const InvoiceTaxDialog = ({successFunction, closeDialog, state} : ICalculationInvoiceTaxesAddRenderProps) => {

  const validation = useValidation<IInvoiceTax>()

  const {invoiceTaxes} = state

  const {state:_state,setFieldValue, setFieldError, getFieldRef} = validation

  const handlerCancelDialog = () => {
    closeDialog && closeDialog()
  }

  const {data: vats,getVat} = useVats()

/*  const needForTax = React.useMemo(() => {
    return _.round(_.subtract(getCalculationFinanceAfterDiscount(state), getTotalAddedTaxPerInvoice(state)), 2)
  }, [state])*/

  const currentVats = React.useMemo(() => !invoiceTaxes ? vats : vats && vats.filter(x => !invoiceTaxes.find(tax => `${tax.taxId}` === `${x.id}`)), [vats, invoiceTaxes])
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
    setFieldValue('taxId', vatsOptions.length > 0 ? vatsOptions[0].value : '1', false)
  }, [vatsOptions,setFieldValue])

  const handlerOnSubmit = async () => {
    const {error, data, refs, validations} = await validation.validate()
    if (error) {
      const fieldRef: IFieldsRefs | undefined = refs.find(({field}) => _.get(validations, `validations.${field}.error`))
      fieldRef && fieldRef.ref.current.focus()
      return
    }
    const {value} = getVat(data.taxId)
    if (!value) {
      return
    }
    const financeVP = _.round(_.subtract(toNumberFixed(_state.financeMP),toNumberFixed(_state.finance)),2)
    const taxFinance = _.round(_.divide(_.multiply(financeVP,value),100),2)
    if (toNumberFixed(_state.finance) !== taxFinance) {
      setFieldError('taxId','Tax is not valid.')
      const fieldRef = getFieldRef('taxId')
      fieldRef && fieldRef.ref &&  fieldRef.ref.current.focus()
      return
    }
    const _data = {
      financeMP: `${toNumberFixed(data.financeMP as any)}`,
      finance: `${toNumberFixed(data.finance as any)}`,
      taxId: data.taxId
    } as any
    successFunction(_data)
    closeDialog && closeDialog()
  }

  const financeNoVat = React.useMemo(() => {
    if (!_state || !_state.finance || !_state.taxId || !_state.financeMP) {
      return 0
    }
    return _.round(_.subtract(toNumberFixed(_state.financeMP),toNumberFixed(_state.finance)),2)
  },[_state])

  return (
    <Paper className={'d-flex flex-column hw-paper'} header={'Vats'}>
      <div className={'d-flex flex-column hw-client-form-add-contact-form'}>
        <div className={'container'}>
          <div className={'col-3'}>
            <SelectTextWithValidation
                            label={'Tax'}
                            helperText={'choose tax'}
                            lined
                            options={vatsOptions}
                            validation={{
                              useValidation: validation,
                              model: 'taxId',
                              rule: {
                                required,
                              }
                            }}
            />
          </div>
          <div className={'col-3'}>
            <InputText
                label={'Finance No Vat'}
                align={'align-right'}
                lined
                readOnly
                disabled
                value={formatPrice(financeNoVat)}
            />
          </div>
          <div className={'col-3'}>
            <InputTextWithValidation
                            label={'Vat'}
                            helperText={'enter value'}
                            align={'align-right'}
                            lined
                            focusOnMount={true}
                            validation={{
                              useValidation: validation,
                              model: 'finance',
                              rule: {
                                required
                              },
                              format: {
                                rule: {
                                  ...FORMAT_CURRENCY_STANDARD
                                },
                                validationMessage: 'Enter valid finance'
                              }
                            }}
            />
          </div>
          <div className={'col-3'}>
            <InputTextWithValidation
                label={'Finance with vat'}
                helperText={'enter value'}
                align={'align-right'}
                lined
                focusOnMount={true}
                validation={{
                  useValidation: validation,
                  model: 'financeMP',
                  rule: {
                    required
                  },
                  format: {
                    rule: {
                      ...FORMAT_CURRENCY_STANDARD
                    },
                    validationMessage: 'Enter valid finance'
                  }
                }}
            />
          </div>
          <DialogButtonsSaveUpdate
                        cancelFun={handlerCancelDialog}
                        submitFun={handlerOnSubmit}
                        icon={faPercent}
          />
        </div>
      </div>
    </Paper>
  )
}

export default InvoiceTaxDialog
