import React, {
  useCallback,
  useEffect,
  useState
}                                    from 'react'
import CustomerViewShort             from '../../../customer/views/CustomerViewShort'
import {
  TCustomer,
  TInvoice,
  TInvoiceHeader
}                                    from '../../../../../graphql/type_logic/types'
import ButtonShortcut                from '../../../../../components/Button/ButtonShortcut'
import {
  faFileInvoice,
  faPercentage,
  faUserTie
}                                    from '@fortawesome/free-solid-svg-icons'
import {
  KeyboardEventCodes,
  useExternalKeyboard
}                                    from '../../../../../components/hooks/useExternalKeybaord'
import { useInvoiceQuery }           from '../../../../../graphql/graphql'
import SelectTextWithValidation      from '../../../../../components/withValidation/SelectTextWithValidation'
import {
  IFieldsRefs,
  required,
  useValidation
}                                    from '../../../../../validation'
import DialogButtonsSaveUpdate       from '../../../_common/DialogButtonsSaveUpdate'
import {
  DialogModalRootComponent,
  EasyDialogApolloProvider
}                                    from '../../../../../components/EasyModel/EasyModal'
import { CenteredDialog }            from '../../../../../components/Dialog/DialogBasic'
import {
  formatDateLong,
  formatPrice,
  toNumberFixed
}                                    from '../../../../utils/Utils'
import { openDialogAddEditCustomer } from '../../../customer/modal/CustomerSearch'
import * as _                        from 'lodash'
import { processErrorGraphQL }       from '../../../../../apollo'
import { CONSTANT_WAREHOUSE }        from '../../../../constants'
import InputTextWithValidation       from '../../../../../components/withValidation/InputTextWithValidation'
import { useTranslationFunction }    from '../../../../../components/Translation/useTranslation'

interface IErrorHeaderState {
  customer? : boolean | string
}

interface IInvoiceHeaderFormProps {
  successFunction : (invoice : TInvoice) => Promise<any>
  cancelFunction? : () => void
  invoiceId? : string
  fieldFocus? : string
}

const Form = ({successFunction, cancelFunction, invoiceId, fieldFocus} : IInvoiceHeaderFormProps) => {
  const {translate} = useTranslationFunction()
  const validation = useValidation<TInvoiceHeader>()
  const [focusElement, setFocusElement] : [IFieldsRefs, (r : IFieldsRefs) => void] = useState({} as IFieldsRefs)
  const [stateError, setError] : [IErrorHeaderState, (r : IErrorHeaderState) => void] = useState({} as IErrorHeaderState)

  const {state, setFieldValue, getFieldRef, refFields} = validation

  const {data : _invoice} = useInvoiceQuery({
    notifyOnNetworkStatusChange : true,
    fetchPolicy : 'network-only',
    variables : {
      id : Number(invoiceId)
    },
    skip : !invoiceId
  })
  const invoice = React.useMemo(() => !_invoice || !_invoice.invoice ? void(0) : _invoice.invoice, [_invoice])

  const handlerSetFocus = useCallback((field : string) => {
    const refData = getFieldRef(field)
    if (refData && refData.ref) {
      setFocusElement(refData)
    }
  }, [getFieldRef])
  const setCustomer = useCallback((customer : TCustomer) => {
    setError({})
    setFieldValue('customer', customer as any, true)
    handlerSetFocus('flag')
  }, [setFieldValue, handlerSetFocus])

  const handlerFindCustomer = () => {
    openDialogAddEditCustomer(setCustomer)
  }

  useEffect(() => {
    if (!invoice) {
      setFieldValue('flag', `${ CONSTANT_WAREHOUSE.TYPES.WHOLESALE }`, false)
      return
    }

    if (invoice?.customer) {
      setFieldValue('customer', invoice?.customer as any, false)
    }

    if (invoice?.discount) {
      setFieldValue('discountDefault', `${ formatPrice(invoice?.discountDefault as any) }`, false)
    }

    if (invoice?.date) {
      setFieldValue('date', formatDateLong(invoice?.date), false)
    }

    ['flag', 'number'].forEach((s : string) => _.get(invoice, s) ? setFieldValue(s, _.get(invoice, s).toString(), true) : null)

  }, [invoice, setFieldValue])

  useEffect(() => {
    if (refFields && refFields.length !== 0 && !invoiceId && !state.customer) {
      const timer = setTimeout(() => handlerFindCustomer(), 200)
      clearTimeout(timer)
      return
    }
  }, [refFields, state.customer, invoiceId])

  useEffect(() => {
    if (focusElement.ref && focusElement.ref.current) {
      focusElement.ref.current.focus()
    }
  }, [focusElement])

  useEffect(() => {
    if (!fieldFocus || fieldFocus === 'customer') {
      return
    }
    handlerSetFocus(fieldFocus)
  }, [fieldFocus, handlerSetFocus])

  const {setRef} = useExternalKeyboard((e : KeyboardEvent) => {
    switch (e.key) {
      case KeyboardEventCodes.F2:
        handlerFindCustomer()
        return
    }
  }, true, [KeyboardEventCodes.F2], 'invoice-header-form')

  const handlerSubmit = async () => {
    const {error, data, refs, validations} = await validation.validate()
    if (error) {
      const fieldRef : IFieldsRefs | undefined = refs.find(({field}) => _.get(validations, `validations.${ field }.error`))
      fieldRef && fieldRef.ref.current.focus()
      return
    }

    if (!data.customer) {
      setError({
        customer : 'Customer is required!'
      })
      return
    }

    const _data = {
      header : {
        customerId : Number((data.customer as any as TCustomer).id),
        flag : Number(data.flag),
        discountDefault : data.discountDefault ? toNumberFixed(data.discountDefault as any) : void(0)
      }
    } as any

    successFunction(_data)
      .then(v => {
        cancelFunction && cancelFunction()
      })
      .catch((e) => {
        processErrorGraphQL(e, validation)
      })
  }

  const handlerCancelFunction = () => {
    cancelFunction && cancelFunction()
  }

  return (
    <>
      <div className={ 'container relative hw-invoice-header-form-root  shadow-lg p-3 ' } ref={ setRef }>
        <div className={ 'd-flex justify-content-between hw-invoice-header-customer-part color-primary pb-2' }>
          <CustomerViewShort customer={ state.customer as any as TCustomer } error={ stateError.customer } namePlaceholder={ translate('LABEL_CUSTOMER_NAME') }/>
          <ButtonShortcut
                        icon={ faUserTie }
                        onClick={ handlerFindCustomer }
                        label={translate('BUTTON_CUSTOMER')}
                        shortcut={ KeyboardEventCodes.F2 }
                        classNames={ 'hw-shortcut-button primary sm hw-button-border-color' }
          />
        </div>
        <div className={ 'd-flex justify-content-between align-items-center w-100 pr-3' }>
          <div className={ 'hw-document-header-other-parts' }>
            <SelectTextWithValidation
                            label={ translate('LABEL_WAREHOUSE') }
                            helperText={ '' }
                            focusOnMount
                            className={ 'lined-version' }
                            options={ CONSTANT_WAREHOUSE.TYPES_SELECT }
                            validation={ {
                              useValidation : validation,
                              model : 'flag',
                              rule : {
                                required: required({message: translate('REQUIRED_FIELD')})
                              }
                            } }
            />
          </div>
          <div className={ ' hw-invoice-header-form-discount-div' }>
            <InputTextWithValidation
                            required
                            label={ translate('LABEL_DISCOUNT') }
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
                        update={ !!invoiceId }
          />
        </div>
      </div>
    </>
  )
}

export default Form

export interface IDialogInvoiceHeaderForm {
  handlerSuccess : (invoice : TInvoice) => Promise<any>,
  invoiceId? : string
  fieldFocus? : string
}

export const openDialogInvoiceHeaderForm = ({handlerSuccess, invoiceId, fieldFocus} : IDialogInvoiceHeaderForm) => {
  EasyDialogApolloProvider((closeDialog : () => any, openDialog : (data : any) => any) => {
    openDialog(<DialogModalRootComponent name={ 'dialog-invoice-header-form-21536489620215231' } closeFn={ closeDialog }>
      <CenteredDialog
                title={ 'INVOICE_HEADER_DIALOG_TITLE' }
                closeAction={ closeDialog }
                Component={ Form }
                componentRenderProps={ {
                  successFunction : handlerSuccess,
                  invoiceId,
                  fieldFocus,
                  cancelFunction : closeDialog
                } }
      />
    </DialogModalRootComponent>)
  })
}
