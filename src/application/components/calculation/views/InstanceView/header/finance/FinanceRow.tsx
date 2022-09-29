import React                from 'react'
import { formatPrice }      from '../../../../../../utils/Utils'
import _                    from 'lodash'
import {
  TCalculation,
  TExpense
}                           from '../../../../../../../graphql/type_logic/types'
import ConditionalRendering from '../../../../../../../components/Util/ConditionalRender'

interface IFinanceValuesProps {
  financeVP: string | number
  financeTax: string | number
  financeMP: string | number
}

interface IFinanceRowProps {
  label: string
  values: IFinanceValuesProps
  format?: boolean
  classNames?: string
}

export const FinanceRow = ({label, values, format = true, classNames}: IFinanceRowProps) => {

  return (
    <div className={'d-flex justify-content-between align-items-center w-100 pt-1 border-bottom'}>
      <div className={'text-upper font-smaller-5 pr-2 text-left flex-1 px-2'}>{label}</div>
      <div className={'d-flex justify-content-between align-items-center flex-2 text-right pl-2'}>
        {
          Object.keys(values).map((x: string, key: number) => {
            const val = _.get(values, x)
            return <div key={key} className={`font-smaller-2 font-weight-600 flex-1${classNames ? ` ${classNames}` : ''}`}> {format ? formatPrice(val) : val}</div>
          })
        }
      </div>
    </div>
  )
}

export const FinancePart = ({calculation}: { calculation: TCalculation }) => {
  const totalFinanceData = React.useMemo(() => {
    return {
      financeVP: _.round(_.subtract(Number(calculation.totalFinanceMP), Number(calculation.financeTax)), 2),
      financeTax: calculation.financeTax,
      financeMP: calculation.totalFinanceMP,
    }
  }, [calculation])

  const internalExpensesData = React.useMemo(() => {
    return (calculation as any).expense ? (calculation as any).expense.reduce((acc: any, expense: TExpense) => {
      if (expense.invoiceNumber) {
        return acc
      }
      return {
        financeVP: _.round(_.subtract(Number(expense.financeMP), Number(expense.financeTax)), 2),
        financeTax: Number(expense.financeTax),
        financeMP: Number(expense.financeMP)
      }
    }, {financeVP: 0, financeTax: 0, financeMP: 0}) : {financeVP: 0, financeTax: 0, financeMP: 0}
  }, [calculation])

  const externalExpenseExists = React.useMemo(() => (calculation as any).expense.find((x: any) => (x.invoiceNumber && x.customer && x.customer.id)), [calculation])

  const externalExpensesData = React.useMemo(() => {
    return (calculation as any).expense ? (calculation as any).expense.reduce((acc: any, expense: TExpense) => {
      if (!expense.invoiceNumber) {
        return acc
      }

      return {
        financeVP: _.round(_.subtract(Number(expense.financeMP), Number(expense.financeTax)), 2),
        financeTax: Number(expense.financeTax),
        financeMP: Number(expense.financeMP)
      }
    }, {financeVP: 0, financeTax: 0, financeMP: 0}) : {financeVP: 0, financeTax: 0, financeMP: 0}
  }, [calculation])

  const itemsFinanceData = React.useMemo(() => {
    return {
      financeVP: _.round(_.subtract(totalFinanceData.financeVP, internalExpensesData.financeVP), 2),
      financeTax: _.round(_.subtract(Number(totalFinanceData.financeTax), internalExpensesData.financeTax), 2),
      financeMP: _.round(_.subtract(Number(totalFinanceData.financeMP), internalExpensesData.financeMP), 2)
    }
  }, [internalExpensesData, totalFinanceData])

  const finalFinanceData = React.useMemo(() => {
    return {
      financeVP: _.round(_.add(totalFinanceData.financeVP, externalExpensesData.financeVP), 2),
      financeTax: _.round(_.add(Number(totalFinanceData.financeTax), externalExpensesData.financeTax), 2),
      financeMP: _.round(_.add(Number(totalFinanceData.financeMP), externalExpensesData.financeMP), 2)
    }
  }, [externalExpensesData, totalFinanceData])

  return (
    <>
      <FinanceRow label={''}
                        format={false}
                        values={{
                          financeVP: 'Base fin.',
                          financeTax: 'Tax',
                          financeMP: 'Finance Tax'
                        }}
                        classNames={'text-upper font-smaller-5 font-weight-normal'}
      />
      <FinanceRow label={'Items'} values={itemsFinanceData}/>
      <FinanceRow label={'Expense'} values={internalExpensesData}/>
      <FinanceRow label={'Total'} values={totalFinanceData as IFinanceValuesProps}/>
      <ConditionalRendering condition={externalExpenseExists}>
        <FinanceRow label={'Additional Exp'} values={externalExpensesData}/>
        <FinanceRow label={'Final'} values={finalFinanceData}/>
      </ConditionalRendering>
    </>
  )
}

