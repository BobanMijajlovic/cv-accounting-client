import {
  StyleSheet,
  Text,
  View
}                         from '@react-pdf/renderer'
import React, { useMemo } from 'react'
import {
  formatPrice,
  formatQuantity,
  getUnit
}                         from '../../../../utils/Utils'

const styles = StyleSheet.create({
  root: {

  },
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
    fontSize: 7
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

export const RenderInvoiceDataTHead = () => {
  return (
    <View >
      <View style={styles.title}><Text>Invoice</Text></View>
      <View style={styles.columns}>
        <View style={styles.oneDiv}><Text>Qty</Text></View>
        <View style={styles.oneDiv}><Text>Price</Text></View>
        <View style={{...styles.oneDiv,borderRightWidth: 0}}><Text>Finance</Text></View>
      </View>
    </View>
  )
}

/** invoice td render */
const styleInvoiceData = StyleSheet.create({
  root: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignContent: 'stretch',
    justifyContent: 'center',
    flex:1,
  },
  oneDiv: {
    width: '33%',
    justifyContent: 'center',
    borderRightStyle: 'dotted',
    borderRightWidth: 1,
    paddingTop: 4,
    paddingRight: 2,
    borderRightColor: '#dddddd',
    textAlign: 'right'
  }
})

export const _RenderCalculationInvoiceData = ({value} : any) => {
  return (
    <View style={styleInvoiceData.root}>
      <View style={styleInvoiceData.oneDiv}><Text>{formatQuantity(value.quantity)}</Text></View>
      <View style={styleInvoiceData.oneDiv}><Text>{formatPrice(value.priceNoVat)}</Text></View>
      <View style={{...styleInvoiceData.oneDiv,borderRightWidth: 0}}><Text>{formatPrice(value.financeNoVat)}</Text></View>
    </View>
  )
}

export const RenderCalculationInvoiceData = React.memo(_RenderCalculationInvoiceData,
    (prevProps, nextProps) => {
      return (nextProps.value.quantity === prevProps.value.quantity) && (nextProps.value.financeNoVat === prevProps.value.financeNoVat) && (nextProps.value.priceNoVat === prevProps.value.priceNoVat)
    })
/** invoice td render */

/** item data td render */
const _RenderCalculationItemData = ({data, value, index, styles: _styles = {}} : any) => {
  const styles = StyleSheet.create({
    root: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingLeft: 2,
      paddingRight: 2,
      flex: 1
    },
    name: {
      flex: 3,
      textAlign: 'left',
      fontSize: 5,
    },
    unit: {
      width: '10%',
      textAlign: 'right',
      fontSize: 6
    }
  })

  return (
    <View style={styles.root}>
      <View style={styles.name}><Text style={{textOverflow: 'ellipsis', maxLines: 1,}}>{value.shortName.trim()}</Text></View>
      <View style={styles.unit}>
        <Text style={{maxLines: 1, border: 0 }}>{getUnit(value.uom)}</Text>
      </View>
    </View>
  )
}

export const RenderCalculationItemData = React.memo(_RenderCalculationItemData,
    (prevProps, nextProps) => {
      return (nextProps.value.shortName === prevProps.value.shortName) && (nextProps.value.uom === prevProps.value.uom)
    })

/** item data td render */

/** calculation additional expense td render */

const _RenderCalculationAdditionalExpenseName = ({data, value, index, styles: _styles = {}} : any) => {
  const styles = StyleSheet.create({
    root: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingLeft: 2,
      paddingRight: 2,
      flex: 1
    },
    name: {
      flex: 3,
      textAlign: 'left',
      fontSize: 5,
    },
    invoiceNumber: {
      width: '10%',
      textAlign: 'right',
      fontSize: 6
    },
    invTitle: {
      fontSize: 5,
      opacity: 0.7
    }
  })
  
  const name = useMemo(() => value.customer.shortName ? value.customer.shortName.trim() : value.customer.fullName.trim() ,[value.customer])

  return (
    <View style={styles.root}>
      <View style={styles.name}><Text style={{textOverflow: 'ellipsis', maxLines: 1,}}>{name}</Text></View>
      <View style={styles.invoiceNumber}>
        <View style={styles.invTitle}><Text></Text></View>
        <View><Text style={{maxLines: 1, border: 0 }}>{`Inv. #: ${value.invoiceNumber}`}</Text></View>
      </View>
    </View>
  )
}

export const RenderCalculationAdditionalExpenseName = React.memo(_RenderCalculationAdditionalExpenseName,
    (prevProps, nextProps) => {
      return (nextProps.value.customer === prevProps.value.customer) && (nextProps.value.invoiceNumber === prevProps.value.invoiceNumber)
    })
