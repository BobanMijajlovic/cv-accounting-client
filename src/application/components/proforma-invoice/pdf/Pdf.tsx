import React from 'react'
import {
  TClient,
  TProformaInvoice
}            from '../../../../graphql/type_logic/types'
import Pdf, {
  IPdfTableProps,
  resizeColumns,
  Table
}            from '../../../../components/Pdf/Pdf'

import ClientData                    from '../../invoice/pdf/Header/ClientData'
import LogoPdfComponent              from '../../invoice/pdf/Header/LogoPdfComponent'
import Header                        from '../../invoice/pdf/Header/Header'
import Footer                        from '../../invoice/pdf/Footer'
import Signature                     from '../../invoice/pdf/footer/Signature'
import { RenderCalculationItemData } from '../../calculation/pdf/_common/RenderColumns'
import {
  formatPrice,
  formatQuantity
}                                    from '../../../utils/Utils'
import { InvoiceDiscountRender }     from '../../invoice/pdf/_common/InvoiceDiscountRender'
import {
  RenderCalculationVatData,
  RenderVatDataTHead
}                                    from '../../calculation/pdf/_common/VatRender'
import {
  DialogModalRootComponent,
  EasyDialogApolloProvider
}                                    from '../../../../components/EasyModel/EasyModal'
import { useProformaInvoiceQuery }   from '../../../../graphql/graphql'
import {
  CONSTANT_INVOICE,
  DISCOUNT_SURCHARGE,
  DISCOUNT_SURCHARGE_TYPE
}                                    from '../../../constants'
import _                             from 'lodash'
import { SpinnerLoadingCenter }      from '../../../../components/Spinner/SpinnerLoading'
import { CenteredDialog }            from '../../../../components/Dialog/DialogBasic'
import {
  StyleSheet,
  View
}                                    from '@react-pdf/renderer'
import { useClient }                 from '../../../../store/client/useClient'

interface IProformaInvoicePdfProps {
  tableData : IPdfTableProps,
  proformaInvoice : TProformaInvoice
}

const ProformaInvoicePdf = ( { proformaInvoice, tableData } : IProformaInvoicePdfProps ) => {

  const styles = StyleSheet.create( {
    root : {
      flex : 2,
      flexDirection : 'column'
    }
  } )

  return (
    <Pdf
            title={ 'Proforma Invoice' }
            pageSize={ 'Letter' }
            showFooter
            header={ {
              rightPart : {
                Component : ClientData,
                props : {
                  data : proformaInvoice.client
                }
              },
              leftPart : {
                Component : LogoPdfComponent,
                props : {
                  image : ( proformaInvoice.client as TClient ).logo
                }
              },
              fixed : false
            } }
    >
      <View style={ styles.root }>
        <Header title={'Proforma Invoice'} data={ proformaInvoice }/>
        <Table tableData={ tableData }/>
        <Footer tableData={ tableData } invoice={ proformaInvoice }/>
      </View>
      <Signature invoice={ proformaInvoice }/>
    </Pdf>
  )
}

export default ProformaInvoicePdf

export const openDialogProformaInvoicePrint = ( { proformaInvoiceId, tableSettings } : { proformaInvoiceId : string, tableSettings? : any } ) => {
  const tSettings = tableSettings && Object.values( tableSettings )
  const tableData : IPdfTableProps = {
    columns : [
      {
        label : '#',
        format : ( value : any, index ? : number ) => `${ ( ( Number( index ) || 0 ) + 1 ).toString() }.`,
        minSize : 2,
        size : 2
      },
      {
        label : 'Code',
        field : 'item.code',
        alignment : 'left',
        format : ( value : any ) => `${ value.item.code }`
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
        format : ( value : any ) => formatPrice( value.priceVP as number )
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
        format : ( value : any ) => formatPrice( value.finalPrice )
      },
      {
        label : 'Finance no tax',
        field : 'financeFinalVP',
        alignment : 'right',
        sizeType : 4,
        format : ( value : any ) => formatPrice( value.financeFinalVP )
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
        label : 'Total',
        field : 'financeMP',
        sizeType : 4,
        alignment : 'right',
        format : ( value : any ) => formatPrice( value.financeMP )
      }
    ].filter( x => {
      const f : any = tableSettings && tSettings.find( ( y : any ) => y.field === x.field )

      if ( !f ) {
        return true
      }
      return !f.notVisible
    } ) as any
  }

  EasyDialogApolloProvider( ( closeDialog : () => any, openDialog : ( component : any ) => any ) => {
    const Component = () => {
      const { data : _client, imgLogo } = useClient()
      const { loading, data } = useProformaInvoiceQuery( {
        notifyOnNetworkStatusChange : true,
        fetchPolicy : 'network-only',
        variables : {
          id : Number( proformaInvoiceId )
        }
      } )

      const footerDiscount = React.useMemo( () => data?.proformaInvoice && ( data?.proformaInvoice as any ).discount && ( data?.proformaInvoice as any ).discount.length !== 0 ? {
        type : DISCOUNT_SURCHARGE_TYPE.PERCENT,
        node : DISCOUNT_SURCHARGE.DISCOUNT,
        value : ( data?.proformaInvoice as any ).discount[0].percent
      } : void( 0 ), [data?.proformaInvoice] )

      const defaultDiscount = React.useMemo( () => data?.proformaInvoice && data?.proformaInvoice.discountDefault ? {
        type : DISCOUNT_SURCHARGE_TYPE.PERCENT,
        node : DISCOUNT_SURCHARGE.DISCOUNT,
        value : ( data?.proformaInvoice as any ).discountDefault
      } : void( 0 ), [data?.proformaInvoice] )

      const items = data && data.proformaInvoice && data.proformaInvoice.items ? data.proformaInvoice.items.map( ( x ) => {
        const item = x as any
        const financeMP = _.round( _.add( Number( item.financeFinalVP ), Number( item.taxFinance ) ), 2 )
        return {
          ...item,
          uom : `${ item.uom }`,
          tax : {
            taxPercent : item.taxPercent,
            taxFinance : item.taxFinance
          },
          priceVP : _.round( _.divide( Number( item.financeVP ), Number( item.quantity ) ), 2 ),
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
          }
        }
      } ) : []

      const client = React.useMemo( () => _client ? {
        ..._client,
        logo : imgLogo
      } : {}, [_client, imgLogo] )

      if ( loading ) {
        return <SpinnerLoadingCenter/>
      }

      const _tableData = {
        ...tableData,
        data : items,
        summarize : {
          fields : ['financeFinalVP', 'tax', 'financeMP']
        }
      }

      resizeColumns( _tableData )

      return (
        <>
          <CenteredDialog
                        title={ 'Proforma Invoice Pdf' }
                        closeAction={ closeDialog }
                        Component={ ProformaInvoicePdf }
                        componentRenderProps={ {
                          tableData : _tableData,
                          proformaInvoice : {
                            ...data?.proformaInvoice,
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
