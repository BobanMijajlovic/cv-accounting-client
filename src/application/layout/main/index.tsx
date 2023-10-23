import React, {
  useEffect,
  useMemo,
  useState
}                            from 'react'
import {useLocation}         from 'react-router-dom'
import {
  RouteComponentProps,
  withRouter
}                            from 'react-router'
import {useAppBar}           from '../../hooks/useAppBar'
import {AppBar}              from '../../../components/AppBar'
import {faBars}              from '@fortawesome/free-solid-svg-icons'
import ButtonHeaderComponent from '../../../components/Button/ButtonHeaderComponent'
import {setUseAccessToken}  from '../../../apollo/accessToken'
import MainNavBar           from '../../../components/Navbars/MainNavBar'
import LoginStatus          from '../../ auth/LoginStatus'
import {useApplication}     from '../../hooks/useApplication'
import {_getCurrentReceipt} from '../../../store/receipt/useReceipt'
import {useCurrency}        from '../../components/currency/useCurrency'
import {useBanks}           from '../../hooks/useBanks'
import {_fetchVats}         from '../../../store/vats/useVats'
import {_fetchClient}       from '../../../store/client/useClient'
import SaleRoots            from './modules/SaleRoots'
import AccountingRoots      from './modules/AccountingRoots'
import {toBoolean}          from 'validator'

export const ID_APPLICATION_MAIN_DIV = 'hw_application_main_div_id'
export const ID_APPLICATION_SIDE_BAR = 'hw_application_main_side_bar'
export const ID_APPLICATION_UP_BAR = 'hw_application_main_up_bar'

export interface ISideBarState {
  open: boolean,
  mini: boolean,
  visible: boolean,
  selected?: string
}

const MainLayout = (props: RouteComponentProps) => {
  useBanks()
  _fetchVats(true)
  _fetchClient(true)
  useCurrency(true)
  _getCurrentReceipt()

  const {clearLoggedUser, loggedUser, setRedirectLink} = useApplication()
  const {pathname} = useLocation()
  const [state, setState] = useState({
    open: false,
    mini: true,
    visible: true
  } as ISideBarState)

  useEffect(() => {
    setUseAccessToken(true)
  }, [])

  const {appBarState} = useAppBar('header')

  useEffect(() => {
    if (loggedUser === null) {
      setRedirectLink('/')
    }
  }, [loggedUser, setRedirectLink])

  const onClickHandler = () => {
    setState({
      ...state,
      ...{
        visible: !state.visible
      }
    })
  }

  const onClickBarListHandler = (e: React.MouseEvent<HTMLElement>) => {
    let target: HTMLElement | null = e.target as HTMLSelectElement

    while (target) {
      if (target.hasAttribute('data-bar-list-item')) {
        e.preventDefault()
        e.stopPropagation()
        return
      }
      target = target.parentElement
    }
    setState({
      ...state,
      ...{
        mini: !state.mini,
        open: !state.open
      }
    })
  }

  const changeStatus = () => clearLoggedUser()

  const pageName = useMemo(() => {
    const arr = pathname.split('/')
    let str = arr[arr.length - 1]
    str = str.replace(/-/g, ' ')
    return str.toUpperCase()
  }, [pathname])

  const isSaleMode = useMemo(() => toBoolean((process.env as any).REACT_APP_SALE_MODE), [])

  const label = useMemo(() => isSaleMode ? 'Deal sale' : 'Client Deal', [isSaleMode])
  return (
    <>
      <div className={'hw-app-layout-main'}>
        <AppBar icon={faBars} menuAction={onClickHandler} label={label} pageName={pageName}>

          {appBarState.buttonsForPage.length !== 0 ?
            <div><ButtonHeaderComponent buttons={appBarState.buttonsForPage}/></div> :
            <div></div>}
          <LoginStatus changeStatus={changeStatus}/>
        </AppBar>
        <div className={'hw-app-layout-main-root'}>
          <MainNavBar state={state} onClickBarListHandler={onClickBarListHandler}/>
          <div className={`hw-app-layout-main-data${state.mini && state.visible ? ' mini' : state.open && state.visible ? ' opened' : ' hide'}`} id={ID_APPLICATION_MAIN_DIV}>
            {isSaleMode ? <SaleRoots/> : <AccountingRoots/>}
          </div>
        </div>
      </div>
    </>
  )
}

export default withRouter(MainLayout)

