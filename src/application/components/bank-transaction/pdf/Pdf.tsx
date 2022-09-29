import React                                 from 'react'
import Pdf, {
  IPdfTableProps,
  resizeColumns
}                                            from '../../../../components/Pdf/Pdf'
import {TBankHeaderTransactions}             from '../../../../graphql/type_logic/types'
import BankTransactionTable                  from './BankTransactionTable'
import {RenderBankTransactionCustomerData}   from './_common/RenderBankTransactionCustomerData'
import {RenderBankTransactionDates}          from './_common/RenderBankTransactionDates'
import {RenderBankTransactionOwesClaimsData} from './_common/RenderBankTransactionOwesClaimsData'
import {
  DialogModalRootComponent,
  EasyDialogApolloProvider
}                                            from '../../../../components/EasyModel/EasyModal'
import {CenteredDialog}                      from '../../../../components/Dialog/DialogBasic'
import {useBankHeaderTransactionQuery}       from '../../../../graphql/graphql'
import {SpinnerLoadingCenter} from '../../../../components/Spinner/SpinnerLoading'
import {
  formatDateShort,
  formatPrice
}                             from '../../../utils/Utils'

interface IBankTransactionPdfProps {
  tableData : IPdfTableProps,
  bankHeaderTransaction : TBankHeaderTransactions
}

const BankTransactionPdf = ({bankHeaderTransaction, tableData} : IBankTransactionPdfProps) => {

  return (
    <Pdf
            title={'Bank transaction'}
            pageSize={'Letter'}
            showFooter
            header={{
              title: `Bank transaction ${bankHeaderTransaction.documentId}`,
            }}
            styles={{fontSize: 7}}
    >
      <BankTransactionTable tableData={tableData} />
    </Pdf>
  )
}

export default BankTransactionPdf

export const openDialogBankTransactionPdf = ({bankHeaderTransactionId, tableSettings} : { bankHeaderTransactionId : string, tableSettings : any }) => {
  const tSettings = Object.values(tableSettings)
  const tableData : IPdfTableProps = {
    columns: [
      {
        label: 'rb',
        format: (value : any, index ?: number) => ` ${((Number(index) || 0) + 1).toString()} `
      },
      {
        field: 'customerData',
        label: 'Name',
        minSize: 15,
        format: (value : any) => `${value.bankAccount?.accountString}`,
        render: RenderBankTransactionCustomerData,
        renderProps: {
          field: 'customerData'
        }
      },
      {
        label: 'Dates',
        field: 'dates',
        minSize: 5,
        render: RenderBankTransactionDates,
        format: (value : any) => `${value.dates.dateProcessed}`,
        renderProps: {
          field: 'dates'
        }
      },
      {
        label: 'Finance',
        field: 'finance',
        minSize: 20,
        format: (value : any) => `${value.finance.owes}`,
        render: RenderBankTransactionOwesClaimsData,
        renderProps: {
          field: 'finance'
        }
      },
      {
        label: 'code',
        field: 'code',
        alignment: 'center',
        format: (value : any) => `${value.code}`,
      },

      {
        label: 'Description',
        field: 'description',
        alignment: 'left',
        format: (value : any) => `${value.description}`,
      },
      {
        label: 'Model',
        field: 'modelString',
        alignment: 'left',
        format: (value : any) => `${value.modelString}`,
      },
      {
        label: 'Transaction',
        field: 'transactionKey',
        alignment: 'left',
        format: (value : any) => `${value.transactionKey}`,
      },
    ].filter(x => {
      const f : any = tSettings.find((y : any) => y.field === x.field)

      if (!f) {
        return true
      }
      return !f.notVisible
    }) as any
  }

  EasyDialogApolloProvider((closeDialog : () => any, openDialog : (component : any) => any) => {
    const Component = () => {

      const {loading, data} = useBankHeaderTransactionQuery({
        notifyOnNetworkStatusChange: true,
        fetchPolicy: 'network-only',
        variables: {
          id: Number(bankHeaderTransactionId)
        }
      })

      if (loading) {
        return <SpinnerLoadingCenter/>
      }

      const items = data?.bankHeaderTransaction && data?.bankHeaderTransaction?.bankTransactions ? 
        data.bankHeaderTransaction.bankTransactions.map((x : any) => {
          return {
            ...x,
            customerData: {
              account: x.bankAccount.account,
              shortName: x.customer.shortName
            },
            dates: {
              dateProcessed: formatDateShort(x.dateProcessed),
              datePaid: formatDateShort(x.datePaid)
            },
            finance: {
              owes: formatPrice(x.financeOwes),
              claims: formatPrice(x.financeClaims),
              expenses: formatPrice(x.expenses)
            },
          }
        }) : []

      const _tableData = {
        ...tableData,
        data: items
      }
      
      resizeColumns(_tableData)
      
      return (
        <CenteredDialog
              title={'Bank Transaction Pdf'}
              closeAction={closeDialog}
              Component={BankTransactionPdf}
              componentRenderProps={{
                tableData: _tableData,
                bankHeaderTransaction: data?.bankHeaderTransaction,
                cancelFunction: closeDialog
              }}
        />
      )
    }
    openDialog(<DialogModalRootComponent name={'dialog-bank-transaction-pdf-2707407070707507'} closeFn={closeDialog}>
      <Component />
    </DialogModalRootComponent>)
  })
    
}