import React, { useRef }                           from 'react'
import { RETURN_INVOICE_PREVIEW_ITEMS_TABLE_NAME } from '../../../constants'
import Table                                       from '../../../../components/Table/Table'
import {
  TInvoiceItem,
  TReturnInvoice
}                                                  from '../../../../graphql/type_logic/types'
import _                                           from 'lodash'
import { useTranslationFunction }                  from '../../../../components/Translation/useTranslation'
import { invoiceItemsTableHeader }                 from '../../invoice/form/items/Table'

interface IReturnInvoicePreviewBodyProps {
  returnInvoice : TReturnInvoice
  headerState : boolean
}

const summarize = {
  fields : ['financeFinalVP', 'taxFinance', 'financeMP']
}
const Body = ( { returnInvoice, headerState } : IReturnInvoicePreviewBodyProps ) => {

  const { translate } = useTranslationFunction()
  const tableRoot = useRef( null )
  const items : any = ( returnInvoice as any ).items

  const tableData = React.useMemo( () => {
    if ( !items ) {
      return []
    }
    return items.map( ( item : TInvoiceItem ) => {
      const _item = ( item.item as any )
      const financeMP = _.round( _.add( Number( item.financeFinalVP ), Number( item.taxFinance ) ), 2 )
      return {
        ...item,
        uom : `${ _item.uom }`,
        finalPrice : _.round( _.divide( Number( item.financeFinalVP ), Number( item.quantity ) ), 2 ),
        financeMP,
        finalPriceMP : _.round( _.divide( financeMP, Number( item.quantity ) ), 2 )
      }
    } )
  }, [items] )

  const tableHeader = React.useMemo( () => {
    const header = [...invoiceItemsTableHeader].filter( x => x.field !== 'discount' ).map( x => {
      return {
        ...x,
        notResize : true,
        cell : {
          ...x.cell,
          editor : void( 0 )
        }
      }
    } )
    const index : any = invoiceItemsTableHeader.findIndex( ( x : any ) => x.field === 'act' )
    if ( index === -1 ) {
      return header
    }
    header[index] = {
      ...header[index],
      notResize : true
    } as any
    header.splice( index, 1 )
    return header.map( ( x : any ) => {
      return {
        ...x,
        label : x.label && x.label !== '#' ? translate( x.label ) : x.label
      }
    } )
  }, [] )

  return (
    <div ref={ tableRoot } className={ 'w-100 calculation-items-table-root mb-1 flex-2' }>
      <Table
                modelFields={ ['taxPercent', 'taxId'] }
                header={ tableHeader }
                separator={ 'cell' }
                data={ tableData }
                tableName={ RETURN_INVOICE_PREVIEW_ITEMS_TABLE_NAME }
                summarize={ summarize }
                additionalData={ returnInvoice }
      />
    </div>
  )
}

export default Body
