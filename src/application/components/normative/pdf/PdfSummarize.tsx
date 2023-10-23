import React, { useMemo }             from 'react'
import Pdf, {
  IPdfTableColumnProps,
  IPdfTableProps,
  resizeColumns,
  Table
}                                     from '../../../../components/Pdf/Pdf'
import {
  TNormative
} from '../../../../graphql/type_logic/types'
import { StyleSheet, View }                 from '@react-pdf/renderer'
import { formatQuantity }             from '../../../utils/Utils'
import {
  DialogModalRootComponent,
  EasyDialogApolloProvider
}                                     from '../../../../components/EasyModel/EasyModal'
import { useNormativeSummarizeQuery } from '../../../../graphql/graphql'
import { PDFDialog }                  from '../../../../components/Dialog/DialogBasic'
import { RenderNormativeItemData }    from '../_common/PdfRender'
import { SpinnerLoadingCenter }       from '../../../../components/Spinner/SpinnerLoading'
import PdfItemInfo                    from './PdfItemInfo'

interface INormativeSummarizePdf {
  tableData : IPdfTableProps,
  normative : TNormative,
}

const NormativeSummarizePdf = ( { normative, tableData } : INormativeSummarizePdf ) => {

  const styles = StyleSheet.create( {
    itemInfo : {
      padding: '10px 0px'
    }
  } )

  return (
    <Pdf
            title={ 'Normative Summarize' }
            pageSize={ 'Letter' }
            showFooter
            header={ {
              fixed : false
            } }
    >
      <View style={styles.itemInfo}>
        <PdfItemInfo data={normative.item as any} />
      </View>
      <Table tableData={ tableData }/>
    </Pdf>
  )
}

export default NormativeSummarizePdf

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
  }
] as IPdfTableColumnProps[]

export const openDialogNormativeSummarizePrint = ( { normativeId } : { normativeId : string } ) => {

  const tableData : IPdfTableProps = {
    columns : normativeColumnsPDF
  }

  EasyDialogApolloProvider( ( closeDialog : () => any, openDialog : ( component : any ) => any ) => {
    const Component = () => {
      const { data : _normative, loading } = useNormativeSummarizeQuery( {
        notifyOnNetworkStatusChange : true,
        fetchPolicy : 'cache-and-network',
        variables : {
          id : Number( normativeId )
        },
        skip : !normativeId
      } )

      const normative = useMemo( () => _normative && _normative?.normative ? _normative.normative : void( 0 ), [_normative] )

      const items = useMemo( () => normative ? normative.items : [], [normative] )

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
                        title={ 'Normative summarize pdf' }
                        closeAction={ closeDialog }
                        Component={ NormativeSummarizePdf }
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

    openDialog( <DialogModalRootComponent name={ 'dialog-normative-summarize-pdf-015045165061650356' } closeFn={ closeDialog }>
      <Component/>
    </DialogModalRootComponent> )
  } )

}