import React, { useMemo }        from 'react'
import NormativeItemForm         from '../items/ItemForm'
import NormativeItemsTable       from '../items/Table'
import DivExternalKeyboardRoot   from '../../../../components/hooks/DivParentExternalKeybardRoot'
import BreadCrumb                from '../../../../components/BreadCrumb/BreadCrumb'
import { useNormativeDashboard } from '../../../../store/normative/useNormative'
import ConditionalRendering      from '../../../../components/Util/ConditionalRender'
import { TItem }                        from '../../../../graphql/type_logic/types'
import ItemInfo, { TItemInfoNormative } from './ItemInfo'

const NormativeItems = () => {

  const { normative, selectedNormative, addNormative, selectedNormativeId } = useNormativeDashboard()

  const items = useMemo( () => [...selectedNormative].reverse(), [selectedNormative] )

  const previewItem = useMemo( () => normative && normative.item ? normative.item as TItemInfoNormative : {} as TItemInfoNormative, [normative] )

  return (
    <div className={ 'd-flex flex-column w-100' }>
      <ConditionalRendering condition={ items.length === 1 }>
        <NormativeItemForm/>
      </ConditionalRendering>
      <ConditionalRendering condition={ items.length > 1 }>
        <ItemInfo item={ previewItem }/>
      </ConditionalRendering>
      <div className={ 'flex-2 pt-2' }>
        <ConditionalRendering condition={ items.length !== 1 }>
          <BreadCrumb items={ items } selected={`${selectedNormativeId}`} onClick={ addNormative }/>
        </ConditionalRendering>
        <NormativeItemsTable/>
      </div>
    </div>
  )
}

export default NormativeItems