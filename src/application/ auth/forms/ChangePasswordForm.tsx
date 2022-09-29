import React                           from 'react'
import {Paper}                         from '../../../components/Paper'
import {
  areTheSame,
  required,
  useValidation
}                                      from '../../../validation'
import {Button}                        from '../../../components/Button'
import {faKey}                         from '@fortawesome/free-solid-svg-icons'
import {
  RouteComponentProps,
  withRouter
}                                      from 'react-router'
import InputTextPasswordWithValidation from '../../../components/withValidation/InputTextPasswordWithValidation'
import {TUserChangePassword}           from '../../../graphql/type_logic/types'
import {passwordRule}                  from '../../components/user/myProfile/form/ChangePassword'
import {useApplication}                from '../../hooks/useApplication'
import {useAuthPasswordChangeMutation} from '../../../graphql/graphql'
import {
  APP_LAYOUT,
  APPLICATION_MAIN_SUB_DOMAIN
}                                      from '../../constants'
import {processErrorGraphQL}           from '../../../apollo'
import {SpinnerLoadingCenter}          from "../../../components/Spinner/SpinnerLoading";

const ChangePasswordForm = (props : RouteComponentProps) => {

  const validation = useValidation<TUserChangePassword>()

  const {setRedirectLink} = useApplication()
  const [mutation, {loading}] = useAuthPasswordChangeMutation()

  const handlerOnSubmit = async () => {
    const {error, data} = await validation.validate()
    if (error) {
      return
    }

    const _data = {
      variables: {
        data: {
          password: data.password,
          key: props.location.search.replace(/^.*=\s*(.*)/, '$1')
        }
      }
    }
    mutation(_data as any).then(() => {
      setRedirectLink(`/${APPLICATION_MAIN_SUB_DOMAIN}/${APP_LAYOUT.AUTH}/success-password-changed`)
    })
      .catch((e) => {
        processErrorGraphQL(e)
      })

  }
  return (
    <>
      {loading ? <SpinnerLoadingCenter/> : <></>}
      <Paper header={'Change password'}>
        <InputTextPasswordWithValidation
                    required
                    focusOnMount
                    selectOnFocus
                    label={'New password'}
                    helperText={'enter password'}
                    icon={{icon: faKey}}
                    validation={{
                      useValidation: validation,
                      model: 'password',
                      rule: passwordRule
                    }}
        />
        <InputTextPasswordWithValidation
                    required
                    selectOnFocus
                    label={'Repeat password'}
                    helperText={'enter password'}
                    icon={{icon: faKey}}
                    validation={{
                      useValidation: validation,
                      model: 'confirmPassword',
                      rule: {
                        required,
                        areTheSame: areTheSame({
                          message: 'Password must match',
                          field: 'password'
                        })
                      }
                    }}
        />
        <div className={'hw-login-form-button'}>
          <Button color={'primary'} outline onClick={handlerOnSubmit} label={'CONFIRM'}/>
        </div>
      </Paper>
    </>
  )
}

export default withRouter(ChangePasswordForm)
