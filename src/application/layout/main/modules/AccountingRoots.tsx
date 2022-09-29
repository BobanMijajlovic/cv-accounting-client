import React           from 'react'
import {Route,
  withRouter}         from 'react-router'
import {ComponentLazy} from '../../../../helpers/Helpers'
import {Switch}        from 'react-router-dom'

const UserView = React.lazy( () => import('../../../components/user/User') )
const ItemDashboard = React.lazy( () => import('../../../components/items/Dashboard') )
const CustomerDashboard = React.lazy( () => import('../../../components/customer/Dashboard') )
const WarehouseView = React.lazy( () => import('../../../components/warehouse/Warehouse') )
const Calculation = React.lazy( () => import('../../../components/calculation/Calculation') )
const Invoice = React.lazy( () => import('../../../components/invoice/Invoice') )
const Settings = React.lazy( () => import('../../../components/settings/SettingsDashboard') )
const Selling = React.lazy( () => import('../../../components/sale/SaleDashboard') )
const BankTransaction = React.lazy( () => import('../../../components/bank-transaction/BankTransactionTabs') )
const ClientDashboard = React.lazy( () => import('../../../components/client/Dashboard') )
const ProformaInvoice = React.lazy( () => import('../../../components/proforma-invoice/ProformaInvoice') )
const ReturnInvoice = React.lazy( () => import('../../../components/return-invoice/ReturnInvoice') )
const AdvanceInvoice = React.lazy( () => import('../../../components/finance-transfer-document/AdvanceInvoice') )
const FinanceTransferDocument = React.lazy( () => import('../../../components/finance-transfer-document/FinanceTransferDocument') )
const Normative = React.lazy( () => import('../../../components/normative/Dashboard') )
const ProductionOrder = React.lazy(() => import('../../../components/production-order/ProductionOrder'))

const  AccountingRoots = () => {
  return (
    <Switch>
      <Route path={ '/application/main/customers' }>
        <ComponentLazy component={ CustomerDashboard }/>
      </Route>
      <Route path={ '/application/main/items' }>
        <ComponentLazy component={ ItemDashboard }/>
      </Route>
      <Route path={ '/application/main/users' }>
        <ComponentLazy component={ UserView }/>
      </Route>
      <Route path={ '/application/main/warehouses' }>
        <ComponentLazy component={ WarehouseView }/>
      </Route>
      <Route path={ '/application/main/calculations' }>
        <ComponentLazy component={ Calculation }/>
      </Route>
      <Route path={ '/application/main/settings' }>
        <ComponentLazy component={ Settings }/>
      </Route>
      <Route path={ '/application/main/sale' }>
        <ComponentLazy component={ Selling }/>
      </Route>
      <Route path={ '/application/main/invoice' }>
        <ComponentLazy component={ Invoice }/>
      </Route>
      <Route path={ '/application/main/bank-transaction' }>
        <ComponentLazy component={ BankTransaction }/>
      </Route>
      <Route path={ '/application/main/client' }>
        <ComponentLazy component={ ClientDashboard }/>
      </Route>
      <Route path={ '/application/main/proforma-invoice' }>
        <ComponentLazy component={ ProformaInvoice }/>
      </Route>
      <Route path={ '/application/main/return-invoice' }>
        <ComponentLazy component={ ReturnInvoice }/>
      </Route>
      <Route path={ '/application/main/advance-invoice' }>
        <ComponentLazy component={ AdvanceInvoice }/>
      </Route>
      <Route path={ '/application/main/finance-transfer-document' }>
        <ComponentLazy component={ FinanceTransferDocument }/>
      </Route>
      <Route path={ '/application/main/normative' }>
        <ComponentLazy component={ Normative }/>
      </Route>
      <Route path={ '/application/main/production-order' }>
        <ComponentLazy component={ ProductionOrder }/>
      </Route>
    </Switch>
  )
}

export default withRouter(AccountingRoots)