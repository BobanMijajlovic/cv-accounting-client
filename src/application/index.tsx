import React, {useEffect} from 'react'
import '../assets/css/app/index.css'
import AuthLayout         from './layout/auth'
import {Switch}           from 'react-router-dom'
import {
  Redirect,
  Route,
  RouteComponentProps,
  withRouter
} from 'react-router'
import {ApolloProvider}   from '@apollo/react-hooks'
import MainLayout         from './layout/main'
import {client}           from '../apollo'
import {useApplication}   from './hooks/useApplication'
import ApolloAsyncCall    from '../graphql/ApolloAsyncCallClass'
import {get as _get}      from 'lodash'

const Component = withRouter((props : RouteComponentProps) => {

  const {redirectLink, clearLoggedUser, setLoggedUser} = useApplication()

  const setCurrentUser = React.useCallback(async (id : number) => {
    const result = await ApolloAsyncCall.user(id)
    setLoggedUser(_get(result, 'data.user'))
  }, [])

  useEffect(() => {
    ApolloAsyncCall.setLogInFun(setCurrentUser)
  }, [setCurrentUser])

  useEffect(() => {
    ApolloAsyncCall.setLogOutFun(clearLoggedUser)
  }, [clearLoggedUser])

  useEffect(() => {
    if (!redirectLink) {
      return
    }
    props.history.replace(redirectLink)
  }, [redirectLink, props.history])

  return (
    <div className={'hw-app-main'}>
      <Switch>
        <Route path={'/application/auth'}> <AuthLayout/></Route>
        <Route path={'/application/main'}> <MainLayout/></Route>
        <Route path={'/'}>
          <Redirect to={'/application/auth/login'} />
        </Route>
      </Switch>
    </div>
  )
})

const Application = () => {
  return (
    <ApolloProvider client={client}>
      <Component/>
    </ApolloProvider>
  )
}

export default withRouter(Application)
