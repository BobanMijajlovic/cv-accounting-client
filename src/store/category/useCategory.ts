import {
  useDispatch,
  useSelector
}                                    from 'react-redux'
import { IReduxStore }               from '../index'
import {
  useCallback,
  useMemo,
  useState
} from 'react'
import { setFieldCategoryDashboard } from './action'
import {
  useCategoryQuery,
  useDeleteCategoryMutation,
  useGetAllCategoriesQuery,
  useInsertCategoryMutation,
  useUpdateCategoryMutation
}                                    from '../../graphql/graphql'
import { processErrorGraphQL }       from '../../apollo'
import {
  cloneDeep as _cloneDeep,
  merge as _merge
} from 'lodash'
import { TCategory }                 from '../../graphql/type_logic/types'

export interface ICategoryTreeView {
  checked ?: string[],
  expanded : string[]
}

export const useCategory = () => {

  const dispatch = useDispatch()
  const { checked, expanded } = useSelector( ( state : IReduxStore ) => state.category )
  const [mutationUpdateCategory] = useUpdateCategoryMutation()
  const [mutationInsertCategory] = useInsertCategoryMutation()
  const [mutationDeleteCategory] = useDeleteCategoryMutation()
  const [nodes, setNodes] = useState( [] as any )

  const configChildrenData = ( cat : any ) => {
    if ( typeof cat === 'object' ) {
      cat['label'] = cat.name
      cat['value'] = cat.id
    }
    if ( cat.children && cat.children.length !== 0 ) {
      cat.children.forEach( ( c : any ) => {
        configChildrenData( c )
      } )
    }
  }

  const { data, loading, refetch } = useGetAllCategoriesQuery( {
    notifyOnNetworkStatusChange : true,
    fetchPolicy : 'network-only',
    onCompleted : ( data : any ) => {
      if ( !data || !data.categories || !data.categories.length  ) {
        return
      }
      const items = _cloneDeep([...data.categories])

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
      setNodes( _cloneDeep([{
        ...rootInstance
      } as any]) )
    }
  } )

  const { data : category } = useCategoryQuery( {
    notifyOnNetworkStatusChange : true,
    fetchPolicy : 'cache-and-network',
    variables : {
      id : Number( checked )
    },
    skip : !Number( checked )
  } )

  const categories = useMemo( () => !data || !data.categories || !data.categories.length ? [] : data.categories, [data] )
  const selectedCategory = useMemo( () => !category || !category.category ? {} as TCategory : category.category as TCategory, [category] )

  const insertCategory = async ( data : any ) => {
    return mutationInsertCategory( {
      variables : {
        data
      }
    } )
      .then( v => {
        if ( v && v.data && v.data.category ) {
          refetch().then()
          dispatch( setFieldCategoryDashboard( 'checked', expanded[expanded.length - 1] ) )
        }
      } )
      .catch( e => {
        processErrorGraphQL( e, {} )
      } )
  }

  const updateCategory = async ( data : any, id: number ) => {
    return mutationUpdateCategory( {
      variables : {
        id,
        data
      }
    } )
      .then( v => {
        if ( v && v.data && v.data.category ) {
          refetch().then()
        }
      } )
      .catch( e => {
        processErrorGraphQL( e, {} )
      } )
  }

  const deleteCategory = () => {
    return mutationDeleteCategory( {
      variables : {
        id : Number( selectedCategory.id )
      }
    } )
      .then( v => {
        if ( v && v.data && v.data.category ) {
          refetch().then()
          dispatch( setFieldCategoryDashboard( 'checked', expanded[expanded.length - 1] ) )
          dispatch( setFieldCategoryDashboard( 'expanded', expanded.length > 1 ? expanded : expanded.slice( 0, expanded.length - 1 ) ) )
        }
      } )
      .catch( e => {
        processErrorGraphQL( e, {} )
      } )
  }

  const setChecked = useCallback( ( checked : string ) => {
    dispatch( setFieldCategoryDashboard( 'checked', checked ) )
  }, [dispatch] )

  const setExpanded = useCallback( ( expanded : string[] ) => {
    dispatch( setFieldCategoryDashboard( 'expanded', expanded ) )
  }, [dispatch] )

  const resetTreeViewState = useCallback(() => {
    dispatch( setFieldCategoryDashboard( 'checked', void(0) ) )
    dispatch( setFieldCategoryDashboard( 'expanded', ['1'] ) )
  },[dispatch] )

  return {
    treeView : {
      checked : _cloneDeep( [checked] ),
      expanded : _cloneDeep( expanded )
    } as ICategoryTreeView,
    categories,
    treeViewLoading: loading,
    categoryNodes:nodes,
    selectedCategory,
    setChecked,
    setExpanded,
    insertCategory,
    updateCategory,
    deleteCategory,
    resetTreeViewState
  }
}