import React, {
  useCallback,
  useEffect,
  useMemo,
  useState
}                                         from 'react'
import Table                              from '../../../../../components/Table/Table'
import { ITableModelCellChanged }         from '../../../../../components/Table'
import { EVENT_TYPE_CHANGE_MODEL_FIELD }  from '../../../../../components/Table/editors/InputTextEditor'
import { TableHeaderRenderManageColumns } from '../../../../../components/Table/render/HeaderRender'
import {
  formatDateLong,
  formatDateShort,
  formatPrice,
  formatQuantity
}                                         from '../../../../utils/Utils'
import {
  useWarehouseItemsQuery,
  useWarehouseQuery
}                                         from '../../../../../graphql/graphql'
import { queryVariablesWarehouseItem }    from '../../../../../graphql/variablesQ'
import { useWarehouse }                   from '../../../../../store/warehouse/useWarehouse'
import { get as _get }                    from 'lodash'
import { usePagination }                  from '../../../../../components/Pagination/usePagination'
import {
  IPdfTableProps,
  resizeColumns
}                                         from '../../../../../components/Pdf/Pdf'
import {
  DialogModalRootComponent,
  EasyDialogApolloProvider
}                                         from '../../../../../components/EasyModel/EasyModal'
import { SpinnerLoadingCenter }           from '../../../../../components/Spinner/SpinnerLoading'
import { CenteredDialog }                 from '../../../../../components/Dialog/DialogBasic'
import ItemPdf                            from '../../pdf/item'
import { useAppBar }                      from '../../../../hooks/useAppBar'
import {
  faPrint,
  faWarehouse
}                                         from '@fortawesome/free-solid-svg-icons'
import { KeyboardEventCodes }             from '../../../../../components/hooks/useExternalKeybaord'
import { RenderTableCustomerColumn }      from '../../pdf/_common/CustomerColumnRender'
import { openDialogWarehouseForm }        from '../../form/Warehouse'
import { TWarehouse }                     from '../../../../../graphql/type_logic/types'
import DivExternalKeyboardRoot            from '../../../../../components/hooks/DivParentExternalKeybardRoot'
import { openDialogPreviewCalculation }   from '../../../calculation/views/InstanceView/Form'
import { openDialogPreviewInvoice }       from '../../../invoice/preview/Preview'
import { openDialogPreviewReturnInvoice } from '../../../return-invoice/preview/Preview'

const _RenderWarehouseItemDocumentColumn = ( { value } : any ) => {
  const supplier = _get( value, 'supplier' ) || _get( value, 'customer' )
  const name = useMemo( () => !supplier ? '' : supplier?.shortName ? supplier?.shortName : supplier?.fullName.substring( 0, 40 ), [supplier] )
  return (
    <div className={ 'd-flex flex-column flex-fill' }>
      <div className={ 'font-smaller-5' }>{ value?.number }</div>
      <div className={ 'd-flex justify-content-between flex-fill flex-2' }>
        <div className={ 'font-smaller-2' }>{ name }</div>
        <div className={ 'font-smaller-5' }>{ supplier?.taxNumber }</div>
      </div>
    </div>
  )
}

const RenderWarehouseItemDocumentColumn = React.memo( _RenderWarehouseItemDocumentColumn,
    ( prevProps, nextProps ) => {
      return false
    } )

export const itemsTableHeader = [
  {
    label : 'Transaction Date',
    field : 'transactionDate',
    cell : {
      classes : ['text-center'],
      format : ( value : string ) => {
        return formatDateLong( value )
      },
    },
  },
  {
    label : 'Document',
    field : 'document',
    cell : {
      classes : ['text-left'],
      render : RenderWarehouseItemDocumentColumn
    }
  },
  {
    label : 'Quantity Owes',
    field : 'quantityTransactionOwes',
    cell : {
      classes : ['text-right'],
      format : ( value : string ) => {
        return formatQuantity( value )
      },
    }
  },
  {
    label : 'Quantity Claims',
    field : 'quantityTransactionClaims',
    cell : {
      classes : ['text-right'],
      format : ( value : string ) => {
        return formatQuantity( value )
      },
    }
  },
  {
    label : 'Quantity Stack',
    field : 'quantityOnStack',
    cell : {
      classes : ['text-right'],
      format : ( value : string ) => {
        return formatQuantity( value )
      },
    }
  },
  {
    label : 'Price stack',
    field : 'priceStack',
    cell : {
      classes : ['text-right'],
      format : ( value : string ) => {
        return formatPrice( value )
      },
    }
  },
  {
    label : 'Finance stack',
    field : 'financeOnStack',
    notHide : true,
    notResize : true,
    cell : {
      classes : ['text-right'],
      format : ( value : string ) => {
        return formatPrice( value )
      },
    },
    render : TableHeaderRenderManageColumns
  }
]

const ItemStateTable = ( { warehouseId } : { warehouseId : string } ) => {

  const { data : warehouseData, updateWarehouseData } = useWarehouse( warehouseId )
  const { data : pagData, setBackendPaginationData, handlerEvent : handlerEventPagination } = usePagination()
  const { perPage : pagPerPage, page : pagPage, numItems : pagNumItems } = pagData
  const [tableSettings, setTableSettings] = useState( {} )
  const { setButtonsForPage, clearButtonsForPage } = useAppBar()

  const { dateFrom, dateTo, customer, selectedItemId : itemId } = warehouseData || {}

  const queryWarehouseItems = React.useMemo( () => {
    const itemId = _get( warehouseData, 'item.item.id', 1 )
    if ( !itemId || !warehouseId ) {
      return undefined
    }
    const options = Object.assign( {
      dateFrom : dateFrom ? dateFrom : undefined,
      dateTo : dateTo ? dateTo : undefined
    }, customer ? { clientId : customer.id } : {} )

    const offset = ( ( pagPage || 1 ) - 1 ) * ( pagPerPage || 20 )
    return queryVariablesWarehouseItem( offset, pagPerPage || 20, `${ warehouseId }`, `${ itemId }`, options )
  }, [warehouseId, warehouseData, pagPerPage, pagPage, dateFrom, dateTo, customer] )

  const { loading, data } = useWarehouseItemsQuery( {
    notifyOnNetworkStatusChange : true,
    fetchPolicy : 'network-only',
    variables : queryWarehouseItems,
    onCompleted : ( data ) => {
      if ( !data || !data.data || !data.data.items ) {
        return
      }
      const { page, count } = data.data
      setBackendPaginationData( page || 1, count )
    },
    skip : !queryWarehouseItems,
  } )

  const tableData : any[] = React.useMemo( () => {
    const items = _get( data, 'data.items', undefined )
    if ( !items ) {
      return []
    }
    return items.map( ( x : any ) => {
      return {
        ...x,
        document : x.calculation || x.invoice || x.returnInvoice
      }
    } )
  }, [data] )

  const print = useCallback( () => {
    const _itemId = _get( warehouseData, 'item.item.id' )
    openDialogWarehouseItemPrint( { warehouseId, itemId : _itemId, tableSettings } )
  }, [warehouseId, tableSettings, warehouseData] )

  const handlerUpdateWarehouse = async ( warehouse : TWarehouse ) => {
    await updateWarehouseData( warehouse )
  }

  const handlerWarehouse = useCallback( () => {
    openDialogWarehouseForm( { warehouseId, submitFun : handlerUpdateWarehouse } )
  }, [warehouseId] )

  useEffect( () => {
    const id = setButtonsForPage( [
      {
        label : 'Edit',
        icon : faWarehouse,
        shortcut : KeyboardEventCodes.F3,
        onClick : handlerWarehouse
      },
      {
        label : 'Print',
        icon : faPrint,
        shortcut : KeyboardEventCodes.F4,
        onClick : print
      },
    ] )
    return () => clearButtonsForPage( id )
  }, [setButtonsForPage, clearButtonsForPage, print] )

  const handlerTableSettingsChanged = React.useCallback( ( settings : any ) => {
    setTableSettings( { ...settings } )
  }, [setTableSettings] )

  const handlerDataEventClick = ( event : any, id : any, action : any, param : any ) => {
    if ( action === 'table-cell-edit' && param === 'document' && id ) {
      const item = tableData.find( ( x : any ) => Number( x.id ) === Number( id ) )
      item.calculation ? openDialogPreviewCalculation( {
        calculationId : item.calculation.id
      } ) : item.invoice ? openDialogPreviewInvoice( {
        invoiceId : item.invoice.id
      } ) : openDialogPreviewReturnInvoice( {
        returnInvoiceId : item.returnInvoice.id
      } )
      return
    }
    return void( 0 )
  }

  const handlerModelFieldChanged = ( data : ITableModelCellChanged ) => {
    if ( data.type === EVENT_TYPE_CHANGE_MODEL_FIELD ) {
      return
    }
  }

  const paginationData = React.useMemo( () => {
    return {
      perPage : pagPerPage || 20,
      page : pagPage || 1,
      totalItems : pagNumItems || 0
    }
  }, [pagPerPage, pagPage, pagNumItems] )

  return (
    <DivExternalKeyboardRoot className={ 'd-flex flex-wrap justify-content-center w-100 pt-1' }>
      <Table
                modelFields={ ['invoice', 'returnInvoice'] }
                handlerEventSettingsChanged={ handlerTableSettingsChanged }
                handlerEventPagination={ handlerEventPagination }
                handlerEventDataClick={ handlerDataEventClick }
                header={ itemsTableHeader }
                separator={ 'cell' }
                data={ tableData }
                handlerEventModelFieldChanged={ handlerModelFieldChanged }
                tableName={ 'table-items-warehouse-809898897878' }
                paginationData={ paginationData }
                scrollable
      />
    </DivExternalKeyboardRoot>
  )

}

export default ItemStateTable

export const openDialogWarehouseItemPrint = ( { warehouseId, itemId, tableSettings } : { warehouseId : string, itemId : string, tableSettings : any } ) => {
  const tSettings = Object.values( tableSettings )
  const tableData : IPdfTableProps = {
    columns : [
      {
        label : 'Transaction date',
        field : 'transactionDate',
        format : ( value : any ) => formatDateShort( value.transactionDate ),
        minSize: 5
      },
      {
        label : 'Document',
        field : 'document',
        minSize : 30,
        format : ( value : any ) => `${ value.document.customer.shortName || value.document.customer.fullName.substring(0,32) }`,
        render : RenderTableCustomerColumn,
        renderProps : {
          field : 'document'
        }
      },
      {
        label : 'Quantity Owes',
        field : 'quantityTransactionOwes',
        sizeType : 3,
        alignment : 'right',
        format : ( value : any ) => formatQuantity( value.quantityTransactionOwes as number )
      },

      {
        label : 'Quantity Claims',
        field : 'quantityTransactionClaims',
        sizeType : 3,
        alignment : 'right',
        format : ( value : any ) => formatQuantity( value.quantityTransactionClaims as number )
      },
      {
        label : 'Quantity Stack',
        field : 'quantityOnStack',
        alignment : 'right',
        format : ( value : any ) => formatQuantity( value.quantityOnStack )
      },
      {
        label : 'Price stack',
        field : 'priceStack',
        alignment : 'right',
        format : ( value : any ) => formatPrice( value.priceStack )
      },

      {
        label : 'Finance stack',
        field : 'financeOnStack',
        alignment : 'right',
        format : ( value : any ) => formatPrice( value.financeOnStack )
      },
    ].filter( x => {
      const f : any = tSettings.find( ( y : any ) => y.field === x.field )

      if ( !f ) {
        return true
      }
      return !f.notVisible
    } ) as any
  }

  EasyDialogApolloProvider( ( closeDialog : () => any, openDialog : ( component : any ) => any ) => {
    const Component = () => {
      const { loading : loadingW, data : warehouse } = useWarehouseQuery( {
        notifyOnNetworkStatusChange : true,
        fetchPolicy : 'network-only',
        variables : {
          id : Number( warehouseId )
        }
      } )

            // const queryWarehouseItem =  useMemo(() => !warehouseId || !itemId ? undefined : queryVariablesWarehouseItem(0, 1000, `${warehouseId}`, `${itemId}`),[warehouseId,itemId])
      const { loading, data } = useWarehouseItemsQuery( {
        notifyOnNetworkStatusChange : true,
        fetchPolicy : 'network-only',
        variables : {
          offset : 0,
          limit : 5000,
          filter : {
            $and : [
              { warehouseId : Number( warehouseId ) },
              { itemId : Number( itemId ) }
            ] as any
          },
          include : [
            {
              required : false,
              model : 'Calculation',
              include : [
                {
                  required : true,
                  model : 'Customer',

                }
              ]
            },
            {
              required : false,
              model : 'Invoice',
              include : [
                {
                  required : true,
                  model : 'Customer'
                }
              ]
            },
            {
              required : false,
              model : 'ReturnInvoice',
              include : [
                {
                  required : true,
                  model : 'Customer'
                }
              ]
            }

          ],
          sort : {
            field : 'id',
            direction : 'DESC'
          }
        },
        skip : !Number( warehouseId ) || !Number( itemId )
      } )

      if ( loadingW || loading ) {
        return <SpinnerLoadingCenter/>
      }

      const items = data?.data?.items || []

      const _tableData = {
        ...tableData,
        data : items.map( item => {
          const document = item.calculation ? item.calculation : item.invoice ? item.invoice : item.returnInvoice
          const customer = _get(document,'customer') || _get(document, 'supplier')
          return {
            ...item,
            document : {
              ...document,
              customer
            }
          }
        } )
      }

      resizeColumns( _tableData )

      return (
        <>
          <CenteredDialog
                        title={ 'Warehouse Item state Pdf' }
                        closeAction={ closeDialog }
                        Component={ ItemPdf }
                        componentRenderProps={ {
                          tableData : _tableData,
                          warehouse : warehouse?.warehouse,
                          cancelFunction : closeDialog
                        } }
          />
        </>
      )
    }
    openDialog( <DialogModalRootComponent name={ 'dialog-warehouse-one-item-pdf-7971895715897195' } closeFn={ closeDialog }>
      <Component/>
    </DialogModalRootComponent> )
  } )

}

