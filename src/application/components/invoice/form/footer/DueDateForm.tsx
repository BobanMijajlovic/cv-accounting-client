import React, { useEffect }     from 'react'
import { Paper }                from '../../../../../components/Paper'
import DatePickerWithValidation from '../../../../../components/withValidation/DatePickerWithValidation'
import {
  FORMAT_CURRENCY_STANDARD,
  IFieldsRefs,
  required,
  useValidation
}                               from '../../../../../validation'
import InputTextWithValidation  from '../../../../../components/withValidation/InputTextWithValidation'
import {
  formatPrice,
  toNumberFixed
}                               from '../../../../utils/Utils'
import DialogButtonsSaveUpdate  from '../../../_common/DialogButtonsSaveUpdate'
import { faCalendarAlt }        from '@fortawesome/free-solid-svg-icons'
import { IDueDateRecord }       from '../../../calculation/modal/DocumentHeaderForm'
import _, { get as _get }       from 'lodash'
import {
  DialogModalRootComponent,
  EasyDialogApolloProvider
}                               from '../../../../../components/EasyModel/EasyModal'
import { CenteredDialog }       from '../../../../../components/Dialog/DialogBasic'
import {
  TInvoice,
  TDueDates,
  TInvoiceFooter,
  TProformaInvoice
}                                 from '../../../../../graphql/type_logic/types'
import {
  getInvoiceFinanceMP,
  getInvoiceFooterAdditionalExpenseFinance,
  getInvoiceTotalAddedDueDates
}                                 from '../../util'
import { useTranslationFunction } from '../../../../../components/Translation/useTranslation'

interface IInvoiceDueDateFormProps {
  cancelFunction ?: () => void
  successFunction : (dueDate : IDueDateRecord) => void
  state : TInvoiceFooter
  invoice : TInvoice | TProformaInvoice
}

const DueDateForm = ({cancelFunction, successFunction, state, invoice} : IInvoiceDueDateFormProps) => {
  const { translate } = useTranslationFunction()
  const validation = useValidation<IDueDateRecord>()
  const handlerCancelDialog = () => {
    cancelFunction && cancelFunction()
  }
  
  const { setFieldValue } = validation

  const totalExpenseFinance = React.useMemo(() => getInvoiceFooterAdditionalExpenseFinance(invoice.expense as any),[invoice])
  const totalToAdd = React.useMemo(() => {
    return _.round(_.subtract(_.add(getInvoiceFinanceMP(invoice.items as any),totalExpenseFinance), getInvoiceTotalAddedDueDates(state.dueDates as any)), 2)
  }, [invoice.items,state.dueDates,totalExpenseFinance])
    
  useEffect(() => {
    setFieldValue('finance',`${formatPrice(totalToAdd)}`,false)
  },[totalToAdd, setFieldValue])

  const handlerOnSubmit = async () => {
    const {error, data, refs, validations} = await validation.validate()
    if (error) {
      const fieldRef : IFieldsRefs | undefined = refs.find(({field}) => _get(validations, `validations.${field}.error`))
      fieldRef && fieldRef.ref.current.focus()
      return
    }
    
    if (toNumberFixed(data.finance) <= 0) {
      return 
    }
      
    const _data = {
      ...data,
      dueDate: data.date,
      finance: `${toNumberFixed(data.finance as string)}`
    } as any
    successFunction(_data)
    cancelFunction && cancelFunction()
  }

  return (
    <Paper className={'d-flex flex-column hw-paper'} header={translate('DUE_DATE_VIEW_TH_DUE_DATE')}>
      <div className={'d-flex justify-content-start align-items-center'}>
        <div className={'font-smaller-5 color-primary text-upper'}>
          { translate('INVOICE_DUE_DATE_FROM_TOTAL_TO_ADD') }
        </div>
        <div className={'font-smaller-2 color-primary text-upper ml-2'}>
          {formatPrice(totalToAdd)}
        </div>
      </div>
      <div className={'d-flex flex-column hw-invoice-due-date-form-root'}>
        <div className={'container'}>
          <div className={'col-6'}>
            <DatePickerWithValidation
                            required
                            label={translate('LABEL_DATE')}
                            format={'dd-MM-yyyy'}
                            lined
                            helperText={translate('HELPER_TEXT_DATE')}
                            fullWidth
                            min-date={new Date(invoice.date)}
                            validation={{
                              useValidation: validation,
                              model: 'date',
                              rule: {
                                required: required({message: translate('REQUIRED_FIELD')})
                              }
                            }}
            />
          </div>
          <div className={'col-6'}>
            <InputTextWithValidation
                            required
                            align={'align-right'}
                            focusOnMount
                            selectOnFocus
                            label={translate('DUE_DATE_VIEW_TH_FINANCE')}
                            lined
                            helperText={translate('INVOICE_DUE_DATE_FORM_FINANCE_HELPER_TEXT')}
                            fullWidth
                            validation={{
                              useValidation: validation,
                              model: 'finance',
                              rule: {
                                required: required({message: translate('REQUIRED_FIELD')})
                              },
                              format: {
                                rule: {
                                  ...FORMAT_CURRENCY_STANDARD,
                                  ...{
                                    decimalPlace: 2
                                  }
                                }
                              }
                            }}
            />
          </div>

          <DialogButtonsSaveUpdate
                        cancelFun={handlerCancelDialog}
                        submitFun={handlerOnSubmit}
                        icon={faCalendarAlt}
          />
        </div>
      </div>
    </Paper>
  )
}

export default DueDateForm

interface IOpenDialogDueDateProps {
  handlerSuccess : (dueDate : TDueDates) => void,
  state : TInvoiceFooter
  invoice : TInvoice | TProformaInvoice
}

export const openDialogInvoiceDueDate = ({handlerSuccess, state,invoice} : IOpenDialogDueDateProps) => {
  EasyDialogApolloProvider((closeDialog : () => any, openDialog : (data : any) => any) => {
    openDialog(<DialogModalRootComponent name={'dialog-invoice-due-date-form-45654317213'} closeFn={closeDialog}>
      <CenteredDialog
                closeAction={closeDialog}
                Component={DueDateForm}
                componentRenderProps={{
                  cancelFunction: closeDialog,
                  successFunction: handlerSuccess,
                  state,
                  invoice
                }}
      />
    </DialogModalRootComponent>)
  })
}
