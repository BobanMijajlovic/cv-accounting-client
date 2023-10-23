import React, { useMemo } from 'react'
import {
  StyleSheet,
  Text,
  View
}                         from '@react-pdf/renderer'
import {
  TCalculation,
  TDueDates
} from '../../../../../graphql/type_logic/types'
import {
  formatDateShort,
  formatPrice
}                    from '../../../../utils/Utils'

const styles = StyleSheet.create({
  root: {
    maxWidth: 150,
    minWidth: 80,
  },
  rootTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottom: 1,
    borderBottomStyle: 'solid',
    borderBottomColor: '#dddddd'
  },
  title: {
    paddingBottom: 5
  },
  dueDate: {
    paddingVertical: 2
  }
})

const DueDatePart =  ({calculation}: { calculation?: TCalculation }) => {
  const dueDate = useMemo(() => {
    const dueDates = calculation?.dueDate || [] as TDueDates[]
    const additionalExpense = (calculation as any).expense.filter((x : any) => (x.customer && x.invoiceNumber))
    if (additionalExpense && additionalExpense.length !== 0) {
      additionalExpense.map((x: any) => {
        dueDates.push({
          date: x.dueDate,
          finance: x.financeMP
        })
      })
    }

    return dueDates
  },[calculation])

  return (
    <View style={styles.root}>
      {dueDate ?
        (
          <>
            <View style={styles.rootTitle}>
              <Text style={styles.title}>Due Dates:</Text>
            </View>
            <View style={styles.dueDates}>
              {
                dueDate && dueDate.map((x: any, key: number) => {
                  return <DueDateRow key={key} dueDate={x}/>
                })
              }
            </View>
          </>
        )
        : null
      }
    </View>
  )
}
export default DueDatePart
const styleRow = StyleSheet.create({
  root:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems: 'stretch',
    flex:1,
    borderBottom: 1,
    borderStyle: 'solid',
    borderColor: '#dddddd',
  },
  date: {
    width: '30%',
    textAlign: 'center',
    paddingVertical:2,
    borderLeft: 1,
    borderRight: 1,
    borderStyle: 'solid',
    borderColor: '#dddddd',
  },
  finance: {
    width: '70%',
    textAlign: 'right',
    paddingVertical:2,
    paddingRight:2,
    borderRight: 1,
    borderStyle: 'solid',
    borderColor: '#dddddd',
  },
})

const DueDateRow = ({dueDate}: { dueDate: any }) => {
  return (
    <View style={styleRow.root}>
      <View style={styleRow.date}>
        <Text >{formatDateShort(dueDate.date)}</Text>
      </View>
      <View style={styleRow.finance}>
        <Text>{formatPrice(dueDate.finance)}</Text>
      </View>
    </View>
  )
}
