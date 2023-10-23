import React, {
  useEffect,
  useMemo,
  useState
}                                     from 'react'
import ButtonShortcut                 from '../../../../../../components/Button/ButtonShortcut'
import {
  faBarcode,
  faLevelDownAlt
}                                     from '@fortawesome/free-solid-svg-icons'
import {
  KeyboardEventCodes,
  useExternalKeyboard
}                                     from '../../../../../../components/hooks/useExternalKeybaord'
import InputTextWithValidation        from '../../../../../../components/withValidation/InputTextWithValidation'
import {
  FORMAT_QUANTITY_STANDARD,
  IFieldsRefs,
  required,
  useValidation
}                                     from '../../../../../../validation'
import {
  TWarehouseItemInfo,
  TWorkOrderItem
}                                     from '../../../../../../graphql/type_logic/types'
import {
  formatQuantity,
  guid,
  toNumberFixed
}                                     from '../../../../../utils/Utils'
import { useBackground }              from '../../../../../hooks/useBackgroundPanel'
import * as _                         from 'lodash'
import AutoCompleteFindWarehouseItem  from '../../../../autocomplete/AutoCompleteFindWarehouseItem'
import AutoCompleteResultRenderItem   from '../../../../items/autocomplete/AutoCompleteResultRenderItem'
import { useWarehouseItemsInfoQuery } from '../../../../../../graphql/graphql'
import Label                          from '../../../../../../components/basic/Label'

interface ITransferItemFormProps {
  successFun : ( item : TWorkOrderItem ) => void,
  fromWarehouseId? : string
  items: TWorkOrderItem[]
}

const TransferItemForm = ( { items, successFun, fromWarehouseId } : ITransferItemFormProps ) => {

  const validation = useValidation<TWorkOrderItem>()
  const [currentItem, setCurrentItem] : [ TWarehouseItemInfo, ( r : TWarehouseItemInfo ) => void ] = useState( {} as TWarehouseItemInfo )
  const [showFindItem, setShowFindItem] = useState( { visible : false } )

  const { resetValidations, getFieldRef, validate, setFieldValue } = validation
  const [resetValidation, setResetValidation] = useState( { reset : false } )
  const [focusElement, setFocusElement] : [ IFieldsRefs, ( r : IFieldsRefs ) => void ] = useState( {} as IFieldsRefs )

  useEffect( () => {
    if ( focusElement.ref && focusElement.ref.current ) {
      focusElement.ref.current.focus()
    }
  }, [focusElement] )

  useEffect( () => {
    if ( resetValidation.reset && !setFieldValue ) {
      resetValidations( true )
    }
  }, [resetValidation, resetValidations, setFieldValue] )

  const _closeFindItem = React.useCallback( () => {
    setShowFindItem( { visible : false } )
  }, [setShowFindItem] )

  const { closeBackground : closeBackgroundFindItem, openBackground : openBackgroundFindItem } = useBackground( _closeFindItem )
  const [focusSearch, setFocusSearch] = useState( { value : '' } )

  const handlerSetFocus = ( field : string ) => {
    const refData = getFieldRef( field )
    if ( refData && refData.ref ) {
      setFocusElement( refData )
    }
  }

  const openFindItem = () => {
    if ( showFindItem?.visible ) {
      return
    }
    openBackgroundFindItem()
    setShowFindItem( { visible : true } )
    setShowFindItem( { visible : true } )
    setFocusSearch( { value : '' } )
    setResetValidation( { reset : true } )
  }

  const handlerCloseFindItem = () => {
    closeBackgroundFindItem()
    setShowFindItem( { visible : false } )
    setResetValidation( { reset : true } )
  }

  const handlerItemSelected = React.useCallback( ( item : TWarehouseItemInfo ) => {
    setCurrentItem( item || {} )
    if ( item && item.id ) {
      closeBackgroundFindItem()
      handlerSetFocus( 'quantity' )
      setResetValidation( { reset : true } )
    }
  }, [setCurrentItem, handlerSetFocus, setFieldValue] )
    
  const { data : warehouseInfos } = useWarehouseItemsInfoQuery( {
    variables : {
      filter : {
        $and : [
          { warehouseItemId : Number( _.get(currentItem.warehouseItem,'id') ) },
          { warehouseId : Number( fromWarehouseId ) }
        ]
      },
      include : [
        {
          model : 'Warehouse'
        },
        {
          model : 'WarehouseItem'
        }
      ]
    },
    skip : !currentItem || !currentItem.warehouseItem || !_.get(currentItem.warehouseItem,'id') || !fromWarehouseId
  } )
    
  const quantityOnStack = useMemo(() => {
    let quantityOnStack = 0
    if (warehouseInfos && warehouseInfos.data && warehouseInfos.data.items.length !== 0) {
      const _item = warehouseInfos.data.items[0]
      quantityOnStack = _.get(_item,'warehouseItem.quantityOnStack')
      const itemQty = items ? (items as any).reduce((acc:any,item:any) => {
        if (Number(item.warehouseItemInfoId) === Number(_item.id)) {
          return _.add(acc,item.quantity)
        }
        return acc
      } ,0) : 0
      quantityOnStack = _.round(_.subtract(quantityOnStack,itemQty),2)
    }
    return quantityOnStack
  },[warehouseInfos, items])

  const handlerInsertItem = async () => {
    const { data, error, validations, refs } = await validate()

    if ( error ) {
      const fieldRef : IFieldsRefs | undefined = refs.find( ( { field } ) => _.get( validations, `validations.${ field }.error` ) )
      fieldRef && fieldRef.ref.current.focus()
      return
    }

    if ( !currentItem.id ) {
      openFindItem()
      return
    }

    const _data = {
      id : guid(),
      warehouseItemInfo : currentItem,
      warehouseItemInfoId : Number( currentItem.id ),
      quantity : toNumberFixed( Number( data.quantity ) )
    } as any

    successFun( _data )
    handlerItemSelected( {} as TWarehouseItemInfo )
    openFindItem()
    await resetValidations( true )
  }

  const { setRef } = useExternalKeyboard( ( e : KeyboardEvent ) => {

    switch ( e.key ) {
      case KeyboardEventCodes.F5:
        openFindItem()
        return

      case KeyboardEventCodes.Enter || KeyboardEventCodes.F9:
        e.preventDefault()
        handlerInsertItem()
        break
    }
  }, true, [KeyboardEventCodes.Tab, KeyboardEventCodes.F2, KeyboardEventCodes.F5, KeyboardEventCodes.F9, KeyboardEventCodes.Enter], 'transfer-item-insert-form' )

  return (
    <div className={ 'd-flex justify-content-between align-items-center' } ref={ setRef }>
      <div className={ `hw-auto-item-search-box ${ showFindItem.visible ? '' : ' hw-auto-item-search-box-hide' }` }>
        <AutoCompleteFindWarehouseItem label={ 'Find item' } helperText={ 'barcode , code , shortName' } closeFun={ handlerCloseFindItem } warehouseId={ `${ fromWarehouseId }` } processSelected={ handlerItemSelected } focus={ focusSearch }/>
      </div>

      <div className={ 'd-flex align-items-center w-100 p-0' }>
        <ButtonShortcut
                    icon={ faBarcode }
                    onClick={ openFindItem }
                    style={ { minWidth : '45px' } }
                    label={ 'item' }
                    shortcut={ KeyboardEventCodes.F5 }
                    classNames={ 'hw-shortcut-button primary sm hw-button-border-color' }
        />
        <div className={ 'relative pl-2 flex-2' } onClick={ openFindItem }>
          <div className={ 'hw-calculation-item-preview mt-1' }>
            <AutoCompleteResultRenderItem data={ currentItem.item as any }/>
          </div>
        </div> 
        <div className={'px-2 mx-2'}>
          <div className={'d-flex flex-column text-upper'}>
            <Label label={'Qty on stack'}/>
            <div className={'d-flex flex-column justify-content-center align-items-center color-primary pb-4 font-smaller-1 flex-1'}>
              <div>{ quantityOnStack > 0 ? formatQuantity(quantityOnStack) : '###.###' }</div>
            </div>
          </div>
        </div>
        <div className={ 'pl-0 col-1 hw-calculation-insert-item-form-quantity-root' }>
          <InputTextWithValidation
                        validation={ {
                          useValidation : validation,
                          model : 'quantity',
                          rule : {
                            required
                          },
                          format : {
                            rule : FORMAT_QUANTITY_STANDARD,
                            validationMessage : 'Enter valid quantity'
                          }
                        } }
                        selectOnFocus={ false }
                        align={ 'align-right' }
                        label={ 'Qty' }
          />
        </div>
        <div className={ 'pl-2' }>
          <ButtonShortcut
                        icon={ faLevelDownAlt }
                        label={ 'add' }
                        shortcut={ 'EN' }
                        onClick={ handlerInsertItem }
                        style={ { minWidth : '45px' } }
                        classNames={ 'hw-shortcut-button primary sm hw-button-border-color hw-shortcut-button-rotate-icon' }
          />
        </div>
      </div>
    </div>
  )
}

export default TransferItemForm