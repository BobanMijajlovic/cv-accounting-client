import React, {
  useEffect,
  useRef,
  useState
}                                   from 'react'
import {
  ITableHeaderCellProps,
  ITableHeaderProps
}                                   from './interfaces'
import ConditionalRendering         from '../Util/ConditionalRender'
import {TableHeaderCellRenderBasic} from './render/HeaderRender'

export interface ITableHeaderCellPropsInner {
  setSorting ?: (field : string, direction : 'ASC' | 'DESC') => void
  field : string | undefined,
  header : Partial<ITableHeaderCellProps>[]
}

interface ITableResizableState {
  active : boolean
}

export const EVENT_TYPE_TABLE_CUSTOM_EVENT = 'hwt-custom-table-event'
export const EVENT_TYPE_CHANGE_TABLE_HEADER_WIDTH = 'change-table-header-width'
export const EVENT_TYPE_CHANGE_TABLE_HEADER_REF = 'change-table-header-ref'

interface ITableHeaderResizableProps {
  resize : (x : number) => void,
  field : string
}

const TableHeaderResizable = ({resize, field} : ITableHeaderResizableProps) => {

  const refThread = useRef<any>()
  const refTh = useRef<HTMLElement>()
  const [state, setState] : [ITableResizableState, (r : ITableResizableState) => void] = useState({
    active: false,
  } as ITableResizableState)

  const mouseDownHandler = React.useCallback((e : React.MouseEvent<HTMLElement>) => {
    setState({
      active: true
    })
  }, [setState])

  const mouseUpHandler = React.useCallback(() => {
    setState({
      active: false
    })
  }, [setState])

  const mouseLeaveHandler = React.useCallback(() => {
    setState({
      active: false
    })
  }, [setState])

  const mouseMoveHandler = React.useCallback((e : React.MouseEvent<HTMLElement>) => {
    if (!state.active) {
      return
    }
    const rect = (refTh.current as any).getBoundingClientRect()
    const center = (+rect.right + +rect.left) / 2

    const diff = e.clientX - center
    if (diff === 0) {
      return
    }
    clearTimeout(refThread.current)
    if (diff > 3 || diff <= -3) {
      resize(diff)
      return
    }
    refThread.current = setTimeout(() => {
      resize(diff)
    }, 200)

  }, [resize, state])

  return (
    <div className={`hwt-cell-resizable-node d-flex justify-content-center${state.active ? ' active-resize' : ''}`}
             onMouseDown={mouseDownHandler}
             onMouseUp={mouseUpHandler}
             onMouseLeave={mouseLeaveHandler}
             onMouseMove={mouseMoveHandler}
             ref={(ele) => refTh.current = ele as any}
    >
      <div className={'hwt-cell-resizable-node-holder'}></div>

    </div>
  )
}

const TableHeaderResizableMemo = React.memo(TableHeaderResizable, (prevProps, nextProps) => {
  return true
})

const TableHeaderCell = (props : ITableHeaderCellPropsInner) => {

  const refTh = useRef<HTMLElement>()
  const [refState, setRefState] = useState(false)

  const {field, header} = props

  const isNotResizable = React.useMemo(() => {
    const data = header.find(x => x.field === field)
    return data ? data.notResize : false
  }, [field, header])

  const dispatchChangeWidth = React.useCallback((resize : number) => {
    const event = new CustomEvent(EVENT_TYPE_TABLE_CUSTOM_EVENT, {
      bubbles: true,
      cancelable: false,
      detail: {
        type: EVENT_TYPE_CHANGE_TABLE_HEADER_WIDTH,
        field,
        resize
      }
    });
    (refTh as any).current.dispatchEvent(event)

  }, [field, refTh])

  useEffect(() => {
    setRefState(true)
  }, [setRefState])

  useEffect(() => {
    if (!refState) {
      return
    }
    const event = new CustomEvent(EVENT_TYPE_TABLE_CUSTOM_EVENT, {
      bubbles: true,
      cancelable: false,
      detail: {
        type: EVENT_TYPE_CHANGE_TABLE_HEADER_REF,
        field,
        ref: refTh
      }
    });
    (refTh as any).current.dispatchEvent(event)
  }, [refState])

  return (
    <th className={'hw-table-header-th relative'} ref={(ele) => refTh.current = ele as any}>
      <TableHeaderCellRenderBasic  {...props} />
      {!isNotResizable && <TableHeaderResizableMemo resize={dispatchChangeWidth} field={field as string}/>}
    </th>
  )
}

const TableHeader = ({
  onClick,
  header,
  notShowHeader,
  setSorting,
} : ITableHeaderProps) => {

  return (
    <thead className={'hw-table-header-root'} onClick={onClick}>
      <tr className={'hw-table-header-tr'}>
        {
          header.map((elem, index : number) => {
            if (notShowHeader) {
              return <th key={index}></th>
            }

            return (
              <ConditionalRendering condition={!elem.notVisible} key={index}>
                <TableHeaderCell key={index} field={elem.field} setSorting={setSorting}
                                             header={header}/>
              </ConditionalRendering>
            )
          })
        }
      </tr>
    </thead>
  )
}

TableHeader.defaultProps = {
  tableComponentState: {}
}

export default TableHeader
