import React, { useEffect }       from 'react'
import { useClient }              from '../../../../../store/client/useClient'
import {
  TBankAccount,
  TBankHeaderTransactionType
}                                 from '../../../../../graphql/type_logic/types'
import SelectTextWithValidation   from '../../../../../components/withValidation/SelectTextWithValidation'
import {
  IFieldsRefs,
  required,
  useValidation
}                                 from '../../../../../validation'
import {
  BankHeaderTransactionType,
  useBankHeaderTransactionQuery
}                                 from '../../../../../graphql/graphql'
import InputTextWithValidation    from '../../../../../components/withValidation/InputTextWithValidation'
import { useTranslationFunction } from '../../../../../components/Translation/useTranslation'
import DatePickerWithValidation   from '../../../../../components/withValidation/DatePickerWithValidation'
import {
  DialogModalRootComponent,
  EasyDialogApolloProvider
}                                 from '../../../../../components/EasyModel/EasyModal'
import { CenteredDialog }         from '../../../../../components/Dialog/DialogBasic'
import DialogButtonsSaveUpdate    from '../../../_common/DialogButtonsSaveUpdate'
import { faUniversity }           from '@fortawesome/free-solid-svg-icons'
import _                          from 'lodash'

interface IBankHeaderTransactionForm {
  successFunction : (bankHeaderTransaction : TBankHeaderTransactionType) => Promise<any>,
  bankHeaderTransactionId? : string
  cancelFunction?: ()=> void
}

const BankHeaderTransactionForm = ( {successFunction,cancelFunction, bankHeaderTransactionId } : IBankHeaderTransactionForm) => {

  const { translate } = useTranslationFunction()  
  const validation = useValidation<BankHeaderTransactionType>()

  const {data : _bankTransaction} = useBankHeaderTransactionQuery({
    notifyOnNetworkStatusChange : true,
    fetchPolicy : 'network-only',
    variables : {
      id : Number(bankHeaderTransactionId)
    },
    skip : !bankHeaderTransactionId
  })
  const bankTransaction = React.useMemo(() => !_bankTransaction || !_bankTransaction.bankHeaderTransaction ? void(0) : _bankTransaction.bankHeaderTransaction, [_bankTransaction])

  const  { setFieldValue } = validation
  const { banks } = useClient()
  const banksOptions = React.useMemo(() => !banks || banks.length === 0 ? [] :
    (banks as TBankAccount[]).map((bank:TBankAccount) => {
      return {
        label: bank.account,
        description: bank.bank?.bankName,
        value: bank.id
      }
    }), [banks])

  useEffect(() => {
    if (!bankTransaction && banksOptions.length !== 0 ) {
      setFieldValue('bankAccountId',`${banksOptions[0].value}`,false)
      return
    }

    ['bankAccountId','documentId','dateProcessed','description'].forEach((s: string) => _.get(bankTransaction, s) ? setFieldValue(s, _.get(bankTransaction, s).toString(), false) : null)
    return
   
  },[bankTransaction, setFieldValue, banksOptions])
    
  const handlerSubmit = async () => {
      
    const { data, error, refs, validations } = await validation.validate()
    if (error) {
      const fieldRef : IFieldsRefs | undefined = refs.find( ( { field } ) => _.get( validations, `validations.${ field }.error` ) )
      fieldRef && fieldRef.ref.current.focus()
      return
    }
    const _data = {
      header: {
        ...data,
        bankAccountId : Number( data.bankAccountId ),
        dateProcessed : new Date( data.dateProcessed ).toISOString()
      }
    } as TBankHeaderTransactionType

    await successFunction(_data)
    cancelFunction && cancelFunction()
  }
    
  const handlerCancel = () => {
    cancelFunction && cancelFunction()
  }
    
  return (
    <div className={'d-flex flex-wrap justify-content-between w-100 pt-0 mb-1 hw-bank-header-transaction-form-root'}>
      <div className={'col-6'}>
        <SelectTextWithValidation
                   label={'Bank account'}
                   helperText={''}
                   lined
                   focusOnMount
                   required
                   options={banksOptions as any}
                   validation={{
                     useValidation:validation,
                     model:'bankAccountId',
                     rule:{
                       required: required({message: translate('REQUIRED_FIELD')})
                     }
                   }}
        />
      </div>
      <div className={'col-6'}>
        <DatePickerWithValidation
            format={ 'dd/MM/yyyy' }
            label={'Date processed'}
            helperText={''}
            fullWidth
            lined
            align={'align-center'}
            selectOnFocus
            validation={{
              useValidation:validation,
              model:'dateProcessed',
              rule:{
                required: required({message: translate('REQUIRED_FIELD')})
              }
            }}
        />
      </div>
      <div className={'col-6'}>
        <InputTextWithValidation
            label={'Document ID'}
            helperText={''}
            fullWidth
            lined
            selectOnFocus
            align={'align-left'}
            validation={{
              useValidation:validation,
              model:'documentId'
            }}
        />
      </div>
      <div className={'col-6'}>
        <InputTextWithValidation
            label={'Description'}
            helperText={''}
            fullWidth
            lined
            selectOnFocus
            validation={{
              useValidation:validation,
              model:'description'
            }}
        />
      </div>

      <DialogButtonsSaveUpdate
            cancelFun={ handlerCancel }
            submitFun={ handlerSubmit }
            icon={ faUniversity }
            update={ !!bankHeaderTransactionId }
      />
        
    </div> 
  )
    
}

export default BankHeaderTransactionForm

export interface IDialogBankTransactionHeaderForm {
  handlerSuccess : (bankHeaderTransaction : TBankHeaderTransactionType) => Promise<any>| void,
  bankHeaderTransactionId? : string
  fieldFocus? : string
}

export const openDialogBankHeaderTransactionForm = ({handlerSuccess, bankHeaderTransactionId, fieldFocus} : IDialogBankTransactionHeaderForm) => {
  EasyDialogApolloProvider((closeDialog : () => any, openDialog : (data : any) => any) => {
    openDialog(<DialogModalRootComponent name={ 'dialog-bank-header-transaction-form-78074501074210' } closeFn={ closeDialog }>
      <CenteredDialog
                title={ 'Bank header transaction' }
                closeAction={ closeDialog }
                Component={ BankHeaderTransactionForm }
                componentRenderProps={ {
                  successFunction : handlerSuccess,
                  bankHeaderTransactionId,
                  fieldFocus,
                  cancelFunction : closeDialog
                } }
      />
    </DialogModalRootComponent>)
  })
}
