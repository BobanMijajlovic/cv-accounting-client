import React                                from 'react'
import {
  useItemQuery,
  useWarehouseItemsQuery
}                                           from '../../../../graphql/graphql'
import {
  DialogModalRootComponent,
  EasyDialogApolloProvider
}                                           from '../../../../components/EasyModel/EasyModal'
import { CenteredDialog }                   from '../../../../components/Dialog/DialogBasic'
import {
  KeyboardEventCodes,
  useExternalKeyboard
}                                           from '../../../../components/hooks/useExternalKeybaord'
import { queryVariablesItemPurchasePrices } from '../../../../graphql/variablesQ'
import { SpinnerLoadingCenter }             from '../../../../components/Spinner/SpinnerLoading'
import PurchasePriceTable                   from './PurchasePriceTable'
import { TWarehouseItem }                   from '../../../../graphql/type_logic/types'
import ItemView                             from '../view/ItemView'
import ItemShortView                        from '../view/ItemShortView'

const ItemPurchasePriceTable = ({itemId, closeDialog}: { itemId: string, closeDialog: () => void }) => {

  const {data:_item} = useItemQuery({
    notifyOnNetworkStatusChange:true,
    fetchPolicy:'network-only',
    variables:{
      id:Number(itemId)
    },
    skip:!itemId
  })

  const queryWarehouseItems = React.useMemo(() => {
    if (!itemId) {
      return undefined
    }
    return queryVariablesItemPurchasePrices(0, 1000, `${itemId}`)
  }, [itemId])

  const {data:_data, loading} = useWarehouseItemsQuery({
    notifyOnNetworkStatusChange:true,
    fetchPolicy:'network-only',
    variables:queryWarehouseItems,
    skip:!queryWarehouseItems
  })

  const item: any = React.useMemo(() => _item && _item.item && _item.item.id ? _item.item : undefined, [_item])
  const {setRef} = useExternalKeyboard((e: KeyboardEvent) => {
    switch (e.key) {
      case KeyboardEventCodes.Esc:
        closeDialog && closeDialog()
        break
    }
  }, true, [KeyboardEventCodes.Esc], 'item-purchase-price-dialog')

  const data = React.useMemo(() => _data?.data && _data.data.items && _data.data.items.length !== 0 ? _data.data.items : [], [_data])

  return (
    <>
      {loading ? <SpinnerLoadingCenter/> : null}
      <div className={'hw-invoice-preview-root relative d-flex flex-column font-smaller-2 p-2'} ref={setRef}>
        <div className={'w-25'}>
          <ItemShortView item={item}/>
        </div>
        <PurchasePriceTable data={data as TWarehouseItem[]}/>
      </div>
    </>
  )

}

export default ItemPurchasePriceTable

export const openDialogItemPurchasePriceTable = (itemId: string) => {
  EasyDialogApolloProvider((closeDialog: () => any, openDialog: (data: any) => any) => {
    openDialog(<DialogModalRootComponent name={'dialog-item-purchase-price-1404041704041042'} closeFn={closeDialog}>
      <CenteredDialog
          title={'Item purchase price table'}
          closeAction={closeDialog}
          Component={ItemPurchasePriceTable}
          componentRenderProps={{
            closeDialog:closeDialog,
            itemId
          }}
      />
    </DialogModalRootComponent>)
  })
}