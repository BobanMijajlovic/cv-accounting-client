import React, { useEffect }          from 'react'
import {
  IAdditionalExpense,
  IDueDateRecord
}                                    from '../../../calculation/modal/DocumentHeaderForm'
import {
  IUseOptimizeEventData,
  useOptimizeEventClick
}                                    from '../../../../../components/hooks/useOptimizeEventClick'
import {
  IFieldsRefs,
  useValidation
}                                    from '../../../../../validation'
import ValidationGlobalError         from '../../../../../components/Error/ValidationGlobalError'
import DialogButtonsSaveUpdate       from '../../../_common/DialogButtonsSaveUpdate'
import {
  faFileInvoiceDollar,
  faPercentage
}                                    from '@fortawesome/free-solid-svg-icons'
import { CONSTANT_CALCULATION }      from '../../../../constants'
import {
  TExpenseItem,
  TInvoice,
  TInvoiceFooter
}                                    from '../../../../../graphql/type_logic/types'
import { get as _get }               from 'lodash'
import {
  DialogModalRootComponent,
  EasyDialogApolloProvider
}                                    from '../../../../../components/EasyModel/EasyModal'
import { CenteredDialog }            from '../../../../../components/Dialog/DialogBasic'
import { useInvoiceForm }            from '../../../../../store/invoice/useInvoice'
import InputTextWithValidation       from '../../../../../components/withValidation/InputTextWithValidation'
import {
  formatPrice,
  toNumberFixed
}                                    from '../../../../utils/Utils'
import InvoiceExpenses               from './InvoiceExpenses'
import { openDialogInvoiceExpenses } from './ExpensesForm'
import { InvoiceType }               from '../../../../../graphql/graphql'
import { processErrorGraphQL }       from '../../../../../apollo'
import TextAreaWithValidation        from '../../../../../components/withValidation/TextAreaWithValidation'
import { useTranslationFunction }    from '../../../../../components/Translation/useTranslation'

export interface IInvoiceFooterFormState {
  dueDates: IDueDateRecord[],
  additionalExpenses?: IAdditionalExpense[]
  discount?: string
}

interface IInvoiceFooterFormProps {
  successFunction: (invoice: InvoiceType)=> Promise<any>
  cancelFunction?: ()=> void
  invoiceId: string
}

const InvoiceFooterForm = ({ cancelFunction, successFunction, invoiceId }: IInvoiceFooterFormProps) => {

  const { translate } = useTranslationFunction()
  const validation = useValidation<TInvoiceFooter>()

  const { errorGlobal, state, setFieldValue, addArrayData, removeArrayData, resetValidations } = validation
  const { additionalExpense } = state
  const { invoice } = useInvoiceForm(invoiceId)

  useEffect(() => {
    if (!invoice) {
      return
    }

    if (invoice?.expense && (invoice.expense as any).length !== 0) {
      setFieldValue('additionalExpense', invoice?.expense as any, false)
    }

    if (invoice?.discount && (invoice.discount as any).length !== 0) {
      setFieldValue('discountFooter', `${formatPrice((invoice.discount as any)[0].percent as any)}`, false)
    }

    if (invoice?.notes && (invoice.notes as any).length !== 0) {
      setFieldValue('note', (invoice.notes as any)[0].note, false)
    }

  }, [invoice, setFieldValue])

  const addExtraExpense = async (additionalExpense: TExpenseItem) => {
    await validation.resetValidations()
    await addArrayData('additionalExpense', { items: [additionalExpense] })
  }

  const addNewInvoiceExpenses = () => {
    openDialogInvoiceExpenses(addExtraExpense)
  }

  const { onClickHandler } = useOptimizeEventClick({
    eventHandler (data: IUseOptimizeEventData) {

      if (data.action === CONSTANT_CALCULATION.EVENTS.HEADER.INVOICE_EXPENSE_REMOVE) {
        resetValidations()
        removeArrayData('additionalExpense', Number(data.id))
        return
      }

      if (data.action === 'validation-error-clear') {
        resetValidations()
        return
      }
    }
  })

  const handlerSubmit = async () => {
    const { error, data, validations, refs } = await validation.validate()

    if (error || errorGlobal) {
      const fieldRef: IFieldsRefs | undefined = refs.find(({ field }) => _get(validations, `validations.${field}.error`))
      fieldRef && fieldRef.ref.current.focus()
      return
    }

    const _data = {
      footer: {
        additionalExpense: data.additionalExpense && data.additionalExpense.length !== 0 ? data.additionalExpense.map((expense) => {
          return {
            items: expense.items.map(item => {
              return {
                taxId: Number(item.taxId),
                financeMP: toNumberFixed(item.financeMP),
                description: item.description
              }
            })
          }
        }) : [],
        discount: data.discountFooter ? [
          {
            percent: toNumberFixed(data.discountFooter as any),
            description: 'whole invoice discount'
          }
        ] : [
          {
            percent: 0,
            description: 'whole invoice discount'
          }
        ],
        notes: data.note ? [{
          note: data.note
        }] : []
      }
    } as any

    successFunction(_data).then(() => {
      cancelFunction && cancelFunction()
    })
      .catch((e) => {
        /** process the error **/
        processErrorGraphQL(e, validation)
      })

  }

  const handleCancelFunction = () => {
    cancelFunction && cancelFunction()
  }

  return (
    <div data-action-root onClick={onClickHandler} className={'container relative hw-invoice-footer-form-root  shadow-lg px-3 pt-4 pb-3'}>

      {errorGlobal ? <ValidationGlobalError error={errorGlobal} classNames={'font-smaller-3'}/> : null}

      <div className={'d-flex justify-content-between align-items-center w-100 pt-2'}>
        <div className={'hw-invoice-header-form-discount-div'}>
          <InputTextWithValidation
            required
            label={translate('LABEL_DISCOUNT')}
            helperText={''}
            classNames={'lined-version'}
            fullWidth
            focusOnMount
            selectOnFocus
            iconAction={{
              icon: faPercentage
            }}
            align={'align-right'}
            validation={{
              useValidation: validation,
              model: 'discountFooter',
              format: {
                rule: {
                  format: 'CURRENCY',
                  decimalChar: '.',
                  decimalPlace: 2,
                  maxValue: 99.99
                },
                validationMessage: 'Enter valid value'
              }
            }}
          />
        </div>
        <div className={'flex-2 pl-5 ml-3'}>
          <InvoiceExpenses invoiceExpenses={additionalExpense as any} addNew={addNewInvoiceExpenses}/>
        </div>
      </div>
      <div className={'w-100'}>
        <TextAreaWithValidation
          label={translate('INVOICE_NOTE_LABEL')}
          helperText={''}
          fullWidth
          validation={{
            useValidation: validation,
            model: 'note',
          }}
        />
      </div>
      <DialogButtonsSaveUpdate
        cancelFun={handleCancelFunction}
        submitFun={handlerSubmit}
        icon={faFileInvoiceDollar}
        update={!!(invoice as any).dueDates}
      />
    </div>
  )
}

export default InvoiceFooterForm

interface IOpenDialogDueDateProps {
  handlerSuccess: (invoice: TInvoice)=> void,
  invoiceId: string
}

export const openDialogInvoiceFooterForm = ({ handlerSuccess, invoiceId }: IOpenDialogDueDateProps) => {
  EasyDialogApolloProvider((closeDialog: ()=> any, openDialog: (data: any)=> any) => {
    openDialog(<DialogModalRootComponent name={'dialog-invoice-footer-form-2156456418974564589'} closeFn={closeDialog}>
      <CenteredDialog
        title={'INVOICE_ADDITIONAL_EXPENSE_DIALOG_TITLE'}
        closeAction={closeDialog}
        Component={InvoiceFooterForm}
        componentRenderProps={{
          cancelFunction: closeDialog,
          successFunction: handlerSuccess,
          invoiceId
        }}
      />
    </DialogModalRootComponent>)
  })
}
