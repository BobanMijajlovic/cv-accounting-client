import React, { useEffect }       from 'react'
import './App.css'
import { HashRouter }             from 'react-router-dom'
import { useExternalKeyboard }    from './components/hooks/useExternalKeybaord'
import {
  Route,
  Switch
}                                 from 'react-router'
import Application                from './application'
import {
  useDispatch,
  useSelector
}                                 from 'react-redux'
import { IReduxStore }            from './store'
import { closeActiveBackground }  from './store/active-background/action'
import { translationGetLanguage } from './components/Translation/useTranslation'
import {
  LocalStorage,
  STORAGE_APPLICATION_SETTINGS
}                                 from './application/utils/LocalStorage'

const ActiveBackgrounds = () => {
  const { activeBackgrounds } = useSelector((state: IReduxStore) => state.activeBackground)
  const dispatch = useDispatch()
  const closeActive = React.useCallback((e: React.MouseEvent, unique: any) => {
    dispatch(closeActiveBackground(unique))
    const { clientX, clientY } = e
    setTimeout(() => {
      const ev = new MouseEvent('click', {
        'view': window,
        'bubbles': true,
        'cancelable': true,
        clientX,
        clientY
      })

      const el = document.elementFromPoint(clientX, clientY)
      el && el.dispatchEvent(ev)
    }, 1)
  }, [dispatch])
  return <>
    {
      activeBackgrounds.map(x => {
        const _style = {
          zIndex: x.zIndex,
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          background: 'gray',
          opacity: '0.1'
        } as any

        return (
          <div style={_style} key={x.unique} onClick={(e: React.MouseEvent) => closeActive(e, x.unique)}/>
        )
      })
    }
  </>
}

const App: React.FC = () => {

  const { dispatchKeyEvent } = useExternalKeyboard()
  const dialogsNumber = useSelector((state: IReduxStore) => state.dialogsUI.length)
  const activeBackgroundsNumber = useSelector((state: IReduxStore) => state.activeBackground.activeBackgrounds.length)

  useEffect(() => {
    document.removeEventListener('keydown', dispatchKeyEvent)
    document.addEventListener('keydown', dispatchKeyEvent)
    const settings = LocalStorage.getData(STORAGE_APPLICATION_SETTINGS)
    translationGetLanguage(!settings || !settings.lang ? 'en' : settings.lang).then()
  }, [])

  useEffect(() => {
    const element = document.getElementsByTagName('HTML')[0]
    const array = [...element.className.split(' ').filter(x => !x.startsWith('hw-theme-')), 'hw-theme-basic-blue']
    element.className = array.join(' ')
  }, [])

  const styleDialogsContainer = React.useMemo(() => {
    if (dialogsNumber) {
      return {
        zIndex: 2000,
        position: 'fixed',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
      } as any
    }

    if (activeBackgroundsNumber) {
      return {
        width: 0,
        height: 0
      }
    }
    return {
      display: 'none'
    }
  }, [dialogsNumber, activeBackgroundsNumber])

  return (
    <>
      <div className="hw-app-root relative" id={'application-main-div'}>
        <HashRouter basename={'/'}>
          <Switch>
            <Route path={'/'}>
              <Application/>
            </Route>
          </Switch>
        </HashRouter>
      </div>
      <div id="model-container-id" style={styleDialogsContainer}>
        <ActiveBackgrounds/>
      </div>
    </>

  )
}

export default App
