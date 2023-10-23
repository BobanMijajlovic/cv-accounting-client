import React                     from 'react'
import {formatPrice}             from '../../utils/Utils'
import {DISCOUNT_SURCHARGE_TYPE} from '../../constants'

export const DiscountRender = ({value: discount, classNames} : any) => {

  const type = React.useMemo(() => discount && discount.type === DISCOUNT_SURCHARGE_TYPE.PERCENT, [discount])
  const dataToRender = React.useMemo(() => {
    if (!discount) {
      return formatPrice(0)
    }
    const val = discount.value
    if (Number(val) === 0) {
      return formatPrice(0)
    }
    return `${formatPrice(val)}`
  }, [discount,formatPrice])
  return (
    <div className={`relative ${classNames}`}>
      <span className={'pr-2'}>{dataToRender}</span>
      <sup className={'absolute'} style={{top: 5, right: 1}}>{type ? '%' : ''}</sup>
    </div>
  )
}

