import React, {
  useEffect,
  useState
}                               from 'react'
import SearchView               from '../../_common/SearchView'
import {faUserPlus}             from '@fortawesome/free-solid-svg-icons'
import {CONSTANT_USERS}         from '../../../constants'
import {useUser}                from '../../../hooks/useUser'
import {queryVariablesForUsers} from '../../../../graphql/variablesQ'
import {
  useInsertUserMutation,
  useUpdateUserMutation,
  useUserQuery,
  useUsersQuery
}                               from '../../../../graphql/graphql'
import {TUser}                  from '../../../../graphql/type_logic/types'
import {
  IUseOptimizeEventData,
  useOptimizeEventClick
}                               from '../../../../components/hooks/useOptimizeEventClick'
import SearchViewUserRender     from './SearchViewRender'
import {
  openDialogResetPassword,
  openDialogUserForm
}                               from './form/User'
import UserInfo                 from './info/UserInfo'
import {get as _get}            from 'lodash'

const UserDashboard = () => {
  const [stateSearch, setStateSearch] = useState('')
  const [selectedId, setSelectedId] = useState(0)

  const [mutationInsertUser] = useInsertUserMutation()
  const [mutationUpdateUser] = useUpdateUserMutation()

  const {data: globalUserData, setSelected} = useUser()

  const queryVariables = React.useMemo(() => queryVariablesForUsers(stateSearch), [stateSearch])

  const {data: users, refetch: refetchUsers} = useUsersQuery({
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'network-only',
    variables: queryVariables
  })

  const {refetch: refetchSelectedUser} = useUserQuery({
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'network-only',
    onCompleted: (data) => {
      data && data.user && setSelected(data.user as TUser)
    },
    variables: {
      id: selectedId
    },
    skip: !selectedId
  })

  const handlerSearch = (value : string) => {
    setStateSearch(value)
  }

  useEffect(() => {
    if (globalUserData.selected) {
      return
    }
    if (!users || !users.data || !users.data.items || users.data.items.length === 0) {
      return
    }
    const val = users.data.items[0]
    setSelectedId(Number(val.id))
  }, [globalUserData, users, setSelected])

  const addNewUser = () => {
    const submitFun = async (user : TUser) => {
      await mutationInsertUser({
        variables: {
          data: user
        }
      })
      refetchUsers().then()
      refetchSelectedUser().then()
    }
    openDialogUserForm({submitFun: submitFun})
  }

  const editUserDetails = () => {
    const submitFun = async (user : TUser) => {
      await mutationUpdateUser({
        variables: {
          id: +_get(globalUserData, 'selected.id'),
          data: user
        }
      })
      refetchUsers().then()
      refetchSelectedUser().then()
    }
    globalUserData.selected && globalUserData.selected.id &&
        openDialogUserForm({
          user: _get(globalUserData, 'selected') as TUser,
          submitFun: submitFun
        })
  }

    /* const resetPassword = () => {
      const submitFun = async () => {
        await mutataionResetPassword({
          variables: {
            id: +_get(globalUserData, 'selected.id')
          }
        })
        refetchUsers().then()
        refetchSelectedUser().then()
      }
      globalUserData.selected && globalUserData.selected.id &&
          openDialogResetPassword({
            user: _get(globalUserData, 'selected'),
            submitFun: submitFun
          })
    }*/

  const {onClickHandler} = useOptimizeEventClick({
    eventHandler (data : IUseOptimizeEventData) {
      if (data.action === CONSTANT_USERS.EVENTS.SELECTED_ONE) {
        users && users.data && setSelectedId(Number(data.id))
        return
      }

      if (data.action === CONSTANT_USERS.EVENTS.ADD_NEW) {
        addNewUser()
        return
      }

      if (data.action === CONSTANT_USERS.EVENTS.EDIT) {
        editUserDetails()
        return
      }

      if (data.action === CONSTANT_USERS.EVENTS.RESET_PASSWORD) {
        const user = _get(globalUserData, 'selected', {}) as TUser
        const actionOnResetPassword = () => {
          refetchUsers().then()
          refetchSelectedUser().then()
        }
        user && openDialogResetPassword({
          user,
          submitFun: actionOnResetPassword
        })
      }
    }
  })

  if (!users || !users.data) {
    return <></>
  }

  return (
    <div className={'d-flex h-100 w-100 pt-2 px-2'}>
      <div
                className={'d-flex text-center user-view-render'}
                onClick={onClickHandler}
                data-action-root
      >
        <SearchView
                    handlerSearch={handlerSearch}
                    data={users.data}
                    helperText={'search by first name, last name, username, email'}
                    leftButtonIcon={faUserPlus}
                    leftButtonEvent={CONSTANT_USERS.EVENTS.ADD_NEW}
                    RenderComponent={SearchViewUserRender}
                    selectedId={selectedId}
                    className={'user-search-view'}
        />
      </div>
      <div className={'d-flex flex-2 justify-content-start relative'} onClick={onClickHandler}>
        <div className={'d-flex flex-row w-100 h-100 p-3'}>
          <UserInfo/>
        </div>
      </div>
    </div>
  )
}

export default UserDashboard

