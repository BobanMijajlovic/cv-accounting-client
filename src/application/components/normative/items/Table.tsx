import React, {
  useEffect,
  useMemo,
  useState
}                                           from 'react'
import { useNormativeDashboard }            from '../../../../store/normative/useNormative'
import { NORMATIVE_ITEMS_TABLE_NAME }       from '../../../constants'
import Table                                from '../../../../components/Table/Table'
import { NumberCellColumnSmall }            from '../../../../components/Table/render/CellRender'
import { RenderCalculationNameBody }        from '../../invoice/form/items/Table'
import {
  EVENT_TYPE_CHANGE_MODEL_FIELD,
  InputTextEditorQuantity
}                                           from '../../../../components/Table/editors/InputTextEditor'
import {
  formatPrice,
  formatQuantity
}                                           from '../../../utils/Utils'
import { useTranslationFunction }           from '../../../../components/Translation/useTranslation'
import { TableHeaderRenderManageColumns }   from '../../../../components/Table/render/HeaderRender'
import { FontAwesomeIcon }                  from '@fortawesome/react-fontawesome'
import { faTimes }                          from '@fortawesome/free-solid-svg-icons'
import { ITableModelCellChanged }           from '../../../../components/Table'
import ConditionalRendering                 from '../../../../components/Util/ConditionalRender'
import PreviewNormativeTable                from '../preview/PreviewNormativeTable'
import BreadCrumb, { IBreadCrumbItemProps } from '../../../../components/BreadCrumb/BreadCrumb'
import { setSelectedNormative }             from '../../../../store/normative/action'
import { TItem }                            from '../../../../graphql/type_logic/types'

const ItemsTableAction = ( { value, model, index, additionalData } : { value : any, model : any, index : number, additionalData? : any } ) => {
  return (
    <div className={ 'hw-table-cell-action' }>
      <FontAwesomeIcon className={ 'color-danger-hover' } icon={ faTimes } data-sub-action={ 'delete' }/>
    </div>
  )
}

export const normativeItemsTableHeader = [
  {
    label : '#',
    notHide : true,
    field : 'posNumber',
    cell : {
      classes : ['text-center'],
      render : NumberCellColumnSmall
    }
  },
  {
    label : 'ITEM_PRICE_LABEL_ITEM_NAME',
    field : 'item',
    cell : {
      classes : ['text-left'],
      render : RenderCalculationNameBody
    }
  },
  {
    label : 'LABEL_QTY',
    field : 'quantity',
    width : 200,
    cell : {
      editor : {
        render : InputTextEditorQuantity
      },
      classes : ['text-right'],
      format : ( value : string ) => {
        return formatQuantity( value )
      }
    }
  },
  {
    label : 'LABEL_PRICE_STACK',
    field : 'priceStack',
    width : 200,
    cell : {
      classes : ['text-right'],
      format : ( value : string ) => {
        return formatPrice( value )
      }
    }
  },
  {
    field : 'act',
    notHide : true,
    notVisible : false,
    notResize : true,
    cell : {
      classes : ['hw-table-cell-center'],
      render : ItemsTableAction,
      style : {
        width : '50px'
      }
    },
    width : '50px',
    render : TableHeaderRenderManageColumns
  }
]

const NormativeItemsTable = () => {
  const { translate } = useTranslationFunction()
  const { normative, deleteItem, updateItem, addNormative, selectedNormative } = useNormativeDashboard()
  
  const items = useMemo( () => !normative || !normative?.items ? [] : normative.items.map(x =>  {
    const item = x.item as TItem
    return {
      ...x,
      priceStack : item.warehouseItems && item.warehouseItems.length !== 0 ? item.warehouseItems[0].priceStack : '0'
    }
  } ), [normative] )

  const handlerDataEventClick = ( event : any, id : any, action : any, param : any ) => {
    if ( action === 'table-cell-edit' && id && param !== 'quantity' ) {
      const normativeItem = items.find( x => x.id === id )
      if ( normativeItem && normativeItem.activeNormativeId) {
        addNormative({
          id: `${normativeItem.activeNormativeId}`,
          label: (normativeItem.item as any).shortName
        })
        return
      }
    }

    if ( action === 'delete' && id ) {
      deleteItem( Number( id ) )
      return
    }
  }

  const handlerModelFieldChanged = ( data : ITableModelCellChanged ) => {
    if ( data.type === EVENT_TYPE_CHANGE_MODEL_FIELD ) {
      updateItem && updateItem( data.value, data.field, data.model )
      return
    }
  }

  const tableHeader = React.useMemo( () => {
    if ( !normativeItemsTableHeader ) {
      return []
    }
    let header = [...normativeItemsTableHeader] as any
    if (selectedNormative.length > 1) {
      header =  header.map( (x: any) => {
        return {
          ...x,
          notResize : true,
          cell : {
            ...x.cell,
            editor : void( 0 )
          }
        }
      } )
      const index : any = normativeItemsTableHeader.findIndex( x => x.field === 'act' )
      if ( index === -1 ) {
        return header
      }
      header[index] = {
        ...header[index],
        notResize : true
      } as any
      header.splice( index, 1 )
    }
    return header.map( ( x : any ) => {
      return {
        ...x,
        label : x.label && x.label !== '#' ? translate( x.label ) : x.label
      }
    } )
  }, [normativeItemsTableHeader, selectedNormative] )

  return (
    <>
      <Table
                    tableName={ NORMATIVE_ITEMS_TABLE_NAME }
                    header={ tableHeader }
                    data={ items }
                    separator={ 'cell' }
                    handlerEventModelFieldChanged={ handlerModelFieldChanged }
                    handlerEventDataClick={ handlerDataEventClick }
                    scrollable
                    additionalData={ items }
      />
    </>
  )
}

export default NormativeItemsTable

