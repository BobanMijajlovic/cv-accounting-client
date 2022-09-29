import React             from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPowerOff,}     from '@fortawesome/free-solid-svg-icons'
import {useApplication}  from '../hooks/useApplication'

export interface ILoginStatus {
  changeStatus : () => void
  label ?: string
}

const LoginStatus = ({changeStatus, label} : ILoginStatus) => {

  const {loggedUser} = useApplication()

  const userText = React.useMemo(() => {
    if (loggedUser?.firstName && loggedUser?.lastName) {
      return `${loggedUser.firstName || ''}  ${loggedUser.lastName || ''}`
    }
    if (loggedUser?.userName) {
      return loggedUser.userName
    }
    return loggedUser?.email || ''
  }, [loggedUser])
  return (
    <div className={'hw-logged-icon'}>

      <div className={'hw-logged-user'}>{userText}</div>
      <div className={'hw-login-icon'}>
        <FontAwesomeIcon icon={faPowerOff} onClick={changeStatus}/>
      </div>

    </div>
  )
}

export default LoginStatus
