import {
  StyleSheet,
  Text,
  View
}                              from '@react-pdf/renderer'
import { formatDateLong }      from '../../../../utils/Utils'
import React                   from 'react'
import { isArray as _isArray } from 'lodash'

/** item data td render */
const _RenderCustomerCardDueDates = ({data, value, index, styles:_styles = {}}: any) => {
  const isDueDateArray = React.useMemo(() => _isArray(value.dueDates), [value])

  const styles = StyleSheet.create({
    root:{
      flexDirection:'row',
      justifyContent:'center',
      alignItems:'center',
      paddingLeft:2,
      paddingRight:2,
    },
    multi:{
      textTransform:'uppercase'
    },
  })

  return (
    <View style={styles.root}>
      {
        isDueDateArray ?
          <Text style={styles.multi}>
                        MULTI
          </Text>
          : <Text style={styles.multi}> {formatDateLong(value.dueDate)} </Text>
      }
    </View>
  )
}

export const RenderCustomerCardDueDates = React.memo(_RenderCustomerCardDueDates,
    (prevProps, nextProps) => {
      return (nextProps.value.dueDates === prevProps.value.dueDates)
    })

export const RenderCustomerCardDateFromTo = ({dateFrom, dateTo}: { dateFrom: string, dateTo: string  }) => {
  const text = `${formatDateLong(dateFrom)} - ${formatDateLong(dateTo)}`
  const styles = StyleSheet.create({
    root:{
      flexDirection:'row',
      justifyContent:'center',
      alignItems:'center',
      paddingLeft:2,
      paddingRight:2,
    },
    multi:{
      textTransform:'uppercase'
    },
  })

  return (
    <View style={styles.root}>
      <Text>{text}</Text>
    </View>
  )
} 