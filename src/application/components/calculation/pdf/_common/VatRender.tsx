import React                            from 'react'
import {
  StyleSheet,
  Text,
  View
}                                       from '@react-pdf/renderer'
import { formatPrice }                  from '../../../../utils/Utils'
import { TABLE_INDEX_SUMMARIZE_COLUMN } from '../../../../../components/Table'
import _                                from 'lodash'

const styles = StyleSheet.create( {
  root : {},
  title : {
    flexShrink : 1,
    textAlign : 'center',
    fontSize : 7,
    borderBottomStyle : 'solid',
    borderBottomWidth : 1,
    borderBottomColor : '#dddddd',
    padding : 2
  },
  columns : {
    flexDirection : 'row',
    justifyContent : 'space-between',
    alignItems : 'stretch',
    flex : 1,
    fontSize : 7
  },
  oneDiv : {
    flex : 1,
    paddingTop : 2,
    borderRightStyle : 'dotted',
    borderRightWidth : 1,
    borderRightColor : '#dddddd',
    textAlign : 'center'
  }
} )

export const RenderVatDataTHead = () => {
  return (
    <View>
      <View style={ styles.title }><Text>TAX</Text></View>
      <View style={ styles.columns }>
        <View style={ { ...styles.oneDiv, width : '10%' } }><Text>%</Text></View>
        <Text style={ { ...styles.oneDiv, borderRightWidth : 0, flex : 2 } }>Finance</Text>
      </View>
    </View>
  )
}

/** vat td render */
const _RenderCalculationVatData = ( { data, value, index, items, styles : _styles = {}, additionalData } : any ) => {
  const styles = StyleSheet.create( {
    root : {
      flexDirection : 'row',
      justifyContent : 'space-between',
      alignItems : 'center',
      paddingLeft : 2,
      paddingRight : 2,
      flex : 1
    },
    tax : {
      width : '25%',
      textAlign : 'left',
      fontSize : 5
    },
    finance : {
      flex : 3,
      textAlign : 'right'
    }
  } )

  const isSummarize = index === TABLE_INDEX_SUMMARIZE_COLUMN
  const sumTotal = isSummarize ? items.reduce( ( acc : number, x : any ) => _.add( acc, x.taxFinance ), 0 ) : 0

  return (
    <View style={ styles.root }>
      <View style={ styles.tax }><Text style={ { maxLines : 1 } }>{ isSummarize ? '' : value.taxPercent }{ isSummarize ? '' : '%' }</Text></View>
      <View style={ styles.finance }>
        <Text style={ { maxLines : 1, border : 0 } }>{ formatPrice( isSummarize ? sumTotal : value.taxFinance ) }</Text>
      </View>
    </View>
  )
}

export const RenderCalculationVatData = React.memo( _RenderCalculationVatData,
    ( prevProps, nextProps ) => {
      return ( nextProps.value.taxValue === prevProps.value.taxValue ) && ( nextProps.value.taxFinance === prevProps.value.taxFinance )
    } )
