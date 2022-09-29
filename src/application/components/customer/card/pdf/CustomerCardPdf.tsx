import Pdf, { IPdfTableProps }          from '../../../../../components/Pdf/Pdf'
import { TCustomer }                    from '../../../../../graphql/type_logic/types'
import React                            from 'react'
import Table                            from '../../../cash-account/pdf/Table'
import CustomerSpec                     from '../../../calculation/pdf/_common/CustomerSpec'
import { RenderCustomerCardDateFromTo } from './RenderColumn'

interface ICardProps {
  dateFrom : string
  dateTo: string
}

interface ICustomerCardPdfProps {
  tableData: IPdfTableProps,
  customer: TCustomer
  card: ICardProps
}

const CustomerCardPdf = ({ tableData, customer, card }: ICustomerCardPdfProps) => {

  return (
    <Pdf
              title={'Customer Card'}
              pageSize={'Letter'}
              showFooter
              header={{
                title:'Customer Card',
                leftPart:{
                  Component:CustomerSpec,
                  props:{
                    customer
                  }
                },
                rightPart: {
                  Component: RenderCustomerCardDateFromTo,
                  props: {
                    ...card
                  }
                }
              }}
    >
      <Table tableData={tableData}/>
    </Pdf>
  )
}

export default CustomerCardPdf