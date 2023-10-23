import React, { useState }        from 'react'
import { Paper }                  from '../../components/Paper'
import LoginAccount               from './login/LoginAccount'
import LoginNormal                from './login/LoginNormal'
import { useTranslationFunction } from '../../components/Translation/useTranslation'

const Login = () => {

  const {translate: t} = useTranslationFunction()
  const [state, setState] = useState(false)

  const handlerChangeLogin = () => {
    setState(!state)

  }

  return (
    <div className={'relative'}>
      <div className={'hw-login-method'}>
        <div className={`hw-login-tab${!state ? ' active' : ''} font-smaller-4`} onClick={handlerChangeLogin}>{t('LABEL_EMAIL')} </div>
        <div className={`hw-login-tab${state ? ' active' : ''} font-smaller-4`} onClick={handlerChangeLogin}>{t('LABEL_USERNAME')}</div>
      </div>
      <Paper header={'Login Form'}>
        <div style={!state ? {paddingTop: 40} : {}}>{!state ? <LoginNormal/> : <LoginAccount/>}</div>
      </Paper>
    </div>
  )
}

export default Login
