import React                 from 'react'
import Pdf, {IPdfTableProps} from '../../../../components/Pdf/Pdf'
import {
  TCustomer,
  TReceipt
}                            from '../../../../graphql/type_logic/types'
import CashReceiptTable      from './Table'
import ClientData            from '../../invoice/pdf/Header/ClientData'
import LogoPdfComponent      from '../../invoice/pdf/Header/LogoPdfComponent'
import image                 from '../../../../assets/images/logo-placeholder.png'
import Header                from './header/Header'
import Footer                from './footer/Footer'
import Signature             from './footer/Signature'

interface ICashReceiptPdfProps {
  tableData : IPdfTableProps,
  customer ?: TCustomer
  receipt : TReceipt
}

const CashReceiptPdf = ({tableData, customer, receipt} : ICashReceiptPdfProps) => {
  return (
    <Pdf
          title={'Cash Receipt'}
          pageSize={'Letter'}
          header={{
            rightPart: {
              Component: ClientData,
              props: {
                data: receipt.client
              }
            },
            leftPart: {
              Component: LogoPdfComponent,
              props: {
                image
              }
            },
            fixed: false
          }}
    >
      <Header data={{
        ...receipt,
        customer:customer
      }}/>
      <CashReceiptTable tableData={tableData}/>
      <Footer tableData={tableData} />
      <Signature receipt={receipt} />
    </Pdf>
  )    
}

export default CashReceiptPdf