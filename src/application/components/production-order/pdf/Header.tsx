import {
  StyleSheet,
  Text,
  View
} from '@react-pdf/renderer'
import { TProductionOrder } from '../../../../graphql/type_logic/types'
import {
  formatDateLong,
  formatQuantity
}                           from '../../../utils/Utils'
import React                from 'react'

const styles = StyleSheet.create( {
  root : {
    margin : '20px 10px',
    flexDirection : 'row',
    justifyContent : 'space-between'
  },
  oneDiv: {
    flex: 1,
  }
} )
const Header = ( { data } : {  data : TProductionOrder  } ) => {
  const {  date, quantity, dateFinish } = data
  return (
    <View style={ styles.root }>
      <View style={ styles.oneDiv}>
        <ComponentRender label={ 'Date of start production:' } value={ `${ formatDateLong(date as string) }` } />
      </View>
      <View style={ styles.oneDiv}></View>
      <View style={ styles.oneDiv}>
        <ComponentRender label={ 'Total quantity:' } value={ `${ formatQuantity(quantity as number) }` } />
        <ComponentRender label={ 'Date of end production:' } value={ `${ dateFinish ? formatDateLong(dateFinish as string) : '##.##.####.' }` } />
      </View>
    </View>
  )
}

export default Header

const _styles = StyleSheet.create( {
  root : {
    flexDirection : 'row',
    justifyContent : 'space-between',
    marginBottom: 3
  },
  label : {
    flex : 1,
    textAlign : 'left'
  },
  value : {
    flex : 1,
    textAlign : 'right'
  }
} )

export const ComponentRender = ( { label, value, style } : { label : string, value : string, style? : any } ) => {
  return (
    <View style={ { ..._styles.root, ...style } }>
      <Text style={ _styles.label }>{ label }</Text>
      <Text style={ _styles.value }>{ value }</Text>
    </View>
  )
}