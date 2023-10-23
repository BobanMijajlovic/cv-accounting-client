import React           from 'react'
import { useItem }     from '../../../hooks/useItem'
import { get as _get } from 'lodash'
import ComponentRender from '../../../../components/Util/ComponentRender'

const ItemView = () => {
  const {data: globalItemData} = useItem()

  const item = _get(globalItemData, 'selected')
  return (
    <div className={'d-flex flex-row justify-content-between align-items-center hw-info-view-root font-smaller-2'}>
      <ComponentRender justify-content={'center'} label={'Item name'} model={item} field={'shortName'} classNames={'font-bold'}/>
      <ComponentRender justify-content={'center'} label={'Barcode'} model={item} field={'barCode'}/>
      <ComponentRender justify-content={'center'} label={'Code'} model={item} field={'code'}/>
    </div>
  )
}

export default ItemView