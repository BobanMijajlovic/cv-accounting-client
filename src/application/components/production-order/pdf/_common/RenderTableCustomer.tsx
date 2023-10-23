import React from 'react'
import {
  StyleSheet,
  Text,
  View
}            from '@react-pdf/renderer'

export const _RenderTableCustomer = ({data, value, index, styles: _styles = {}} : any) => {
  const styles = StyleSheet.create({
    root: {
      flexDirection: 'column',
      justifyContent: 'center',
      flex:1,
      paddingLeft: 2,
      paddingRight: 2
    },
    name: {
      flexShrink: 1,
      textAlign: 'left',
      fontSize: 7,
      marginBottom: 2,
    },
    codes: {
      flexShrink: 1,
      flexWrap: 'wrap',
      alignItems: 'flex-end',
      flexDirection: 'row',
      fontSize: 6
    }
  })

  return (
    <View style={styles.root}>
      <View style={styles.name}><Text style={{textOverflow: 'ellipsis', maxLines: 1,}}>{value.shortName ? value.shortName.trim() : value.fullName.trim()}</Text></View>
      <View style={styles.codes}>
        <Text style={{textAlign: 'left', maxLines: 1, border: 0, width: '48%'}}>{value.taxNumber}</Text>
        <Text style={{textAlign: 'right', maxLines: 1, border: 0, width: '48%'}}> {value.uniqueCompanyNumber}</Text>
      </View>
    </View>
  )
}

export const RenderTableCustomer = React.memo(_RenderTableCustomer,
    (prevProps, nextProps) => {
      return (nextProps.value.taxNumber === prevProps.value.taxNumber) && (nextProps.value.shortName === prevProps.value.shortName) && (nextProps.value.fullName === prevProps.value.fullName) && (nextProps.value.uniqueCompanyNumber === prevProps.value.uniqueCompanyNumber)
    })