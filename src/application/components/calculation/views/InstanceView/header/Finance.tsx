import React, { useEffect } from 'react'
import { useValidation }    from '../../../../../../validation'
import {
  TCalculation,
  TExpense
}                           from '../../../../../../graphql/type_logic/types'
import { FinancePart }      from './finance/FinanceRow'

const Finance = ({calculation}: { calculation: TCalculation }) => {

  const validation = useValidation()

  useEffect(() => {
    if (calculation.totalFinanceVP) {
      validation.setFieldValue('totalFinanceNoTax', `${calculation.totalFinanceVP}`, true)
      return
    }
  }, [calculation])

  const expense = React.useMemo(() => !(calculation as any).expense || (calculation as any).expense.length === 0 ? {
    additional: [],
    invoice: []
  } : (() => {
    const additional: any = [] as any
    const invoice: any = [] as any
    (calculation as any).expense.map((expense: TExpense, key: number) => {
      if (expense.customer && expense.invoiceNumber) {
        additional.push(...(expense as any).items)
      } else {
        invoice.push(...(expense as any).items)
      }
    })
    return {
      additional,
      invoice
    }
  })(), [calculation])

  return (
    <div className={'d-flex flex-column px-2 mr-3 '}>
      {
        calculation.totalFinanceMP ? <>
          <FinancePart calculation={calculation}/>

          {/*    {
            expense.invoice && expense.invoice.length !== 0 ?
              <div className={'d-flex flex-row align-items-start pt-1 mb-1 border-top'}>
                <div className={'d-flex flex-column col-12  px-1'}>
                  <small className={'absolute-top-left-3 text-upper font-smaller-6 font-weight-600 color-primary letter-spacing-5'}>invoice expenses</small>
                  {
                    expense.invoice.map((costs : TExpenseItem, key : number) => {
                      return (
                        <div key={key} className={'d-flex pt-1 flex-row align-items-center'}>
                          <div className={'col-6 p-1 text-left font-smaller-5 text-upper'}> {costs.description}</div>
                          <div className={'col-2 p-1 text-right font-smaller-3'}><VatCustomRender value={costs.taxId as number}/></div>
                          <div className={'col-4 p-1 text-right font-smaller-2 font-weight-600'}>{formatPrice(`${costs.finance}`)}</div>
                        </div>
                      )
                    })
                  }
                </div>
              </div>
              : null
          }*/}

        </>
          :
          <div className={'opacity-4 mr-2 text-upper '}><sup> invoice amount: </sup></div>
      }
      {/* {
        calculation.discount && (calculation as any).discount.length !== 0 ?
          <div className={'d-flex flex-row  align-items-start pt-1  mb-1 border-top '}>
            <div className={'d-flex flex-column col-12 px-1'}>
              <small className={'absolute-top-left-3 color-success text-upper font-smaller-6 font-weight-600 letter-spacing-5'}>discount</small>
              {
                (calculation as any).discount.map((disc : TDiscounts, key : number) => {
                  const discount = getDiscountObject(disc.value, disc.percent)
                  return (
                    <div key={key} className={'d-flex pt-1 flex-row align-items-center relative'}>
                      <div className={'col-6 p-1 text-left text-upper font-smaller-5'}> {disc.description}</div>
                      <div className={'col-2 p-1 text-right font-smaller-3'}> {discount.type === DISCOUNT_SURCHARGE_TYPE.PERCENT ? `${formatPrice(discount.value)} %` : `${formatPrice(discount.value)}`} </div>
                      <div className={'col-4 p-1 text-right font-smaller-2 font-weight-600'}> {formatPrice(calculationDiscount(_toNumber(calculation.totalFinanceVP), discount))}</div>
                    </div>
                  )
                })
              }
            </div>
          </div>
          : null
      }
     
      {
        expense.additional && expense.additional.length !== 0 ?
          <div className={'d-flex flex-row align-items-start pt-1 mb-1 border-top '}>
            <div className={'d-flex flex-column col-12 px-1'}>
              <small className={'absolute-top-left-3 text-upper font-smaller-6 font-weight-600 color-primary letter-spacing-5'}>additional expenses</small>
              {
                expense.additional.map((costs : TExpenseItem, key : number) => {
                  return (
                    <div key={key} className={'d-flex pt-1 flex-row align-items-center'}>
                      <div className={'col-6 p-1 text-left font-smaller-5 text-upper'}> {costs.description}</div>
                      <div className={'col-2 p-1 text-right font-smaller-3'}><VatCustomRender value={costs.taxId as number}/></div>
                      <div className={'col-4 p-1 text-right font-smaller-2 font-weight-600'}>{formatPrice(`${costs.financeMP}`)}</div>
                    </div>
                  )
                })
              }
            </div>
          </div>
          : null
      }*/}
      {/* <ConditionalRendering condition={!!calculation.totalFinanceMP}>
        <div
                    className={'d-flex flex-row  align-items-center  border-top font-weight-bold background-grey px-1'}>
          <div className={'d-flex col-4 p-1 mr-1 font-smaller-3 opacity-5'}>
                        TOTAL
          </div>
          <div
                        className={'d-flex flex-column col-8 text-right p-1 font-bigger-2'}>{totalFinance}</div>
          <div className={'d-flex flex-column col-8 text-right p-1 font-bigger-2 font-weight-600'}>0</div>
        </div>
      </ConditionalRendering>*/}

      {/* <ConditionalRendering condition={!!calculation.totalInvoice}>

        <div className={'d-flex flex-row  align-items-start mb-1 border-top  px-1'}>
          <div className={'d-flex col-6 p-1 mr-1 font-smaller-3  opacity-4'}>
                        INPUT DIFFERENCE
          </div><div className={`d-flex flex-column col-6 text-right p-1 font-bigger-1 font-weight-600${financeDifference !== 0 ? ' color-danger' : ''}`}>
            {formatPrice(financeDifference)}
          </div>
        </div>
      </ConditionalRendering>*/}
    </div>

  )
}

export default Finance
