import {
  IPdfTableProps,
  resizeColumns
}                                        from '../../../../components/Pdf/Pdf'
import {
  DialogModalRootComponent,
  EasyDialogApolloProvider
}                                        from '../../../../components/EasyModel/EasyModal'
import { useClient }                     from '../../../../store/client/useClient'
import { useReturnInvoiceQuery }         from '../../../../graphql/graphql'
import React                             from 'react'
import _                                 from 'lodash'
import { SpinnerLoadingCenter }          from '../../../../components/Spinner/SpinnerLoading'
import { PDFDialog }                     from '../../../../components/Dialog/DialogBasic'
import InvoicePdf, { invoiceColumnsPDF } from '../../invoice/pdf/Pdf'

export const openDialogReturnInvoicePrint = ( { returnInvoiceId } : { returnInvoiceId : string } ) => {
  const tableData : IPdfTableProps = {
    columns : invoiceColumnsPDF.filter( x => x.field !== 'discount' )
  }

  EasyDialogApolloProvider( ( closeDialog : () => any, openDialog : ( component : any ) => any ) => {
    const Component = () => {

      const { data : _client, imgLogo } = useClient()
      const { loading, data } = useReturnInvoiceQuery( {
        notifyOnNetworkStatusChange : true,
        fetchPolicy : 'network-only',
        variables : {
          id : Number( returnInvoiceId )
        }
      } )

      const items = data && data.returnInvoice && data.returnInvoice.items ? data.returnInvoice.items.map( ( x ) => {
        const item = x as any
        const financeMP = _.round( _.add( Number( item.financeFinalVP ), Number( item.taxFinance ) ), 2 )
        return {
          ...item,
          uom : `${ item.uom }`,
          tax : {
            taxPercent : item.taxPercent,
            taxFinance : item.taxFinance
          },
          finalPrice : _.round( _.divide( Number( item.financeFinalVP ), Number( item.quantity ) ), 2 ),
          financeMP,
          finalPriceMP : _.round( _.divide( financeMP, Number( item.quantity ) ), 2 )
        }
      } ) : []

      const client = React.useMemo( () => _client ? {
        ..._client,
        logo : imgLogo
      } : {}, [_client, imgLogo] )

      if ( loading ) {
        return <SpinnerLoadingCenter/>
      }
      const summarize = {
        fields : ['financeFinalVP', 'tax', 'financeMP']
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
                        title={ 'Return INVOICE PDF' }
                        closeAction={ closeDialog }
                        Component={ InvoicePdf }
                        componentRenderProps={ {
                          tableData : _tableData,
                          invoice : {
                            ...data?.returnInvoice,
                            client
                          },
                          title: 'Return Invoice',
                          cancelFunction : closeDialog
                        } }
          />
        </>
      )
    }
    openDialog( <DialogModalRootComponent name={ 'dialog-return-invoice-pdf-21511901510540' } closeFn={ closeDialog }>
      <Component/>
    </DialogModalRootComponent> )
  } )

}
