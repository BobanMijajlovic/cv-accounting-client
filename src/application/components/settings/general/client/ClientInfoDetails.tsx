import React                      from 'react'
import { useClient }              from '../../../../../store/client/useClient'
import {
  TAddress,
  TBankAccount,
  TClient,
  TContact
}                                 from '../../../../../graphql/type_logic/types'
import { useTranslationFunction } from '../../../../../components/Translation/useTranslation'
import EmptyTag                   from '../../../../../components/Util/EmptyTag'
import ClientLogo                 from './ClientLogo'
import ClientAddress              from './ClientAddress'
import ClientContacts             from './ClientContacts'
import ClientBanks                from './ClientBanks'
import {
  IUseOptimizeEventData,
  useOptimizeEventClick
}                                 from '../../../../../components/hooks/useOptimizeEventClick'
import {
  CONSTANT_ADDRESS,
  CONSTANT_BANK_ACCOUNT,
  CONSTANT_CONTACT,
  CONSTANT_CUSTOMER,
  CONSTANT_MODEL
}                                 from '../../../../constants'
import { get as _get }            from 'lodash'
import { openDialogCustomerForm } from '../../../customer/form/CustomerForm'
import ButtonShortcut             from '../../../../../components/Button/ButtonShortcut'
import { faAddressCard }          from '@fortawesome/free-solid-svg-icons'
import {
  openDialogAddress,
  openDialogAddressDelete
}                                 from '../../../address/AddressForm'
import {
  openDialogContact,
  openDialogContactDelete
}                                 from '../../../contact/ContactForm'
import {
  openDialogBankAccount,
  openDialogBankAccountDelete
}                                 from '../../../banks/BankAccountForm'

const ClientInfoDetails = () => {

  const {
    data:client,
    imgLogo,
    banks, 
    addresses,
    contacts, 
    updateClientDetails, 
    insertNewAddress, 
    insertNewContact, 
    insertNewBank,
    updateContact,
    updateAddress,
    updateBankAccount
  } = useClient()

  const editCustomerDetails = () => {
    client && client.id &&
    openDialogCustomerForm({
      customer: client as TClient,
      submitFun: updateClientDetails,
      notShowAdditionalData:true
    })
  }

  const addNewAddress = () => {
    openDialogAddress({submitFun:insertNewAddress})
  }

  const addNewContact = () => {
    openDialogContact({submitFun:insertNewContact})
  }

  const addNewBankAccount = () => {
    openDialogBankAccount({submitFun:insertNewBank})
  }

  const {onClickHandler} = useOptimizeEventClick({
    eventHandler (data: IUseOptimizeEventData) {
      if (data.action === CONSTANT_CUSTOMER.EVENTS.EDIT) {
        editCustomerDetails()
        return
      }
      /** add new address */
      if (data.action === CONSTANT_ADDRESS.EVENTS.ADD_NEW) {
        addNewAddress()
        return
      }

      /** edit address */
      if (data.action === CONSTANT_ADDRESS.EVENTS.EDIT) {
        if (!client) {
          return 
        }
        const address = _get(client, 'addresses', []).find((x: TAddress) => Number(x.id) === Number(data.id))
        openDialogAddress({submitFun:updateAddress, address})
        return
      }

      /** delete address */
      if (data.action === CONSTANT_ADDRESS.EVENTS.DELETE) {
        const address: any = _get(client, 'addresses', []).find((x: TAddress) => x.id === data.id)
        if (!address) {
          return 
        } 
        openDialogAddressDelete({
          address:{id:address.id, status:CONSTANT_MODEL.STATUS.DELETED},
          actionOnDelete:updateAddress
        })
        return
      }
            
      /** contact events */

      /** add new contact */
      if (data.action === CONSTANT_CONTACT.EVENTS.ADD_NEW) {
        addNewContact()
        return
      }

      /** edit contact */
      if (data.action === CONSTANT_CONTACT.EVENTS.EDIT) {
        if (client) {
          const contact = _get(client, 'contacts', []).find((x: TContact) => Number(x.id) === Number(data.id))
          openDialogContact({submitFun:updateContact, contact})
        }
        return
      }

      /** delete contact */
      if (data.action === CONSTANT_CONTACT.EVENTS.DELETE) {
        const contact = _get(client, 'contacts', []).find((x: TContact) => x.id === data.id)
        contact && openDialogContactDelete({contact, actionOnDelete:updateContact})
        return
      }
      
      /** bank events */

      /** add new bank account */
      if (data.action === CONSTANT_BANK_ACCOUNT.EVENTS.ADD_NEW) {
        addNewBankAccount()
        return
      }
      /** edit bank account */
      if (data.action === CONSTANT_BANK_ACCOUNT.EVENTS.EDIT) {
        if (client) {
          const bank = _get(client, 'banks', []).find((x: TBankAccount) => Number(x.id) === Number(data.id))
          bank && openDialogBankAccount({submitFun:updateBankAccount, bank})
        }
      }

      /** delete bank account */
      if (data.action === CONSTANT_BANK_ACCOUNT.EVENTS.DELETE) {
        const bankAccount = _get(client, 'banks', []).find((x: TBankAccount) => Number(x.id) === Number(data.id)) as any
        bankAccount && openDialogBankAccountDelete({
          bankAccount:{
            id:bankAccount.id,
            status:CONSTANT_MODEL.STATUS.DELETED
          },
          actionOnDelete:updateBankAccount
        })
      }
    }
  })

  return (
    <div className={'relative hw-client-info-settings-root w-50'}>
      <div className={'hw-client-personal-info-title'}>Personal Information</div>
      <div className={'hw-client-logo-upload-root color-primary'}>
        <ClientLogo img={imgLogo}/>
      </div>
      <div className={'d-flex flex-column color-primary font-smaller-1'}  onClick={onClickHandler} data-action-root>
        <GeneralDetails client={client}/>
        <ClientAddress addresses={addresses}/>
        <ClientContacts contacts={contacts}/>
        <ClientBanks banks={banks}/>
      </div>
    </div>
  )
}

export default ClientInfoDetails

const GeneralDetails = ({client}: { client: TClient }) => {
  const {translate:$translate} = useTranslationFunction()
  return (
    <div className={'d-flex flex-row flex-fill pb-2 w-75'}>
      <div className={'d-flex flex-column flex-2 justify-content-start align-items-start mt-2 pb-1'}>
        <div className={'d-flex flex-row justify-content-between align-items-center w-100 font-bigger-2 line-height-11 color-primary font-weight-600 pb-2'}>
          <div className={'flex-2'}><EmptyTag model={client} field={'shortName'} placeholder={'SHORT NAME'}/></div>
          <div
              data-action={CONSTANT_CUSTOMER.EVENTS.EDIT}
              data-action-id={_get(client, 'id')}
          >
            <ButtonShortcut
                icon={faAddressCard}
                label={'Edit'}
                classNames={'hw-shortcut-button primary sm hw-button-border-color'}
            />
          </div>
        </div>
        <div className={'font-smaller-4 text-center'}>
          <EmptyTag model={client} field={'fullName'} placeholder={'FULL NAME'}/>
        </div>
        <div className={'d-flex flex-row justify-content-start align-items-center color-primary'}>
          <sub className={'text-left opacity-6 min-width-120'}>Tax Number&nbsp;:</sub>
          <div className={'px-1'}>
            <EmptyTag model={client} field={'taxNumber'} placeholder={'#########'}/>
          </div>
        </div>
        <div className={'d-flex flex-row align-items-center color-primary'}>
          <sub className={'text-left opacity-6 min-width-120'}>Company #Num&nbsp;:</sub>
          <div className={'px-1'}>
            <EmptyTag model={client} field={'uniqueCompanyNumber'} placeholder={'#########'}/>
          </div>
        </div>
        <div className={'d-flex flex-row align-items-center color-primary'}>
          <sub className={'text-left opacity-6 min-width-120'}>Description&nbsp;:</sub>
          <div className={'px-1'}>
            <EmptyTag model={client} field={'description'} placeholder={'####'}/>
          </div>
        </div>
      </div>
    </div>
  )
}
