import React     from 'react'
import {
  formatPrice
} from '../../../../../utils/Utils'

const _RenderCalculationExpenseFinance = ({value} : any) => {
  return (
    <div className={'d-flex justify-content-between flex-fill'}>
      <div className={'d-flex align-items-end font-smaller-5'}>{`${formatPrice(value.percent)} %`}</div>
      <div className={'font-smaller-1'}>{formatPrice(value.finance)}</div>
    </div>
  )
}

export const RenderCalculationExpenseFinance = React.memo(_RenderCalculationExpenseFinance,
    (prevProps, nextProps) => {
      return (nextProps.value.percent === prevProps.value.percent) && (nextProps.value.finance === prevProps.value.finance)
    })
