import React, { useMemo } from 'react'
import Pdf, {
  IPdfTableColumnProps,
  IPdfTableProps,
  resizeColumns,
  Table
}                         from '../../../../components/Pdf/Pdf'
import {
  TClient,
  TInvoice
}                                    from '../../../../graphql/type_logic/types'
import Header                        from './Header/Header'
import { RenderCalculationItemData } from '../../calculation/pdf/_common/RenderColumns'
import {
  formatPrice,
  formatQuantity
}                                    from '../../../utils/Utils'
import {
  RenderCalculationVatData,
  RenderVatDataTHead
}                                    from '../../calculation/pdf/_common/VatRender'
import {
  DialogModalRootComponent,
  EasyDialogApolloProvider
}                                    from '../../../../components/EasyModel/EasyModal'
import { useInvoiceQuery }           from '../../../../graphql/graphql'
import { SpinnerLoadingCenter }      from '../../../../components/Spinner/SpinnerLoading'
import { PDFDialog }                 from '../../../../components/Dialog/DialogBasic'
import ClientData             from './Header/ClientData'
import Footer, { FooterCell } from './Footer'
import Signature              from './footer/Signature'
import _                             from 'lodash'
import {
  CONSTANT_INVOICE,
  DISCOUNT_SURCHARGE,
  DISCOUNT_SURCHARGE_TYPE
}                                    from '../../../constants'
import { InvoiceDiscountRender }     from './_common/InvoiceDiscountRender'
import LogoPdfComponent              from './Header/LogoPdfComponent'
import {
  StyleSheet,
  View
}                                    from '@react-pdf/renderer'
import { useClient }                 from '../../../../store/client/useClient'

interface IInvoicePdfProps {
  tableData : IPdfTableProps,
  invoice : TInvoice,
  title? : string
}

const InvoicePdf = ( { title = 'Invoice', tableData, invoice } : IInvoicePdfProps ) => {

  const styles = StyleSheet.create( {
    root : {
      flex : 2,
      flexDirection : 'column'
    }
  } )

  const note = useMemo(() => invoice.notes && (invoice.notes as any).length !== 0 ? (invoice.notes as any).map((x:any) => x.note) : '', [invoice.notes])

  return (
    <Pdf
            title={ title }
            pageSize={ 'Letter' }
            showFooter
            header={ {
              rightPart : {
                Component : ClientData,
                props : {
                  data : invoice.client
                }
              },
              leftPart : {
                Component : LogoPdfComponent,
                props : {
                  image : ( invoice.client as TClient ).logo
                }
              },
              fixed : false
            } }
    >
      <View style={ styles.root } wrap>
        <Header data={ invoice } title={ title }/>
        <Table tableData={ tableData }/>
        <Footer tableData={ tableData } invoice={ invoice }/>
      </View>
      <View  break={tableData.data.length > 14}>
        <View>
          <FooterCell label={ 'Note of the tax exemption :' } value={ '________________' }/>
          <FooterCell label={ 'Note:' } value={ note }/>
        </View>
        <Signature invoice={ invoice }/>
      </View>
    </Pdf>
  )
}

export default InvoicePdf

export const invoiceColumnsPDF = [
  {
    label : '#',
    format : ( value : any, index? : number ) => `${ ( ( Number( index ) || 0 ) + 1 ).toString() }.`,
    minSize : 2,
    size : 2
  },
  {
    label : 'Code',
    field : 'item.code',
    alignment : 'left',
    format : ( value : any ) => `${ value.item.code }`,
  },
  {
    label : 'Name',
    field : 'item.shortName',
    alignment : 'left',
    format : ( value : any ) => `${ value.item.shortName }`,
    render : RenderCalculationItemData,
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
    label : 'Price',
    field : 'price',
    alignment : 'right',
    format : ( value : any ) => formatPrice( value.price as number )
  },
  {
    label : 'Disc',
    field : 'discount',
    alignment : 'right',
    minSize : 10,
    format : ( value : any ) => formatPrice( value.discount as number ),
    render : InvoiceDiscountRender,
    renderProps : {
      field : 'discount'
    }
  },
  {
    label : 'Final price',
    field : 'finalPrice',
    alignment : 'right',
    format : ( value : any ) => formatPrice( value.finalPrice ),
  },
  {
    label : 'Finance',
    field : 'financeFinalVP',
    alignment : 'right',
    sizeType : 4,
    format : ( value : any ) => formatPrice( value.financeFinalVP ),
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
    label : 'Invoice finance',
    field : 'financeMP',
    sizeType : 4,
    alignment : 'right',
    format : ( value : any ) => formatPrice( value.financeMP )
  }
] as IPdfTableColumnProps[]

export const openDialogInvoicePrint = ( { invoiceId, tableSettings } : { invoiceId : string, tableSettings : any } ) => {
  const tableData : IPdfTableProps = {
    columns : invoiceColumnsPDF
  }

  EasyDialogApolloProvider( ( closeDialog : () => any, openDialog : ( component : any ) => any ) => {
    const Component = () => {

      const { data : _client, imgLogo } = useClient()
      const { loading, data } = useInvoiceQuery( {
        notifyOnNetworkStatusChange : true,
        fetchPolicy : 'network-only',
        variables : {
          id : Number( invoiceId )
        }
      } )

      const footerDiscount = React.useMemo( () => data?.invoice && ( data?.invoice as any ).discount && ( data?.invoice as any ).discount.length !== 0 ? {
        type : DISCOUNT_SURCHARGE_TYPE.PERCENT,
        node : DISCOUNT_SURCHARGE.DISCOUNT,
        value : ( data?.invoice as any ).discount[0].percent
      } : void( 0 ), [data?.invoice] )

      const defaultDiscount = React.useMemo( () => data?.invoice && data?.invoice.discountDefault ? {
        type : DISCOUNT_SURCHARGE_TYPE.PERCENT,
        node : DISCOUNT_SURCHARGE.DISCOUNT,
        value : ( data?.invoice as any ).discountDefault
      } : void( 0 ), [data?.invoice] )

      const items = data && data.invoice && data.invoice.items ? data.invoice.items.map( ( x ) => {
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
          finalPriceMP : _.round( _.divide( financeMP, Number( item.quantity ) ), 2 ),
          discount : item.discount && ( item as any ).discount.length !== 0 ? {
            type : DISCOUNT_SURCHARGE_TYPE.PERCENT,
            node : DISCOUNT_SURCHARGE.DISCOUNT,
            value : ( item as any ).discount[0].percent,
            footerDiscount,
            discountDefault : item?.useDiscountDefault === CONSTANT_INVOICE.TYPE.DEFAULT_DISCOUNT.ACTIVE ? defaultDiscount : void( 0 )
          } : {
            footerDiscount,
            discountDefault : item?.useDiscountDefault === CONSTANT_INVOICE.TYPE.DEFAULT_DISCOUNT.ACTIVE ? defaultDiscount : void( 0 )
          },
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
                        title={ 'INVOICE_PDF_DIALOG_TITLE' }
                        closeAction={ closeDialog }
                        Component={ InvoicePdf }
                        componentRenderProps={ {
                          tableData : _tableData,
                          invoice : {
                            ...data?.invoice,
                            client
                          },
                          cancelFunction : closeDialog
                        } }
          />
        </>
      )
    }
    openDialog( <DialogModalRootComponent name={ 'dialog-invoice-pdf-61545614596458' } closeFn={ closeDialog }>
      <Component/>
    </DialogModalRootComponent> )
  } )

}
