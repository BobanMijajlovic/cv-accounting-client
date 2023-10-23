import React               from 'react'
import {
  StyleSheet,
  View
}                          from '@react-pdf/renderer'
import SupplierOwnerPart   from './SupplierPart'
import { TCalculation }    from '../../../../../graphql/type_logic/types'
import { formatDateShort } from '../../../../utils/Utils'
import { ComponentRender } from '../../../invoice/pdf/Header/Header'
import CustomerPart        from '../../../invoice/pdf/Header/CustomerPart';

const styles = StyleSheet.create( {
  root : {
    flexDirection : 'row',
    justifyContent : 'space-between',
    margin : '5px 0px'
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
    textAlign: 'center',
    width : '50%'
  }
} )
const Header = ( { data } : { data : TCalculation } ) => {
  const { number, invoiceNumber, invoiceDate, date, supplier, client } = data
  return (
    <View style={ styles.root }>
      <View style={ styles.headerPart }>
        <CustomerPart data={ supplier as any }/>
      </View>
      <View style={ styles.title }>
        <ComponentRender label={ 'Supplier document:' } value={ `${ invoiceNumber }` }/>
        <ComponentRender label={ 'Invoice date:' } value={ formatDateShort( invoiceDate ) }/>
        <ComponentRender label={ 'Calculation num #:' } value={ `${ number }` }/>
      </View>
    </View>
  )
}

export default Header
