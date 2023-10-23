import React, {forwardRef} from 'react'

export interface IHiddenFocusElem {
  onBlur ?: (e : React.FocusEvent<HTMLInputElement>) => void
  onFocus ?: (e : React.FocusEvent<HTMLInputElement>) => void
}

const HiddenFocusElement = forwardRef((props : IHiddenFocusElem, ref : React.Ref<any>) => {

  return (
    <div className={'absolute'} style={{maxWidth: '0px', maxHeight: '0px'}} {...props}>
      <input ref={ref} style={{maxWidth: '0px', maxHeight: '0px', padding: '0px', border: '0px'}}/>
    </div>
  )
})

export default HiddenFocusElement
