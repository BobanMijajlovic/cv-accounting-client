import React, {
  HTMLAttributes,
  PropsWithoutRef,
  useEffect,
  useRef,
  useState
}                        from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

import {
  faExclamationCircle,
  faInfoCircle,
  faQuestionCircle
}                   from '@fortawesome/free-solid-svg-icons'
import {
  DialogModalRootComponent,
  EasyDialog
} from '../EasyModel/EasyModal'

interface ITooltipProps extends PropsWithoutRef<HTMLAttributes<HTMLElement>> {
  text ?: string,
  type ?: 'error' | 'info' | 'question'
  component ?: React.Component | React.FunctionComponent
  position ?: 'top' | 'right' | 'bottom' | 'left' | 'top-left' | 'top-right' | 'bottom-right' | 'bottom-left' | 'left-top' | 'left-bottom' | 'right-bottom' | 'right-top'
}

interface ITooltipComponentProps extends ITooltipProps {
  parent ?: React.Ref<HTMLElement>
}

const Tooltip = React.forwardRef(({text, position, type} : ITooltipProps, ref : React.Ref<any>) => {

  return (
    <div className={`hw-tooltip-root${position ? ` ${position}` : ''}${type ? ` ${type}` : ''}`} ref={ref}>
      {type === 'error' ? <FontAwesomeIcon icon={faExclamationCircle}/> : type === 'question' ? <FontAwesomeIcon icon={faQuestionCircle}/> : <FontAwesomeIcon icon={faInfoCircle}/>}

      <div className={'hw-tooltip-content'}>{text}</div>
      <i></i>
    </div>

  )

})

export default Tooltip

export interface IToolTipProps extends ITooltipComponentProps {
  parent ?: React.Ref<HTMLElement>
  closeToolTip ?: () => void
  visibleTime ?: number
}

interface IStyleState {
  top ?: string
  left ?: string
  position ?: string
}

interface IDOMRect {
  top : number,
  left : number,
  width : number,
  height : number
}

const ToolTipComponent = ({parent, visibleTime, closeToolTip, position, ...rest} : IToolTipProps) => {
  const toolTipRef = useRef()

  const [styles, setStyles] : [IStyleState, (r : IStyleState) => void] = useState({position: 'top'} as IStyleState)

  const putTopBottom = React.useCallback((position : string) => {
    const bounds : DOMRect = (toolTipRef.current as any).getBoundingClientRect()
    const _boundsParent : DOMRect = (parent as any).getBoundingClientRect()
    const boundsParent = {
      top: _boundsParent.top,
      left: _boundsParent.left,
      height: _boundsParent.height,
      width: _boundsParent.width
    }

    boundsParent.left += window.scrollX
    boundsParent.top += window.scrollY
    const style = {
      top: 0,
      left: 0
    }
    if (position.startsWith('top')) {
      style.top = boundsParent.top - bounds.height - 10
    } else {
      style.top = boundsParent.top + boundsParent.height + 3
    }

    if (position.indexOf('right') !== -1) {
      style.left = boundsParent.left + boundsParent.width - bounds.width - 3
      return style
    }

    if (position.indexOf('left') !== -1) {
      style.left = boundsParent.left - 10
      return style
    }
    style.left = boundsParent.left + boundsParent.width / 2 - bounds.width / 2
    return style
  }, [])

  const putLeftRight = React.useCallback((position : string) => {
    const bounds : DOMRect = (toolTipRef.current as any).getBoundingClientRect()
    const _boundsParent : DOMRect = (parent as any).getBoundingClientRect()

    const boundsParent = {
      top: _boundsParent.top,
      left: _boundsParent.left,
      height: _boundsParent.height,
      width: _boundsParent.width
    }

    boundsParent.left += window.scrollX
    boundsParent.top += window.scrollY

    const style = {
      top: 0,
      left: 0
    }
    if (position.startsWith('left')) {
      style.left = boundsParent.left - bounds.width - 3
    } else {
      style.left = boundsParent.left + boundsParent.width + 3
    }

    if (position.indexOf('top') !== -1) {
      style.top = boundsParent.top
      return style
    }

    if (position.indexOf('bottom') !== -1) {
      style.top = boundsParent.top + boundsParent.height - bounds.height
      return style
    }
    style.top = boundsParent.top + boundsParent.height / 2 - bounds.height / 2

    return style
  }, [])

  useEffect(() => {
    const bounds : DOMRect = (toolTipRef.current as any).getBoundingClientRect()
    const styles : string[] = (() => {
      let arr = ['top', 'bottom', 'left', 'right']
      const data = /(\w+)/.exec(position as string)
      if (!data || !Array.isArray(data)) {
        return arr
      }
      arr = arr.filter(x => x !== data[1])
      arr.unshift(position as string)
      return arr
    })()

    let style = {
      top: 0,
      left: 0
    }

    const windowBounds = {
      top: window.scrollY,
      bottom: window.scrollY + window.innerHeight,
      left: window.scrollX,
      right: window.scrollX + window.innerWidth
    }

    styles.every(pos => {
      if ((pos as string).startsWith('top') || (pos as string).startsWith('bottom')) {
        style = putTopBottom(pos as string)
      } else {
        style = putLeftRight(pos as string)
      }

      const toolTipBounds = {
        top: style.top - 5,
        bottom: style.top + bounds.height + 5,
        left: style.left - 5,
        right: style.left + bounds.width + 5
      }

      if (toolTipBounds.top < windowBounds.top || toolTipBounds.bottom > windowBounds.bottom || toolTipBounds.left < windowBounds.left || toolTipBounds.right > windowBounds.right) {
        return true
      }

      setStyles({
        top: `${style.top}px`,
        left: `${style.left}px`,
        position: pos
      })
      return false
    })

    const fn = closeToolTip as any
    window.addEventListener('click', fn, false)

    const timer = setTimeout(() => {
      fn()
    }, visibleTime ? visibleTime : 4000)

    return () => {
      clearTimeout(timer)
      window.removeEventListener('click', fn, false)
    }
  }, [setStyles, closeToolTip, visibleTime, position])

  return (
    <div style={{
      top: styles.top,
      left: styles.left,
      position: 'absolute'
    }}>
      <Tooltip

                ref={(ele) => toolTipRef.current = ele as any}
                {...rest}
                position={styles.position as any}
      />
    </div>
  )

}

ToolTipComponent.defaultProps = {
  position: 'top'
}

export const ToolTipOpen = ({...rest} : IToolTipProps) => {

  EasyDialog((closeDialog : () => any, openDialog : (data : any) => void) => {

    const component =  <DialogModalRootComponent name={'tooltip-4562531564564865'} closeFn={closeDialog}>
      <ToolTipComponent
            {...rest}
            closeToolTip={closeDialog}
      />
    </DialogModalRootComponent>

    openDialog(component)
  })
}
