import React                from 'react'
import { CONSTANT_INVOICE } from '../../../../constants'
import { faTimes }          from '@fortawesome/free-solid-svg-icons'

import { FontAwesomeIcon }        from '@fortawesome/react-fontawesome'
import ConditionalRendering       from '../../../../../components/Util/ConditionalRender'
import {
  formatDateLong,
  formatPrice
}                                 from '../../../../utils/Utils'
import {
  TDueDates,
  TInvoice,
  TReturnInvoice
}                                 from '../../../../../graphql/type_logic/types'
import {
  getInvoiceFinanceMP,
  getInvoiceFooterAdditionalExpenseFinance
}                                 from '../../util'
import _                          from 'lodash'
import { useTranslationFunction } from '../../../../../components/Translation/useTranslation'
import {
  InvoiceDueDateFormInline,
  ReturnInvoiceDueDateFormInline
}                                 from './DueDateFormInline'
import { useInvoiceForm }         from '../../../../../store/invoice/useInvoice'
import { useReturnInvoiceForm }   from '../../../../../store/return-invoice/useReturnInvoice'

interface IDueDateViewProps {
  invoice : TInvoice | TReturnInvoice
  isReturnInvoice? : boolean
}

const DueDateView = ( { invoice, isReturnInvoice } : IDueDateViewProps ) => {

  const { translate } = useTranslationFunction()
  const { id : invoiceId, dueDates } = invoice
  const total = React.useMemo( () => getInvoiceFinanceMP( invoice.items as any ), [invoice, getInvoiceFinanceMP] )
  const totalExpenseFinance = React.useMemo( () => getInvoiceFooterAdditionalExpenseFinance( invoice.expense as any ), [invoice] )
  const totalInvoice = React.useMemo( () => _.round( _.add( total, totalExpenseFinance ), 2 ), [total, totalExpenseFinance] )
  const totalAdded =  _.round( ( dueDates || [] ).reduce( ( acc : number, v : TDueDates ) => _.add( acc, Number( v.finance ) ), 0 ), 2 )
  const totalDiff = React.useMemo( () => _.round( _.subtract( totalInvoice, totalAdded ), 2 ), [totalAdded, totalInvoice] )

  return (
    <div className={ 'd-flex flex-column w-100 pb-3 hw-due-date-view-root' }>
      <div className={ 'd-flex align-items-center justify-content-between p-1 w-100' }>
        <div className={ 'd-flex align-items-center' }>
          <div className={ 'font-smaller-3 color-primary text-upper' }>
            { translate( 'INVOICE_DUE_DATE_DIALOG_TITLE' ) }
          </div>
        </div>
        <div className={ 'd-flex justify-content-between align-items-center' }>
          <div className={ 'd-flex flex-column align-items-center mr-3' }>
            <div className={ 'font-smaller-5 color-primary text-upper' }>
              { translate( 'INVOICE_DUE_DATE_DIALOG_TOTAL_ADDED_LABEL' ) }
            </div>
            <div className={ 'font-smaller-2 color-primary text-upper' }>
              { formatPrice( totalAdded ? totalAdded : 0 ) }
            </div>
          </div>
          <div className={ 'd-flex flex-column align-items-center mr-3' }>
            <div className={ 'font-smaller-5 color-primary text-upper' }>
              { translate( 'INVOICE_DUE_DATE_DIALOG_TOTAL_FINANCE_LABEL' ) }
            </div>
            <div className={ 'font-smaller-2 color-primary text-upper' }>
              { formatPrice( totalInvoice ) }
            </div>
          </div>
          <div className={ 'd-flex flex-column align-items-center' }>
            <div className={ 'font-smaller-5 color-primary text-upper' }>
              { translate( 'INVOICE_DUE_DATE_DIALOG_TOTAL_DIFF_LABEL' ) }
            </div>
            <div className={ `font-smaller-2 text-upper${ totalDiff !== 0 ? ' color-danger' : ' color-primary' }` }>
              { totalDiff ? totalDiff > 0 ? `+ ${ formatPrice( totalDiff ) }` : `${ formatPrice( totalDiff ) }` : formatPrice( 0 ) }
            </div>
          </div>
        </div>
      </div>

      <div className={ 'border-top-double' }>
        <ConditionalRendering condition={ ( dueDates || [] ).length === 0 }>
          <div className={ 'm-8 p-8 font-smaller-2 row-even' } style={ { minWidth : '400px' } }>No due dates</div>
        </ConditionalRendering>
        <table className={ 'w-100' } data-action-root>
          <tbody>
            { ( dueDates || [] ).map( ( dueDate : TDueDates, index : number ) => {
              return <DueDateRow key={ index } dueDate={ dueDate } index={ index }/>
            } ) }
          </tbody>
        </table>
      </div>
      <div className={ `hw-invoice-due-date-form-inline${ totalDiff > 0 ? ' animation-3d-scale-in' : ' animation-3d-scale-out' }` }>
        <ConditionalRendering condition={ totalDiff > 0 } timeout={ 200 }>
          { isReturnInvoice ?
            <ReturnInvoiceDueDateFormInline returnInvoiceId={ invoiceId as string }/>
            : <InvoiceDueDateFormInline invoiceId={ invoiceId as string }/> }
        </ConditionalRendering>
      </div>
    </div>
  )
}

interface IDueDatesRowProps {
  dueDate : TDueDates
  index : number
}

export const DueDateRow = ( { dueDate, index } : IDueDatesRowProps ) => {
  const id = dueDate.id ? dueDate.id : index
  return (
    <tr key={ index } className={ `border-bottom${ index % 2 === 1 ? ' row-odd' : ' row-even' }` }>
      <td style={ { width : '20%' } }>
        <div className={ 'font-smaller-2  letter-spacing ml-2' }>{ formatDateLong( dueDate.date as string ) }</div>
      </td>
      <td>
        <div className={ 'font-smaller-2 d-flex justify-content-start' }>&nbsp;{ formatPrice( dueDate.finance as number ) }&nbsp;</div>
      </td>
      <td style={ { width : 50 } }>
        <div className={ 'd-flex justify-content-between align-items-center px-2' }>
          <div
                        className={ 'px-1 button-effect' }
                        data-action={ CONSTANT_INVOICE.EVENTS.HEADER.DUE_DATES_REMOVE }
                        data-action-id={ id }
          >
            <FontAwesomeIcon className={ 'color-danger' } icon={ faTimes }/>
          </div>
        </div>
      </td>
    </tr>
  )
}

export const InvoiceDueDateView = ( { invoiceId } : { invoiceId : string } ) => {
  const { invoice } = useInvoiceForm( invoiceId )
  return <DueDateView invoice={ invoice }/>
}

export const ReturnInvoiceDueDateView = ( { returnInvoiceId } : { returnInvoiceId : string } ) => {
  const { returnInvoice } = useReturnInvoiceForm( returnInvoiceId )
  return <DueDateView invoice={ returnInvoice } isReturnInvoice/>

}
