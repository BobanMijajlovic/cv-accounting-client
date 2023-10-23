import React                      from 'react'
import { TInvoice }               from '../../../../../graphql/type_logic/types'
import {
  formatDateLong,
  formatPrice
}                                 from '../../../../utils/Utils'
import ComponentRender            from '../../../../../components/Util/ComponentRender'
import { useTranslationFunction } from '../../../../../components/Translation/useTranslation'

const NumberDate = ({invoice, handlerChangeDiscount,isPreview} : { invoice : TInvoice, handlerChangeDiscount : (field? : string) => void , isPreview ?: boolean}) => {
  const {translate} = useTranslationFunction()
  const discount = React.useMemo(() => invoice.discountDefault ? invoice.discountDefault : 0, [invoice])
  return (
    <div className={ 'd-flex flex-column justify-content-between align-items-center font-smaller-1 flex-fill' }>
      <div className={ 'd-flex flex-row pb-4 justify-content-between w-100' }>
        <ComponentRender label={ translate('INVOICE_MAIN_TABLE_TH_INVOICE_NUMBER') } value={ invoice.number } labelClass={ 'text-upper opacity-6 font-weight-normal' } classNames={ 'pr-4' }/>
        <ComponentRender label={ translate('INVOICE_FORM_LABEL_INVOICE_DISCOUNT') } title={!isPreview ? '' : translate('INVOICE_HEADER_TOOLTIP_DISCOUNT_TITLE') } handlerClick={ handlerChangeDiscount } value={ `${ formatPrice(discount) } %` } labelClass={ 'text-upper opacity-6 font-weight-normal' } classNames={ 'cursor-pointer' }/>
      </div>
      <div className={ 'd-flex flex-row pb-4 justify-content-between w-100' }>
        <ComponentRender label={ translate('INVOICE_FORM_LABEL_DATE_OF_INVOICE') } value={ invoice.date } format={ formatDateLong } labelClass={ 'text-upper opacity-6 font-weight-normal' } classNames={ 'pr-4' }/>
        <ComponentRender label={ '' } value={ '' } labelClass={ 'text-upper opacity-6 font-weight-normal' }/>
      </div>
    </div>
  )
}

export default NumberDate