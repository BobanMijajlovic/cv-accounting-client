import React from 'react'

export const TableRenderDocument = ({value, model, index, additionalData}: { value: any, model: any, index: number, additionalData: any }) => {

  return (
    <div
            data-action={'action-show-document'}
            data-action-id={value.id}
    >
      {value.number}
    </div>
  )
}