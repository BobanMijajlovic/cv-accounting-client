import React, {useState}           from 'react'
import {Paper}                     from '../../../../components/Paper'
import ButtonsForm                 from '../../../../components/Button/ButtonsForm'
import {TBankAccount}              from '../../../../graphql/type_logic/types'
import {
  DialogModalRootComponent,
  EasyDialogApolloProvider
}                                  from '../../../../components/EasyModel/EasyModal'
import {CenteredDialog}            from '../../../../components/Dialog/DialogBasic'
import * as _                      from 'lodash'
import {useExternalKeyboard}       from '../../../../components/hooks/useExternalKeybaord'
import AutoCompleteFindBankAccount from '../../autocomplete/AutoCompleteFindBankAccount'
import BankAccountViewShort        from '../view/BankAccountView'

export interface IBankAccountSearchProps {
  successFunction : (bank : TBankAccount) => void
  cancelFunction ?: () => void
}

const BankAccountSearch = ({successFunction, cancelFunction} : IBankAccountSearchProps) => {

  const [state, setState] : [TBankAccount, (c : TBankAccount) => void] = useState({} as TBankAccount)

  const setBankAccount = (data : any) => {
    setState(data)
  }

  const handler = () => {
    if (!state || _.isEmpty(state)) {
      return
    }
    successFunction(state as TBankAccount)
    cancelFunction && cancelFunction()
  }

  const {setRef} = useExternalKeyboard(() => {
  }, true, [], 'search-bank-account-dialog')

  return (
    <Paper className={'d-flex flex-column hw-paper'} header={'Find Bank Account'}>
      <div className={'d-flex align-items-center justify-content-around'} ref={setRef}>
        <AutoCompleteFindBankAccount processSelected={setBankAccount} focusOnMount helperText={'search by account #'}/>
      </div>
      <div className={'m-1 px-4 bg-light p-3'}>
        <BankAccountViewShort bankAccount={state}/>
      </div>
      <div className={'d-flex flex-row justify-content-around mt-3'}>
        <ButtonsForm
                    buttonsCancel={{
                      label: 'CANCEL',
                      action: cancelFunction,
                      color: 'danger'
                    }}
                    buttonSubmit={{
                      label: 'OK',
                      action: handler,
                      color: 'primary'
                    }}
        />
      </div>
    </Paper>
  )

}

export default BankAccountSearch

export const openDialogAddEditBankAccount = (handlerBankAccountSelected : (bankAccount : TBankAccount) => void, handlerCancel ?: () => void) => {

  EasyDialogApolloProvider((closeDialog : () => any, openDialog : (data : any) => any) => {
    const handlerCancelDialog = () => {
      handlerCancel && handlerCancel()
      closeDialog()
    }
    openDialog(<DialogModalRootComponent name={'dialog-bank-account-find-12343773574'} closeFn={closeDialog}>
      <CenteredDialog
                closeAction={closeDialog}
                Component={BankAccountSearch}
                componentRenderProps={{
                  cancelFunction: handlerCancelDialog,
                  successFunction: handlerBankAccountSelected
                }}
      />
    </DialogModalRootComponent>)
  })
}

