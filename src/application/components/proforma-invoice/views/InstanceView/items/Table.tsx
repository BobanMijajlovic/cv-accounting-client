import React                              from 'react'
import _                                  from 'lodash'
import { FontAwesomeIcon }                from '@fortawesome/react-fontawesome'
import {
  faBan,
  faPercentage,
  faTimes
}                                         from '@fortawesome/free-solid-svg-icons'
import {
  formatPrice,
  formatQuantity,
  getUnit
}                                         from '../../../../../utils/Utils'
import { NumberCellColumnSmall }          from '../../../../../../components/Table/render/CellRender'
import {
  EVENT_TYPE_CHANGE_MODEL_FIELD,
  InputTextEditorCurrency,
  InputTextEditorQuantity
}                                         from '../../../../../../components/Table/editors/InputTextEditor'
import {
  SummarizeCellDiscount,
  SummarizeCellTax
}                                         from '../../../../invoice/_common/SumarizeCell'
import { TableHeaderRenderManageColumns } from '../../../../../../components/Table/render/HeaderRender'
import {
  TDiscounts,
  TInvoiceItem,
  TInvoiceItemDiscount,
  TProformaInvoice
}                                         from '../../../../../../graphql/type_logic/types'
import {
  CONSTANT_INVOICE,
  DISCOUNT_SURCHARGE,
  DISCOUNT_SURCHARGE_TYPE,
  PROFORMA_INVOICE_FORM_ITEMS_TABLE_NAME
}                                         from '../../../../../constants'
import {
  IDiscountSurcharge,
  openDialogDiscountForm
}                                         from '../../../../calculation/views/InstanceView/items/DiscountForm'
import { ITableModelCellChanged }         from '../../../../../../components/Table'
import Table                              from '../../../../../../components/Table/Table'
import ConditionalRendering               from '../../../../../../components/Util/ConditionalRender'

const _RenderCalculationNameBody = ( { value } : any ) => {
  return (
    <div
            className={ 'd-flex justify-content-between flex-fill' }
    >
      <div className={ 'font-smaller-1' }>{ value.shortName }</div>
      <div className={ 'd-flex justify-content-between align-items-center font-smaller-4' }>
        <div className={ 'pr-2' }>{ getUnit( value.uom ) }</div>
        <div>{ value.barCode }</div>
      </div>
    </div>
  )
}

export const RenderCalculationNameBody = React.memo( _RenderCalculationNameBody,
    ( prevProps, nextProps ) => {
      return ( nextProps.value.barCode === prevProps.value.barCode ) && ( nextProps.value.shortName === prevProps.value.shortName ) && ( nextProps.value.uom === prevProps.value.uom )
    } )

const ItemsTableAction = ( { value, model, index, additionalData } : { value : any, model : any, index : number, additionalData? : any } ) => {
  const isUseDiscount = React.useMemo( () => !!_.get( model, 'discount.discountDefault' ), [model] )
  const isDefDiscountValid = React.useMemo( () => !!_.get( additionalData, 'discountDefault' ), [additionalData] )
  return (
    <div className={ 'hw-table-cell-action' }>
      <ConditionalRendering condition={ isDefDiscountValid }>
        { isUseDiscount ?
          <FontAwesomeIcon className={ 'color-primary-hover use' } icon={ faBan } data-sub-action={ 'not-use-discount-default' } data-action-param={ model.item.id }/>
          : <FontAwesomeIcon className={ 'color-primary-hover use' } icon={ faPercentage } data-sub-action={ 'use-discount-default' } data-action-param={ model.item.id }/> }
      </ConditionalRendering>
      <FontAwesomeIcon className={ 'color-danger-hover' } icon={ faTimes } data-sub-action={ 'delete' }/>
    </div>
  )
}

export const invoiceItemsTableHeader = [
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
    label : 'Name',
    field : 'item',
    cell : {
      classes : ['text-left'],
      render : RenderCalculationNameBody
    }
  },
  {
    label : 'Warehouse',
    field : 'warehouse',
    cell : {
      classes : ['text-center', 'font-smaller-2'],
      format : ( value : any ) => `${ value.name }`
    }
  },
  {
    label : 'Qty',
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
    label : 'Price',
    field : 'price',
    cell : {
      editor : {
        render : InputTextEditorCurrency
      },
      classes : ['text-right'],
      format : ( value : string ) => {
        return formatPrice( value )
      }
    }
  },
  {
    label : 'Disc',
    field : 'discount',
    cell : {
      classes : ['text-right'],
      render : SummarizeCellDiscount
    }
  },
  {
    label : 'Base Finance',
    field : 'financeFinalVP',
    cell : {
      classes : ['text-right'],
      format : ( value : string ) => {
        return formatPrice( value )
      }
    }
  },
  {
    label : 'Tax',
    field : 'taxFinance',
    width : 100,
    cell : {
      classes : ['text-right'],
      render : SummarizeCellTax
    }
  },
  {
    label : 'Total finance',
    field : 'financeMP',
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
      render : ItemsTableAction
    },
    width : '50px',
    render : TableHeaderRenderManageColumns
  }
]

interface IProformaInvoiceItemsTableProps {
  proformaInvoice : TProformaInvoice
  updateItem? : ( value : number | string, field : string, model : any ) => void
  updateDiscount? : ( value : TInvoiceItemDiscount, field : string, model : any, useDiscountDefault ? : boolean ) => void
  deleteItem? : ( id : string ) => void
  headerState : boolean
  defaultDiscount? : TDiscounts
}

const summarize = {
  fields : ['financeFinalVP', 'taxFinance', 'financeMP', 'discount']
}

const ItemsTable = ( { proformaInvoice, defaultDiscount, updateItem, updateDiscount, deleteItem, headerState } : IProformaInvoiceItemsTableProps ) => {
  const items : TInvoiceItem[] = ( proformaInvoice as any ).items

  const tableData = React.useMemo( () => {
    if ( !items ) {
      return []
    }
    return items.map( ( item : TInvoiceItem ) => {
      const _item = ( item.item as any )
      const financeMP = _.round( _.add( Number( item.financeFinalVP ), Number( item.taxFinance ) ), 2 )
      return {
        ...item,
        uom : `${ _item.uom }`,
        discount : item.discount && ( item as any ).discount.length !== 0 ? {
          type : DISCOUNT_SURCHARGE_TYPE.PERCENT,
          node : DISCOUNT_SURCHARGE.DISCOUNT,
          value : ( item as any ).discount[0].percent,
          discountDefault : item?.useDiscountDefault === CONSTANT_INVOICE.TYPE.DEFAULT_DISCOUNT.ACTIVE ? defaultDiscount : void( 0 )
        } : {
          discountDefault : item?.useDiscountDefault === CONSTANT_INVOICE.TYPE.DEFAULT_DISCOUNT.ACTIVE ? defaultDiscount : void( 0 )
        },
        financeMP,
        finalPriceMP : _.round( _.divide( financeMP, Number( item.quantity ) ), 2 )
      }
    } )
  }, [items, defaultDiscount] )

  const handlerSetDiscount = async ( discount : IDiscountSurcharge, model : any, useDiscountDefault ? : boolean ) => {
    updateDiscount && await updateDiscount( Object.assign( discount.type === DISCOUNT_SURCHARGE_TYPE.FINANCE ? { value : discount.value } : { percent : discount.value } ), 'discount', model, useDiscountDefault )
  }

  const handlerUseDiscountDefault = ( value : number, model : any ) => {
    updateItem && updateItem( value, 'useDiscountDefault', model )
  }

  const handlerDataEventClick = ( event : any, id : any, action : any, param : any ) => {

    if ( !event.detail || event.detail !== 1 ) {
      return
    }

    if ( action === 'delete' ) {
      id && deleteItem && deleteItem( id )
      return
    }

    if ( action === 'not-use-discount-default' ) {
      id && handlerUseDiscountDefault( CONSTANT_INVOICE.TYPE.DEFAULT_DISCOUNT.NOT_ACTIVE, { id : id, item : { id : param } } )
      return
    }

    if ( action === 'use-discount-default' ) {
      id && handlerUseDiscountDefault( CONSTANT_INVOICE.TYPE.DEFAULT_DISCOUNT.ACTIVE, { id : id, item : { id : param } } )
      return
    }

    if ( action === 'table-cell-edit' && param === 'discount' ) {
      const item = tableData.find( ( x : any ) => Number( x.id ) === Number( id ) )
      item && openDialogDiscountForm( { item, handlerSuccess : handlerSetDiscount, description : false } )
      return
    }
  }

  const handlerModelFieldChanged = ( data : ITableModelCellChanged ) => {
    if ( data.type === EVENT_TYPE_CHANGE_MODEL_FIELD ) {
      updateItem && updateItem( data.value, data.field, data.model )
      return
    }
  }

  return (
    <Table
            modelFields={ ['taxPercent', 'taxId'] }
            handlerEventDataClick={ handlerDataEventClick }
            header={ invoiceItemsTableHeader }
            separator={ 'cell' }
            data={ tableData }
            handlerEventModelFieldChanged={ handlerModelFieldChanged }
            tableName={ PROFORMA_INVOICE_FORM_ITEMS_TABLE_NAME }
            summarize={ summarize }
            additionalData={ proformaInvoice }
    />
  )
}

export default ItemsTable
