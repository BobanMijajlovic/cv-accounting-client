import React from 'react'
import {
  StyleSheet,
  Text,
  View
}            from '@react-pdf/renderer'

export const RenderTableItemColumn = ({data, value, index, styles: _styles = {}} : any) => {
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
      <View style={styles.name}><Text style={{textOverflow: 'ellipsis', maxLines: 1,}}>{value.shortName.trim()}</Text></View>
      <View style={styles.codes}>
        <Text style={{textAlign: 'left', maxLines: 1, border: 0, width: '48%'}}>{value.code}</Text>
        <Text style={{textAlign: 'right', maxLines: 1, border: 0, width: '48%'}}> {value.barCode}</Text>
      </View>
    </View>
  )
}
