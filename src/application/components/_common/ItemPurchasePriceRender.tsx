import React, { useMemo } from 'react'
import { TWarehouseItem } from '../../../graphql/type_logic/types'
import { formatPrice }    from '../../utils/Utils'

const ItemPurchasePriceRender = ({warehouseItems}: { warehouseItems: TWarehouseItem[] }) => {
  const warehouseItem = useMemo(() => warehouseItems && warehouseItems.length !== 0 ? warehouseItems[0] : void(0), [warehouseItems])
  return ( 
    <div className={'px-1 font-smaller-1 font-weight-bold flex-2 text-right'}>
      {warehouseItem ? formatPrice(warehouseItem.priceTransaction as number) : <span className={'opacity-6'}>##.##</span>}
    </div>
  )
}

export default ItemPurchasePriceRender

export const ItemStackPriceRender = ({warehouseItems}: { warehouseItems: TWarehouseItem[] }) => {
  const warehouseItem = useMemo(() => warehouseItems && warehouseItems.length !== 0 ? warehouseItems[0] : void(0), [warehouseItems])
  return (
    <div className={'px-1 font-smaller-1 font-weight-bold flex-2 text-right'}>
      {warehouseItem ? formatPrice(warehouseItem.priceStack as number) : <span className={'opacity-6'}>##.##</span>}
    </div>
  )
}