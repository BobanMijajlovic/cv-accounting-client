import React, {
  useEffect,
  useRef,
  useState
}                                        from 'react'
import TableHeader, {
  EVENT_TYPE_CHANGE_TABLE_HEADER_REF,
  EVENT_TYPE_CHANGE_TABLE_HEADER_WIDTH,
  EVENT_TYPE_TABLE_CUSTOM_EVENT
}                                        from './TableHeader'
import TableDataRow, {
  TableDataRowEmpty,
  TableDataRowSummarize
}                                        from './TableDataRow'
import _                                 from 'lodash'
import {
  ICellTableCurrentEdit,
  ITableHeaderCellProps,
  ITableProps
}                                        from './interfaces'
import { useTableSettings }              from '../hooks/useTableSettings'
import {
  IUseOptimizeEventData,
  useOptimizeEventClick
}                                        from '../hooks/useOptimizeEventClick'
import { EVENT_TYPE_CHANGE_MODEL_FIELD } from './editors/InputTextEditor'
import Pagination                        from '../Pagination/Pagination'
import {
  KeyboardEventCodes,
  useExternalKeyboard
}                                        from '../hooks/useExternalKeybaord'
import ConditionalRendering              from '../Util/ConditionalRender'

const _getDataRowObject = (data: object, index: number, header: ITableHeaderCellProps[], notShowHeader?: boolean, currentCellEdit?: ICellTableCurrentEdit) => {
  return {
    index,
    model: data,
    header,
    currentCellEdit,
    notShowHeader
  }
}

export const ACTION_CLICK_SET_HIDE_COLUMN = 'hide-column-4873847923432432'
export const ACTION_CLICK_SET_SHOW_COLUMN = 'show-column-4847389274432432'

export const ATTRIBUTE_FOCUS_TABLE_HOLDER = 'table-focus-data-element'

const Table = ({
  modelFields: _modelFields = [],
  tableName,
  setSorting,
  header,
  data,
  handlerEventModelFieldChanged,
  handlerEventDataClick,
  handlerEventPagination,
  handlerEventSettingsChanged,
  notShowHeader,
  separator,
  paginationData,
  scrollable,
  additionalData,
  summarize,
  selectedRowIndex
}: ITableProps) => {

  const [tableStyle, setTableStyle] = useState({} as any)
  const refTableBody = useRef(null)
  const refTable = useRef(null)
  const __handlerEventModelFieldChanged = useRef(handlerEventModelFieldChanged)

  const [currentEdit, setCurrentEdit]: [ICellTableCurrentEdit, (r: ICellTableCurrentEdit)=> void] = useState({
    row: '',
    column: '',
    field: '',
  } as ICellTableCurrentEdit)

  const settingsDefault = React.useMemo(() => header.map(x => ({ field: x.field || '' })), [header])
  const { tableSettingsState, changeVisibility, changeWidth, setRef } = useTableSettings(tableName, settingsDefault)

  useEffect(() => {
    handlerEventSettingsChanged && handlerEventSettingsChanged(tableSettingsState)
  }, [tableSettingsState, handlerEventSettingsChanged])

  const _handlerEventModelFieldChanged = React.useCallback((details: any) => {
    handlerEventModelFieldChanged && handlerEventModelFieldChanged(details)
  }, [handlerEventModelFieldChanged])

  useEffect(() => {
    if (!refTable.current) {
      return
    }
    const fn = (e: any) => {
      if (!e.detail) {
        return
      }

      if (e.detail.type === EVENT_TYPE_CHANGE_TABLE_HEADER_WIDTH) {
        changeWidth(e.detail.field, +(e.detail.resize))
        return
      }

      if (e.detail.type === EVENT_TYPE_CHANGE_TABLE_HEADER_REF) {
        setRef(e.detail.field, e.detail.ref)
        return
      }

      if (e.detail.type === EVENT_TYPE_CHANGE_MODEL_FIELD) {
        if (!e.detail.model || !e.detail.value || !e.detail.field) {
          return
        }
        setCurrentEdit({
          row: '',
          column: '',
          field: ''
        })
        _handlerEventModelFieldChanged(e.detail)
        return
      }

    }
    (refTable as any).current.removeEventListener(EVENT_TYPE_TABLE_CUSTOM_EVENT, fn);
    (refTable as any).current.addEventListener(EVENT_TYPE_TABLE_CUSTOM_EVENT, fn)
    return () => {
      (refTable as any).current.removeEventListener(EVENT_TYPE_TABLE_CUSTOM_EVENT, fn)
    }
  }, [_handlerEventModelFieldChanged, changeWidth, setRef, setCurrentEdit])

  const { onClickHandler: onClickHandlerData } = useOptimizeEventClick({
    eventHandler (data: IUseOptimizeEventData) {
      handlerEventDataClick && handlerEventDataClick(data.event, data.id, data.subAction || data.action, data.param)
      if (data.action === 'table-cell-edit') {
        setCurrentEdit({
          row: data.row as string,
          column: data.column as string,
          field: data.param as string
        })
      }
    }
  })

  const { onClickHandler: onClickHandlerHeader } = useOptimizeEventClick({
    eventHandler (data: IUseOptimizeEventData) {
      switch (data.action) {
        case ACTION_CLICK_SET_SHOW_COLUMN:
        case ACTION_CLICK_SET_HIDE_COLUMN:
          changeVisibility(data.id || '', data.action === ACTION_CLICK_SET_SHOW_COLUMN)
          return
      }
    }
  })

  const _header = React.useMemo(() => {
    return header.map(x => {
      const obj = tableSettingsState.find(t => x.field === t.field)
      return obj ? {
        ...x,
        ...obj
      } : { ...x }
    })
  }, [tableSettingsState, header])

  const modelFields = [..._header.map(x => x.field || ''), ..._modelFields]
  const tableData = React.useMemo(() => {
    return !data ? [] : data.map(x => _.pick(x, [...modelFields, ...['id']]))
  }, [data, modelFields])

  const tableRootClass = React.useMemo(() => {
    const array = ['hw-table-root']
    if (separator) {
      switch (separator) {
        case 'vertical':
        case 'horizontal':
        case 'cell':
          array.push(`hw-tbl-separator-${separator}`)
      }
    }
    return array.join(' ')
  }, [separator])

  useEffect(() => {
    if (!scrollable) {
      return
    }
    if (refTable && refTable.current) {
      const divRoot = (refTable.current as any).parentElement
      if (!divRoot) {
        return
      }
      const dataDiv = document.getElementsByClassName('hw-app-layout-main-root')[0]
      if (dataDiv) {
        const maxHeight = (dataDiv).getBoundingClientRect().height - ((divRoot).getBoundingClientRect().top) - 10
        setTableStyle({
          minHeight: maxHeight,
          maxHeight: maxHeight
        })
      }

    }
  }, [refTable, data, scrollable, setTableStyle])

  const modelSummarize = React.useMemo(() => {
    if (!summarize?.fields || !tableData || tableData.length < 2) {
      return null
    }
    const data = summarize.fields.reduce((acc: any, field: string) => {
      const value = tableData.reduce((a, n) => {
        return _.add(a, Number(_.get(n, field, 0)))
      }, 0)

      return {
        ...acc,
        [field]: value
      }
    }, {})
    let span = 1
    const header = _header.map(m => {
      if (m.notVisible) {
        return m
      }
      const toShow = !!summarize.fields.find(s => s === m.field)
      if (!toShow) {
        span++
        return {
          ...m,
          notVisible: true
        }
      }
      const obj = {
        ...m,
        colSpan: span > 1 ? span : undefined
      }
      span = 1
      return obj
    })
    return {
      model: data,
      header
    }
  }, [tableData, summarize, _header])

  const refRoot = useRef()

  const [positionSelect, setPositionSelect] = useState(-1)

  const onFocusListHandler = React.useCallback(() => {
    setPositionSelect(0)
  }, [setPositionSelect])

  const onBlurHandler = React.useCallback(() => {
    setPositionSelect(-1)
  }, [setPositionSelect])

  const { setRef: setRefExtKey } = useExternalKeyboard((e) => {
    switch (e.key) {
      case KeyboardEventCodes.Enter:
        (() => {
          if (positionSelect < 0 || positionSelect >= tableData.length) {
            return
          }
          const data = (tableData?.[positionSelect]) && (tableData[positionSelect] as any).id
          handlerEventDataClick && handlerEventDataClick({} as any, data, 'table-row-selected')
          return
        })()
        return
      case KeyboardEventCodes.ArrowDown:
        (() => {
          const nextSelect = positionSelect + 1
          if (nextSelect < tableData.length) {
            setPositionSelect(nextSelect)
            return
          }
        })()
        return
      case KeyboardEventCodes.ArrowUp:
        if (positionSelect < 1) {
          return
        }
        setPositionSelect(positionSelect - 1)
        return
    }
  }, true, [KeyboardEventCodes.ArrowDown, KeyboardEventCodes.ArrowUp, KeyboardEventCodes.Enter])


  return (
    <div
      className={'hw-table-root-ancestor relative'}
      style={{
        outline: 'none'
      }}
      ref={(e) => {
        ((refRoot as any).current = e as any)
        setRefExtKey(e)
      }}
      onFocus={onFocusListHandler}
      onBlur={onBlurHandler}
      tabIndex={-1}
    >
      {paginationData && <Pagination searchInput={paginationData.inputSearch} numItems={paginationData.totalItems} page={paginationData.page} perPage={paginationData.perPage} actionEvent={handlerEventPagination}/>}
      <div style={scrollable && tableStyle} className={`${scrollable ? 'hw-table-scrollable' : ''}`}>
        <table className={tableRootClass} data-action-root ref={refTable}>
          <TableHeader
            onClick={onClickHandlerHeader as any}
            notShowHeader={notShowHeader}
            header={_header}
            setSorting={setSorting}
          />
          <tbody data-action-root onClick={onClickHandlerData} ref={refTableBody}>
            <ConditionalRendering condition={tableData.length === 0}>
              <TableDataRowEmpty index={0} header={_header}/>
            </ConditionalRendering>
            {
              tableData.length !== 0 && tableData.map((x: object, index: number) => {
                const opt = _getDataRowObject(x, index, _header, notShowHeader, currentEdit)
                return (<TableDataRow key={index}  {...opt} additionalData={additionalData} selected={positionSelect} editableRow={selectedRowIndex}/>)
              })
            }
            {modelSummarize && <TableDataRowSummarize additionalData={additionalData} key={tableData.length} header={modelSummarize.header} model={modelSummarize.model} index={tableData.length}/>}
          </tbody>
        </table>
      </div>
    </div>
  )
}
Table.defaultProps = {
  additionalData: void(0)
}
export default Table

export interface IUseTableStateSorting {
  field?: string
  direction: 'ASC' | 'DESC'
}

export interface IUseTableComponentState {
  sorting: IUseTableStateSorting
}

