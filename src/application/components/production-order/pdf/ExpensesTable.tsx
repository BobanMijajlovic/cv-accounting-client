import React, { useMemo }      from 'react'
import {
  IPdfTableProps,
  resizeColumns,
  Table
}                              from '../../../../components/Pdf/Pdf'
import {
  StyleSheet,
  Text,
  View
}                              from '@react-pdf/renderer'
import _                       from 'lodash'
import { TProductionOrder }    from '../../../../graphql/type_logic/types'
import { formatPrice }         from '../../../utils/Utils'
import { RenderTableCustomer } from './_common/RenderTableCustomer'

const styles = StyleSheet.create( {
  root : {
    padding : 10,
    paddingBottom : 20,
    flexDirection : 'row',
    justifyContent : 'space-between',
    flex : 1
  },
  additionalExpense : {
    paddingTop : 7
  },
  additionalExpenseTitle : {
    fontSize : 7,
    borderBottom : 1,
    borderBottomStyle : 'solid',
    borderBottomColor : '#eee',
    paddingHorizontal : 2,
    marginHorizontal : 2,
    paddingBottom : 2
  }
} )

const AdditionalExpenseTablePdf = ( { productionOrder } : { productionOrder : TProductionOrder } ) => {

  const expenses = useMemo( () => productionOrder && productionOrder.expense && ( productionOrder.expense as any ).length !== 0 ? ( productionOrder.expense as any ).map( ( x : any, index : number ) => {
    const financeMP = Number( x.financeMP )
    const taxFinance = Number( x.financeTax )
    const financeVP = _.round( _.subtract( financeMP, taxFinance ), 2 )
    return {
      id : new Date().getTime() + index,
      ...x,
      financeVP,
      taxFinance,
      financeMP
    }
  } ) : [], [productionOrder] )

  const expenseTableData : IPdfTableProps = {
    columns : [
      {
        label : '#',
        format : ( value : any, index? : number ) => `${ ( ( Number( index ) || 0 ) + 1 ).toString() }.`,
        minSize : 2
      },
      {
        label : 'Name',
        field : 'customer',
        alignment : 'left',
        minSize : 110,
        format : ( value : any ) => `${ value.customer.shortName }`,
        render : RenderTableCustomer,
        renderProps : {
          field : 'customer'
        }
      },
     /* {
        label : 'Base Finance',
        field : 'financeVP',
        alignment : 'right',
        minSize : 15,
        sizeType : 3,
        format : ( value : any ) => formatPrice( value.financeVP )
      },
      {
        label : 'Tax finance',
        field : 'taxFinance',
        alignment : 'right',
        minSize : 15,
        sizeType : 3,
        format : ( value : any ) => formatPrice( value.taxFinance )
      },*/
      {
        label : 'Finance',
        field : 'financeMP',
        alignment : 'right',
        minSize : 20,
        sizeType : 3,
        format : ( value : any ) => formatPrice( value.financeMP )
      }
    ],
    data : expenses,
    summarize : { fields : ['financeVP', 'tax', 'financeMP'] },
    noHeader : true
  }

  resizeColumns( expenseTableData )

  return (
    <View>
      { expenses.length !== 0 &&
            <View style={ styles.additionalExpense }>
              <View style={ styles.additionalExpenseTitle }>
                <Text>Additional Expenses</Text>
              </View>
              <Table tableData={ expenseTableData }/>
            </View>
      }
    </View>
  )
}

export default AdditionalExpenseTablePdf

