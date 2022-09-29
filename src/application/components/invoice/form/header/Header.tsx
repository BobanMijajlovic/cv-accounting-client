import React, { useMemo }              from 'react'
import DueDateView                     from '../../../calculation/views/InstanceView/header/DueDateView'
import { FontAwesomeIcon }             from '@fortawesome/react-fontawesome'
import {
  faCaretDown,
  faCaretLeft,
  faInfoCircle
}                                      from '@fortawesome/free-solid-svg-icons'
import { TInvoice }                    from '../../../../../graphql/type_logic/types'
import EmptyTag                        from '../../../../../components/Util/EmptyTag'
import {
  formatDateLong,
  formatPrice
}                                      from '../../../../utils/Utils'
import NumberDate                      from './NumberDate'
import AdditionalExpenseView           from '../footer/AdditionalExpenseView'
import CustomerViewShort               from '../../../customer/views/CustomerViewShort'
import { CONSTANT_WAREHOUSE }          from '../../../../constants'
import { useInvoiceForm }              from '../../../../../store/invoice/useInvoice'
import { openDialogInvoiceHeaderForm } from './Form'
import { openInvoiceDueDateDialog }    from '../footer/DueDateDialog'
import { openDialogInvoiceFooterForm } from '../footer/FooterForm'
import { useTranslationFunction }      from '../../../../../components/Translation/useTranslation'
import _                               from 'lodash'

interface IInvoiceHeaderProps {
  invoice: TInvoice
  state: boolean
  handlerOpenCloseHeader: ()=> void
  isPreview?: boolean
}

const InvoiceHeader = ({ invoice, state, handlerOpenCloseHeader, isPreview }: IInvoiceHeaderProps) => {
  const { translate } = useTranslationFunction()
  const discount = React.useMemo(() => invoice.discountDefault ? invoice.discountDefault : 0, [invoice])
  const warehouseType = invoice.flag === CONSTANT_WAREHOUSE.TYPES.WHOLESALE ? 'WHOLESALE' : 'RETAIL'

  const invoiceId = useMemo(() => invoice && invoice.id ? `${invoice.id}` : '', [invoice])
  const { updateInvoice } = useInvoiceForm(`${invoice.id}`, false)

  const handlerUpdateInvoiceHeader = async (invoice: TInvoice) => {
    await updateInvoice(invoice)
  }

  const handlerChangeHeader = (fieldFocus?: string) => {
    !isPreview && openDialogInvoiceHeaderForm({
      handlerSuccess: handlerUpdateInvoiceHeader,
      invoiceId,
      fieldFocus
    })
  }

  const handlerChangeDueDate = () => {
    !isPreview && invoice.items && (invoice.items || []).length !== 0 && openInvoiceDueDateDialog({
      handlerSuccess: handlerUpdateInvoiceHeader,
      invoiceId
    })
  }

  const handlerChangeFooter = () => {
    !isPreview && openDialogInvoiceFooterForm({
      handlerSuccess: handlerUpdateInvoiceHeader,
      invoiceId
    })
  }

  const { totalFinanceVP, totalFinanceTax } = invoice || { totalFinanceVP: 0, totalFinanceTax: 0 }

  const totalByInvoice = React.useMemo(() => {
    return _.round(_.add(totalFinanceVP || 0, totalFinanceTax || 0), 2)
  }, [totalFinanceVP, totalFinanceTax])

  const field = useMemo(() => invoice.customer && (invoice.customer as any).shortName.length > 0 ? 'shortName' : 'fullName', [invoice.customer])

  return (
    <div className={'relative pr-2'}>
      {
        invoice.customer && invoice.number ?
          <div className={'absolute-right-top-2 cursor-pointer hw-show-hide-header-icon z-index-100'} onClick={handlerOpenCloseHeader}>
            <FontAwesomeIcon icon={state ? faCaretDown : faCaretLeft} style={{ fontSize: '30px' }}/>
          </div> : <></>
      }
      {
        state ?
          <div className={'d-flex flex-row align-items-start justify-content-between px-2 mt-2 mb-1 relative'}>
            <div className={'d-flex color-primary font-smaller-2 absolute-left-top'}>
              <div className={'pr-2'}><FontAwesomeIcon icon={faInfoCircle}/></div>
              <div className={'text-upper'}>{translate('LABEL_INVOICE')}</div>
            </div>
            <div className={'mt-4 mb-2 cursor-pointer hw-invoice-form-customer-view'}>
              <div className={'d-flex flex-column justify-content-between pb-1 pl-1 pr-2 relative'}>
                <div className={'hw-calculation-client-preview'} onClick={() => handlerChangeHeader('customer')} title={!isPreview ? '' : translate('INVOICE_HEADER_TOOLTIP_CUSTOMER_TITLE')}>
                  <CustomerViewShort customer={invoice.customer as any}/>
                </div>
                <div className={'pt-2 font-smaller-1'} onClick={() => handlerChangeHeader('flag')} title={!isPreview ? '' : translate('INVOICE_HEADER_TOOLTIP_WAREHOUSE_TYPE_TITLE')}>
                  {warehouseType}
                </div>
              </div>
            </div>
            <div className={''}>
              <NumberDate invoice={invoice} isPreview={isPreview} handlerChangeDiscount={handlerChangeHeader}/>
            </div>
            <div className={'cursor-pointer'} title={!isPreview ? '' : translate('INVOICE_HEADER_TOOLTIP_DUE_DATES_TITLE')} onClick={handlerChangeDueDate}>
              <DueDateView dueDate={invoice.dueDates} total={totalByInvoice}/>
            </div>
            <div className={'cursor-pointer'} title={!isPreview ? '' : translate('INVOICE_HEADER_TOOLTIP_ADDITIONAL_EXPENSES_TITLE')} onClick={handlerChangeFooter}>
              <AdditionalExpenseView expense={invoice.expense}/>
            </div>
          </div>
          :
          <div className={ `d-flex flex-row align-items-center justify-content-between px-2 mb-1 font-smaller-2 color-primary ${ state ? ' hw-height-effect' : '' }` }>
            <div  className={ 'font-bold text-upper d-flex flex-column text-center' }>
              <div className={ 'font-smaller-6 opacity-6 hw-show-hide-header-label' }>CUSTOMER NAME</div>
              <EmptyTag model={ invoice.customer } field={ field } placeholder={ 'CUSTOMER NAME' }/>
            </div>
            <div className={ 'font-bold text-upper d-flex flex-column text-center' }>
              <div className={ 'font-smaller-6 opacity-6 font-weight-600 hw-show-hide-header-label text-center' }>warehouse type</div>
              { warehouseType }
            </div>
            <div className={ 'font-bold text-upper d-flex flex-column text-center' }>
              <div className={ 'font-smaller-6 opacity-6 font-weight-600 hw-show-hide-header-label text-center' }>invoice number</div>
              <EmptyTag model={ invoice } field={ 'number' } placeholder={ 'INVOICE NUMBER' }/>
            </div>
            <div className={ 'font-bold text-upper d-flex flex-column text-center' }>
              <div className={ ' font-smaller-6 opacity-6 hw-show-hide-header-label text-center' }>invoice date</div>
              { ( invoice as any ).date ? formatDateLong( invoice.date ) : 'INVOICE DATE' }
            </div>
            <div  className={ 'font-bold text-upper d-flex flex-column text-center' }>
              <div className={ ' font-smaller-6 opacity-6 hw-show-hide-header-label text-center' }>invoice discount</div>
              { formatPrice( discount ) } %
            </div>
          </div>
      }
    </div>
  )
}

export default InvoiceHeader
