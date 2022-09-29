import React                      from 'react'
import { formatDateLong }         from '../../../../utils/Utils'
import { useBankTransactionForm } from '../../../../../store/bank-transaction/useBankTransaction'
import EmptyTag                   from '../../../../../components/Util/EmptyTag'

const BankHeaderTransaction = ( { bankHeaderTransactionId } : { bankHeaderTransactionId : string } ) => {

  const { bankTransaction } = useBankTransactionForm( bankHeaderTransactionId )
  return (
    <>
      {
        bankTransaction ? (
          <div className={ 'd-flex flex-row align-items-center justify-content-between px-2 mb-1 font-smaller-2 color-primary w-100' }>
            <div className={ 'font-bold text-upper d-flex flex-column text-center' }>
              <div className={ 'font-smaller-6 opacity-6 hw-show-hide-header-label' }>BANK ACCOUNT</div>
              <EmptyTag model={ bankTransaction.bankAccount } field={ 'account' } placeholder={ '### - ########## - ##' }/>
            </div>
            <div className={ 'font-bold text-upper d-flex flex-column text-center' }>
              <div className={ 'font-smaller-6 opacity-6 font-weight-600 hw-show-hide-header-label text-center' }>Date processed</div>
              <EmptyTag model={ bankTransaction } field={ 'dateProcessed' } format={ formatDateLong } placeholder={ 'Date processed' }/>
            </div>
            <div className={ 'font-bold text-upper d-flex flex-column text-center' }>
              <div className={ 'font-smaller-6 opacity-6 font-weight-600 hw-show-hide-header-label text-center' }>Document ID</div>
              <EmptyTag model={ bankTransaction } field={ 'documentId' } placeholder={ 'Document ID' }/>
            </div>
            <div className={ 'font-bold text-upper d-flex flex-column text-center' }>
              <div className={ ' font-smaller-6 opacity-6 hw-show-hide-header-label text-center' }>Description</div>
              <EmptyTag model={ bankTransaction } field={ 'description' } placeholder={ 'Description' }/>
            </div>
          </div>
        ) : <></>
      }
    </>
  )

}

export default BankHeaderTransaction
