import {PAGINATION} from '../../application/constants'

export interface IPaginationSearch {
  label ?: string
  handlerOnChange : (value : string) => void
}

export interface IPaginationProps {
  page ?: number,
  perPage ?: number,
  numItems ?: number,
  buttonsToShow ?: number
  sortValue ?: string,
  optionsPerPage ?: number[]
  sortDirection ?: 'ASC' | 'DESC',
  searchInput ?: IPaginationSearch
  actionEvent ?: (action : keyof typeof PAGINATION.EVENTS, data : string | number) => void
}

export interface IPaginationButton {
  text ?: string | number
  value ?: string | number
  isActive : boolean
}

export interface IPaginationList extends IPaginationProps {
  onChangeHandler : (page : string) => void,
  onChangePerPageHandler : (page : string) => void,
  onChangeSortHandler : () => void,
  currentPage : number,
  numberItems : number,
  perPage : number
  perPageArray : string[]
}

export interface IPaginationButtonMove {
  direction : 'UP' | 'DOWN'
  isDisabled ?: boolean
}

export interface IPaginationPerPage {
  current : number;
  values : number[]
}
