import React from 'react'

export interface IComponentInfo {
  label ?: string
  value : string | number
  'value-align' ?: 'text-right' | 'text-left'
  classNameValue ?: string
  classNameLabel ?: string
  additionalValue ?: string
}

const ComponentInfo = ({label, value, 'value-align': valueAlign, classNameValue, classNameLabel,additionalValue} : IComponentInfo) => {
  return (
    <div style={{color:'#184264'}} className={'d-flex flex-row w-100 text-upper align-items-center row-even-div p-1'}>
      {label ? <div className={`font-smaller-4 font-weight-600 mr-2${classNameLabel ? ` ${classNameLabel}` : ''}`}>{label}</div> : null}
      {additionalValue ?
        <div className={'d-flex flex-row justify-content-between align-items-center flex-fill'}>
          <div className={'font-smaller-4 font-weight-300 pr-2'}>{additionalValue}</div>
          <div className={`font-bigger-2 font-weight-300 ${valueAlign ? ` ${valueAlign}` : 'text-center'}${classNameValue ? ` ${classNameValue}` : ''}`}>{value}</div>
        </div>
        :
        <div className={`font-bigger-2 font-weight-300 ${valueAlign ? ` ${valueAlign}` : 'text-center'}${classNameValue ? ` ${classNameValue}` : ''}`}>{value}</div>
      }
    </div>

  )
}

export default ComponentInfo
