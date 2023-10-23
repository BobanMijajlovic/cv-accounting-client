import React, {
  ChangeEvent,
  useCallback
}                                    from 'react'
import { useReturnInvoice }          from '../../../../../store/return-invoice/useReturnInvoice'
import ButtonShortcut                from '../../../../../components/Button/ButtonShortcut'
import {
  faBackspace,
  faUserTie
}                                    from '@fortawesome/free-solid-svg-icons'
import {
  KeyboardEventCodes,
  useExternalKeyboard
}                                    from '../../../../../components/hooks/useExternalKeybaord'
import CustomerViewShort             from '../../../customer/views/CustomerViewShort'
import { TCustomer }                 from '../../../../../graphql/type_logic/types'
import {
  InputTextDatePicker,
  Select
}                                    from '../../../../../components/basic/withState'
import * as _                        from 'lodash'
import { CONSTANT_INVOICE }          from '../../../../constants'
import { openDialogAddEditCustomer } from '../../../customer/modal/CustomerSearch'
import { useTranslationFunction }    from '../../../../../components/Translation/useTranslation'

const ReturnInvoiceFilter = () => {

  const { translate } = useTranslationFunction()
  const { returnInvoice, setStatus, setDateFrom, setDateTo, setSelectedCustomer } = useReturnInvoice()

  const changeDateFrom = useCallback( ( event : ChangeEvent<HTMLInputElement> ) => {
    if ( !_.get( event, 'target.closed' ) ) {
      return
    }
    setDateFrom( _.get( event, 'target.date' ) )
  }, [setDateFrom] )

  const changeDateTo = useCallback( ( event : ChangeEvent<HTMLInputElement> ) => {
    if ( !_.get( event, 'target.closed' ) ) {
      return
    }
    setDateTo( _.get( event, 'target.date' ) )
  }, [setDateTo] )

  const handlerChangeSupplier = useCallback( ( customer : TCustomer ) => setSelectedCustomer( customer ), [setSelectedCustomer] )

  const handlerChooseCustomer = () => {
    openDialogAddEditCustomer( handlerChangeSupplier )
  }

  const changeStatus = useCallback( ( event : ChangeEvent<HTMLSelectElement> ) => {
    setStatus( _.get( event, 'target.value' ) )
  }, [setStatus] )

  const handlerClearCustomer = () => {
    handlerChangeSupplier( {} as TCustomer )
  }

  const startSearchingDay = React.useMemo( () => {
    const date = new Date()
    date.setDate( date.getDate() - 15 )
    return date
  }, [] )

  const handlerChangeCustomer = () => {
    returnInvoice.customer && returnInvoice.customer.id ? handlerClearCustomer() : handlerChooseCustomer()
  }

  const { setRef } = useExternalKeyboard( ( e : KeyboardEvent ) => {
    switch ( e.key ) {
      case KeyboardEventCodes.F2:
        handlerChangeCustomer()
        return
    }
  }, true, [KeyboardEventCodes.F2], 'return_invoice_main_table_search' )

  return (
    <div className={ 'd-flex align-content-stretch h-100 justify-content-between relative warehouse-item-table-search-part border' } ref={ setRef }>
      <div className={ 'd-flex justify-content-end align-items-center' }>
        { returnInvoice.customer && returnInvoice.customer.id ?
          <ButtonShortcut
                        icon={ faBackspace }
                        label={ translate( 'BUTTON_CLEAR' ) }
                        color={ 'danger' }
                        shortcut={ KeyboardEventCodes.F2 }
                        classNames={ 'hw-shortcut-button-white-version mr-3 ' }
                        onClick={ handlerChangeCustomer }
          /> :
          <ButtonShortcut
                        icon={ faUserTie }
                        label={ translate( 'OPTIONS_CUSTOMER' ) }
                        shortcut={ KeyboardEventCodes.F2 }
                        classNames={ 'hw-shortcut-button primary sm hw-button-border-color mr-3' }
                        onClick={ handlerChangeCustomer }
          />
        }
        <div className={ 'warehouse-item-customer-part' }>
          <CustomerViewShort customer={ returnInvoice.customer as TCustomer }/>
        </div>

      </div>
      <div className={ 'd-flex justify-content-between  align-items-end warehouse-item-table-dates-part relative' }>
        {/* <div className={'font-smaller-3 opacity-4 absolute-center-12  text-upper'}>SEARCH invoice BY DATE</div>*/ }
        <div className={ 'd-flex justify-content-between warehouse-item-table-dates-part' }>
          <div>
            <InputTextDatePicker
                            date={ startSearchingDay }
                            align={ 'align-center' }
                            format={ 'dd/MM/yyyy' }
                            helperText={ translate( 'DATE_FROM' ) }
                            classNames={ 'lined-version' }
                            value={ _.get( returnInvoice, 'dateFrom', '' ) }
                            onChange={ changeDateFrom }
                            useLabel={ false }
                            label={ '' }
            />
          </div>
          <div className={ 'mx-4' }>
            <InputTextDatePicker
                            format={ 'dd/MM/yyyy' }
                            align={ 'align-center' }
                            helperText={ translate( 'DATE_TO' ) }
                            classNames={ 'lined-version ' }
                            value={ _.get( returnInvoice, 'dateTo', '' ) }
                            onChange={ changeDateTo }
                            useLabel={ false }
                            label={ '' }
                            position={ 'right' }
            />
          </div>
        </div>
      </div>
      <div className={ 'hw-calculation-table-status-part' }>
        <Select
                    label={ translate( 'LABEL_STATUS' ) }
                    helperText={ '' }
                    fullWidth
                    lined
                    options={ CONSTANT_INVOICE.TYPES_SELECT.STATUS }
                    value={ _.get( returnInvoice, 'status', '0' ) }
                    onChange={ changeStatus }
        />
      </div>
    </div>
  )
}

export default ReturnInvoiceFilter