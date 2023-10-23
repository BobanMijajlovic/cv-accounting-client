import Pdf, {
  IPdfTableProps,
  Table
}                                       from '../../../../../components/Pdf/Pdf'
import { TCustomer }                    from '../../../../../graphql/type_logic/types'
import React                            from 'react'
import CustomerSpec                     from '../../../calculation/pdf/_common/CustomerSpec'
import { RenderCustomerCardDateFromTo } from '../../card/pdf/RenderColumn'

interface ICardProps {
  dateFrom: string
  dateTo: string
}

interface ICustomerPaymentsPdfProps {
  tableData: IPdfTableProps,
  customer: TCustomer
  payments: ICardProps
}

const CustomerPaymentsPdf = ({tableData, customer, payments}: ICustomerPaymentsPdfProps) => {

  return (
    <Pdf
            title={'Customer Payments'}
            pageSize={'Letter'}
            showFooter
            header={{
              title:'Customer payments',
              leftPart:{
                Component:CustomerSpec,
                props:{
                  customer
                }
              },
              rightPart:{
                Component:RenderCustomerCardDateFromTo,
                props:{
                  ...payments
                }
              }
            }}
    >
      <Table tableData={tableData}/>
    </Pdf>
  )
}

export default CustomerPaymentsPdf