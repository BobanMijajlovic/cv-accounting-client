import React, {
  useEffect,
  useMemo
}                           from 'react'
import {Switch}             from 'react-router-dom'
import {
  Route,
  withRouter
}                           from 'react-router'
import AuthNavBar           from '../../../components/Navbars/AuthNavBar'
import {
  APP_LAYOUT,
  APPLICATION_MAIN_SUB_DOMAIN
}                           from '../../constants'
import {ComponentLazy}      from '../../../helpers/Helpers'
import {setUseAccessToken}  from '../../../apollo/accessToken'
import RedirectedStatusForm from '../../components/util/RedirectedStatusForms'
import {toBoolean}          from 'validator'

const Login = React.lazy(() => (import('../../ auth/Login')))
const RegisterForm = React.lazy(() => (import('../../ auth/forms/RegistrationForm')))
const ForgotPasswordForm = React.lazy(() => (import('../../ auth/forms/ForgotPasswordForm')))
const ChangePasswordForm = React.lazy(() => (import('../../ auth/forms/ChangePasswordForm')))
const ConfirmRegistration = React.lazy(() => (import('../../ auth/forms/ConfirmRegistration')))

const Layout = () => {

  const pathAuth = React.useCallback((link: string) => {
    return `/${APPLICATION_MAIN_SUB_DOMAIN}/${APP_LAYOUT.AUTH}/${link}`
  }, [])

  useEffect(() => {
    setUseAccessToken(false)
  }, [])

  const isSaleMode = useMemo(() => toBoolean((process.env as any).REACT_APP_SALE_MODE), [])

  return (
    <div className={'hw-app-layout-auth'}>
      <AuthNavBar/>
      <div className={'hw-app-layout-auth-data w-100'}>
        <Switch>
          <Route path={pathAuth('login')}><ComponentLazy component={Login}/></Route>

          <Route path={pathAuth('lock')}>
            <div>Lock</div>
          </Route>
          <Route path={pathAuth('forgot-password')}><ComponentLazy component={ForgotPasswordForm}/></Route>
          <Route path={pathAuth('change-password')}><ComponentLazy component={ChangePasswordForm}/></Route>
          <Route path={pathAuth('success-request-password-changed')}>
            <RedirectedStatusForm
                            title={'Request to change password!'}
                            text={'you have successfully requested to perform change!'}
                            sub={'Please check your email to complete action.'}
                            link={'success-request-password-changed'}
                            redirectLayout={APP_LAYOUT.AUTH}
                            redirectLink={'login'}
            />
          </Route>

          <Route path={pathAuth('success-password-changed')}>
            <RedirectedStatusForm
                            title={'Password changed!'}
                            text={'you have successfully performed change!'}
                            sub={'Please to to login page'}
                            link={'success-password-changed'}
                            redirectLayout={APP_LAYOUT.AUTH}
                            redirectLink={'login'}
            />
          </Route>
          {
            !isSaleMode ? (
              <>
                <Route path={pathAuth('register')}><ComponentLazy component={RegisterForm}/></Route>
                <Route path={pathAuth('confirm-registration')}><ComponentLazy component={ConfirmRegistration}/></Route>
                <Route path={pathAuth('success-registration')}>
                  <RedirectedStatusForm
                                        title={'Account Successfully Registered !'}
                                        text={'you have successfully completed user registration!'}
                                        sub={'Please check your email to complete activation.'}
                                        link={'success-registration'}
                                        redirectLayout={APP_LAYOUT.AUTH}
                                        redirectLink={'login'}
                  />
                </Route>
              </>
            ) : null
          }
        </Switch>
      </div>
    </div>
  )
}

export default withRouter(Layout)
