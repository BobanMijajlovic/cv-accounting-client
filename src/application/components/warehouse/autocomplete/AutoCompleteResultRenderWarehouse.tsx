import React        from 'react'
import {TWarehouse} from '../../../../graphql/type_logic/types'

const AutoCompleteResultRenderWarehouse = ({data} : { data : TWarehouse }) => {

  const isDefined = React.useMemo(() => {
    return data
  }, [data])

  return (
    <div className={'d-flex flex-row justify-content-between align-items-end p-2 border-bottom cursor-pointer color-primary hw-height-effect'}>
      <div className={'d-flex flex-column justify-content-start text-left'}>
        {isDefined ? <div>{data.name}</div> : <div>&nbsp;</div>}
        {isDefined ? <small className={'text-overflow-170'}>{isDefined ? data.description : '&nbsp;'}</small> :
          <small>&nbsp;</small>}
      </div>
    </div>
  )

}

export default AutoCompleteResultRenderWarehouse
