import {useCallback} from 'react'
import {TUser}       from '../../graphql/type_logic/types'
import {
  useDispatch,
  useSelector
}                    from 'react-redux'
import {IReduxStore} from '../../store'
import { redirectLink as actionRedirectLink, setLoggedUser as actionSetLoggedUser, clearLoggedUser as actionClearLoggedUser} from '../../store/application/action'

export const useApplication = () => {

  const dispatch = useDispatch()

  const setRedirectLink = useCallback((data : string) => {
    dispatch(actionRedirectLink(data))
  }, [dispatch])

  const setLoggedUser = useCallback((loggedUser : TUser) => {
    dispatch(actionSetLoggedUser(loggedUser))
  }, [dispatch])

  const clearLoggedUser = useCallback(() => {
    dispatch(actionClearLoggedUser())
  }, [dispatch])

  const redirectLink = useSelector((state : IReduxStore) => state.application.redirectLink)
  const loggedUser = useSelector((state : IReduxStore) => state.application.loggedUser)

  return {
    redirectLink,
    loggedUser,
    setRedirectLink,
    setLoggedUser,
    clearLoggedUser
  }
}
