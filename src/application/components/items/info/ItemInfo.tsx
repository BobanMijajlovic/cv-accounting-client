import React                   from 'react'
import GeneralDetails          from './GeneralDetails'
import { get as _get }         from 'lodash'
import SuppliersCodes          from './SuppliersCodes'
import { useItemDashboard }    from '../../../../store/items/useItem'
import ItemWarehouseTable      from './ItemWarehouseTable'
import DivExternalKeyboardRoot from '../../../../components/hooks/DivParentExternalKeybardRoot'

const ItemInfo = () => {
  const {selected:globalItemData} = useItemDashboard()
  const itemSuppliers = React.useMemo(() => {
    return _get(globalItemData, 'itemSuppliers', [])
  }, [globalItemData])

  return (
    <DivExternalKeyboardRoot className={'d-flex flex-column hw-item-info-root'}>
      <div className={'d-flex flex-row flex-fill'}>
        <div className={'w-50 mr-5'}>
          <GeneralDetails notShowEditButton/>
        </div>
        <div className={'w-50'}>
          <SuppliersCodes itemSuppliers={itemSuppliers}/>
        </div>
      </div>
      <ItemWarehouseTable/>
    </DivExternalKeyboardRoot>
  )
}

export default ItemInfo
