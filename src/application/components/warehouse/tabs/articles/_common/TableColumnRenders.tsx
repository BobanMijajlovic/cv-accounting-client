import React from 'react'

export const RenderItemTableColumn = ({value} : any) => {
  return (
    <div
            className={'d-flex justify-content-between align-items-center flex-fill'}
    >
      <div className={'font-smaller-2'}>{value.shortName}</div>
      <div className={'d-flex flex-column'}>
        <div className={'font-smaller-5'}>{value.barCode}</div>
        <div className={'font-smaller-5'}>{value.code}</div>
      </div>
    </div>
  )
}

