import React, {
  useCallback,
  useEffect,
  useState
}                                         from 'react'
import { useWarehouse }                   from '../../../../../store/warehouse/useWarehouse'
import _, { get as _get }                 from 'lodash'
import {
  TWarehouse,
  TWarehouseFinance
}                                         from '../../../../../graphql/type_logic/types'
import {
  formatDateShort,
  formatPrice
}                                         from '../../../../utils/Utils'
import { useWarehouseFinancesQuery }      from '../../../../../graphql/graphql'
import { queryVariablesWarehouseFinance } from '../../../../../graphql/variablesQ'
import {
  SpinnerLoadingCenter,
  SpinnerLoadingTimer
}                                         from '../../../../../components/Spinner/SpinnerLoading'
import { faPrint }                        from '@fortawesome/free-solid-svg-icons'
import { KeyboardEventCodes }             from '../../../../../components/hooks/useExternalKeybaord'
import { useAppBar }                      from '../../../../hooks/useAppBar'
import {
  DialogModalRootComponent,
  EasyDialogApolloProvider
}                                         from '../../../../../components/EasyModel/EasyModal'
import { CenteredDialog }                 from '../../../../../components/Dialog/DialogBasic'
import Summary                            from '../../pdf/summary/Summary'
import {
  IPdfTableProps,
  resizeColumns
}                                         from '../../../../../components/Pdf/Pdf'

const TableState = ( { warehouseId } : { warehouseId : string } ) => {

  const { data : warehouseData } = useWarehouse( warehouseId, false )

  const { warehouse } = warehouseData || {}

  const { financeDateTo : dateTo, financeDateFrom : dateFrom } = warehouseData || {}
  const [tableData, setTableData] = useState( [] )

  const { setButtonsForPage, clearButtonsForPage } = useAppBar()

  const queryWarehouseFinance = React.useMemo( () => {
    const options = {
      dateFrom : dateFrom ? dateFrom : undefined,
      dateTo : dateTo ? dateTo : undefined
    }
    return queryVariablesWarehouseFinance( `${ warehouseId }`, options )
  }, [warehouseId, dateFrom, dateTo] )

  const { loading, data } = useWarehouseFinancesQuery( {
    notifyOnNetworkStatusChange : true,
    fetchPolicy : 'network-only',
    variables : queryWarehouseFinance,
    skip : !queryWarehouseFinance
  } )

  const formatData = React.useCallback( ( data : any ) => {
    const items = _get( data, 'data.items', undefined )
    if ( !items ) {
      return {
        tableData : []
      }
    }
    return items.reduce( ( acc : any, x : any ) => {
      const month = new Date( x.date ).getMonth()
      if ( !acc.lastRecord ) {
        return {
          lastRecord : x,
          lastMonth : month,
          tableData : [...acc.tableData, x]
        }
      }
      if ( month === acc.lastMonth ) {
        return {
          ...acc,
          lastRecord : x,
          tableData : [...acc.tableData, x]
        }
      }
      if ( acc.lastRecord ) {
        acc = {
          ...acc,
          tableData : [...acc.tableData, {
            ...acc.lastRecord,
            date : void( 0 ),
            invoice : null,
            calculation : null,
            calculationId : null,
            invoiceId : null,
            description : 'TOTAL',
            owes : acc.lastRecord.totalOwes,
            claims : acc.lastRecord.totalClaims,
            balance : _.round( _.subtract( _.toNumber( acc.lastRecord.totalOwes ), _.toNumber( acc.lastRecord.totalClaims ) ), 2 ),
            summary : true
          }]
        }
      }
      return {
        ...acc,
        lastRecord : void( 0 ),
        lastMonth : month,
        tableData : [...acc.tableData, x]
      }
    }, { lastMonth : -1, lastRecord : void( 0 ), tableData : [] } )
  }, [] )

  useEffect( () => {
    if ( loading ) {
      return
    }
    const { tableData } = formatData( data )
    setTableData( tableData )
  }, [loading, data, setTableData, formatData] )

  const printWarehouseSummary = useCallback( () => {
    openDialogPrintWarehouseSummary( { data : tableData, warehouse : warehouse as any } )
  }, [tableData, warehouse] )

  useEffect( () => {
    const id = setButtonsForPage( [
      {
        label : 'Print',
        icon : faPrint,
        shortcut : KeyboardEventCodes.F4,
        onClick : printWarehouseSummary
      }
    ] )
    return () => clearButtonsForPage( id )
  }, [setButtonsForPage, clearButtonsForPage, printWarehouseSummary] )

  return (
    <>
      { loading ? <SpinnerLoadingCenter/> : null }
      <div className={ 'd-flex flex-column w-100 pt-4 px-2 hw-table-root hw-tbl-separator-cell' }>
        <WarehouseFinanceTableHeader/>
        {
          tableData.map( ( x : any, key : number ) => {
            if ( x.summary ) {
              return (
                <div key={ key }>
                  <WarehouseFinanceTableSummaryRow data={ x }/>
                  <WarehouseFinanceTableHeader/>
                </div>
              )
            }
            return <WarehouseFinanceTableRow key={ key } data={ x }/>
          } )
        }
        { tableData && tableData.length !== 0 ? <WarehouseFinanceTableSummaryRow data={ tableData[tableData.length - 1] }/> : <></> }
      </div>
    </>
  )

}

export default TableState

const getDataWarehouseFinance = ( data : TWarehouseFinance ) => {
  const rb = data.calculationId ? `${ ( data.calculation as any ).number }` : data.returnInvoiceId ? ( data.returnInvoice as any ).number : data.invoiceId ? ( data.invoice as any ).number : ''
  return {
    rb,
    date : data.date,
    description : rb,
    owes : data.calculationId || data.returnInvoiceId ? formatPrice( data.owes as number ) : '',
    claims : data.invoiceId ? formatPrice( data.claims as number ) : '',
    balance : formatPrice( data.balance as number ),
    dateDoc : ( data.calculation as any ) && ( data.calculation as any ).bookDate ? formatDateShort( ( data.calculation as any ).bookDate )
      : ( data.returnInvoice as any ) ? formatDateShort( data.returnInvoice?.date )
        : ( data.invoice as any ) ? formatDateShort( ( data.invoice as any ).date ) : ''
  }
}

const WarehouseFinanceTableRow = ( { data } : { data : TWarehouseFinance } ) => {
  const { rb, date, description, dateDoc, owes, claims, balance } = getDataWarehouseFinance( data )
  return (
    <div className={ 'd-flex flex-row flex-fill justify-content-between align-items warehouse-finance-table-row hw-table-data-row' }>
      <div>{ rb }</div>
      <div>{ formatDateShort( date ) }</div>
      <div className={ 'warehouse-finance-description' }>{ description }</div>
      <div>{ dateDoc }</div>
      <div className={ 'text-right' }>{ owes }</div>
      <div className={ 'text-right' }>{ claims }</div>
      <div className={ 'text-right' }>{ balance }</div>
    </div>
  )
}

const WarehouseFinanceTableHeader = () => {
  return (
    <div className={ 'd-flex flex-row flex-fill text-upper justify-content-between align-items warehouse-finance-table-head hw-table-header-tr' }>
      <div>NALOG</div>
      <div>Date</div>
      <div className={ 'warehouse-finance-description' }>Description</div>
      <div>Date Doc.</div>
      <div>Owes</div>
      <div>Claims</div>
      <div>Balance</div>
    </div>
  )
}

const WarehouseFinanceTableSummaryRow = ( { data } : { data : any } ) => {
  const balance = _.round( _.subtract( _.toNumber( data.totalOwes ), _.toNumber( data.totalClaims ) ), 2 )

  return (
    <div className={ 'd-flex flex-row justify-content-end py-3 w-100 border-top' }>
      <div className={ 'd-flex flex-column justify-content-center warehouse-finance-summary-table' }>
        <div className={ 'd-flex flex-row flex-fill justify-content-between align-items-center warehouse-finance-table-row hw-table-data-row w-100' }>

          <div className={ 'summary-title pt-3 font-weight-bold ' }>Cumulative</div>
          <div className={ 'd-flex flex-column text-upper' }>
            <div className={ 'font-smaller-4 opacity-7' }>Owes</div>
            <div>{ formatPrice( _.toNumber( data.totalOwes ) ) }</div>
          </div>
          <div className={ 'd-flex flex-column text-upper' }>
            <div className={ 'font-smaller-4 opacity-7' }>Claims</div>
            <div>{ formatPrice( _.toNumber( data.totalClaims ) ) }</div>
          </div>

        </div>
        <div className={ 'd-flex flex-row flex-fill justify-content-between align-items-center warehouse-finance-table-row hw-table-data-row w-100' }>
          <div className={ 'summary-title font-weight-bold ' }>Total</div>
          <div>{ formatPrice( balance ) }</div>
          <div></div>
        </div>
      </div>
    </div>
  )
}

export const openDialogPrintWarehouseSummary =  ( { data, warehouse } : { data : any, warehouse : TWarehouse } ) => {
  
  EasyDialogApolloProvider( ( closeDialog : () => any, openDialog : ( component : any ) => any ) => {
    const Component = () => {
      const [loading, setLoading] : [boolean,(b:boolean)=> void] = useState(true as boolean)
      const findData = ( value : any, field : string ) => {
        return value.calculationId ? ( value.calculation as any )[field] : value.invoiceId ? ( value.invoice as any )[field] : value.returnInvoiceId ? ( value.returnInvoice as any )[field] : ''
      }
      const tableData : IPdfTableProps = {
        columns : [
          {
            label : '#',
            alignment : 'left',
            format : ( value : any ) => findData( value, 'number' )
          },
          {
            label : 'date',
            format : ( value : any ) => value.date ? formatDateShort( value.date ) : ''
          },
          {
            label : 'description',
            format : ( value : any ) => findData( value, 'number' ) || (value.summary && 'TOTAL' )
          },
          {
            label : 'owes',
            minSize : 10,
            alignmentHeader : 'right',
            sizeType : 2,
            alignment : 'right',
            format : ( value : any ) => value.calculationId || value.returnInvoiceId ||  value.summary ? formatPrice( value.owes as number ) : ''
          },
          {
            label : 'claims',
            minSize : 10,
            alignmentHeader : 'right',
            sizeType : 2,
            alignment : 'right',
            format : ( value : any ) => value.invoiceId || value.summary ? formatPrice( value.claims as number ) : ''
          },

          {
            label : 'balance',
            alignmentHeader : 'right',
            alignment : 'right',
            format : ( value : any ) => formatPrice( value.balance as number )
          }
        ],
        data
      }
      let array = [] as any
      const items = data.reduce((acc:any,x:any) => {
        if (x.summary) {
          array.push(x)
          const _newArr = [...acc,array]
          array = []
          return _newArr
        }
        array.push(x)
        return [...acc]
      },[])
      
      useEffect(() => {
        if (items.length !== 0) {
          setLoading(false)
          return
        }
      },[items])
      
      return (
        <>
          {loading ? <SpinnerLoadingCenter/> : null}
          <CenteredDialog
                        title={ 'Warehouse Summary Pdf' }
                        closeAction={ closeDialog }
                        Component={ Summary }
                        componentRenderProps={ {
                          data: items,
                          tableData,
                          warehouse,
                          cancelFunction : closeDialog
                        } }
          />
        </>
      )
    }
    openDialog( <DialogModalRootComponent name={ 'dialog-warehouse-summary-pdf-025615610456140561' } closeFn={ closeDialog }>
      <Component/>
    </DialogModalRootComponent> )
  } )
}
