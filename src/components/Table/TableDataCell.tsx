import React from 'react'
import {
  ITableCellFeatures,
  ITableDataCellProps
}            from './interfaces'

import {
  isNumber,
  isString
} from 'lodash'

interface ITableRenderFormatCellProps {
  render ?: React.ComponentType<any>
  renderProps ?: any,
  additionalData ?: any,
  field : string,
  index : number,
  value : any,
  model : any,

  format?(value : (number | string), index : (number | string), model : any, field : string) : any
}

const _checkValueSame = (prevProps : any, nextProps : any) => {
  if (isString(nextProps.value) || isNumber(nextProps.value)) {
    return nextProps.value === prevProps.value
  }
  return false
}

const _TableRenderFormatCell = ({render: Render, renderProps, index, field, value, model, format, additionalData} : ITableRenderFormatCellProps) => {

  if (Render) {
    return <Render {...renderProps} value={value} index={index} model={model} field={field} additionalData={additionalData}/>
  }
  return <>{format ? format(value, index, model, field) : value}</>
}

const TableRenderFormatCell = React.memo(_TableRenderFormatCell, (prevProps, nextProps) => {

  if (nextProps.render) {
    return false
  }

  if (nextProps.format) {
    if (!prevProps.format) {
      return false
    }
    return (nextProps.format(nextProps.value, nextProps.index, nextProps.model, nextProps.field) === prevProps.format(prevProps.value, prevProps.index, prevProps.model, prevProps.field))
  }

  if (prevProps.additionalData !== nextProps.additionalData) {
    return false 
  }

  if (_checkValueSame(prevProps, nextProps)) {
    return true
  }
  return false
})

const TableDataCell = ({value, cell, model, field, index, column, currentCellEdit, colSpan, additionalData} : ITableDataCellProps) => {

  const {style: innerStyle, render, renderProps, editor} = cell as ITableCellFeatures
  const {classes, format} = cell!

  const classRoot = React.useMemo(() => {
    if (!classes) {
      return 'hw-table-data-cell relative'
    }
    return ['hw-table-data-cell relative ', ...classes].join(' ')
  }, [classes])

  const Editor = React.useMemo(() => {
    if (!currentCellEdit || !editor || !editor.render || +currentCellEdit.column !== +column || +currentCellEdit.row !== +index || currentCellEdit.field !== field) {
      return undefined
    }
    return editor.render
  }, [currentCellEdit, field, index, column, editor])

  return (
    <td className={classRoot}
            style={innerStyle}
            data-action={'table-cell-edit'}
            data-action-param={field}
            table-param-column={column}
            colSpan={colSpan}
    >
      {Editor ? <div className={'absolute-left-down w-100'}>
        <Editor value={value} field={field} model={model}/>
      </div> : <></>}
      <TableRenderFormatCell
                field={field}
                model={model}
                value={value}
                additionalData={additionalData}
                renderProps={renderProps}
                render={render}
                index={index}
                format={format}
      />
    </td>
  )
}

TableDataCell.defaultProps = {
  cell: {}
}

export default TableDataCell

