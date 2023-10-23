import React                   from 'react'
import {IComponentRenderProps} from '../_common/SearchView'
import {CONSTANT_CUSTOMER}     from '../../constants'
import {FontAwesomeIcon}       from '@fortawesome/react-fontawesome'
import {faCheckCircle}         from '@fortawesome/free-regular-svg-icons'
import {TCustomer}             from '../../../graphql/type_logic/types'

const SearchViewRender = ({model, classNames, selected}: IComponentRenderProps) => {
  const _model = model as TCustomer
  return (
    <div
      className={`d-flex flex-fill flex-column  p-0 pb-1  border-bottom cursor-pointer  search-view-render-row ${selected ? ' search-view-selected' : ''} ${classNames ? ` ${classNames}` : ''} `}
      data-action={CONSTANT_CUSTOMER.EVENTS.SELECTED_ONE}
      data-action-id={model.id}
    >
      <div className={'d-flex flex-row flex-fill justify-content-between align-items-center p-1'}>
        <div className={'d-flex flex-column font-smaller-3 mt-1'}>
          <div className={'text-center font-weight-bold'}>{_model.taxNumber}</div>
        </div>
        {selected ? <FontAwesomeIcon className={'opacity-4 '} icon={faCheckCircle}/> : null}
        <div className={'d-flex flex-column font-smaller-5'}>
          <div className={'text-center font-weight-500'}>{_model.uniqueCompanyNumber}</div>
        </div>
      </div>
      <div className={'d-flex flex-column align-items-center pt-3 p-2'}>
        <div className={'font-smaller-3 font-weight-normal line-height-11'}>{_model.shortName ? _model.shortName?.substring(0, 32) : _model.fullName?.substring(0, 128)}</div>
      </div>
    </div>
  )
}

export default SearchViewRender
