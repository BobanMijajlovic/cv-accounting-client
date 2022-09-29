import React      from 'react'
import {
  Redirect,
  Route,
  Switch
}                 from 'react-router'
import {IconProp} from '@fortawesome/fontawesome-svg-core'

export interface IRoutesProps {
  name ?: string,
  path ?: string,
  exact ?: boolean,
  icon ?: IconProp,
  views ?: IRoutesProps[],
  collapse ?: boolean,
  component ?: any
}

const getRoutes = (routes : any) => {
  return routes.map((route : IRoutesProps,key : number) => {
    if (route.collapse) {
      return getRoutes(route.views)
    }

    if (route.path) {

      if (route.path === '/') {
        return (
          <Route key={key} path={'/'}>
            <Redirect to={'/account-form'}/>
          </Route>
        )
      }
      return (
        <Route
              key={key}
              exact={route.exact}
              path={route.path}
              component={route.component}
        />
      )
    }
  })
}

const Roots = ({routes} : any) => {
  return (
    <div >
      <Switch>
        {getRoutes(routes)}
      </Switch>
    </div>
  )
}

export default Roots
