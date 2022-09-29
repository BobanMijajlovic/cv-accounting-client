import React, { useMemo }                    from 'react'
import { FontAwesomeIcon }                   from '@fortawesome/react-fontawesome'
import {
  faCaretDown,
  faCaretLeft,
  faInfoCircle
}                                            from '@fortawesome/free-solid-svg-icons'
import _                                     from 'lodash'
import { TReturnInvoice }                    from '../../../../../../graphql/type_logic/types'
import { useTranslationFunction }            from '../../../../../../components/Translation/useTranslation'
import { CONSTANT_WAREHOUSE }                from '../../../../../constants'
import { useReturnInvoiceForm }              from '../../../../../../store/return-invoice/useReturnInvoice'
import { openDialogReturnInvoiceHeaderForm } from './Form'
import CustomerViewShort                     from '../../../../customer/views/CustomerViewShort'
import NumberDate                            from './NumberDate'
import DueDateView                           from '../../../../calculation/views/InstanceView/header/DueDateView'
import AdditionalExpenseView                 from '../../../../invoice/form/footer/AdditionalExpenseView'
import EmptyTag                              from '../../../../../../components/Util/EmptyTag'
import { formatDateLong }                    from '../../../../../utils/Utils'
import { openDialogReturnInvoiceFooterForm } from '../footer/FooterForm'
import { openReturnInvoiceDueDateDialog }    from '../footer/DueDateDialog'

interface IReturnInvoiceHeaderProps {
  returnInvoice : TReturnInvoice
  state : boolean
  handlerOpenCloseHeader : () => void
  isPreview? : boolean
}

const ReturnInvoiceHeader = ( { returnInvoice, state, handlerOpenCloseHeader, isPreview } : IReturnInvoiceHeaderProps ) => {
  const { translate } = useTranslationFunction()
  const returnInvoiceId = useMemo(() => returnInvoice && returnInvoice.id ? `${returnInvoice.id}` : '', [returnInvoice])
  const warehouseType = returnInvoice.flag === CONSTANT_WAREHOUSE.TYPES.WHOLESALE ? 'WHOLESALE' : 'RETAIL'
  const {  updateReturnInvoice } = useReturnInvoiceForm( returnInvoiceId )
  const handlerUpdateInvoiceHeader = async ( returnInvoice : TReturnInvoice ) => {
    await updateReturnInvoice(returnInvoice)
  }

  const handlerChangeHeader = ( fieldFocus? : string ) => {
    !isPreview && openDialogReturnInvoiceHeaderForm( {
      handlerSuccess : handlerUpdateInvoiceHeader,
      returnInvoiceId,
      fieldFocus
    } )
  }

  const handlerChangeDueDate = () => {
    !isPreview && returnInvoice.items && (returnInvoice.items || []).length !== 0 && openReturnInvoiceDueDateDialog({
      handlerSuccess: handlerUpdateInvoiceHeader,
      returnInvoiceId
    })
  }

  const handlerChangeFooter = () => {
    !isPreview && openDialogReturnInvoiceFooterForm( {
      handlerSuccess : handlerUpdateInvoiceHeader,
      returnInvoiceId
    } )
  }

  const { totalFinanceVP, totalFinanceTax } = returnInvoice || { totalFinanceVP : 0, totalFinanceTax : 0 }

  const totalByInvoice = React.useMemo( () => {
    return _.round( _.add( totalFinanceVP || 0, totalFinanceTax || 0 ), 2 )
  }, [totalFinanceVP, totalFinanceTax] )

  const field = useMemo( () => returnInvoice.customer && ( returnInvoice.customer as any ).shortName.length > 0 ? 'shortName' : 'fullName', [returnInvoice.customer] )

  return (
    <div className={ 'relative pr-2' }>
      {
        returnInvoice.customer && returnInvoice.number ?
          <div className={ 'absolute-right-top-2 cursor-pointer hw-show-hide-header-icon z-index-100' } onClick={ handlerOpenCloseHeader }>
            <FontAwesomeIcon icon={ state ? faCaretDown : faCaretLeft } style={ { fontSize : '30px' } }/>
          </div> : <></>
      }
      {
        state ?
          <div className={ 'd-flex flex-row align-items-start justify-content-between px-2 mt-2 mb-1 relative' }>
            <div className={ 'd-flex color-primary font-smaller-2 absolute-left-top' }>
              <div className={ 'pr-2' }><FontAwesomeIcon icon={ faInfoCircle }/></div>
              <div className={ 'text-upper' }>{ translate( 'LABEL_INVOICE' ) }</div>
            </div>
            <div className={ 'mt-4 mb-2 cursor-pointer hw-invoice-form-customer-view' }>
              <div className={ 'd-flex flex-column justify-content-between pb-1 pl-1 pr-2 relative' }>
                <div className={ 'hw-calculation-client-preview' } onClick={ () => handlerChangeHeader( 'customer' ) } title={ !isPreview ? '' : translate( 'INVOICE_HEADER_TOOLTIP_CUSTOMER_TITLE' ) }>
                  <CustomerViewShort customer={ returnInvoice.customer as any }/>
                </div>
                <div className={ 'pt-2 font-smaller-1' } onClick={ () => handlerChangeHeader( 'flag' ) } title={ !isPreview ? '' : translate( 'INVOICE_HEADER_TOOLTIP_WAREHOUSE_TYPE_TITLE' ) }>
                  { warehouseType }
                </div>
              </div>
            </div>
            <div className={ '' }>
              <NumberDate returnInvoice={ returnInvoice }/>
            </div>
            <div className={ 'cursor-pointer' } title={ !isPreview ? '' : translate( 'INVOICE_HEADER_TOOLTIP_DUE_DATES_TITLE' ) } onClick={ handlerChangeDueDate }>
              <DueDateView dueDate={ returnInvoice.dueDates } total={ totalByInvoice }/>
            </div>
            <div className={ 'cursor-pointer' } title={ !isPreview ? '' : translate( 'INVOICE_HEADER_TOOLTIP_ADDITIONAL_EXPENSES_TITLE' ) } onClick={ handlerChangeFooter }>
              <AdditionalExpenseView expense={ returnInvoice.expense }/>
            </div>
          </div>
          :
          <div className={ `d-flex flex-row align-items-center justify-content-between px-2 mb-1 font-smaller-2 color-primary ${ state ? ' hw-height-effect' : '' }` }>
            <div className={ 'font-bold text-upper d-flex flex-column text-center' }>
              <div className={ 'font-smaller-6 opacity-6 hw-show-hide-header-label' }>CUSTOMER NAME</div>
              <EmptyTag model={ returnInvoice.customer } field={ field } placeholder={ 'CUSTOMER NAME' }/>
            </div>
            <div className={ 'font-bold text-upper d-flex flex-column text-center' }>
              <div className={ 'font-smaller-6 opacity-6 font-weight-600 hw-show-hide-header-label text-center' }>warehouse type</div>
              { warehouseType }
            </div>
            <div className={ 'font-bold text-upper d-flex flex-column text-center' }>
              <div className={ 'font-smaller-6 opacity-6 font-weight-600 hw-show-hide-header-label text-center' }>invoice number</div>
              <EmptyTag model={ returnInvoice } field={ 'number' } placeholder={ 'INVOICE NUMBER' }/>
            </div>
            <div className={ 'font-bold text-upper d-flex flex-column text-center' }>
              <div className={ ' font-smaller-6 opacity-6 hw-show-hide-header-label text-center' }>invoice date</div>
              { ( returnInvoice as any ).date ? formatDateLong( returnInvoice.date ) : 'INVOICE DATE' }
            </div>
          </div>
      }
    </div>
  )
}

export default ReturnInvoiceHeader
