import React, { useMemo }                      from 'react'
import { useProductionOrderForm }              from '../../../../../../store/production-order/useProductionOrder'
import {
  TItem,
  TProductionOrder
}                                              from '../../../../../../graphql/type_logic/types'
import EmptyTag                                from '../../../../../../components/Util/EmptyTag'
import {
  formatDateLong,
  formatPrice
}                                              from '../../../../../utils/Utils'
import { openDialogProductionOrderHeaderForm } from './Form'

interface IProductionOrderHeader {
  productionOrder : TProductionOrder
  isPreview? : boolean
}

const ProductionOrderHeader = ( { productionOrder:_productionOrder, isPreview } : IProductionOrderHeader ) => {

  const productionOrder  = _productionOrder as any
  const { updateProductionOrder } = useProductionOrderForm( productionOrder.id )

  const item = useMemo( () => productionOrder.item as TItem, [productionOrder] )

  const field = useMemo( () => item && item.shortName && item.shortName.length > 0 ? 'shortName' : 'fullName', [item] )
  const normative = useMemo( () => productionOrder.normative, [productionOrder] )

  const handlerUpdateProductionHeader = async ( prodOrder : TProductionOrder ) => {
    await updateProductionOrder( prodOrder )
  }

  const handlerChangeHeader = () => {
    !isPreview && openDialogProductionOrderHeaderForm( {
      handlerSuccess : handlerUpdateProductionHeader,
      productionOrderId: productionOrder.id
    } )
  }

  return (
    <div onClick={ handlerChangeHeader } className={ 'd-flex flex-row align-items-center justify-content-between px-2 mb-1 font-smaller-2 color-primary w-100 cursor-pointer' }>
      <div className={ 'font-bold text-upper d-flex flex-column text-center' }>
        <div className={ 'font-smaller-6 opacity-6 font-weight-600 hw-show-hide-header-label text-center' }>number #</div>
        <EmptyTag model={ productionOrder } field={ 'number' } placeholder={ 'NUMBER #' }/>
      </div>
      <div className={ 'font-bold text-upper d-flex flex-column text-center' }>
        <div className={ ' font-smaller-6 opacity-6 hw-show-hide-header-label text-center' }>invoice date</div>
        { ( productionOrder as any ).date ? formatDateLong( `${ productionOrder.date }` ) : 'Production order DATE' }
      </div>
      <div className={ 'font-bold text-upper d-flex flex-column text-center' }>
        <div className={ 'font-smaller-6 opacity-6 hw-show-hide-header-label' }>ITEM NAME</div>
        <EmptyTag model={ item } field={ field } placeholder={ 'ITEM NAME' }/>
      </div>
      <div className={ 'font-bold text-upper d-flex flex-column text-center' }>
        <div className={ 'font-smaller-6 opacity-6 hw-show-hide-header-label' }>NORMATIVE</div>
        <EmptyTag model={ normative } field={ 'description' } placeholder={ 'NORMATIVE' }/>
      </div>
      <div className={ 'font-bold text-upper d-flex flex-column text-center' }>
        <div className={ ' font-smaller-6 opacity-6 hw-show-hide-header-label text-center' }>Quantity</div>
        { formatPrice( `${ productionOrder.quantity }` ) }
      </div>
    </div>
  )
}

export default ProductionOrderHeader