import ReactDOM           from 'react-dom'
import React, {useEffect} from 'react'
import {
  DialogError,
  DialogInfo,
  DialogQuestion
}                         from '../Dialog/DialogBasic'
import {ApolloProvider}   from '@apollo/react-hooks'

import {client}         from '../../apollo'
import store            from '../../store/index'
import {Provider}       from 'react-redux'
import {useDiagramOnce} from '../../store/dialog-ui/useDiagramOnce'
import {
  ATTRIBUTE_KEYBOARD_HANDLER,
  ATTRIBUTE_KEYBOARD_ROOT_EMITTER,
  KeyboardEventCodes,
  useExternalKeyboard
} from '../hooks/useExternalKeybaord'
import _                from 'lodash'
import {guid}           from '../../application/utils/Utils'

const openDialog = (elemHolder : any, Component : any) => {
  const Comp = () => {
    return (
      <Provider store={store}>
        {Component}
      </Provider>
    )
  }
  ReactDOM.render(<Comp/>, elemHolder)
}

export const setFocusOnLastDialog = () => {
  const elems = (document.getElementById('model-container-id')?.getElementsByClassName('class-document-modal-root') || [])
  if (elems.length > 0) {
    const dialog = elems[elems.length - 1]
    const activeElems = dialog.querySelectorAll(`[${ATTRIBUTE_KEYBOARD_HANDLER}]`)
    if (activeElems.length > 0) {
      const el = activeElems[0]
      if (!el.hasAttribute('tabIndex')) {
        el.setAttribute('tabIndex', `${_.random(9000, 900000)}`)
      }
      setTimeout(() => {
        let currentFocus = document.activeElement
        while (currentFocus && currentFocus !== document.documentElement && currentFocus !== document.body) {
          if (currentFocus === dialog) {
            return
          }
          currentFocus = currentFocus?.parentNode as any
        }
        (el as any).focus()
      }, 200)
    }
  }
}

const openDialogApolloProvider = (elemHolder : any, Component : any) => {

  const CMD = () => {

    useEffect(() => {
      setFocusOnLastDialog()
    }, [])

    return (
      <Provider store={store}>
        <ApolloProvider client={client}>
          {Component}
        </ApolloProvider>
      </Provider>
    )
  }
  ReactDOM.render(<CMD/>, elemHolder)
}

export const EasyDialog = (f : any) => {
  const elemHolder = document.createElement('div')
  elemHolder.classList.add('class-document-modal-root')
  const element = document.getElementById('model-container-id')
    element?.appendChild(elemHolder)
    const closeDialog = () => {
      ReactDOM.unmountComponentAtNode(elemHolder)
      setTimeout(() => {
            element?.removeChild(elemHolder)
      })
    }
    setTimeout(() => {
      f(closeDialog, openDialog.bind(null, elemHolder))
    })
}

export const _focusElementAfter = (focusElement : string) => {
  if (!focusElement) {
    return
  }

  const elem = document.body.querySelectorAll(`[focus-id='${focusElement}']`)
  if (!elem || elem.length < 1) {
    return
  }
  setTimeout(() => {
    try {
      (elem[0] as any).focus()
    } catch (e) {
            /** try to focus */
    }
  }, 250)
}

export const EasyDialogApolloProvider = (f : any, focusElementIDAfter ?: string) => {
  const elemHolder = document.createElement('div')
  elemHolder.classList.add('class-document-modal-root')
  elemHolder.setAttribute(ATTRIBUTE_KEYBOARD_ROOT_EMITTER, guid())
  const element = document.getElementById('model-container-id')
    element?.appendChild(elemHolder)
    const closeDialog = () => {

      ReactDOM.unmountComponentAtNode(elemHolder)
      setTimeout(() => {
        if (element) {
                element?.removeChild(elemHolder)
        }
        if (focusElementIDAfter) {
          _focusElementAfter(focusElementIDAfter)
        }
      }, 1)
    }
    setTimeout(() => {
      f(closeDialog, openDialogApolloProvider.bind(null, elemHolder))
    })
}

export const easyDialogError = (message : string) => {

  EasyDialog((closeDialog : () => any, openDialog : (data : any) => any) => {
    const Component = () => {
      return (
        <DialogModalRootComponent name={'dialog-error-1043106024624266'} closeFn={closeDialog}>
          <DialogError text={message} buttonLabel={'OK'} actionButton={closeDialog}
                                 closeAction={closeDialog}/>
        </DialogModalRootComponent>
      )
    }
    openDialog(<Component/>)
  })
}

export const easyDialogInfo = (message : string, action ?: () => void) => {

  EasyDialog((closeDialog : () => any, openDialog : (data : any) => any) => {
    const Component = () => {
      return (
        <DialogModalRootComponent name={'dialog-tabs-156489654894156151015'} closeFn={closeDialog}>
          <DialogInfo text={message} buttonLabel={'OK'} action={action ? action : closeDialog}
                                closeAction={closeDialog}/>
        </DialogModalRootComponent>
      )
    }
    openDialog(<Component/>)
  })
}

export const easyDialogQuestion = (message ?: string, action ?: () => void) => {

  EasyDialog((closeDialog : () => any, openDialog : (data : any) => any) => {
    const Component = () => {
      const handlerAction = () => {
        if (action) {
          action()
        }
        closeDialog()
      }
      return (
        <DialogModalRootComponent name={'dialog-question-89589641879481548'} closeFn={closeDialog}>
          <DialogQuestion text={message} title={'Info'} action={handlerAction} closeAction={closeDialog}/>
        </DialogModalRootComponent>
      )
    }
    openDialog(<Component/>)
  })
}

export interface IDialogModalRootProps extends React.PropsWithChildren<any> {
  name : string,
  closeFn : () => void
}

export const DialogModalRootComponent = ({name, closeFn, children} : IDialogModalRootProps) => {
  const {opened} = useDiagramOnce(name)

  const {setRef, ref} = useExternalKeyboard((e) => {
    switch (e.key) {
      case KeyboardEventCodes.Esc:
        closeFn && closeFn()
        break
    }
  },true,[KeyboardEventCodes.Esc],name)
  
  useEffect(() => {
    if (opened) {
      closeFn()
    }
  }, [closeFn, opened])

  useEffect(() => {
    if (!ref || !ref.current) {
      return
    }
    if (ref && ref.current) {
      (ref.current as any).focus()
    }
  },[ref])

  if (opened) {
    return null
  }

  return (
    <div ref={setRef}>
      {children}
    </div>
  )
}
