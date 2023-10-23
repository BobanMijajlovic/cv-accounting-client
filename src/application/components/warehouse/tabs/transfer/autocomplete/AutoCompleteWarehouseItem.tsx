import React                        from 'react'
import {TWarehouseItemInfo}         from '../../../../../../graphql/type_logic/types'
import AutoCompleteResultRenderItem from '../../../../items/autocomplete/AutoCompleteResultRenderItem'
import _                            from 'lodash'

const AutoCompleteWarehouseItem = ({data} : { data : TWarehouseItemInfo }) => {
  const item = _.get(data, 'item') as any
  return <AutoCompleteResultRenderItem data={item}/>

}

export default AutoCompleteWarehouseItem
