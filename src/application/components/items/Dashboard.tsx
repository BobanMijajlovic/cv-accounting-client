import React, {
  useEffect,
  useState
}                                         from 'react'
import SearchView                         from '../_common/SearchView'
import {
  faFileInvoice,
  faPlusCircle
}                                         from '@fortawesome/free-solid-svg-icons'
import {
  CONSTANT_ITEM,
  CONSTANT_MODEL
}                                         from '../../constants'
import {
  IUseOptimizeEventData,
  useOptimizeEventClick
}                                         from '../../../components/hooks/useOptimizeEventClick'
import {useItemsQuery}                    from '../../../graphql/graphql'
import {
  TItem,
  TItemSupplier
}                                         from '../../../graphql/type_logic/types'
import {queryVariablesForItems}           from '../../../graphql/variablesQ'
import SearchViewItemRender               from './SearchViewRender'
import Tabs                               from '../../../components/Tabs/Tabs'
import ItemInfo                           from '../items/info/ItemInfo'
import ItemCard                           from '../items/card/ItemCard'
import ItemStatistic                      from './statistic/ItemStatistic'
import {get as _get}                      from 'lodash'
import {
  openDialogSupplierCode,
  openDialogSupplierCodeDelete
}                                         from './form/ItemSupplier'
import {
  KeyboardEventCodes,
  useExternalKeyboard
}                                         from '../../../components/hooks/useExternalKeybaord'
import {useItemDashboard}                 from '../../../store/items/useItem'
import {openDialogItemPurchasePriceTable} from './info/ItemPurchasePriceTable'
import ItemFormOnePage                    from './form/ItemFormOnePage'
import {SpinnerLoadingCenter}             from '../../../components/Spinner/SpinnerLoading'
import {useAppBar}                        from '../../hooks/useAppBar'

interface IOpenFormState {
  open: boolean
  isItem?: boolean
}

const ItemDashboard = () => {

  const {
    loading,
    selected,
    selectedId,
    searchState,
    setSearchState,
    setSelectedId,
    insertNewItem,
    insertSupplierCode,
    updateSupplierCode,
    updateItem,
    deleteSupplierCode
  } = useItemDashboard()

  const {setButtonsForPage, clearButtonsForPage} = useAppBar()

  const [openForm, setOpenForm]: [IOpenFormState, (b: IOpenFormState) => void] = useState({
    open: false
  } as IOpenFormState)

  const queryVariables = React.useMemo(() => queryVariablesForItems(searchState ? searchState : ''), [searchState])

  const {data: items, refetch: refetchItems} = useItemsQuery({
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'no-cache',
    variables: queryVariables
  })

  const handlerSearch = (value: string) => {
    setSearchState(value)
  }

  useEffect(() => {
    if (selected && selected.id) {
      return
    }
    if (!items || !items.data || !items.data.items || items.data.items.length === 0) {
      return
    }
    const val = items.data.items[0]
    setSelectedId(val.id)
  }, [selected, items])

  const addNewItem = () => {
    setOpenForm({
      open: true,
      isItem: false
    })
        // openDialogItemForm({submitFun: insertNewItem})
  }

  const editItemDetails = () => {
    selected && selected.id &&
        setOpenForm({
          open: true,
          isItem: true
        })
        /*  openDialogItemForm({
            item: selected as TItem,
            submitFun: updateItem
          })*/
  }

  const addNewSupplierCode = () => {
    selected && selected.id &&
        openDialogSupplierCode({item: selected, submitFun: insertSupplierCode})
  }

  const editSupplierCode = (itemSupplierId: string) => {
    const itemSupplier = ((selected as TItem).itemSuppliers as any).find((itemSup: any) => itemSup.id === itemSupplierId)
    selected && selected.id &&
        openDialogSupplierCode({item: selected, submitFun: updateSupplierCode, itemSupplier})
  }

  const {onClickHandler} = useOptimizeEventClick({
    eventHandler (data: IUseOptimizeEventData) {
      if (data.action === CONSTANT_ITEM.EVENTS.SELECTED_ONE) {
        if (items && items.data && data.id) {
          setSelectedId(data.id)
          setOpenForm({
            open: false,
            isItem: false
          })
        }

        return
      }

      if (data.action === CONSTANT_ITEM.EVENTS.ADD_NEW) {
        addNewItem()
        return
      }

      if (data.action === CONSTANT_ITEM.EVENTS.EDIT) {
        editItemDetails()
        return
      }

      if (data.action === CONSTANT_ITEM.EVENTS.ADD_SUPPLIER_CODE) {
        addNewSupplierCode()
        return
      }

      if (data.action === CONSTANT_ITEM.EVENTS.EDIT_SUPPLIER_CODE) {
        editSupplierCode(data.id as string)
        return
      }

      if (data.action === CONSTANT_ITEM.EVENTS.SHOW_PURCHASE_PRICE_HISTORY) {
        data.id && openDialogItemPurchasePriceTable(data.id)
        return
      }

      if (data.action === CONSTANT_ITEM.EVENTS.DELETE_SUPPLIER_CODE) {
        const itemSupplier = _get(selected, 'itemSuppliers', []).find((x: TItemSupplier) => x.id === data.id)
        const actionOnDelete = async () => {
          itemSupplier && itemSupplier.id &&
                    await deleteSupplierCode(_get(itemSupplier, 'id'), {status: CONSTANT_MODEL.STATUS.DELETED})
        }

        itemSupplier && openDialogSupplierCodeDelete({itemSupplier, actionOnDelete})
        return
      }
    }
  })

  useEffect(() => {
    const id = setButtonsForPage([
      {
        label: 'Add',
        icon: faFileInvoice,
        shortcut: KeyboardEventCodes.F4,
        onClick: () => addNewItem()
      },
      {
        label: 'Edit',
        icon: faFileInvoice,
        shortcut: KeyboardEventCodes.F5,
        onClick: () => editItemDetails()
      }
    ])
    return () => clearButtonsForPage(id)
  }, [setButtonsForPage, clearButtonsForPage, selected])

  const {setRef} = useExternalKeyboard((e: KeyboardEvent) => {
    switch (e.key) {
      case KeyboardEventCodes.F6:
        addNewSupplierCode()
        return
      case KeyboardEventCodes.F7:
        selected && selected.id && openDialogItemPurchasePriceTable(selected.id)
        return
    }
  }, true, [KeyboardEventCodes.F6, KeyboardEventCodes.F7], 'items-dashboard')

  if (!items || !items.data) {
    return <></>
  }

  const closeItemForm = () => {
    setOpenForm({
      open: false
    })
  }

  const insertUpdateItem = (item: TItem, callback?: () => void, errorFn ?: (e: any) => void) => {
    return openForm.isItem ? updateItem(item, callback, errorFn) : insertNewItem(item, callback, errorFn)
  }

  return (
    <>
      {loading ? <SpinnerLoadingCenter/> : null}
      <div className={'d-flex h-100 w-100 pt-2 px-2'} ref={setRef}>
        <div
                    className={'d-flex h-100 text-center items-view-render'}
                    onClick={onClickHandler}
                    data-action-root
        >
          <SearchView
                        handlerSearch={handlerSearch}
                        data={items.data}
                        helperText={'search by #barcode, #code, short name'}
                        leftButtonIcon={faPlusCircle}
                        leftButtonEvent={CONSTANT_ITEM.EVENTS.ADD_NEW}
                        RenderComponent={SearchViewItemRender}
                        selectedId={Number(selectedId)}
          />
        </div>
        <div className={'d-flex flex-2 justify-content-start '} onClick={onClickHandler}>
          <div className={'d-flex flex-row w-100 h-100 p-2 ml-2'}>
            {
              openForm.open ?
                <div className={'w-100 h-100'}>
                  <ItemFormOnePage
                                        submitFun={insertUpdateItem}
                                        item={openForm.isItem ? selected : void(0)}
                                        cancelFun={closeItemForm}
                  />
                </div>
                :
                <div className={'w-100 h-100'}>
                  <Tabs
                                        tabs={
                                          [
                                            {
                                              tabName: 'Info',
                                              tabContent: ItemInfo
                                            },
                                            {
                                              tabName: 'Card',
                                              tabContent: ItemCard
                                            },
                                            {
                                              tabName: 'Statistic',
                                              tabContent: ItemStatistic
                                            }
                                          ]
                                        }
                                        stateTab={{active: 0}}
                  />
                </div>
            }
          </div>
        </div>
      </div>
    </>
  )

}

export default ItemDashboard

