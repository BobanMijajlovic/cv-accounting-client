import React, {
  useCallback,
  useEffect,
  useState
}                                    from 'react'
import {
  faFileInvoice,
  faUserTie
}                                    from '@fortawesome/free-solid-svg-icons'
import * as _                        from 'lodash'
import {
  TCustomer,
  TInvoiceHeader,
  TReturnInvoice
}                                    from '../../../../../../graphql/type_logic/types'
import { useReturnInvoiceQuery }     from '../../../../../../graphql/graphql'
import { useTranslationFunction }    from '../../../../../../components/Translation/useTranslation'
import {
  IFieldsRefs,
  required,
  useValidation
}                                    from '../../../../../../validation'
import { openDialogAddEditCustomer } from '../../../../customer/modal/CustomerSearch'
import { CONSTANT_WAREHOUSE }        from '../../../../../constants'
import {
  formatDateLong,
  toNumberFixed
}                                    from '../../../../../utils/Utils'
import {
  KeyboardEventCodes,
  useExternalKeyboard
}                                    from '../../../../../../components/hooks/useExternalKeybaord'
import { processErrorGraphQL }       from '../../../../../../apollo'
import CustomerViewShort             from '../../../../customer/views/CustomerViewShort'
import ButtonShortcut                from '../../../../../../components/Button/ButtonShortcut'
import SelectTextWithValidation      from '../../../../../../components/withValidation/SelectTextWithValidation'
import {
  DialogModalRootComponent,
  EasyDialogApolloProvider
}                                    from '../../../../../../components/EasyModel/EasyModal'
import { CenteredDialog }            from '../../../../../../components/Dialog/DialogBasic'
import DialogButtonsSaveUpdate       from '../../../../_common/DialogButtonsSaveUpdate'

interface IErrorHeaderState {
  customer? : boolean | string
}

interface IInvoiceHeaderFormProps {
  successFunction : ( invoice : TReturnInvoice ) => Promise<any>
  cancelFunction? : () => void
  returnInvoiceId? : string
  fieldFocus? : string
}

const Form = ( { successFunction, cancelFunction, returnInvoiceId, fieldFocus } : IInvoiceHeaderFormProps ) => {
  const { translate } = useTranslationFunction()
  const validation = useValidation<TInvoiceHeader>()
  const [focusElement, setFocusElement] : [ IFieldsRefs, ( r : IFieldsRefs ) => void ] = useState( {} as IFieldsRefs )
  const [stateError, setError] : [ IErrorHeaderState, ( r : IErrorHeaderState ) => void ] = useState( {} as IErrorHeaderState )

  const { state, setFieldValue, getFieldRef, refFields } = validation

  const { data : _returnInvoice } = useReturnInvoiceQuery( {
    notifyOnNetworkStatusChange : true,
    fetchPolicy : 'network-only',
    variables : {
      id : Number( returnInvoiceId )
    },
    skip : !returnInvoiceId
  } )
  const returnInvoice = React.useMemo( () => !_returnInvoice || !_returnInvoice.returnInvoice ? void( 0 ) : _returnInvoice.returnInvoice, [_returnInvoice] )

  const handlerSetFocus = useCallback( ( field : string ) => {
    const refData = getFieldRef( field )
    if ( refData && refData.ref ) {
      setFocusElement( refData )
    }
  }, [getFieldRef] )
  const setCustomer = useCallback( ( customer : TCustomer ) => {
    setError( {} )
    setFieldValue( 'customer', customer as any, true )
    handlerSetFocus( 'flag' )
  }, [setFieldValue, handlerSetFocus] )

  const handlerFindCustomer = () => {
    openDialogAddEditCustomer( setCustomer )
  }

  useEffect( () => {
    if ( !returnInvoice ) {
      setFieldValue( 'flag', `${ CONSTANT_WAREHOUSE.TYPES.WHOLESALE }`, false )
      return
    }

    if ( returnInvoice?.customer ) {
      setFieldValue( 'customer', returnInvoice?.customer as any, false )
    }

    if ( returnInvoice?.date ) {
      setFieldValue( 'date', formatDateLong( returnInvoice?.date ), false )
    }

    ['flag', 'number'].forEach( ( s : string ) => _.get( returnInvoice, s ) ? setFieldValue( s, _.get( returnInvoice, s ).toString(), true ) : null )

  }, [returnInvoice, setFieldValue] )

  useEffect( () => {
    if ( refFields && refFields.length !== 0 && !returnInvoiceId && !state.customer ) {
      setTimeout( () => handlerFindCustomer(), 200 )
      return
    }
  }, [refFields, state.customer, returnInvoiceId] )

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

  const { setRef } = useExternalKeyboard( ( e : KeyboardEvent ) => {
    switch ( e.key ) {
      case KeyboardEventCodes.F2:
        handlerFindCustomer()
        return
    }
  }, true, [KeyboardEventCodes.F2], 'invoice-header-form' )

  const handlerSubmit = async () => {
    const { error, data, refs, validations } = await validation.validate()
    if ( error ) {
      const fieldRef : IFieldsRefs | undefined = refs.find( ( { field } ) => _.get( validations, `validations.${ field }.error` ) )
      fieldRef && fieldRef.ref.current.focus()
      return
    }

    if ( !data.customer ) {
      setError( {
        customer : 'Customer is required!'
      } )
      return
    }

    const _data = {
      header : {
        customerId : Number( ( data.customer as any as TCustomer ).id ),
        flag : Number( data.flag ),
        discountDefault : data.discountDefault ? toNumberFixed( data.discountDefault as any ) : void( 0 )
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

  return (
    <>
      <div className={ 'container relative hw-invoice-header-form-root  shadow-lg p-3 ' } ref={ setRef }>
        <div className={ 'd-flex justify-content-between hw-invoice-header-customer-part color-primary pb-2' }>
          <CustomerViewShort customer={ state.customer as any as TCustomer } error={ stateError.customer } namePlaceholder={ translate( 'LABEL_CUSTOMER_NAME' ) }/>
          <ButtonShortcut
                        icon={ faUserTie }
                        onClick={ handlerFindCustomer }
                        label={ translate( 'BUTTON_CUSTOMER' ) }
                        shortcut={ KeyboardEventCodes.F2 }
                        classNames={ 'hw-shortcut-button primary sm hw-button-border-color' }
          />
        </div>
        <div className={ 'd-flex justify-content-between align-items-center w-100 pr-3' }>
          <div className={ 'hw-document-header-other-parts' }>
            <SelectTextWithValidation
                            label={ translate( 'LABEL_WAREHOUSE' ) }
                            helperText={ '' }
                            focusOnMount
                            className={ 'lined-version' }
                            options={ CONSTANT_WAREHOUSE.TYPES_SELECT }
                            validation={ {
                              useValidation : validation,
                              model : 'flag',
                              rule : {
                                required : required( { message : translate( 'REQUIRED_FIELD' ) } )
                              }
                            } }
            />
          </div>
        </div>
        <div className={ 'd-flex w-100' }>
          <DialogButtonsSaveUpdate
                        cancelFun={ handlerCancelFunction }
                        submitFun={ handlerSubmit }
                        icon={ faFileInvoice }
                        update={ !!returnInvoiceId }
          />
        </div>
      </div>
    </>
  )
}

export default Form

export interface IDialogReturnInvoiceHeaderForm {
  handlerSuccess : ( invoice : TReturnInvoice ) => Promise<any>,
  returnInvoiceId? : string
  fieldFocus? : string
}

export const openDialogReturnInvoiceHeaderForm = ( { handlerSuccess, returnInvoiceId, fieldFocus } : IDialogReturnInvoiceHeaderForm ) => {
  EasyDialogApolloProvider( ( closeDialog : () => any, openDialog : ( data : any ) => any ) => {
    openDialog( <DialogModalRootComponent name={ 'dialog-return-invoice-header-form-72070707052010' } closeFn={ closeDialog }>
      <CenteredDialog
                title={ 'Return invoice header' }
                closeAction={ closeDialog }
                Component={ Form }
                componentRenderProps={ {
                  successFunction : handlerSuccess,
                  returnInvoiceId,
                  fieldFocus,
                  cancelFunction : closeDialog
                } }
      />
    </DialogModalRootComponent> )
  } )
}
