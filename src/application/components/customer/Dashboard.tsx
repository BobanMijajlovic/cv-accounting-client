import React, { useEffect }           from 'react'
import SearchView                     from '../_common/SearchView'
import { faUserPlus }                 from '@fortawesome/free-solid-svg-icons'
import SearchViewRender               from './SearchViewRender'
import { useCustomersQuery }          from '../../../graphql/graphql'
import { queryVariablesForCustomers } from '../../../graphql/variablesQ'
import {
  IUseOptimizeEventData,
  useOptimizeEventClick
}                                     from '../../../components/hooks/useOptimizeEventClick'
import {
  CONSTANT_ADDRESS,
  CONSTANT_BANK_ACCOUNT,
  CONSTANT_CONTACT,
  CONSTANT_CUSTOMER,
  CONSTANT_MODEL
}                                     from '../../constants'
import Tabs                           from '../../../components/Tabs/Tabs'
import CustomerInfo                   from './info/CustomerInfo'
import CustomerCard                   from './card/CustomerCard'
import CustomerPayments               from './payments/CustomerPayments'
import {
  TAddress,
  TBankAccount,
  TContact,
  TCustomer
}                                     from '../../../graphql/type_logic/types'
import {
  openDialogAddress,
  openDialogAddressDelete
}                                     from '../address/AddressForm'
import { get as _get }                from 'lodash'
import {
  KeyboardEventCodes,
  useExternalKeyboard
}                                     from '../../../components/hooks/useExternalKeybaord'
import {
  openDialogContact,
  openDialogContactDelete
}                                     from '../contact/ContactForm'
import {
  openDialogBankAccount,
  openDialogBankAccountDelete
}                                     from '../banks/BankAccountForm'
import { openDialogCustomerForm }     from './form/CustomerForm'
import { useCustomerDashboard }       from '../../../store/customer/useCustomer'
import { processErrorGraphQL }        from '../../../apollo'

const Dashboard = () => {

  const {
    data: globalCustomerData,
    selectedId,
    setSelectedId,
    searchState,
    setStateSearch,
    insertNewCustomer,
    insertNewAddress,
    insertNewContact,
    insertNewBank,
    updateCustomerDetails,
    updateAddress,
    updateContact,
    updateBankAccount
  } = useCustomerDashboard(true)

  const queryVariables = React.useMemo(() => queryVariablesForCustomers(searchState ? searchState : ''), [searchState])

  const { data: customers, refetch } = useCustomersQuery({
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'no-cache',
    variables: queryVariables
  })

  const handlerSearch = (value: string) => {
    setStateSearch(value)
  }

  useEffect(() => {
    if (globalCustomerData.selected) {
      return
    }
    if (!customers || !customers.data || !customers.data.items || customers.data.items.length === 0) {
      return
    }
    const val = customers.data.items[0]
    setSelectedId(val.id)
  }, [globalCustomerData, customers, setSelectedId])

  const addNewCustomer = () => {
    const submitFun = (customer: TCustomer) => {
      insertNewCustomer(customer)
        .then(() => {
          refetch().then()
        })
        .catch(e => {
          processErrorGraphQL(e, {})
        })
    }
    openDialogCustomerForm({ submitFun: submitFun })
  }

  const addNewAddress = () => {
    openDialogAddress({ submitFun: insertNewAddress })
  }

  const addNewContact = () => {
    openDialogContact({ submitFun: insertNewContact })
  }

  const addNewBankAccount = () => {
    openDialogBankAccount({ submitFun: insertNewBank })
  }

  const editCustomerDetails = () => {
    globalCustomerData.selected && globalCustomerData.selected.id &&
    openDialogCustomerForm({
      customer: _get(globalCustomerData, 'selected') as TCustomer,
      submitFun: updateCustomerDetails,
      notShowAdditionalData: true
    })
  }

  /*  useEffect(() => {
      const id = setButtonsForPage([
        {
          label: 'customer',
          icon: faUserPlus,
          shortcut: KeyboardEventCodes.F9,
          onClick:addNewCustomer
        },
        {
          label: 'address',
          icon: faHome,
          shortcut: KeyboardEventCodes.F6,
          onClick: addNewAddress
        },
        {
          label: 'contact',
          icon: faUser,
          shortcut: KeyboardEventCodes.F7,
          onClick: addNewContact
        },
        {
          label: 'bank',
          icon: faUniversity,
          shortcut: KeyboardEventCodes.F8,
          onClick: addNewBankAccount
        }])
      return () => clearButtonsForPage(id)
    }, [setButtonsForPage,clearButtonsForPage])*/

  const { setRef } = useExternalKeyboard((e: KeyboardEvent) => {
    switch (e.key) {
      case KeyboardEventCodes.F4:
        globalCustomerData.selected && globalCustomerData.selected.id && editCustomerDetails()
        return
      case KeyboardEventCodes.F6:
        globalCustomerData.selected && globalCustomerData.selected.id && addNewAddress()
        return

      case KeyboardEventCodes.F7:
        globalCustomerData.selected && globalCustomerData.selected.id && addNewContact()
        return
      case KeyboardEventCodes.F8:
        globalCustomerData.selected && globalCustomerData.selected.id && addNewBankAccount()
        return
      case KeyboardEventCodes.F9:
        addNewCustomer()
        return
    }
  }, true, [KeyboardEventCodes.F4, KeyboardEventCodes.F6, KeyboardEventCodes.F7, KeyboardEventCodes.F8, KeyboardEventCodes.F9], 'customer-dashboard')

  const { onClickHandler } = useOptimizeEventClick({
    eventHandler (data: IUseOptimizeEventData) {
      /** event select one  address */
      if (data.action === CONSTANT_CUSTOMER.EVENTS.SELECTED_ONE) {
        customers && customers.data && data.id && setSelectedId(data.id)
        return
      }

      if (data.action === CONSTANT_CUSTOMER.EVENTS.ADD_NEW) {
        addNewCustomer()
        return
      }

      if (data.action === CONSTANT_CUSTOMER.EVENTS.EDIT) {
        editCustomerDetails()
        return
      }

      if (data.action === CONSTANT_CONTACT.EVENTS.ADD_NEW) {
        addNewContact()
        return
      }

      if (data.action === CONSTANT_CONTACT.EVENTS.EDIT) {
        if (globalCustomerData.selected) {
          const contact = _get(globalCustomerData, 'selected.contacts', []).find((x: TContact) => Number(x.id) === Number(data.id))
          openDialogContact({ submitFun: updateContact, contact })
        }
        return
      }

      if (data.action === CONSTANT_CONTACT.EVENTS.DELETE) {
        const contact = _get(globalCustomerData, 'selected.contacts', []).find((x: TContact) => x.id === data.id)
        contact && openDialogContactDelete({ contact, actionOnDelete: updateContact })
        return
      }

      /** add new address */
      if (data.action === CONSTANT_ADDRESS.EVENTS.ADD_NEW) {
        addNewAddress()
        return
      }

      if (data.action === CONSTANT_ADDRESS.EVENTS.DELETE) {
        const address = _get(globalCustomerData, 'selected.addresses', []).find((x: TAddress) => x.id === data.id)
        address && openDialogAddressDelete({
          address: { id: address.id, status: CONSTANT_MODEL.STATUS.DELETED },
          actionOnDelete: updateAddress
        })
        return
      }

      /** edit address */
      if (data.action === CONSTANT_ADDRESS.EVENTS.EDIT) {
        if (globalCustomerData.selected) {
          const address = _get(globalCustomerData, 'selected.addresses', []).find((x: TAddress) => Number(x.id) === Number(data.id))
          openDialogAddress({ submitFun: updateAddress, address })
        }
        return
      }

      /** add new bank account */

      if (data.action === CONSTANT_BANK_ACCOUNT.EVENTS.ADD_NEW) {
        addNewBankAccount()
        return
      }

      /** edit bank account */
      if (data.action === CONSTANT_BANK_ACCOUNT.EVENTS.EDIT) {
        if (globalCustomerData.selected) {
          const bank = _get(globalCustomerData, 'selected.banks', []).find((x: TBankAccount) => Number(x.id) === Number(data.id))
          openDialogBankAccount({ submitFun: updateBankAccount, bank })
        }
      }
      /** delete bank account */

      if (data.action === CONSTANT_BANK_ACCOUNT.EVENTS.DELETE) {
        const bankAccount = _get(globalCustomerData, 'selected.banks', []).find((x: TBankAccount) => Number(x.id) === Number(data.id))
        bankAccount && openDialogBankAccountDelete({
          bankAccount: {
            id: bankAccount.id,
            status: CONSTANT_MODEL.STATUS.DELETED
          },
          actionOnDelete: updateBankAccount
        })
      }
    }
  })

  if (!customers || !customers.data) {
    return <></>
  }

  return (
    <>
      <div className={'d-flex h-100 w-100 pt-2 px-2'} ref={setRef}>
        <div
          className={'d-flex h-100 text-center customer-view-render'}
          onClick={onClickHandler}
          data-action-root
        >
          <SearchView
            handlerSearch={handlerSearch}
            data={customers.data}
            helperText={'search by #tax-number, #client-number, description'}
            leftButtonIcon={faUserPlus}
            leftButtonEvent={CONSTANT_CUSTOMER.EVENTS.ADD_NEW}
            RenderComponent={SearchViewRender}
            selectedId={Number(selectedId)}
          />
        </div>
        <div className={'d-flex flex-2 justify-content-start w-100 h-100 p-3'} onClick={onClickHandler}>
          <Tabs
            tabs={
              [
                {
                  tabName: 'Info',
                  tabContent: CustomerInfo
                },
                {
                  tabName: 'Card',
                  tabContent: CustomerCard
                },
                {
                  tabName: 'Payments',
                  tabContent: CustomerPayments
                }
              ]
            }
            stateTab={{ active: 0 }}
          />
        </div>
      </div>
    </>
  )

}

export default Dashboard
