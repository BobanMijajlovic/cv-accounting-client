import React, {
  useMemo,
  useState
}                              from 'react'
import {
  DialogModalRootComponent,
  EasyDialogApolloProvider
}                              from '../../../../components/EasyModel/EasyModal'
import { CenteredDialog }      from '../../../../components/Dialog/DialogBasic'
import { TCategory }           from '../../../../graphql/type_logic/types'
import MoveCategoryTreeView    from './MoveCategoryTreeView'
import ComponentRender         from '../../../../components/Util/ComponentRender'
import { useCategoryQuery }    from '../../../../graphql/graphql'
import DialogButtonsSaveUpdate from '../../_common/DialogButtonsSaveUpdate'
import { ICategoryTreeView }   from '../../../../store/category/useCategory'

interface IMoveCategoryFormProps {
  category : TCategory
  cancelFunction? : () => void
  successFunction : ( data : any, id : number ) => Promise<any>
}

const MoveCategoryForm = ( { category, cancelFunction, successFunction } : IMoveCategoryFormProps ) => {
  const [state, setState] : [ ICategoryTreeView, ( s : ICategoryTreeView ) => void ] = useState( {
    expanded : ['1']
  } )

  const { data } = useCategoryQuery( {
    notifyOnNetworkStatusChange : true,
    fetchPolicy : 'cache-and-network',
    variables : {
      id : Number( category.parentId )
    },
    skip : !category.parentId
  } )

  const parent = useMemo( () => !data || !data.category ? {} as TCategory : data.category as TCategory, [data] )

  const handlerCancelFunction = () => {
    cancelFunction && cancelFunction()
  }

  const handlerSubmit = async () => {
    if ( !state.checked || !state.checked.length ) {
      return
    }
    const checked = state.checked[0]
    if ( Number( checked ) === Number( category.id ) || Number( checked ) === Number( parent.id ) ) {
      console.log( 'error' )
      return
    }
    await successFunction( { parentId : Number( checked ) }, Number( category.id ) )
    cancelFunction && cancelFunction()
  }

  return (
    <div className={ 'd-flex flex-column hw-settings-move-category-form-root' }>
      <ComponentRender label={ 'Parent category' } model={ parent } field={ 'name' } placeholder={ 'Parent category' } classNames={ 'pb-1' } justify-content={ 'start' }/>
      <div className={ 'flex-2 overflow-y' }>
        <MoveCategoryTreeView
                    state={ state }
                    onChange={ setState }
                    category={ category }
        />
      </div>

      <div className={ 'd-flex justify-content-center' }>
        <DialogButtonsSaveUpdate
                    submitBtnLabel={ 'Move' }
                    cancelBtnLabel={ 'Cancel' }
                    cancelFun={ handlerCancelFunction }
                    submitFun={ handlerSubmit }
        />
      </div>

    </div>
  )
}

export default MoveCategoryForm

export const openDialogMoveCategory = ( { category, successFunction } : { category : TCategory, successFunction : ( data : any, id : number ) => Promise<any> } ) => {
  EasyDialogApolloProvider( ( closeDialog : () => any, openDialog : ( data : any ) => any ) => {
    openDialog( <DialogModalRootComponent name={ 'dialog-move-category-form-4121456415621536489620215231' } closeFn={ closeDialog }>
      <CenteredDialog
                title={ 'Move Category' }
                closeAction={ closeDialog }
                Component={ MoveCategoryForm }
                componentRenderProps={ {
                  category,
                  cancelFunction : closeDialog,
                  successFunction
                } }
      />
    </DialogModalRootComponent> )
  } )
}
