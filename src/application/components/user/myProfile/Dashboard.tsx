import React                      from 'react'
import {CONSTANT_USERS}           from '../../../constants'
import ButtonShortcut             from '../../../../components/Button/ButtonShortcut'
import {FontAwesomeIcon}          from '@fortawesome/react-fontawesome'
import {faInfoCircle}             from '@fortawesome/free-solid-svg-icons/faInfoCircle'
import ConditionalRendering       from '../../../../components/Util/ConditionalRender'
import {KeyboardEventCodes}       from '../../../../components/hooks/useExternalKeybaord'
import ComponentRender            from '../../../../components/Util/ComponentRender'
import {
  IUseOptimizeEventData,
  useOptimizeEventClick
}                                 from '../../../../components/hooks/useOptimizeEventClick'
import {openDialogChangePassword} from './form/ChangePassword'
import {
  UserChangePasswordType,
  useUpdateUserMutation,
  useUserChangePasswordMutation,
  useUserQuery
}                                 from '../../../../graphql/graphql'
import {TUser}                    from '../../../../graphql/type_logic/types'
import {get as _get}              from 'lodash'
import {openDialogUserForm}       from '../dashboard/form/User'

export interface IMyProfileProps {
  notShowEditButton ?: boolean
}

const MyProfile = ({notShowEditButton} : IMyProfileProps) => {

  const [mutationChangePasswordUser] = useUserChangePasswordMutation()
  const [mutationEditUser] = useUpdateUserMutation()

  const {data, refetch: refetchUser} = useUserQuery({
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'network-only',
    variables: {
      id: 1
    },
    skip: !1
  })

  const user = React.useMemo(() => !data || !data.user ? {} : data.user, [data])

  const changePassword = () => {
    const submitFun = async (data : UserChangePasswordType) => {
      await mutationChangePasswordUser({
        variables: {
          data: data
        }
      })
    }
    openDialogChangePassword({submitFun})
  }

  const editMyProfile = () => {
    const submitFun = async (data : TUser) => {
      await mutationEditUser({
        variables: {
          id: +_get(user, ['id']),
          data: data
        }
      })
      refetchUser().then()
    }
    openDialogUserForm({
      user,
      submitFun
    })

  }

  const {onClickHandler} = useOptimizeEventClick({
    eventHandler (data : IUseOptimizeEventData) {
      if (data.action === CONSTANT_USERS.EVENTS.CHANGE_PASSWORD) {
        changePassword()
        return
      }
      if (data.action === CONSTANT_USERS.EVENTS.EDIT) {
        editMyProfile()
        return
      }
    }
  })

  return (
    <div className={'d-flex flex-column h-100 w-100 pt-2 px-2'} onClick={onClickHandler} data-action-root>
      <div className={'d-flex justify-content-between mb-1 color-primary w-100 mb-4'}>
        <div className={'d-flex font-bigger-1 align-items-center '}>
          <div className={'pr-2'}><FontAwesomeIcon icon={faInfoCircle}/></div>
          <div>BASIC INFO</div>
        </div>
        <ConditionalRendering condition={!notShowEditButton}>
          <div
                        data-action={CONSTANT_USERS.EVENTS.EDIT}
          >
            <ButtonShortcut
                icon={faInfoCircle}
                label={'Edit'}
                shortcut={KeyboardEventCodes.F4}
                classNames={'hw-shortcut-button primary sm hw-button-border-color mr-3'}
            />
          </div>
        </ConditionalRendering>
      </div>
      <div className={'d-flex w-50'}>
        <div className={'d-flex justify-content-between color-primary w-100'}>
          <div className={'d-flex flex-column w-50'}>
            <ComponentRender label={'First Name'} model={user} field={'firstName'} placeholder={'name'} justify-content={'start'}/>
            <ComponentRender label={'Last Name'} model={user} field={'lastName'} placeholder={'last name'} justify-content={'start'}/>
            <ComponentRender label={'Username'} model={user} field={'userName'} placeholder={'username'} justify-content={'start'}/>
            <ComponentRender label={'Email'} model={user} field={'email'} placeholder={'email'} justify-content={'start'}/>
            <ComponentRender
                            label={'Password'}
                            model={user}
                            field={'password'}
                            placeholder={'*********'}
                            action={{
                              label: 'Change password'
                            }}
                            data-action={CONSTANT_USERS.EVENTS.CHANGE_PASSWORD}
                            justify-content={'start'}
            />
          </div>
          <div className={'d-flex flex-column w-50'}>
            <ComponentRender label={'Street'} model={user} field={'address.street'} placeholder={'street'} justify-content={'start'}/>
            <ComponentRender label={'City'} model={user} field={'city'} placeholder={'city'} justify-content={'start'}/>
            <ComponentRender label={'Postcode'} model={user} field={'zipCode'} placeholder={'postcode'} justify-content={'start'}/>
            <ComponentRender label={'State'} model={user} field={'state'} placeholder={'state'} justify-content={'start'}/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MyProfile