import React         from 'react'
import {
  DISCOUNT_SURCHARGE,
  DISCOUNT_SURCHARGE_TYPE
}                    from '../../../../constants'
import {
  StyleSheet,
  Text,
  View
}                    from '@react-pdf/renderer'
import {formatPrice} from '../../../../utils/Utils'

export const DiscountRender = ({value: discount} : any) => {

  const type = React.useMemo(() => discount && discount.type === DISCOUNT_SURCHARGE_TYPE.PERCENT, [discount])
  const dataToRender = React.useMemo(() => {
    if (!discount) {
      return ''
    }
    const val = discount.value
    if (discount.node === DISCOUNT_SURCHARGE.DISCOUNT) {
      if (discount.type === DISCOUNT_SURCHARGE_TYPE.PERCENT) {
        return `${formatPrice(val)}`
      }
      return `${formatPrice(val)}`
    } else {
      if (discount.type === DISCOUNT_SURCHARGE_TYPE.PERCENT) {
        return formatPrice(val)
      }
      return formatPrice(val)
    }
  }, [discount])
  const styles = StyleSheet.create({
    root: {
      display: 'flex',
      flexDirection: 'row',
      alignContent: 'center',
      width: '100%',
      fontSize: 6,
    },
    data: {
      flex: 2,
      paddingTop: 4,
      textAlign: 'right'
    }
  })
  return (
    <View style={styles.root}>
      <Text style={styles.data}>{dataToRender}&nbsp;{type ? '%' : ''}</Text>
    </View>
  )
}