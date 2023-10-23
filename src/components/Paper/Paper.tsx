import React, {PropsWithChildren} from 'react'

interface IPaper  extends PropsWithChildren<any> {
  header ?: string
  classNames ?: string
}

const Paper  = ({header,children,classNames} : IPaper)  => {

  return (
    <div className={`hw-paper${classNames ? ` ${classNames}` : ''}`}>
      {
        header ? (
          <div className={'hw-paper-header'}>
            <span className={'hw-paper-header-name'}>{header}</span>
          </div>
        ) : <></>
      }
      <div className={'hw-paper-body'}>
        {children}
      </div>

    </div>
  )
}

export default Paper
