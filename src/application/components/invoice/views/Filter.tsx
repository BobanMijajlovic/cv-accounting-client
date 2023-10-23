import React, {
  ChangeEvent,
  useCallback
}                                    from 'react'
import { TCustomer }                 from '../../../../graphql/type_logic/types'
import { openDialogAddEditCustomer } from '../../customer/modal/CustomerSearch'
import ButtonShortcut                from '../../../../components/Button/ButtonShortcut'
import {
  faBackspace,
  faUserTie
}                                    from '@fortawesome/free-solid-svg-icons'
import CustomerViewShort             from '../../customer/views/CustomerViewShort'
import {
  InputTextDatePicker,
  Select
}                                 from '../../../../components/basic/withState'
import { useInvoice }             from '../../../../store/invoice/useInvoice'
import * as _                     from 'lodash'
import {
  KeyboardEventCodes,
  useExternalKeyboard
}                                 from '../../../../components/hooks/useExternalKeybaord'
import { CONSTANT_INVOICE }       from '../../../constants'
import { useTranslationFunction } from "../../../../components/Translation/useTranslation";

const InvoiceTableSearch = () => {

  const { translate } = useTranslationFunction()
  const {invoice, setDateFrom, setDateTo, setSelectedCustomer, setStatus} = useInvoice()

  const changeDateFrom = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    if (!_.get(event, 'target.closed')) {
      return
    }
    setDateFrom(_.get(event, 'target.date'))
  }, [setDateFrom])

  const changeDateTo = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    if (!_.get(event, 'target.closed')) {
      return
    }
    setDateTo(_.get(event, 'target.date'))
  }, [setDateTo])

  const handlerChangeSupplier = useCallback((customer: TCustomer) => setSelectedCustomer(customer), [setSelectedCustomer])

  const handlerChooseCustomer = () => {
    openDialogAddEditCustomer(handlerChangeSupplier)
  }

  const changeStatus = useCallback((event: ChangeEvent<HTMLSelectElement>) => {
    setStatus(_.get(event, 'target.value'))
  }, [setStatus])

  const handlerClearCustomer = () => {
    handlerChangeSupplier({} as TCustomer)
  }

  const startSearchingDay = React.useMemo(() => {
    const date = new Date()
    date.setDate(date.getDate() - 15)
    return date
  }, [])

  const handlerChangeCustomer = () => {
    invoice.customer && invoice.customer.id ? handlerClearCustomer() : handlerChooseCustomer()
  }

  const {setRef} = useExternalKeyboard((e: KeyboardEvent) => {
    switch (e.key) {
      case KeyboardEventCodes.F2:
        handlerChangeCustomer()
        return
    }
  }, true, [KeyboardEventCodes.F2], 'invoice_main_table_search')

  return (
    <div className={'d-flex align-content-stretch h-100 justify-content-between relative warehouse-item-table-search-part border'} ref={setRef}>
      <div className={'d-flex justify-content-end align-items-center'}>
        {invoice.customer && invoice.customer.id ?
          <ButtonShortcut
                        icon={faBackspace}
                        label={translate('BUTTON_CLEAR')}
                        color={'danger'}
                        shortcut={KeyboardEventCodes.F2}
                        classNames={'hw-shortcut-button-white-version mr-3 '}
                        onClick={handlerChangeCustomer}
          /> :
          <ButtonShortcut
                        icon={faUserTie}
                        label={translate('OPTIONS_CUSTOMER')}
                        shortcut={KeyboardEventCodes.F2}
                        classNames={'hw-shortcut-button primary sm hw-button-border-color mr-3'}
                        onClick={handlerChangeCustomer}
          />
        }
        <div className={'warehouse-item-customer-part'}>
          <CustomerViewShort customer={invoice.customer as TCustomer}/>
        </div>

      </div>
      <div className={'d-flex justify-content-between  align-items-end warehouse-item-table-dates-part relative'}>
        <div className={'d-flex justify-content-between warehouse-item-table-dates-part'}>
          <div>
            <InputTextDatePicker
                            date={startSearchingDay}
                            align={'align-center'}
                            format={'dd/MM/yyyy'}
                            helperText={translate('DATE_FROM')}
                            classNames={'lined-version'}
                            value={_.get(invoice, 'dateFrom', '')}
                            onChange={changeDateFrom}
                            useLabel={false}
                            label={''}
            />
          </div>
          <div className={'mx-4'}>
            <InputTextDatePicker
                            format={'dd/MM/yyyy'}
                            align={'align-center'}
                            helperText={translate('DATE_TO')}
                            classNames={'lined-version '}
                            value={_.get(invoice, 'dateTo', '')}
                            onChange={changeDateTo}
                            useLabel={false}
                            label={''}
                            position={'right'}
            />
          </div>
        </div>
      </div>
      <div className={'hw-calculation-table-status-part'}>
        <Select
                    label={translate('LABEL_STATUS')}
                    helperText={''}
                    fullWidth
                    lined
                    options={CONSTANT_INVOICE.TYPES_SELECT.STATUS}
                    value={_.get(invoice, 'status', '0')}
                    onChange={changeStatus}
        />
      </div>
    </div>
  )
}

export default InvoiceTableSearch