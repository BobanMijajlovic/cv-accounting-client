import React, { useEffect }    from 'react'
import {
  required,
  useValidation
}                              from '../../../validation'
import {
  RouteComponentProps,
  withRouter
}                              from 'react-router'
import { TLogin }              from '../../../graphql/type_logic/types'
import InputTextWithValidation from '../../../components/withValidation/InputTextWithValidation'

import { isEmail }                     from 'validator'
import InputTextPasswordWithValidation from '../../../components/withValidation/InputTextPasswordWithValidation'
import { NavLink }                     from 'react-router-dom'
import { Button }                      from '../../../components/Button'
import ApolloAsyncCall                 from '../../../graphql/ApolloAsyncCallClass'
import { useApplication }              from '../../hooks/useApplication'
import {
  APP_LAYOUT,
  APPLICATION_MAIN_SUB_DOMAIN
}                                      from '../../constants'

import { get as _get }            from 'lodash'
import { faUser }                 from '@fortawesome/free-regular-svg-icons'
import { faKey }                  from '@fortawesome/free-solid-svg-icons'
import { setAccessToken }         from '../../../apollo/accessToken'
import { processErrorGraphQL }    from '../../../apollo'
import { useTranslationFunction } from '../../../components/Translation/useTranslation'

const LoginNormal = (props : RouteComponentProps) => {
  const {translate:t} = useTranslationFunction()
  const validation = useValidation<TLogin>({
    initialData: {
      userName: 'boban.mijajlovic.rs@gmail.com',
      password: 'test123!'
    }
  })

  const {setLoggedUser, loggedUser, setRedirectLink} = useApplication()

  useEffect(() => {
    if (loggedUser?.id) {
      setRedirectLink(`/${APPLICATION_MAIN_SUB_DOMAIN}/${APP_LAYOUT.MAIN}/items`)
    }
  }, [loggedUser])

  const handlerOnSubmit = async () => {
    const {error, data: data} = await validation.validate()
    if (error) {
      return
    }
    try {
      const result = await ApolloAsyncCall.login({
        userName: data.userName as string,
        password: data.password
      })
      setLoggedUser(_get(result, 'data.data.user'))
      setAccessToken(_get(result, 'data.data.token'))
    } catch (e) {
      processErrorGraphQL(e,validation)
    }
  }

  return (
    <div className={'hw-login-root'}>
      <InputTextWithValidation
                required
                focusOnMount
                selectOnFocus
                icon={{
                  icon: faUser
                }}
                label={t('LABEL_USERNAME')}
                helperText={t('HELPER_TEXT_USERNAME')}
                validation={{
                  useValidation: validation,
                  model: 'userName',
                  rule: {
                    required,
                    useValidator: [
                      {
                        validator: isEmail,
                        message: 'Email is not valid'
                      }
                    ]
                  }
                }}
      />

      <InputTextPasswordWithValidation
                required
                selectOnFocus
                icon={{
                  icon: faKey
                }}
                type={'password'}
                label={t('LABEL_PASSWORD')}
                helperText={t('HELPER_TEXT_PASSWORD')}
                validation={{
                  useValidation: validation,
                  model: 'password',
                  rule: {
                    required
                  }
                }}
      />

      <div className={'hw-login-forgot-password'}>
        <NavLink to={'/application/auth/forgot-password'}>{t('FORGOT_PASSWORD_LINK')}</NavLink>
      </div>

      <div className={'hw-login-form-button text-upper'}>
        <Button classNames={'text-upper'} color={'primary'} outline label={t('LOGIN_FORM_BUTTON')} onClick={handlerOnSubmit}/>
      </div>
    </div>

  )

}

export default withRouter(LoginNormal)
