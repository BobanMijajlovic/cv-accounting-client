import React, {
  useEffect,
  useMemo
}                                            from 'react'
import {
  IUseOptimizeEventData,
  useOptimizeEventClick
}                                            from '../../../components/hooks/useOptimizeEventClick'
import SearchView                            from '../_common/SearchView'
import { useNormativeDashboard }             from '../../../store/normative/useNormative'
import {
  queryVariablesForNorms,
  queryVariablesNormatives
}                                            from '../../../graphql/variablesQ'
import {
  NormativeType,
  useItemsQuery,
  useNormativesQuery
}                                            from '../../../graphql/graphql'
import SearchViewItemRender                  from '../items/SearchViewRender'
import { CONSTANT_ITEM }                     from '../../constants'
import { KeyboardEventCodes }                from '../../../components/hooks/useExternalKeybaord'
import { faPlus }                            from '@fortawesome/free-solid-svg-icons/faPlus'
import { useAppBar }                         from '../../hooks/useAppBar'
import ItemInfo                              from './view/ItemInfo'
import NormsTable                            from './view/NormsTable'
import ConditionalRendering                  from '../../../components/Util/ConditionalRender'
import NormativeItems                        from './view/NormativeItems'
import { openDialogNormativeForm }           from './Form'
import {
  TItem,
  TNormative
} from '../../../graphql/type_logic/types'
import { openDialogNormativeSummarizePrint } from './pdf/PdfSummarize'
import {
  faFileImport,
  faPrint
}                                            from '@fortawesome/free-solid-svg-icons'
import DivExternalKeyboardRoot               from '../../../components/hooks/DivParentExternalKeybardRoot'
import { openDialogNormativePrint }          from './pdf/Pdf'
import {
  round as _round,
  add as _add
} from 'lodash'

const NormativeDashboard = () => {

  const {
    normative,
    selected,
    selectedId,
    searchState,
    setSearchState,
    setSelectedId,
    selectedNormative,
    selectedNormativeId,
    addNormative,
    resetNormative,
    insertNormative,
    deleteNormative
  } = useNormativeDashboard()

  const { setButtonsForPage, clearButtonsForPage } = useAppBar()

  const queryVariables = React.useMemo( () => queryVariablesForNorms( searchState ? searchState : '' ), [searchState] )

  const { data : items } = useItemsQuery( {
    notifyOnNetworkStatusChange : true,
    fetchPolicy : 'no-cache',
    variables : queryVariables
  } )

  const variables = React.useMemo( () => queryVariablesNormatives( Number( selectedId ) ), [selectedId] )

  const { data : _norms, loading, refetch : refetchNorms } = useNormativesQuery( {
    notifyOnNetworkStatusChange : true,
    fetchPolicy : 'cache-and-network',
    variables
  } )

  const norms = useMemo( () => _norms && _norms.data && _norms.data.items && _norms.data.items.length !== 0 ? _norms.data.items as TNormative[] : [] as TNormative[], [_norms] )

  const handlerSearch = ( value : string ) => {
    setSearchState( value )
  }

  useEffect( () => {
    if ( selected && selected.id ) {
      return
    }
    if ( !items || !items.data || !items.data.items || items.data.items.length === 0 ) {
      return
    }
    const val = items.data.items[0]
    setSelectedId( val.id )
  }, [selected, items] )

  useEffect( () => {
    if (norms.length === 0) {
      resetNormative()
      return
    }
    if (selectedNormative.length === 0 && norms && norms.length !== 0 ) {
      addNormative( {
        id : `${ norms[0].id }`,
        label : `${ selected.shortName }`
      } )
      return
    }
  }, [norms] )

  const setItem = ( id : string ) => {
    resetNormative()
    setSelectedId( id )
  }

  const { onClickHandler } = useOptimizeEventClick( {
    eventHandler ( data : IUseOptimizeEventData ) {
      if ( data.action === CONSTANT_ITEM.EVENTS.SELECTED_ONE ) {
        items && items.data && data.id && setItem( data.id )
        return
      }
    }
  } )

  const handlerInsertNormative = async ( data : NormativeType ) => {
    await insertNormative( data )
    refetchNorms().then()
  }

  const handlerDeleteNormative = async ( id : number ) => {
    await deleteNormative( id )
    resetNormative()
    refetchNorms().then()

  }

  const addNewNormative = () => {
    openDialogNormativeForm( {
      submitFun : handlerInsertNormative
    } )
  }

  const showSummarizeNormative = () => {
    const _normative = selectedNormative[selectedNormative.length - 1]
    _normative && openDialogNormativeSummarizePrint( {
      normativeId : _normative.id
    } )
  }
  
  const printNormative = () => {
    const _normative = selectedNormative[selectedNormative.length - 1]
    _normative && openDialogNormativePrint({
      normativeId : _normative.id
    } )    
  }

  useEffect( () => {
    const arr = []
    if (norms && norms.length === 0 ) {
      arr.push({
        label : 'Add',
        icon : faPlus,
        shortcut : KeyboardEventCodes.F7,
        onClick : addNewNormative
      })
    }
    if ( norms && norms.length !== 0 ) {
      arr.push( {
        label : 'Print',
        icon : faPrint,
        shortcut : KeyboardEventCodes.F8,
        onClick : printNormative
      } )
      arr.push( {
        label : 'Summarize',
        icon : faFileImport,
        shortcut : KeyboardEventCodes.F9,
        onClick : showSummarizeNormative
      } )
    }
    const id = setButtonsForPage( arr )
    return () => clearButtonsForPage( id )
  }, [setButtonsForPage, clearButtonsForPage, norms] )

  const itemNormativePrice = useMemo(() => normative && normative.items && normative.items.length !== 0 ? normative.items.reduce((acc,x) => {
    const item = x.item as TItem
    const priceStack =  item.warehouseItems && item.warehouseItems.length !== 0 ? item.warehouseItems[0].priceStack : 0
    return _round(_add(acc,priceStack),2)
  },0) : 0,[normative])

  const item = useMemo(() => {
    return {
      ...selected,
      itemNormativePrice
    }
  },[selected,itemNormativePrice])

  if ( !items || !items.data ) {
    return <></>
  }

  return (
    <DivExternalKeyboardRoot className={ 'd-flex h-100 w-100 pt-2 px-2' }>
      <div
                className={ 'd-flex h-100 text-center items-view-render' }
                onClick={ onClickHandler }
                data-action-root
      >
        <SearchView
                    handlerSearch={ handlerSearch }
                    data={ items.data }
                    helperText={ 'search by #barcode, #code, short name' }
                    RenderComponent={ SearchViewItemRender }
                    selectedId={ Number( selectedId ) }
        />
      </div>
      <div className={ 'd-flex flex-column flex-2 p-4 ml-2' } onClick={ onClickHandler }>
        <div className={'hw-normative-dashboard-root'}>
          <div className={ 'd-flex flex-row pb-3 w-100' }>
            <div className={ 'w-50 mr-5' }>
              <ItemInfo item={ item }/>
            </div>
            <div className={ 'w-50' }>
              <NormsTable norms={ norms } handlerDeleteNormative={ handlerDeleteNormative }/>
            </div>
          </div>
          <div className={ 'w-100' }>
            <ConditionalRendering condition={ !!selectedNormativeId }>
              <NormativeItems/>
            </ConditionalRendering>
          </div>
        </div>

      </div>
    </DivExternalKeyboardRoot>
  )
}

export default NormativeDashboard