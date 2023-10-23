import React, {
  ChangeEvent,
  useRef,
  useState
}                                 from 'react'
import { TCustomer }              from '../../../../../graphql/type_logic/types'
import { InputText }              from '../../../../../components/InputText'
import ButtonShortcut             from '../../../../../components/Button/ButtonShortcut'
import { faSearch }               from '@fortawesome/free-solid-svg-icons'
import ApolloAsyncCall            from '../../../../../graphql/ApolloAsyncCallClass'
import { isEmpty as _isEmpty }    from 'lodash'
import { SpinnerLoadingCenter }   from '../../../../../components/Spinner/SpinnerLoading'
import { processError }           from '../../../../../graphql/utils'
import { useTranslationFunction } from "../../../../../components/Translation/useTranslation";

const ExternalSearchByBankAccount = ({processSelected}: { processSelected: (customer: TCustomer) => void }) => {

  const { translate } = useTranslationFunction()

  const [state, setState]: [string, (v: string) => void] = useState('45000660')
  const [error, setError]: [string | undefined, (v: string) => void] = useState()
  const [loading, setLoading] : [boolean,(s:boolean)=> void] = useState(false as boolean)
  const ref =  useRef(null)

  const handlerOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setState(e.target.value)
  }

  const handlerOnSubmit = async () => {
    setLoading(true)

    try {
      const data: any = await ApolloAsyncCall.getCustomerExternalByBankAccount(state)
      if (state.length !== 0 && _isEmpty(data)) {
        setLoading(false)
        setError(translate('AUTOCOMPLETE_CUSTOMER_SEARCH_VALIDATION_MESSAGE'))
        return
      }
      processSelected(data)
      setLoading(false)
    } catch (e) {
      const s = processError(e)
      if (s) {
        setError(s)
      }
      setLoading(false)
    }

  }

  return (
    <div className={'d-flex justify-content-between align-items-center'}>
      {loading ? <SpinnerLoadingCenter/> : null}
      <InputText
                inputRef={ref}
                label={''}
                lined
                helperText={translate('CUSTOMER_EXTERNAL_SEARCH_BY_BANK_ACCOUNT_HELPER_TEXT')}
                maxLength={11}
                classNames={'flex-1 pr-3 hw-input-bank-account-search'}
                value={state}
                onChange={handlerOnChange}
                selectOnFocus
                error={error}
                icon={{text: ' ### -'}}
                iconAction={{text: '- ## '}}
      />
      <ButtonShortcut
                icon={faSearch}
                label={translate('LABEL_FIND')}
                onClick={handlerOnSubmit}
                classNames={'hw-shortcut-button primary sm hw-button-border-color'}
      />
    </div>
  )
}

export default ExternalSearchByBankAccount