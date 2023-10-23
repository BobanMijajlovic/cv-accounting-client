import React, {
  useCallback,
  useEffect,
  useMemo,
  useState
}                                        from 'react'
import {
  TExpense,
  TItem,
  TProductionOrder
}                                        from '../../../../../../graphql/type_logic/types'
import { useTranslationFunction }        from '../../../../../../components/Translation/useTranslation'
import {
  FORMAT_QUANTITY_STANDARD,
  IFieldsRefs,
  required,
  useValidation
}                                        from '../../../../../../validation'
import {
  useNormativesQuery,
  useProductionOrderQuery
}                                        from '../../../../../../graphql/graphql'
import {
  formatQuantity,
  toNumberFixed
}                                        from '../../../../../utils/Utils'
import * as _                            from 'lodash'
import SelectTextWithValidation          from '../../../../../../components/withValidation/SelectTextWithValidation'
import { queryVariablesNormatives }      from '../../../../../../graphql/variablesQ'
import {
  _focusElementAfter,
  DialogModalRootComponent,
  EasyDialogApolloProvider
}                                        from '../../../../../../components/EasyModel/EasyModal'
import { FOCUS_ID }                      from '../../../../../constants/FocusElementIDs'
import ConditionalRendering              from '../../../../../../components/Util/ConditionalRender'
import {
  faIndustry,
  faSearch
}                                        from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon }               from '@fortawesome/react-fontawesome'
import { openDialogPreviewNormative }    from '../../../../normative/preview/NormativePreview'
import InputTextWithValidation           from '../../../../../../components/withValidation/InputTextWithValidation'
import DatePickerWithValidation          from '../../../../../../components/withValidation/DatePickerWithValidation'
import DialogButtonsSaveUpdate           from '../../../../_common/DialogButtonsSaveUpdate'
import { CenteredDialog }                from '../../../../../../components/Dialog/DialogBasic'
import { AutoCompleteFindNormativeItem } from '../../../../autocomplete/AutoCompleteFindNormativeItem'
import ItemShortView                     from '../../../../items/view/ItemShortView'
import AdditionalExpensesPart            from '../../../../calculation/modal/document-header/AdditionalExpensesPart'
import { openDialogAdditionalExpenses }  from '../../../../calculation/modal/forms/AdditionalExpenses'
import { IAdditionalExpense }            from '../../../../calculation/modal/DocumentHeaderForm'
import {
  KeyboardEventCodes,
  useExternalKeyboard
}                                        from '../../../../../../components/hooks/useExternalKeybaord'
import {
  IUseOptimizeEventData,
  useOptimizeEventClick
}                                        from '../../../../../../components/hooks/useOptimizeEventClick'
import { CONSTANT_CALCULATION }          from '../../../../../constants'
import { processErrorGraphQL }           from '../../../../../../apollo'
import { calculateFinances }             from '../../../../calculation/util'

interface IErrorHeaderState {
  item? : boolean | string
}

interface IProductionOrderHeaderFormProps {
  successFunction : ( productionOrder : TProductionOrder ) => Promise<any>
  cancelFunction? : () => void
  productionOrderId? : string
  fieldFocus? : string
}

type TProductionOrderModel = TProductionOrder & {
  additionalExpenses : IAdditionalExpense[]
}

const ProductionOrderHeaderForm = ( { successFunction, cancelFunction, productionOrderId, fieldFocus } : IProductionOrderHeaderFormProps ) => {

  const { translate } = useTranslationFunction()
  const validation = useValidation<TProductionOrderModel>()
  const [focusElement, setFocusElement] : [ IFieldsRefs, ( r : IFieldsRefs ) => void ] = useState( {} as IFieldsRefs )
  const [stateError, setError] : [ IErrorHeaderState, ( r : IErrorHeaderState ) => void ] = useState( {} as IErrorHeaderState )
  const [normativePreview, setNormativePreview] : [ boolean, ( b : boolean ) => void ] = useState( false as boolean )
  const [focusSearch, setFocusSearch] = useState( { value : '' } )

  const { state, getFieldRef, setFieldValue, addArrayData, removeArrayData } = validation

  const additionalExpenses = useMemo( () => state.additionalExpenses, [state] )

  const { data : _productionOrder } = useProductionOrderQuery( {
    notifyOnNetworkStatusChange : true,
    fetchPolicy : 'network-only',
    variables : {
      id : Number( productionOrderId )
    },
    skip : !productionOrderId
  } )

  const productionOrder = useMemo( () => !_productionOrder || !_productionOrder.productionOrder ? void( 0 ) : _productionOrder.productionOrder as TProductionOrder, [_productionOrder] )

  const variables = React.useMemo( () => {
    const item = state?.item as any
    if ( !state || !item || !item.id ) {
      return
    }
    return queryVariablesNormatives( Number( item.id ) )
  }, [state] )

  const { data } = useNormativesQuery( {
    notifyOnNetworkStatusChange : true,
    fetchPolicy : 'cache-and-network',
    variables,
    skip : !variables
  } )

  const norms = useMemo( () => {
    if ( !data || !data.data || !data.data.items ) {
      return []
    }
    return data.data.items.map( x => ( {
      value : x.id,
      label : x.description
    } ) )
  }, [data] )

  const handlerSetFocus = useCallback( ( field : string ) => {
    const refData = getFieldRef( field )
    if ( refData && refData.ref ) {
      setFocusElement( refData )
    }
  }, [getFieldRef] )

  useEffect( () => {
    if ( !norms || norms.length === 0 ) {
      return
    }
    setFieldValue( 'normativeId', `${ norms[0].value }`, true )
        // handlerSetFocus('normativeId')
    return
  }, [norms, setFieldValue] )

  useEffect( () => {
    if ( !productionOrder ) {
      setFocusSearch( { value : '' } )
      return
    }

    if ( productionOrder?.item ) {
      setFieldValue( 'item', productionOrder?.item as any, false )
    }
    if ( productionOrder?.quantity ) {
      setFieldValue( 'quantity', formatQuantity( productionOrder?.quantity ), false )
    }

    if ( productionOrder?.date ) {
      setFieldValue( 'date', productionOrder?.date, false )
    }
    ['number', 'normativeId'].forEach( ( s : string ) => _.get( productionOrder, s ) ? setFieldValue( s, _.get( productionOrder, s ).toString(), true ) : null )
   
    if (productionOrder?.expense && (productionOrder?.expense as any).length !== 0) {
      const expenses = (productionOrder?.expense as any).map((expense: TExpense) => ({
        ...expense,
        items : ( expense as any ).items.map( ( item : any ) => {
          return {
            financeMP : `${ item.financeMP }`,
            financeVP : `${ calculateFinances( false, item.financeMP, item.taxPercent ) }`,
            taxId : `${ item.taxId }`,
            description : item.description
          }
        } )
      }))
      setFieldValue('additionalExpenses',expenses as any,false)
    }
   
    setFocusSearch( { value : '' } )
  }, [productionOrder, setFieldValue, setFocusSearch] )

  useEffect( () => {
    if ( state.normativeId ) {
      setNormativePreview( true )
      return
    }
  }, [state] )

  useEffect( () => {
    if ( focusElement.ref && focusElement.ref.current ) {
      focusElement.ref.current.focus()
    }
  }, [focusElement] )

  useEffect( () => {
    if ( !fieldFocus || fieldFocus === 'customer' ) {
      return
    }
    handlerSetFocus( fieldFocus )
  }, [fieldFocus, handlerSetFocus] )

  const handlerSubmit = async () => {
    const { error, data, refs, validations } = await validation.validate()
    if ( error ) {
      const fieldRef : IFieldsRefs | undefined = refs.find( ( { field } ) => _.get( validations, `validations.${ field }.error` ) )
      fieldRef && fieldRef.ref.current.focus()
      return
    }
    if ( !data.item ) {
      setError( {
        item : 'Item is required!'
      } )
      return
    }

    const expense = data.additionalExpenses && data.additionalExpenses.length !== 0 ? data.additionalExpenses.map( expense => {
      return {
        invoiceNumber : expense.invoiceNumber,
        invoiceDate : new Date( expense.invoiceDate ).toISOString(),
        dueDate : new Date( expense.dueDate ).toISOString(),
        customerId : Number( expense.customer.id ),
        financeMP : toNumberFixed( expense.financeMP ),
        financeTax : toNumberFixed( expense.financeTax ),
        items : expense.items && expense.items.map( ( item ) => {
          return {
            taxId : Number( item.taxId ),
            financeMP : toNumberFixed( item.finance )
          }
        } )
      }
    } ) : void( 0 )

    const _data = {
      header : {
        itemId : Number( ( data.item as any ).id ),
        date : new Date( data.date as string ).toISOString(),
        quantity : toNumberFixed( `${ data.quantity }` ),
        normativeId : Number( data.normativeId ),
        expense : expense
      }
    } as any
    successFunction( _data )
      .then( v => {
        cancelFunction && cancelFunction()
      } )
      .catch( ( e ) => {
        processErrorGraphQL( e, validation )
      } )

  }

  const handlerCancelFunction = () => {
    cancelFunction && cancelFunction()
  }

  const handlerItemSelected = useCallback( ( item : TItem ) => {
    setFieldValue( 'item', item as any, false )
    handlerSetFocus( 'normativeId' )
  }, [setFieldValue, handlerSetFocus] )

  const handlerSelectNormative = useCallback( () => {
    _focusElementAfter( FOCUS_ID.NORMATIVE.ITEM_FORM.ADD_BUTTON )
  }, [_focusElementAfter] )

  const previewNormativeHandler = useCallback( () => {
    state.normativeId && openDialogPreviewNormative( {
      normativeId : `${ state.normativeId }`
    } )
  }, [state, openDialogPreviewNormative] )

  const addAdditionalExpense = async ( extraExpense : IAdditionalExpense ) => {
    await addArrayData( 'additionalExpenses', extraExpense )
  }

  const addNewAdditionalExpense = () => {
    openDialogAdditionalExpenses( addAdditionalExpense, additionalExpenses )
  }

  const { setRef } = useExternalKeyboard( ( e : KeyboardEvent ) => {
    switch ( e.key ) {
      case KeyboardEventCodes.F5:
        addNewAdditionalExpense()
        return
    }
  }, true, [KeyboardEventCodes.F5], 'production-order-header-form' )

  const { onClickHandler } = useOptimizeEventClick( {
    eventHandler ( data : IUseOptimizeEventData ) {
      if ( data.action === CONSTANT_CALCULATION.EVENTS.HEADER.EXTRA_EXPENSE_REMOVE ) {
        removeArrayData( 'additionalExpenses', Number( data.id ) )
        return
      }
    }
  } )

  return (
    <div
            data-action-root
            onClick={ onClickHandler }
            className={ 'container relative shadow-lg hw-production-order-header-form-root p-3' }
            ref={ setRef }
    >
      <div className={ 'd-flex justify-content-around align-items-center w-100' }>
        <div className={ 'd-flex flex-column justify-content-around h-100 flex-2 pl-2 pr-4 hw-autocomplete-normative-item-find-root' }>
          <AutoCompleteFindNormativeItem focusOnMount processSelected={ handlerItemSelected } focus={ focusSearch }/>
          <div className={ 'hw-find-normative-item-preview-root bg-light' }>
            <ItemShortView item={ ( state.item || {} ) as TItem }/>
          </div>
        </div>
        <div className={ 'hw-normative-item-select-input' }>
          <div className={ 'relative' }>
            <ConditionalRendering condition={ !!normativePreview }>
              <FontAwesomeIcon icon={ faSearch } onClick={ previewNormativeHandler } className={ 'hw-normative-preview-icon' }/>
            </ConditionalRendering>
            <SelectTextWithValidation
                            label={ 'Normative' }
                            helperText={ '' }
                            className={ 'font-smaller-1' }
                            options={ norms }
                            disabled={ norms.length === 0 }
                            fullWidth
                            onChange={ handlerSelectNormative }
                            validation={ {
                              useValidation : validation,
                              model : 'normativeId',
                              rule : {
                                required : required( { message : translate( 'REQUIRED_FIELD' ) } )
                              }
                            } }
            />
          </div>
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
          <DatePickerWithValidation
                        format={ 'dd/MM/yyyy' }
                        helperText={ '' }
                        lined
                        fullWidth
                        selectOnFocus
                        label={ 'Date' }
                        align={ 'align-center' }
                        validation={ {
                          useValidation : validation,
                          model : 'date',
                          rule : {
                            required
                          }
                        } }
          />
        </div>
      </div>
      <AdditionalExpensesPart additionalExpenses={ additionalExpenses } addNew={ addNewAdditionalExpense } shortcutButton={KeyboardEventCodes.F5}/>
      <DialogButtonsSaveUpdate
                cancelFun={ handlerCancelFunction }
                submitFun={ handlerSubmit }
                icon={ faIndustry }
                update={ !!productionOrderId }
      />
    </div>
  )
}

export default ProductionOrderHeaderForm

export interface IDialogProductionOrderHeaderFormProps {
  handlerSuccess : ( productionOrder : TProductionOrder ) => Promise<any>,
  productionOrderId? : string
  fieldFocus? : string
  focusId? : string
}

export const openDialogProductionOrderHeaderForm = ( { handlerSuccess, productionOrderId, fieldFocus, focusId } : IDialogProductionOrderHeaderFormProps ) => {
  EasyDialogApolloProvider( ( closeDialog : () => any, openDialog : ( data : any ) => any ) => {
    openDialog( <DialogModalRootComponent name={ 'dialog-production-order-header-form-70745041001401' } closeFn={ closeDialog }>
      <CenteredDialog
                title={ 'Production order header from' }
                closeAction={ closeDialog }
                Component={ ProductionOrderHeaderForm }
                componentRenderProps={ {
                  successFunction : handlerSuccess,
                  productionOrderId,
                  cancelFunction : closeDialog,
                  fieldFocus,
                  focusId
                } }
      />
    </DialogModalRootComponent> )
  } )
}