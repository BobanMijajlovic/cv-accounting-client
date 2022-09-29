import React, {
  useMemo,
  useState
}                                         from 'react'
import { TableHeaderRenderManageColumns } from '../../../../components/Table/render/HeaderRender'
import CategoryTableActionCell            from './_common/CategoryTableActionCell'
import {
  NOT_FOUND_TRANSLATION,
  useTranslationFunction
}                                         from '../../../../components/Translation/useTranslation'
import _                                  from 'lodash'
import Table                              from '../../../../components/Table/Table'
import { RETURN_INVOICE_MAIN_VIEW_TABLE } from '../../../constants'

export const categoryTableHeaderColumns = [
  {
    field : 'name',
    label : 'Name',
    cell : {
      classes : ['hw-table-cell-center'],
    }
  },
  {
    field : 'description',
    label : 'Description',
    cell : {
      classes : ['hw-table-cell-center'],
    }
  },
  {
    field : 'slug',
    label : 'Slug',
    cell : {
      classes : ['hw-table-cell-center'],
    }
  },
  {
    field : 'act',
    notHide : true,
    notResize : true,
    cell : {
      classes : ['hw-table-cell-center'],
      style : {
        width : '90px'
      },
      render : CategoryTableActionCell
    },
    width : '50px',
    render : TableHeaderRenderManageColumns
  }
]

const CategoryTable = () => {
  const {translate} = useTranslationFunction()
  const [tableSettings, setTableSettings] = useState( {} )

  const tableHeader = useMemo(() => {
    if ( !categoryTableHeaderColumns ) {
      return []
    }
    return categoryTableHeaderColumns.map( ( x : any ) => {
      const translated = x.label && x.label !== '#' && translate( x.label )
      return {
        ...x,
        label : translated && translated !== NOT_FOUND_TRANSLATION ? translated : x.label
      }
    } )
  },[categoryTableHeaderColumns])

  const tableData = React.useMemo( () => [], [] )

  const handlerTableSettingsChanged = React.useCallback( ( settings : any ) => {
    setTableSettings( { ...settings } )
  }, [setTableSettings] )

  const handlerDataEventClick = ( event : any, id : any, action : any, param : any ) => {

  }
  
  return (
    <div className={'flex-2 px-3 m-0 hw-settings-category-table-root'}>
      <Table
            tableName={ RETURN_INVOICE_MAIN_VIEW_TABLE }
            header={ tableHeader }
            data={ tableData }
            separator={ 'cell' }
            handlerEventDataClick={ handlerDataEventClick }
            handlerEventSettingsChanged={ handlerTableSettingsChanged }
            scrollable
      />
    </div>
  )
}

export default CategoryTable