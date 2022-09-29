import React                  from 'react'
import CustomerFinanceBalance from '../customer/card/CustomerFinacneBalance'
import CustomerFinanceFuture  from '../customer/card/CustomerFinanceFuture'

const ClientDashboard = () => {

  return (
    <div className={ 'd-flex flex-column align-items-start relative w-100 h-100 px-3 py-3' }>
      <div className={ 'd-flex justify-content-between align-items-start pb-3 w-100' }>
        <CustomerFinanceBalance/>
        <CustomerFinanceFuture/>
      </div>
    </div>
  )
}

export default ClientDashboard