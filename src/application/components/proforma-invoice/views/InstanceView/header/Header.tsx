import { TProformaInvoice }                    from '../../../../../../graphql/type_logic/types'
import React, { useMemo }                      from 'react'
import { CONSTANT_WAREHOUSE }                  from '../../../../../constants'
import { FontAwesomeIcon }                     from '@fortawesome/react-fontawesome'
import {
  faCaretDown,
  faCaretLeft,
  faInfoCircle
}                                              from '@fortawesome/free-solid-svg-icons'
import CustomerViewShort                       from '../../../../customer/views/CustomerViewShort'
import AdditionalExpenseView                   from '../../../../invoice/form/footer/AdditionalExpenseView'
import EmptyTag                                from '../../../../../../components/Util/EmptyTag'
import {
  formatDateLong,
  formatPrice
}                                              from '../../../../../utils/Utils'
import NumberDate                              from './NumberDate'
import { useProformaInvoiceForm }              from '../../../../../../store/proforma-invoice/useProformaInvoice'
import { openDialogProformaInvoiceHeaderForm } from './Form'
import { openDialogProformaInvoiceFooterForm } from '../footer/FooterForm'

interface IProformaInvoiceHeaderProps {
  proformaInvoiceId : string
  state : boolean
  handlerOpenCloseHeader : () => void
  isPreview? : boolean
}

const ProformaInvoiceHeader = ( { proformaInvoiceId, state, handlerOpenCloseHeader, isPreview } : IProformaInvoiceHeaderProps ) => {
  const { proformaInvoice, updateProformaInvoice } = useProformaInvoiceForm( proformaInvoiceId )
  const discount = React.useMemo( () => proformaInvoice.discount && ( proformaInvoice as any ).discount.length !== 0 ? ( proformaInvoice as any ).discount[0].percent : 0, [proformaInvoice] )
  const warehouseType = proformaInvoice.flag === CONSTANT_WAREHOUSE.TYPES.WHOLESALE ? 'WHOLESALE' : 'RETAIL'

  const handlerUpdateProformaInvoiceHeader = async ( proformaInvoice : TProformaInvoice ) => {
    await updateProformaInvoice( proformaInvoice )
  }

  const handlerChangeHeader = ( fieldFocus? : string ) => {
    !isPreview && openDialogProformaInvoiceHeaderForm( {
      handlerSuccess : handlerUpdateProformaInvoiceHeader,
      proformaInvoiceId,
      fieldFocus
    } )
  }

  const handlerChangeFooter = () => {
    !isPreview && openDialogProformaInvoiceFooterForm( {
      handlerSuccess : handlerUpdateProformaInvoiceHeader,
      proformaInvoiceId
    } )
  }

  const field = useMemo( () => proformaInvoice.customer && ( proformaInvoice.customer as any ).shortName.length > 0 ? 'shortName' : 'fullName', [proformaInvoice.customer] )

  return (
    <>
      {
        proformaInvoice.customer && proformaInvoice.number ?
          <div className={ 'absolute-right-top-2 cursor-pointer hw-show-hide-header-icon z-index-100' } onClick={ handlerOpenCloseHeader }>
            <FontAwesomeIcon icon={ state ? faCaretDown : faCaretLeft } style={ { fontSize : '30px' } }/>
          </div> : <></>
      }
      {
        state ?
          <div className={ 'd-flex flex-row align-items-start justify-content-between px-2 mb-1 relative' }>
            <div className={ 'd-flex color-primary font-smaller-2 absolute-left-top' }>
              <div className={ 'pr-2' }><FontAwesomeIcon icon={ faInfoCircle }/></div>
              <div>INVOICE</div>
            </div>
            <div className={ 'mt-4 mb-2 cursor-pointer hw-invoice-form-customer-view' }>
              <div className={ 'd-flex flex-column justify-content-between pb-1 pl-1 pr-2   relative' }>
                <div className={ 'hw-calculation-client-preview' } onClick={ () => handlerChangeHeader( 'customer' ) }>
                  <CustomerViewShort customer={ proformaInvoice.customer as any }/>
                </div>
                <div className={ 'pt-2 font-smaller-1' } onClick={ () => handlerChangeHeader( 'flag' ) }>
                  { warehouseType }
                </div>
              </div>
            </div>
            <div className={ '' }>
              <NumberDate proformaInvoice={ proformaInvoice } handlerChangeDiscount={ handlerChangeHeader }/>
            </div>
            <div className={ 'cursor-pointer' } onClick={ handlerChangeFooter }>
              <AdditionalExpenseView expense={ proformaInvoice.expense }/>
            </div>
          </div>
          :
          <div className={ `d-flex flex-row align-items-center justify-content-between px-2 mb-1 font-smaller-2 color-primary ${ state ? ' hw-height-effect' : '' }` }>
            <div  className={ 'font-bold text-upper d-flex flex-column text-center' }>
              <div className={ 'font-smaller-6 opacity-6 hw-show-hide-header-label' }>CUSTOMER NAME</div>
              <EmptyTag model={ proformaInvoice.customer } field={ field } placeholder={ 'CUSTOMER NAME' }/>
            </div>
            <div className={ 'font-bold text-upper d-flex flex-column text-center' }>
              <div className={ 'font-smaller-6 opacity-6 font-weight-600 hw-show-hide-header-label text-center' }>warehouse type</div>
              { warehouseType }
            </div>
            <div className={ 'font-bold text-upper d-flex flex-column text-center' }>
              <div className={ 'font-smaller-6 opacity-6 font-weight-600 hw-show-hide-header-label text-center' }>invoice number</div>
              <EmptyTag model={ proformaInvoice } field={ 'number' } placeholder={ 'INVOICE NUMBER' }/>
            </div>
            <div className={ 'font-bold text-upper d-flex flex-column text-center' }>
              <div className={ ' font-smaller-6 opacity-6 hw-show-hide-header-label text-center' }>invoice date</div>
              { ( proformaInvoice as any ).date ? formatDateLong( proformaInvoice.date ) : 'INVOICE DATE' }
            </div>
            <div  className={ 'font-bold text-upper d-flex flex-column text-center' }>
              <div className={ ' font-smaller-6 opacity-6 hw-show-hide-header-label text-center' }>invoice discount</div>
              { formatPrice( discount ) } %
            </div>
          </div>
      }
    </>
  )
}

export default ProformaInvoiceHeader
