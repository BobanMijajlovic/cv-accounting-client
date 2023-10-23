import React, { useMemo }           from 'react'
import {
  StyleSheet,
  Text,
  View
}                                   from '@react-pdf/renderer'
import { TFinanceTransferDocument } from '../../../../graphql/type_logic/types'
import { formatDateLong }           from '../../../utils/Utils'
import CustomerPart                 from '../../invoice/pdf/Header/CustomerPart'

const styles = StyleSheet.create( {
  root : {
    margin : '5px',
    flexDirection : 'row',
    justifyContent : 'space-between'
  },
  title : {
    flexDirection : 'column',
    justifyContent : 'flex-end',
    padding : '5px 10px',
    fontSize : 9,
    width : '40%'
  },
  headerPart : {
    flexDirection : 'column',
    justifyContent : 'space-between',
    width : '50%'
  },
  customerPart : {
    flex : 2,
    textAlign : 'center',
    padding : 5,
    borderWidth : 1,
    borderStyle : 'solid',
    borderColor : '#dddddd'
  },
  invoiceNumber : {
    fontSize : 10,
    fontWeight : 'bold',
    textAlign : 'center'
  }
} )
const Header = ( { title, data } : { title : string, data : TFinanceTransferDocument } ) => {
  const { number, date, dueDates, customer } = data
  const dueDate = useMemo( () => !dueDates && ( dueDates || [] ).length === 0 ? '' : formatDateLong( ( dueDates as any )[0].date ), [dueDates, formatDateLong] )
  return (
    <View style={ styles.root }>
      <View style={ styles.headerPart }>
        <View style={ styles.customerPart }><CustomerPart data={ customer as any }/></View>
      </View>
      <View style={ styles.title }>
        <ComponentRender label={ `${ title } num` } value={ `${ number }` } style={ { fontWeight : 'bold' } }/>
        <ComponentRender label={ 'Document date' } value={ formatDateLong( date ) }/>
        <ComponentRender label={ 'Due date' } value={ dueDate }/>
      </View>
    </View>
  )
}

export default Header

const _styles = StyleSheet.create( {
  root : {
    flexDirection : 'row',
    justifyContent : 'space-between'
  },
  label : {
    flex : 1,
    textAlign : 'right'
  },
  value : {
    flex : 1,
    textAlign : 'right'
  }
} )

const ComponentRender = ( { label, value, style } : { label : string, value : string, style? : any } ) => {
  return (
    <View style={ { ..._styles.root, ...style } }>
      <Text style={ _styles.label }>{ label }</Text>
      <Text style={ _styles.value }>{ value }</Text>
    </View>
  )
}
