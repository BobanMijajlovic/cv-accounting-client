import React           from 'react'
import {Route, withRouter}         from 'react-router'
import {ComponentLazy} from '../../../../helpers/Helpers'
import {Switch}        from 'react-router-dom'

const UserView = React.lazy( () => import('../../../components/user/User') )
const ItemDashboard = React.lazy( () => import('../../../components/items/Dashboard') )
const CustomerDashboard = React.lazy( () => import('../../../components/customer/Dashboard') )
const Settings = React.lazy( () => import('../../../components/settings/SettingsDashboard') )
const Selling = React.lazy( () => import('../../../components/sale/SaleDashboard') )

const SaleRoots = () => {
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
      <Route path={ '/application/main/sale' }>
        <ComponentLazy component={ Selling }/>
      </Route>
      <Route path={ '/application/main/settings' }>
        <ComponentLazy component={ Settings }/>
      </Route>
    </Switch>
  )
}

export default withRouter(SaleRoots)