import React                  from 'react'
import {FontAwesomeIcon}      from '@fortawesome/react-fontawesome'
import {faCheckCircle}        from '@fortawesome/free-regular-svg-icons'
import {faExclamationCircle,} from '@fortawesome/free-solid-svg-icons'

export interface IRegistrationDialog {
  error ?: boolean,
  success ?: boolean,
  title ?: string,
  text : string,
  logo ?: string,
  sub ?: string
}

interface IRegistrationDialogHeaderProps {
  title ?: string,
  logo ?: string,

}

const RegistrationDialogHeader = ({title, logo} : IRegistrationDialogHeaderProps) => {
  return (

    <div className={`hw-registration-dialog-header${logo ? ' hw-dialog-logo' : ''}`}>
      {logo ? 'LOGO' : title}

    </div>
  )
}

const MessageComponent = ({title, text, error, logo, sub} : IRegistrationDialog) => {

  return (
    <div className={`hw-registration-dialog-root${error ? ' error' : ''}`}>
      <RegistrationDialogHeader title={title} logo={logo}/>
      <div className={'hw-registration-dialog-content'}>
        <div className={'hw-registration-dialog-icon'}>{error ?
          <FontAwesomeIcon className={'hw-error'} icon={faExclamationCircle}/> :
          <FontAwesomeIcon className={'hw-success'} icon={faCheckCircle}/>}</div>
        {text}
      </div>
      <div className={'hw-registration-dialog-sub-content'}>
        {sub}
      </div>
    </div>
  )

}

export default MessageComponent
