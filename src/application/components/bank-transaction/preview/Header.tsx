import React                     from 'react'
import {TBankHeaderTransactions} from '../../../../graphql/type_logic/types'
import EmptyTag                  from '../../../../components/Util/EmptyTag'
import ComponentRender           from '../../../../components/Util/ComponentRender'
import {formatDateLong}          from '../../../utils/Utils'

interface IBankTransactionHeaderPreviewProps {
  bankHeaderTransaction : TBankHeaderTransactions
}

const HeaderPreview = ({bankHeaderTransaction} : IBankTransactionHeaderPreviewProps) => {
  
  const {bankAccount} = bankHeaderTransaction
  
  return (
    <div className={'d-flex flex-row align-items-center justify-content-between px-2 mb-1'}>
      <div className={'d-flex  flex-column justify-content-center text-align-left'}>
        <div className={'font-bold text-upper font-smaller-2'}>
          <EmptyTag model={bankAccount} field={'bankName'} placeholder={'Bank name'}/>
        </div>
        <div className={'d-flex flex-row align-items-center pt-2 font-smaller-2 text-upper'}>
          <sub className={'opacity-6 px-1'}>Account # &nbsp;:</sub>
          <div className={' '}><EmptyTag model={bankAccount} field={'account'} placeholder={'#### #### #### ####'}/>
          </div>
        </div>
      </div>
      <ComponentRender label={'date'} value={bankHeaderTransaction.dateProcessed} format={formatDateLong} labelClass={'text-upper opacity-6 font-weight-normal'} classNames={'pr-4 font-weight-bold'}/>
      <ComponentRender label={'Document ID'} value={bankHeaderTransaction.documentId} labelClass={'text-upper opacity-6 font-weight-normal'} classNames={'pr-4 font-weight-bold'}/>
      <ComponentRender label={'Description'} value={bankHeaderTransaction.description} labelClass={'text-upper opacity-6 font-weight-normal'} classNames={'pr-4 font-weight-bold'}/>
    </div>
  )
}

export default HeaderPreview