import React, { useMemo }         from 'react'
import { TCustomer }              from '../../../../graphql/type_logic/types'
import EmptyTag                   from '../../../../components/Util/EmptyTag'
import { useTranslationFunction } from '../../../../components/Translation/useTranslation'
import { CustomerName }           from '../views/CustomerViewShort'

const AutoCompleteResultRenderCustomer = ( { data } : { data : TCustomer } ) => {
  const isDefined = React.useMemo( () => {
    return data && data.taxNumber !== undefined
  }, [data] )

  return (
    <div className={ 'd-flex flex-row justify-content-between align-items-center p-2 border-bottom cursor-pointer color-primary hw-height-effect' }>
      <div className={ 'd-flex flex-column justify-content-start flex-wrap text-left flex-2 pr-2'}>
        { isDefined && <CustomerName data={data}/>}
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

export default AutoCompleteResultRenderCustomer
