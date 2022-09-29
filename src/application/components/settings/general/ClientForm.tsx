import React, { useEffect } from 'react'
import {
  IFieldsRefs,
  useValidation
}                           from '../../../../validation'
import {
  TBankAccount,
  TClient,
  TContact
}                              from '../../../../graphql/type_logic/types'
import { get as _get }         from 'lodash'
import { processErrorGraphQL } from '../../../../apollo'
import {
  IUseOptimizeEventData,
  useOptimizeEventClick
}                              from '../../../../components/hooks/useOptimizeEventClick'
import {
  CONSTANT_BANK_ACCOUNT,
  CONSTANT_CONTACT
}                              from '../../../constants'
import * as _                  from 'lodash'
import { useClient }           from '../../../../store/client/useClient'

const ClientForm = () => {
  const {data:client} = useClient()
    
  const validation = useValidation<TClient>()

  const { removeArrayData, setFieldValue, addArrayData } = validation
    
  useEffect(() => {
    if (!client) {
      return 
    }
    
    if (client.addresses) {
      setFieldValue('addresses',client.addresses as any, false)
    }
    
    if (client.banks) {
      setFieldValue('banks',client.banks as any, false)
    }

    if (client.contacts) {
      setFieldValue('contacts',client.contacts as any, false)
    }
    
    ['description','taxNumber','uniqueCompanyNumber', 'shortName', 'fullName'].forEach((s: string) => _.get(client, s) ? setFieldValue(s, _.get(client, s).toString(), false) : null)
        
  },[client,setFieldValue])

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
      // await submitFun(obj)
    } catch (e) {
            /** process the error */
      processErrorGraphQL(e,validation)
    }
  }

  const addNewContact = async (contact : TContact) => {
    await addArrayData('contacts', contact)
  }

  const addNewBank = async (bank : TBankAccount) => {
    await addArrayData('banks', bank)
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
    <div className={''}>

    </div>
  )
}

export default ClientForm