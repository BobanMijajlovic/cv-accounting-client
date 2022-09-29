import React                      from 'react'
import DialogButtonsSaveUpdate    from '../../../../_common/DialogButtonsSaveUpdate'
import { faFileInvoiceDollar }    from '@fortawesome/free-solid-svg-icons'
import { useProformaInvoiceForm } from '../../../../../../store/proforma-invoice/useProformaInvoice'
import {
  DialogModalRootComponent,
  EasyDialogApolloProvider
}                                 from '../../../../../../components/EasyModel/EasyModal'
import {
  CenteredDialog,
  DialogComponentQuestions
}                                 from '../../../../../../components/Dialog/DialogBasic'

interface IGenerateInvoiceProps {
  successFunction : ( dueDates : any ) => Promise<any>
  cancelFunction? : () => void
  proformaInvoiceId : string
}

const GenerateInvoiceForm = ( { proformaInvoiceId, cancelFunction, successFunction } : IGenerateInvoiceProps ) => {

  const { proformaInvoice } = useProformaInvoiceForm( proformaInvoiceId )

  const handleCancelFunction = () => {
    cancelFunction && cancelFunction()
  }

    /*  const handlerSubmit = () => {

     const fn = async (data: any) => {
     await successFunction(data)
     handleCancelFunction()
     }

     openDialogFinishInvoice({
     actionConfirm: fn,
     data: !state || state.length === 0 ? [{
     dueDate: `${new Date().toISOString()}`,
     finance: _.round(_.add(getInvoiceFinanceMP(proformaInvoice.items as any), getInvoiceFooterAdditionalExpenseFinance(proformaInvoice.expense as any)), 2)
     }] : state
     })
     }*/

  return (
    <div data-action-root className={ 'container relative px-3 pt-4 pb-3' }>
      <div>

      </div>
      <DialogButtonsSaveUpdate
                cancelFun={ handleCancelFunction }
                submitFun={ () => {} }
                icon={ faFileInvoiceDollar }
      />
    </div>
  )
}

export default GenerateInvoiceForm

interface IOpenDialogGenerateInvoice {
  handlerSuccess : ( dueDates : any ) => void,
  proformaInvoiceId : string
}

export const openDialogGenerateInvoice = ( { handlerSuccess, proformaInvoiceId } : IOpenDialogGenerateInvoice ) => {
  EasyDialogApolloProvider( ( closeDialog : () => any, openDialog : ( data : any ) => any ) => {
    openDialog( <DialogModalRootComponent name={ 'dialog-proforma-invoice-finish-0465142062490156' } closeFn={ closeDialog }>
      <CenteredDialog
                title={ 'FINISH PROFORMA INVOICE' }
                closeAction={ closeDialog }
                Component={ GenerateInvoiceForm }
                componentRenderProps={ {
                  cancelFunction : closeDialog,
                  successFunction : handlerSuccess,
                  proformaInvoiceId
                } }
      />
    </DialogModalRootComponent> )
  } )
}

interface IOpenDialogFinishInvoiceProps {
  actionConfirm : () => void
}

export const openDialogFinishInvoice = ( { actionConfirm } : IOpenDialogFinishInvoiceProps ) => {
  EasyDialogApolloProvider( ( closeDialog : () => any, openDialog : ( data : any ) => any ) => {
    const Component = () => {
      const messages : string[] = React.useMemo( () => [
        'Are you sure you want to generate this invoice? '
      ], [] )

      const handlerConfirm = async () => {
        await actionConfirm()
        closeDialog()
      }

      return (
        <DialogComponentQuestions
                    closeFun={ closeDialog }
                    confirmFun={ handlerConfirm }
                    messages={ messages }
        />
      )
    }
    openDialog( <DialogModalRootComponent name={ 'dialog-proforma-invoice-generate-invoice-0465142062490156' } closeFn={ closeDialog }>
      <CenteredDialog
                title={ 'GENERATE INVOICE' }
                closeAction={ closeDialog }
                Component={ Component }
      />
    </DialogModalRootComponent> )
  } )
}
