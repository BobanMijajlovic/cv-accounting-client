import React, {
  useEffect,
  useRef
}                                 from 'react'
import { IconProp }               from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon }        from '@fortawesome/react-fontawesome'
import {
  faExclamationCircle,
  faInfoCircle,
  faQuestionCircle,
  faTimes
}                                 from '@fortawesome/free-solid-svg-icons'
import {
  Button,
  IButtonProps
}                                 from '../Button'
import MessageComponent           from './MessageComponent'
import MessageComponentRedirect   from './MessageComponentRedirect'
import {
  RouteComponentProps,
  withRouter
}                                 from 'react-router'
import ButtonsForm                from '../Button/ButtonsForm'
import {
  KeyboardEventCodes,
  useExternalKeyboard
}                                 from '../hooks/useExternalKeybaord'
import { useTranslationFunction } from '../Translation/useTranslation'

export const DIALOG_CLOSE_BUTTON = 'CLOSE_BUTTON'
export const DIALOG_SUBMIT_BUTTON = 'SUBMIT_BUTTON'
type TActionButton = {
  actionType?: 'submit' | 'cancel',
  ref?: any
}

type IActionButtonProps = IButtonProps & TActionButton

export interface IDialogProps {
  title?: string,
  logo?: string,
  closeAction?: ()=> void,
  Component?: any,
  componentRenderProps?: any,
  text?: string,
  icon?: IconProp,
  actionButtons?: IActionButtonProps[],
  rootClassNames?: string
  className?: string
  scrollable?: boolean
  buttonForms?: boolean
}

interface IDialogActionsProps {
  actionButtons: IActionButtonProps[],
  closeAction?: ()=> void
}

interface IRegistrationDialogProps {
  error?: boolean,
  title?: string,
  text: string,
  sub?: string
}

interface IActivationDialogProps extends RouteComponentProps {
  error?: boolean,
  title?: string,
  text: string
}

const DialogActions = ({actionButtons}: IDialogActionsProps) => {

  const {setRef} = useExternalKeyboard((e) => {
    switch (e.key) {
      case KeyboardEventCodes.F12:
        const btnSub = actionButtons.find(x => x.actionType === 'submit')
        btnSub && btnSub.ref.current.click()
        break
      case KeyboardEventCodes.Esc:
      case KeyboardEventCodes.Enter:
        const btnCan = actionButtons.find(x => x.actionType === 'cancel')
        btnCan && btnCan.ref.current.click()
        break
      default:
        break
    }
  },true,[],'dialog-actions-part')

  return (
    <div className={'hw-dialog-action'} ref={setRef}>
      {
        actionButtons.map((buttonProps: IActionButtonProps, key: number) => {
          return (
            <Button
                            key={key}
                            ref={buttonProps.ref}
                            onClick={buttonProps.onClick}
                            color={buttonProps.color ? buttonProps.color : 'primary'}
                            shortcut={buttonProps.shortcut}
                            outline
                            label={buttonProps.label ? buttonProps.label : 'TITLE'}
            />
          )
        })
      }
    </div>
  )
}

const DialogBasic = ({closeAction, text, title, logo, Component, componentRenderProps, actionButtons, icon, scrollable, className,buttonForms,rootClassNames}: IDialogProps) => {
  const propsContext = componentRenderProps ? componentRenderProps : {}
  const refDialog = useRef(null)
  useEffect(() => {
    if (!refDialog || !refDialog.current) {
      return
    }
    refDialog && refDialog.current && (refDialog.current as any).focus()
  },[refDialog])

  const DialogContent = () => {
    return (
      <>
        <div className={`hw-dialog-content${scrollable ? ' hw-dialog-scrollable' : ''}${className ? ` ${className}` : ''}`}>
          {
            Component ? (
              <Component
                                    {...propsContext}
                                    closeDialog={closeAction}
              />
            ) :
              text ? text : null
          }
          {
            icon ? (
              <div className={`hw-dialog-icon${className ? ` ${className}` : ''}`}>
                <FontAwesomeIcon icon={icon}/>
              </div>) : null
          }

        </div>
      </>
    )
  }

  return (
    <div className={'hw-dialog'} ref={refDialog}>
      <div className={`hw-dialog-root${className ? ` ${className}` : ''}${rootClassNames ? ` ${rootClassNames}` : ''}`}>

        {title || logo ?
          (
            <div
                            className={`hw-dialog-header d-flex justify-content-between${logo ? ' hw-dialog-logo' : ''}${className ? ` ${className}` : ''}`}>
              {logo ? 'LOGO' : title}
              {
                closeAction ? (
                  <div className={'hw-close-dialog'} onClick={closeAction}>
                    <FontAwesomeIcon icon={faTimes}/>
                  </div>
                ) : null
              }
            </div>
          ) : null
        }
        <DialogContent/>

        {buttonForms ? <div>
          <ButtonsForm
                    buttonsCancel={{
                      label:(actionButtons as any)[1].label as string,
                      action:(actionButtons as any)[1].onClick,
                      shortcut:(actionButtons as any)[1].shortcut
                    }}
                    buttonSubmit={{
                      label:(actionButtons as any)[0].label as string,
                      action:(actionButtons as any)[0].onClick,
                      shortcut:(actionButtons as any)[0].shortcut
                    }}
          />
        </div>
          : actionButtons ? <DialogActions actionButtons={actionButtons} closeAction={closeAction}/> : null
        }
      </div>
    </div>
  )
}
export default DialogBasic

export const CenteredDialog = (props: IDialogProps) => {
  const {translate} = useTranslationFunction()
  const translated = props.title && translate(props.title)
  const title =  translated !== 'NOT FOUND TRANSLATION' ? translated : props.title
  const _props = {
    ...props,
    title
  }
  return (
    <div className={'hw-dialog-centered-root'}>
      <div className={'hw-dialog-shadow d-flex '}></div>
      <DialogBasic {..._props} />
    </div>
  )
}

export const PDFDialog = (props: IDialogProps) => {
  let dialogProps = {...props,rootClassNames: 'pdf-dialog-root'}
  const {translate} = useTranslationFunction()
  const translated = props.title && translate(props.title)
  const title =  translated !== 'NOT FOUND TRANSLATION' ? translated : props.title
  dialogProps = {
    ...dialogProps,
    title
  }
  return (
    <div className={'hw-dialog-centered-root'}>
      <div className={'hw-dialog-shadow d-flex '}></div>
      <DialogBasic {...dialogProps} />
    </div>
  )
}

export const DialogError = ({text, buttonLabel, actionButton, closeAction}: { text: string, buttonLabel: string, actionButton: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>)=> void, closeAction?: ()=> void }) => {
  const ref  =  useRef(null)
  return (
    <CenteredDialog
            title={'ERROR'}
            text={text}
            icon={faExclamationCircle}
            className={'error'}
            closeAction={closeAction}
            actionButtons={
              [
                {
                  onClick: actionButton,
                  label: buttonLabel,
                  color: 'danger',
                  actionType: 'cancel',
                  ref: ref,
                }
              ]
            }

    />
  )
}

export interface IDialogBasicInfoProps {
  text?: string
  buttonLabel?: string
  action?: (e: React.MouseEvent<HTMLButtonElement>)=> void
  closeAction?: (e: React.MouseEvent<HTMLElement>)=> void
}

export interface IDialogBasicQuestionProps {
  text?: string
  title?: string
  action?: (e: React.MouseEvent<HTMLButtonElement>)=> void
  closeAction?: ()=> void
}

export const DialogInfo = ({text, buttonLabel, action}: IDialogBasicInfoProps) => {
  return (
    <CenteredDialog
            closeAction={() => {}}
            title={'Info'}
            text={text}
            icon={faInfoCircle}
            className={'info'}
            actionButtons={
              [
                {
                  onClick: action,
                  label: buttonLabel ? buttonLabel : 'OK',
                  color: 'primary'
                }
              ]
            }
    />
  )
}

export const DialogQuestion = ({text, title, closeAction, action}: IDialogBasicQuestionProps) => {

  return (
    <CenteredDialog
            buttonForms
            closeAction={closeAction}
            title={title ? title : 'Question'}
            text={text}
            icon={faQuestionCircle}
            actionButtons={
              [
                {
                  onClick: action,
                  label: 'OK',
                  color: 'primary'
                },
                {
                  onClick: closeAction,
                  label: 'CANCEL',
                  color: 'danger'
                }
              ]
            }
            className={'question'}
    />
  )
}

export interface IDialogModelQuestions {
  closeFun: ()=> void
  confirmFun: ()=> void
  messages: string[],
  confirmString?: string,
  cancelString?: string
}

const DialogComponentQuestions = (props: IDialogModelQuestions) => {
  const {messages, closeFun, confirmFun, confirmString, cancelString} = props

  const { setRef } = useExternalKeyboard((e: KeyboardEvent) => {
    switch (e.key) {
      case KeyboardEventCodes.Esc:
        closeFun()
        break
      case KeyboardEventCodes.F12:
        confirmFun()
        break
    }
  },true,[KeyboardEventCodes.Esc,KeyboardEventCodes.F12],'dialog-question-component')

  return (
    <div className={' container d-flex flex-column p-3 hw-dialog-component-questions-root'} ref={setRef}>
      {
        messages.map((msg: string, index: number) => {
          return (
            <div key={index}>
              {msg}
            </div>
          )
        })
      }
      <div className={'pt-4 container'}>
        <ButtonsForm
                    buttonsCancel={{
                      label: cancelString as string,
                      action: closeFun
                    }}
                    buttonSubmit={{
                      label: confirmString as string,
                      action: confirmFun
                    }}
        />
      </div>
    </div>
  )
}

DialogComponentQuestions.defaultProps = {
  confirmString: 'OK',
  cancelString: 'CANCEL'
}

export {
  DialogComponentQuestions
}

export const DialogMessageComponent = (props: IRegistrationDialogProps) => {
  return (
    <DialogBasic
            Component={MessageComponent}
            componentRenderProps={{
              ...props
            }}
    />
  )
}

export const DialogMessageComponentRedirect = withRouter((props: IActivationDialogProps) => {
  return (
    <DialogBasic
            Component={MessageComponentRedirect}
            componentRenderProps={{
              ...props
            }}
    />
  )
})

