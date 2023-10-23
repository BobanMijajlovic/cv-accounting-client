import React, { useState }        from 'react'
import { Paper }                  from '../../../../components/Paper'
import ButtonsForm                from '../../../../components/Button/ButtonsForm'
import CustomerViewShort          from '../views/CustomerViewShort'
import { TCustomer }              from '../../../../graphql/type_logic/types'
import {
  DialogModalRootComponent,
  EasyDialogApolloProvider
}                                 from '../../../../components/EasyModel/EasyModal'
import { CenteredDialog }         from '../../../../components/Dialog/DialogBasic'
import * as _                     from 'lodash'
import AutoCompleteFindCustomer   from '../../autocomplete/AutoCompleteFindCustomer'
import {
  KeyboardEventCodes,
  useExternalKeyboard
}                                 from '../../../../components/hooks/useExternalKeybaord'
import { useTranslationFunction } from '../../../../components/Translation/useTranslation'

export interface ICustomerSearchProps {
  successFunction: (customer: TCustomer) => void
  cancelFunction?: () => void
  supplier ?: boolean
}

const CustomerSearch = ({successFunction, cancelFunction,supplier}: ICustomerSearchProps) => {

  const { translate } = useTranslationFunction()
  const [state, setState]: [TCustomer, (c: TCustomer) => void] = useState({} as TCustomer)

  const setCustomer = (data: any) => {
    setState(data)
  }

  const handler = () => {
    if (!state || _.isEmpty(state)) {
      return
    }
    successFunction(state as TCustomer)
    cancelFunction && cancelFunction()
  }

  const {setRef} = useExternalKeyboard((e : KeyboardEvent) => {
    switch (e.key) {
      case KeyboardEventCodes.F12:
        handler()
        break
      case KeyboardEventCodes.Esc:
        cancelFunction && cancelFunction()
        break
    }
  }, true, [], 'customer-search-dialog')

  return (
    <div ref={setRef}>
      <Paper className={'d-flex flex-column hw-paper'} header={translate(supplier ? 'LABEL_FIND_SUPPLIER' : 'LABEL_FIND_CUSTOMER')}>
        <div className={'d-flex align-items-center justify-content-around'}>
          <AutoCompleteFindCustomer processSelected={setCustomer} focusOnMount helperText={translate('FIND_CUSTOMER_INPUT_HELPER_TEXT')}/>
        </div>
        <div className={'m-1 px-4 bg-light p-3 hw-customer-search-preview'}>
          <CustomerViewShort customer={state} supplier={supplier}/>
        </div>
        <div className={'d-flex flex-row justify-content-around mt-3'}>
          <ButtonsForm
                        buttonsCancel={{
                          label: translate('BUTTON_CANCEL'),
                          action: cancelFunction,
                          color: 'danger'
                        }}
                        buttonSubmit={{
                          label: translate('BUTTON_OK'),
                          action: handler,
                          color: 'primary'
                        }}
          />
        </div>
      </Paper>
    </div>
  )

}

export default CustomerSearch

export const openDialogAddEditCustomer = (handlerCustomerSelected: (customer: TCustomer) => void, handlerCancel ?: () => void, focusID ?: string, supplier?: boolean) => {

  EasyDialogApolloProvider((closeDialog: () => any, openDialog: (data: any) => any) => {
    const handlerCancelDialog = () => {
      closeDialog()
      handlerCancel && handlerCancel()
    }
    openDialog(<DialogModalRootComponent name={'dialog-customer-find-78979735'} closeFn={handlerCancelDialog}>
      <CenteredDialog
                closeAction={handlerCancelDialog}
                Component={CustomerSearch}
                componentRenderProps={{
                  cancelFunction: handlerCancelDialog,
                  successFunction: handlerCustomerSelected,
                  supplier
                }}
      />
    </DialogModalRootComponent>)
  }, focusID)
}

