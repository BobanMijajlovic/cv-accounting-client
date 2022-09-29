import SearchInput                  from '../../../components/InputText/SearchInput'
import React, {
  useEffect,
  useState
}                                   from 'react'
import { IconProp }                 from '@fortawesome/fontawesome-svg-core'
import {
  TCustomer,
  TItem,
  TResponseArray,
  TUser
}                                   from '../../../graphql/type_logic/types'
import {
  KeyboardEventCodes,
  useExternalKeyboard
}                                   from '../../../components/hooks/useExternalKeybaord'
import _                            from 'lodash'
import { ATTRIBUTE_DATA_ACTION_ID } from '../../../components/hooks/useOptimizeEventClick'

type  SearchViewData = TResponseArray

type TModel = TCustomer | TItem | TUser

export interface IComponentRenderProps {
  model: TModel
  classNames?: string
  selected?: boolean
}

export interface ISearchViewProps {
  handlerSearch: (value: string)=> void
  leftButtonIcon?: IconProp
  /** button on the left side, event fire string for that that should be catched with useOptimizeEventClick */
  leftButtonEvent?: string
  helperText?: string
  label?: string
  /** data to render */
  data: SearchViewData
  /** Component that is used for render the result */
  RenderComponent: React.FunctionComponent<IComponentRenderProps>
  selectedId: number
  className?: string
}

const SearchView = ({handlerSearch, leftButtonEvent, RenderComponent, leftButtonIcon, helperText, label, data, selectedId, className}: ISearchViewProps) => {

  const [total, setTotal] = useState(0)

  const {count, items} = data || {count: 0, items: []}

  const {setRef, ref} = useExternalKeyboard((e: KeyboardEvent) => {
    switch (e.key) {
      case KeyboardEventCodes.ArrowDown: {
        if (count === 0) {
          return
        }
        e.preventDefault()
        const array = (refRender.current as any).querySelectorAll('[data-action-id]')
        if (array.length > 0) {
          array[0].click();
          (refRender.current as any).focus()
          setTimeout(() => {
            (refRender.current as any).scrollTop = 0
          }, 100)
        }
        break
      }
    }
  }, true, [KeyboardEventCodes.ArrowDown])

  const {setRef: setRefRender, ref: refRender} = useExternalKeyboard((e: KeyboardEvent) => {

    const moveScroll = (selection: Element) => {
      let bounds = selection.getBoundingClientRect()
      const boundsParent = (refRender.current as any).getBoundingClientRect()
      let top = bounds.top - boundsParent.top
      let num = 100
      while (top < 10 && num > 0) {
        num--
        let tops = (refRender.current as any).scrollTop
        tops -= 100
        if (tops < 0) {
          tops = 0
        }
        (refRender.current as any).scrollTop = tops
        if (tops === 0) {
          break
        }
        bounds = selection.getBoundingClientRect()
        top = bounds.top - boundsParent.top
      }

      let bottom = boundsParent.bottom - bounds.bottom
      num = 100
      while (bottom < 0 && num > 0) {
        num--
        let tops = (refRender.current as any).scrollTop
        tops += 100;
        (refRender.current as any).scrollTop = tops
        bounds = selection.getBoundingClientRect()
        bottom = boundsParent.bottom - bounds.bottom
      }

    }

    switch (e.key) {
      case KeyboardEventCodes.ArrowUp: {
        e.preventDefault()
        let array = (refRender.current as any).querySelectorAll(`[${ATTRIBUTE_DATA_ACTION_ID}]`)
        if (array && array.length > 0) {
          array = Array.from(array)
          let selectionIndex = array.findIndex((i: Element) => Number(i.getAttribute(ATTRIBUTE_DATA_ACTION_ID)) === Number(selectedId))
          if (selectionIndex > array.length - 1 || selectionIndex === -1) {
            selectionIndex = 2
          }
          selectionIndex--
          if (selectionIndex < 0) {
            selectionIndex = array.length - 1
          }
          const selection = array[selectionIndex]
          selection.click()
          moveScroll(selection)
        }
        break
      }

      case KeyboardEventCodes.ArrowDown: {
        e.preventDefault()
        let array = (refRender.current as any).querySelectorAll(`[${ATTRIBUTE_DATA_ACTION_ID}]`)
        if (array && array.length > 0) {
          array = Array.from(array)
          let selectionIndex = array.findIndex((i: Element) => Number(i.getAttribute(ATTRIBUTE_DATA_ACTION_ID)) === Number(selectedId))
          if (selectionIndex >= array.length - 1) {
            selectionIndex = -1
          }
          selectionIndex++
          const selection = array[selectionIndex]
          selection.click()
          moveScroll(selection)
        }
        break
      }

      case KeyboardEventCodes.Enter:
      case KeyboardEventCodes.Esc: {
        const inputs = (ref.current as any).getElementsByTagName('input')
        if (inputs && inputs.length > 0) {

          setImmediate(() => {
            inputs[0].focus()
            inputs[0].select()
          }, 1)

        }
        break
      }
    }
  }, true, [KeyboardEventCodes.ArrowUp, KeyboardEventCodes.ArrowDown, KeyboardEventCodes.Esc, KeyboardEventCodes.Enter])

  useEffect(() => {
    setTotal(total => (total < count) ? count : total)
  }, [count])

  return (
    <div className={'d-flex flex-column flex-fill border py-2 pl-2 letter-spacing h-100 relative '}>
      <div className={'d-flex flex-row align-content-stretch pb-1 '}>
        <div className={'d-flex px-2 flex-grow-1'} ref={setRef}>
          <SearchInput
            searchIcon={leftButtonIcon}
            handlerSearch={handlerSearch}
            label={label as string}
            fullWidth
            helperText={helperText}
            handlerInsert={leftButtonEvent}
          />
        </div>
      </div>
      <div className={'d-flex px-2 py-1 justify-content-between border-bottom mb-1 mr-2'}>
        <div className={'d-flex font-smaller-3'}>
          <div className={'font-smaller-5 mr-1 opacity-5'}>TOTAL:</div>
          <div>{total}</div>
        </div>

        <div className={'d-flex font-smaller-3'}>
          <div className={'font-smaller-5 mr-1 opacity-5'}># :</div>
          <div style={{minWidth: 35}}>{items.length}</div>
        </div>
      </div>
      <div className={`search-view-data-root-render${className ? ` ${className}` : ''}`} ref={setRefRender} tabIndex={_.random(1000, 1000000)}>
        <div className={'p-1 m-0 mx-0'}>
          {data.items.map((model: Partial<TModel>, index) => {
            return (
              <RenderComponent key={model.id ? model.id : index} model={model} selected={selectedId === Number(model.id)} classNames={index % 2 === 0 ? 'row-even' : 'row-odd'}/>
            )
          })}
        </div>
      </div>

    </div>
  )
}

SearchView.defaultProps = {
  label: ''
}

export default SearchView
