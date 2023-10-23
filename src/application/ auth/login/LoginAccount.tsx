import React, {useEffect}                        from 'react'
import {IFieldsRefs, required, useValidation}    from '../../../validation'
import {RouteComponentProps, withRouter}      from 'react-router'
import {TLogin}                                  from '../../../graphql/type_logic/types'
import InputTextWithValidation                   from '../../../components/withValidation/InputTextWithValidation'
import {faKey, faUser}                           from '@fortawesome/free-solid-svg-icons'
import InputTextPasswordWithValidation           from '../../../components/withValidation/InputTextPasswordWithValidation'
import {NavLink}                                 from 'react-router-dom'
import {Button}                                  from '../../../components/Button'
import {get as _get}                             from 'lodash'
import ApolloAsyncCall                           from '../../../graphql/ApolloAsyncCallClass'
import {setAccessToken}                          from '../../../apollo/accessToken'
import {processError}                            from '../../../graphql/utils'
import {easyDialogError}                         from '../../../components/EasyModel/EasyModal'
import {useApplication}                          from '../../hooks/useApplication'
import {APP_LAYOUT, APPLICATION_MAIN_SUB_DOMAIN} from '../../constants'
import { useTranslationFunction }                from '../../../components/Translation/useTranslation'

const LoginAccount = (props : RouteComponentProps) => {
  const {translate} = useTranslationFunction()
  const validation = useValidation<TLogin>({
    initialData: {
      accountCode: 'test',
      userName: 'bobi123',
      password: 'test123!'
    }
  })

  const {setLoggedUser, loggedUser, setRedirectLink} = useApplication()

  useEffect(() => {
    if (loggedUser && loggedUser.id) {
      setRedirectLink(`/${APPLICATION_MAIN_SUB_DOMAIN}/${APP_LAYOUT.MAIN}/items`)

    }
  }, [loggedUser])

  const handlerOnSubmit = async () => {
    const {error, data,refs,validations} = await validation.validate()
    if (error) {
      const fieldRef : IFieldsRefs | undefined = refs.find(({field}) => _get(validations, `validations.${field}.error`))
      fieldRef && fieldRef.ref.current.focus()
      return
    }

    try {
      const result = await ApolloAsyncCall.login({
        accountCode: data.accountCode,
        userName: data.userName as string,
        password: data.password
      })
      setLoggedUser(_get(result, 'data.data.user'))
      setAccessToken(_get(result, 'data.data.token'))
    } catch (e) {
      const s = processError(e, validation as any)
      if (s) {
        easyDialogError(s)
      }
    }
  }

  return ( 
    <div className={'hw-login-root'}>
      <InputTextWithValidation
            required
            focusOnMount
            selectOnFocus
            icon={{icon:faUser}}
            label={translate('LABEL_ACCOUNT')}
            helperText={translate('HELPER_TEXT_ACCOUNT')}
            validation={{
              useValidation: validation,
              model: 'accountCode',
              rule: {
                required,
              }
            }}
      />
      <InputTextWithValidation
            required
            selectOnFocus
            icon={{icon:faUser}}
            label={translate('LABEL_USERNAME')}
            helperText={translate('HELPER_TEXT_USERNAME')}
            validation={{
              useValidation: validation,
              model: 'userName',
              rule: {
                required
              }
            }}
      />

      <InputTextPasswordWithValidation
            required
            selectOnFocus
            icon={{icon:faKey}}
            type={'password'}
            label={translate('LABEL_PASSWORD')}
            helperText={translate('HELPER_TEXT_PASSWORD')}
            validation={{
              useValidation: validation,
              model: 'password',
              rule: {
                required
              }
            }}
      />

      <div className={'hw-login-forgot-password'}>
        <NavLink to={'/application/auth/forgot-password'}>{translate('FORGOT_PASSWORD_LINK')}</NavLink>
      </div>

      <div className={'hw-login-form-button'}>
        <Button classNames={'text-upper'} color={'primary'} outline label={translate('LOGIN_FORM_BUTTON')} onClick={handlerOnSubmit}/>
      </div>
    </div>
  )

}

export default withRouter(LoginAccount)
