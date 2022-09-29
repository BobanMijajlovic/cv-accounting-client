import React            from 'react'
import {
  StyleSheet,
  Text,
  View
}                       from '@react-pdf/renderer'
import {
  HEADER,
  IPdfTableProps,
  TABLE,
  TBODY,
  TRD
}                       from '../../../../../components/Pdf/Pdf'
import _                from 'lodash'
import {
  formatDate,
  formatPrice
}                       from '../../../../utils/Utils'
import { FORMAT_DATES } from '../../../../constants'

const SummaryTable = ( { tableData } : { tableData : IPdfTableProps } ) => {

  const { data = [], columns } = tableData

  const _styles = StyleSheet.create( {
    root : {
      flexDirection : 'row',
      justifyContent : 'flex-start',
      alignItems : 'center',
      padding : '5px 0px 5px',
      borderTopColor : '#dddddd',
      borderTopWidth : 1,
      borderTopStyle : 'solid',
      borderBottom : 1,
      borderBottomColor : '#dddddd',
      borderBottomStyle : 'dotted'
    }
  } )

  return (
    <TABLE>
      <HEADER columns={ columns }/>
      <TBODY>
        {
          data.map( ( x : any, key : number ) => {
            /* if ( x.summary ) {
              const date = new Date( x.date )
              date.setDate( date.getDate() + 1 )
              return (
                <View key={ key }>
                  <SummaryBalanceRow data={ x }/>
                  <View style={ _styles.root }>
                    <Text> { formatDate( date.toString(), FORMAT_DATES.formatMonthLongYear ) } </Text>
                  </View>
                </View>
              )
            }*/
            return <TRD data={ x } columns={ columns } key={ key } index={ key }/>
          } )
        }
        {/* { data && data.length !== 0 ? <SummaryBalanceRow data={ data[data.length - 1] }/> : <></> }*/}
      </TBODY>
    </TABLE>
  )
}

export default SummaryTable

const SummaryBalanceCell = ( { label, value } : { label : string, value : string } ) => {

  const styles = StyleSheet.create( {
    root : {
      flex : 1,
      alignItems : 'flex-end'
    },
    label : {
      fontSize : 7,
      color : '#888',
      paddingBottom : 3
    },
    value : {
      fontSize : 10
    }
  } )

  return (
    <View style={ styles.root }>
      <View style={ styles.label }><Text>{ label }</Text></View>
      <View style={ styles.value }><Text>{ value }</Text></View>
    </View>
  )
}

const SummaryBalanceRow = ( { data } : { data : any } ) => {

  const styles = StyleSheet.create( {
    root : {
      flexDirection : 'row',
      justifyContent : 'flex-end',
      alignItems : 'flex-end',
      padding : '5px 0px 15px',
      marginTop : 1,
      borderTopColor : '#dddddd',
      borderTopWidth : 1,
      borderTopStyle : 'solid',
      borderBottom : 1,
      borderBottomColor : '#dddddd',
      borderBottomStyle : 'dotted'
    },
    cellTitle : {
      textTransform : 'uppercase',
      textAlign : 'center',
      flex : 2,
      fontSize : 8,
      color : '#555'
    }
  } )
  return (
    <View style={ styles.root }>
      <View style={ styles.cellTitle }><Text>TOTAL</Text></View>
      <SummaryBalanceCell label={ 'owes' } value={ formatPrice( _.toNumber( data.totalOwes ) ) }/>
      <SummaryBalanceCell label={ 'claims' } value={ formatPrice( _.toNumber( data.totalClaims ) ) }/>
      <SummaryBalanceCell label={ 'balance' } value={ formatPrice(  _.toNumber( data.balance ) ) }/>
    </View>
  )
}
