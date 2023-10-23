import React, {useRef}           from 'react'
import {
  CONSTANT_INVOICE,
  DISCOUNT_SURCHARGE,
  DISCOUNT_SURCHARGE_TYPE,
  PROFORMA_INVOICE_PREVIEW_ITEMS_TABLE_NAME
}                                from '../../../constants'
import Table                     from '../../../../components/Table/Table'
import {
  TDiscounts,
  TInvoiceItem,
  TProformaInvoice
}                                from '../../../../graphql/type_logic/types'
import _                         from 'lodash'
import {invoiceItemsTableHeader} from '../../invoice/form/items/Table'

interface IProformaInvoicePreviewBodyProps {
  proformaInvoice : TProformaInvoice
  headerState : boolean
  discountDefault ?: TDiscounts
}
const summarize = {
  fields: ['financeFinalVP', 'taxFinance', 'financeMP','discount']
}
const Body = ({proformaInvoice, headerState,discountDefault} : IProformaInvoicePreviewBodyProps) => {
  
  const tableRoot = useRef(null)
  const items : any = (proformaInvoice as any).items

  const tableData = React.useMemo(() => {
    if (!items) {
      return []
    }
    return items.map((item : TInvoiceItem) => {
      const _item = (item.item as any)
      const financeMP =  _.round(_.add(Number(item.financeFinalVP),Number(item.taxFinance)),2)
      return {
        ...item,
        uom: `${_item.uom}`,
        discount: item.discount && (item as any).discount.length !== 0 ? {
          type: DISCOUNT_SURCHARGE_TYPE.PERCENT,
          node: DISCOUNT_SURCHARGE.DISCOUNT,
          value: (item as any).discount[0].percent,
          discountDefault : item?.useDiscountDefault === CONSTANT_INVOICE.TYPE.DEFAULT_DISCOUNT.ACTIVE ? discountDefault : void(0)
        } : {
          discountDefault : item?.useDiscountDefault === CONSTANT_INVOICE.TYPE.DEFAULT_DISCOUNT.ACTIVE ? discountDefault : void(0)
        },
        finalPrice: _.round(_.divide(Number(item.financeFinalVP),Number(item.quantity)),2),
        financeMP,
        finalPriceMP: _.round(_.divide(financeMP,Number(item.quantity)),2)
      }
    })
  }, [items, discountDefault])

  const tableHeader = React.useMemo(() => {
    const header = [...invoiceItemsTableHeader].map(x => {
      return {
        ...x,
        notResize: true,
        cell: {
          ...x.cell,
          editor: void(0)
        }
      }
    })
    const index : any = invoiceItemsTableHeader.findIndex(x => x.field === 'act')
    if (index === -1) {
      return header
    }
    header[index] = {
      ...header[index],
      notResize: true
    } as any
    header.splice(index, 1)
    return header
  }, [])

  return (
    <div  ref={tableRoot} className={'w-100 calculation-items-table-root mb-1 flex-2'}>
      <Table
                modelFields={['taxPercent', 'taxId']}
                header={tableHeader}
                separator={'cell'}
                data={tableData}
                tableName={PROFORMA_INVOICE_PREVIEW_ITEMS_TABLE_NAME}
                summarize={summarize}
                additionalData={proformaInvoice}
      />
    </div>
  )
}

export default Body
