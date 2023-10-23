import React, {
  useEffect,
  useState
}                                            from 'react'
import SearchView, {IComponentRenderProps}   from '../_common/SearchView'
import {queryVariablesForWarehouseItemsInfo} from '../../../graphql/variablesQ'
import {useWarehouseItemsInfoQuery}          from '../../../graphql/graphql'
import {TWarehouseItemInfo}                  from '../../../graphql/type_logic/types'
import {CONSTANT_WAREHOUSE}                  from '../../constants'
import {FontAwesomeIcon}                     from '@fortawesome/react-fontawesome'
import {faCheckCircle}                       from '@fortawesome/free-regular-svg-icons'
import EmptyTag                              from '../../../components/Util/EmptyTag'
import {useWarehouse}                        from '../../../store/warehouse/useWarehouse'
import _                                     from 'lodash'
import {formatQuantity}                      from '../../utils/Utils'

interface ISearchViewWarehouseProps {
  warehouseId : string
}

const SearchViewWarehouse = ({warehouseId} : ISearchViewWarehouseProps) => {

  const [stateSearch, setStateSearch] = useState('')
  const {data, setSelectedItemId} = useWarehouse(warehouseId)

  const selectedItemId = React.useMemo(() => {
    return _.get(data, 'item.id', 0)
  }, [data])

  const queryVariablesItemsInfo = React.useMemo(() => queryVariablesForWarehouseItemsInfo(`${warehouseId}`, stateSearch), [stateSearch, warehouseId])

  const {data: warehouseItemsInfo} = useWarehouseItemsInfoQuery({
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'network-only',
    variables: queryVariablesItemsInfo
  })

  useEffect(() => {
    if (!warehouseItemsInfo || !warehouseItemsInfo.data || warehouseItemsInfo.data.items.length === 0 || selectedItemId !== 0) {
      return
    }
    const itemId = _.get(warehouseItemsInfo.data.items[0], 'id') as string
    setSelectedItemId(itemId)
  }, [warehouseItemsInfo, setSelectedItemId,selectedItemId])

  const handlerSearch = (value : string) => setStateSearch(value)

  if (!warehouseItemsInfo || !warehouseItemsInfo.data) {
    return <></>
  }

  return (
    <div
            className={'d-flex text-center warehouse-view-render'}
            data-action-root
    >
      <SearchView
                handlerSearch={handlerSearch}
                data={warehouseItemsInfo.data}
                helperText={'search by name'}
                RenderComponent={SearchViewWarehouseItemRender}
                selectedId={Number(selectedItemId)}
                className={'warehouse-search-view'}
      />
    </div>
  )
}

export default SearchViewWarehouse

export const SearchViewWarehouseItemRender = ({model, classNames, selected} : IComponentRenderProps) => {
  const _model = model as TWarehouseItemInfo
  const item : any = _.get(_model, 'item')
  const quantity = _.get(_model, 'warehouseItem.quantityOnStack')
  const itemName = !item ? '' : item.shortName.substring(0,25)
  return (
    <div
            className={`d-flex flex-fill flex-column py-1 border-bottom cursor-pointer search-view-render-row${selected ? ' search-view-selected' : ''}${classNames ? ` ${classNames}` : ''} `}
            data-action={CONSTANT_WAREHOUSE.EVENTS.SELECT_ITEM}
            data-action-id={_model.id}
    >
      <div className={'d-flex flex-row flex-fill justify-content-between align-items-center px-1 '}>
        <div className={'d-flex font-smaller-4 text-center font-weight-400 '}>
          <EmptyTag field={'barCode'} model={item} placeholder={'Barcode'}/>
        </div>
        {selected ? <FontAwesomeIcon className={'opacity-6 mr-4'} icon={faCheckCircle}  /> : null}
        <div className={'d-flex  font-smaller-4 text-center font-weight-400'}>
          <EmptyTag field={'code'} model={item} placeholder={'Code'}/>
        </div>
      </div>
      <div className={'d-flex flex-row justify-content-between align-items-center px-1 pt-1 font-smaller-3 font-weight-600 line-height-11 flex-2'}>
        <div>{itemName}</div>
        <div className={'font-smaller-4 font-weight-400'}>{formatQuantity(quantity)}</div>

      </div>
    </div>
  )
}
