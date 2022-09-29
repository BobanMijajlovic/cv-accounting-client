import React                 from 'react'
import { random as _random } from 'lodash'

export interface IBreadCrumbItemProps {
  id ?: string | number,
  label : string
  active?: boolean
  onClick? : ( data: any ) => void
}

interface IBreadCrumbProps {
  selected ?: string | number
  items : IBreadCrumbItemProps[]
  onClick? : ( data: any ) => void
}

const BreadCrumb = ( { selected, items, onClick } : IBreadCrumbProps ) => {
  const _items = items.length > 3 ?  [
    items[0],
    ...items.slice(-2)
  ] : items

  return (
    <div className={ 'hw-breadcrumb-root' }>
      {
        _items.map( ( x,key ) => {
          return (
            <>
              {items.length > 3 && key === 1 ? <BreadCrumbItem key={new Date().getTime() + 999999} label={'...'}  /> : <></>}
              <BreadCrumbItem key={new Date().getTime() + key} active={ x.id === selected} { ...x } onClick={ onClick }/>
            </>
          )
        }) 
      }
    </div>
  )
}

export default BreadCrumb

const BreadCrumbItem = ( { active, id, label, onClick } : IBreadCrumbItemProps ) => {
  
  const handlerOnClick = ( e : any ) => {
    const target = e.target
    if (target) {
      const id = target.getAttribute('data-id')
      id && onClick && onClick({
        id,
        label: target.textContent
      })
    }
  }
  
  return (
    <div onClick={ handlerOnClick } data-id={ id } className={ `hw-breadcrumb-item cursor-pointer${active ? ' active' : ''}` }>{ label }</div>
  )
}