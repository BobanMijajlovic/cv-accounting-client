import React, { useMemo }         from 'react'
import {
  TAddress,
  TBankAccount,
  TCustomer
}                                 from '../../../../graphql/type_logic/types'
import EmptyTag                   from '../../../../components/Util/EmptyTag'
import ConditionalRendering       from '../../../../components/Util/ConditionalRender'
import { CONSTANT_ADDRESS }       from '../../../constants'
import { get as _get }            from 'lodash'
import { useTranslationFunction } from '../../../../components/Translation/useTranslation'

export interface ICustomerViewProps {
  customer: TCustomer,
  classNames?: string
}

const CustomerView = ({customer, classNames}: ICustomerViewProps) => {

  const { translate } = useTranslationFunction()
  const address = useMemo(() => {
    if (!customer || !customer.addresses || (customer.addresses as any).length < 0) {
      return undefined
    }
    const {addresses} = customer
    const address = (addresses as any).find((x: TAddress) => x.type === CONSTANT_ADDRESS.TYPES.HEADQUARTERS) as TAddress
    let addressStr = `${address.street}, ${address.city} ${address.zipCode}`
    if (address.state) {
      addressStr = `${addressStr}, ${address.state}`
    }
    return address ? addressStr : ''
  }, [customer])

  const banks = useMemo(() => !customer || !customer.banks || (customer.banks as any).length < 0 ? undefined : customer.banks as any, [customer])

  return (
    <div className={`text-align-left relative p-2 hw-customer-external-view${classNames ? ` ${classNames}` : ''}`}>
      <div className={'d-flex  flex-column justify-content-center text-align-left'}>
        <div className={'font-bold text-upper font-smaller-2'}><EmptyTag model={customer} field={'shortName'} placeholder={translate('LABEL_CUSTOMER_NAME')}/></div>
        <small className={''}><EmptyTag model={customer} field={'fullName'} placeholder={translate('LABEL_CUSTOMER_FULL_NAME')}/> </small>
      </div>
      <div className={'d-flex  flex-row justify-content-between py-1'}>
        <div className={'d-flex flex-row align-items-center pt-1 font-smaller-2 text-upper'}>
          <sub className={ 'opacity-6' }>{ translate('ITEM_LABEL_SUPPLIER_TAX_ID') }&nbsp;:</sub>
          <div className={'pl-1'}><EmptyTag model={customer} field={'taxNumber'} placeholder={'#########'}/>
          </div>
        </div>
        <div className={'d-flex flex-row align-items-center px-1 font-smaller-2 text-upper'}>
          <sub className={ 'opacity-6' }>{ translate('LABEL_COMPANY_NUM') }&nbsp;:</sub>
          <div className={'pl-1'}><EmptyTag model={customer} field={'uniqueCompanyNumber'} placeholder={'#########'}/>
          </div>
        </div>
      </div>
      <div className={'font-smaller-3 text-upper pt-1'}>
        <div className={'font-smaller-4 opacity-6 pb-1'}>{ translate('LABEL_ADDRESS') }</div>
        <ConditionalRendering condition={!!address} placeHolder={'#############'}>
          {address}
        </ConditionalRendering>
      </div>
      <div className={'d-flex flex-column pt-1 font-smaller-3'}>
        <div className={'font-smaller-4 opacity-6 pb-1 text-upper'}>{ translate('LABEL_BANKS') }</div>
        <ConditionalRendering condition={!!banks} placeHolder={'#############'}>
          <CustomerBankView banks={banks}/>
        </ConditionalRendering>
      </div>
    </div>
  )
}

export default CustomerView

const CustomerBankView = ({banks}: { banks: TBankAccount[] }) => {
  return (
    <>
      {banks.map((bank, index) => {
        const bankName = _get(bank, 'bank.bankName', '')
        return (
          <div key={index} className={`d-flex justify-content-between align-items-center${index % 2 === 0 ? ' row-even' : ''}`}>
            <div>{bankName}</div>
            <div>{bank.account?.replace(/ /g,'-')}</div>
          </div>
        )
      })}
    </>
  )
}