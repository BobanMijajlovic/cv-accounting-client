import React                from 'react'
import {
  StyleSheet,
  Text,
  View
}                           from '@react-pdf/renderer'
import { PdfControlRender } from '../_common/PdfRender'
import { TItem }            from '../../../../graphql/type_logic/types'
import { get as _get }      from 'lodash'

const PdfItemInfo = ( { data } : { data : TItem } ) => {
  const styles = StyleSheet.create( {
    columnContent : {
      flexDirection : 'column',
      justifyContent : 'flex-start',
      textAlign : 'left'
    },
    itemName : {
      padding : '2px 0px',
      fontSize : 10,
      fontWeight : 900
    }
  } )

  const shortName = _get( data, 'shortName', '' )

  return (
    <View style={ styles.columnContent }>
      <View style={ styles.itemName }>
        <Text>{ shortName }</Text>
      </View>
      <PdfControlRender label={ 'Barcode' } value={ data.barCode }/>
      <PdfControlRender label={ 'Code' } value={ data.code }/>
    </View>
  )
}

export default PdfItemInfo