import React           from 'react'
import {useCustomer}   from '../../../hooks/useCustomer'
import {get as _get}   from 'lodash'
import ContactView     from '../../contact/ContactView'
import BankAccountView from '../../banks/BankAccountView'

const BankContactDetails = () => {
  const {data: globalCustomerData} = useCustomer()

  const banks = React.useMemo(() => {
    return _get(globalCustomerData, 'selected.banks', [])
  }, [globalCustomerData])

  const contacts = React.useMemo(() => {
    return _get(globalCustomerData, 'selected.contacts', [])
  }, [globalCustomerData])

  return (
    <div className={'d-flex flex-row w-100'}>
      <div className={'w-50 mr-5'}>
        <BankAccountView banks={banks} notShowAddButton={!globalCustomerData.selected}/>
      </div>
      <div className={'w-50'}>
        <ContactView contacts={contacts} notShowAddButton={!globalCustomerData.selected}/>
      </div>
    </div>
  )
}

export default BankContactDetails
