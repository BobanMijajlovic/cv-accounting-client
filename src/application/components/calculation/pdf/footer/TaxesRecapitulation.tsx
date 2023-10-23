import React                from 'react'
import {
  TCalculationItem,
  TTaxFinance
} from '../../../../../graphql/type_logic/types'
import _                    from 'lodash'
import TaxPart              from '../../../invoice/pdf/footer/TaxPart'
import { View, StyleSheet }       from '@react-pdf/renderer'

const TaxesRecapitulation = ( { vats } : { vats? : any } ) => {

  const styles = StyleSheet.create({
    root: {
      padding: 5
    },
  })

  return (
    <View style={styles.root}>
      <TaxPart data={ vats }/>
    </View>
  )
}

export default TaxesRecapitulation
