import React                     from 'react'
import {DISCOUNT_SURCHARGE_TYPE} from '../../../../constants'
import {
  StyleSheet,
  Text,
  View
}                                from '@react-pdf/renderer'
import {formatPrice}             from '../../../../utils/Utils'
import _                         from 'lodash'

export const InvoiceDiscountRender = ({value:disc} : any) => {
  const discountDefault = React.useMemo(() => disc && disc.discountDefault, [disc])
  const _invDiscount = React.useMemo(() => disc && disc.footerDiscount,[disc])
  const discount = React.useMemo(() => _.omit(disc,['discountDefault']),[disc])
  const type = React.useMemo(() => discount && discount.type === DISCOUNT_SURCHARGE_TYPE.PERCENT, [discount])
  const _discount = React.useMemo(() => {
    if (!discount || _.isEmpty(discount) || !discount.value) {
      return formatPrice(0)
    }
    const val = discount.value
    if (Number(val) === 0) {
      return formatPrice(0)
    }
    return `${formatPrice(val)}`
  }, [discount])

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
    if (!_invDiscount || _invDiscount.value === 0) {
      return void(0)
    }
    return formatPrice(_invDiscount.value)
  },[_invDiscount])

  const dataToRender = React.useMemo(() => {
    return dataDiscountDefault  ? `${dataDiscountDefault}+${formatPrice(_discount)}${footerDiscount ? `+${footerDiscount}` : ''}` : `${formatPrice(_discount)}${footerDiscount ? `+${footerDiscount}` : ''}`
  },[_discount, dataDiscountDefault,footerDiscount])

  const styles = StyleSheet.create({
    root: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      width: '100%',
      fontSize: 6,
      flex: 1
    },
    data: {
      flex: 2,
      paddingTop: 0,
      textAlign: 'right'
    }
  })
  return (
    <View style={styles.root}>
      <Text style={styles.data}>{dataToRender}&nbsp;{type ? '' : ''}</Text>
    </View>
  )
}