import React                    from 'react'
import GeneralDetails           from './GeneralDetails'
import { get as _get }          from 'lodash'
import AddressView              from '../../address/AddressView'
import BankAccountView          from '../../banks/BankAccountView'
import ContactView              from '../../contact/ContactView'
import { useCustomerDashboard } from '../../../../store/customer/useCustomer'

const CustomerInfo = () => {
  const {data: globalCustomerData} = useCustomerDashboard()

  const addresses = React.useMemo(() => {
    return _get(globalCustomerData, 'selected.addresses', [])
  }, [globalCustomerData])

  const banks = React.useMemo(() => {
    return _get(globalCustomerData, 'selected.banks', [])
  }, [globalCustomerData])

  const contacts = React.useMemo(() => {
    return _get(globalCustomerData, 'selected.contacts', [])
  }, [globalCustomerData])

  return (
    <div className={'d-flex flex-column hw-customer-info-root'}>
      <div className={'d-flex flex-row'}>
        <div className={'w-50 mr-5'}>
          <GeneralDetails/>
        </div>
        <div className={'w-50'}>
          <AddressView addresses={addresses} notShowAddButton={!globalCustomerData.selected}/>
        </div>
      </div>
      <div className={'d-flex flex-row w-100 py-4 mt-4 border-top'}>
        <div className={'w-50 mr-5'}>
          <BankAccountView banks={banks} notShowAddButton={!globalCustomerData.selected}/>
        </div>
        <div className={'w-50'}>
          <ContactView contacts={contacts} notShowAddButton={!globalCustomerData.selected}/>
        </div>
      </div>
    </div>
  )

}

export default CustomerInfo
