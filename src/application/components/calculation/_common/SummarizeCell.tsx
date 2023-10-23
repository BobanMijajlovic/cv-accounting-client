import React, {useRef}      from 'react'
import ConditionalRendering from '../../../../components/Util/ConditionalRender'
import {faExclamationTriangle}                       from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon}                             from '@fortawesome/react-fontawesome'
import {TABLE_INDEX_SUMMARIZE_COLUMN}                from '../../../../components/Table'
import {getCalculationInternalExpenseFinance}        from '../util'
import {
  formatPrice,
  toNumberFixed
}                                                    from '../../../utils/Utils'
import TaxFinanceRender, {TaxFinanceRenderSummarize} from './TaxFinanceRender'
import _                                             from 'lodash'
import {ToolTipOpen}                                 from '../../../../components/Tooltip/Tooltip'
import {TCalculationItem}                            from '../../../../graphql/type_logic/types'

interface ISummarizeProps {
  value : any,
  isRender : boolean
  render ?: any
  text  ?: string
}

export const Summarize = ({value, isRender,render:Render,text,...rest} : ISummarizeProps) => {

  const tooltipRef = useRef()

  const openTooltip = () => {
    isRender &&
    ToolTipOpen({
      text: text,
      position: 'bottom-left',
      type: 'error',
      parent: tooltipRef.current,
      visibleTime: 25000
    })
  }
  
  return (
    <div className={'d-flex flex-row justify-content-between align-items-center'} onClick={openTooltip}  ref={(ele) => tooltipRef.current = ele as any} >
      <ConditionalRendering condition={isRender}>
        <div style={{maxWidth: '10%'}} className={'font-smaller-4'}>
          <FontAwesomeIcon icon={faExclamationTriangle} className={'color-danger'} />
        </div>
      </ConditionalRendering>
      <div className={'flex-2'}>
        {Render ? <Render value={value} {...rest} /> :   formatPrice(value)}
      </div>
    </div>
  )
}

export const SummarizeCellExpense = ({value, index,model, additionalData} : any) => {
  const invoiceExpense = additionalData && getCalculationInternalExpenseFinance(additionalData)
  value = _.round(value,2)
  const render = React.useMemo(() => additionalData && index === TABLE_INDEX_SUMMARIZE_COLUMN && invoiceExpense !== toNumberFixed(value) && invoiceExpense !== 0, [value, index, invoiceExpense,additionalData])
  return <Summarize value={value} isRender={render}/>
}

export const SummarizeCellFinance = ({value, index, additionalData} : any) => {
  const invoiceInternalExpense = additionalData && getCalculationInternalExpenseFinance(additionalData)
  const finance = _.round(_.subtract(additionalData.totalFinanceMP,invoiceInternalExpense),2)
  value = _.round(value,2)
  const render = React.useMemo(() => additionalData && index === TABLE_INDEX_SUMMARIZE_COLUMN && finance !== toNumberFixed(value) && finance !== 0, [value, index,finance, additionalData])
  return <Summarize text={'Finance tax is not valid.'} value={value} isRender={render}/>
}

export const SummarizeCellTaxExp = ({value, index,additionalData,...rest} : any) => {
  value = _.round(value,2)
  const render = React.useMemo(() => additionalData &&  index === TABLE_INDEX_SUMMARIZE_COLUMN && additionalData.financeTax !== toNumberFixed(value) && additionalData.financeTax !== 0, [value, index, additionalData])
  return <Summarize text={'Tax expense is not valid.'} value={value} isRender={render} render={TaxFinanceRender} index={index} {...rest}/>
}

export const SummarizeCellFinanceExp = ({value, index,additionalData,...rest} : any) => {
  const finance =  additionalData.items.reduce((acc : number,x : TCalculationItem) => _.round(_.add(acc,Number(x.financeExpInternalMP)),2),0)
  value = _.round(value,2)
  const render = React.useMemo(() => additionalData && index === TABLE_INDEX_SUMMARIZE_COLUMN && finance !== toNumberFixed(value) && finance !== 0, [value, index, finance, additionalData])
  return <Summarize text={'Finance after expense is not valid.'} value={value} isRender={render} render={TaxFinanceRender} index={index} {...rest}/>
}

export const SummarizeCellTax = ({value, index,additionalData,...rest} : any) => {
  const taxes = additionalData.items.reduce((acc : any,x : any) => {
    const index = acc.findIndex((y : any) => Number(y.taxId) === Number(x.taxId))
    if (index === -1) {
      return [...acc, {
        taxId: x.taxId,
        taxPercent: x.taxPercent,
        taxFinance: _.round(_.subtract(Number(x.financeMP), Number(x.financeVP)), 2),
      }]
    }
    const vat = acc[index]
    const taxFinance = _.round(_.subtract(Number(x.financeMP), Number(x.financeVP)), 2)
    acc.splice(index, 1, {
      taxId: vat.taxId,
      taxPercent: vat.taxPercent,
      taxFinance: _.round(_.add(Number(vat.taxFinance), taxFinance), 2)
    })
    return acc
  }, [])
  const taxFinance = additionalData.items.reduce((acc : number,x : TCalculationItem) => _.round(_.add(acc,_.round(_.subtract(Number(x.financeMP), Number(x.financeVP)), 2)),2),0)
  value = _.round(value,2)
  const isRender = React.useMemo(() => additionalData && index === TABLE_INDEX_SUMMARIZE_COLUMN && taxFinance !== toNumberFixed(value) && taxFinance !== 0, [value, index, additionalData])
  return <Summarize text={'Finance tax is not valid.'} value={value} isRender={isRender} render={TaxFinanceRenderSummarize} taxes={taxes}  index={index} {...rest}/>
}

export const SummarizeCellTaxFinanceExp = ({value, index,additionalData,...rest} : any) => {
  const taxes = additionalData.items.reduce((acc : any,x : any) => {
    const index = acc.findIndex((y : any) => Number(y.taxId) === Number(x.taxId))
    if (index === -1) {
      return [...acc, {
        taxId: x.taxId,
        taxPercent: x.taxPercent,
        taxFinance: _.round(_.subtract(Number(x.financeExpInternalMP), Number(x.financeExpInternalVP)), 2),
      }]
    }
    const vat = acc[index]
    const taxFinance = _.round(_.subtract(Number(x.financeExpInternalMP), Number(x.financeExpInternalVP)), 2)
    acc.splice(index, 1, {
      taxId: vat.taxId,
      taxPercent: vat.taxPercent,
      taxFinance: _.round(_.add(Number(vat.taxFinance), taxFinance), 2)
    })
    return acc
  }, [])
  const financeTax = additionalData.expense && additionalData.expense.length === 0 ? additionalData.financeTax : additionalData.expenseInternalFinanceTax
  value = _.round(value,2)
  const isRender = React.useMemo(() => additionalData && index === TABLE_INDEX_SUMMARIZE_COLUMN && financeTax !== toNumberFixed(value) && financeTax !== 0, [value, index, additionalData])
  return <Summarize text={'Finance tax after expense is not valid.'}  value={value} isRender={isRender} render={TaxFinanceRenderSummarize} taxes={taxes} index={index} {...rest}/>
}
