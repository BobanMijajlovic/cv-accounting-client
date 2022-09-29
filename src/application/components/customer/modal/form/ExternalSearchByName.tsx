import React                      from 'react'
import { TCustomer }              from '../../../../../graphql/type_logic/types'
import { useValidation }          from '../../../../../validation'
import ApolloAsyncCall            from '../../../../../graphql/ApolloAsyncCallClass'
import AutoCompleteWithValidation from '../../../../../components/withValidation/AutoCompleteWithValidation'
import { useTranslationFunction } from '../../../../../components/Translation/useTranslation'

interface ISearchModel {
  value : string
}

export interface IExternalSearchByNameProps {
  processSelected : (customer : TCustomer) => void,
  label? : string,
  helperText? : string
}

const ExternalSearchByName = ({processSelected, label, helperText} : IExternalSearchByNameProps) => {

  const {translate} = useTranslationFunction()
  const validation = useValidation<ISearchModel>()
  const {setFieldError} = validation

  const handlerSearch = React.useCallback(async (value : string) : Promise<any> => {
    value = value.trim()
    const data : any = await ApolloAsyncCall.getCustomerExternal(value)
    if (value.length !== 0 && data.length === 0) {
      setFieldError('value', translate('AUTOCOMPLETE_CUSTOMER_SEARCH_VALIDATION_MESSAGE'))
    }
    return data
  }, [setFieldError])

  return (
    <div className={ 'd-flex align-items-center justify-content-around width-parent-full' }>
      <AutoCompleteWithValidation
                validation={ {
                  useValidation : validation,
                  model : 'value',
                  rule : {}
                } }
                classInputText={ 'lined-version' }
                label={ label }
                fullWidth
                helperText={ helperText }
                ComponentResultRender={ ExternalSearchByNameRender }
                handlerSearch={ handlerSearch }
                handlerSelectValue={ processSelected }
      />
    </div>
  )
}

export default ExternalSearchByName

export const ExternalSearchByNameRender = ({data} : { data : TCustomer }) => {

  const isDefined = React.useMemo(() => {
    return data && data.taxNumber !== undefined
  }, [data])

  return (
    <div className={ 'd-flex flex-row justify-content-between align-items-end p-2 border-bottom cursor-pointer color-primary hw-height-effect' }>
      <div className={ 'd-flex flex-column justify-content-start text-left' }>
        { isDefined ? <div>{ data.shortName?.substring(0, 30) }</div> : <div>&nbsp;</div> }
        { isDefined ? <small className={ 'text-overflow-170' }>{ isDefined ? data.fullName?.substring(0, 32) : '&nbsp;' }</small> :
          <small>&nbsp;</small> }
      </div>
      <div className={ 'd-flex flex-column justify-content-end' }>
        <small className={ 'd-flex flex-row justify-content-end' }>
          { isDefined ? <div>{ data.taxNumber }</div> : <div>&nbsp;</div> }
        </small>
        <small className={ 'd-flex flex-row justify-content-end' }>
          <div className={ 'd-flex flex-row ' }>
            { isDefined ? <div>{ data.uniqueCompanyNumber }</div> : <div>&nbsp;</div> }
          </div>
        </small>
      </div>
    </div>
  )

}