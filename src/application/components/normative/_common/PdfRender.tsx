import React       from 'react'
import {
  StyleSheet,
  Text,
  View
}                  from '@react-pdf/renderer'
import { getUnit } from '../../../utils/Utils'

/** item data td render */
const _RenderNormativeItemData = ({data, value, index, styles: _styles = {}} : any) => {
  const styles = StyleSheet.create({
    root: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingLeft: 2,
      paddingRight: 2,
      flex: 1,
      width: '100%'
    },
    name: {
      flex: 3,
      textAlign: 'left',
      fontSize: 8,
    },
    unit: {
      flex: 1,
      textAlign: 'right',
      fontSize: 8,
    }
  })

  return (
    <View style={styles.root}>
      <View style={styles.name}><Text style={{textOverflow: 'ellipsis', maxLines: 1,}}>{value.shortName.trim()}</Text></View>
      <View style={styles.unit}>
        <Text style={{maxLines: 1, border: 0 }}>{getUnit(value.uom)}</Text>
      </View>
    </View>
  )
}

export const RenderNormativeItemData = React.memo(_RenderNormativeItemData,
    (prevProps, nextProps) => {
      return (nextProps.value.shortName === prevProps.value.shortName) && (nextProps.value.uom === prevProps.value.uom)
    })

export const PdfControlRender = ({label,value}: {label: string,value: any}) => {
  const controlStyles = StyleSheet.create({
    root: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%'
    },
    label: {
      width: 50,
      textAlign: 'left'
    },
    value: {
      textAlign: 'left',
      paddingLeft: 5,
      flex: 1
    }
  })
  return (
    <View style={controlStyles.root}>
      <View style={controlStyles.label}>
        <Text>{label}</Text>
      </View>
      <View style={controlStyles.value}>
        <Text>{value}</Text>
      </View>
    </View>
  )
}
