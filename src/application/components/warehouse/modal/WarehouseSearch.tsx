import React, {useState}           from 'react'
import {Paper}                     from '../../../../components/Paper'
import ButtonsForm                 from '../../../../components/Button/ButtonsForm'
import {TWarehouse}                from '../../../../graphql/type_logic/types'
import WarehouseViewShort          from '../views/WarehouseViewShort'
import {AutoCompleteFindWarehouse} from '../../autocomplete/AutoCompleteFindWarehouse'
import {
  DialogModalRootComponent,
  EasyDialogApolloProvider
}                                  from '../../../../components/EasyModel/EasyModal'
import {CenteredDialog}            from '../../../../components/Dialog/DialogBasic'

export interface IWarehouseSearchProps {
  successFunction : (warehouse : TWarehouse) => void
  cancelFunction : () => void
}

const WarehouseSearch = ({successFunction, cancelFunction} : IWarehouseSearchProps) => {

  const [state, setState] : [TWarehouse, (c : TWarehouse) => void] = useState({} as TWarehouse)
  const setWarehouse = (data : any) => {
    setState(data)
  }

  const handler = () => {
    if (!state) {
      return
    }
    successFunction(state as TWarehouse)
    cancelFunction()
  }

  return (
    <Paper className={'d-flex flex-column hw-paper'} header={'Find Warehouse'}>
      <div className={'d-flex align-items-center justify-content-around'}>
        <AutoCompleteFindWarehouse processSelected={setWarehouse}/>
      </div>
      <div className={'m-1 px-4 bg-light p-3'}>
        <WarehouseViewShort warehouse={state}/>
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

export default WarehouseSearch

export const openDialogAddWarehouse = (handlerWarehouseSelected : (warehouse : TWarehouse) => void) => {
  EasyDialogApolloProvider((closeDialog : () => any, openDialog : (data : any) => any) => {
    openDialog(<DialogModalRootComponent name={'dialog-warehouse-find-8754521'} closeFn={closeDialog}>
      <CenteredDialog
                closeAction={closeDialog}
                Component={WarehouseSearch}
                componentRenderProps={{
                  cancelFunction: closeDialog,
                  successFunction: handlerWarehouseSelected
                }}
      />
    </DialogModalRootComponent>)
  })
}

