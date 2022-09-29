import React            from 'react'
import EmptyTag         from '../../../../components/Util/EmptyTag'
import { TBankAccount } from '../../../../graphql/type_logic/types'

export interface IBankAccountViewBasicProps {
  bankAccount : TBankAccount
  error ?: boolean | string
  namePlaceholder ?: string
  classNames ?: string
}

const BankAccountViewShort = ({ bankAccount, error, namePlaceholder, classNames } : IBankAccountViewBasicProps) => {
  return (
    <div className={`text-align-left relative px-2 w-100${classNames ? ` ${classNames}` : ''}`}>
      <div className={'d-flex  flex-column justify-content-center text-align-left'}>
        <div className={'font-bold text-upper font-smaller-2'}>
          <EmptyTag model={bankAccount} field={bankAccount?.customer?.shortName ? 'customer.shortName' : 'customer.fullName'} placeholder={'Customer name'}/>
        </div>
        <div className={'d-flex flex-row align-items-center pt-2 font-smaller-2 text-upper'}>
          <sub className={'opacity-6 px-1'}>Account # &nbsp;:</sub>
          <div className={' '}><EmptyTag model={bankAccount} field={'account'} placeholder={'#### #### #### ####'}/>
          </div>
        </div>
      </div>
      {error && <div style={{bottom: -10}} className={'error position-absolute font-smaller-2'}> {typeof error === 'string' ? error : 'Supplier is required field'}.</div>}
    </div>
  )
}

export default BankAccountViewShort
