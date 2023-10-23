import React, {
  ChangeEvent,
  useCallback
}                                    from 'react'
import {
  faBackspace,
  faUserTie
}                                    from '@fortawesome/free-solid-svg-icons'
import * as _                        from 'lodash'
import { useBankTransaction }        from '../../../../store/bank-transaction/useBankTransaction'
import {
  TBankAccount,
  TCustomer
}                                    from '../../../../graphql/type_logic/types'
import { openDialogAddEditCustomer } from '../../customer/modal/CustomerSearch'
import {
  KeyboardEventCodes,
  useExternalKeyboard
}                                    from '../../../../components/hooks/useExternalKeybaord'
import ButtonShortcut                from '../../../../components/Button/ButtonShortcut'
import CustomerViewShort             from '../../customer/views/CustomerViewShort'
import {
  InputTextDatePicker,
  Select
}                                    from '../../../../components/basic/withState'
import { useClient }                 from '../../../../store/client/useClient'
import BankAccountBalance            from './BankAccountBalance'
import { useBanks }                  from '../../../hooks/useBanks'

const BankTransactionFilter = () => {
  const {bankTransaction , setSelectedCustomer, setDateTo, setDateFrom, setSelectedBankAccount} = useBankTransaction()
  const {banks} = useClient()
  const {getBankByCode} = useBanks()

  const banksOptions = React.useMemo(() => {
    let _banks = [
      {
        label: 'ALL',
        value: ''
      }
    ] as any
    if (banks && banks.length !== 0) {
      _banks = [..._banks,...(banks as TBankAccount[]).map((bank) => {
        const _bank = getBankByCode(Number(bank.bankId))
        return {
          label: bank.account,
          description: _bank?.bankName,
          value: bank.id
        }
      })]
    }
    return _banks
  },[banks])

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

  const handlerSetCustomer = useCallback((customer : TCustomer) => setSelectedCustomer(customer), [setSelectedCustomer])

  const handlerSetBankAccount = useCallback((bankAccountId : string) => setSelectedBankAccount(bankAccountId), [setSelectedBankAccount])

  const handlerChooseCustomer = () => {
    openDialogAddEditCustomer(handlerSetCustomer)
  }
  
  const handlerClearCustomer = () => {
    handlerSetCustomer({} as TCustomer)
  }

  const handlerChangeBankAccount = (e : ChangeEvent<HTMLSelectElement>) => {
    handlerSetBankAccount(e.target.value)
  }

  const handlerChangeCustomer = () => {
    bankTransaction.customer && bankTransaction.customer.id ?  handlerClearCustomer() : handlerChooseCustomer()
  }

  const startSearchingDay = React.useMemo(() => {
    const date = new Date()
    date.setDate(date.getDate() - 15)
    return date
  }, [])

  const {setRef} = useExternalKeyboard((e : KeyboardEvent) => {
    switch (e.key) {
      case KeyboardEventCodes.F2:
        handlerChangeCustomer()
        return
    }
  }, true, [KeyboardEventCodes.F2], 'bank-transaction-table-filter')

  return (
    <div className={'d-flex align-content-stretch justify-content-between relative warehouse-item-table-search-part border py-1 px-2'} ref={setRef}>
      <div className={'d-flex justify-content-end align-items-center'}>
        {bankTransaction.customer && bankTransaction.customer.id ?
          <ButtonShortcut
                        icon={faBackspace}
                        label={'CLEAR'}
                        color={'danger'}
                        classNames={'hw-shortcut-button-white-version mr-3 sm'}
                        onClick={handlerClearCustomer}
                        shortcut={KeyboardEventCodes.F2}
          /> :
          <ButtonShortcut
                        icon={faUserTie}
                        label={'Customer'}
                        classNames={'hw-shortcut-button primary sm hw-button-border-color mr-3'}
                        onClick={handlerChooseCustomer}
                        shortcut={KeyboardEventCodes.F2}
          />
        }
        <div className={'warehouse-item-customer-part'}>
          <CustomerViewShort customer={bankTransaction.customer as TCustomer} classNames={'padding-bottom'}/>
        </div>
      </div>
      <div className={'d-flex justify-content-between align-items-center warehouse-item-table-dates-part'}>
        <div>
          <InputTextDatePicker
              date={startSearchingDay}
              align={'align-center'}
              format={'dd/MM/yyyy'}
              helperText={'date from'}
              classNames={'lined-version'}
              value={_.get(bankTransaction, 'dateFrom', '')}
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
              value={_.get(bankTransaction, 'dateTo', '')}
              onChange={changeDateTo}
              useLabel={false}
              label={''}
              position={'right'}
          />
        </div>
      </div>
      <div className={'d-flex'}>
        <BankAccountBalance bankAccountId={_.get(bankTransaction,'bankAccountId')} />
      </div>
      <div className={'hw-bank-transaction-table-filter-account-select '}>
        <Select
            label={'Bank account'}
            helperText={''}
            lined
            options={banksOptions as any}
            value={_.get(bankTransaction,'bankAccountId','')}
            onChange={handlerChangeBankAccount}
        />
      </div>
    </div>
  )
}

export default BankTransactionFilter
