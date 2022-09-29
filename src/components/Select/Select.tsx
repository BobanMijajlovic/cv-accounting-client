import React, {
  PropsWithoutRef,
  SelectHTMLAttributes,
  useEffect,
  useMemo,
  useRef,
  useState
} from 'react'
import { IconProp }            from '@fortawesome/fontawesome-svg-core'
import Label                   from '../basic/Label'
import { FontAwesomeIcon }     from '@fortawesome/react-fontawesome'
import {
  faCaretDown,
  faCheck
}                              from '@fortawesome/free-solid-svg-icons'
import HelperText              from '../basic/HelperText'
import {
  KeyboardEventCodes,
  useExternalKeyboard
}                              from '../hooks/useExternalKeybaord'
import { useActiveBackground } from '../../store/active-background/useActiveBackground'
import { add as _add } from 'lodash'

export interface ISelectChooseOptions {
  label : string
  value ?: string
  description ?: string
  icon ?: IconProp
}

export interface ISelectProps extends PropsWithoutRef<SelectHTMLAttributes<HTMLSelectElement>> {
  error ?: string | boolean
  isLabel ?: boolean
  isHelperText ?: boolean
  label ?: string
  helperText ?: string
  inputRef ?: React.Ref<HTMLElement>
  options : ISelectChooseOptions[] | string[]
  lined ?: boolean
}

const SelectOption = ({selection, positionSelected, selected, label = '', value, description, icon, placeholder} : Partial<ISelectChooseOptions> & { positionSelected ?: boolean, selection ?: boolean, selected ?: any, placeholder ?: string }) => {

  const rootClass = React.useMemo(() => {
    return `hw-select-option ${selection ? 'main-selection' : ''}${positionSelected ? ' hovered' : ''}`
  }, [selection, positionSelected])

  return (
    <div hw-comp-select-option-value={value} className={rootClass}>
      <div className={'hw-select-icon'}>
        <div>{icon ? <FontAwesomeIcon icon={icon}/> : null}</div>
      </div>
      {!selection && (selected === value) ?
        <div className={'hw-select-icon right'}>
          <FontAwesomeIcon icon={faCheck}/>
        </div> : null}

      {selection ?
        <div className={'hw-select-icon main-icon-arrow'}>
          <FontAwesomeIcon icon={faCaretDown}/>
        </div> : null}

      <div className={'hw-select-data'}>
        <div className={`hw-select-label${description ? ' hw-select-desc' : ''}${(label === void(0) && placeholder) ? ' hw-select-placeholder' : ''}`}>{label ? label : placeholder}</div>
        {description ? <div className={'hw-select-description'}>{description}</div> : null}
      </div>
    </div>
  )
}

enum SELECT_STATE {
  CLOSE,
  CREATE,
  SHOW
}

interface ISelectStateOpen {
  visible : SELECT_STATE
  top : number
  left ?: number,
  height ?: number,
  x ?: number,
  y ?: number
}

interface ISelectDropDownProps {
  value ?: string | string[] | number,
  options : ISelectChooseOptions[],
  onChange ?: (e : React.ChangeEvent<HTMLSelectElement>) => void,
  stateOpen : ISelectStateOpen,
  setOpened : (r : ISelectStateOpen) => void,
  positionSelect : number
}

const SelectDropDown = ({value, positionSelect, options, onChange, stateOpen, setOpened} : ISelectDropDownProps) => {

  const myId = useRef()

  useEffect(() => {
    if (stateOpen.visible === SELECT_STATE.CREATE) {
      const windowLast = window.innerHeight - 10
      const myRealPos = (myId.current as any).getBoundingClientRect().bottom - 20000
      const moveUp = () => {
        const move = windowLast < myRealPos ? (myRealPos - windowLast) : 0
        return (move < 5) ? 0 : (move < 40 ? 40 : move)
      }
      setOpened({
        ...stateOpen,
        ...{
          visible: SELECT_STATE.SHOW,
          top: stateOpen.top - moveUp()
        }
      })
      return
    }
  })
  
  useEffect(() => {
    if (myId) {
      const div = (myId.current as any).children[positionSelect ? positionSelect : -1]
      if (div) {
        const optionHeight = div.getBoundingClientRect().height
        const maxHeight = (myId.current as any).getBoundingClientRect().height - optionHeight
        const height = (positionSelect * optionHeight)
        const newHeight = height > maxHeight ? height - maxHeight + 40 : 0;
        (myId.current as any).scrollTop = 0;
        (myId.current as any).scrollTop = newHeight
      }
    }
  },[positionSelect, myId])

  const onClickHandler = React.useCallback((e : React.MouseEvent<HTMLElement>) => {
    let target = e.target as any
    while (target) {
      if (target.tagName.toUpperCase() === 'DIV' && target.hasAttribute('hw-comp-select-option-value')) {
        onChange && onChange({
          persist: () => { /** */
          },
          target: {
            value: target.getAttribute('hw-comp-select-option-value')
          }
        } as React.ChangeEvent<HTMLSelectElement>)
        break
      }
      target = target.parentElement
    }
  }, [onChange])

  const style = {
    top: `${stateOpen.visible === SELECT_STATE.CREATE ? (20000 + stateOpen.top) : stateOpen.top}px`,
    left: `${stateOpen.left}px`,
    maxHeight: `${stateOpen.height}px`
  }
  
  return (
    <div ref={(ele) => myId.current = ele as any}
             className={`hw-select-choose-section pb-1 ${stateOpen.visible === SELECT_STATE.SHOW ? 'select-show' : ''}`}
             onClick={onClickHandler} style={style}>
      {
        options.map((option, index) => <SelectOption {...option} key={index} selected={value} positionSelected={positionSelect === index}/>)
      }
    </div>
  )
}

const Select = ({className, isLabel = true, isHelperText = true, lined, inputRef: refButton, onBlur, label = '', error, required, options, value, placeholder, onChange, helperText, style} : ISelectProps) => {

  const {openCloseActiveBackground, isOpen, style: styleActiveBackground} = useActiveBackground()

  const [opened, setOpened] : [ISelectStateOpen, (r : ISelectStateOpen) => void] = useState({
    visible: SELECT_STATE.CLOSE,
    top: 0,
    left: 0
  } as ISelectStateOpen)

  const refRoot = useRef()
  const [focused, setFocused] = useState(false)
  const [positionSelect, setPositionSelect] = useState(-1)

  useEffect(() => {
    if (!isOpen) {
            // @ts-ignore
      setOpened((prev : ISelectStateOpen) => {
        return prev.visible === SELECT_STATE.CLOSE ? prev : {
          ...prev,
          visible: SELECT_STATE.CLOSE,
        }
      })
    }
  }, [isOpen, setOpened])

  useEffect(() => {
    if (opened.visible === SELECT_STATE.CLOSE || opened.visible === SELECT_STATE.CREATE) {
      openCloseActiveBackground(false)
    } else {
      openCloseActiveBackground(true)
    }
  }, [openCloseActiveBackground, opened])

  useEffect(() => {
    opened.visible === SELECT_STATE.CLOSE && positionSelect !== -1 && setPositionSelect(-1)
  }, [opened, positionSelect, setPositionSelect])

  const openSelectList = React.useCallback(() => {
    const targetDataOuter = ((refRoot as any).current as any).getBoundingClientRect()
    let targetDataInner = ((refRoot as any).current as any).getElementsByClassName('hw-select-option')[0]
    if (!targetDataInner) {
      return
    }
    targetDataInner = targetDataInner.getBoundingClientRect()
    setOpened({
      visible: opened.visible === SELECT_STATE.CLOSE ? SELECT_STATE.CREATE : SELECT_STATE.CLOSE,
      top: (targetDataInner.bottom - targetDataOuter.top) + 4,
      left: (targetDataInner.left - targetDataOuter.left),
      height: Math.floor((window.innerHeight - targetDataInner.top) * 0.86 ), /** change from 0.96 to 0.76 */
      x: targetDataInner.x,
      y: targetDataInner.bottom
    })
  }, [setOpened, opened])

  const onClickHandlerOpen = (e : React.MouseEvent<HTMLElement>) => {
    refRoot && ((refRoot as any).current as any).focus()
    let target = e.target as any
    while (target) {
      if (target.tagName.toUpperCase() === 'DIV' && (target.classList as any).contains('hw-select-option')) {
        openSelectList()
        return
      }
      target = target.parentElement
    }
  }

  const optionsSelect = React.useMemo(() : ISelectChooseOptions[] => {
    return (options as []).map((x : any) => {
      if (typeof x === 'string') {
        return {
          label: x,
          value: x
        } as ISelectChooseOptions
      }
      return {
        label: x.label,
        value: x.value === void(0) ? x.label : x.value,
        icon: x.icon,
        description: x.description
      }
    })
  }, [options])

  const closeList = React.useCallback(() => {
    setOpened({
      visible: SELECT_STATE.CLOSE,
      top: 0
    })
  }, [setOpened])

  const handlerBlur = React.useCallback((e : React.FocusEvent) => {
    onBlur && onBlur(e as any)
    setFocused(false)
  }, [onBlur, setFocused])

  useEffect(() => {
    !focused && closeList()
  }, [focused, closeList])

  const propsSelected : Partial<ISelectChooseOptions> = React.useMemo(() => {
    const data = optionsSelect.find(x => x.value === value)
    return data ? data : {
      label: undefined
    }
  }, [value, optionsSelect])

  const handlerOnChange = React.useCallback((e : any) => {
    onChange && onChange(e)
    closeList()
  }, [onChange, closeList])

  const onFocusListHandler = React.useCallback(() => {
    setFocused(true)
  }, [setFocused])

  const rootClass = React.useMemo(() => {
    return `hw-select-root relative  ${lined ? 'lined-version' : ''}${className ? ` ${className}` : ''}${focused ? ' focused' : ''}`
  }, [focused, className])

  const {setRef} = useExternalKeyboard((e) => {
    switch (e.key) {
      case KeyboardEventCodes.Enter:
        if (opened.visible === SELECT_STATE.SHOW) {
          if (positionSelect < 0 || positionSelect >= optionsSelect.length) {
            return
          }
          const value = optionsSelect[positionSelect].value
          onChange && onChange({
            persist: () => { /** */
            },
            target: {
              value
            }
          } as React.ChangeEvent<HTMLSelectElement>)
          closeList()
          return
        }
        return
      case KeyboardEventCodes.ArrowDown:
        if (opened.visible === SELECT_STATE.CLOSE) {
          focused && openSelectList()
          setPositionSelect(0)
          return
        }
        if (opened.visible === SELECT_STATE.SHOW) {
          const nextSelect = positionSelect + 1
          if (nextSelect < optionsSelect.length) {
            setPositionSelect(nextSelect)
            return
          }
        }
        return
      case KeyboardEventCodes.ArrowUp:
        if (opened.visible === SELECT_STATE.SHOW) {
          if (positionSelect < 1) {
            return
          }
          setPositionSelect(positionSelect - 1)
          return
        }
        return
    }
  }, true, [KeyboardEventCodes.ArrowDown, KeyboardEventCodes.ArrowUp, KeyboardEventCodes.Enter])

  const rootStyle = useMemo(() => {
    const obj = {...style,...styleActiveBackground}
    return styleActiveBackground && styleActiveBackground.zIndex ? {...obj, zIndex: (obj.zIndex as number) + 50} : obj
  },[styleActiveBackground])

  return (

    <div
            className={rootClass}
            onBlur={handlerBlur}
            onFocus={onFocusListHandler}
            ref={(ele) => {
              ((refRoot as any).current = ele as any)
              setRef(ele)
            }}
            style={rootStyle}

    >
      <button
                ref={(ele) => (refButton as any) && ((refButton as any).current = ele as any)}
                style={{
                  position: 'absolute',
                  maxWidth: '0px',
                  padding: '0px',
                  border: '0px',
                  outline: 'none'
                }}
      />

      {isLabel ? <Label
                label={label}
                required={required}
                error={error}
      /> : <></>}
      <div onClick={onClickHandlerOpen} className={`hw-select-selected ${error ? 'error' : ''}`}>
        <SelectOption {...propsSelected} selection placeholder={placeholder}/>
      </div>
      {opened.visible !== SELECT_STATE.CLOSE ?
        <SelectDropDown
                    value={value}
                    positionSelect={positionSelect}
                    options={optionsSelect}
                    onChange={handlerOnChange}
                    stateOpen={opened}
                    setOpened={setOpened}/> : null}
      {isHelperText ? <HelperText
                error={error}
                text={helperText}
      /> : <></>}
    </div>
  )

}

export default Select
