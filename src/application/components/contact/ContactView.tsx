import React                from 'react'
import { FontAwesomeIcon }  from '@fortawesome/react-fontawesome'
import { CONSTANT_CONTACT } from '../../constants'
import {
  faTimes,
  faUser,
  faUserPlus
}                           from '@fortawesome/free-solid-svg-icons'

import { faEdit }             from '@fortawesome/free-regular-svg-icons'
import { TContact }           from '../../../graphql/type_logic/types'
import ConditionalRendering   from '../../../components/Util/ConditionalRender'
import ButtonShortcut         from '../../../components/Button/ButtonShortcut'
import { KeyboardEventCodes } from '../../../components/hooks/useExternalKeybaord'

export interface IContactViewProps {
  contacts ?: TContact[]
  notShowAddButton ?: boolean
  notShowEditButton ?: boolean
  notShowDeleteButton ?: boolean
  classNames ?: string
}

export const ContactView = ({contacts, notShowAddButton,notShowEditButton, notShowDeleteButton, classNames} : IContactViewProps) => {

  const typesFn = React.useCallback((value ?: string) => {
    const entry = CONSTANT_CONTACT.TYPES_SELECT.find(x => x.value === value)
    return entry ? entry.label : ''
  }, [])

  return (

    <>
      <div className={`m-2 text-upper letter-spacing${classNames ? ` ${classNames}` : ''}`}>
       
        <div className={'d-flex justify-content-between mb-1 color-primary'}>
          <div className={'d-flex font-smaller-2 align-items-center '}>
            <div className={'pr-2'}><FontAwesomeIcon icon={faUser}/></div>
            <div>Contacts</div>
          </div>
          <ConditionalRendering condition={!notShowAddButton}>
            <div data-action={CONSTANT_CONTACT.EVENTS.ADD_NEW}>
              <ButtonShortcut
                  icon={faUserPlus}
                  label={'Contact'}
                  shortcut={KeyboardEventCodes.F7}
                  classNames={'hw-shortcut-button primary sm hw-button-border-color mr-3'}
              />
            </div>
          </ConditionalRendering>
        </div>
        <div className={'border-top-double'}>
          <ConditionalRendering condition={!contacts || contacts.length === 0}>
            <div className={'m-8 p-8'} style={{minWidth: '400px'}}>&nbsp;</div>
          </ConditionalRendering>
          <table className={'w-100'} data-action-root>
            <tbody>
              {contacts && contacts.map((contact : TContact,index : number) => {
                const id = contact.id ? contact.id : index
                return (
                  <tr key={id} className={`font-weight-300 border-bottom${index % 2 === 1 ? ' row-odd' : ' row-even'}`}>
                    <td style={{width: '30%'}}>
                      <div className={'d-flex flex-column'}>
                        <div className={'font-smaller-2 font-weight-600 letter-spacing mr-4 '}>{typesFn(contact.type)}</div>
                        <div className={'font-smaller-5 d-flex justify-content-start'}>&nbsp;{contact.description}&nbsp;</div>
                      </div>
                    </td>
                    <td>
                      <div className={'font-weight-300 font-smaller-2'}>{contact.value}&nbsp;</div>
                    </td>
                    <td style={{width: 50}}>
                      <div className={'d-flex justify-content-between align-items-center px-2'}>
                        <ConditionalRendering condition={!notShowEditButton}>
                          <div className={'px-1 button-effect '}
                                 data-action={CONSTANT_CONTACT.EVENTS.EDIT}
                                 data-action-id={id}
                          >
                            <FontAwesomeIcon className={'color-primary'} icon={faEdit}/>
                          </div>
                        </ConditionalRendering>
                        <ConditionalRendering condition={!notShowDeleteButton}>
                          <div className={'px-1 button-effect '}
                               data-action={CONSTANT_CONTACT.EVENTS.DELETE}
                               data-action-id={id}
                          >
                            <FontAwesomeIcon className={'color-danger'} icon={faTimes}/>
                          </div>
                        </ConditionalRendering>
                      </div>
                    </td>
                  </tr>
                )
              })
              }
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

ContactView.defaultProps = {
  notShowEditButton: false
}

export default ContactView
