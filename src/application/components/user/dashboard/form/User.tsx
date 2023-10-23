import React                             from 'react'
import InputTextWithValidation           from '../../../../../components/withValidation/InputTextWithValidation'
import {
  IFieldsRefs,
  minLength,
  required,
  useValidation
}                                        from '../../../../../validation'
import {TUser}                           from '../../../../../graphql/type_logic/types'
import {isEmail}                         from 'validator'
import {faUserAlt}                       from '@fortawesome/free-solid-svg-icons'
import DialogButtonsSaveUpdate           from '../../../_common/DialogButtonsSaveUpdate'
import {
  DialogModalRootComponent,
  EasyDialogApolloProvider,
  easyDialogInfo
}                                        from '../../../../../components/EasyModel/EasyModal'
import {
  CenteredDialog,
  DialogComponentQuestions
}                                        from '../../../../../components/Dialog/DialogBasic'
import {get as _get}                     from 'lodash'
import {useResetPasswordByAdminMutation} from '../../../../../graphql/graphql'
import SupplierItemForm                  from '../../../calculation/views/InstanceView/items/SupplierItemForm'

interface IUserFormProps {
  user ?: TUser
  cancelFun : () => void
  submitFun : (user : TUser) => void
}

const UserForm = ({user, submitFun, cancelFun} : IUserFormProps) => {

  const validation = useValidation<TUser>({
    initialData: {
      firstName: _get(user, 'firstName', ''),
      lastName: _get(user, 'lastName', ''),
      userName: _get(user, 'userName', ''),
      email: _get(user, 'email', void(0))
    }
  })

  const handlerOnSubmit = async () => {
    const {error, data, refs, validations} = await validation.validate()
    if (error) {
      const fieldRef : IFieldsRefs | undefined = refs.find(({field}) => _get(validations, `validations.${field}.error`))
      fieldRef && fieldRef.ref.current.focus()
      return
    }
    await submitFun(data)
    cancelFun()
  }

  return (
    <div className={'container user-form-root shadow-lg py-4'}>
      <div className={'col-md-6'}>
        <InputTextWithValidation
                    required
                    label={'First name'}
                    helperText={'enter first name'}
                    focusOnMount
                    selectOnFocus
                    validation={{
                      useValidation: validation,
                      model: 'firstName',
                      rule: {
                        required,
                        minLength: minLength({min: 2})
                      }
                    }}
        />
      </div>
      <div className={'col-md-6'}>
        <InputTextWithValidation
                    required
                    label={'Last name'}
                    helperText={'enter last name'}
                    selectOnFocus
                    validation={{
                      useValidation: validation,
                      model: 'lastName',
                      rule: {
                        required,
                        minLength: minLength({min: 2})
                      }
                    }}
        />
      </div>
      <div className={'col-md-6'}>
        <InputTextWithValidation
                    required
                    label={'Username'}
                    helperText={'enter username'}
                    selectOnFocus
                    validation={{
                      useValidation: validation,
                      model: 'userName',
                      rule: {
                        required
                      }
                    }}
        />
      </div>
      <div className={'col-md-6'}>
        <InputTextWithValidation
                    label={'Email'}
                    helperText={'enter email'}
                    selectOnFocus
                    validation={{
                      useValidation: validation,
                      model: 'email',
                      rule: {
                        useValidator: [
                          {
                            validator: isEmail
                          }
                        ]
                      }
                    }}
        />
      </div>

      <DialogButtonsSaveUpdate
                cancelFun={cancelFun}
                submitFun={handlerOnSubmit}
                update={!!user}
                icon={faUserAlt}
      />
    </div>
  )

}

export default UserForm

export interface IOpenDialogUser {
  user ?: TUser
  submitFun : (user : TUser) => Promise<any>
}

export const openDialogUserForm = ({user, submitFun} : IOpenDialogUser) => {
  EasyDialogApolloProvider((closeDialog : () => any, openDialog : (data : any) => any) => {
    openDialog(<DialogModalRootComponent name={'dialog-user-add-edit-162545145156'} closeFn={closeDialog}>
      <CenteredDialog
                title={user ? 'Edit user' : 'Define new user'}
                closeAction={closeDialog}
                Component={UserForm}
                componentRenderProps={{
                  cancelFun:closeDialog,
                  submitFun:submitFun,
                  user
                }}
      />
    </DialogModalRootComponent>)
  })

}

export interface IDialogResetPassword {
  user : TUser
  submitFun : () => void
}

export const openDialogResetPassword = ({user, submitFun} : IDialogResetPassword) => {
  EasyDialogApolloProvider((closeDialog : () => any, openDialog : (data : any) => any) => {
    const Component = () => {
      const [mutationResetPassword] = useResetPasswordByAdminMutation()
      const handlerConfirm = async () => {
        const result = await mutationResetPassword({
          variables: {
            id: +_get(user, 'id', '')
          }
        })
        submitFun && await submitFun()
        closeDialog()
        const password = _get(result, 'data.password')
        easyDialogInfo(`Username: ${user.userName} \r\n New password : ${password}`)
      }
      const messages : string[] = React.useMemo(() => [
        'Are you sure do reset password?',
        `First name : ${_get(user, 'firstName', '')}`,
        `Last name : ${_get(user, 'lastName', '')}`,
        `Username : ${_get(user, 'userName', '')}`,
      ], [])

      return (
        <DialogComponentQuestions
                    closeFun={closeDialog}
                    confirmFun={handlerConfirm}
                    messages={messages}
        />
      )
    }
    openDialog(<DialogModalRootComponent name={'dialog-user-reset-password-3216544744561687484'} closeFn={closeDialog}>
      <CenteredDialog
                title={'RESET PASSWORD'}
                closeAction={closeDialog}
                Component={Component}
      />
    </DialogModalRootComponent>)
  })
}
