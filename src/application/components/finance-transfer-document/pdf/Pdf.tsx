import React, { useMemo }                  from 'react'
import _                                   from 'lodash'
import {
  StyleSheet,
  Text,
  View
}                                          from '@react-pdf/renderer'
import Pdf, {
  IPdfTableColumnProps,
  IPdfTableProps,
  resizeColumns,
  Table
}                                          from '../../../../components/Pdf/Pdf'
import {
  TClient,
  TFinanceTransferDocument,
  TNotes,
  TTaxFinance
}                                          from '../../../../graphql/type_logic/types'
import ClientData                          from '../../invoice/pdf/Header/ClientData'
import LogoPdfComponent                    from '../../invoice/pdf/Header/LogoPdfComponent'
import Signature                           from '../../invoice/pdf/footer/Signature'
import Header                              from './Header'
import { formatPrice }                     from '../../../utils/Utils'
import {
  RenderCalculationVatData,
  RenderVatDataTHead
}                                          from '../../calculation/pdf/_common/VatRender'
import {
  DialogModalRootComponent,
  EasyDialogApolloProvider
}                                          from '../../../../components/EasyModel/EasyModal'
import { useClient }                       from '../../../../store/client/useClient'
import { useFinanceTransferDocumentQuery } from '../../../../graphql/graphql'
import { SpinnerLoadingCenter }            from '../../../../components/Spinner/SpinnerLoading'
import { PDFDialog }                       from '../../../../components/Dialog/DialogBasic'
import { CONSTANT_MODEL }                  from '../../../constants'

interface IFinanceTransferDocumentPdfProps {
  tableData : IPdfTableProps,
  financeTransferDocument : TFinanceTransferDocument,
  documentType ?: number
}

const FinanceTransferDocumentPdf = ( { tableData, financeTransferDocument,  documentType = CONSTANT_MODEL.FINANCE_TRANSFER_DOCUMENT_TYPE.TRANSFER } : IFinanceTransferDocumentPdfProps ) => {
  const styles = StyleSheet.create( {
    root : {
      flex : 2,
      flexDirection : 'column'
    },
    tableView : {
      marginVertical : 10
    }
  } )

  const title = useMemo( () => documentType === CONSTANT_MODEL.FINANCE_TRANSFER_DOCUMENT_TYPE.ADVANCE ? 'advance invoice' : 'Finance transfer document', [documentType] )

  return (
    <Pdf
            title={ title }
            pageSize={ 'Letter' }
            showFooter
            header={ {
              rightPart : {
                Component : ClientData,
                props : {
                  data : financeTransferDocument.client
                }
              },
              leftPart : {
                Component : LogoPdfComponent,
                props : {
                  image : ( financeTransferDocument.client as TClient ).logo
                }
              },
              fixed : false
            } }
    >
      <View style={ styles.root }>
        <Header data={ financeTransferDocument } title={ title }/>
        <View style={ styles.tableView }>
          <Table tableData={ tableData }/>
        </View>
        <NoteView notes={ financeTransferDocument.notes }/>
      </View>
      <Signature invoice={ financeTransferDocument }/>
    </Pdf>
  )
}

export const NoteView = ( { notes } : { notes? : TNotes[] } ) => {
  const stylesNote = StyleSheet.create( {
    root : {
      paddingTop : 7
    },
    title : {
      fontSize : 7,
      borderBottom : 1,
      borderBottomStyle : 'solid',
      borderBottomColor : '#eee',
      paddingHorizontal : 2,
      marginHorizontal : 2,
      paddingBottom : 2,
      marginVertical : 2
    },
    noteOneRow : {
      paddingHorizontal : 4,
      paddingVertical : 2
    }
  } )
  return (
    <View style={ stylesNote.root }>
      <View style={ stylesNote.title }>
        <Text>Notes</Text>
      </View>
      {
        notes && notes.length !== 0 ? notes.map( ( x, index ) => {
          return <View style={ stylesNote.noteOneRow } key={ index }><Text>{ x.note }</Text></View>
        } ) : null
      }
    </View>
  )
}

export default FinanceTransferDocumentPdf

export const openDialogFinanceTransferDocumentPdf = ( { financeTransferDocumentId } : { financeTransferDocumentId : string } ) => {
  const tableData : IPdfTableProps = {
    columns : [
      {
        label : '#',
        format : ( value : any, index? : number ) => `${ ( ( Number( index ) || 0 ) + 1 ).toString() }.`
      },
      {
        label : 'Name',
        field : 'itemDescription',
        alignment : 'left',
        minSize : 45,
        format : ( value : any ) => `${ value.itemDescription }`
      },
      {
        label : 'Base Finance',
        field : 'totalFinanceVP',
        alignment : 'right',
        sizeType : 4,
        format : ( value : any ) => formatPrice( value.totalFinanceVP )
      },
      {
        label : 'Tax finance',
        field : 'tax',
        alignment : 'right',
        sizeType : 4,
        minSize : 15,
        format : ( value : any ) => formatPrice( '' ),
        renderHeader : RenderVatDataTHead,
        renderHeaderProps : {
          field : 'tax'
        },
        render : RenderCalculationVatData,
        renderProps : {
          field : 'tax'
        },
        style : {
          padding : 0
        }
      },
      {
        label : '',
        field : 'totalFinanceMP',
        sizeType : 4,
        alignment : 'right',
        format : ( value : any ) => formatPrice( value.totalFinanceMP )
      }
    ] as IPdfTableColumnProps[]
  }

  EasyDialogApolloProvider( ( closeDialog : () => any, openDialog : ( component : any ) => any ) => {
    const Component = () => {
      const { data : _client, imgLogo } = useClient()
      const { loading, data } = useFinanceTransferDocumentQuery( {
        notifyOnNetworkStatusChange : true,
        fetchPolicy : 'network-only',
        variables : {
          id : Number( financeTransferDocumentId )
        },
        skip : !financeTransferDocumentId
      } )

      const items = useMemo( () => {
        if ( !data || !data.financeTransferDocument ) {
          return []
        }
        const financeTransferDocument = data.financeTransferDocument
        const tax = financeTransferDocument.tax && financeTransferDocument.tax.length !== 0 ? financeTransferDocument.tax[0] : {} as TTaxFinance
        return [
          {
            id : 1,
            totalFinanceVP : _.round( _.subtract( Number( tax.financeMP ), Number( tax.taxFinance ) ), 2 ),
            totalFinanceMP : tax.financeMP,
            itemDescription : financeTransferDocument.itemDescription,
            tax : {
              taxPercent : tax.taxPercent,
              taxFinance : tax.taxFinance
            }
          }
        ]
      }, [data] )

      const isAdvance = useMemo(() => Number(data?.financeTransferDocument?.documentType) === CONSTANT_MODEL.FINANCE_TRANSFER_DOCUMENT_TYPE.ADVANCE ,[data?.financeTransferDocument])
      const title = useMemo( () => isAdvance ? 'advance invoice' : 'Fin. tran. document', [isAdvance] )

      const client = React.useMemo( () => _client ? {
        ..._client,
        logo : imgLogo
      } : {}, [_client, imgLogo] )

      if ( loading ) {
        return <SpinnerLoadingCenter/>
      }
      
      const columns = tableData.columns.map(x => {
        if (x.field === 'totalFinanceMP') {
          return {
            ...x,
            label: isAdvance ? 'Adv. invoice finance' : 'TRAN. DOC. finance'
          }
        }
        return {
          ...x
        }
      })

      const _tableData = {
        ...tableData,
        columns: columns,
        data : items
      }

      resizeColumns( _tableData )

      return (
        <>
          <PDFDialog
                        title={ title }
                        closeAction={ closeDialog }
                        Component={ FinanceTransferDocumentPdf }
                        componentRenderProps={ {
                          tableData : _tableData,
                          financeTransferDocument : {
                            ...data?.financeTransferDocument,
                            client
                          },
                          cancelFunction : closeDialog
                        } }
          />
        </>
      )
    }
    openDialog( <DialogModalRootComponent name={ 'dialog-finance-transfer-document-pdf-708705401780417' } closeFn={ closeDialog }>
      <Component/>
    </DialogModalRootComponent> )

  } )
}