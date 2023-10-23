import React, { useState }         from 'react'
import AutoCompleteFindBankAccount from '../../../../autocomplete/AutoCompleteFindBankAccount'
import BankAccountViewShort        from '../../../../banks/view/BankAccountView'
import { TBankAccount }            from '../../../../../../graphql/type_logic/types'
import _                           from 'lodash'
import ButtonsForm                 from '../../../../../../components/Button/ButtonsForm'
import { useTranslationFunction }  from '../../../../../../components/Translation/useTranslation'
import {
  DialogModalRootComponent,
  EasyDialogApolloProvider
}                                  from '../../../../../../components/EasyModel/EasyModal'
import { CenteredDialog }          from '../../../../../../components/Dialog/DialogBasic'
import { Paper }                   from '../../../../../../components/Paper'
import {
  KeyboardEventCodes,
  useExternalKeyboard
}                                  from '../../../../../../components/hooks/useExternalKeybaord'
import { BankTransactionItemType } from '../../../../../../graphql/graphql'

interface ISetBankAccountFormProps {
  id: string
  successFunction : (data: BankTransactionItemType,id: number) => Promise<any>,
  cancelFunction ?: ()=> void
}

const SetBankAccountForm = ( { id, successFunction, cancelFunction } : ISetBankAccountFormProps ) => {
  const { translate } = useTranslationFunction()
  const [error, setError] : [ string | boolean, ( e : string | boolean ) => void ] = useState( false as string | boolean )
  const [focus, setFocus] : [ boolean, ( f : boolean ) => void ] = useState( false as boolean )
  const [bankAccount, setBankAccount] : [ TBankAccount, ( b : TBankAccount ) => void ] = useState( {} as TBankAccount )
  const processSelected = ( bankAccount : TBankAccount ) => {
    setBankAccount( bankAccount )
  }

  const handlerSubmit = async () => {
    setError( false )
    setFocus( false )
    if ( !bankAccount.id ) {
      setError( 'Bank account not selected.' )
      setFocus( true )
      return
    }

    const data = {
      bankAccountId : Number( ( bankAccount as any ).id ),
      customerId : Number( _.get( bankAccount, 'customer.id' ) ),

    } as any
    await successFunction(data,Number(id))
    cancelFunction && cancelFunction()

  }

  const handlerCancel = () => {
    cancelFunction && cancelFunction()
  }

  const { setRef } = useExternalKeyboard( ( e : KeyboardEvent ) => {
    switch ( e.key ) {
      case KeyboardEventCodes.F12:
        handlerSubmit()
        break
      case KeyboardEventCodes.Esc:
        handlerCancel()
        break
    }
  }, true, [], 'set-bank-account-dialog' )

  return (
    <div ref={ setRef }>
      <Paper className={ 'd-flex flex-column hw-paper' } header={ 'Set bank account' }>
        <div className={ 'd-flex flex-column hw-set-bank-account-form' }>
          <AutoCompleteFindBankAccount error={ error } focus={ focus } focusOnMount processSelected={ processSelected } label={ 'search by account num #' }/>
          <BankAccountViewShort bankAccount={ bankAccount } namePlaceholder={ 'BANK ACCOUNT' } classNames={ 'bank-account-short-view-root' }/>
          <div className={ 'd-flex flex-row justify-content-around mt-3' }>
            <ButtonsForm
                            buttonsCancel={ {
                              label : translate( 'BUTTON_CANCEL' ),
                              action : handlerCancel,
                              color : 'danger'
                            } }
                            buttonSubmit={ {
                              label : translate( 'BUTTON_UPDATE' ),
                              action : handlerSubmit,
                              color : 'primary'
                            } }
            />
          </div>
        </div>
      </Paper>
    </div>
  )
}

export default SetBankAccountForm

export const openDialogSetBankAccount = ( id : string, successFunction : (data: BankTransactionItemType, id: number)=> Promise<any>, focusID ? : string ) => {

  EasyDialogApolloProvider( ( closeDialog : () => any, openDialog : ( data : any ) => any ) => {
    openDialog( <DialogModalRootComponent name={ 'dialog-set-bank-account-107204062165160615' } closeFn={ closeDialog }>
      <CenteredDialog
                closeAction={ closeDialog }
                Component={ SetBankAccountForm }
                componentRenderProps={ {
                  cancelFunction : closeDialog,
                  id,
                  successFunction
                } }
      />
    </DialogModalRootComponent> )
  }, focusID )
}
