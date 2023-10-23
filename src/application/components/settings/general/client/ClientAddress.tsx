import React                from 'react'
import { TAddress }         from '../../../../../graphql/type_logic/types'
import {
  CONSTANT_ADDRESS,
  CONSTANT_CONTACT
}                           from '../../../../constants'
import { FontAwesomeIcon }  from '@fortawesome/react-fontawesome'
import { faHome }           from '@fortawesome/free-solid-svg-icons/faHome'
import ButtonShortcut       from '../../../../../components/Button/ButtonShortcut'
import ConditionalRendering from '../../../../../components/Util/ConditionalRender'
import { faEdit }           from '@fortawesome/free-regular-svg-icons'
import { faTimes }          from '@fortawesome/free-solid-svg-icons'

const ClientAddress = ({addresses}: {addresses?: TAddress[]}) => {

  const typesFn = React.useCallback((value : string) => {
    const entry = CONSTANT_ADDRESS.TYPES_SELECT.find(x => x.value === value)
    return entry ? entry.label : ''
  }, [])

  return (
    <div className={'d-flex flex-column mt-2 pb-1'}>
      <div className={'d-flex justify-content-between mb-1 color-primary'}>
        <div className={'d-flex font-smaller-3 align-items-center '}>
          <div className={'pr-2'}><FontAwesomeIcon icon={faHome}/></div>
          <div>ADDRESSES</div>
        </div>
        <div data-action={CONSTANT_CONTACT.EVENTS.ADD_NEW}>
          <ButtonShortcut
                        icon={faHome}
                        label={'Address'}
                        classNames={'hw-shortcut-button primary sm hw-button-border-color'}
          />
        </div>
      </div>
      <div className={'border-top-double'}>
        <ConditionalRendering condition={!addresses || addresses.length === 0}>
          <div className={'color-primary opacity-6 font-smaller-4 px-1'} style={{minWidth: '300px'}}>No addresses added!</div>
        </ConditionalRendering>

        <ConditionalRendering condition={!!(addresses && addresses.length !== 0)}>
          <table data-action-root className={'w-100'}>
            <tbody>
              {
                addresses && addresses.map((address: TAddress, index: number) => {
                  const id = address.id ? address.id : index
                  return (
                    <tr key={id} className={'font-weight-300'}>
                      <td>
                        <div className={'d-flex flex-column'}>
                          <div className={'px-1 font-weight-600'}>{typesFn(`${address.type}`)}</div>
                        </div>
                      </td>
                      <td className={`px-1 align-items-center${(address.description as string).length > 40 ? ' flex-wrap' : ''}`}>{address.street}</td>
                      <td className={'px-1'}>{address.zipCode}&nbsp;{address.city}</td>
                      <td >
                        <div className={'d-flex justify-content-between align-items-center px-2'}>
                          <div className={'px-1'}>
                            {address.state}
                          </div>
                          <div style={{maxWidth: 50}} className={'d-flex justify-content-between align-items-center'}>
                            <div
                                                        className={'px-1 button-effect '}
                                                        data-action={CONSTANT_ADDRESS.EVENTS.EDIT}
                                                        data-action-id={id}
                            >
                              <FontAwesomeIcon className={'color-primary'} icon={faEdit}/>
                            </div>
                            <div
                                                        className={'px-1 button-effect'}
                                                        data-action={CONSTANT_ADDRESS.EVENTS.DELETE}
                                                        data-action-id={id}
                            >
                              <FontAwesomeIcon className={'color-danger'} icon={faTimes}/>
                            </div>
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
  )
}

export default ClientAddress