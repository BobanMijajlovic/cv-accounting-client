import React                      from 'react'
import TextAreaWithValidation     from '../../../../components/withValidation/TextAreaWithValidation'
import SelectTextWithValidation   from '../../../../components/withValidation/SelectTextWithValidation'
import {
  FORMAT_CURRENCY_STANDARD,
  IUseValidation,
  required
}                                 from '../../../../validation'
import InputTextWithValidation    from '../../../../components/withValidation/InputTextWithValidation'
import { useTranslationFunction } from '../../../../components/Translation/useTranslation'
import { useVats }                from '../../../../store/vats/useVats'
import { formatPrice }            from '../../../utils/Utils'
import Label                      from '../../../../components/basic/Label'
import { InputText }              from '../../../../components/InputText'

interface IAdvanceInvoiceItemFinanceProps<T> {
  validation: IUseValidation<T>
  taxFinance : number
}

const AdvanceInvoiceItemFinancePart = <T extends any>({validation, taxFinance}:IAdvanceInvoiceItemFinanceProps<T>) => {
  const {translate} = useTranslationFunction()

  const {data} = useVats()

  const vatsOptions = React.useMemo(() => {
    let vatData: any = []
    if (data) {
      vatData = data.map((vat: any) => {
        const vatValue = vat.values[0]
        return {
          label: `${vat.short} ${formatPrice(vatValue.value)} %`,
          value: `${vat.id}`
        }
      })
    }
    return [
      {
        label: 'Tax %',
        value: ''
      },
      ...vatData
    ]
  }, [data])

  const {state} = validation
    
  return (
    <div className={'d-flex flex-column'}>
      <TextAreaWithValidation
                label={'Item description'}
                helperText={''}
                fullWidth
                lined
                useHelpText={false}
                validation={{
                  useValidation: validation,
                  model: 'itemDescription',
                }}
      />
      <div className={'d-flex justify-content-end pt-3'}>
        <div className={'hw-transfer-document-finance-part'}>
          <SelectTextWithValidation
                  required
                  helperText={translate('HELPER_TEXT_CHOOSE_TAX')}
                  options={vatsOptions}
                  label={translate('LABEL_TAX')}
                  lined
                  validation={{
                    useValidation: validation,
                    model: 'taxId',
                    rule: {
                      required: required({message: translate('REQUIRED_FIELD')})
                    }
                  }}
          />

          <div className={'px-3'}>
            <InputText
                  align={'align-right'}
                  selectOnFocus
                  lined
                  label={'Tax finance'}
                  helperText={'enter finance'}
                  value={taxFinance > 0 ? formatPrice(taxFinance) : '###.##'}
                  readOnly
                  disabled
            />
          </div>

          <InputTextWithValidation
                  align={'align-right'}
                  selectOnFocus
                  lined
                  label={translate('LABEL_FINANCE')}
                  helperText={'enter finance'}
                  validation={{
                    useValidation: validation,
                    model: 'totalFinanceMP',
                    rule: {
                      required: required({message: translate('REQUIRED_FIELD')})
                    },
                    format: {
                      rule: {
                        ...FORMAT_CURRENCY_STANDARD,
                        ...{
                          decimalPlace: 2
                        }
                      }
                    }
                  }}
          />
        </div>
      </div>
    </div>
  )
}

export default AdvanceInvoiceItemFinancePart