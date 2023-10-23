import React from 'react'

export const CustomerCardDocumentRender = ({value, model, index, additionalData}: { value: any, model: any, index: number, additionalData: any }) => {
  const obj = additionalData.find((x: any) => x.document === value)
  return (
    <div
            data-action={'action-show-document'}
            data-action-id={obj?.invoiceId ? obj.invoiceId :  obj?.calculationId ? obj.calculationId : obj?.returnInvoiceId ? obj.returnInvoiceId : obj?.financeTransferDocumentId ? obj?.financeTransferDocumentId  : ''}
            data-action-param={obj?.invoiceId ? 'invoiceId' : obj?.calculationId ? 'calculationId' : obj?.returnInvoiceId ? 'returnInvoiceId' : 'financeTransferDocumentId'}
    >
      {value}
    </div>
  )
}