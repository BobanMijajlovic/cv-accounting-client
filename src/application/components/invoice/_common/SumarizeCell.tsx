import _                                from 'lodash'
import React                            from 'react'
import { TaxFinanceRenderSummarize }    from '../../calculation/_common/TaxFinanceRender'
import { Summarize }                    from '../../calculation/_common/SummarizeCell'
import { formatPrice }                  from '../../../utils/Utils'
import { TABLE_INDEX_SUMMARIZE_COLUMN } from '../../../../components/Table'
import { InvoiceDiscountRender }        from './InvoiceDiscountRender'

export const SummarizeCellTax = ({ value, index, additionalData, ...rest }: any) => {
  const taxes = additionalData.items.reduce((acc: any, x: any) => {
    const index = acc.findIndex((y: any) => Number(y.taxId) === Number(x.taxId))
    if (index === -1) {
      return [...acc, {
        taxId: x.taxId,
        taxPercent: x.taxPercent,
        taxFinance: x.taxFinance
      }]
    }
    const vat = acc[index]
    acc.splice(index, 1, {
      taxId: vat.taxId,
      taxPercent: vat.taxPercent,
      taxFinance: _.round(_.add(Number(vat.taxFinance), x.taxFinance), 2)
    })
    return acc
  }, [])
  return <Summarize value={value} render={TaxFinanceRenderSummarize} taxes={taxes} index={index} {...rest}/>
}

export const SummarizeCellDiscount = ({ value, index, additionalData, ...rest }: any) => {
  const discountFinance = _.round(additionalData.items.reduce((acc: number, item: any) => _.add(acc, _.subtract(item.financeVP, item.financeFinalVP)), 0), 2)
  return (
    <div className={'d-flex flex-row justify-content-between align-items-center '}>
      <div className={'flex-2'}>
        {index === TABLE_INDEX_SUMMARIZE_COLUMN ? formatPrice(discountFinance) : <InvoiceDiscountRender value={value} additionalData={additionalData} {...rest} classNames={'font-smaller-2'}/>}
      </div>
    </div>
  )

}
