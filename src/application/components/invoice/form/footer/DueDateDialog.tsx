import React, { useCallback }     from 'react'
import { InvoiceType }            from '../../../../../graphql/graphql'
import { useValidation }          from '../../../../../validation'
import {
  TDueDates,
  TInvoice,
  TInvoiceFooter
} from '../../../../../graphql/type_logic/types'
import { useInvoiceForm }         from '../../../../../store/invoice/useInvoice'
import {
  IUseOptimizeEventData,
  useOptimizeEventClick
}                                 from '../../../../../components/hooks/useOptimizeEventClick'
import { CONSTANT_INVOICE }       from '../../../../constants'
import { toNumberFixed }          from '../../../../utils/Utils'
import { InvoiceDueDateView }     from './DueDateView'
import {
  DialogModalRootComponent,
  EasyDialogApolloProvider
}                                 from '../../../../../components/EasyModel/EasyModal'
import { CenteredDialog }         from '../../../../../components/Dialog/DialogBasic'
import ValidationGlobalError      from '../../../../../components/Error/ValidationGlobalError'
import { useTranslationFunction } from '../../../../../components/Translation/useTranslation'
import { Paper }                  from '../../../../../components/Paper'
import { Button }                 from '../../../../../components/Button'

interface IInvoiceDueDateDialogProps {
  successFunction : ( invoice : InvoiceType ) => Promise<any>
  cancelFunction? : () => void
  invoiceId : string
}

const DueDateDialog = ( { cancelFunction, successFunction, invoiceId } : IInvoiceDueDateDialogProps ) => {

  const { translate } = useTranslationFunction()
  const validation = useValidation<TInvoiceFooter>()
  const { setErrorGlobal, errorGlobal } = validation

  const { invoice, updateInvoice } = useInvoiceForm( invoiceId, true )

  const updateDueDates = async ( id : string ) => {
    if ( invoice && invoice.dueDates && id ) {
      const dates = ( invoice.dueDates || [] )
      const index = dates.findIndex( ( x : TDueDates ) => x.id === id )
      if ( index !== -1 ) {
        dates.splice( index, 1 )
        await updateInvoice( {
          footer : {
            dueDates : dates.length !== 0 ? dates.map( ( x : any ) => {
              return {
                dueDate : new Date( x.date ).toDateString(),
                finance : toNumberFixed( x.finance )
              }
            } ) : []
          }
        } )
      }
    }
  }

  const { onClickHandler } = useOptimizeEventClick( {
    eventHandler ( data : IUseOptimizeEventData ) {

      if ( data.action === CONSTANT_INVOICE.EVENTS.HEADER.DUE_DATES_REMOVE ) {
        data.id && updateDueDates( data.id )
        return
      }
    }
  } )

  const resetErrorFunction = useCallback( () => {
    setErrorGlobal( false )
  }, [setErrorGlobal] )

  const handlerCloseDialog = () => {
    cancelFunction && cancelFunction()
  }

  return (
    <Paper className={ 'd-flex flex-column hw-paper' } header={ translate( 'DUE_DATE_VIEW_TH_DUE_DATE' ) }>
      <div data-action-root onClick={ onClickHandler } className={ 'container relative hw-invoice-due-date-dialog-root  px-3 pt-4' }>
        <div className={ 'relative w-100 pb-1' }>
          <InvoiceDueDateView invoiceId={ invoiceId }/>
          { errorGlobal && <ValidationGlobalError error={ errorGlobal } position={ 'bottom-left' } classNames={ 'font-smaller-2' } resetFunction={ resetErrorFunction }/> }
        </div>
        <div className={ 'd-flex justify-content-center w-100' }>
          <Button label={ 'OK' } color={ 'primary' } outline onClick={ handlerCloseDialog }/>
        </div>
      </div>
    </Paper>
  )
}

export default DueDateDialog

interface IOpenDialogInvoiceDueDates {
  handlerSuccess : ( invoice : TInvoice ) => void,
  invoiceId : string
}

export const openInvoiceDueDateDialog = ( { handlerSuccess, invoiceId } : IOpenDialogInvoiceDueDates ) => {
  EasyDialogApolloProvider( ( closeDialog : () => any, openDialog : ( data : any ) => any ) => {
    openDialog( <DialogModalRootComponent name={ 'dialog-invoice-due-date-dialog-12r515t15r12r21' } closeFn={ closeDialog }>
      <CenteredDialog
                closeAction={ closeDialog }
                Component={ DueDateDialog }
                componentRenderProps={ {
                  cancelFunction : closeDialog,
                  successFunction : handlerSuccess,
                  invoiceId
                } }
      />
    </DialogModalRootComponent> )
  } )
}
