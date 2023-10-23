import React, {
  ChangeEvent,
  useCallback,
  useEffect
}                               from 'react'
import {
  areTheSame,
  IFieldsRefs,
  minLength,
  required,
  useValidation
}                               from '../../../validation'
import SelectTextWithValidation from '../../../components/withValidation/SelectTextWithValidation'
import {
  TBank,
  TBankAccount
}                               from '../../../graphql/type_logic/types'
import * as _                   from 'lodash'
import { get as _get }          from 'lodash'
import {
  DialogModalRootComponent,
  EasyDialogApolloProvider
}                              from '../../../components/EasyModel/EasyModal'
import {
  CenteredDialog,
  DialogComponentQuestions
}                              from '../../../components/Dialog/DialogBasic'
import { BankAccountType }     from '../../../graphql/graphql'
import DialogButtonsSaveUpdate from '../_common/DialogButtonsSaveUpdate'
import { faUniversity }        from '@fortawesome/free-solid-svg-icons'
import { useBanks }            from '../../hooks/useBanks'
import InputTextWithValidation from '../../../components/withValidation/InputTextWithValidation'
import Label                   from '../../../components/basic/Label'
import { processErrorGraphQL } from '../../../apollo';

interface IBankAccountProps {
  submitFun: (bank: TBankAccount) => Promise<any> | void
  cancelFun: () => void
  bankAccount?: TBankAccount
}

type TAccountType = {
  first: string
  middle: string
  last: string
}

type TBankAccountFormType = BankAccountType & TAccountType

const BankAccountForm = ({submitFun, cancelFun, bankAccount}: IBankAccountProps) => {

  const {banks:banksData} = useBanks()

  const banks = React.useMemo(() => banksData && banksData.length > 0 ?
    banksData.map((bank: TBank) => {
      return {
        value:bank.id,
        label:bank.bankName,
        description:`${bank.id}`
      }
    }) : [], [banksData])

  const validation = useValidation<TBankAccountFormType>()

  const {state, setFieldValue, getFieldRef, setFieldError, validate} = validation

  const handlerOnChangeBank = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
    setFieldValue('first', e.target.value, true)
    const focusElement = getFieldRef('middle')
    focusElement && focusElement.ref && focusElement.ref.current.focus()
  }, [setFieldValue, getFieldRef])

  useEffect(() => {
    if (!bankAccount) {
      if (!banksData || banksData.length === 0) {
        return
      }
      setFieldValue('bankId', `${(banksData as any)[0].id}`, false)
      setFieldValue('first', `${(banksData as any)[0].id}`, false)
      return
    }
    ['bankId'].forEach((s: string) => _.get(bankAccount, s) ? setFieldValue(s, _.get(bankAccount, s).toString(), false) : null)
    if (bankAccount.account) {
      const val = (bankAccount.account as string).trim().split(' ')
      setFieldValue('first', val[0], false)
      setFieldValue('middle', val[1], false)
      setFieldValue('last', val[2], false)
    }
  }, [bankAccount, setFieldValue, banksData])

  const checkControlNumber = (data:any) => {
    if (!data || !data.first || !data.middle || !data.last || data.first.length !== 3 || data.middle.length < 6 || data.last.length !== 2) {
      return
    }
    if (Number(data.last) === 0) {
      setFieldError('last', 'Not valid')
      return
    }
    let _val = data.middle
    while (`${_val}`.length < 13) {
      _val = `0${_val}`
    }
    const toCheckNumber = BigInt(`${data.first}${_val}00`)
    const result = toCheckNumber % BigInt(97)
    const diff = BigInt(98) - result
    const controlNumber = BigInt(data.last)
    if (diff !== controlNumber) {
      return false
    }
    return true
  }

  const handlerOnSubmit = useCallback(async () => {
    const valid = await validation.validate()
    if (valid.error) {
      const fieldRef: IFieldsRefs | undefined = valid.refs.find(({field}: any) => _get(valid.validations, `validations.${field}.error`))
      console.log(fieldRef)
      fieldRef && fieldRef.ref.current.focus()
      return
    }
    const isValidControlNumber = await checkControlNumber(valid.data)
    if (!isValidControlNumber) {
      setFieldError('last', 'Not valid')
      const field = getFieldRef('last')
      field && field.ref && field.ref.current.focus()
      return
    }
    console.log(valid)
    const {data} = valid
    try {
      const obj = Object.assign({}, {
        bankId:Number(data.bankId),
        account:`${data.first}-${data.middle}-${data.last}`
      }, (bankAccount && bankAccount.id) ? {id:bankAccount.id} : {})
      await submitFun(obj)
      cancelFun()
    } catch (e) {
      processErrorGraphQL(e, validation)
    }
  }, [checkControlNumber])
  
  const _onBlur = useCallback((e:any) => {
    checkControlNumber(state)
  }, [state])

  return (
    <>
      <div className={'d-flex hw-client-form-add-contact-form'}>
        <div className={'container'}>
          <div className={'col-5'}>
            <SelectTextWithValidation
                            required
                            label={'Bank'}
                            focusOnMount
                            helperText={'choose bank'}
                            options={banks}
                            className={'small-options'}
                            onChange={handlerOnChangeBank}
                            validation={{
                              useValidation:validation,
                              model:'bankId',
                              rule:{
                                required,
                              }
                            }}
            />
          </div>
          <div className={'d-flex flex-column col-md-7'}>
            <Label
                            label={'Account number'}
                            required={true}
            />
            <div className={'d-flex input-bank-account'}>
              <div className={'mr-2'}>
                <InputTextWithValidation
                                    validation={{
                                      useValidation:validation,
                                      model:'first',
                                      rule:{
                                        required,
                                        areTheSame:areTheSame({
                                          message:'Code not match',
                                          field:'bankId'
                                        }),
                                      },
                                      format:{
                                        rule:{
                                          format:'###',
                                          mask:' ',
                                          validSize:3
                                        },
                                        validationMessage:'3 numbers needed'
                                      }
                                    }}
                                    useLabel={false}
                                    align={'align-center'}
                                    selectOnFocus={true}
                                    helperText={''}
                />
              </div>
              <div className={'middle mx-2'}>
                <InputTextWithValidation
                                    validation={{
                                      useValidation:validation,
                                      model:'middle',
                                      rule:{
                                        required,
                                        minLength:minLength({min:6})
                                      },
                                      format:{
                                        rule:{
                                          format:'#############',
                                          mask:' ',
                                          validSize:6
                                        },
                                        validationMessage:'6 numbers needed'
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
                                      useValidation:validation,
                                      model:'last',
                                      rule:{
                                        required
                                      },
                                      format:{
                                        rule:{
                                          format:'##',
                                          mask:' ',
                                          validSize:2
                                        },
                                        validationMessage:'2 numbers needed'
                                      }
                                    }}
                                    onBlur={_onBlur}
                                    useLabel={false}
                                    align={'align-center'}
                                    selectOnFocus={true}
                                    helperText={''}
                />
              </div>
            </div>
          </div>
          <DialogButtonsSaveUpdate
                        cancelFun={cancelFun}
                        submitFun={handlerOnSubmit}
                        update={!!bankAccount}
                        icon={faUniversity}
          />
        </div>
      </div>
    </>
  )

}

export default BankAccountForm

export interface IOpenDialogBankAccount {
  bank?: TBankAccount,
  submitFun: (bank: TBankAccount) => Promise<any> | void
}

export const openDialogBankAccount = ({bank, submitFun, ...rest}: IOpenDialogBankAccount) => {
  EasyDialogApolloProvider((closeDialog: () => any, openDialog: (data: any) => any) => {
    const ComponentToRender = () => {
      return (
        <BankAccountForm
                    cancelFun={closeDialog}
                    submitFun={submitFun}
                    bankAccount={bank}
                    {...rest}
        />
      )
    }
    openDialog(<DialogModalRootComponent name={'dialog-bank-account-add-876341234'} closeFn={closeDialog}>
      <CenteredDialog
                title={bank ? 'Edit bank account' : 'Define new bank account'}
                closeAction={closeDialog}
                Component={ComponentToRender}
      />
    </DialogModalRootComponent>)
  })
}

export interface IDialogBankAccountDelete {
  bankAccount: TBankAccount
  actionOnDelete?: (bank: TBankAccount) => void
}

export const openDialogBankAccountDelete = ({bankAccount, actionOnDelete}: IDialogBankAccountDelete) => {

  EasyDialogApolloProvider((closeDialog: () => any, openDialog: (data: any) => any) => {
    const Component = () => {
      const handlerConfirm = async () => {
        actionOnDelete && await actionOnDelete(bankAccount)
        closeDialog()
      }
      const messages: string[] = React.useMemo(() => [
        'Are you sure do delete bank account?',
        `${_get(bankAccount, 'bank.bankName', '')}`,
        `${_get(bankAccount, 'account', '')}`
      ], [bankAccount])

      return (
        <DialogComponentQuestions
                    closeFun={closeDialog}
                    confirmFun={handlerConfirm}
                    messages={messages}
        />
      )
    }
    openDialog(<DialogModalRootComponent name={'dialog-bank-account-delete-541456451165'} closeFn={closeDialog}>
      <CenteredDialog
                title={'DELETE BANK ACCOUNT'}
                closeAction={closeDialog}
                Component={Component}
      />
    </DialogModalRootComponent>)
  })
}

