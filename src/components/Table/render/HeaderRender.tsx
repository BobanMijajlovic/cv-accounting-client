import {FontAwesomeIcon}            from '@fortawesome/react-fontawesome'
import {
  faAlignJustify,
  faCheck,
  faPencilAlt,
  faSortAmountDownAlt,
  faSortAmountUp,
  faTimes
} from '@fortawesome/free-solid-svg-icons'
import React                        from 'react'
import {ITableHeaderCellPropsInner} from '../TableHeader'
import {ITableHeaderCellProps}      from '../interfaces'
import ConditionalRendering         from '../../Util/ConditionalRender'
import {
  ACTION_CLICK_SET_HIDE_COLUMN,
  ACTION_CLICK_SET_SHOW_COLUMN
}                                   from '../Table'
import {useActiveBackground}        from '../../../store/active-background/useActiveBackground'

interface ITableHeaderCellRenderInner {
  setSorting ?: (field : string, direction : 'ASC' | 'DESC') => void
  field : string,
  cell : Partial<ITableHeaderCellProps>
}

const _TableHeaderCellRenderInner = ({
  setSorting,
  field,
  cell
} : ITableHeaderCellRenderInner) => {

  const {label, sortable, sorted, labelAlign} = cell
  const isEditable = React.useMemo(() => cell && cell.cell && (cell.cell as any).editor, [cell])
  // console.log(field,isEditable,cell.cell)
  return (
    <>
      {isEditable && <FontAwesomeIcon className={'absolute-left-center opacity-4 font-smaller-5'} icon={faPencilAlt}/>}
      <small style={{textAlign: labelAlign}} className={'font-bold font-size'}>{label}</small>
      {sortable ?
        <div
                    className={`hw-table-header-th-basic-sort${sorted ? ' hw-table-header-th-basic-sorted' : ''}`}
                    onClick={setSorting ? () => setSorting(field!, sorted === 'DESC' ? 'ASC' : 'DESC') : void(0)}
        >
          <div className={'icon-shadow'}>
            {!sorted || sorted === 'DESC' ?
              <FontAwesomeIcon icon={faSortAmountUp}/> : <></>}
          </div>
          <div className={'icon-shadow'}>
            {!sorted || sorted === 'ASC' ?
              <FontAwesomeIcon icon={faSortAmountDownAlt}/> : <></>}
          </div>
        </div> : <></>}
    </>
  )
}

const TableHeaderCellRenderInner = React.memo(_TableHeaderCellRenderInner, (prevProps, nextProps) => {
  return prevProps.field === nextProps.field &&
        prevProps.cell.label === nextProps.cell.label &&
        prevProps.cell.labelAlign === nextProps.cell.labelAlign &&
        prevProps.cell.sorted === nextProps.cell.sorted &&
        prevProps.cell.sortable === nextProps.cell.sortable

})

export const TableHeaderCellRenderBasic = ({
  field,
  setSorting,
  header
} : ITableHeaderCellPropsInner) => {

  const columnProps = React.useMemo(() => {
    return header.find(x => x.field === field)
  }, [field, header])

  if (!columnProps) {
    return <>No</>
  }

  const {render: Render, renderProps} = columnProps as ITableHeaderCellProps

  return (
    <div className={'hw-table-header-th-basic'}>
      {
        Render ? (
          <Render {...renderProps} field={field} header={header}/>
        ) :
          <TableHeaderCellRenderInner
                        field={field as string}
                        setSorting={setSorting}
                        cell={columnProps}
          />
      }
    </div>
  )
}

TableHeaderCellRenderBasic.defaultProps = {
  labelAlign: 'center'
}

export interface ITableHeaderRenderCell {
  header : ITableHeaderCellProps[]
  field ?: string
}

interface IOptionOneColumn {
  notVisible : boolean,
  field : string,
  label : string
}

export interface ITableHeaderRenderManageColumns {
  options : IOptionOneColumn[]
  label ?: string
  position ?: 'left' | 'right'
}

const _TableHeaderRenderManageColumnsInner = ({options, label, position = 'right'} : ITableHeaderRenderManageColumns) => {

  const {openCloseActiveBackground, isOpen, style} = useActiveBackground()

  const [classesForButton, classesForData] = React.useMemo(() => {
    const button = position === 'left' ? 'absolute-left-center cursor-pointer ml-1' : 'absolute-right-center cursor-pointer mr-1'
    const data = position === 'left' ? 'absolute-left-center ml-1' : 'absolute-right-center mr-1'
    return [button, data]
  }, [position])

  return (
    <div className={'relative  w-100 he-table'} style={{minWidth: '25px'}}>
      {label ? <small className={'font-bold'}>{label}</small> : <span>&nbsp;</span>}
      <span className={classesForButton} onClick={() => openCloseActiveBackground(!isOpen)}
                  mouse-click-controlled-area={'table-choose-visibility-columns'}>
        <FontAwesomeIcon icon={faAlignJustify} data-action={'edit'}/>
      </span>

      <ConditionalRendering condition={isOpen}>
        <div
                    className={`${classesForData} box-shadow-opened gradient-white-normal text-shadow-white no-wrap`}
                    mouse-click-controlled-area={'table-choose-visibility-columns'}
                    style={style}
        >
          {
            options.map((x, index) => {
              return (
                <div key={index}
                                     data-action-id={x.field}
                                     data-action={x.notVisible ? ACTION_CLICK_SET_SHOW_COLUMN : ACTION_CLICK_SET_HIDE_COLUMN}
                                     className={`z-index-1000 border-bottom d-flex justify-content-between gradient-white-normal cursor-pointer px-2 pt-1 align-items-center${x.notVisible ? ' opacity-5' : ''}`}>
                  <div className={'pr-2 font-smaller-4 pt-1'}>
                    {x.notVisible ?
                      <FontAwesomeIcon icon={faTimes}/> :
                      <FontAwesomeIcon icon={faCheck}/>
                    }
                  </div>
                  <div>&nbsp;</div>
                  <div className={'font-smaller-5'}>{x.label}</div>
                </div>
              )
            })
          }
        </div>
      </ConditionalRendering>
    </div>
  )
}

const TableHeaderRenderManageColumnsInner = React.memo(_TableHeaderRenderManageColumnsInner, (prevProps, nextProps) => {
  if (prevProps.options.length !== nextProps.options.length) {
    return false
  }
  if (prevProps.position !== nextProps.position) {
    return false
  }

  if (prevProps.label !== nextProps.label) {
    return false
  }

  return prevProps.options.every((p, index) => {
    const n = nextProps.options[index]
    return n.notVisible === p.notVisible && n.field === p.field
  })
})

export const TableHeaderRenderManageColumns = (props : ITableHeaderRenderCell) => {
  const {header, field, ...rest} = props
  const options = React.useMemo(() => {
    return header.filter(x => !x.notHide).map(x => ({
      notVisible: !!x.notVisible,
      field: x.field,
      label: (x.label || x.field || '').substring(0, 20)
    }))
  }, [header])

  const label = React.useMemo(() => {
    const f = header.find(f => f.field === field)
    return f && f.label
  }, [header, field])

  return (
    <TableHeaderRenderManageColumnsInner {...rest} options={options} label={label}/>
  )

}
