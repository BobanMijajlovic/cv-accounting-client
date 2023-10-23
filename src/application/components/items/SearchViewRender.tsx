import React                   from 'react'
import {IComponentRenderProps} from '../_common/SearchView'
import {CONSTANT_ITEM}         from '../../constants'
import {FontAwesomeIcon}       from '@fortawesome/react-fontawesome'
import {faCheckCircle}         from '@fortawesome/free-regular-svg-icons'
import {TItem}                 from '../../../graphql/type_logic/types'

const SearchViewItemRender = ({model, classNames, selected} : IComponentRenderProps) => {
  const _model = model as TItem
  return (
    <div
            className={`d-flex flex-fill flex-column py-1 border-bottom cursor-pointer search-view-render-row${selected ? ' search-view-selected' : ''}${classNames ? ` ${classNames}` : ''} `}
            data-action={CONSTANT_ITEM.EVENTS.SELECTED_ONE}
            data-action-id={model.id}
    >
      <div className={'d-flex flex-row flex-fill justify-content-between align-items-center px-1'}>
        <div className={'d-flex font-smaller-3 text-center font-weight-400'}>
          {_model.barCode}
        </div>
        {selected ? <FontAwesomeIcon className={'opacity-4 mr-4'} icon={faCheckCircle}/> : null}
        <div className={'d-flex  font-smaller-3 text-center font-weight-400'}>
          {_model.code}
        </div>
      </div>
      <div className={'d-flex flex-column text-upper justify-content-center align-items-center pt-2 pb-0 font-smaller-3 font-weight-600 line-height-11 flex-2'}>
        {_model.shortName}
      </div>
    </div>
  )
}

export default SearchViewItemRender
