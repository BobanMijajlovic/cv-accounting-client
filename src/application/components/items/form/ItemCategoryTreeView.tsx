import React, {
  useEffect,
  useState
}                                 from 'react'
import {
  cloneDeep as _cloneDeep,
  merge as _merge
}                                 from 'lodash'
import {useGetAllCategoriesQuery} from '../../../../graphql/graphql'
import TreeView                   from '../../../../components/TreeView/TreeView'
import DivExternalKeyboardRoot    from '../../../../components/hooks/DivParentExternalKeybardRoot'

interface IItemCategoryTreeViewProps {
  checked?: string[],
  expanded?: string[],
  onCheck: (checked: string[]) => void,
  onExpand: (expanded: string[]) => void
  onClick: (node: any) => void
}

const ItemCategoryTreeView = ({checked, expanded, onCheck, onExpand, onClick}: IItemCategoryTreeViewProps) => {
  const [nodes, setNodes] = useState([] as any)

  const configChildrenData = (cat: any) => {
    if (typeof cat === 'object') {
      cat['label'] = cat.name
      cat['value'] = cat.id
    }
    if (cat.children && cat.children.length !== 0) {
      cat.children.forEach((c: any) => {
        configChildrenData(c)
      })
    }
  }

  useGetAllCategoriesQuery({
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'no-cache',
    onCompleted: (data: any) => {
      if (!data || !data.categories || !data.categories.length) {
        return
      }
      const items = _cloneDeep([...data.categories])

      items.forEach((cat: any) => {
        const cParent = items.find((x: any) => Number(x.id) === cat.parentId)
        if (!cParent) {
          return
        }
        if (!cParent.children) {
          cParent.children = []
        }
        const index = cParent.children.findIndex((cc: any) => Number(cc.id) === Number(cat.id))
        if (index !== -1) {
          cParent.children[index] = _merge(cParent.children[index], {
            name: cat.name,
            slug: cat.slug,
            description: cat.description
          })
          return
        }
        cParent.children.push(cat as any)
      })
      const rootInstance = items[0]

      if (rootInstance.children && rootInstance.children.length !== 0) {
        configChildrenData(rootInstance)
      }
      setNodes(_cloneDeep([{
        ...rootInstance
      } as any]))
    }
  })

  useEffect(() => {
    if (!nodes || !nodes.length || (expanded && expanded.length)) {
      return
    }
    let arr = [] as any
    let isFind = false
    const func = (cat: any) => {
      const catId = checked && checked[0]
      if (cat.children && cat.children.length !== 0) {
        const _cat = cat.children.find((x: any) => Number(x.id) === Number(catId))
        if (_cat && !isFind) {
          arr = [...arr, cat.id, _cat.id]
          isFind = true
          return
        } else {
          if (!isFind) {
            if (!cat.parentId) {
              arr.push(cat.id)
            } else {
              arr.push(`${cat.parentId}`)
            }
          }
          cat.children.forEach((c: any) => {
            func(c)
          })
        }
      }
    }
    nodes.forEach((x: any) => {
      func(x)
    })
    onExpand(arr)
  }, [nodes, onExpand, expanded, checked])

  return (
    <DivExternalKeyboardRoot className={'d-flex flex-column hw-item-category-root w-100'}>
      <div className={'hw-item-title'}>Category</div>
      <div className={'flex-2 pt-2'}>
        <TreeView
                    nodes={nodes}
                    checked={checked}
                    expanded={expanded}
                    onClick={onClick}
                    onCheck={onCheck}
                    onExpand={onExpand}
        />
      </div>
    </DivExternalKeyboardRoot>

  )

    /*
      return (
        <CheckboxTree
                nodes={ nodes }
                checked={ state.checked }
                expanded={ state.expanded }
                noCascade={ true }
                showExpandAll
                optimisticToggle={ true }
                onCheck={ changeChecked }
                onClick={ onClick }
                onExpand={ changeExpanded }
                iconsClass={ 'fa5' }
                nativeCheckboxes={ true }
                icons={ {
                  check : <FontAwesomeIcon className="rct-icon rct-icon-check" icon={ faCheckSquare }/>,
                  uncheck : <FontAwesomeIcon className="rct-icon rct-icon-uncheck" icon={ faSquare }/>,
                  halfCheck : <FontAwesomeIcon className="rct-icon rct-icon-half-check" icon={ faCheckSquare }/>,
                  expandClose : <FontAwesomeIcon className="rct-icon rct-icon-expand-close" icon={ faChevronRight }/>,
                  expandOpen : <FontAwesomeIcon className="rct-icon rct-icon-expand-open" icon={ faChevronDown }/>,
                  expandAll : <span>Expanded All <FontAwesomeIcon className="rct-icon rct-icon-expand-all" icon={ faPlusSquare }/></span>,
                  collapseAll : <span> Collapse All <FontAwesomeIcon className="rct-icon rct-icon-collapse-all" icon={ faMinusSquare }/> </span>
                } }
        />
      )*/
}

export default ItemCategoryTreeView