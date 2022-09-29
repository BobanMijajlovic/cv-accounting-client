import React from 'react'

import {
  IPaginationProps,
  IPaginationSearch
}                           from './interfaces'
import {
  PaginationButton,
  PaginationDelimiter,
  PaginationMove
}                           from './PaginationButton'
import {
  IUseOptimizeEventData,
  useOptimizeEventClick
}                           from '../hooks/useOptimizeEventClick'
import {Select}             from '../Select'
import {PAGINATION}         from '../../application/constants'
import ConditionalRendering from '../Util/ConditionalRender'
import {SearchInput}        from '../InputText'

const Pagination = ({page = 1, perPage = 10, buttonsToShow = 7, numItems = 0, actionEvent, optionsPerPage, searchInput = {} as IPaginationSearch} : IPaginationProps) => {

  const lastPage = React.useMemo(() => Math.ceil(numItems / perPage), [numItems, perPage])

  const paginationButtons = React.useMemo(() => {
    if (numItems === 0) {
      return []
    }
    const afterCurrentPage = Array(buttonsToShow).fill(0)
      .map((x, index) => +page + index + 1)
      .filter(x => x < lastPage)
    const beforeCurrentPage = Array(buttonsToShow).fill(0)
      .map((x, index) => Number(+page - index - 1))
      .filter(x => x > 0)
      .reverse()

    while (afterCurrentPage.length + beforeCurrentPage.length + 1 > buttonsToShow) {
      if (afterCurrentPage.length > beforeCurrentPage.length) {
        afterCurrentPage.pop()
      } else {
        beforeCurrentPage.shift()
      }
    }

    const array = [...beforeCurrentPage, page, ...afterCurrentPage]

    if (array[0] !== 1) {
      if (array[0] !== 2) {
        array.unshift(0)
      }
      array.unshift(1)
    }
    if (array[array.length - 1] !== lastPage) {
      if (array[array.length - 1] !== lastPage - 1) {
        array.push(0)
      }
      array.push(lastPage)
    }
    return array

  }, [page, perPage, buttonsToShow, lastPage, numItems])

  const {onClickHandler} = useOptimizeEventClick({
    eventHandler (data : IUseOptimizeEventData) {
      actionEvent && actionEvent(data.action as any, data.id as any)
    }
  })

  const onChange = React.useCallback((data) => {
    actionEvent && actionEvent(PAGINATION.EVENTS.PAGINATION_PAGE_CHANGE_PER_PAGE as any, +data.target.value)
  }, [actionEvent])

  const options = React.useMemo(() => {
    return (optionsPerPage || [5, 10, 15, 20, 25, 50]).map(x => ({
      label: x.toString(),
      value: x.toString()
    }))
  }, [optionsPerPage])
  
  const isMoveUpDisabled = React.useMemo(() => page >= paginationButtons[paginationButtons.length - 1],[page,paginationButtons])
  const isMoveDownDisabled = React.useMemo(() => page <= 1,[page])
  
  return (
    <div className={'d-flex align-items-center justify-content-between px-3'} onClick={onClickHandler}>
      {numItems ? <div className={'opacity-7 bold m-1'}># {numItems}</div> : <div className={'m-1'}>&nbsp;</div>}
      <div className={'d-flex align-items-center m-1'}>
        <ConditionalRendering condition={lastPage > 1}>
          <PaginationMove direction={'DOWN'} isDisabled={isMoveDownDisabled}/>
          {paginationButtons.map((x, index) => !x ? <PaginationDelimiter key={index}/> : <PaginationButton text={x} key={index} isActive={x === page}/>)}
          <PaginationMove direction={'UP'} isDisabled={isMoveUpDisabled}/>
        </ConditionalRendering>
      </div>

      <div className={'d-flex align-items-center'}>
        <div className={'mb-2'}>
          {numItems ? <Select isHelperText={false} isLabel={false} value={`${perPage}`} options={options} className={'lined-version'} style={{minWidth: '70px'}} onChange={onChange}/> : <></>}
        </div>
        <ConditionalRendering condition={!!searchInput?.handlerOnChange || false}>
          <div className={'mr-2 pb-1'} style={{width: '250px', marginLeft: '100px'}}>
            <SearchInput
                            handlerSearch={(searchInput as any).handlerOnChange}
                            label={''}
                            fullWidth
                            helperText={searchInput?.label as string}
                            lined
            />
          </div>
        </ConditionalRendering>
      </div>
    </div>
  )

}

export default Pagination
