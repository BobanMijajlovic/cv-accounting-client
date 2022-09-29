import React, { useEffect }     from 'react'
import {
  faFileInvoiceDollar,
  faPercentage
}                                 from '@fortawesome/free-solid-svg-icons'
import { get as _get }            from 'lodash'
import { useReturnInvoiceForm }   from '../../../../../../store/return-invoice/useReturnInvoice'
import { InvoiceType }               from '../../../../../../graphql/graphql'
import {
  IAdditionalExpense,
  IDueDateRecord
}                                    from '../../../../calculation/modal/DocumentHeaderForm'
import { useTranslationFunction }    from '../../../../../../components/Translation/useTranslation'
import {
  TExpenseItem,
  TInvoiceFooter,
  TReturnInvoice
} from '../../../../../../graphql/type_logic/types'
import {
  IFieldsRefs,
  useValidation
}                                    from '../../../../../../validation'
import { openDialogInvoiceExpenses } from '../../../../invoice/form/footer/ExpensesForm'
import {
  IUseOptimizeEventData,
  useOptimizeEventClick
}                                   from '../../../../../../components/hooks/useOptimizeEventClick'
import { CONSTANT_CALCULATION }     from '../../../../../constants'
import { toNumberFixed }       from '../../../../../utils/Utils'
import { processErrorGraphQL } from '../../../../../../apollo'
import ValidationGlobalError   from '../../../../../../components/Error/ValidationGlobalError'
import InputTextWithValidation from '../../../../../../components/withValidation/InputTextWithValidation'
import InvoiceExpenses         from '../../../../invoice/form/footer/InvoiceExpenses'
import TextAreaWithValidation  from '../../../../../../components/withValidation/TextAreaWithValidation'
import DialogButtonsSaveUpdate from '../../../../_common/DialogButtonsSaveUpdate'
import {
  DialogModalRootComponent,
  EasyDialogApolloProvider
}                              from '../../../../../../components/EasyModel/EasyModal'
import { CenteredDialog }      from '../../../../../../components/Dialog/DialogBasic'

interface IReturnInvoiceFooterFormState {
  dueDates: IDueDateRecord[],
  additionalExpenses?: IAdditionalExpense[]
}

interface IInvoiceFooterFormProps {
  successFunction: (invoice: InvoiceType)=> Promise<any>
  cancelFunction?: ()=> void
  returnInvoiceId: string
}

const ReturnInvoiceFooterForm = ({ cancelFunction, successFunction, returnInvoiceId }: IInvoiceFooterFormProps) => {

  const { translate } = useTranslationFunction()
  const validation = useValidation<TInvoiceFooter>()

  const { errorGlobal, state, setFieldValue, addArrayData, removeArrayData, resetValidations } = validation
  const { additionalExpense } = state
  const { returnInvoice } = useReturnInvoiceForm(returnInvoiceId)

  useEffect(() => {
    if (!returnInvoice) {
      return
    }

    if (returnInvoice?.expense && (returnInvoice.expense as any).length !== 0) {
      setFieldValue('additionalExpense', returnInvoice?.expense as any, false)
    }

    if (returnInvoice?.notes && (returnInvoice.notes as any).length !== 0) {
      setFieldValue('note', (returnInvoice.notes as any)[0].note, false)
    }

  }, [returnInvoice, setFieldValue])

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
        <InvoiceExpenses invoiceExpenses={additionalExpense as any} addNew={addNewInvoiceExpenses}/>
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
                update={!!(returnInvoice as any).dueDates}
      />
    </div>
  )
}

export default ReturnInvoiceFooterForm

interface IOpenDialogDueDateProps {
  handlerSuccess: (invoice: TReturnInvoice)=> void,
  returnInvoiceId: string
}

export const openDialogReturnInvoiceFooterForm = ({ handlerSuccess, returnInvoiceId }: IOpenDialogDueDateProps) => {
  EasyDialogApolloProvider((closeDialog: ()=> any, openDialog: (data: any)=> any) => {
    openDialog(<DialogModalRootComponent name={'dialog-return-invoice-footer-form-2156456418974564589'} closeFn={closeDialog}>
      <CenteredDialog
                title={'INVOICE_ADDITIONAL_EXPENSE_DIALOG_TITLE'}
                closeAction={closeDialog}
                Component={ReturnInvoiceFooterForm}
                componentRenderProps={{
                  cancelFunction: closeDialog,
                  successFunction: handlerSuccess,
                  returnInvoiceId
                }}
      />
    </DialogModalRootComponent>)
  })
}
