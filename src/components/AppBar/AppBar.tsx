import React, {useMemo}                   from 'react'
import {FontAwesomeIcon}                  from '@fortawesome/react-fontawesome'
import {IconProp}                         from '@fortawesome/fontawesome-svg-core'
import {ID_APPLICATION_UP_BAR}            from '../../application/layout/main'
import ButtonShortcut                     from '../Button/ButtonShortcut'
import {
  faExchangeAlt,
  faUserTie
}                                         from '@fortawesome/free-solid-svg-icons'
import {openDialogCurrency}               from '../../application/components/currency/CurrencyDialog'
import {openDialogCustomerExternalSearch} from '../../application/components/customer/modal/CustomerExternalSearch'
import ConditionalRender                  from '../Util/ConditionalRender'
import {toBoolean}                        from 'validator'
import {useTranslationFunction}           from '../Translation/useTranslation'

export interface IAppBarProps extends React.PropsWithChildren<any> {
  label: string,
  icon: IconProp,
  fixed?: boolean,
  menuAction?: () => void
  pageName?: string
}

const AppBar = ({label, fixed, icon, menuAction, children, pageName}: IAppBarProps) => {
  const {translate} = useTranslationFunction()
  
  const isSaleMode = useMemo(() => toBoolean((process.env as any).REACT_APP_SALE_MODE), [])
  
  return (
    <div className={`hw-appbar-root ${fixed ? `${' fixed'}` : ''}`} id={ID_APPLICATION_UP_BAR}>
      <div className={'hw-toolbar-root'}>
        <div className={'hw-toolbar-app-name'}>
          <div onClick={menuAction} className={'hw-appbar-menu-icon'}>
            <FontAwesomeIcon icon={icon}/>
          </div>
          <div className={'hw-appbar-label'}>{label}</div>
          <ConditionalRender condition={!isSaleMode}>
            <div className={'ml-3'}>
              <ButtonShortcut
                                icon={faExchangeAlt}
                                label={translate('LABEL_CURRENCY')}
                                onClick={openDialogCurrency}
              />
            </div>
            <div className={'ml-2'}>
              <ButtonShortcut
                                icon={faUserTie}
                                label={translate('LABEL_FIND')}
                                onClick={() => openDialogCustomerExternalSearch({})}
              />
            </div>
          </ConditionalRender>
        </div>
        <div className={'hw-appbar-label'}>{pageName}</div>
        <div className={'hw-children d-flex flex-row'}>
          {children}
        </div>
      </div>
    </div>

  )
}

export default AppBar

