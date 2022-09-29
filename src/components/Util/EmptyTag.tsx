import React           from 'react'
import { get as _get } from 'lodash'

export interface IEmptyTagProps {
  model : any,
  field : string,
  placeholder ?: string,
  condition ?: boolean
  format ?: (value : any) => void
  maxLength ?: number
}

const EmptyTag = ({model, field, placeholder,format,maxLength} : IEmptyTagProps) => {

  let data = React.useMemo(() => {
    const value = _get(model, field)
    if (!value) {
      return undefined 
    }
    return typeof value === 'number' ? `${value}` : value
  }, [model, field])

  if (format && data) {
    data = format(data) 
  }
  return (
    <>
      {data ? maxLength ? data.substring(0,maxLength) : data :
        placeholder ? <span className={'opacity-2'}>{placeholder}</span> : <> &nbsp;</>}
    </>
  )
}

export default EmptyTag

