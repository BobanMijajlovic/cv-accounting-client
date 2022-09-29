import React                  from 'react'
import {FontAwesomeIcon}      from '@fortawesome/react-fontawesome'
import {faExclamationCircle,} from '@fortawesome/free-solid-svg-icons'
import {Button}               from '../Button'
import {faCheckCircle}        from '@fortawesome/free-regular-svg-icons'
import {
  RouteComponentProps,
  withRouter
}                             from 'react-router'

export interface IActivationDialog extends RouteComponentProps {
  error ?: boolean,
  success ?: boolean,
  title ?: string,
  text : string,
  buttonLabel ?: string,
  logo ?: string
}

interface IActivationDialogHeaderProps {
  title ?: string,
  logo ?: string,

}

const ActivationDialogHeader = ({title, logo} : IActivationDialogHeaderProps) => {
  return (

    <div className={`hw-activation-dialog-header${logo ? ' hw-dialog-logo' : ''}`}>
      {logo ? 'LOGO' : title}

    </div>
  )
}

const MessageComponentRedirect = ({title, text, error, logo, buttonLabel, ...props} : IActivationDialog) => {
  const handleOnClick = () => {
    props.history.replace('login')
  }
  return (
    <div className={`hw-activation-dialog-root${error ? ' error' : ''}`}>
      <ActivationDialogHeader title={title} logo={logo}/>
      <div className={'hw-activation-dialog-content'}>
        <div className={'hw-activation-dialog-icon'}>{error ?
          <FontAwesomeIcon className={'hw-error'} icon={faExclamationCircle}/> :
          <FontAwesomeIcon className={'hw-success'} icon={faCheckCircle}/>}</div>
        {text}
      </div>
      {!error ? (
        <div className={'hw-activation-dialog-action'}>
          <Button color={'primary'} outline size={'sm'} label={buttonLabel ? buttonLabel : 'GO TO LOGIN'}
                            onClick={handleOnClick}/>
        </div>
      ) : null}
    </div>
  )
}

export default withRouter(MessageComponentRedirect)
