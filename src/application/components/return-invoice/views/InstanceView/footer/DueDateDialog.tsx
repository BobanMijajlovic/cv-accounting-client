import React, { useCallback }       from 'react'
import {
  TDueDates,
  TInvoiceFooter,
  TReturnInvoice
}                                   from '../../../../../../graphql/type_logic/types'
import { useReturnInvoiceForm }     from '../../../../../../store/return-invoice/useReturnInvoice'
import { InvoiceType }              from '../../../../../../graphql/graphql'
import { useTranslationFunction }   from '../../../../../../components/Translation/useTranslation'
import { useValidation }            from '../../../../../../validation'
import { toNumberFixed }            from '../../../../../utils/Utils'
import { processErrorGraphQL }      from '../../../../../../apollo'
import {
  IUseOptimizeEventData,
  useOptimizeEventClick
}                                   from '../../../../../../components/hooks/useOptimizeEventClick'
import { CONSTANT_INVOICE }         from '../../../../../constants'
import { Paper }                    from '../../../../../../components/Paper'
import ValidationGlobalError        from '../../../../../../components/Error/ValidationGlobalError'
import { Button }                   from '../../../../../../components/Button'
import { ReturnInvoiceDueDateView } from '../../../../invoice/form/footer/DueDateView'
import {
  DialogModalRootComponent,
  EasyDialogApolloProvider
}                                   from '../../../../../../components/EasyModel/EasyModal'
import { CenteredDialog }           from '../../../../../../components/Dialog/DialogBasic'

interface IReturnInvoiceDueDateDialogProps {
  successFunction : ( invoice : InvoiceType ) => Promise<any>
  cancelFunction? : () => void
  returnInvoiceId : string
}

const DueDateDialog = ( { cancelFunction, successFunction, returnInvoiceId } : IReturnInvoiceDueDateDialogProps ) => {

  const { translate } = useTranslationFunction()
  const validation = useValidation<TInvoiceFooter>()
  const { setErrorGlobal, errorGlobal } = validation

  const { returnInvoice, updateReturnInvoice } = useReturnInvoiceForm( returnInvoiceId, true )

  const updateDueDates = async ( id : string ) => {
    if ( returnInvoice && returnInvoice.dueDates && id ) {
      const dates = ( returnInvoice.dueDates || [] )
      const index = dates.findIndex( ( x : TDueDates ) => x.id === id )
      if ( index !== -1 ) {
        dates.splice( index, 1 )
        try {
          await updateReturnInvoice( {
            footer : {
              dueDates : dates.length !== 0 ? dates.map( ( x : any ) => {
                return {
                  dueDate : new Date( x.date ).toDateString(),
                  finance : toNumberFixed( x.finance )
                }
              } ) : []
            }
          } )
        } catch ( e ) {
          processErrorGraphQL( e, {} )
        }
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
          <ReturnInvoiceDueDateView returnInvoiceId={ returnInvoiceId }/>
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

interface IOpenDialogReturnInvoiceDueDates {
  handlerSuccess : ( invoice : TReturnInvoice ) => void,
  returnInvoiceId : string
}

export const openReturnInvoiceDueDateDialog = ( { handlerSuccess, returnInvoiceId } : IOpenDialogReturnInvoiceDueDates ) => {
  EasyDialogApolloProvider( ( closeDialog : () => any, openDialog : ( data : any ) => any ) => {
    openDialog( <DialogModalRootComponent name={ 'dialog-return-invoice-due-date-dialog-0404750404101' } closeFn={ closeDialog }>
      <CenteredDialog
                closeAction={ closeDialog }
                Component={ DueDateDialog }
                componentRenderProps={ {
                  cancelFunction : closeDialog,
                  successFunction : handlerSuccess,
                  returnInvoiceId
                } }
      />
    </DialogModalRootComponent> )
  } )
}
