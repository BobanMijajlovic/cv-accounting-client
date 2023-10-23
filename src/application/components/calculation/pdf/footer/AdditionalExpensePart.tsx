import React                 from 'react'
import {
  StyleSheet,
  Text,
  View
}                            from '@react-pdf/renderer'
import {TExpense} from '../../../../../graphql/type_logic/types'
import {formatPrice}         from '../../../../utils/Utils'

const styles = StyleSheet.create({
  root: {
    maxWidth: 200,
    minWidth: 150,
  },
  title: {
  },
  expenses: {
    paddingTop: 5
  }
})

const AdditionalExpensePart = ({additionalExpenses} : {additionalExpenses : TExpense[]}) => {
  return (
    <View style={styles.root}>
      <View><Text style={styles.title}>Expenses:</Text></View>
      <View style={styles.expenses}>
        {
          additionalExpenses && (additionalExpenses as any).map((x : TExpense,key : number) => {
            return <AdditionalExpenseRow key={key} expense={x} />
          })
        }  
      </View>

    </View>
  )
}

export default AdditionalExpensePart

const styleRow = StyleSheet.create({
  root: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 2,
    flex: 1,
    alignItems: 'center',
    fontSize: 6
  },
})

const AdditionalExpenseRow = ({expense} : {expense : any}) => {

  return (
    <View style={styleRow.root}>
      <View>
        <Text>{expense.customer.shortName}</Text>
        <Text>INV #: {expense.invoiceNumber}</Text>
      </View>
      <Text>{formatPrice(expense.financeMP)}</Text>
    </View>
  )

}
