import React                             from 'react'
import {FontAwesomeIcon}                 from '@fortawesome/react-fontawesome'
import {faBan}                           from '@fortawesome/free-solid-svg-icons'
import {NavLink}                         from 'react-router-dom'
import {RouteComponentProps, withRouter} from 'react-router'
import {IconProp}                        from '@fortawesome/fontawesome-svg-core'

export interface INavBarListItemProps extends RouteComponentProps {
  path : string
  label : string
  icon ?: IconProp
}

const NavBarListItem = ({path, label, icon, match, location} : INavBarListItemProps) => {

  const isActive = React.useMemo(() => {
    const _path = `${match.path}/${path}`
    return location.pathname === _path
  }, [path, location.pathname,match.path])

  return (
    <NavLink to={`${match.path}/${path}`} className={`hw-bar-list-item${isActive ? ' active' : ''}`}>
      {icon ? <FontAwesomeIcon icon={icon}/> : <FontAwesomeIcon icon={faBan}/>}
      <div className={'label'}>{label}</div>
    </NavLink>
  )
}

export default withRouter(NavBarListItem)
