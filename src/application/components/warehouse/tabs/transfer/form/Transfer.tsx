import React, {
  ChangeEvent,
  useCallback,
  useEffect,
  useState
}                               from 'react'
import SelectTextWithValidation from '../../../../../../components/withValidation/SelectTextWithValidation'
import {
  IFieldsRefs,
  required,
  useValidation
}                               from '../../../../../../validation'
import {
  useWarehousesQuery,
  useWorkOrderQuery
}                               from '../../../../../../graphql/graphql'
import TransferItemForm         from './TransferItemForm'
import { Paper }                from '../../../../../../components/Paper'
import {
  TWorkOrder,
  TWorkOrderItem
}                               from '../../../../../../graphql/type_logic/types'
import TransferItemsTable       from './TransferItemsTable'
import DialogButtonsSaveUpdate  from '../../../../_common/DialogButtonsSaveUpdate'
import { faDolly }              from '@fortawesome/free-solid-svg-icons'
import {
  DialogModalRootComponent,
  EasyDialogApolloProvider
}                               from '../../../../../../components/EasyModel/EasyModal'
import {
  CenteredDialog,
  DialogComponentQuestions
}                               from '../../../../../../components/Dialog/DialogBasic'
import _                        from 'lodash'
import { processErrorGraphQL }  from '../../../../../../apollo'
import { toNumberFixed }        from '../../../../../utils/Utils'
import DatePickerWithValidation from '../../../../../../components/withValidation/DatePickerWithValidation'

interface ITransferFormProps {
  closeDialog? : () => void
  fromWarehouseId? : string
  workOrderId? : string
  submitFunction : ( data : any, id ? : number ) => Promise<any>
}

const TransferForm = ( { closeDialog, fromWarehouseId, workOrderId, submitFunction } : ITransferFormProps ) => {

  const [workOrderItems, setWorkOrderItems] : [ TWorkOrderItem[], ( items : TWorkOrderItem[] ) => void ] = useState( [] as TWorkOrderItem[] )
  const validation = useValidation<TWorkOrder>()
  const [focusElement, setFocusElement]: [IFieldsRefs, (r: IFieldsRefs) => void] = useState({} as IFieldsRefs)

  const { data : _workOrder } = useWorkOrderQuery( {
    notifyOnNetworkStatusChange : true,
    fetchPolicy : 'network-only',
    variables : {
      id : Number( workOrderId )
    },
    skip : !Number( workOrderId )
  } )

  useEffect(() => {
    if (focusElement.ref && focusElement.ref.current) {
      focusElement.ref.current.focus()
    }
  }, [focusElement])

  const { state, setFieldValue, getFieldRef } = validation

  const handlerSetFocus = (field: string) => {
    const refData = getFieldRef(field)
    if (refData && refData.ref) {
      setFocusElement(refData)
    }
  }

  useEffect( () => {
    if ( !fromWarehouseId ) {
      return
    }
    setFieldValue( 'fromWarehouseId', `${ fromWarehouseId }`, true )
  }, [fromWarehouseId] )

  const workOrder = React.useMemo( () => !_workOrder || !_workOrder.workOrder ? void( 0 ) : _workOrder.workOrder, [_workOrder] )

  useEffect( () => {
    if ( !workOrder ) {
      return
    }
    const _workOrder = workOrder as any
    if ( _workOrder.workOrderItems && ( _workOrder.workOrderItems as any ).length !== 0 ) {
      const items = ( _workOrder.workOrderItems as any ).map( ( x : TWorkOrderItem ) => {
        return {
          ...x,
          item : _.get( x, 'warehouseItemInfo.item' )
        }
      } )
      setWorkOrderItems( items )
    }

    ['fromWarehouseId', 'toWarehouseId'].forEach( ( s : string ) => _.get( _workOrder, s ) ? setFieldValue( s, _.get( _workOrder, s ).toString(), false ) : null )

  }, [workOrder] )
  
  const { data } = useWarehousesQuery()
  const warehousesOptions = React.useMemo( () => {
    let warehouses : any = []
    if ( data && data.data.items ) {
      warehouses = data.data.items.map( ( warehouse : any ) => {
        return {
          label : warehouse.name,
          description : warehouse.description,
          value : warehouse.id
        }
      } )
    }
    return [
      ...warehouses
    ]
  }, [data] )

  const fromWarehouseOptions = React.useMemo( () => warehousesOptions.filter( ( warehouse : any ) => warehouse.value !== state.toWarehouseId ), [warehousesOptions, state.toWarehouseId] )
  const toWarehouseOptions = React.useMemo( () => warehousesOptions.filter( ( warehouse : any ) => warehouse.value !== state.fromWarehouseId ), [warehousesOptions, state.fromWarehouseId] )

  const handlerRemoveItem = ( id : string ) => {
    const index = ( workOrderItems ).findIndex( ( x : any ) => x.id === id )
    if ( index !== -1 ) {
      const items = [...workOrderItems]
      items.splice( index, 1 )
      setWorkOrderItems( items )
    }
  }
  const handlerEditItem = ( value : number | string, field : string, model : any ) => {
    const index = workOrderItems.findIndex( ( x : any ) => x.id === model.id )
    if ( index === -1 ) {
      return
    }
    const record = {
      ...workOrderItems[index],
      [field] : value
    }
    const items = [...workOrderItems]
    items[index] = record
    setWorkOrderItems( items )
  }

  const handlerAddItem = ( item : TWorkOrderItem ) => {
    setWorkOrderItems( [...workOrderItems, item] )
  }

  const handlerCancelDialog = () => {
    closeDialog && closeDialog()
  }

  const handlerOnSubmit = async () => {
    const { error, data } = await validation.validate()
    if ( error ) {
      return
    }
    const _data = {
      transferDate : new Date( data.transferDate ),
      fromWarehouseId : Number( data.fromWarehouseId ),
      toWarehouseId : Number( data.toWarehouseId ),
      items : workOrderItems ? workOrderItems.map( ( item : any ) => {
        return {
          ..._.pick( item, ['warehouseItemInfoId', 'quantity'] ),
          quantity : toNumberFixed( item.quantity )
        }
      } ) : void( 0 )
    } as any

    const fn = ( data : any, id ? : number ) => {
      submitFunction( data, id )
        .then( () => {
          handlerCancelDialog()
        } )
        .catch( ( e ) => {
          processErrorGraphQL( e, validation )
        } )
    }

    openDialogFinishTransferForm( {
      actionConfirm : fn,
      data : _data,
      workOrderId : workOrder && workOrder.id
    } )
  }
  
  const handlerFromWarehouseHandlerChange = useCallback((e:ChangeEvent<HTMLSelectElement>) => {
    handlerSetFocus('toWarehouseId')
  },[handlerSetFocus])

  const handlerToWarehouseHandlerChange = useCallback((e:ChangeEvent<HTMLSelectElement>) => {
    handlerSetFocus('transferDate')
  },[handlerSetFocus])

  return (
    <Paper header={ 'Warehouse transfer' }>
      <div className={ 'hw-warehouse-transfer-form-root py-4' }>
        <div className={ 'container' }>
          <div className={ 'col-md-4' }>
            <SelectTextWithValidation
                            required
                            focusOnMount
                            label={ 'From' }
                            helperText={ '' }
                            lined
                            options={ fromWarehouseOptions }
                            onChange={handlerFromWarehouseHandlerChange}
                            validation={ {
                              useValidation : validation,
                              model : 'fromWarehouseId',
                              rule : {
                                required
                              }
                            } }
            />
          </div>
          <div className={ 'col-md-4' }>
            <SelectTextWithValidation
                            required
                            label={ 'To' }
                            helperText={ '' }
                            lined
                            options={ toWarehouseOptions }
                            onChange={handlerToWarehouseHandlerChange}
                            validation={ {
                              useValidation : validation,
                              model : 'toWarehouseId',
                              rule : {
                                required
                              }
                            } }
            />
          </div>
          <div className={ 'col-md-4' }>
            <DatePickerWithValidation
                            required
                            label={ 'Transfer date' }
                            format={ 'dd-MM-yyyy' }
                            lined
                            helperText={ 'choose date' }
                            align={ 'align-center' }
                            fullWidth
                            validation={ {
                              useValidation : validation,
                              model : 'transferDate',
                              rule : {
                                required
                              }
                            } }
            />
          </div>

          <div className={ 'col-md-12 relative mt-1' }>
            <TransferItemForm successFun={ handlerAddItem } items={workOrderItems} fromWarehouseId={ `${ state.fromWarehouseId }` }/>
            <TransferItemsTable items={ workOrderItems } deleteFunc={ handlerRemoveItem } updateItem={ handlerEditItem }/>
          </div>
          <DialogButtonsSaveUpdate
                        cancelFun={ handlerCancelDialog }
                        submitFun={ handlerOnSubmit }
                        icon={ faDolly }
          />
        </div>
      </div>
    </Paper>
  )
}

export default TransferForm

interface IDialogTransferFormProps {
  fromWarehouseId : string
  workOrderId? : string
  submitFunction : ( data : any, id ? : number ) => Promise<any>
}

export const openDialogTransferForm = ( { fromWarehouseId, workOrderId, submitFunction } : IDialogTransferFormProps ) => {
  EasyDialogApolloProvider( ( closeDialog : () => any, openDialog : ( data : any ) => any ) => {
    openDialog( <DialogModalRootComponent closeFn={ closeDialog } name={ 'warehouse-transfer-form-05105215101' }>
      <CenteredDialog
                closeAction={ closeDialog }
                Component={ TransferForm }
                componentRenderProps={ {
                  closeDialog : closeDialog,
                  fromWarehouseId,
                  workOrderId,
                  submitFunction
                } }
      />
    </DialogModalRootComponent> )
  } )
}

export const openDialogFinishTransferForm = ( { actionConfirm, data, workOrderId } : { actionConfirm : ( data : any, id ? : number ) => void, data : any, workOrderId? : string } ) => {
  EasyDialogApolloProvider( ( closeDialog : () => any, openDialog : ( data : any ) => any ) => {
    const Component = () => {
      const messages : string[] = React.useMemo( () => [
        'Are you sure you want to finish this transfer? '
      ], [] )

      const handlerConfirm = async () => {
        await actionConfirm( data, Number( workOrderId ) )
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
    openDialog( <DialogModalRootComponent name={ 'dialog-warehouse-transfer-finish-780410420701' } closeFn={ closeDialog }>
      <CenteredDialog
                title={ 'FINISH WAREHOUSE TRANSFER' }
                closeAction={ closeDialog }
                Component={ Component }
      />
    </DialogModalRootComponent> )
  } )
}
