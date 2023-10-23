import React, {
  ChangeEvent,
  useRef,
  useState
}                                 from 'react'
import { InputText }              from '../../../../../components/InputText'
import ButtonShortcut             from '../../../../../components/Button/ButtonShortcut'
import { faSearch }               from '@fortawesome/free-solid-svg-icons'
import { TCustomer }              from '../../../../../graphql/type_logic/types'
import ApolloAsyncCall            from '../../../../../graphql/ApolloAsyncCallClass'
import { isEmpty as _isEmpty }    from 'lodash'
import { processError }           from '../../../../../graphql/utils'
import { SpinnerLoadingCenter }   from '../../../../../components/Spinner/SpinnerLoading'
import { useTranslationFunction } from "../../../../../components/Translation/useTranslation";

const ExternalSearchByTin = ({processSelected}: { processSelected: (customer: TCustomer) => void }) => {

  const { translate } = useTranslationFunction()
  const [state, setState]: [string, (v: string) => void] = useState('107112543')
  const [error, setError]: [string | undefined, (v: string) => void] = useState()
  const [loading, setLoading] : [boolean,(s:boolean)=> void] = useState(false as boolean)
  const ref =  useRef(null)

  const handlerOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setState(e.target.value)
  }

  const handlerOnSubmit = async () => {
    setLoading(true)
    try {
      const data: any = await ApolloAsyncCall.getCustomerExternalByTin(state)
      if (state.length !== 0 && _isEmpty(data)) {
        setLoading(false)
        setError(translate('AUTOCOMPLETE_SUPPLIER_SEARCH_VALIDATION_MESSAGE'))
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
                selectOnFocus
                label={''}
                lined
                helperText={translate('CUSTOMER_EXTERNAL_SEARCH_BY_TIN_HELPER_TEXT')}
                maxLength={9}
                classNames={'flex-1 pr-3'}
                value={state}
                onChange={handlerOnChange}
                error={error}
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

export default ExternalSearchByTin