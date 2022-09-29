import React                      from 'react'
import ComponentRender            from '../../../../../../components/Util/ComponentRender'
import { useTranslationFunction } from '../../../../../../components/Translation/useTranslation'
import { TReturnInvoice }         from '../../../../../../graphql/type_logic/types'
import { formatDateLong }         from '../../../../../utils/Utils'

const NumberDate = ( { returnInvoice } : { returnInvoice : TReturnInvoice } ) => {
  const { translate } = useTranslationFunction()
  return (
    <div className={ 'd-flex flex-column justify-content-between align-items-center font-smaller-1 flex-fill' }>
      <div className={ 'd-flex flex-row pb-4 justify-content-between w-100' }>
        <ComponentRender label={ translate( 'INVOICE_MAIN_TABLE_TH_INVOICE_NUMBER' ) } value={ returnInvoice.number } labelClass={ 'text-upper opacity-6 font-weight-normal' } classNames={ 'pr-4' }/>
        <ComponentRender label={ translate( 'INVOICE_FORM_LABEL_DATE_OF_INVOICE' ) } value={ returnInvoice.date } format={ formatDateLong } labelClass={ 'text-upper opacity-6 font-weight-normal' } classNames={ 'pr-4' }/>
      </div>
    </div>
  )
}

export default NumberDate