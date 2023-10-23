import React                            from 'react'
import _                                from 'lodash'
import TableDataCell                    from './TableDataCell'
import {
  ICellTableCurrentEdit,
  ITableCellFeatures,
  ITableDataCellProps,
  ITableDataRowProps,
  ITableHeaderCellProps
}                                       from './interfaces'
import { TABLE_INDEX_SUMMARIZE_COLUMN } from './index'

const _getDataCellObject = (additionalData: any, model: any, index: number, column: number, headerRow: ITableHeaderCellProps, currentCellEdit?: ICellTableCurrentEdit): ITableDataCellProps => {
  const value = _.get(model, headerRow.field || '')
  return {
    index,
    column: column,
    row: index,
    field: headerRow.field || '',
    colSpan: headerRow.colSpan,
    model,
    value,
    additionalData,
    currentCellEdit,
    cell: headerRow.cell || ({} as ITableCellFeatures)
  }
}

const TableDataRow = ({ additionalData, model, currentCellEdit, header, index, selected, editableRow }: ITableDataRowProps) => {
  return (
    <tr className={`hw-table-data-row ${(index) === selected ? 'selected' : ''}${editableRow === Number(index) ? ' editable-row' : ''}`}
        data-action-id={model.id ? model.id : model.position}
        table-param-row={index}>
      {
        header.map((h, row: number) => {
          if (h.notVisible) {
            return null
          }
          const props = _getDataCellObject(additionalData, model, index, row, h, currentCellEdit)
          return <TableDataCell key={row} {...props} />
        })
      }
    </tr>
  )
}
export default TableDataRow

export const TableDataRowEmpty = ({ index, header }: { index: number, header: ITableHeaderCellProps[] }) => {
  return (
    <tr className={'hw-table-data-row'}
        table-param-row={index}>
      <td className={'hw-table-data-cell relative font-smaller-2 row-even opacity-8'}
          data-action={'table-cell-edit'}
          colSpan={header.length}
      >
        Nothing to show
      </td>
    </tr>
  )
}

export const TableDataRowSummarize = ({ model, header, additionalData }: ITableDataRowProps) => {

  return (
    <tr className={'hw-table-data-row'}
        data-action-id={TABLE_INDEX_SUMMARIZE_COLUMN}
    >
      {
        header.map((h, row: number) => {
          if (h.notVisible) {
            return null
          }
          const props = _getDataCellObject(additionalData, model, TABLE_INDEX_SUMMARIZE_COLUMN, row, h)
          const cellProps = {
            ...props.cell,
            classes: [..._.get(props, 'cell.classes', []), 'font-weight-600']
          }
          return <TableDataCell key={row} {...props} cell={cellProps as any}/>
        })
      }
    </tr>
  )
}
