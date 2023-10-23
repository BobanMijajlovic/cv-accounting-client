import React, { useState }               from 'react'
import { Paper }                         from '../../../../components/Paper'
import ButtonsForm                       from '../../../../components/Button/ButtonsForm'
import { TItem }                         from '../../../../graphql/type_logic/types'
import {
  DialogModalRootComponent,
  EasyDialogApolloProvider
}                                        from '../../../../components/EasyModel/EasyModal'
import { CenteredDialog }                from '../../../../components/Dialog/DialogBasic'
import * as _                            from 'lodash'
import {
  KeyboardEventCodes,
  useExternalKeyboard
}                                        from '../../../../components/hooks/useExternalKeybaord'
import { useTranslationFunction }        from '../../../../components/Translation/useTranslation'
import ItemShortView                     from '../view/ItemShortView'
import { AutoCompleteFindNormativeItem } from '../../autocomplete/AutoCompleteFindNormativeItem'

export interface IItemSearchProps {
  successFunction : ( item : TItem ) => void
  cancelFunction? : () => void
}

const ItemSearch = ( { successFunction, cancelFunction } : IItemSearchProps ) => {

  const { translate } = useTranslationFunction()
  const [state, setState] : [ TItem, ( c : TItem ) => void ] = useState( {} as TItem )

  const setItem = ( data : any ) => {
    setState( data )
  }

  const handler = () => {
    if ( !state || _.isEmpty( state ) ) {
      return
    }
    successFunction( state as TItem )
    cancelFunction && cancelFunction()
  }

  const { setRef } = useExternalKeyboard( ( e : KeyboardEvent ) => {
    switch ( e.key ) {
      case KeyboardEventCodes.F12:
        handler()
        break
      case KeyboardEventCodes.Esc:
        cancelFunction && cancelFunction()
        break
    }
  }, true, [], 'customer-search-dialog' )

  return (
    <div ref={ setRef }>
      <Paper className={ 'd-flex flex-column hw-paper' } header={ 'FIND ITEM' }>
        <div className={ 'd-flex align-items-center justify-content-around' }>
          <AutoCompleteFindNormativeItem processSelected={ setItem } focusOnMount/>
        </div>
        <div className={ 'm-1 px-4 bg-light p-3 hw-customer-search-preview' }>
          <ItemShortView item={ state }/>
        </div>
        <div className={ 'd-flex flex-row justify-content-around mt-3' }>
          <ButtonsForm
                        buttonsCancel={ {
                          label : translate( 'BUTTON_CANCEL' ),
                          action : cancelFunction,
                          color : 'danger'
                        } }
                        buttonSubmit={ {
                          label : translate( 'BUTTON_OK' ),
                          action : handler,
                          color : 'primary'
                        } }
          />
        </div>
      </Paper>
    </div>
  )

}

export default ItemSearch

export const openDialogItemSearch = ( handlerItemSelected : ( item : TItem ) => void, handlerCancel ? : () => void, focusID ? : string ) => {

  EasyDialogApolloProvider( ( closeDialog : () => any, openDialog : ( data : any ) => any ) => {
    const handlerCancelDialog = () => {
      closeDialog()
      handlerCancel && handlerCancel()
    }
    openDialog( <DialogModalRootComponent name={ 'dialog-item-find-78979735' } closeFn={ handlerCancelDialog }>
      <CenteredDialog
                closeAction={ handlerCancelDialog }
                Component={ ItemSearch }
                componentRenderProps={ {
                  cancelFunction : handlerCancelDialog,
                  successFunction : handlerItemSelected
                } }
      />
    </DialogModalRootComponent> )
  }, focusID )
}

