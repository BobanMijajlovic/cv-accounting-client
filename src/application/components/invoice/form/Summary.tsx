import React, { useMemo }                   from 'react'
import {
  TExpenseItem,
  TInvoice,
  TProformaInvoice,
  TReturnInvoice
}                                           from '../../../../graphql/type_logic/types'
import _                                    from 'lodash'
import { INVOICE_FORM_ITEMS_TABLE_SUMMARY } from '../../../constants'
import { formatPrice }                      from '../../../utils/Utils'
import Table                                from '../../../../components/Table/Table'
import { VatCustomRender }                  from '../../_common/VatRender'
import { useTranslationFunction }           from '../../../../components/Translation/useTranslation'
import { useInvoiceForm }                   from '../../../../store/invoice/useInvoice'
import { useProformaInvoiceForm }           from '../../../../store/proforma-invoice/useProformaInvoice'
import { useReturnInvoiceForm }             from '../../../../store/return-invoice/useReturnInvoice'

const summarize = {
  fields : ['financeVP', 'taxFinance', 'financeMP']
}

const InvoiceSummary = ( { invoice } : { invoice : TInvoice | TProformaInvoice | TReturnInvoice } ) => {
  const { translate } = useTranslationFunction()
  const expenses = useMemo( () => invoice && invoice.expense && ( invoice.expense as any ).length !== 0 ? ( invoice.expense as any ).map( ( x : any ) => {
    const items = x.items as TExpenseItem[]
    const financeMP = Number( items[0].financeMP )
    const taxPercent = items[0].taxPercent
    const financeVP = _.round( _.divide( _.multiply( financeMP, 100 ), _.add( 100, Number( taxPercent ) ) ), 2 )
    const taxFinance = _.round( _.subtract( financeMP, financeVP ), 2 )
    const taxId = items[0].taxId
    return {
      financeFinalVP : financeVP,
      taxPercent,
      taxFinance,
      taxId,
      financeMP : financeMP
    }
  } ) : [], [invoice] )

  const items = invoice && invoice.items ? ( invoice.items || [] ).map( x => {
    const item = x as any
    const financeMP = _.round( _.add( Number( item.financeFinalVP ), Number( item.taxFinance ) ), 2 )
    return {
      ...item,
      financeMP
    }
  } ) : [invoice]

  const tableData = useMemo( () => {
    if ( !expenses || !items ) {
      return []
    }
    const data = [...items, ...expenses]
    return data.reduce( ( acc : any, x : any ) => {
      const index = acc.findIndex( ( y : any ) => Number( y.taxId ) === Number( x.taxId ) )
      if ( index === -1 ) {
        return [...acc, {
          id : Number( x.id ),
          taxId : x.taxId,
          taxPercent : x.taxPercent,
          financeVP : _.round( x.financeFinalVP, 2 ),
          taxFinance : _.round( x.taxFinance, 2 ),
          financeMP : _.round( x.financeMP, 2 )
        }]
      }
      const vat = acc[index]
      vat.financeVP = _.round( _.add( Number( vat.financeVP ), Number( x.financeFinalVP ) ), 2 )
      vat.taxFinance = _.round( _.add( Number( vat.taxFinance ), x.taxFinance ), 2 )
      vat.financeMP = _.round( _.add( Number( vat.financeMP ), Number( x.financeMP ) ), 2 )
      acc.splice( index, 1, {
        ...vat
      } )
      return acc
    }, [] )
  }, [expenses, items] )

  const tableHeader = useMemo( () => {
    return [
      {
        label : 'INVOICE_SUMMARY_TH_TAX',
        field : 'taxId',
        notResize: true,
        cell : {
          classes : ['text-center th-tax'],
          render : VatCustomRender
        }
      },
      {
        label : 'INVOICE_ITEMS_TABLE_TH_BASE_FINANCE',
        field : 'financeVP',
        notResize: true,
        cell : {
          classes : ['text-right th-finance'],
          format : ( value : string ) => {
            return formatPrice( value )
          }
        }
      },
      {
        label : 'INVOICE_ITEMS_TABLE_TH_TAX',
        field : 'taxFinance',
        notResize: true,
        cell : {
          classes : ['text-right th-finance'],
          format : ( value : string ) => {
            return formatPrice( value )
          }
        }
      },
      {
        label : 'INVOICE_ITEMS_TABLE_TH_FINANCE',
        field : 'financeMP',
        notResize: true,
        cell : {
          classes : ['text-right th-finance'],
          format : ( value : string ) => {
            return formatPrice( value )
          },
        }
      }
    ].map( ( x : any ) => {
      return {
        ...x,
        label : x.label && x.label !== '#' ? translate( x.label ) : x.label
      }
    } )
  }, [] )
  return (
    <div className={ 'hw-invoice-form-summary-table-root d-flex justify-content-end' }>
      <Table
                modelFields={ ['taxPercent', 'taxId'] }
                header={ tableHeader }
                separator={ 'cell' }
                data={ tableData }
                tableName={ INVOICE_FORM_ITEMS_TABLE_SUMMARY }
                summarize={ summarize }
                additionalData={ invoice }
      />
    </div>
  )
}

export const InvoiceSummaryTable = ({invoiceId}:{invoiceId: string}) => {
  const {invoice} = useInvoiceForm(invoiceId)
  return <InvoiceSummary invoice={invoice}/>
}

export const ProformaInvoiceSummaryTable = ({proformaInvoiceId}:{proformaInvoiceId: string}) => {
  const {proformaInvoice} = useProformaInvoiceForm(proformaInvoiceId)
  return <InvoiceSummary invoice={proformaInvoice}/>
}

export const ReturnInvoiceSummaryTable = ({returnInvoiceId}:{returnInvoiceId: string}) => {
  const {returnInvoice} = useReturnInvoiceForm(returnInvoiceId)
  return <InvoiceSummary invoice={returnInvoice}/>
}