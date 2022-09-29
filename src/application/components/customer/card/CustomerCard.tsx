import React                    from 'react'
import CustomerFinanceBalance   from './CustomerFinacneBalance'
import CustomerFinanceFuture    from './CustomerFinanceFuture'
import { get as _get }          from 'lodash'
import { useCustomerDashboard } from '../../../../store/customer/useCustomer'
import CustomerInfoView         from '../views/CustomerInfoView'
import CardTable                from './CardTable'

const CustomerCard = () => {
  const {data} = useCustomerDashboard()
  const customerId = React.useMemo(() => _get(data, 'selected.id'), [data])

  return (
    <div className={'d-flex flex-column align-items-start overflow-hidden w-100 h-100 px-3 py-1'}>
      <CustomerInfoView/>
      <div className={'d-flex justify-content-between align-items-start pb-3 w-100'}>
        <CustomerFinanceBalance customerId={customerId}/>
        <CustomerFinanceFuture customerId={customerId}/>
      </div>
      <CardTable customerId={customerId}/>
    </div>
  )
}

export default CustomerCard
