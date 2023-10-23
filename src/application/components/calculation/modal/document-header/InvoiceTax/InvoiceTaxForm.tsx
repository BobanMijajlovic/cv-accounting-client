import React, { useEffect }     from 'react'
import {
  IHeaderDocumentState,
  IInvoiceTax
}                               from '../../DocumentHeaderForm'
import {
  FORMAT_CURRENCY_STANDARD,
  IFieldsRefs,
  useValidation
}                               from '../../../../../../validation'
import { get as _get }          from 'lodash'
import {
  DialogModalRootComponent,
  EasyDialogApolloProvider
}                               from '../../../../../../components/EasyModel/EasyModal'
import ConditionalRendering     from '../../../../../../components/Util/ConditionalRender'
import SelectTextWithValidation from '../../../../../../components/withValidation/SelectTextWithValidation'
import InputTextWithValidation  from '../../../../../../components/withValidation/InputTextWithValidation'
import ButtonShortcut           from '../../../../../../components/Button/ButtonShortcut'
import { faUserPlus }           from '@fortawesome/free-solid-svg-icons'
import {
  KeyboardEventCodes,
  useExternalKeyboard
}                               from '../../../../../../components/hooks/useExternalKeybaord'
import { CenteredDialog }       from '../../../../../../components/Dialog/DialogBasic'
import InvoiceTaxDialog         from '../../forms/InvoiceTaxDialog'
import {
  formatPrice,
  toNumberFixed
}                               from '../../../../../utils/Utils'
import { processErrorGraphQL }  from '../../../../../../apollo'
import { useVats }              from '../../../../../../store/vats/useVats'
import { FOCUS_ID }             from '../../../../../constants/FocusElementIDs'

interface IInvoiceTaxesFormProps {
  submitFun : ( taxes : IInvoiceTax ) => void
  invoiceTaxes? : IInvoiceTax[]
  additional? : boolean /** if form is for additional expenses */
}

const InvoiceTaxForm = ( { submitFun, invoiceTaxes, additional } : IInvoiceTaxesFormProps ) => {
  const validation = useValidation<IInvoiceTax>()

  const { setFieldValue } = validation
  const { data : vats } = useVats()

  const currentVats = React.useMemo( () => vats && vats.filter( x => !( invoiceTaxes && invoiceTaxes.find( tax => `${ tax.taxId }` === `${ x.id }` ) ) ), [vats, invoiceTaxes] )
  const vatsOptions = React.useMemo( () => {
    let vatData : any = []
    if ( vats && vats.length !== 0 ) {
      vatData = currentVats.map( ( vat : any ) => {
        const vatValue = vat.values[0]
        return {
          label : `${ vat.short } ${ formatPrice( vatValue.value ) } %`,
          value : `${ vat.id }`
        }
      } )
    }
    return [
      ...vatData
    ]
  }, [vats, currentVats] )

  useEffect( () => {
    if ( currentVats && currentVats.length !== 0 ) {
      setFieldValue( 'taxId', ( currentVats as any )[0].values[0].id, true )
    }
  }, [currentVats, setFieldValue] )

  const { getFieldRef } = validation

  const handlerOnSubmit = async () => {
    if ( hide ) {
      return
    }
    const { error, data, validations, refs } = await validation.validate()
    if ( error ) {
      const fieldRef : IFieldsRefs | undefined = refs.find( ( { field } : any ) => _get( validations, `validations.${ field }.error` ) )
      fieldRef && fieldRef.ref.current.focus()
      return
    }
    if ( !data.finance || Number( data.finance ) <= 0 ) {
      validation.setFieldError( 'finance', 'Required field!' )
      return
    }

    try {
      const obj : IInvoiceTax = Object.assign( {}, {
        taxId : data.taxId,
        finance : toNumberFixed( data.finance ),
        financeMP : toNumberFixed( data.financeMP )
      } )
      await validation.resetValidations( true )
      const fieldRef = getFieldRef( 'taxId' )
      fieldRef && fieldRef.ref.current.focus()
      await submitFun( obj )
    } catch ( e ) {
            /** process the error */
      processErrorGraphQL( e, validation )
    }
  }

  const { setRef } = useExternalKeyboard( ( e : KeyboardEvent ) => {
    switch ( e.key ) {
      case KeyboardEventCodes.Enter:
        e.preventDefault()
        handlerOnSubmit()
        return
    }
  }, true, [KeyboardEventCodes.Enter], 'production-order-header-form' )

  const handlerOnChangeTax = () => {
    const fieldRef = getFieldRef( 'finance' )
    fieldRef && fieldRef.ref.current.focus()
  }

  const hide = React.useMemo( () => currentVats && currentVats.length === 0, [currentVats] )

  return (
    <ConditionalRendering condition={ !hide }>
      <div className={ 'container p-0 d-flex align-items-center' } ref={ setRef }>
        <div className={ `col-${ additional ? '4' : '3' } pl-0 pr-0` }>
          <SelectTextWithValidation
                        label={ 'Tax' }
                        helperText={ 'choose tax' }
                        className={ 'lined-version' }
                        options={ vatsOptions }
                        focusOnMount
                        onChange={ handlerOnChangeTax }
                        validation={ {
                          useValidation : validation,
                          model : 'taxId'
                        } }
          />
        </div>
        <div className={ `col-${ additional ? '6' : '3' }` }>
          <InputTextWithValidation
                        label={ 'Finance MP' }
                        helperText={ 'enter value' }
                        classNames={ 'lined-version' }
                        align={ 'align-right' }
                        validation={ {
                          useValidation : validation,
                          model : 'financeMP',
                          format : {
                            rule : FORMAT_CURRENCY_STANDARD,
                            validationMessage : 'Enter valid finance'
                          }
                        } }
          />
        </div>
        <div className={ 'col-1 pl-0 pr-0' }>
          <ButtonShortcut
                        onClick={ handlerOnSubmit }
                        icon={ faUserPlus }
                        label={ 'Add' }
                        classNames={ 'hw-shortcut-button primary sm hw-button-border-color mb-2' }
          />
        </div>
      </div>
    </ConditionalRendering>
  )
}

export default InvoiceTaxForm

export const openDialogInvoiceTaxForm = ( handlerSuccess : ( tax : IInvoiceTax ) => void, state : IHeaderDocumentState ) => {
  EasyDialogApolloProvider( ( closeDialog : () => any, openDialog : ( data : any ) => any ) => {
    openDialog( <DialogModalRootComponent name={ 'Calculation-modal-invoice-tax-4382975832' } closeFn={ closeDialog }>
      <CenteredDialog
                closeAction={ closeDialog }
                Component={ InvoiceTaxDialog }
                componentRenderProps={ {
                  closeDialog : closeDialog,
                  successFunction : handlerSuccess,
                  state
                } }
      />
    </DialogModalRootComponent> )
  }, FOCUS_ID.CALCULATION.DOCUMENT_FORM.INVOICE_TAXES_BUTTON )
}
