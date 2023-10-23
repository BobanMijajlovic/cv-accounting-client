import React                     from 'react'
import { TBankAccount }          from '../../../../../graphql/type_logic/types'
import { useBanks }              from '../../../../hooks/useBanks'
import { FontAwesomeIcon }       from '@fortawesome/react-fontawesome'
import {
  faTimes,
  faUniversity
}                                from '@fortawesome/free-solid-svg-icons'
import { CONSTANT_BANK_ACCOUNT } from '../../../../constants'
import ButtonShortcut            from '../../../../../components/Button/ButtonShortcut'
import ConditionalRendering      from '../../../../../components/Util/ConditionalRender'
import { faEdit }                from '@fortawesome/free-regular-svg-icons'

const ClientBanks = ({banks}: { banks?: TBankAccount[] }) => {

  const {getBankByCode} = useBanks()

  return (
    <div className={'d-flex flex-column mt-2 text-upper letter-spacing pb-1'}>
      <div className={'d-flex justify-content-between mb-1 color-primary'}>
        <div className={'d-flex font-smaller-4 align-items-center '}>
          <div className={'pr-2'}><FontAwesomeIcon icon={faUniversity}/></div>
          <div>BANK ACCOUNTS</div>
        </div>
        <div data-action={CONSTANT_BANK_ACCOUNT.EVENTS.ADD_NEW}>
          <ButtonShortcut
                        icon={faUniversity}
                        label={'Add'}
                        classNames={'hw-shortcut-button primary sm hw-button-border-color'}
          />
        </div>
      </div>
      <div className={'border-top-double'}>
        <ConditionalRendering condition={!banks || banks.length === 0}>
          <div className={'color-primary opacity-6 font-smaller-4 px-1'} style={{minWidth:'300px'}}>No banks added!</div>
        </ConditionalRendering>
        <ConditionalRendering condition={!!(banks && banks.length !== 0)}>
          <table data-action-root className={'w-100'}>
            <tbody>
              {banks && banks.map((bankAcc: TBankAccount, index: number) => {
                const id = bankAcc.id ? bankAcc.id : index
                const bank = getBankByCode(Number(bankAcc.bankId))
                return (
                  <tr key={id} className={'font-weight-300'}>
                    <td className={'px-1 font-weight-600'}>{bank?.bankName}</td>
                    <td className={'text-cenet'}>{bankAcc.account}</td>

                    <td style={{width:50}}>
                      <div className={'d-flex justify-content-between align-items-center px-2'}>
                        <div className={'px-1 button-effect'}
                                                 data-action={CONSTANT_BANK_ACCOUNT.EVENTS.EDIT}
                                                 data-action-id={id}
                        >
                          <FontAwesomeIcon className={'color-primary'} icon={faEdit}/>
                        </div>
                        <div className={'px-1 button-effect'}
                                                 data-action={CONSTANT_BANK_ACCOUNT.EVENTS.DELETE}
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
  )

}

export default ClientBanks