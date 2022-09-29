import React, { useMemo }          from 'react'
import Pdf, {
  IPdfTableColumnProps,
  IPdfTableProps,
  resizeColumns,
  Table
}                                  from '../../../../components/Pdf/Pdf'
import {
  TItem,
  TProductionOrder
}                                  from '../../../../graphql/type_logic/types'
import {
  StyleSheet,
  Text,
  View
}                                  from '@react-pdf/renderer'
import {
  formatPrice,
  formatQuantity
}                                  from '../../../utils/Utils'
import {
  DialogModalRootComponent,
  EasyDialogApolloProvider
}                                  from '../../../../components/EasyModel/EasyModal'
import { useProductionOrderQuery } from '../../../../graphql/graphql'
import { PDFDialog }               from '../../../../components/Dialog/DialogBasic'
import { SpinnerLoadingCenter }    from '../../../../components/Spinner/SpinnerLoading'
import _                           from 'lodash'
import Header                      from './Header'
import Footer                      from './Footer'
import AdditionalExpenseTablePdf   from './ExpensesTable'

interface IProductionOrderPdfProps {
  tableData : IPdfTableProps,
  productionOrder : TProductionOrder,
}

const ProductionOrderPdf = ( { productionOrder, tableData } : IProductionOrderPdfProps ) => {

  return (
    <Pdf
            title={ 'Production order' }
            pageSize={ 'Letter' }
            showFooter
    >
      <ProductionOrderPdfPage tableData={tableData} productionOrder={productionOrder} />
    </Pdf>
  )
}

export default ProductionOrderPdf

export const ProductionOrderPdfPage = ({productionOrder,tableData}: IProductionOrderPdfProps) => {
  const styles = StyleSheet.create( {
    root : {
      flex : 2,
      marginTop: 15
    },
    titleRoot : {
      fontSize: 9,
      textAlign : 'center',
      margin : '20px 0'
    },
    title : {
      fontSize : 12,
      fontWeight : 'bold',
    },
    tableTitle : {
      fontSize: 9,
      margin : '20px 0px 5px'
    },
    item : {
      flexDirection : 'row',
      flex: 1,
    }
  } )
  return (
    <>
      <View style={ styles.root }>
        <View style={ styles.titleRoot }>
          <Text style={styles.title}>{ `Production order # : ${productionOrder.number}` }</Text>
          <Text>item <Text style={ { fontWeight : 'bold' } }> { (productionOrder.item as any).shortName } </Text></Text>
        </View>
        <Header data={ productionOrder }/>
        <View style={ styles.tableTitle }>
          <Text> Specification of consumed material </Text>
        </View>
        <Table tableData={ tableData }/>
        <AdditionalExpenseTablePdf productionOrder={productionOrder} />
      </View>
      <Footer/>
    </>
  )
}

export const productionOrderColumnsPDF = [
  {
    label : '#',
    format : ( value : any, index? : number ) => `${ ( ( Number( index ) || 0 ) + 1 ).toString() }.`,
    minSize : 2,
    size : 2
  },
  {
    label : 'Code',
    field : 'item.code',
    alignment : 'center',
    minSize : 5,
    format : ( value : any ) => `${ value.item.code }`
  },
  {
    label : 'Name',
    field : 'item.shortName',
    alignment : 'left',
    minSize : 50,
    format : ( value : any ) => `${ value.item.shortName }`
  },
  {
    label : 'QTY',
    field : 'quantity',
    alignment : 'right',
    format : ( value : any ) => formatQuantity( value.quantity as number )
  },
  {
    label : 'Price',
    field : 'price',
    alignment : 'right',
    format : ( value : any ) => formatPrice( value.price as number )
  },
  {
    label : 'Finance',
    field : 'finance',
    alignment : 'right',
    format : ( value : any ) => formatPrice( value.finance as number )
  }
] as IPdfTableColumnProps[]

export const openDialogProductionOrderPrint = ( { productionOrderId } : { productionOrderId : string } ) => {

  const tableData : IPdfTableProps = {
    columns : productionOrderColumnsPDF
  }

  EasyDialogApolloProvider( ( closeDialog : () => any, openDialog : ( component : any ) => any ) => {
    const Component = () => {
      const { data : _productionOrder, loading } = useProductionOrderQuery( {
        notifyOnNetworkStatusChange : true,
        fetchPolicy : 'cache-and-network',
        variables : {
          id : Number( productionOrderId )
        },
        skip : !productionOrderId
      } )

      const productionOrder = useMemo( () => _productionOrder && _productionOrder?.productionOrder ? _productionOrder.productionOrder : void( 0 ), [_productionOrder] )

      const items = useMemo( () => !productionOrder || !productionOrder?.items ? [] : productionOrder.items.map( x => {
        const item = x.item as TItem
        return {
          ...x,
          price : item.vp,
          finance : _.round( _.multiply( Number( x.quantity ), Number( item.vp ) ), 2 )
        }
      } ), [productionOrder] )

      if ( loading ) {
        return <SpinnerLoadingCenter/>
      }
      const summarize = {
        fields : ['finance']
      }

      const _tableData = {
        ...tableData,
        data : items,
        summarize
      }

      resizeColumns( _tableData )

      return (
        <>
          <PDFDialog
                        title={ 'Production order ' }
                        closeAction={ closeDialog }
                        Component={ ProductionOrderPdf }
                        componentRenderProps={ {
                          tableData : _tableData,
                          productionOrder : {
                            ...productionOrder
                          },
                          cancelFunction : closeDialog
                        } }
          />
        </>
      )
    }

    openDialog( <DialogModalRootComponent name={ 'dialog-production-order-pdf-015045165061650356' } closeFn={ closeDialog }>
      <Component/>
    </DialogModalRootComponent> )
  } )
}