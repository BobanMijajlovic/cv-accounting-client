import React, {
  useEffect,
  useMemo,
  useState
}                                             from 'react'
import {
  TNormative,
  TNormativeItem
} from '../../../../graphql/type_logic/types'
import Table                                  from '../../../../components/Table/Table'
import { NORMATIVE_PREVIEW_ITEMS_TABLE_NAME } from '../../../constants'
import { normativeItemsTableHeader }          from '../items/Table'
import { useTranslationFunction }             from '../../../../components/Translation/useTranslation'
import { useNormativeQuery }                  from '../../../../graphql/graphql'

const PreviewNormativeTable = ( { items } : { items ?: TNormativeItem[] } ) => {

  const { translate } = useTranslationFunction()
  const tableData = useMemo( () => {
    if ( !items ) {
      return []
    }
    return items
  }, [items] )

  const tableHeader = React.useMemo( () => {
    const header = [...normativeItemsTableHeader].map( x => {
      return {
        ...x,
        notResize : true,
        cell : {
          ...x.cell,
          editor : void( 0 )
        }
      }
    } )
    const index : any = normativeItemsTableHeader.findIndex( x => x.field === 'act' )
    if ( index === -1 ) {
      return header
    }
    header[index] = {
      ...header[index],
      notResize : true
    } as any
    header.splice( index, 1 )
    return header.map( ( x : any ) => {
      return {
        ...x,
        label : x.label && x.label !== '#' ? translate( x.label ) : x.label
      }
    } )
  }, [] )

  return (
    <div className={ 'w-100 calculation-items-table-root mb-1 flex-2' }>
      <Table
            header={ tableHeader }
            separator={ 'cell' }
            data={ tableData }
            tableName={ NORMATIVE_PREVIEW_ITEMS_TABLE_NAME }
            additionalData={ items }
      />
    </div>
  )
}

export default PreviewNormativeTable