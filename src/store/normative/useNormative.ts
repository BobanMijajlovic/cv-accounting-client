import {
  useDispatch,
  useSelector
}                              from 'react-redux'
import { IReduxStore }         from '../index'
import {
  useCallback,
  useMemo
}                              from 'react'
import {
  useDeleteNormativeItemMutation,
  useInsertNormativeItemMutation,
  useInsertNormativeMutation,
  useItemQuery,
  useNormativeQuery,
  useUpdateNormativeItemMutation,
  useUpdateNormativeMutation
}                              from '../../graphql/graphql'
import {
  resetSelectedNormative,
  setFieldNormativeDashboard,
  setSelectedNormative
}                              from './action'
import { processErrorGraphQL } from '../../apollo'
import { toNumberFixed }       from '../../application/utils/Utils'
import { CONSTANT_MODEL }      from '../../application/constants'
import { omit as _omit }       from 'lodash'
import { INormativeSelected }  from './type'

export const useNormativeDashboard = () => {
  const dispatch = useDispatch()
  const { selectedId, searchState, selectedNormative } = useSelector( ( state : IReduxStore ) => state.normative )

  const [mutationInsertItem] = useInsertNormativeItemMutation()
  const [mutationUpdateItem] = useUpdateNormativeItemMutation()
  const [mutationDeleteItem] = useDeleteNormativeItemMutation()

  const [mutationInsertNormative] = useInsertNormativeMutation()
  const [mutationUpdateNormative] = useUpdateNormativeMutation()

  const { refetch : refetchItem, data } = useItemQuery( {
    notifyOnNetworkStatusChange : true,
    fetchPolicy : 'cache-and-network',
    variables : {
      id : Number( selectedId )
    },
    skip : !selectedId
  } )

  const selectedNormativeId = useMemo( () => !selectedNormative || selectedNormative.length === 0 ? void( 0 ) : selectedNormative[0].id, [selectedNormative] )

  const { data : _normative, refetch : refetchNormative } = useNormativeQuery( {
    notifyOnNetworkStatusChange : true,
    fetchPolicy : 'cache-and-network',
    variables : {
      id : Number( selectedNormativeId )
    },
    skip : !selectedNormativeId
  } )

  const normative = useMemo( () => _normative && _normative?.normative ? _normative.normative : void( 0 ), [_normative] )

  const selected = useMemo( () => data && data.item ? data.item : {} as any, [data] )

  const setSelectedId = useCallback( ( id : string ) => {
    dispatch( setFieldNormativeDashboard( 'selectedId', id ) )
  }, [dispatch] )

  const addNormative = useCallback( ( data : INormativeSelected ) => {
    dispatch( setSelectedNormative( data ) )
  }, [dispatch] )

  const setSearchState = useCallback( ( value : string ) => {
    dispatch( setFieldNormativeDashboard( 'searchState', value ) )
  }, [dispatch] )

  const resetNormative = useCallback( () => {
    dispatch( resetSelectedNormative() )
  }, [dispatch] )

  const insertItem = ( data : any ) => {
    return mutationInsertItem( {
      variables : {
        data
      }
    } )
      .then( () => {
        refetchNormative().then()
      } )
  }

  const updateItem = ( value : number | string, field : string, model : any ) => {
    mutationUpdateItem( {
      variables : {
        id : Number( model.id ),
        data : {
          itemId : Number( model.item.id ),
          normativeId : Number( selectedNormativeId ),
          [field] : toNumberFixed( value )
        } as any
      }
    } )
      .then( () => {
        refetchNormative().then()
      } )
      .catch( e => {
        processErrorGraphQL( e, {} )
      } )
  }

  const deleteItem = ( id : number ) => {
    mutationDeleteItem( {
      variables : {
        id
      }
    } )
      .then( () => {
        refetchNormative().then()
      } )
      .catch( e => {
        processErrorGraphQL( e, {} )
      } )
  }

  const insertNormative = ( data : any ) => {
    return mutationInsertNormative( {
      variables : {
        data
      }
    } )
      .then( () => {
        refetchItem().then()
      } )
      .catch( e => {
        processErrorGraphQL( e, {} )
      } )
  }

  const deleteNormative = ( id : number ) => {
    return mutationUpdateNormative( {
      variables : {
        id,
        data : {
          status : CONSTANT_MODEL.NORMATIVE_STATUS.NOT_ACTIVE
        }
      }
    } )
      .then( () => {
        refetchItem().then()
      } )
      .catch( e => {
        processErrorGraphQL( e, {} )
      } )
  }

  const updateNormative = ( data : any ) => {
    return mutationUpdateNormative( {
      variables : {
        id : Number( data.id ),
        data : {
          ..._omit( data, ['id'] )
        }
      }
    } )
      .then( () => {
        refetchItem().then()
      } )
      .catch( e => {
        processErrorGraphQL( e, {} )
      } )
  }

  return {
    normative,
    refetchItem,
    selected,
    selectedId,
    selectedNormative,
    selectedNormativeId,
    searchState,
    setSelectedId,
    setSearchState,
    addNormative,
    resetNormative,
    insertItem,
    updateItem,
    deleteItem,
    insertNormative,
    updateNormative,
    deleteNormative
  }

}