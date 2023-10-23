import React             from 'react'
import {
  IPaginationButton,
  IPaginationButtonMove
}                        from './interfaces'
import {PAGINATION}      from '../../application/constants'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faAngleLeft}     from '@fortawesome/free-solid-svg-icons/faAngleLeft'
import {faAngleRight}    from '@fortawesome/free-solid-svg-icons/faAngleRight'

export const PaginationButton = ({text, value, isActive} : IPaginationButton) => {

  return (
    <div className={`d-flex justify-content-center cursor-pointer hw-pagination-button${isActive ? ' active' : ''}`}
             data-action={PAGINATION.EVENTS.PAGINATION_PAGE_CHANGED}
             data-action-id={value || text}
    >
      <small>{text}</small>
    </div>
  )
}

export const PaginationDelimiter = () => {

  return (
    <div className={'d-flex align-items-end hw-pagination-delimiter relative'}>
      <small>...</small>
    </div>
  )
}

export const PaginationMove = ({direction, isDisabled} : IPaginationButtonMove) => {
  return (
    <div className={`d-flex justify-content-center cursor-pointer hw-pagination-button mx-2${isDisabled ? ' disabled' : ''}`}
             data-action={PAGINATION.EVENTS.PAGINATION_PAGE_MOVE_UP_DOWN}
             data-action-id={direction}
    >
      <small>{direction !== 'UP' ? <FontAwesomeIcon icon={faAngleLeft}/> : <FontAwesomeIcon icon={faAngleRight}/>}</small>
    </div>
  )
}
