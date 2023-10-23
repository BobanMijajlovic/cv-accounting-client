import React, { useEffect }     from 'react'
import {
  IFieldsRefs,
  minLength,
  required,
  useValidation
}                              from '../../../../validation'
import SelectTextWithValidation from '../../../../components/withValidation/SelectTextWithValidation'
import {
  TBank,
  TBankAccount
}                              from '../../../../graphql/type_logic/types'
import { get as _get }         from 'lodash'
import { faUserPlus }          from '@fortawesome/free-solid-svg-icons'
import ButtonShortcut          from '../../../../components/Button/ButtonShortcut'
import ConditionalRendering    from '../../../../components/Util/ConditionalRender'
import { processErrorGraphQL } from '../../../../apollo'
import { useBanks }            from '../../../hooks/useBanks'
import InputBankAccount        from '../../../../components/InputText/InputBankAccount'
import Label                   from '../../../../components/basic/Label'
import InputTextWithValidation from '../../../../components/withValidation/InputTextWithValidation'

interface IBankAccountProps {
  submitFun: (bank: TBankAccount) => Promise<any>
  customerBanks?: TBankAccount[]
}

type BankAccountType = {
  bankId: string
  accountNumber: string
  first : string
  last: string
  middle: string
}

const BankPart = ({submitFun, customerBanks}: IBankAccountProps) => {

  const {banks: banksData} = useBanks()

  const banks = React.useMemo(() => banksData && banksData.length > 0 ?
    banksData.map((bank: TBank) => {
      return {
        value: bank.id,
        label: bank.bankName,
        description: `${bank.id}`
      }
    }) : [], [banksData])

  const validation = useValidation<BankAccountType>({
    initialData: {
      bankId: '',
      first: '',
      middle: '',
      last: ''
    }
  })

  const {setFieldValue, getFieldRef, setFieldError} = validation

  useEffect(() => {
    if (banksData && banksData.length !== 0) {
      setFieldValue('bankId',`${banksData[0].id}`,true)
      return
    }
  },[setFieldValue, banksData])

  const handlerOnSubmit = async () => {
    const {error, data, validations, refs} = await validation.validate()
    if (error) {
      const fieldRef: IFieldsRefs | undefined = refs.find(({field}: any) => _get(validations, `validations.${field}.error`))
      fieldRef && fieldRef.ref.current.focus()
      return
    }

    if (customerBanks) {
      if (!customerBanks.every((c: TBankAccount) => (+data.bankId !== c.bankId || _get(data, 'account') !== c.account))) {
        setFieldError('account', 'Bank account already exists')
        const fieldRef = getFieldRef('account')
        fieldRef && fieldRef.ref.current.focus()
        return
      }
    }

    try {
      const obj: TBankAccount = Object.assign({}, {
        bankId: Number(data.bankId),
        account: `${data.first.trim()} ${data.middle.trim()} ${data.last.trim()}`
      })
      await setFieldValue('first', '', false)
      await setFieldValue('middle', '', false)
      await setFieldValue('last', '', false)
      const fieldRef = getFieldRef('bankId')
      fieldRef && fieldRef.ref.current.focus()
      await submitFun(obj)
    } catch (e) {
            /** process the error */
      processErrorGraphQL(e, validation)
    }
  }

  const hide = React.useMemo(() => customerBanks && customerBanks.length > 1, [customerBanks])

  return (
    <>
      <ConditionalRendering condition={!hide}>
        <div className={'container p-0 d-flex align-items-center'}>
          <div className={'col-md-5 pl-0'}>
            <SelectTextWithValidation
                            required
                            selectOnFocus
                            label={'Bank'}
                            helperText={'choose bank'}
                            options={banks}
                            validation={{
                              useValidation: validation,
                              model: 'bankId'
                            }}
            />
          </div>
          <div className={'d-flex flex-column col-md-6 pl-0 pr-1'}>
            <Label
                  label={'Account number'}
                  required={true}
            />
            <div className={'d-flex input-bank-account'}>
              <div className={'mr-2'}>
                <InputTextWithValidation
                      validation={{
                        useValidation: validation,
                        model: 'first',
                        rule: {
                          required
                        },
                        format: {
                          rule: {
                            format: '###',
                            mask: ' ',
                            validSize: 3
                          },
                          validationMessage: '3 numbers needed'
                        }
                      }}
                      useLabel={false}
                      align={'align-center'}
                      selectOnFocus={true}
                      helperText={''}
                />
              </div>
              <div className={'mx-2'}>
                <InputTextWithValidation
                      validation={{
                        useValidation: validation,
                        model: 'middle',
                        rule: {
                          required,
                          minLength: minLength({min: 6})
                        },
                        format: {
                          rule: {
                            format: '###########',
                            mask: ' ',
                            validSize: 6
                          },
                          validationMessage: '6 numbers needed'
                        }
                      }}
                      useLabel={false}
                      selectOnFocus
                      minLength={8}
                      helperText={''}
                />
              </div>
              <div className={'mx-2'}>
                <InputTextWithValidation
                      validation={{
                        useValidation: validation,
                        model: 'last',
                        rule: {
                          required
                        },
                        format: {
                          rule: {
                            format: '##',
                            mask: ' ',
                            validSize: 2
                          },
                          validationMessage: '2 numbers needed'
                        }
                      }}
                      useLabel={false}
                      align={'align-center'}
                      selectOnFocus={true}
                      helperText={''}
                />
              </div>
            </div>
          </div>
          <div className={'col-md-1 pl-0'}>
            <ButtonShortcut
                            onClick={handlerOnSubmit}
                            icon={faUserPlus}
                            style={{minWidth: '50px'}}
                            label={'Add'}
                            classNames={'hw-shortcut-button primary sm hw-button-border-color mr-3'}
            />
          </div>
        </div>
      </ConditionalRendering>
    </>
  )

}

export default BankPart

