import React                                    from 'react'
import { useReturnInvoiceForm }                 from '../../../../../../store/return-invoice/useReturnInvoice'
import { useTranslationFunction }               from '../../../../../../components/Translation/useTranslation'
import { TInvoiceItem }                         from '../../../../../../graphql/type_logic/types'
import _                                        from 'lodash'
import { RETURN_INVOICE_FORM_ITEMS_TABLE_NAME } from '../../../../../constants'
import { ITableModelCellChanged }               from '../../../../../../components/Table'
import { EVENT_TYPE_CHANGE_MODEL_FIELD }        from '../../../../../../components/Table/editors/InputTextEditor'
import { invoiceItemsTableHeader }              from '../../../../invoice/form/items/Table'
import Table                                    from '../../../../../../components/Table/Table'

const summarize = {
  fields: ['financeFinalVP', 'taxFinance', 'financeMP']
}

const ItemsTable = ( { returnInvoiceId } : { returnInvoiceId : string } ) => {
  const { returnInvoice, invoiceDeleteItem, invoiceUpdateItem } = useReturnInvoiceForm( returnInvoiceId )
  const { translate } = useTranslationFunction()
  const items: TInvoiceItem[] = (returnInvoice as any).items

  const tableData = React.useMemo(() => {
    if (!items) {
      return []
    }
    return items.map((item: TInvoiceItem) => {
      const _item = (item.item as any)
      const financeMP = _.round(_.add(Number(item.financeFinalVP), Number(item.taxFinance)), 2)
      return {
        ...item,
        uom: `${_item.uom}`,
        financeMP
      }
    })
  }, [items])

  const handlerDataEventClick = (event: any, id: any, action: any, param: any) => {

    if (!event.detail || event.detail !== 1) {
      return
    }

    if (action === 'delete') {
      id && invoiceDeleteItem(id)
      return
    }
  }

  const handlerModelFieldChanged = (data: ITableModelCellChanged) => {
    if (data.type === EVENT_TYPE_CHANGE_MODEL_FIELD) {
      invoiceUpdateItem(data.value, data.field, data.model)
      return
    }
  }

  const tableHeader = React.useMemo(() => {
    if (!invoiceItemsTableHeader) {
      return []
    }
    return invoiceItemsTableHeader.filter(x => x.field !== 'discount').map((x: any) => {
      return {
        ...x,
        label: x.label && x.label !== '#' ? translate(x.label) : x.label
      }
    })
  }, [invoiceItemsTableHeader])

  return (
    <Table
          modelFields={['taxPercent', 'taxId']}
          handlerEventDataClick={handlerDataEventClick}
          header={tableHeader}
          separator={'cell'}
          data={tableData}
          handlerEventModelFieldChanged={handlerModelFieldChanged}
          tableName={RETURN_INVOICE_FORM_ITEMS_TABLE_NAME}
          summarize={summarize}
          additionalData={returnInvoice}
    />
  )
}

export default ItemsTable