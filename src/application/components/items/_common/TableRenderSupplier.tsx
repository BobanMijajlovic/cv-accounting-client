import React from 'react'

const TableRenderSupplier = ({value, model, index, additionalData}: { value: any, model: any, index: number, additionalData: any }) => {

  const name = React.useMemo(() => value.shortName || value.shortName.length !== 0 ? value.shortName : value.fullName ,[value])

  return (
    <div className={'d-flex flex-row justify-content-between align-items-center'}>
      <div> { name } </div>
      <div> { value.taxNumber } </div>
    </div>
  )
}

export default TableRenderSupplier