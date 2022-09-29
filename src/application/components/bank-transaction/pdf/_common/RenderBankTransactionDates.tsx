import {
  StyleSheet,
  Text,
  View
}                        from '@react-pdf/renderer'
import React             from 'react'
import {formatDateShort} from '../../../../utils/Utils'

export const RenderBankTransactionDates = ({data, value, index, styles: _styles = {}} : any) => {
  const styles = StyleSheet.create({
    root: {
      flexDirection: 'column',
      justifyContent: 'space-between',
      paddingLeft: 2,
      paddingRight: 2
    },
    dateProcessed: {
      flexShrink: 1,
      fontSize: 7,
      marginBottom: 2,
    },
    datePaid: {
      flexShrink: 1,
      flexWrap: 'wrap',
      alignItems: 'flex-end',
      flexDirection: 'row',
      fontSize: 6
    }
  })

  return (
    <View style={styles.root}>
      <View style={styles.dateProcessed}>
        <Text>{value.dateProcessed}</Text>
      </View>
      <View style={styles.datePaid}>
        <Text>{value.datePaid}</Text>
      </View>
    </View>
  )
}