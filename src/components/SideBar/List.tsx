import React from 'react'

interface IListProps extends React.PropsWithChildren<any> {

}

const List = ({children} : IListProps) => {

  return (
    <ul className={'hw-list-root'}>
      {children}
    </ul>
  )
}

export default List
