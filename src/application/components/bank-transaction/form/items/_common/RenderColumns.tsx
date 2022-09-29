import React from 'react'

export const RenderBankTransactionOrderCountsColumn = ({value,index,model,additionalData} : any) => {
    
  const { inCount, outCount } = value
    
  return (
    <div className={'d-flex justify-content-between align-items-center flex-fill text-right'}>
      <div className={'flex-1'}>{inCount}</div>
      <div className={'flex-1'}>{outCount}</div>
    </div>  
  )
}