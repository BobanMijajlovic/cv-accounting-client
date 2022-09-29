import React                   from 'react'
import InputTextWithValidation from '../../../../components/withValidation/InputTextWithValidation'
import {
  IFieldsRefs,
  required,
  useValidation,
}                              from '../../../../validation'
import {
  faAddressCard,
  faUniversity,
  faUser
}                              from '@fortawesome/free-solid-svg-icons'
import {
  TBankAccount,
  TClient,
  TContact,
  TCustomer
} from '../../../../graphql/type_logic/types'
import ContactView             from '../../contact/ContactView'
import {get as _get}           from 'lodash'
import DialogButtonsSaveUpdate from '../../_common/DialogButtonsSaveUpdate'
import {
  DialogModalRootComponent,
  EasyDialogApolloProvider
}                              from '../../../../components/EasyModel/EasyModal'
import {CenteredDialog}        from '../../../../components/Dialog/DialogBasic'
import BankAccountView         from '../../banks/BankAccountView'
import ConditionalRendering    from '../../../../components/Util/ConditionalRender'
import {
  IUseOptimizeEventData,
  useOptimizeEventClick
}                              from '../../../../components/hooks/useOptimizeEventClick'
import {
  CONSTANT_BANK_ACCOUNT,
  CONSTANT_CONTACT
}                              from '../../../constants'
import AddressPart             from './AddressPart'
import {FontAwesomeIcon}       from '@fortawesome/react-fontawesome'
import {faHome}                from '@fortawesome/free-solid-svg-icons/faHome'
import ContactPart             from './ContactPart'
import BankPart                from './BankPart'
import {processErrorGraphQL}   from '../../../../apollo'

interface ICustomerFormProps {
  customer ?: TCustomer | TClient
  submitFun : (customer : TCustomer) => Promise<any>
  cancelFun : () => void
  notShowAdditionalData ?: boolean
}

const CustomerForm = ({customer, cancelFun, submitFun, notShowAdditionalData} : ICustomerFormProps) => {

  const validation = useValidation<TCustomer>({
    initialData: {
      description: _get(customer, 'description', 'HWT DOO'),
      taxNumber: _get(customer, 'taxNumber', '107112543'),
      uniqueCompanyNumber: _get(customer, 'uniqueCompanyNumber', '20744073'),
      shortName: _get(customer, 'shortName', 'HWT D.O.O.'),
      fullName: _get(customer, 'fullName', 'HardWorking Technologies (Hardware & Software RnD)'),
    }
  })

  const {removeArrayData} = validation

  const handlerOnSubmit = async () => {
    const {error, data, validations, refs} = await validation.validate()
    if (error) {
      const fieldRef : IFieldsRefs | undefined = refs.find(({field}) => _get(validations, `validations.${field}.error`))
      fieldRef && fieldRef.ref.current.focus()
      return
    }

    try {
      const obj = Object.assign({}, {
        ...data,
        addresses: data.addresses && (data.addresses as any)[0].street ? data.addresses : void(0),
      })
      await submitFun(obj)
      cancelFun()
    } catch (e) {
            /** process the error */
      processErrorGraphQL(e,validation)
    }
  }

  const addNewContact = async (contact : TContact) => {
    await validation.addArrayData('contacts', contact)
  }

  const addNewBank = async (bank : TBankAccount) => {
    await validation.addArrayData('banks', bank)
  }

  const {onClickHandler} = useOptimizeEventClick({
    eventHandler (data : IUseOptimizeEventData) {

      if (data.action === CONSTANT_CONTACT.EVENTS.DELETE) {
        removeArrayData('contacts', Number(data.id))
        return
      }

      if (data.action === CONSTANT_BANK_ACCOUNT.EVENTS.DELETE) {
        removeArrayData('banks', Number(data.id))
        return
      }
    }
  })

  return (
    <>
      <div className={'container hw-client-form-root shadow-lg pt-2'}>
        <div className={'col-md-3 p-2'}>
          <InputTextWithValidation
                            required
                            focusOnMount
                            selectOnFocus
                            align={'align-center'}
                            label={'Tax #'}
                            helperText={'enter tax number'}
                            maxLength={9}
                            validation={{
                              useValidation: validation,
                              model: 'taxNumber',
                              rule: {
                                required
                              }
                            }}
          />
        </div>
        <div className={'col-md-3 p-2'}>
          <InputTextWithValidation
                            required
                            selectOnFocus
                            align={'align-center'}
                            label={'Company #Num'}
                            helperText={'enter company number'}
                            maxLength={8}
                            validation={{
                              useValidation: validation,
                              model: 'uniqueCompanyNumber',
                              rule: {
                                required
                              }
                            }}
          />
        </div>
        <div className={'col-md-6 p-2'}>
          <InputTextWithValidation
                            required
                            selectOnFocus
                            align={'align-left'}
                            label={'Short name'}
                            helperText={'enter short name'}
                            maxLength={64}
                            validation={{
                              useValidation: validation,
                              model: 'shortName',
                              rule: {
                                required
                              }
                            }}
          />
        </div>
        <div className={'col-md-8 p-2'}>
          <InputTextWithValidation
                            required
                            selectOnFocus
                            align={'align-left'}
                            label={'Full name'}
                            helperText={'enter full name'}
                            maxLength={75}
                            validation={{
                              useValidation: validation,
                              model: 'fullName',
                              rule: {
                                required
                              }
                            }}
          />
        </div>
        <div className={'col-md-4 p-2'}>
          <InputTextWithValidation
                            selectOnFocus
                            align={'align-left'}
                            label={'Description'}
                            helperText={'enter description'}
                            maxLength={20}
                            validation={{
                              useValidation: validation,
                              model: 'description',
                            }}
          />

        </div>
        <ConditionalRendering condition={!notShowAdditionalData}>
          <div className={'w-100'} onClick={onClickHandler} data-action-root>
            <div className={'w-100 p-2'}>
              <div className={'d-flex font-smaller-2 align-items-center'}>
                <div className={'pr-2'}><FontAwesomeIcon icon={faHome}/></div>
                <div>ADDRESS</div>
              </div>
              <div className={'mt-2'}>
                <AddressPart validation={validation} fieldParentName={'addresses'}/>
              </div>
            </div>
            <div className={'d-flex flex-row justify-content-start mt-2 p-2 w-100'}>
              <div className={'d-flex flex-column col-5 pl-0 pr-1'}>
                <div>
                  <div className={'d-flex font-smaller-2 align-items-center mb-2'}>
                    <div className={'pr-2'}><FontAwesomeIcon icon={faUser}/></div>
                    <div>CONTACTS</div>
                  </div>
                  <ContactPart contacts={validation.state.contacts} submitFun={addNewContact}/>
                </div>
                <ContactView
                      contacts={validation.state.contacts}
                      notShowAddButton={true}
                      notShowEditButton={true}
                />
              </div>
              <div className={'d-flex flex-column col-7 pl-1 pr-0'}>
                <div>
                  <div className={'d-flex font-smaller-2 align-items-center mb-2'}>
                    <div className={'pr-2'}><FontAwesomeIcon icon={faUniversity}/></div>
                    <div>BANK ACCOUNT</div>
                  </div>
                  <BankPart customerBanks={validation.state.banks} submitFun={addNewBank}/>
                </div>
                <BankAccountView
                        banks={validation.state.banks}
                        notShowAddButton={true}
                        notShowEditButton={true}
                />
              </div>
            </div>
          </div>
        </ConditionalRendering>

        <DialogButtonsSaveUpdate
                        cancelFun={cancelFun}
                        submitFun={handlerOnSubmit}
                        update={!!customer}
                        icon={faAddressCard}
        />
      </div>
    </>
  )

}

export default CustomerForm

export interface IOpenDialogCustomer {
  customer ?: TCustomer | TClient,
  submitFun : (customer : any) => Promise<any> | void
  notShowAdditionalData ?: boolean
}

export const openDialogCustomerForm = ({customer, submitFun, notShowAdditionalData} : IOpenDialogCustomer) => {
  EasyDialogApolloProvider((closeDialog : () => any, openDialog : (data : any) => any) => {
    openDialog(<DialogModalRootComponent name={'dialog-customer-form-add-edit-430654456135251'} closeFn={closeDialog}>
      <CenteredDialog
          title={customer ? 'Edit customer' : 'Define new customer'}
          closeAction={closeDialog}
          Component={CustomerForm}
          componentRenderProps={{
            cancelFun:closeDialog,
            submitFun:submitFun,
            customer:customer,
            notShowAdditionalData:notShowAdditionalData
          }}
      />
    </DialogModalRootComponent>)
  })
}
