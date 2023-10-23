import React from 'react'

interface ICollapsedList extends React.PropsWithChildren<any>{
  active ?: boolean
}

const CollapseList = ({active,children} : ICollapsedList) => {

  let collapseClass = 'hw-collapse-container'
  if (active) {
    collapseClass += ' active'
  }

  return (
    <div className={collapseClass}>
      <div className={'hw-collapse-wrapper'}>
        {children}
      </div>
    </div>
  )
}

export default CollapseList
