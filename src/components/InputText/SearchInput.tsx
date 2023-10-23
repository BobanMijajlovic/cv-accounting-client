import React, {
  useRef,
  useState
}                          from 'react'
import { IInputTextProps } from './InputText'
import { faBackspace }     from '@fortawesome/free-solid-svg-icons'
import { InputText }       from './index'
import { IconProp }        from '@fortawesome/fontawesome-svg-core'

export interface IInputTextSearch extends IInputTextProps {
  handlerSearch: (value: string) => void,
  timeOutTrigger?: number
  handlerInsert?: any
  searchIcon?: IconProp
}

const SearchInput = (props: IInputTextSearch) => {
  const {handlerSearch, timeOutTrigger, handlerInsert, searchIcon, ...rest} = props
  const searchInputProps = searchIcon ? {
    ...rest,
    icon:{
      icon:searchIcon as IconProp,
      handler:handlerInsert
    }
  } : {...rest}

  const [value, setValue] = useState('')
  const timer = useRef(0)

  const triggerSearch = (value: string, time?: number) => {
    clearTimeout(timer.current)
    timer.current = setTimeout(() => {
      handlerSearch(value)
    }, time || timeOutTrigger)
  }

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
    triggerSearch(e.target.value)
  }

  const handlerClear = () => {
    setValue('')
    triggerSearch('', 1)
  }

  return (
      <>
        <InputText
            value={value}
            onChange={onChange}
            iconAction={{
              icon:faBackspace,
              handler:handlerClear,
              color:'danger'
            }}
            {...searchInputProps}
        />
      </>
  )
}

SearchInput.defaultProps = {
  timeOutTrigger:400
}

export default SearchInput
