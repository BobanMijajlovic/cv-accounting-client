import React                           from 'react'
import InputTextPasswordWithValidation from '../../../../../components/withValidation/InputTextPasswordWithValidation'
import {
  areTheSame,
  IFieldsRefs,
  minLength,
  required,
  useValidation
}                                      from '../../../../../validation'
import DialogButtonsSaveUpdate         from '../../../_common/DialogButtonsSaveUpdate'
import {
  DialogModalRootComponent,
  EasyDialogApolloProvider
}                                      from '../../../../../components/EasyModel/EasyModal'
import {CenteredDialog}                from '../../../../../components/Dialog/DialogBasic'
import {
  get as _get,
  omit as _omit
}                                      from 'lodash'
import {TUserChangePassword}           from '../../../../../graphql/type_logic/types'
import {processErrorGraphQL}           from '../../../../../apollo'

/*
customValidation: (value : string) => {
    if (!value) {
      return false
    }
    if (/[^a-z0-9#$@!+*%]/gi.exec(value)) {
      return 'Password must be in scope of A-Za-z0-9#$@!+*%'
    }

    if (!/[A-Z]/.exec(value)) {
      return 'Password must have at least one Upper case letter'
    }
    if (!/\d/.exec(value)) {
      return 'Password must have at least one number'
    }
    if (!/[a-z]/.exec(value)) {
      return 'Password must have at least one Small case letter'
    }
    return false
  }
*/
export const passwordRule = {
  required,
  minLength: minLength({
    message: 'Password must be at least 4 char long',
    min: 4
  }),
  areTheSame: areTheSame({
    message: 'Password must match',
    field: 'confirmPassword'
  })
}

export interface IChangePasswordProps {
  cancelFun : () => void
  submitFun : (user : any) => Promise<any>
}

const ChangePassword = ({cancelFun, submitFun} : IChangePasswordProps) => {
  const validation = useValidation<TUserChangePassword>()

  const handlerOnSubmit = async () => {
    const {error, data,refs,validations} = await validation.validate()
    if (error) {
      const fieldRef : IFieldsRefs | undefined = refs.find(({field}) => _get(validations, `validations.${field}.error`))
      fieldRef && fieldRef.ref.current.focus()
      return
    }
    try {
      const obj = Object.assign({}, {
        ..._omit(data, ['confirmPassword']),
      })
      await submitFun(obj)
      cancelFun()
    } catch (e) {
          /** process the error */
      processErrorGraphQL(e,validation)
    }
  }

  return (
    <div className={'d-flex flex-column my-profile-change-password-form'}>
      <div className={'pt-2'}>
        <InputTextPasswordWithValidation
                        required
                        label={'Current password'}
                        helperText={'enter password'}
                        validation={{
                          useValidation: validation,
                          model: 'currentPassword',
                          rule: {
                            required,
                            minLength: minLength({
                              message: 'Password must be at least 4 char long',
                              min: 4
                            })
                          }
                        }}
        />
      </div>
      <div className={'pt-2'}>
        <InputTextPasswordWithValidation
                        required
                        label={'New password'}
                        helperText={'enter new password'}
                        validation={{
                          useValidation: validation,
                          model: 'password',
                          rule: passwordRule
                        }}
        />
      </div>
      <div className={'pt-2'}>
        <InputTextPasswordWithValidation
                        required
                        label={'Repeat password'}
                        helperText={'repeat password'}
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
      </div>

      <DialogButtonsSaveUpdate
                    cancelFun={cancelFun}
                    submitFun={handlerOnSubmit}
      />
    </div>
  )
}

export default ChangePassword

export interface IOpenDialogChangePassword {
  submitFun : (password : any) => Promise<any>
}

export const openDialogChangePassword = ({submitFun} : IOpenDialogChangePassword) => {
  EasyDialogApolloProvider((closeDialog : () => any, openDialog : (data : any) => any) => {
    openDialog(<DialogModalRootComponent name={'dialog-user-change-password-15648960546456'} closeFn={closeDialog}>
      <CenteredDialog
                title={'Change password'}
                closeAction={closeDialog}
                Component={ChangePassword}
                componentRenderProps={{
                  cancelFun:closeDialog,
                  submitFun
                }}
      />
    </DialogModalRootComponent>)
  })
}
