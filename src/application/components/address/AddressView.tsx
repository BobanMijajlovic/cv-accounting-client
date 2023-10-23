import React from 'react'

import {faTimes}            from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon}    from '@fortawesome/react-fontawesome'
import {faEdit}             from '@fortawesome/free-regular-svg-icons'
import {faHome}             from '@fortawesome/free-solid-svg-icons/faHome'
import {TAddress}           from '../../../graphql/type_logic/types'
import {KeyboardEventCodes} from '../../../components/hooks/useExternalKeybaord'
import ButtonShortcut       from '../../../components/Button/ButtonShortcut'
import ConditionalRendering from '../../../components/Util/ConditionalRender'
import {CONSTANT_ADDRESS}   from '../../constants'

export interface IAddressShowProps {
  addresses ?: TAddress[]
  notShowAddButton ?: boolean
  notShowEditButton ?: boolean
  notShowDeleteButton ?: boolean
  classNames ?: string
}

const AddressView = ({addresses, notShowAddButton,notShowEditButton,notShowDeleteButton, classNames} : IAddressShowProps) => {

  const typesFn = React.useCallback((value : string) => {
    const entry = CONSTANT_ADDRESS.TYPES_SELECT.find(x => x.value === value)
    return entry ? entry.label : ''
  }, [])

  return (
    <div className={`m-2 text-upper letter-spacing${classNames ? ` ${classNames}` : ''}`}>
      <div className={'d-flex flex-column mb-2'}>
        <div className={'d-flex justify-content-between mb-1 color-primary'}>
          <div className={'d-flex font-smaller-2 align-items-center '}>
            <div className={'pr-2'}><FontAwesomeIcon icon={faHome}/></div>
            <div>ADDRESSES</div>
          </div>
          <ConditionalRendering condition={!notShowAddButton}>
            <div data-action={CONSTANT_ADDRESS.EVENTS.ADD_NEW}>
              <ButtonShortcut
                  icon={faHome}
                  label={'Add'}
                  shortcut={KeyboardEventCodes.F6}
                  classNames={'hw-shortcut-button primary sm hw-button-border-color mr-2'}
              />
            </div>
          </ConditionalRendering>
        </div>
        <div className={'border-top-double'}>
          <ConditionalRendering condition={!addresses || addresses.length === 0}>
            <div className={'m-8 p-8'} style={{minWidth: '300px'}}>&nbsp;</div>
          </ConditionalRendering>
          <table data-action-root className={'w-100'}>
            <tbody>
              {addresses && addresses.map((address : TAddress, index : number) => {
                const id = address.id ? address.id : index
                return (
                  <tr key={id} className={`font-weight-300 border-bottom${index % 2 === 1 ? ' row-odd' : ' row-even'}`}>
                    <td>
                      <div className={'py-1 d-flex flex-column'}>
                        <div className={'px-1 font-smaller-2 font-weight-600'}>{typesFn(`${address.type}`)}</div>
                        <div className={`font-smaller-5 d-flex font-weight-300${(address.description as string).length > 40 ? ' flex-wrap' : ''}`}>&nbsp;{address.description}&nbsp;</div>
                      </div>
                    </td>
                    <td className={`px-1 font-smaller-3 align-items-center${(address.description as string).length > 40 ? ' flex-wrap' : ''}`}>{address.street}</td>
                    <td className={'px-1 font-smaller-1'}>{address.zipCode}&nbsp;{address.city}</td>
                    <td >
                      <div className={'d-flex justify-content-between align-items-center px-2'}>
                        <div className={'px-1 font-smaller-3'}>
                          {address.state}
                        </div>
                        <div style={{maxWidth: 50}} className={'d-flex justify-content-between align-items-center'}>
                          <ConditionalRendering condition={!notShowEditButton}>
                            <div className={'px-1 button-effect '}
                                 data-action={CONSTANT_ADDRESS.EVENTS.EDIT}
                                 data-action-id={id}
                            >
                              <FontAwesomeIcon className={'color-primary'} icon={faEdit}/>
                            </div>
                          </ConditionalRendering>
                          <ConditionalRendering condition={!notShowDeleteButton}>
                            <div className={'px-1 button-effect'}
                                 data-action={CONSTANT_ADDRESS.EVENTS.DELETE}
                                 data-action-id={id}
                            >
                              <FontAwesomeIcon className={'color-danger'} icon={faTimes}/>
                            </div>
                          </ConditionalRendering>
                        </div>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

AddressView.defaultProps = {
  address: [],
  notShowEditButton: false
}

export default AddressView
