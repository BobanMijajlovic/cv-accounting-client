import React, {useRef} from 'react'

import {
  isEmail,
  isURL
}                               from 'validator'
import {get as _get}            from 'lodash'
import {CONSTANT_CONTACT}       from '../../../constants'
import {
  FORMAT_RULE_PHONE,
  required,
  useValidation
}                               from '../../../../validation'
import SelectTextWithValidation from '../../../../components/withValidation/SelectTextWithValidation'
import InputTextWithValidation  from '../../../../components/withValidation/InputTextWithValidation'
import {TContact}               from '../../../../graphql/type_logic/types'
import ButtonShortcut           from '../../../../components/Button/ButtonShortcut'
import {faUserPlus}             from '@fortawesome/free-solid-svg-icons'
import ConditionalRendering     from '../../../../components/Util/ConditionalRender'
import {processErrorGraphQL}    from '../../../../apollo'

interface IContactAddEditProps {
  contacts ?: TContact[]
  submitFun : (contact : TContact) => Promise<any>
}

type ContactModel = {
  type : string,
  valuePhone : string
  valueEmail : string
  valueWeb : string
  description ?: string
}

const ContactPart = ({contacts, submitFun} : IContactAddEditProps) => {

  const refAddButton = useRef(null)

  const currValidation = useValidation<ContactModel>({
    initialData: {
      type: CONSTANT_CONTACT.TYPES.MOBILE
    }
  })
  const {state, getFieldRef} = currValidation

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

    if (contacts && contacts.length > 2) {
      await currValidation.setFieldError(stringField, 'You already added max num of contacts')
      return
    }

    if (error) {
      const fieldRef = refs.find(x => x.field === stringField)
      fieldRef && fieldRef.ref.current.focus()
      return
    }

    if (contacts) {
      if (!contacts.every((c : TContact) => (Number(data.type) !== Number(c.type) || _get(data, stringField) !== c.value))) {
        currValidation.setFieldError(stringField, 'Contact already exists')
        const fieldRef = getFieldRef(stringField)
        fieldRef && fieldRef.ref.current.focus()
        return
      }
    }

    try {
      const obj = Object.assign({}, {
        type: data.type,
        value: _get(data, stringField)
      })
      await currValidation.setFieldValue(stringField, '', false)
      const fieldRef = getFieldRef('type')
      fieldRef && fieldRef.ref.current.focus()
      await submitFun(obj)
    } catch (e) {
            /** process the error */
      processErrorGraphQL(e, currValidation)
    }
  }

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

  const hide = React.useMemo(() => contacts && contacts.length > 2, [contacts])

  return (
    <ConditionalRendering condition={!hide}>
      <div className={'d-flex align-items-center container p-0'}>
        <div className={'col-4 pl-0'}>
          <SelectTextWithValidation
                        required
                        selectOnFocus
                        focusOnMount
                        label={'Contact type'}
                        helperText={'choose contact'}
                        options={CONSTANT_CONTACT.TYPES_SELECT}
                        validation={{
                          useValidation: currValidation,
                          model: 'type',
                        }}
          />
        </div>
        <div className={'col-md-6 pl-0'}>
          <div style={isEmailType ? {} : styleNoVisible}>
            <InputTextWithValidation
                            selectOnFocus
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
                            selectOnFocus
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

          <div
                        style={isPhoneType ? {} : styleNoVisible}>
            <InputTextWithValidation
                            selectOnFocus
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

        <div className={'col-md-2 pl-0'}>
          <ButtonShortcut
                        ref={refAddButton}
                        onClick={handlerOnSubmit}
                        icon={faUserPlus}
                        style={{minWidth: '50px'}}
                        label={'Add'}
                        classNames={'hw-shortcut-button primary sm hw-button-border-color mr-3'}
          />
        </div>
      </div>
    </ConditionalRendering>
  )
}

export default ContactPart

