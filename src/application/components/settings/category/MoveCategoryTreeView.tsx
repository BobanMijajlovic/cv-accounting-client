import React, { useState }          from 'react'
import {
  cloneDeep as _cloneDeep,
  merge as _merge
}                                   from 'lodash'
import { FontAwesomeIcon }          from '@fortawesome/react-fontawesome'
import {
  faCheckSquare,
  faChevronDown,
  faChevronRight,
  faMinusSquare,
  faPlusSquare
}                                   from '@fortawesome/free-solid-svg-icons'
import { faSquare }                 from '@fortawesome/free-regular-svg-icons'
import CheckboxTree                 from 'react-checkbox-tree'
import { ICategoryTreeView }        from '../../../../store/category/useCategory'
import { useGetAllCategoriesQuery } from '../../../../graphql/graphql'
import { TCategory }                from '../../../../graphql/type_logic/types'
import TreeView from '../../../../components/TreeView/TreeView'

interface IMoveCategoryTreeViewProps {
  category : TCategory
  state : ICategoryTreeView
  onChange : ( s : ICategoryTreeView ) => void
}

const MoveCategoryTreeView = ( { category, state, onChange } : IMoveCategoryTreeViewProps ) => {
  const [nodes, setNodes] = useState( [] as any )

  const configChildrenData = ( cat : any ) => {
    if ( typeof cat === 'object' ) {
      cat['label'] = cat.name
      cat['value'] = cat.id
      cat['disabled'] = Number( cat.id ) === category.parentId || Number( cat.id ) === Number( category.id ) || Number( cat.parentId ) === Number( category.id )
    }
    if ( cat.children && cat.children.length !== 0 ) {
      cat.children.forEach( ( c : any ) => {
        configChildrenData( c )
      } )
    }
  }

  const changeChecked = ( checked : string[] ) => {
    onChange( {
      ...state,
      checked : [checked[0]]
    } )
  }

  const changeExpanded = ( expanded : string[] ) => {
    onChange( {
      ...state,
      expanded
    } )
  }

  useGetAllCategoriesQuery( {
    notifyOnNetworkStatusChange : true,
    fetchPolicy : 'no-cache',
    onCompleted : ( data : any ) => {
      if ( !data || !data.categories || !data.categories.length ) {
        return
      }
      const items = _cloneDeep( [...data.categories] )

      items.forEach( ( cat : any ) => {
        const cParent = items.find( ( x : any ) => Number( x.id ) === cat.parentId )
        if ( !cParent ) {
          return
        }
        if ( !cParent.children ) {
          cParent.children = []
        }
        const index = cParent.children.findIndex( ( cc : any ) => Number( cc.id ) === Number( cat.id ) )
        if ( index !== -1 ) {
          cParent.children[index] = _merge( cParent.children[index], {
            name : cat.name,
            slug : cat.slug,
            description : cat.description
          } )
          return
        }
        cParent.children.push( cat as any )
      } )
      const rootInstance = items[0]

      if ( rootInstance.children && rootInstance.children.length !== 0 ) {
        configChildrenData( rootInstance )
      }
      setNodes( _cloneDeep( [{
        ...rootInstance
      } as any] ) )
    }
  } )

  const onClick = ( node : any ) => {
    !node.disabled && onChange( {
      ...state,
      checked : [node.value]
    } )
  }

  return (
    <TreeView
          nodes={nodes}
          checked={state.checked}
          expanded={state.expanded}
          onClick={onClick}
          onCheck={changeChecked}
          onExpand={changeExpanded}
          showExpandAll={true}
    />
  )
}

export default MoveCategoryTreeView