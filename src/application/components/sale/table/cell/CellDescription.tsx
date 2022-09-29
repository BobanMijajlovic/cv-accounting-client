import React             from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faTimes}       from '@fortawesome/free-solid-svg-icons'
import {CONSTANT_SALE} from '../../../../constants'
export interface ICellDescription {
  itemReceipt : any
  index : number
}
const CellDescription = ({itemReceipt, index} : ICellDescription) => {
  return (
    <>
      <div className={'d-flex flex-fill flex-row color-gray  justify-content-between align-items-center'}>
        <div className={'d-flex flex-fill flex-row justify-content-between'}>
          <div className={'px-1 d-flex flex-column col-md-2'}
               data-action={CONSTANT_SALE.EVENTS.SALE_REMOVE_ITEM}
               data-action-id={itemReceipt.id}
          >
            <small><sup>#</sup>{index}</small>
            <div className={'pl-1 pr-2'}

            >
              <FontAwesomeIcon className={'icon-hover icon-active color-primary opacity-8'}
                                         icon={faTimes}></FontAwesomeIcon>
            </div>
          </div>
        </div>
        <div className={'flex-fill text-left text-upper font-bigger-2 font-weight-300 col-10 '}>
          <div>{itemReceipt.item.shortName}</div>
        </div>

        <div className={'text-right col-md-3'}><small
                className={'font-weight-400 '}>{itemReceipt.item.barCode}</small></div>

      </div>
     
    </>
  )
}

export default CellDescription

