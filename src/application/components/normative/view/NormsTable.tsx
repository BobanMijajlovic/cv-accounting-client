import React, { useMemo } from 'react'
import Table              from '../../../../components/Table/Table'
import { formatPrice }                    from '../../../utils/Utils'
import { useNormativeDashboard }          from '../../../../store/normative/useNormative'
import { TableHeaderRenderManageColumns } from '../../../../components/Table/render/HeaderRender'
import { TableActionCell }                from '../../../../components/Table/render/CellRender'
import { NORMS_TABLE_NAME }        from '../../../constants'
import {
  DialogModalRootComponent,
  EasyDialogApolloProvider
}                                  from '../../../../components/EasyModel/EasyModal'
import {
  CenteredDialog,
  DialogComponentQuestions
}                                  from '../../../../components/Dialog/DialogBasic'
import { TNormative }              from '../../../../graphql/type_logic/types'
import { openDialogNormativeForm } from '../Form'
import { resetSelectedNormative }  from '../../../../store/normative/action'

const tableHeader = [
  {
    field : 'description',
    label : 'Description',
    cell : {
      classes : ['hw-table-cell-center'],
      style : {
        maxWidth : 250
      }
    }
  },
  {
    field : 'act',
    notHide : true,
    notVisible : false,
    notResize : true,
    cell : {
      classes : ['hw-table-cell-center'],
      render : TableActionCell,
      renderProps : {
        preventPreview : true
      },
      style : {
        width : '50px'
      }
    },
    width : '50px',
    render : TableHeaderRenderManageColumns
  }
]

const NormsTable = ({norms, handlerDeleteNormative}: {norms: TNormative[], handlerDeleteNormative: (id: number)=> Promise<any>}) => {

  const { addNormative, selectedNormative, selected, deleteNormative, resetNormative, updateNormative } = useNormativeDashboard()

  const handlerDataEventClick = ( event : any, id : any, action : any, param : any ) => {
    if ( action === 'table-cell-edit' && id ) {
      resetNormative()
      addNormative( {
        id,
        label: selected.shortName
      } )
      return
    }
    if ( action === 'delete' && id ) {
      openDialogDeleteNormative( {
        id : Number( id ),
        submitFun : handlerDeleteNormative
      } )
      return
    }

    if ( action === 'edit' && id ) {
      openDialogNormativeForm({
        normativeId: id,
        submitFun: updateNormative
      })
      return
    }
  }
  
  const selectedIndex = useMemo(() => {
    if (norms && norms.length !== 0 && selectedNormative && selectedNormative.length !== 0) {
      return norms.findIndex(x => x.id === selectedNormative[selectedNormative.length - 1].id)
    }
    return 0
  } ,[norms,selectedNormative])

  return (
    <>
      <Table
                tableName={ NORMS_TABLE_NAME }
                header={ tableHeader }
                data={ norms }
                selectedRowIndex={selectedIndex}
                separator={ 'cell' }
                handlerEventDataClick={ handlerDataEventClick }
                additionalData={ norms }
      />
    </>
  )
}

export default NormsTable

export const openDialogDeleteNormative = ( { id, submitFun } : { id : number, submitFun : ( id : number ) => Promise<any> } ) => {

  EasyDialogApolloProvider( ( closeDialog : () => any, openDialog : ( data : any ) => any ) => {
    const Component = () => {
      const messages : string[] = React.useMemo( () => [
        'Are you sure you want to delete this normative? '
      ], [] )

      const handlerConfirm = async () => {
        await submitFun( id )
        closeDialog()
      }

      return (
        <DialogComponentQuestions
                    closeFun={ closeDialog }
                    confirmFun={ handlerConfirm }
                    messages={ messages }
        />
      )
    }
    openDialog( <DialogModalRootComponent name={ 'dialog-delete-normative-181518989186523564' } closeFn={ closeDialog }>
      <CenteredDialog
                title={ 'DELETE NORMATIVE' }
                closeAction={ closeDialog }
                Component={ Component }
      />
    </DialogModalRootComponent> )
  } )
}