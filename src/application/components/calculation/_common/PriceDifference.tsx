import React              from 'react'
import {formatPrice}      from '../../../utils/Utils'
import {TCalculationItem} from '../../../../graphql/type_logic/types'
import _                  from 'lodash'

const _RenderPriceDifference = ({value} : any) => {
  return (
    <div className={'d-flex justify-content-between align-items-center flex-fill'}>
      <div className={'font-smaller-5'}>{value.percent}%</div>
      <div>{formatPrice(value.finance)}</div>
    </div>
  )
}

export const RenderPriceDifference = React.memo(_RenderPriceDifference,
    (prevProps, nextProps) => {
      return (nextProps.value.percent === prevProps.value.percent) && (nextProps.value.finance === prevProps.value.finance)
    })

const PriceDifference = ({percent, value, price} : any) => {

  return (
    <div className={'d-flex flex-row justify-content-between align-items-center'}>
      <div className={'flex-1 text-left font-smaller-4'}>
        {formatPrice(price)}
      </div>
      <div className={'font-smaller-5 text-center'}>
        <span>{formatPrice(+percent)}</span>
        <sup>%</sup>
      </div>
      <div className={'flex-1 text-right'}>
        {formatPrice(value)}
      </div>
    </div>

  )
}

export const PriceDifferenceVP = ({model} : { model : TCalculationItem }) => {
  const price = _.round(_.divide(Number(model.financeFinalVP), Number(model.quantity)), 2)
  const percent = _.round(_.subtract(_.multiply(_.divide(price,Number(model?.item?.vp)), 100), 100), 2)

  if (!model.item?.vp) {
    return <></>
  }
  return <PriceDifference value={price} percent={percent} price={model.item.vp}/>
}

export const PriceDifferenceMP = ({model} : { model : TCalculationItem }) => {
  const price = _.round(_.divide(Number(model.financeFinalMP), Number(model.quantity)), 2)
  const percent = _.round(_.subtract(_.multiply(_.divide(price,Number(model?.item?.mp)), 100), 100), 2)

  if (!model.item?.mp) {
    return <></>
  }
  return <PriceDifference value={price} percent={percent} price={model.item?.mp}/>
}
