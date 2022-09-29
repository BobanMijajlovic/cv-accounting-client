import React, { useMemo }          from 'react'
import Pdf, {
  IPdfTableColumnProps,
  IPdfTableProps,
  resizeColumns,
  Table
}                                  from '../../../../components/Pdf/Pdf'
import {
  TItem,
  TNormative
}                                  from '../../../../graphql/type_logic/types'
import {
  StyleSheet,
  View,
  Text
}                                  from '@react-pdf/renderer'
import {
  formatPrice,
  formatQuantity
}                                  from '../../../utils/Utils'
import {
  DialogModalRootComponent,
  EasyDialogApolloProvider
}                                  from '../../../../components/EasyModel/EasyModal'
import { useNormativeQuery }       from '../../../../graphql/graphql'
import { PDFDialog }               from '../../../../components/Dialog/DialogBasic'
import { RenderNormativeItemData } from '../_common/PdfRender'
import { SpinnerLoadingCenter }    from '../../../../components/Spinner/SpinnerLoading'
import PdfItemInfo                 from './PdfItemInfo'

interface INormativePdf {
  tableData : IPdfTableProps,
  normative : TNormative,
}

const NormativePdf = ( { normative, tableData } : INormativePdf ) => {

  const styles = StyleSheet.create( {
    itemInfo : {
      padding: '10px 0px'
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
  } )

  return (
    <Pdf
            title={ 'Normative' }
            pageSize={ 'Letter' }
            showFooter
            header={ {
              fixed : false
            } }
    >
      <View>
        <View style={ styles.titleRoot }>
          <Text style={styles.title}>Normative</Text>
        </View>
        <View style={styles.itemInfo}>
          <PdfItemInfo data={normative.item as any} />
        </View>
        <Table tableData={ tableData }/>
      </View>
    </Pdf>
  )
}

export default NormativePdf

export const normativeColumnsPDF = [
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
    minSize: 5,
    format : ( value : any ) => `${ value.item.code }`
  },
  {
    label : 'Name',
    field : 'item.shortName',
    alignment : 'left',
    minSize: 50,
    format : ( value : any ) => `${ value.item.shortName }`,
    render : RenderNormativeItemData,
    renderProps : {
      field : 'item'
    }
  },
  {
    label : 'QTY',
    field : 'quantity',
    alignment : 'right',
    format : ( value : any ) => formatQuantity( value.quantity as number )
  },
  {
    label : 'price',
    field : 'priceStack',
    alignment : 'right',
    format : ( value : any ) => formatPrice( value.priceStack as number )
  }
] as IPdfTableColumnProps[]

export const openDialogNormativePrint = ( { normativeId } : { normativeId : string } ) => {

  const tableData : IPdfTableProps = {
    columns : normativeColumnsPDF
  }

  EasyDialogApolloProvider( ( closeDialog : () => any, openDialog : ( component : any ) => any ) => {
    const Component = () => {
      const { data : _normative, loading } = useNormativeQuery( {
        notifyOnNetworkStatusChange : true,
        fetchPolicy : 'cache-and-network',
        variables : {
          id : Number( normativeId )
        },
        skip : !normativeId
      } )

      const normative = useMemo( () => _normative && _normative?.normative ? _normative.normative : void( 0 ), [_normative] )
      console.log(normative)
      const items = useMemo( () => !normative || !normative?.items ? [] : normative.items.map(x =>  {
        const item = x.item as TItem
        return {
          ...x,
          priceStack : item.warehouseItems && item.warehouseItems.length !== 0 ? item.warehouseItems[0].priceStack : '0'
        }
      } ), [normative] )

      if ( loading ) {
        return <SpinnerLoadingCenter/>
      }

      const _tableData = {
        ...tableData,
        data : items
      }

      resizeColumns( _tableData )

      return (
        <>
          <PDFDialog
                        title={ 'Normative pdf' }
                        closeAction={ closeDialog }
                        Component={ NormativePdf }
                        componentRenderProps={ {
                          tableData : _tableData,
                          normative : {
                            ...normative
                          },
                          cancelFunction : closeDialog
                        } }
          />
        </>
      )
    }

    openDialog( <DialogModalRootComponent name={ 'dialog-normative-pdf-015045165061650356' } closeFn={ closeDialog }>
      <Component/>
    </DialogModalRootComponent> )
  } )

}