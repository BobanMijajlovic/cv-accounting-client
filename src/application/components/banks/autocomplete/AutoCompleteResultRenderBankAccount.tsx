import React            from 'react'
import { TBankAccount } from '../../../../graphql/type_logic/types'

const AutoCompleteResultRenderBankAccount = ({data} : { data : TBankAccount }) => {

  const isDefined = React.useMemo(() => {
    return data && data.account !== undefined && data.bank !== undefined
  }, [data])

  return (
    <div className={'d-flex flex-row justify-content-between align-items-end p-2 border-bottom cursor-pointer color-primary hw-height-effect'}>
      <div className={'d-flex flex-column justify-content-start text-left'}>
        {isDefined ? <div>{data.bank?.bankName}</div> : <div>&nbsp;</div>}
        <small className={'d-flex flex-row justify-content-end'}>
          {isDefined ? <div>{data.account}</div> : <div>&nbsp;</div>}
        </small>
      </div>
    </div>
  )
}

export default AutoCompleteResultRenderBankAccount
