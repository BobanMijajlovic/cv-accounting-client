import {CONSTANT_CALCULATION} from '../../../constants'
import {
  faPrint,
  faSearch
} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon}      from '@fortawesome/react-fontawesome'
import React                  from 'react'
import {faEdit}               from '@fortawesome/free-regular-svg-icons'

const CalculationTableActionCell = ({value,model,index} : { value : any,model : any,index : number }) => {
  const {OPENED,SAVED,BOOKED,VALIDATE} = CONSTANT_CALCULATION.STATUS
  const _val = Number(model['status'])
  return (
    <div className={'hw-table-cell-action'}>
      <FontAwesomeIcon className={'color-primary-hover'} icon={faSearch} data-sub-action={'preview'}/>
      { _val === OPENED || _val === SAVED || _val === VALIDATE ?  <FontAwesomeIcon className={'color-primary-hover'} icon={faEdit} data-sub-action={'edit'}/> : <></> }
      <FontAwesomeIcon className={'color-primary-hover'} icon={faPrint} data-sub-action={'print'}/>
    </div>
  )
}
export default CalculationTableActionCell