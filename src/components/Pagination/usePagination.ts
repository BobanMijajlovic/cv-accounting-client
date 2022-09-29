import {IPaginationProps} from './interfaces'
import {
  useCallback,
  useEffect,
  useState
}                         from 'react'
import {PAGINATION}       from '../../application/constants'

export const usePagination = ({perPage = 20, page = 1, numItems = 0} : Partial<IPaginationProps> = {}) => {

  const [state, setState] = useState<Partial<IPaginationProps>>({
    perPage,
    page,
    numItems
  })

  const [searchValue, setSearchValue] = useState('')

  useEffect(() => {
    const currentPage = (state?.page || 1)
    const maxPage = Math.ceil((state?.numItems || 0) / (state.perPage || 20)) || 1
    if (currentPage > maxPage) {
      setState({
        ...state,
        page: maxPage
      })
    }

    setState(prev => {
      const currentPage = (prev?.page || 1)
      const maxPage = Math.ceil((prev?.numItems || 0) / (prev.perPage || 20)) || 1
      return (currentPage > maxPage) ? {
        ...prev,
        page: maxPage
      } : prev
    })
  }, [setState,state])

  const handlerSearchChange = useCallback((value) => setSearchValue(value), [setSearchValue])

  const handlerEvent = useCallback((action : keyof typeof PAGINATION.EVENTS, data : string | number) => {
    const {PAGINATION_PAGE_CHANGED, PAGINATION_PAGE_CHANGE_PER_PAGE, PAGINATION_PAGE_MOVE_UP_DOWN} = PAGINATION.EVENTS

    switch (action) {
      case PAGINATION_PAGE_CHANGE_PER_PAGE:
        setState(prev => ({
          ...prev,
          perPage: +data || 25
        }))
        return

      case PAGINATION_PAGE_CHANGED:
        setState(prev => ({
          ...prev,
          page: +data || 1 as any
        }))
        return

      case PAGINATION_PAGE_MOVE_UP_DOWN:
        if (data === 'UP') {
          setState(prev => {
            const maxPage = Math.ceil((prev?.numItems || 0) / (prev.perPage || 20)) || 1
            return {
              ...prev,
              page: (prev?.page || 1) >= maxPage ? maxPage : (prev?.page || 1) + 1
            }
          })
        } else {
          setState(prev => ({
            ...prev,
            page: (prev?.page || 1) > 1 ? (prev?.page || 2) - 1 : 1
          }))
        }
    }
  }, [setState])

  const setBackendPaginationData = useCallback((page : number, numItems : number) => {
    setState(prev => ({
      ...prev,
      page,
      numItems
    }))
  }, [setState])

  return {
    data: state,
    handlerEvent,
    setBackendPaginationData,
    handlerSearchChange,
    searchValue
  }
}
