import React, {
  ChangeEvent,
  useCallback
}                                    from 'react'
import {
  faBackspace,
  faUserTie
}                                    from '@fortawesome/free-solid-svg-icons'
import * as _                         from 'lodash'
import { useFinanceTransferDocument } from '../../../../store/finance-transfer-document/useFinanceTransferDocument'
import { useTranslationFunction }     from '../../../../components/Translation/useTranslation'
import { TCustomer }                 from '../../../../graphql/type_logic/types'
import { openDialogAddEditCustomer } from '../../customer/modal/CustomerSearch'
import {
  KeyboardEventCodes,
  useExternalKeyboard
}                                    from '../../../../components/hooks/useExternalKeybaord'
import ButtonShortcut                from '../../../../components/Button/ButtonShortcut'
import CustomerViewShort                      from '../../customer/views/CustomerViewShort'
import { CONSTANT_FINANCE_TRANSFER_DOCUMENT } from '../../../constants'
import {
  InputTextDatePicker,
  Select
}                                             from '../../../../components/basic/withState'

const FinanceTransferDocumentFilter = () => {

  const { translate } = useTranslationFunction()
  const { financeTransferDocumentFilter, setStatus, setDateFrom, setDateTo, setSelectedCustomer, setFlag } = useFinanceTransferDocument()

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

  const changeFlag = useCallback( ( event : ChangeEvent<HTMLSelectElement> ) => {
    setFlag( _.get( event, 'target.value' ) )
  }, [setFlag] )

  const handlerClearCustomer = () => {
    handlerChangeSupplier( {} as TCustomer )
  }

  const startSearchingDay = React.useMemo( () => {
    const date = new Date()
    date.setDate( date.getDate() - 15 )
    return date
  }, [] )

  const handlerChangeCustomer = () => {
    financeTransferDocumentFilter.customer && financeTransferDocumentFilter.customer.id ? handlerClearCustomer() : handlerChooseCustomer()
  }

  const { setRef } = useExternalKeyboard( ( e : KeyboardEvent ) => {
    switch ( e.key ) {
      case KeyboardEventCodes.F2:
        handlerChangeCustomer()
        return
    }
  }, true, [KeyboardEventCodes.F2], 'advance_invoice_main_table_search' )

  return (
    <div className={ 'd-flex align-content-center justify-content-between relative warehouse-item-table-search-part border py-2' } ref={ setRef }>
      <div className={ 'd-flex justify-content-end align-items-center' }>
        { financeTransferDocumentFilter.customer && financeTransferDocumentFilter.customer.id ?
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
          <CustomerViewShort customer={ financeTransferDocumentFilter.customer as TCustomer } classNames={'pb-0'}/>
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
                            value={ _.get( financeTransferDocumentFilter, 'dateFrom', '' ) }
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
                            value={ _.get( financeTransferDocumentFilter, 'dateTo', '' ) }
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
            label={ 'IN / OUT' }
            helperText={ '' }
            fullWidth
            lined
            options={ CONSTANT_FINANCE_TRANSFER_DOCUMENT.TYPES_SELECT.FLAG }
            value={ _.get( financeTransferDocumentFilter, 'flag', '') }
            onChange={ changeFlag }
        />
      </div>
      <div className={ 'hw-calculation-table-status-part' }>
        <Select
                    label={ translate( 'LABEL_STATUS' ) }
                    helperText={ '' }
                    fullWidth
                    lined
                    options={ CONSTANT_FINANCE_TRANSFER_DOCUMENT.TYPES_SELECT.STATUS }
                    value={ _.get( financeTransferDocumentFilter, 'status', '0' ) }
                    onChange={ changeStatus }
        />
      </div>
    </div>
  )
}

export default FinanceTransferDocumentFilter