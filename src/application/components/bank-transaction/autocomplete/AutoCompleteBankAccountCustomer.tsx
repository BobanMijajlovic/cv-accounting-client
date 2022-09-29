import React, { useMemo } from 'react'
import { TBankAccount }   from '../../../../graphql/type_logic/types'

const AutoCompleteBankAccountCustomer = ({data}: { data: TBankAccount }) => {
  const customerName = useMemo(() => data.customer && data.customer?.shortName && data.customer?.shortName.length !== 0 ? data.customer?.shortName : data.customer?.fullName, [data])
  return (
    <div className={'d-flex flex-column  p-1 border-bottom cursor-pointer color-primary hw-height-effect'}>
      <div className={'d-flex flex-row justify-content-between align-item-top text-left font-smaller-3 pb-1'}>
        <div className={'flex-2 px-1'}>{customerName}&nbsp;</div>
        <div className={'max-width-40'}><small>{data.customer?.taxNumber}</small></div>
      </div>
      <div className={'d-flex flex-row justify-content-between align-items-end font-smaller-2'}>
        <div>{data.account}&nbsp;</div>
        {/* <small>{}</small>*/}
      </div>
    </div>
  )
}

export default AutoCompleteBankAccountCustomer
