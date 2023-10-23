import React, {
  useCallback,
  useEffect,
  useState
}                                    from 'react'
import {
  faFileInvoice,
  faPercentage,
  faUserTie
}                                    from '@fortawesome/free-solid-svg-icons'
import * as _                        from 'lodash'
import {
  TCustomer,
  TInvoiceHeader,
  TProformaInvoice
}                                    from '../../../../../../graphql/type_logic/types'
import {
  IFieldsRefs,
  required,
  useValidation
}                                    from '../../../../../../validation'
import { useProformaInvoiceQuery }   from '../../../../../../graphql/graphql'
import { CONSTANT_WAREHOUSE }        from '../../../../../constants'
import {
  delayCallFunction,
  formatDateLong,
  formatPrice,
  toNumberFixed
} from '../../../../../utils/Utils'
import { openDialogAddEditCustomer } from '../../../../customer/modal/CustomerSearch'
import {
  KeyboardEventCodes,
  useExternalKeyboard
}                                    from '../../../../../../components/hooks/useExternalKeybaord'
import { processErrorGraphQL }       from '../../../../../../apollo'
import CustomerViewShort             from '../../../../customer/views/CustomerViewShort'
import ButtonShortcut                from '../../../../../../components/Button/ButtonShortcut'
import SelectTextWithValidation      from '../../../../../../components/withValidation/SelectTextWithValidation'
import InputTextWithValidation       from '../../../../../../components/withValidation/InputTextWithValidation'
import DialogButtonsSaveUpdate       from '../../../../_common/DialogButtonsSaveUpdate'
import {
  DialogModalRootComponent,
  EasyDialogApolloProvider
}                                    from '../../../../../../components/EasyModel/EasyModal'
import { CenteredDialog }            from '../../../../../../components/Dialog/DialogBasic'

interface IErrorHeaderState {
  customer? : boolean | string
}

interface IProformaInvoiceHeaderFormProps {
  successFunction : ( invoice : TProformaInvoice ) => Promise<any>
  cancelFunction? : () => void
  proformaInvoiceId? : string
  fieldFocus? : string
}

const ProformaInvoiceHeaderForm = ( { successFunction, cancelFunction, proformaInvoiceId, fieldFocus } : IProformaInvoiceHeaderFormProps ) => {
  const validation = useValidation<TInvoiceHeader>()
  const [focusElement, setFocusElement] : [ IFieldsRefs, ( r : IFieldsRefs ) => void ] = useState( {} as IFieldsRefs )
  const [stateError, setError] : [ IErrorHeaderState, ( r : IErrorHeaderState ) => void ] = useState( {} as IErrorHeaderState )

  const { state, setFieldValue, getFieldRef, refFields } = validation

  const { data : _invoice } = useProformaInvoiceQuery( {
    notifyOnNetworkStatusChange : true,
    fetchPolicy : 'network-only',
    variables : {
      id : Number( proformaInvoiceId )
    },
    skip : !proformaInvoiceId
  } )
  const proformaInvoice = React.useMemo( () => !_invoice || !_invoice.proformaInvoice ? void( 0 ) : _invoice.proformaInvoice, [_invoice] )

  useEffect( () => {
    if ( !proformaInvoice ) {
      setFieldValue( 'flag', `${ CONSTANT_WAREHOUSE.TYPES.WHOLESALE }`, false )
      return
    }

    if ( proformaInvoice?.customer ) {
      setFieldValue( 'customer', proformaInvoice?.customer as any, false )
    }

    if ( proformaInvoice?.discount ) {
      setFieldValue( 'discountDefault', `${ formatPrice( proformaInvoice?.discountDefault as any ) }`, false )
    }

    if ( proformaInvoice?.date ) {
      setFieldValue( 'date', formatDateLong( proformaInvoice?.date ), false )
    }

    ['flag', 'number'].forEach( ( s : string ) => _.get( proformaInvoice, s ) ? setFieldValue( s, _.get( proformaInvoice, s ).toString(), true ) : null )

  }, [proformaInvoice, setFieldValue] )
  
  const handlerSetFocus = useCallback( ( field : string ) => {
    const refData = getFieldRef( field )
    if ( refData && refData.ref ) {
      delayCallFunction(() => setFocusElement(refData),200)
    }
  }, [getFieldRef] )
  
  useEffect( () => {
    if ( refFields && refFields.length !== 0 && !proformaInvoiceId && !state.customer ) {
      delayCallFunction(handlerFindCustomer,200)
      return
    }
  }, [refFields, state.customer, proformaInvoiceId] )

  useEffect( () => {
    if ( focusElement.ref && focusElement.ref.current ) {
      focusElement.ref.current.focus()
    }
  }, [focusElement] )
  
  useEffect(() => {
    if (!fieldFocus || fieldFocus === 'customer') {
      return
    }
    handlerSetFocus(fieldFocus)
  }, [fieldFocus, handlerSetFocus])

  const setCustomer = useCallback( ( customer : TCustomer ) => {
    setError( {} )
    setFieldValue( 'customer', customer as any, true )
    handlerSetFocus( 'flag' )
  }, [setFieldValue, handlerSetFocus] )

  const handlerFindCustomer = () => {
    openDialogAddEditCustomer( setCustomer )
  }

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
          <CustomerViewShort customer={ state.customer as any as TCustomer } error={ stateError.customer } namePlaceholder={ 'CUSTOMER NAME' }/>
          <ButtonShortcut
                        icon={ faUserTie }
                        onClick={ handlerFindCustomer }
                        label={ 'customer' }
                        shortcut={ KeyboardEventCodes.F2 }
                        classNames={ 'hw-shortcut-button primary sm hw-button-border-color' }
          />
        </div>
        <div className={ 'd-flex justify-content-between align-items-center w-100 pr-3' }>
          <div className={ 'hw-document-header-other-parts' }>
            <SelectTextWithValidation
                            label={ 'Warehouse' }
                            helperText={ '' }
                            focusOnMount
                            className={ 'lined-version' }
                            options={ CONSTANT_WAREHOUSE.TYPES_SELECT }
                            validation={ {
                              useValidation : validation,
                              model : 'flag',
                              rule : {
                                required
                              }
                            } }
            />
          </div>
          <div className={ ' hw-invoice-header-form-discount-div' }>
            <InputTextWithValidation
                            required
                            label={ 'Discount' }
                            helperText={ '' }
                            classNames={ 'lined-version' }
                            fullWidth
                            selectOnFocus
                            iconAction={ {
                              icon : faPercentage
                            } }
                            align={ 'align-right' }
                            validation={ {
                              useValidation : validation,
                              model : 'discountDefault',
                              format : {
                                rule : {
                                  format : 'CURRENCY',
                                  decimalChar : '.',
                                  decimalPlace : 2,
                                  maxValue : 99.99
                                },
                                validationMessage : 'Enter valid value'
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
                        update={ !!proformaInvoiceId }
          />
        </div>
      </div>
    </>
  )
}

export default ProformaInvoiceHeaderForm

export interface IDialogProformaInvoiceHeaderForm {
  handlerSuccess : ( invoice : TProformaInvoice ) => Promise<any>,
  proformaInvoiceId? : string
  fieldFocus? : string
}

export const openDialogProformaInvoiceHeaderForm = ( { handlerSuccess, proformaInvoiceId, fieldFocus } : IDialogProformaInvoiceHeaderForm ) => {
  EasyDialogApolloProvider( ( closeDialog : () => any, openDialog : ( data : any ) => any ) => {
    openDialog( <DialogModalRootComponent name={ 'dialog-proforoma-invoice-header-form-070740702705477' } closeFn={ closeDialog }>
      <CenteredDialog
                title={ 'Proforma Invoice header' }
                closeAction={ closeDialog }
                Component={ ProformaInvoiceHeaderForm }
                componentRenderProps={ {
                  successFunction : handlerSuccess,
                  proformaInvoiceId,
                  fieldFocus,
                  cancelFunction : closeDialog
                } }
      />
    </DialogModalRootComponent> )
  } )
}
