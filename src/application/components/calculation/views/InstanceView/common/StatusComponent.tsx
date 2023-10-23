import React                  from 'react'
import {CONSTANT_CALCULATION} from '../../../../../constants'
import {
  faBookOpen,
  faCheckDouble,
  faFolderOpen,
  faSave
} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon}      from '@fortawesome/react-fontawesome'

const StatusComponent = ({status} : { status : number }) => {
  const data : any = React.useMemo(() => {
    switch (status) {
      case CONSTANT_CALCULATION.STATUS.OPENED:
        return {
          icon: faFolderOpen,
          color: 'color-danger',
          title: 'OPENED'
        }
      case CONSTANT_CALCULATION.STATUS.VALIDATE:
        return {
          icon: faCheckDouble,
          color: 'color-success',
          title: 'VALIDATE'
        }
      case CONSTANT_CALCULATION.STATUS.SAVED:
        return {
          icon: faSave,
          color: 'color-secondary',
          title: 'SAVED'
        }
      case CONSTANT_CALCULATION.STATUS.BOOKED:
        return {
          icon: faBookOpen,
          color: 'color-primary',
          title: 'BOOKED'
        }
    }
  }, [status])
  return (
    <div className={'font-smaller-4 color-primary hw-calculation-status'}>
      {data ? <span ><FontAwesomeIcon icon={data.icon} className={data.color}/> &nbsp; {data.title} </span> : <></>}
    </div>
  )
}

export default StatusComponent
