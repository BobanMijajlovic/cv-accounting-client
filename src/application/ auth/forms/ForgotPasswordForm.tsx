import React   from 'react'
import {Paper} from '../../../components/Paper'

import {Button}                          from '../../../components/Button'
import {faEnvelope}                      from '@fortawesome/free-solid-svg-icons'
import {isEmail}                         from 'validator'
import InputTextWithValidation           from '../../../components/withValidation/InputTextWithValidation'
import {TForgotPasswordType}             from '../../../graphql/type_logic/types'
import {
  required,
  useValidation
}                                        from '../../../validation'
import {useApplication}                  from '../../hooks/useApplication'
import {useAuthPasswordRecoveryMutation} from '../../../graphql/graphql'
import {SpinnerLoadingCenter}            from '../../../components/Spinner/SpinnerLoading'
import {processErrorGraphQL}             from '../../../apollo'
import {
  APP_LAYOUT,
  APPLICATION_MAIN_SUB_DOMAIN
}                                        from '../../constants'

const ForgotPasswordForm = () => {

  const validation = useValidation<TForgotPasswordType>({
    initialData: {
      email: 'boban.mijajlovic.rs@gmail.com'
    }
  })

  const {setRedirectLink} = useApplication()
  const [mutation, {loading}] = useAuthPasswordRecoveryMutation()

  const handlerOnSubmit = async () => {
    const {error, data} = await validation.validate()
    if (error) {
      return
    }
    mutation({
      variables: {
        email: data.email
      }
    }).then(() => {
      setRedirectLink(`/${APPLICATION_MAIN_SUB_DOMAIN}/${APP_LAYOUT.AUTH}/success-request-password-changed`)
    })
      .catch((e : any) => {
        processErrorGraphQL(e)
      })
  }

  return (
    <>
      {loading ? <SpinnerLoadingCenter/> : <></>}
      <Paper header={'Forgot password'}>
        <InputTextWithValidation
                    focusOnMount
                    selectOnFocus
                    label={'Email'}
                    helperText={'Enter valid email for recovery'}
                    icon={{icon: faEnvelope}}
                    validation={{
                      useValidation: validation,
                      model: 'email',
                      rule: {
                        required,
                        useValidator: [
                          {
                            validator: isEmail,
                          }
                        ]
                      }
                    }}
        />
        <div className={'hw-login-form-button'}>
          <Button color={'primary'} outline onClick={handlerOnSubmit} label={'SEND'}/>
        </div>
      </Paper>
    </>
  )
}

export default ForgotPasswordForm
