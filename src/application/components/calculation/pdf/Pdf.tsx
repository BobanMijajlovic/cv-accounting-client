import React                    from 'react'
import Header                   from './header/Header'
import {
  useCalculationQuery,
  useClientQuery
}                               from '../../../../graphql/graphql'
import {
  TCalculation,
  TCalculationItem
}                               from '../../../../graphql/type_logic/types'
import { SpinnerLoadingCenter } from '../../../../components/Spinner/SpinnerLoading'
import Pdf, {
  IPdfTableProps,
  resizeColumns,
  Table
}                               from '../../../../components/Pdf/Pdf'
import {
  DialogModalRootComponent,
  EasyDialogApolloProvider
}                               from '../../../../components/EasyModel/EasyModal'
import { CenteredDialog }       from '../../../../components/Dialog/DialogBasic'
import { formatPrice }          from '../../../utils/Utils'
import Footer                   from './Footer'
import {
  RenderCalculationInvoiceData,
  RenderCalculationItemData,
  RenderInvoiceDataTHead
}                               from './_common/RenderColumns'
import {
  RenderCalculationVatData,
  RenderVatDataTHead
}                               from './_common/VatRender'
import {
  RenderCalculationPriceDifferenceData,
  RenderCalculationPriceDifferenceDataTHead
}                               from './_common/PriceDifference'
import CustomerSpec             from './_common/CustomerSpec'
import WarehouseSpec            from './_common/WarehouseSpec'
import * as _                   from 'lodash'
import { CONSTANT_WAREHOUSE }   from '../../../constants'
import Signature                from './footer/Signature'
import {
  StyleSheet,
  View
}                               from '@react-pdf/renderer'

interface ICalculationPdfProps {
  tableData : IPdfTableProps,
  calculation : TCalculation
}

const CalculationPdf = ( { calculation, tableData } : ICalculationPdfProps ) => {
  const styles = StyleSheet.create( {
    root : {
      flex : 2,
      flexDirection : 'column'
    }
  } )

  return (
    <Pdf
            title={ 'Calculation' }
            pageSize={ 'Letter' }
            showFooter
            header={ {
              title : `Calculation ${ calculation.number }`,
              rightPart : {
                Component : WarehouseSpec,
                props : {
                  warehouse : calculation.warehouse
                }
              }
            } }
            styles={ { fontSize : 7 } }
    >
      <View style={ styles.root }>
        <Header data={ calculation }/>
        <Table tableData={ tableData }/>
        <Footer calculation={ calculation }/>
      </View>
      <Signature calculation={ calculation }/>
    </Pdf>
  )
}

export default CalculationPdf

export const openDialogCalculationPrint = ( { calculationId, tableSettings } : { calculationId : string, tableSettings : any } ) => {
  const tableData : IPdfTableProps = {
    columns : [
      {
        label : '#',
        format : ( value : any, index ? : number ) => `${ ( ( Number( index ) || 0 ) + 1 ).toString() }`,
        minSize : 2,
        size : 2
      },
      {
        field : 'item.shortName',
        label : 'Name',
        alignment : 'left',
        sizeType : 1,
        format : ( value : any ) => `${ value.item.barCode }`,
        render : RenderCalculationItemData,
        renderProps : {
          field : 'item'
        }
      },
      {
        label : 'Invoice data',
        field : 'invoice',
        sizeType : 1,
        format : ( value : any ) => `${ value.item.barCode }`,
        renderHeader : RenderInvoiceDataTHead,
        renderHeaderProps : {
          field : 'invoice'
        },
        render : RenderCalculationInvoiceData,
        renderProps : {
          field : 'invoice'
        },
        style : {
          padding : 0
        }
      },
      {
        label : 'Expense',
        field : 'expensesFinanceInternalMP',
        alignment : 'right',
        minSize : 5,
        format : ( value : any ) => formatPrice( value.expensesFinanceInternalMP as number )
      },
      {
        label : 'price difference',
        field : 'priceDifference',
        alignment : 'right',
        minSize : 20,
        format : ( value : any ) => formatPrice( '210' ),
        renderHeader : RenderCalculationPriceDifferenceDataTHead,
        renderHeaderProps : {
          field : 'priceDifference'
        },
        render : RenderCalculationPriceDifferenceData,
        renderProps : {
          field : 'priceDifference'
        },
        style : {
          padding : 0
        }
      },
      {
        label : 'Base finance',
        field : 'financeExpInternalVP',
        sizeType : 3,
        alignment : 'right',
        format : ( value : any ) => formatPrice( value.financeExpInternalVP )
      },
      {
        label : 'Finance Tax',
        field : 'taxes',
        alignment : 'right',
        sizeType : 3,
        format : ( value : any ) => formatPrice( '' ),
        renderHeader : RenderVatDataTHead,
        renderHeaderProps : {
          field : 'taxes'
        },
        render : RenderCalculationVatData,
        renderProps : {
          field : 'taxes'
        },
        style : {
          padding : 0
        }
      },
      {
        label : 'Total Finance',
        field : 'financeExpInternalMP',
        sizeType : 3,
        alignment : 'right',
        format : ( value : any ) => formatPrice( value.financeExpInternalMP )
      }
    ]
  }

  EasyDialogApolloProvider( ( closeDialog : () => any, openDialog : ( data : any ) => any ) => {
    const Component = () => {

      const { loading, data } = useCalculationQuery( {
        notifyOnNetworkStatusChange : true,
        fetchPolicy : 'network-only',
        variables : {
          id : Number( calculationId )
        }
      } )

      const { loading : loadingClient, data : _client } = useClientQuery( {
        notifyOnNetworkStatusChange : true,
        fetchPolicy : 'network-only',
        variables : {
          id : Number( data?.calculation?.clientId )
        },
        skip : !data?.calculation?.clientId
      } )

      const warehouseType = React.useMemo( () => data?.calculation?.warehouse?.flag, [data?.calculation?.warehouse] )

      const items = data?.calculation?.items ? data?.calculation?.items.map( ( x : TCalculationItem ) => {
        const taxFinance = _.round( _.subtract( Number( x.financeExpInternalMP ), Number( x.financeExpInternalVP ) ), 2 )
        return {
          ...x,
          invoice : {
            quantity : x.quantity,
            priceNoVat : _.round( _.divide( Number( x.financeVP ), Number( x.quantity ) ), 2 ),
            financeNoVat : warehouseType === CONSTANT_WAREHOUSE.TYPES.WHOLESALE ? x.financeVP : x.financeMP
          },
          discount : 0,
          priceDifference : {
            ...x,
            warehouseType
          },
          expensesFinanceInternalMP : x.financeExpInternalMP !== 0 && _.round( _.subtract( Number( x.financeExpInternalMP ), Number( x.financeMP ) ), 2 ),
          taxes : {
            taxPercent : x.taxPercent,
            taxFinance
          },
          taxFinance
        }
      } ) : []
      const client = React.useMemo( () => _client && _client.client ? _client.client : {}, [_client] )

      if ( loading || loadingClient ) {
        return <SpinnerLoadingCenter/>
      }
      const summarize = {
        fields : ['financeExpInternalVP', 'taxes', 'financeExpInternalMP']
      }

      const _tableData = {
        ...tableData,
        data : items,
        summarize
      }

      resizeColumns( _tableData )

      return (
        <>
          <CenteredDialog
                        title={ 'Calculation Pdf' }
                        closeAction={ closeDialog }
                        Component={ CalculationPdf }
                        componentRenderProps={ {
                          tableData : _tableData,
                          calculation : {
                            ...data?.calculation,
                            client
                          },
                          cancelFunction : closeDialog
                        } }
          />
        </>
      )
    }
    openDialog( <DialogModalRootComponent name={ 'dialog-calculation-pdf-62263625165516516' } closeFn={ closeDialog }>
      <Component/>
    </DialogModalRootComponent> )
  } )

}

