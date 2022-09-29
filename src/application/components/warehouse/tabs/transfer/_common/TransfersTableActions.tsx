import {
  faCheckDouble,
  faPrint,
  faSearch,
  faTimes
} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon}             from '@fortawesome/react-fontawesome'
import React                         from 'react'
import {faEdit}                      from '@fortawesome/free-regular-svg-icons'
import {CONSTANT_WAREHOUSE_TRANSFER} from '../../../../../constants'
import {get as _get}                 from 'lodash'

const TransferTableActions = ({value, model, index,additionalData} : { value : any, model : any, index : number,additionalData : any }) => {
  const {OPENED, SAVED, CANCELED} = CONSTANT_WAREHOUSE_TRANSFER.STATUS
  const _val = Number(_get(additionalData[index],'status'))
  return (
    <div className={'d-flex justify-content-around align-items-center'}>
      <FontAwesomeIcon className={'color-primary-hover'} icon={faSearch} data-sub-action={'preview'}/>
      {_val !== CANCELED && (<FontAwesomeIcon className={'color-primary-hover'} icon={faPrint} data-sub-action={'print'}/>)}
      {_val === OPENED && (<>
        <FontAwesomeIcon className={'color-success-hover'} icon={faCheckDouble} data-sub-action={'save'}/>
        <FontAwesomeIcon className={'color-primary-hover'} icon={faEdit} data-sub-action={'edit'}/>
        <FontAwesomeIcon className={'color-primary-hover'} icon={faTimes} data-sub-action={'delete'}/>
      </>
      )}
    </div>
  )
}
export default TransferTableActions