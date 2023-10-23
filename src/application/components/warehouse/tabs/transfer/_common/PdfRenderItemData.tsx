import React from 'react'
import {
  StyleSheet,
  Text,
  View
}            from '@react-pdf/renderer'

/** item data td render */
const _RenderItemData = ({data, value, index, styles: _styles = {}} : any) => {
  const styles = StyleSheet.create({
    root: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingLeft: 2,
      paddingRight: 2,
      flex: 1
    },
    name: {
      flex: 1,
      textAlign: 'left',
      fontSize: 5,
    },
    code: {
      width: '20%',
      flexDirection: 'column',  
      textAlign: 'right',
      fontSize: 6
    }
  })

  return (
    <View style={styles.root}>
      <View style={styles.name}><Text style={{textOverflow: 'ellipsis', maxLines: 1,}}>{value.shortName.trim()}</Text></View>
      <View style={styles.code}>
        <Text style={{maxLines: 1, border: 0 }}>{value.barCode}</Text>
        <Text style={{maxLines: 1, border: 0 }}>{value.code}</Text>
      </View>
    </View>
  )
}

export const PdfRenderItemData = React.memo(_RenderItemData,
    (prevProps, nextProps) => {
      return (nextProps.value.shortName === prevProps.value.shortName) && (nextProps.value.barCode === prevProps.value.barCode) && (nextProps.value.code === prevProps.value.code)
    })

/** item data td render */