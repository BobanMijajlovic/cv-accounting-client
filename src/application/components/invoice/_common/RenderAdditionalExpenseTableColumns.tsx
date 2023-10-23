import {
  StyleSheet,
  Text,
  View
}                                       from '@react-pdf/renderer'
import { TABLE_INDEX_SUMMARIZE_COLUMN } from '../../../../components/Table'
import _                                from 'lodash'
import { formatPrice }                  from '../../../utils/Utils'
import React                            from 'react'

/** vat td render */
const _RenderAdditionalExpenseVatData = ({ data, value, index, items, styles: _styles = {}, additionalData }: any) => {
  const styles = StyleSheet.create({
    root: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingLeft: 2,
      paddingRight: 2,
      flex: 1
    },
    tax: {
      width: '25%',
      textAlign: 'left',
      fontSize: 5
    },
    finance: {
      flex: 3,
      textAlign: 'right'
    }
  })

  const isSummarize = index === TABLE_INDEX_SUMMARIZE_COLUMN
  const sumTotal = isSummarize ? items.reduce((acc: number, x: any) => _.add(acc, x.taxFinance), 0) : 0

  return (
    <View style={styles.root}>
      <View style={styles.tax}><Text style={{ maxLines: 1 }}>{isSummarize ? '' : value.taxPercent}{isSummarize ? '' : '%'}</Text></View>
      <View style={styles.finance}>
        <Text style={{ maxLines: 1, border: 0 }}>{formatPrice(isSummarize ? sumTotal : value.taxFinance)}</Text>
      </View>
    </View>
  )
}

export const RenderAdditionalExpenseVatData = React.memo(_RenderAdditionalExpenseVatData,
    (prevProps, nextProps) => {
      return (nextProps.value.taxValue === prevProps.value.taxValue) && (nextProps.value.taxFinance === prevProps.value.taxFinance)
    })
