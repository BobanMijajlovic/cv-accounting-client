import React, {useState}            from 'react'
import {
  faEye,
  faEyeSlash
}                                   from '@fortawesome/free-solid-svg-icons'
import InputText, {IInputTextProps} from './InputText'

const InputTextPassword = (props : IInputTextProps) => {

  const [typeState, setTypeState] : [boolean, (r : boolean) => void] = useState(false as boolean)
  const handlerOnClickChangeState = React.useCallback(() => {
    setTypeState(!typeState)
  }, [typeState, setTypeState])

  const iconAction = React.useMemo(() => {
    return {
      handler: handlerOnClickChangeState,
      icon: typeState ? faEyeSlash : faEye
    }
  }, [handlerOnClickChangeState, typeState])

  return (
    <InputText
            {
                ...props
            }

            type={typeState ? 'text' : 'password'}
            iconAction={iconAction}
    />

  )
}

export default InputTextPassword
