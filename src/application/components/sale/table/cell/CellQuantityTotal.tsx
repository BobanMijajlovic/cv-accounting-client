import React                   from 'react'
import {CONSTANT_SALE}         from '../../../../constants'
import {
    formatPrice,
    formatQuantity
}                              from '../../../../utils/Utils'
import {getReceiptItemFinance} from '../../util'

export interface ICellQuantityTotalProps {
  itemReceipt : any
}

const CellQuantityTotal = ({itemReceipt} : ICellQuantityTotalProps) => {
  return (
    <>
      <div
            className={'d-flex flex-fill flex-row justify-content-between cursor-pointer column-data-style'}
            data-action={CONSTANT_SALE.EVENTS.SALE_EDIT_QUANTITY}
            data-action-id={itemReceipt.id}
      >
        <div className={'d-flex justify-content-start column-data-style'}>
          <div className={'text-left align-self-start pr-1 opacity-7 font-smaller-2'}><small><sub>x</sub></small>
          </div>
          <div
                    className={'text-left  align-self-start color-gray font-weight-400 '}>{formatQuantity(itemReceipt.quantity)} </div>
        </div>
        <div
                className={' align-self-end font-weight-600 font-bigger-4 color-gray pt-3'}>{formatPrice(getReceiptItemFinance(itemReceipt))}</div>
      </div></>
  )
}

export default CellQuantityTotal