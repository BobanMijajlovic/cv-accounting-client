import {
  TItem,
  TWarehouseItem
}                                           from '../../../../graphql/type_logic/types'
import { useTranslationFunction }           from '../../../../components/Translation/useTranslation'
import EmptyTag                             from '../../../../components/Util/EmptyTag'
import { formatPrice }                      from '../../../utils/Utils'
import React, { useMemo }                   from 'react'
import { useWarehouseItemsQuery }           from '../../../../graphql/graphql'
import { get as _get }                      from 'lodash'
import { queryVariablesItemPurchasePrices } from '../../../../graphql/variablesQ'
import { ItemStackPriceRender }             from '../../_common/ItemPurchasePriceRender'

export type TItemInfoNormative = TItem & Record<'itemNormativePrice', number>

const ItemInfo = ( { item } : { item : TItemInfoNormative } ) => {
  const { translate } = useTranslationFunction()

  const queryWarehouseItems = React.useMemo( () => {
    const itemId = _get( item, 'id', 0 )
    if ( !itemId ) {
      return undefined
    }
    return queryVariablesItemPurchasePrices( 0, 1, `${ itemId }` )
  }, [item] )

  const { data } = useWarehouseItemsQuery( {
    notifyOnNetworkStatusChange : true,
    fetchPolicy : 'cache-and-network',
    variables : queryWarehouseItems,
    skip : !queryWarehouseItems
  } )

  const warehouseItems = useMemo( () => !data || !data.data || !data.data.items ? [] : data.data.items, [data] )

  return (
    <div className={ 'd-flex flex-column' }>
      <div className={ 'font-bigger-2 font-weight-300 line-height-11 color-primary font-weight-600 pb-2' }>
        <EmptyTag model={ item } field={ 'shortName' } placeholder={ translate( 'LABEL_SHORT_NAME' ) }/>
      </div>
      <div className={ 'd-flex flex-column hw-items-general-details-row' }>
        <div className={ 'd-flex flex-row justify-content-start align-items-center color-primary' }>
          <div className={ 'font-smaller-3 text-left opacity-6 min-width-120' }>{ translate( 'BARCODE', true ) }&nbsp;:</div>
          <div className={ 'px-1 font-smaller-1 font-weight-bold flex-2 text-right' }>
            <EmptyTag model={ item } field={ 'barCode' } placeholder={ '#########' }/>
          </div>
        </div>
        <div className={ 'd-flex flex-row align-items-center color-primary' }>
          <div className={ 'font-smaller-3 text-left opacity-6 min-width-120' }>{ translate( 'CODE', true ) }&nbsp;:</div>
          <div className={ 'px-1 font-smaller-1 font-weight-bold flex-2 text-right' }>
            <EmptyTag model={ item } field={ 'code' } placeholder={ '#########' }/>
          </div>
        </div>
        <div className={ 'd-flex flex-row align-items-center color-primary' }>
          <div className={ 'font-smaller-3 text-left opacity-6 min-width-120' }>{ translate( 'ITEMS_WHOLESALE_PRICE', true ) }&nbsp;:</div>
          <div className={ 'px-1 font-smaller-1 font-weight-bold flex-2 text-right' }>
            <EmptyTag model={ item } field={ 'vp' } placeholder={ '####' } format={ formatPrice }/>
          </div>
        </div>
        <div className={ 'd-flex flex-row align-items-center color-primary relative' }>
          <div className={ 'font-smaller-3 text-left opacity-6 min-width-120' }> Price stack&nbsp;:</div>
          { item ? <ItemStackPriceRender warehouseItems={ warehouseItems as TWarehouseItem[] }/> : <span className={ 'opacity-6' }>##.##</span> }
        </div>
        <div className={ 'd-flex flex-row align-items-center color-primary relative' }>
          <div className={ 'font-smaller-3 text-left opacity-6 min-width-120' }> Normative price&nbsp;:</div>
          <div className={ 'px-1 font-smaller-1 font-weight-bold flex-2 text-right' }>
            <EmptyTag model={ item } field={ 'itemNormativePrice' } placeholder={ '###.##' } format={ formatPrice }/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ItemInfo