import React                           from 'react'
import {useExternalKeyboardParentRoot} from './useExternalKeybaord'

const DivExternalKeyboardRoot = (props : React.PropsWithChildren<any>) => {

  const {setRef} = useExternalKeyboardParentRoot()
  const {children, ...rest} = props
  return (
    <div {...rest} ref={setRef}>
      {children}
    </div>
  )
}

export default DivExternalKeyboardRoot
