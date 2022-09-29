import React                     from 'react'
import {DISCOUNT_SURCHARGE_TYPE} from '../../../constants'
import {formatPrice}             from '../../../utils/Utils'
import _                         from 'lodash'

export const InvoiceDiscountRender =  ({value: disc, classNames,additionalData} : any) => {
  const discountDefault = React.useMemo(() => disc && disc.discountDefault, [disc])
  const discount = React.useMemo(() => _.omit(disc,['discountDefault']),[disc])
  const type = React.useMemo(() => discount && discount.type === DISCOUNT_SURCHARGE_TYPE.PERCENT, [discount])
  const _discount = React.useMemo(() => {
    if (!discount || _.isEmpty(discount)) {
      return 0
    }
    const val = discount.value
    if (Number(val) === 0) {
      return formatPrice(0)
    }
    return `${formatPrice(val)}`
  }, [discount,formatPrice])

  const dataDiscountDefault = React.useMemo(() => {
    if (!discountDefault) {
      return void(0)
    }
    const val = discountDefault.value
    if (Number(val) === 0) {
      return formatPrice(0)
    }
    return `${formatPrice(val)}`
  }, [discountDefault])
  
  const footerDiscount = React.useMemo(() => {
    if (!additionalData.discount || additionalData.discount.length === 0) {
      return void(0)
    }
    return formatPrice(additionalData.discount[0].percent)
  },[additionalData])
  
  const dataToRender = React.useMemo(() => {
    return dataDiscountDefault  ? `${dataDiscountDefault}+${formatPrice(_discount)}${footerDiscount ? `+${footerDiscount}` : ''}` : `${formatPrice(_discount)}${footerDiscount ? `+${footerDiscount}` : ''}`
  },[_discount, dataDiscountDefault, footerDiscount])
  
  return (
    <div className={`relative ${classNames}`}>
      <span className={'pr-3'}>{dataToRender}</span>
      <sup className={'absolute'} style={{top: 5, right: 1}}>{type ? '%' : ''}</sup>
    </div>
  )
}
