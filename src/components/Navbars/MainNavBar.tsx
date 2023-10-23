import React, {useMemo}  from 'react'
import {
  RouteComponentProps,
  withRouter
}                        from 'react-router'
import {
  ID_APPLICATION_SIDE_BAR,
  ISideBarState
}                        from '../../application/layout/main'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {
  faBalanceScale,
  faBarcode,
  faBook,
  faCashRegister,
  faChevronLeft,
  faCogs,
  faCoins,
  faExchangeAlt,
  faFileAlt,
  faFileImport,
  faFileInvoice,
  faFileInvoiceDollar,
  faIndustry,
  faMoneyBillWaveAlt,
  faUniversity,
  faUser,
  faUserTie,
  faWarehouse
}                     from '@fortawesome/free-solid-svg-icons'
import {IconProp}     from '@fortawesome/fontawesome-svg-core'
import MainNavBarItem from './MainNavBarItem'
import {toBoolean}    from "validator";

export interface IMainNavBarProps extends RouteComponentProps {
  state: ISideBarState,
  onClickBarListHandler: (e: React.MouseEvent<HTMLElement>) => void
}

export interface INavBarListProps {
  label: string,
  path?: string,
  icon?: IconProp,
  collapse?: boolean,
  children?: INavBarListProps[]
}

const list: INavBarListProps[] = [
  {
    label: 'OPTIONS_CUSTOMER',
    path: '/application/main/customers',
    icon: faUserTie
  },
  {
    label: 'OPTIONS_ITEMS',
    path: '/application/main/items',
    icon: faBarcode
  },
  {
    label: 'OPTIONS_USERS',
    path: '/application/main/users',
    icon: faUser
  },
  {
    label: 'OPTIONS_WAREHOUSES',
    path: '/application/main/warehouses',
    icon: faWarehouse
  },
  {
    label: 'Administration',
    icon: faBook,
    collapse: true,
    children: [
      {
        label: 'OPTIONS_CALCULATION',
        path: '/application/main/calculations',
        icon: faFileInvoice
      },
      {
        label: 'OPTIONS_INVOICE',
        path: '/application/main/invoice',
        icon: faFileInvoiceDollar
      },
      {
        label: 'SIDEBAR_MENU_OPTIONS_PROFORMA_INVOICE',
        path: '/application/main/proforma-invoice',
        icon: faFileAlt
      },
      {
        label: 'SIDEBAR_MENU_OPTIONS_BANK_TRANSACTIONS',
        path: '/application/main/bank-transaction',
        icon: faUniversity
      },
      {
        label: 'Return invoice',
        path: '/application/main/return-invoice',
        icon: faFileImport
      },
      {
        label: 'Advance invoice',
        path: '/application/main/advance-invoice',
        icon: faMoneyBillWaveAlt
      },
      {
        label: 'Finance Transfer Document',
        path: '/application/main/finance-transfer-document',
        icon: faExchangeAlt
      },
    ]
  },
  {
    label: 'Normative',
    path: '/application/main/normative',
    icon: faBalanceScale
  },
  {
    label: 'Production order',
    path: '/application/main/production-order',
    icon: faIndustry
  },
  {
    label: 'SIDEBAR_MENU_OPTIONS_SELLING',
    path: '/application/main/sale',
    icon: faCashRegister
  },
  {
    label: 'SIDEBAR_MENU_OPTIONS_OUR_DATA',
    path: '/application/main/client',
    icon: faCoins
  },
  {
    label: 'OPTIONS_SETTINGS',
    path: '/application/main/settings',
    icon: faCogs
  },
]

const listSale = [
  {
    label: 'OPTIONS_USERS',
    path: '/application/main/users',
    icon: faUser
  },
  {
    label: 'OPTIONS_CUSTOMER',
    path: '/application/main/customers',
    icon: faUserTie
  },
  {
    label: 'OPTIONS_ITEMS',
    path: '/application/main/items',
    icon: faBarcode
  },
  {
    label: 'SIDEBAR_MENU_OPTIONS_SELLING',
    path: '/application/main/sale',
    icon: faCashRegister
  },
  {
    label: 'OPTIONS_SETTINGS',
    path: '/application/main/settings',
    icon: faCogs
  },
]

const MainNavBar = ({state, onClickBarListHandler}: IMainNavBarProps) => {

  const renderList = (props: INavBarListProps[]) => {
    return props.map(({children, collapse, ...rest}: INavBarListProps, key: number) => {
      if (children) {
        return (
          <MainNavBarItem key={key} dataIndex={key} path={'#'} collapse={collapse} {...rest}>
            {renderList(children)}
          </MainNavBarItem>
        )
      }
      return <MainNavBarItem key={key} dataIndex={key} {...rest}/>
    })
  }

  const menuList = useMemo(() => toBoolean((process.env as any).REACT_APP_SALE_MODE) ? listSale : list, [process])
  return (
    <>
      <div className={`hw-nav-bar-main${state.open ? ' opened' : ''}${state.mini ? ' mini' : ''}${state.visible ? '' : ' hide'}`} onClick={onClickBarListHandler} id={ID_APPLICATION_SIDE_BAR}>
        <div className={`hw-nav-bar-main-close${state.open && state.visible ? ' show' : ''}`}>
          <FontAwesomeIcon icon={faChevronLeft}/>
        </div>
        <div className={'py-3 d-flex justify-content-center border-bottom relative'}>
            Deal
        </div>
        <div className={'hw-bar-list-main'}>
          {renderList(menuList)}
        </div>
      </div>
    </>
  )
}

export default withRouter(MainNavBar)
