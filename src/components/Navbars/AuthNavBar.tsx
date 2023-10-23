import React, {
    useMemo,
    useState
}                        from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

import {
    faBars,
    faFingerprint,
    faTimes,
    faUserPlus
}                     from '@fortawesome/free-solid-svg-icons'
import {withRouter}   from 'react-router'
import NavBarListItem from './NavBarListItem'
import {toBoolean}    from 'validator'

const AuthNavBar = (props: any) => {

    const [state, setState] = useState({
        opened: false
    })

    const onClickHandler = () => {
        setState({
            opened: !state.opened
        })
    }

    const isSaleMode = useMemo(() => toBoolean((process.env as any).REACT_APP_SALE_MODE), [])

    return (
        <div className={'hw-nav-bar'}>
            <div className={'hw-toolbar-root'}>
                <div className={'hw-bar-title'}>
                    DEAL
                </div>

                <div className={`hw-bar-list auth${state.opened ? ' opened' : ''}`}>
                    <NavBarListItem label={'Login'} path={'login'} icon={faFingerprint}/>
                    {!isSaleMode ? <NavBarListItem label={'Register'} path={'register'} icon={faUserPlus}/> : null}
                </div>

                <div className={'hw-bar-list-control'} onClick={onClickHandler}>
                    {!state.opened ? <FontAwesomeIcon icon={faBars}/> : <FontAwesomeIcon icon={faTimes}/>}
                </div>
            </div>
        </div>
    )
}

export default withRouter(AuthNavBar)
