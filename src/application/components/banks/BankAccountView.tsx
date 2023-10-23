import React                     from 'react'
import { FontAwesomeIcon }       from '@fortawesome/react-fontawesome'
import { CONSTANT_BANK_ACCOUNT } from '../../constants'
import { TBankAccount }          from '../../../graphql/type_logic/types'
import { faEdit }                from '@fortawesome/free-regular-svg-icons'
import {
  faTimes,
  faUniversity
}                                from '@fortawesome/free-solid-svg-icons'
import { KeyboardEventCodes }    from '../../../components/hooks/useExternalKeybaord'
import ButtonShortcut            from '../../../components/Button/ButtonShortcut'
import ConditionalRendering from '../../../components/Util/ConditionalRender'
import { useBanks }         from '../../hooks/useBanks'

interface IBankAccountViewProps {
  banks ?: TBankAccount[]
  notShowAddButton ?: boolean
  notShowEditButton ?: boolean
  notShowDeleteButton ?: boolean
  classNames ?: string
}

const BankAccountView = ({banks, notShowAddButton, notShowEditButton, notShowDeleteButton, classNames} : IBankAccountViewProps) => {
  
  const {getBankByCode} = useBanks()
  
  return (
    <div className={`d-flex flex-column mb-2 m-2 text-upper letter-spacing${classNames ? ` ${classNames}` : ''}`}>
      
      <div className={'d-flex justify-content-between mb-1 color-primary'}>
        <div className={'d-flex font-smaller-2 align-items-center '}>
          <div className={'pr-2'}><FontAwesomeIcon icon={faUniversity}/></div>
          <div>BANK ACCOUNTS</div>
        </div>
        <ConditionalRendering condition={!notShowAddButton}>
          <div data-action={CONSTANT_BANK_ACCOUNT.EVENTS.ADD_NEW}>
            <ButtonShortcut 
                icon={faUniversity}
                label={'Add'}
                shortcut={KeyboardEventCodes.F8}
                classNames={'hw-shortcut-button primary sm hw-button-border-color mr-2'}
            />
          </div>
        </ConditionalRendering>
      </div>
      <div className={'border-top-double'}>
        <ConditionalRendering condition={!banks || banks.length === 0}>
          <div className={'m-8 p-8'} style={{minWidth: '300px'}}>&nbsp;</div>
        </ConditionalRendering>
        <table data-action-root className={'w-100'}>
          <tbody>
            {banks && banks.map((bankAcc : TBankAccount, index : number) => {
              const id = bankAcc.id ? bankAcc.id : index
              const bank = getBankByCode(Number(bankAcc.bankId))
              return (
                <tr key={id} className={`font-weight-300 border-bottom ${index % 2 === 1 ? ' row-odd' : ' row-even'}`}>
                  <td>
                    <div className={'px-1 py-2 font-smaller-2 font-weight-600 text-left'}>{bank?.bankName}</div>
                  </td>
                  <td>
                    <div>{bankAcc.account}</div>
                  </td>
                  <td style={{width: 50}}>
                    <div className={'d-flex justify-content-between align-items-center px-2'}>
                      <ConditionalRendering condition={!notShowEditButton}>
                        <div className={'px-1 button-effect'}
                                                 data-action={CONSTANT_BANK_ACCOUNT.EVENTS.EDIT}
                                                 data-action-id={id}
                        >
                          <FontAwesomeIcon className={'color-primary'} icon={faEdit}/>
                        </div>
                      </ConditionalRendering>
                      <ConditionalRendering condition={!notShowDeleteButton}>
                        <div className={'px-1 button-effect'}
                                             data-action={CONSTANT_BANK_ACCOUNT.EVENTS.DELETE}
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
  )
}

BankAccountView.defaultProps = {
  notShowEditButton: false
}

export default BankAccountView
