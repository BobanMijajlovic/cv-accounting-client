import {
  StyleSheet,
  Text,
  View
}                             from '@react-pdf/renderer'
import React                  from 'react'
import { formatPrice }        from '../../../../utils/Utils'
import { TCalculationItem }   from '../../../../../graphql/type_logic/types'
import _                      from 'lodash'
import { CONSTANT_WAREHOUSE } from '../../../../constants'

const styles = StyleSheet.create({
  root: {},
  title: {
    flexShrink: 1,
    textAlign: 'center',
    fontSize: 7,
    borderBottomStyle: 'solid',
    borderBottomWidth: 1,
    borderBottomColor: '#dddddd',
    padding: 2
  },
  columns: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'stretch',
    flex: 1,
    fontSize: 7,
  },
  oneDiv: {
    flex: 1,
    paddingTop: 2,
    borderRightStyle: 'dotted',
    borderRightWidth: 1,
    borderRightColor: '#dddddd',
    textAlign: 'center'
  }
})

export const RenderCalculationPriceDifferenceDataTHead = () => {
  return (
    <View>
      <View style={styles.title}><Text>Price difference</Text></View>
      <View style={styles.columns}>
        <Text style={{...styles.oneDiv, borderRightWidth: 0}}>price</Text>
        <View style={{...styles.oneDiv}}><Text>%</Text></View>
        <Text style={{...styles.oneDiv, borderRightWidth: 0}}>new</Text>
      </View>
    </View>
  )
}

/** vat td render */
const _RenderCalculationPriceDifferenceData = ({value,price,percent} : any) => {
  const styles = StyleSheet.create({
    root: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingLeft: 2,
      paddingRight: 2,
      flex: 1
    },
    price: {
      flex: 1,
      textAlign: 'left',
      fontSize: 6,
      width: '10%'
    },
    percent: {
      flex: 1,
      textAlign: 'center',
      fontSize: 5
    },
    finance: {
      flex: 1,
      textAlign: 'right',
      fontSize: 6,
    }
  })

  return (
    <View style={styles.root}>
      <View style={styles.price}>
        <Text style={{maxLines: 1, border: 0}}>{formatPrice(price)}</Text>
      </View>
      <View style={styles.percent}><Text style={{maxLines: 1}}>{formatPrice(percent)}%</Text></View>
      <View style={styles.finance}>
        <Text style={{maxLines: 1, border: 0}}>{formatPrice(value)}</Text>
      </View>
    </View>
  )
}

const PriceDifference = React.memo(_RenderCalculationPriceDifferenceData,
    (prevProps, nextProps) => {
      return (nextProps.percent === prevProps.percent) && (nextProps.value === prevProps.value) && (nextProps.price === prevProps.price)
    })

export const RenderPDFPriceDifferenceMP = ({model} : {model : TCalculationItem}) => {
  const price = _.round(_.divide(Number(model.financeFinalMP), Number(model.quantity)), 2)
  const percent = _.round(_.subtract(_.multiply(_.divide(price,Number(model?.item?.mp)), 100), 100), 2)

  if (!model.item?.mp) {
    return <></>
  }
  
  return <PriceDifference price={model.item?.mp} percent={percent} value={price}/>
}

export const RenderPDFPriceDifferenceVP = ({model} : {model : TCalculationItem}) => {
  const price = _.round(_.divide(Number(model.financeFinalVP), Number(model.quantity)), 2)
  const percent = _.round(_.subtract(_.multiply(_.divide(price,Number(model?.item?.vp)), 100), 100), 2)

  if (!model.item?.vp) {
    return <></>
  }
  return <PriceDifference price={model.item?.vp} percent={percent} value={price}/>
}

export const RenderCalculationPriceDifferenceData = ({value} : { value : any }) => {
  return value.warehouseType === CONSTANT_WAREHOUSE.TYPES.WHOLESALE ? <RenderPDFPriceDifferenceVP model={value} /> : <RenderPDFPriceDifferenceMP model={value} />
}