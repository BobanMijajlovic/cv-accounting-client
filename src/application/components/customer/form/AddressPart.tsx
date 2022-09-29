import React                      from 'react'
import {
  IUseValidation,
  minLength
}                                 from '../../../../validation'
import { FORMAT_RULE_ZIP }        from 'react-hook-custom-validation'
import InputTextWithValidation    from '../../../../components/withValidation/InputTextWithValidation'
import { useTranslationFunction } from '../../../../components/Translation/useTranslation'

export interface IAddressPartProps<T> {
  fieldParentName?: string,
  validation: IUseValidation<T>,
  index?: number
}

const AddressPart = <T extends any>({fieldParentName, validation, index = 0}: IAddressPartProps<T>) => {
  const _fieldParentName = `${fieldParentName}[${index}]`
  const {translate: $translate} = useTranslationFunction()
  return (
    <>

      <div className={'d-flex p-0'}>
        <div className={'col-md-4 pl-0'}>
          <InputTextWithValidation
            label={$translate('LABEL_STREET')}
            helperText={'enter street'}
            maxLength={32}
            validation={{
              useValidation: validation,
              model: `${_fieldParentName}.street`,
            }}
          />
        </div>
        <div className={'col-md-2'}>
          <InputTextWithValidation
            align={'align-center'}
            selectOnFocus
            label={$translate('LABEL_ZIP')}
            helperText={'enter zip'}
            validation={{
              useValidation: validation,
              model: `${_fieldParentName}.zipCode`,
              rule: {
                minLength: minLength({min: 5})
              },
              format: {
                rule: FORMAT_RULE_ZIP,
                validationMessage: 'Zip is not valid'
              }
            }}
          />
        </div>
        <div className={'col-md-3'}>
          <InputTextWithValidation
            selectOnFocus
            label={$translate('LABEL_CITY')}
            helperText={'enter city'}
            maxLength={25}
            validation={{
              useValidation: validation,
              model: `${_fieldParentName}.city`,
            }}
          />
        </div>
        <div className={'col-md-3 pr-0'}>
          <InputTextWithValidation
            selectOnFocus
            label={$translate('LABEL_STATE')}
            helperText={'enter state'}
            maxLength={25}
            validation={{
              useValidation: validation,
              model: `${_fieldParentName}.state`,
            }}
          />
        </div>
      </div>
    </>
  )
}

export default AddressPart

