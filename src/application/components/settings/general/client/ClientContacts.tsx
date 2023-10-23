import React                from 'react'
import { TContact }         from '../../../../../graphql/type_logic/types'
import { CONSTANT_CONTACT } from '../../../../constants'
import { FontAwesomeIcon }  from '@fortawesome/react-fontawesome'
import {
  faTimes,
  faUser,
  faUserPlus
}                           from '@fortawesome/free-solid-svg-icons'
import ButtonShortcut       from '../../../../../components/Button/ButtonShortcut'
import ConditionalRendering from '../../../../../components/Util/ConditionalRender'
import { faEdit }           from '@fortawesome/free-regular-svg-icons'

const ClientContacts = ({contacts}: {contacts?: TContact[]}) => {
  const typesFn = React.useCallback((value ?: string) => {
    const entry = CONSTANT_CONTACT.TYPES_SELECT.find(x => x.value === value)
    return entry ? entry.label : ''
  }, [])

  return (

    <>
      <div className={'mt-2 text-upper letter-spacing pb-1'}>

        <div className={'d-flex justify-content-between mb-1 color-primary'}>
          <div className={'d-flex font-smaller-3 align-items-center '}>
            <div className={'pr-2'}><FontAwesomeIcon icon={faUser}/></div>
            <div>Contacts</div>
          </div>
          <div data-action={CONSTANT_CONTACT.EVENTS.ADD_NEW}>
            <ButtonShortcut
                            icon={faUserPlus}
                            label={'Contact'}
                            classNames={'hw-shortcut-button primary sm hw-button-border-color'}
            />
          </div>
        </div>
        <div className={'border-top-double'}>
          <ConditionalRendering condition={!contacts || contacts.length === 0}>
            <div className={'color-primary opacity-6 font-smaller-4 px-1'} style={{minWidth: '300px'}}>No contacts added!</div>
          </ConditionalRendering>
          <ConditionalRendering condition={!!(contacts && contacts.length !== 0)}>
            <table className={'w-100'} data-action-root>
              <tbody>
                {contacts && contacts.map((contact : TContact,index : number) => {
                  const id = contact.id ? contact.id : index
                  return (
                    <tr key={id} className={'font-weight-300'}>
                      <td style={{width: '30%'}}>
                        <div className={'d-flex flex-column px-1'}>
                          <div className={'font-smaller-3 font-weight-600 letter-spacing mr-4 '}>{typesFn(contact.type)}</div>
                          <div className={'font-smaller-5 d-flex justify-content-start'}>&nbsp;{contact.description}&nbsp;</div>
                        </div>
                      </td>
                      <td>
                        <div className={'font-weight-300'}>{contact.value}&nbsp;</div>
                      </td>
                      <td style={{width:50}}>
                        <div className={'d-flex justify-content-between align-items-center px-2'}>
                          <div className={'px-1 button-effect '}
                               data-action={CONSTANT_CONTACT.EVENTS.EDIT}
                               data-action-id={id}
                          >
                            <FontAwesomeIcon className={'color-primary'} icon={faEdit}/>
                          </div>
                          <div className={'px-1 button-effect '}
                               data-action={CONSTANT_CONTACT.EVENTS.DELETE}
                               data-action-id={id}
                          >
                            <FontAwesomeIcon className={'color-danger'} icon={faTimes}/>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )
                })
                }
              </tbody>
            </table>
          </ConditionalRendering>
        </div>
      </div>
    </>
  )
}

export default ClientContacts