import React, {
  ChangeEvent,
  useCallback
}                            from 'react'
import {
  faBackspace,
  faUserTie
}                                  from '@fortawesome/free-solid-svg-icons'
import * as _                      from 'lodash'
import {useProformaInvoice}        from '../../../../../store/proforma-invoice/useProformaInvoice'
import {InputTextDatePicker}       from '../../../../../components/basic/withState'
import CustomerViewShort           from '../../../customer/views/CustomerViewShort'
import {TCustomer}                 from '../../../../../graphql/type_logic/types'
import {
  KeyboardEventCodes,
  useExternalKeyboard
}                                  from '../../../../../components/hooks/useExternalKeybaord'
import ButtonShortcut              from '../../../../../components/Button/ButtonShortcut'
import {openDialogAddEditCustomer} from '../../../customer/modal/CustomerSearch'

const ProformaInvoiceFilter = () => {

  const {proformaInvoice,setDateFrom, setDateTo, setSelectedCustomer} = useProformaInvoice()

  const changeDateFrom = useCallback((event : ChangeEvent<HTMLInputElement>) => {
    if (!_.get(event, 'target.closed')) {
      return
    }
    setDateFrom(_.get(event, 'target.date'))
  }, [setDateFrom])

  const changeDateTo = useCallback((event : ChangeEvent<HTMLInputElement>) => {
    if (!_.get(event, 'target.closed')) {
      return
    }
    setDateTo(_.get(event, 'target.date'))
  }, [setDateTo])

  const handlerChangeSupplier = useCallback((customer : TCustomer) => setSelectedCustomer(customer), [setSelectedCustomer])

  const handlerChooseCustomer = () => {
    openDialogAddEditCustomer(handlerChangeSupplier)
  }

  const handlerClearCustomer = () => {
    handlerChangeSupplier({} as TCustomer)
  }

  const startSearchingDay = React.useMemo(() => {
    const date = new Date()
    date.setDate(date.getDate() - 15)
    return date
  }, [])

  const handlerChangeCustomer = () => {
    proformaInvoice.customer && proformaInvoice.customer.id ?  handlerClearCustomer() : handlerChooseCustomer()
  }

  const {setRef} = useExternalKeyboard((e : KeyboardEvent) => {
    switch (e.key) {
      case KeyboardEventCodes.F2:
        handlerChangeCustomer()
        return
    }
  }, true, [KeyboardEventCodes.F2], 'proforma-invoice-main-table-search')

  return (
    <div className={'d-flex align-content-stretch h-100 justify-content-between relative warehouse-item-table-search-part border'} ref={setRef}>
      <div className={'d-flex justify-content-end align-items-center'}>
        {proformaInvoice.customer && proformaInvoice.customer.id ?
          <ButtonShortcut
                        icon={faBackspace}
                        label={'CLEAR'}
                        color={'danger'}
                        shortcut={KeyboardEventCodes.F2}
                        classNames={'hw-shortcut-button-white-version mr-3 '}
                        onClick={handlerChangeCustomer}
          /> :
          <ButtonShortcut
                        icon={faUserTie}
                        label={'Customer'}
                        shortcut={KeyboardEventCodes.F2}
                        classNames={'hw-shortcut-button primary sm hw-button-border-color mr-3'}
                        onClick={handlerChangeCustomer}
          />
        }
        <div className={'warehouse-item-customer-part'}>
          <CustomerViewShort customer={proformaInvoice.customer as TCustomer}/>
        </div>

      </div>
      <div className={'d-flex justify-content-between  align-items-end warehouse-item-table-dates-part relative'}>
        {/* <div className={'font-smaller-3 opacity-4 absolute-center-12  text-upper'}>SEARCH invoice BY DATE</div>*/}
        <div className={'d-flex justify-content-between warehouse-item-table-dates-part'}>
          <div>
            <InputTextDatePicker
                            date={startSearchingDay}
                            align={'align-center'}
                            format={'dd/MM/yyyy'}
                            helperText={'date from'}
                            classNames={'lined-version'}
                            value={_.get(proformaInvoice, 'dateFrom', '')}
                            onChange={changeDateFrom}
                            useLabel={false}
                            label={''}
            />
          </div>
          <div className={'mx-4'}>
            <InputTextDatePicker
                            format={'dd/MM/yyyy'}
                            align={'align-center'}
                            helperText={'date to'}
                            classNames={'lined-version '}
                            value={_.get(proformaInvoice, 'dateTo', '')}
                            onChange={changeDateTo}
                            useLabel={false}
                            label={''}
                            position={'right'}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProformaInvoiceFilter