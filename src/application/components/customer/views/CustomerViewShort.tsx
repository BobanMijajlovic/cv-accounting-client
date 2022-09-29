import React, { useMemo }         from 'react'
import EmptyTag                   from '../../../../components/Util/EmptyTag'
import { TCustomer }              from '../../../../graphql/type_logic/types'
import { useTranslationFunction } from '../../../../components/Translation/useTranslation'

export interface ICustomerViewBasicProps {
  customer : TCustomer
  error? : boolean | string
  namePlaceholder? : string
  classNames? : string
  supplier ?: boolean
}

const CustomerViewShort = ({customer, error, namePlaceholder, classNames, supplier} : ICustomerViewBasicProps) => {
  const {translate} = useTranslationFunction()
  const field = useMemo(() => customer && customer.shortName && customer.shortName.length > 0 ? 'shortName' : 'fullName', [customer])

  return (
    <div className={`hw-customer-view-short-root px-2${ classNames ? ` ${ classNames }` : '' }` }>
      <div className={ 'd-flex  flex-column justify-content-center text-align-left flex-wrap' }>
        <div className={ 'font-bold text-upper font-smaller-2' }>
          <EmptyTag model={ customer } field={ field } placeholder={ namePlaceholder ? namePlaceholder : translate(supplier ? 'LABEL_SUPPLIER' : 'LABEL_CUSTOMER_NAME') }/>
        </div>
        <div className={ 'd-flex flex-row align-items-center pt-2 font-smaller-2 text-upper' }>
          <sub className={ 'opacity-6 px-1' }>{ translate('ITEM_LABEL_SUPPLIER_TAX_ID') }&nbsp;:</sub>
          <div className={ ' ' }><EmptyTag model={ customer } field={ 'taxNumber' } placeholder={ '#########' }/>
          </div>
        </div>
      </div>
      <div className={ 'd-flex  flex-row justify-content-between py-1' }>
        <div className={ 'd-flex flex-row align-items-center px-1 font-smaller-2 text-upper' }>
          <sub className={ 'opacity-6' }>{ translate('LABEL_COMPANY_NUM') }&nbsp;:</sub>
          <div className={ 'px-1' }><EmptyTag model={ customer } field={ 'uniqueCompanyNumber' } placeholder={ '#########' }/>
          </div>
        </div>
      </div>
      { error && <div style={ {bottom : -10} } className={ 'error position-absolute font-smaller-2' }> { typeof error === 'string' ? error : 'Supplier is required field' }.</div> }
    </div>
  )
}

export default CustomerViewShort

export const CustomerName = ({data}: {data: TCustomer}) => {
  const {translate} = useTranslationFunction()
  if (data.shortName && data.fullName && data.fullName?.length > 32) {
    return (<small className={'text-upper'}><EmptyTag model={ data } field={ 'shortName' } placeholder={ translate( 'LABEL_SHORT_NAME' ) }/> </small>)
  }
  if (!data.shortName && data.fullName && data.fullName?.length > 0) {
    return (<small className={ 'text-overflow-170' }>{  data.fullName }</small>)
  }
  return ( 
    <>
      <small className={'text-upper'}><EmptyTag model={ data } field={ 'shortName' } placeholder={ translate( 'LABEL_SHORT_NAME' ) }/> </small>
      <small className={ 'text-overflow-170' }>{  data.fullName }</small>
    </>
  )
}