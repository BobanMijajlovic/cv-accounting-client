import React                      from 'react'
import {
  FORMAT_CURRENCY_STANDARD,
  IUseValidation,
  required
}                                 from '../../../../../validation'
import InputTextWithValidation    from '../../../../../components/withValidation/InputTextWithValidation'
import { useTranslationFunction } from '../../../../../components/Translation/useTranslation'

interface IInvoiceFinanceExpenseProps<T> {
  validation : IUseValidation<T>
}

const InvoiceFinanceTax = <T extends any>( { validation } : IInvoiceFinanceExpenseProps<T> ) => {
  const { translate } = useTranslationFunction()
  return (
    <div className={ 'd-flex justify-content-start pb-2 w-50 pr-4' }>
      <div className={ 'hw-document-header-other-parts ' }>
        <InputTextWithValidation
                    required
                    label={ translate( 'CALCULATION_HEADER_INPUT_INVOICE_WITH_TAX_LABEL' ) }
                    helperText={ '' }
                    fullWidth
                    lined
                    selectOnFocus
                    align={ 'align-right' }
                    validation={ {
                      useValidation : validation,
                      model : 'totalFinanceMP',
                      rule : {
                        required
                      },
                      format : {
                        rule : {
                          ...FORMAT_CURRENCY_STANDARD,
                          ...{
                            decimalPlace : 2
                          }
                        }
                      }
                    } }
                    // labelIcon={<TooltipIcon icon={faInfoCircle} text={'Invoice finance with tax'} type={'info'} position={'top-left'} classNames={'font-bigger-1'} />}
        />
      </div>
      <div className={ 'hw-document-header-other-parts' }>
        <InputTextWithValidation
                    required
                    lined
                    label={ translate( 'CALCULATION_HEADER_INPUT_INVOICE_TAX_LABEL' ) }
                    helperText={ '' }
                    fullWidth
                    selectOnFocus
                    align={ 'align-right' }
                    validation={ {
                      useValidation : validation,
                      model : 'financeTax',
                      rule : {
                        required
                      },
                      format : {
                        rule : {
                          ...FORMAT_CURRENCY_STANDARD,
                          ...{
                            decimalPlace : 2
                          }
                        }
                      }
                    } }
        />
      </div>
    </div>
  )
}

export default InvoiceFinanceTax

