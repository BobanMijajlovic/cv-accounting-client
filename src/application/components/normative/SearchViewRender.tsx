import React                     from 'react'
import { IComponentRenderProps } from '../_common/SearchView'
import {
  TItem,
  TNormative
} from '../../../graphql/type_logic/types'
import { CONSTANT_ITEM }         from '../../constants'
import { FontAwesomeIcon }       from '@fortawesome/react-fontawesome'
import { faCheckCircle }         from '@fortawesome/free-regular-svg-icons'

const SearchViewNormativeRender = ({model, classNames, selected} : IComponentRenderProps) => {
  const item = (model as any).item
  return (
    <div
            className={`d-flex flex-fill flex-column py-1 border-bottom cursor-pointer search-view-render-row${selected ? ' search-view-selected' : ''}${classNames ? ` ${classNames}` : ''} `}
            data-action={CONSTANT_ITEM.EVENTS.SELECTED_ONE}
            data-action-id={model.id}
    >
      <div className={'d-flex flex-row flex-fill justify-content-between align-items-center px-1'}>
        <div className={'d-flex font-smaller-3 text-center font-weight-400'}>
          {item.barCode}
        </div>
        {selected ? <FontAwesomeIcon className={'opacity-4 mr-4'} icon={faCheckCircle}/> : null}
        <div className={'d-flex  font-smaller-3 text-center font-weight-400'}>
          {item.code}
        </div>
      </div>
      <div className={'d-flex flex-column text-upper justify-content-center align-items-center pt-2 pb-0 font-smaller-3 font-weight-600 line-height-11 flex-2'}>
        {item.shortName}
      </div>
    </div>
  )
}

export default SearchViewNormativeRender