import React from 'react'

interface IHelperTextProps {
  error ?: boolean | string
  text ?: string
}

const HelperText = ({error, text} : IHelperTextProps) => {
  return (
    <div style={{marginBottom: '6px'}} className={`hw-help-text ${error ? 'error' : ''}`}>
      {error ? (typeof error === 'boolean' ? <>&nbsp;</> : error)
        : (text ? text : <>&nbsp;</>)}
    </div>
  )
}

export default React.memo(HelperText)
