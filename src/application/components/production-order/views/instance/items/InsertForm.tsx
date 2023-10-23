import React, {
  useCallback,
  useEffect,
  useState
}                                   from 'react'
import { useTranslationFunction }   from '../../../../../../components/Translation/useTranslation'
import {
  FORMAT_QUANTITY_STANDARD,
  IFieldsRefs,
  useValidation
}                                   from '../../../../../../validation'
import { useProductionOrderForm }   from '../../../../../../store/production-order/useProductionOrder'
import { TItem }                    from '../../../../../../graphql/type_logic/types'
import { useBackground }            from '../../../../../hooks/useBackgroundPanel'
import {
  KeyboardEventCodes,
  useExternalKeyboard
}                                   from '../../../../../../components/hooks/useExternalKeybaord'
import _                            from 'lodash'
import { processErrorGraphQL }      from '../../../../../../apollo'
import { AutoCompleteFindItem }     from '../../../../autocomplete/AutoCompleteFindItem'
import {
  faBarcode,
  faTable
}                                   from '@fortawesome/free-solid-svg-icons'
import ButtonShortcut               from '../../../../../../components/Button/ButtonShortcut'
import AutoCompleteResultRenderItem from '../../../../items/autocomplete/AutoCompleteResultRenderItem'
import InputTextWithValidation      from '../../../../../../components/withValidation/InputTextWithValidation'
import { FOCUS_ID }                 from '../../../../../constants/FocusElementIDs'
import { toNumberFixed }            from '../../../../../utils/Utils'

interface IProductionOrderItemFormModel {
  quantity : string
}

const ProductionOrderItemForm = ( { productionOrderId } : { productionOrderId : string } ) => {

  const { translate } = useTranslationFunction()
  const validation = useValidation<IProductionOrderItemFormModel>()

  const { insertProductionOrderItem } = useProductionOrderForm( productionOrderId )
  const [currentItem, setCurrentItem] : [ TItem, ( r : TItem ) => void ] = useState( {} as TItem )
  const [showFindItem, setShowFindItem] = useState( { visible : false } )
  const [resetValidation, setResetValidation] = useState( { reset : false } )
  const [focusSearch, setFocusSearch] = useState( { value : '' } )
  const [focusElement, setFocusElement] : [ IFieldsRefs, ( r : IFieldsRefs ) => void ] = useState( {} as IFieldsRefs )

  const { resetValidations, getFieldRef, validate, setFieldValue, setFieldError } = validation

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

  const openFindItem = () => {
    if ( showFindItem?.visible ) {
      return
    }
    openBackgroundFindItem()
    setShowFindItem( { visible : true } )
    setFocusSearch( { value : '' } )
    setResetValidation( { reset : true } )
  }
  const handlerSetFocus = ( field : string ) => {
    const refData = getFieldRef( field )
    if ( refData && refData.ref ) {
      setFocusElement( refData )
    }
  }

  const handlerItemSelected = React.useCallback( ( item : TItem ) => {
    setCurrentItem( item || {} )
    if ( item && item.id ) {
      closeBackgroundFindItem()
      handlerSetFocus( 'quantity' )
    }
  }, [setCurrentItem, handlerSetFocus, closeBackgroundFindItem] )

  const handlerInsertItem = async () => {
    const { error, data, validations, refs } = await validate()
    if ( error ) {
      const fieldRef : IFieldsRefs | undefined = refs.find( ( { field } ) => _.get( validations, `validations.${ field }.error` ) )
      fieldRef && setFocusElement( { ...fieldRef as IFieldsRefs } )
      return
    }
    if ( !currentItem.id ) {
      openFindItem()
      return
    }

    if (!data.quantity || data.quantity.length === 0) {
      setFieldError('quantity', translate( 'REQUIRED_FIELD' ))
      handlerSetFocus('quantity')
      return
    }

    try {
      await insertProductionOrderItem( {
        itemId : Number( currentItem.id ),
        quantity : toNumberFixed( data.quantity )
      } )
      handlerItemSelected( {} as TItem )
      await openFindItem()
      await resetValidations( true )
    } catch ( e ) {
      processErrorGraphQL( e, validation )
    }
  }

  const { setRef } = useExternalKeyboard( ( e : KeyboardEvent ) => {

    switch ( e.key ) {
      case KeyboardEventCodes.F5:
        openFindItem()
        return

      case KeyboardEventCodes.Enter:
        e.preventDefault()
        handlerInsertItem().then()
        break
    }
  }, true, [KeyboardEventCodes.Tab, KeyboardEventCodes.F5, KeyboardEventCodes.Enter], 'production-order-item-insert-form' )

  const handlerCloseFunction = useCallback( async () => {
    const { validations, refs } = await validation.validate()
    await validation.resetValidations()
    let fieldRef : IFieldsRefs | undefined = refs.find( ( { field } ) => _.get( validations, `validations.${ field }.error` ) )
    if ( !fieldRef ) {
      fieldRef = refs.find( x => x.field === 'discount' )
      if ( !fieldRef ) {
        fieldRef = getFieldRef( 'quantity' )
      }
    }
    fieldRef && setFocusElement( { ...fieldRef } )
  }, [setFocusElement, getFieldRef] )

  const handlerCloseFindItem = React.useCallback( () => {
    closeBackgroundFindItem()
    setResetValidation( { reset : true } )
    handlerCloseFunction().then()
  }, [setResetValidation, closeBackgroundFindItem, handlerCloseFunction] )

  return (
    <div className={ 'pt-4 px-2 pr-0 mt-1 relative hw-invoice-insert-item-form-root pr-3' } ref={ setRef }>
      <div className={ `hw-auto-item-search-box ${ showFindItem.visible ? '' : ' hw-auto-item-search-box-hide' }` }>
        <AutoCompleteFindItem
                    processSelected={ handlerItemSelected }
                    focus={ focusSearch }
                    closeFun={ handlerCloseFindItem }
        />
      </div>
      <ButtonShortcut
                icon={ faBarcode }
                onClick={ openFindItem }
                style={ { position : 'absolute', top : '3px', left : '5px' } }
                label={ translate( 'WAREHOUSES_TAB_ITEM' ) }
                shortcut={ KeyboardEventCodes.F5 }
                classNames={ 'hw-shortcut-button primary sm hw-button-border-color' }
      />
      <div className={ 'd-flex align-items-center w-100 p-0' }>
        <div className={ 'flex-2 relative pl-0 pr-3' }>
          <div className={ 'hw-invoice-insert-item-form-preview mt-1' } onClick={ openFindItem }>
            <AutoCompleteResultRenderItem data={ currentItem }/>
          </div>
        </div>
        <div className={ 'ml-3 hw-input-discount' }>
          <InputTextWithValidation
                        validation={ {
                          useValidation : validation,
                          model : 'quantity',
                          format : {
                            rule : FORMAT_QUANTITY_STANDARD,
                            validationMessage : 'Enter valid quantity'
                          }
                        } }
                        selectOnFocus={ false }
                        align={ 'align-right' }
                        label={ translate( 'LABEL_QTY' ) }
          />
        </div>
        <div className={ 'pl-2' }>
          <ButtonShortcut
                        focusId={ FOCUS_ID.PRODUCTION_ORDER.INSERT_FORM.ADD_BUTTON }
                        icon={ faTable }
                        onClick={ handlerInsertItem }
                        label={ translate( 'SMALL_BUTTON_ADD' ) }
                        classNames={ 'hw-shortcut-button primary sm hw-button-border-color' }
          />
        </div>
      </div>
    </div>
  )
}

export default ProductionOrderItemForm