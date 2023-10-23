import React             from 'react'
import {CONSTANT_SALE}   from '../../../../constants'
import {VatCustomRender} from '../../../_common/VatRender'
import {formatPrice}     from '../../../../utils/Utils'
export interface ICellQuantityTotalProps {
  itemReceipt : any
}
const CellPrice = ({itemReceipt} : ICellQuantityTotalProps) => {
  return (
    <>
      <div
            className={'d-flex flex-fill flex-row justify-content-between cursor-pointer column-data-style'}
            data-action={CONSTANT_SALE.EVENTS.SALE_EDIT_PRICE}
            data-action-id={itemReceipt.id}
      >
        <div>
          <VatCustomRender value={itemReceipt.item.taxId} classNames={'font-smaller-2'} />
        </div>
        <div className={'align-self-end font-bigger-4 color-gray font-weight-600 pt-3'}>{formatPrice(itemReceipt.price)}</div>
      </div>
    </>
  )
}

export default CellPrice