import { getUnit } from '../../../utils/Utils'
import React       from 'react'

const _RenderItemData = ({ value }: any) => {
  return (
    <div
            className={'d-flex justify-content-between flex-fill'}
    >
      <div className={'font-smaller-1'}>{value.shortName}</div>
      <div className={'d-flex justify-content-between align-items-center font-smaller-4'}>
        <div className={'pr-2'}>{getUnit(value.code)}</div>
        <div>{value.barCode}</div>
      </div>
    </div>
  )
}

export const RenderItemData = React.memo(_RenderItemData,
    (prevProps, nextProps) => {
      return (nextProps.value.barCode === prevProps.value.barCode) && (nextProps.value.shortName === prevProps.value.shortName) && (nextProps.value.code === prevProps.value.code)
    })