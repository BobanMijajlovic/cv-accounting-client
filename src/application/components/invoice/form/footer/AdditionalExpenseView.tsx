import React                      from 'react'
import { TExpense }        from '../../../../../graphql/type_logic/types'
import * as _                     from 'lodash'
import { formatPrice }            from '../../../../utils/Utils'
import { useTranslationFunction } from '../../../../../components/Translation/useTranslation'

const AdditionalExpenseView = ({ expense: expenses }: { expense?: TExpense[] }) => {
  const { translate } = useTranslationFunction()
  if (!expenses || expenses.length === 0) {
    return (<div className={'opacity-6 mr-4 text-upper d-flex flex-column font-smaller-2 '}>
      <div className={'text-upper font-smaller-6 font-weight-600 color-primary letter-spacing-5'}> {translate('LABEL_ADDITIONAL_EXPENSES')}:</div>
      <div className={'font-smaller-5'}>{translate('ADDITIONAL_EXPENSES_VIEW_NO_ADDITIONAL EXPENSE')}</div>
    </div>)
  }
  return (
    <div className={'d-flex flex-row relative hw-invoice-expense-preview-root'}>
      <div className={'d-flex flex-row align-items-start mb-1 flex-fill'}>
        <div className={'d-flex flex-column col-12  px-1 pt-2'}>
          <small className={'hw-additional-expenses_label text-upper font-smaller-6 font-weight-600 color-primary letter-spacing-5'}>{translate('LABEL_ADDITIONAL_EXPENSES')}: </small>
          <div className={'d-flex flex-row color-primary opacity-4 text-upper text-center font-smaller-5 border-bottom border-width-2 border-color-blue-light pb-1 mb-1'}>
            <div className={'flex-2 due-date-title'}>{translate('LABEL_DESCRIPTION')}</div>
            <div className={'flex-1'}>{translate('ADDITIONAL_EXPENSES_VIEW_TH_BASE_FINANCE')}</div>
            <div className={'flex-1'}>{translate('DUE_DATE_VIEW_TH_FINANCE')}</div>
          </div>
          {
            expenses && (expenses as any).map((expense: TExpense, key: number) => {
              return (
                <div key={key} className={'d-flex flex-row justify-content-between align-items-center font-smaller-3 pb-1 border-bottom'}>
                  <div className={'flex-2 pr-1'}>{(expense as any).items?.[0]?.description}</div>
                  <div className={'flex-1 text-right'}>{formatPrice(_.round(_.subtract(expense.financeMP as number, expense.financeTax as number), 2))}</div>
                  <div className={'flex-1 text-right'}>{formatPrice(expense.financeMP as number)}</div>
                </div>
              )
            })
          }
        </div>
      </div>
    </div>
  )
}

export default AdditionalExpenseView
