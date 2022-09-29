import React, {
  useCallback,
  useEffect,
  useMemo,
  useState
}                                    from 'react'
import { Paper }                     from '../../../../components/Paper'
import {
  IFieldsRefs,
  required,
  useValidation
}                                    from '../../../../validation'
import {
  TCustomer,
  TFinanceTransferDocument
}                                    from '../../../../graphql/type_logic/types'
import DialogButtonsSaveUpdate       from '../../_common/DialogButtonsSaveUpdate'
import {
  faExchangeAlt,
  faMoneyBillWaveAlt
}                                    from '@fortawesome/free-solid-svg-icons'
import AutoCompleteFindCustomer      from '../../autocomplete/AutoCompleteFindCustomer'
import { useTranslationFunction }    from '../../../../components/Translation/useTranslation'
import CustomerViewShort             from '../../customer/views/CustomerViewShort'
import {
  DialogModalRootComponent,
  EasyDialogApolloProvider
}                                            from '../../../../components/EasyModel/EasyModal'
import { CenteredDialog }                    from '../../../../components/Dialog/DialogBasic'
import DatePickerWithValidation              from '../../../../components/withValidation/DatePickerWithValidation'
import AdvanceInvoiceItemFinancePart         from './ItemFinancePart'
import TextAreaWithValidation                from '../../../../components/withValidation/TextAreaWithValidation'
import { toNumberFixed }                     from '../../../utils/Utils'
import { useVats }                           from '../../../../store/vats/useVats'
import _, { get as _get }                    from 'lodash'
import ButtonSwitch                          from '../../../../components/Button/ButtonSwitch'
import { CONSTANT_MODEL }                    from '../../../constants'
import { FinanceTransferDocumentInsertType } from '../../../../graphql/graphql'

interface IAdvanceInvoiceFormProps {
  successFunction: ( data : TFinanceTransferDocument ) => Promise<any>
  cancelFunction? : () => void
  documentType ?: number
}

type FinanceTransferDocumentType = {
  note ?: string
  customer ?: TCustomer
}

type TFinanceTransferDocumentNote = FinanceTransferDocumentInsertType & FinanceTransferDocumentType

const FinanceTransferDocumentForm = ( { successFunction,cancelFunction, documentType = CONSTANT_MODEL.FINANCE_TRANSFER_DOCUMENT_TYPE.TRANSFER } : IAdvanceInvoiceFormProps ) => {
  const { translate } = useTranslationFunction()
  const {getVat} = useVats()

  const [switchState,setSwitchState] :[boolean,(s:boolean)=> void] = useState(true as boolean)

  const validation = useValidation<TFinanceTransferDocumentNote>({
    initialData: {
      itemDescription: 'Item description',
      totalFinanceMP: '1000.00' as any,
      taxId: '2' as any,
      note: 'Some note\nSome note 1\nSome note 2\nSome note 3'
    }
  })
  const [focusElement, setFocusElement] : [ IFieldsRefs, ( r : IFieldsRefs ) => void ] = useState( {} as IFieldsRefs )
  const { state, setFieldValue, getFieldRef, refFields, setFieldError, getFieldError } = validation

  const handlerSetFocus = useCallback( ( field : string ) => {
    const refData = getFieldRef( field )
    if ( refData && refData.ref ) {
      setFocusElement( refData )
    }
  }, [getFieldRef] )

  const setCustomer = useCallback( ( customer : TCustomer ) => {
    setFieldValue( 'customer', customer as any, true )
    handlerSetFocus( 'date' )
  }, [setFieldValue, handlerSetFocus] )

  useEffect( () => {
    if ( focusElement.ref && focusElement.ref.current ) {
      focusElement.ref.current.focus()
    }
  }, [focusElement] )

  const handlerSubmit = async () => {
    const { data, error, validations, refs } = await validation.validate()
    if (error) {
      const fieldRef : IFieldsRefs | undefined = refs.find(({field}) => _get(validations, `validations.${ field }.error`))
      fieldRef && fieldRef.ref.current.focus()
      return
    }
    if (!data.customer) {
      setFieldError('customer','Customer is required field!')
      return
    }
    const totalFinanceMP = toNumberFixed(data.totalFinanceMP)
    if (totalFinanceMP <= 0) {
      setFieldError('totalFinanceMP','Value is not valid!')
      return
    }
    
    let notes
    if (data.note) {
      notes = data.note.split('\n').map(x => {
        return {
          note: x
        }
      })
    }
    const _data = (data as any)
    const entryData = {
      customerId: Number(_data.customer.id),
      date: new Date(_data.date).toISOString(),
      documentType,
      flag: Number(!switchState),
      taxId: Number(_data.taxId),
      totalFinanceMP,
      itemDescription: _data.itemDescription,
      notes: notes && notes.length !== 0 ? notes : [],
      dueDates: [{
        date: new Date(_data.dueDate).toISOString(),
        finance: totalFinanceMP,
      }]
    } as any

    successFunction(entryData)
      .then(() => {
        handlerCancelFunction()
      })

  }
  
  const customerError = useMemo(() => getFieldError('customer'),[getFieldError])

  const handlerCancelFunction = () => {
    cancelFunction && cancelFunction()
  }
    
  const taxFinance = useMemo(() => {
    if (!state.taxId && state.totalFinanceMP && toNumberFixed(state.totalFinanceMP) <= 0) {
      return  0
    }
    const { value } = getVat(state.taxId as number)
    const financeMP = toNumberFixed(state.totalFinanceMP as number)
    return _.round(_.divide(_.multiply(financeMP, toNumberFixed(value)), 100), 2)
  },[state])
  
  const handlerSwitchChange = (e:any) => {
    setSwitchState(e.target.value)
  }

  const isAdvanceInvoice = useMemo( () => documentType === CONSTANT_MODEL.FINANCE_TRANSFER_DOCUMENT_TYPE.ADVANCE, [documentType])

  const inOutClasses = useMemo(() => `${switchState ? ' in-background' : ' out-background'}`,[switchState])
  const iconInOutClasses = useMemo(() => `${switchState ? ' in-icon-color' : ' out-icon-color'}`,[switchState])
  const title = useMemo( () => isAdvanceInvoice ? 'advance invoice' : 'Finance transfer document', [isAdvanceInvoice] )
  
  return (
    <Paper classNames={ 'hw-finance-transfer-document-root' } header={ title }>

      <div className={'d-flex justify-content-between align-items-stretch pt-4 relative'}>
        <div className={'hw-transfer-document-type-root'}>
          <ButtonSwitch label={'Document type'} onHandlerChange={handlerSwitchChange} classNames={'hw-transfer-document-type-switch-button'} value={switchState}/>
        </div>
        <div className={ 'd-flex flex-column hw-customer-part color-primary pb-2 pr-4 flex-2' }>
          <div className={ `px-4 p-2 hw-customer-search-preview${inOutClasses} bg-light` }>
            <CustomerViewShort customer={ state.customer || {} }/>
          </div>
          <div className={ 'd-flex align-items-center justify-content-around' }>
            <AutoCompleteFindCustomer error={customerError} processSelected={ setCustomer } focusOnMount helperText={ translate( 'FIND_CUSTOMER_INPUT_HELPER_TEXT' ) }/>
          </div>
        </div>
        <div className={ 'd-flex flex-column flex-1 pb-2 hw-input-calendar-input'}>
          <DatePickerWithValidation
              align={ 'align-center' }
              format={ 'dd/MM/yyyy' }
              helperText={ 'choose date' }
              classNames={ 'lined-version flex-2' }
              label={ 'Date' }
              validation={{
                useValidation: validation,
                model: 'date',
                rule: {
                  required
                }
              }}
          />
          <DatePickerWithValidation
              align={ 'align-center' }
              format={ 'dd/MM/yyyy' }
              helperText={ 'choose due date'  }
              classNames={ 'lined-version' }
              label={ 'Due date' }
              validation={{
                useValidation: validation,
                model: 'dueDate',
                rule: {
                  required
                }
              }}
          />
        </div>
      </div>

      <AdvanceInvoiceItemFinancePart validation={validation} taxFinance={taxFinance}/>
      
      <TextAreaWithValidation
          label={'Notes'}
          helperText={''}
          fullWidth
          lined
          useHelpText={false}
          validation={{
            useValidation: validation,
            model: 'note',
          }}            
      />

      <div className={ 'd-flex w-100' }>
        <DialogButtonsSaveUpdate
            cancelFun={ handlerCancelFunction }
            submitFun={ handlerSubmit }
            icon={ isAdvanceInvoice ? faMoneyBillWaveAlt : faExchangeAlt}
            iconClassNames={iconInOutClasses}
        />
      </div>
    </Paper>
  )
}

export default FinanceTransferDocumentForm

export const openDialogDefineNewFinanceTransferDocument = ({handlerSuccess, documentType}:{ handlerSuccess : ( data : TFinanceTransferDocument ) => Promise<any>, documentType?: number}) => {
  EasyDialogApolloProvider( ( closeDialog : () => any, openDialog : ( data : any ) => any ) => {
    openDialog( <DialogModalRootComponent name={ 'dialog-finance-transfer-document-insert-form-0740574074077' } closeFn={ closeDialog }>
      <CenteredDialog
                closeAction={ closeDialog }
                Component={ FinanceTransferDocumentForm }
                componentRenderProps={ {
                  successFunction: handlerSuccess,
                  cancelFunction : closeDialog,
                  documentType
                } }
      />
    </DialogModalRootComponent> )
  } )
}