import React from 'react'

import {
  isEmail,
  isURL
}                                 from 'validator'
import {get as _get}              from 'lodash'
import {
  CONSTANT_CONTACT,
  CONSTANT_MODEL
}                                 from '../../constants'
import {
  FORMAT_RULE_PHONE,
  required,
  useValidation
}                                 from '../../../validation'
import SelectTextWithValidation   from '../../../components/withValidation/SelectTextWithValidation'
import InputTextWithValidation    from '../../../components/withValidation/InputTextWithValidation'
import {TContact}                 from '../../../graphql/type_logic/types'
import {
  DialogModalRootComponent,
  EasyDialogApolloProvider
}                                 from '../../../components/EasyModel/EasyModal'
import {
  CenteredDialog,
  DialogComponentQuestions
}                                 from '../../../components/Dialog/DialogBasic'
import {useUpdateContactMutation} from '../../../graphql/graphql'
import DialogButtonsSaveUpdate    from '../_common/DialogButtonsSaveUpdate'
import {faUserPlus}               from '@fortawesome/free-solid-svg-icons'
import {processErrorGraphQL}      from '../../../apollo'

interface IContactAddEditProps {
  contact ?: TContact
  submitFun : (contact : TContact) => Promise<any>| void
  cancelFun : () => void
}

type ContactModel = {
  type : string,
  valuePhone : string
  valueEmail : string
  valueWeb : string
  description ?: string
}

const ContactForm = ({contact, cancelFun, submitFun} : IContactAddEditProps) => {

  const currentType = React.useMemo(() => {
    return _get(contact, 'type', '')
  }, [contact])

  const currentValue = React.useMemo(() => {
    return _get(contact, 'value', '')
  }, [contact])

  const currValidation = useValidation<ContactModel>({
    initialData: {
      type: _get(contact, 'type', CONSTANT_CONTACT.TYPES.MOBILE),
      valueEmail: (currentType === CONSTANT_CONTACT.TYPES.EMAIL) ? currentValue : '',
      valueWeb: (currentType === CONSTANT_CONTACT.TYPES.WEBSITE) ? currentValue : '',
      valuePhone: (currentType !== CONSTANT_CONTACT.TYPES.WEBSITE && currentType !== CONSTANT_CONTACT.TYPES.EMAIL) ? currentValue : '',
      description: _get(contact, 'description', '')
    }
  })

  const handlerOnSubmit = async () => {
    const {data, validations, refs} = await currValidation.validate()
    let stringField = 'valuePhone'
    let error = false
    switch (data.type) {
      case CONSTANT_CONTACT.TYPES.EMAIL:
        stringField = 'valueEmail'
        if (validations.validations.valueEmail.error) {
          error = true
        }
        break
      case CONSTANT_CONTACT.TYPES.WEBSITE:
        stringField = 'valueWeb'
        if (validations.validations.valueWeb.error) {
          error = true
        }
        break
      default:
        if (validations.validations.valuePhone.error) {
          error = true
        }
        break
    }

    if (error) {
      const fieldRef = refs.find(x => x.field === stringField)
      fieldRef && fieldRef.ref.current.focus()
      return
    }

    try {
      const obj = Object.assign({}, {
        type: data.type,
        value: _get(data, stringField),
        description: data.description
      }, (contact && contact.id) ? {id: contact.id} : {})
      await submitFun(obj)
      cancelFun()
    } catch (e) {
            /** process the error */
      processErrorGraphQL(e, currValidation)
    }
  }

  const {state} = currValidation

  const styleNoVisible = {
    position: 'absolute',
    top: '-10000px'
  } as any

  const isEmailType = React.useMemo(() => {
    return (state.type) === CONSTANT_CONTACT.TYPES.EMAIL
  }, [state])

  const isWebType = React.useMemo(() => {
    return (state.type) === CONSTANT_CONTACT.TYPES.WEBSITE
  }, [state])

  const isPhoneType = React.useMemo(() => {
    return !isWebType && !isEmailType
  }, [isWebType, isEmailType])

  return (
    <>
      <div className={'d-flex hw-client-form-add-contact-form'}>
        <div className={'container'}>
          <div className={'col-5'}>
            <SelectTextWithValidation
                            required
                            focusOnMount
                            label={'Contact type'}
                            helperText={'choose contact'}
                            options={CONSTANT_CONTACT.TYPES_SELECT}
                            validation={{
                              useValidation: currValidation,
                              model: 'type',
                              rule: {
                                required,
                              }
                            }}
            />
          </div>
          <div className={'col-md-7'}>
            <div style={isEmailType ? {} : styleNoVisible}>
              <InputTextWithValidation
                                required
                                label={'Contact type Email'}
                                helperText={'enter value'}
                                disabled={!isEmailType}
                                validation={{
                                  useValidation: currValidation,
                                  model: 'valueEmail',
                                  rule: {
                                    required,
                                    useValidator: [{
                                      validator: isEmail
                                    }]
                                  }
                                }}
              />
            </div>
            <div style={isWebType ? {} : styleNoVisible}>
              <InputTextWithValidation
                                required
                                label={'Contact type Web'}
                                helperText={'enter value'}
                                disabled={!isWebType}
                                validation={{
                                  useValidation: currValidation,
                                  model: 'valueWeb',
                                  rule: {
                                    required,
                                    useValidator: [{
                                      validator: isURL
                                    }]
                                  }
                                }}
              />
            </div>

            <div style={isPhoneType ? {} : styleNoVisible}>
              <InputTextWithValidation
                                required
                                label={'Contact type Phone'}
                                helperText={'enter value'}
                                disabled={!isPhoneType}
                                validation={{
                                  useValidation: currValidation,
                                  model: 'valuePhone',
                                  rule: {
                                    required
                                  },
                                  format: {
                                    rule: FORMAT_RULE_PHONE,
                                    validationMessage: 'Not valid'
                                  }
                                }}
              />
            </div>
          </div>

          <div className={'col-12'}>
            <InputTextWithValidation
                            label={'Description'}
                            helperText={'enter description'}
                            validation={{
                              useValidation: currValidation,
                              model: 'description'
                            }}
            />
          </div>
          <DialogButtonsSaveUpdate
                        cancelFun={cancelFun}
                        submitFun={handlerOnSubmit} update={!!contact} icon={faUserPlus}/>
        </div>
      </div>
    </>
  )
}

export default ContactForm

export interface IOpenDialogContact {
  contact ?: TContact,
  submitFun : (contact : TContact) => Promise<any>| void
}

export const openDialogContact = ({contact, submitFun} : IOpenDialogContact) => {
  EasyDialogApolloProvider((closeDialog : () => any, openDialog : (data : any) => any) => {
    openDialog(<DialogModalRootComponent name={'dialog-contact-add-edit-46135251'} closeFn={closeDialog}>
      <CenteredDialog
                title={contact ? 'Edit contact' : 'Define new contact'}
                closeAction={closeDialog}
                Component={ContactForm}
                componentRenderProps={{
                  cancelFun: closeDialog,
                  submitFun: submitFun,
                  contact
                }}
      />
    </DialogModalRootComponent>)
  })
}

export interface IDialogContactDelete {
  contact : TContact
  actionOnDelete ?: (contact: TContact) => void
}

export const openDialogContactDelete = ({contact, actionOnDelete} : IDialogContactDelete) => {

  EasyDialogApolloProvider((closeDialog : () => any, openDialog : (data : any) => any) => {
    const Component = () => {
      const handlerConfirm = async () => {
        actionOnDelete && await actionOnDelete({id: contact.id, status: CONSTANT_MODEL.STATUS.DELETED})
        closeDialog()
      }
      const messages : string[] = React.useMemo(() => [
        'Are you sure do delete contact?',
        `${_get(contact, 'value', '')}`
      ], [])
      return (
        <DialogComponentQuestions
                    closeFun={closeDialog}
                    confirmFun={handlerConfirm}
                    messages={messages}
        />
      )
    }
    openDialog(<DialogModalRootComponent name={'dialog-contact-add-edit-98791203'} closeFn={closeDialog}>
      <CenteredDialog
                title={'DELETE CONTACT'}
                closeAction={closeDialog}
                Component={Component}
      />
    </DialogModalRootComponent>)
  })
}
