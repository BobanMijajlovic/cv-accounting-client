import React          from 'react'
import { PAGINATION } from '../../application/constants'

export interface ITableCellEditor {
  render: any
  renderProps?: any
  classes?: string[]
}

export interface ITableCellFeatures {
  format?(value: (number | string), index: (number | string), model: any, field: string): any

  editor?: ITableCellEditor
  render?: React.ComponentType<any>
  renderProps?: any
  style?: any
  classes?: string[]
}

export interface ITableHeaderCellProps {
  label?: string,
  field: string
  cell?: ITableCellFeatures
  sorted?: 'ASC' | 'DESC'
  sortable?: boolean,
  setSorting?: (field: string, direction: 'ASC' | 'DESC')=> void
  notVisible?: boolean
  width?: number | string
  notHide?: boolean
  notResize?: boolean
  style?: any
  colSpan?: number
  labelAlign?: 'center' | 'left' | 'right'
  render?: React.ComponentType<any>
  renderProps?: any
}

export interface ICellTableCurrentEdit {
  column: string,
  row: string,
  field: string
}

export interface ITableDataCellProps {
  index: number,
  row: number,
  column: number,
  field: string,
  model: any,
  value: string
  additionalData?: any
  currentCellEdit?: ICellTableCurrentEdit
  cell?: ITableCellFeatures,
  colSpan?: number
}

export interface ITableHeaderProps {
  onClick: (e: React.MouseEvent<HTMLTableSectionElement>)=> void
  header: Partial<ITableHeaderCellProps>[]
  notShowHeader?: boolean
  style?: any
  setSorting?: (field: string, direction: 'ASC' | 'DESC')=> void
}

export interface ITableDataRowProps {
  model: any
  index: number
  additionalData: any
  notShowHeader?: boolean
  currentCellEdit?: ICellTableCurrentEdit
  header: ITableHeaderCellProps[],
  selected?: number /**  position */
  editableRow ?: number
}

export interface ITableModelCellChanged {
  type?: string
  model: any,
  field: string,
  value: string
}

export interface ITableRowSettings {
  field: string
  notVisible?: boolean
  width?: number | string
}

export interface ITableSearchInputOptions {
  label?: string
  handlerOnChange: (value: string)=> void
}

export interface IPaginationTableData {
  /** current page of pagination ( active ) */
  perPage: number,
  page: number
  /** total items per page */
  totalItems: number
  inputSearch?: ITableSearchInputOptions
}

export interface ISummarizeRow {
  fields: string[]
}

export interface ITableProps {
  /** table holds only fields that are in array for header, if need to keep more then fields must be listed here */
  modelFields?: string[]
  tableName: string
  settings?: ITableRowSettings[],
  notShowHeader?: boolean
  separator?: 'vertical' | 'horizontal' | 'cell'
  header: ITableHeaderCellProps[]
  data: Array<object>
  setSorting?: (field: string, direction: 'ASC' | 'DESC')=> void,
  handlerEventSettingsChanged?: (settings: any)=> void,
  handlerEventModelFieldChanged?: (data: ITableModelCellChanged)=> void,
  handlerEventDataClick?: (event: React.MouseEvent<HTMLTableSectionElement>, id?: string, action?: string, param?: string)=> void
  handlerEventPagination?: (action: keyof typeof PAGINATION.EVENTS, data: string | number)=> void
  paginationData?: IPaginationTableData
  scrollable?: boolean,
  additionalData?: any,
  summarize?: ISummarizeRow
  selectedRowIndex ?: number
}

