import React, {useState} from 'react'
import CategoryForm from './category/Form'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCheckSquare, faChevronDown, faChevronRight, faMinusSquare, faPlusSquare, faTags} from '@fortawesome/free-solid-svg-icons'
import CheckboxTree from 'react-checkbox-tree'
import {faSquare} from '@fortawesome/free-regular-svg-icons'
import {useCategory} from '../../../store/category/useCategory'
import {omit as _omit} from 'lodash'
import CategoryInfo from './category/CategoryInfo'
import {IUseOptimizeEventData, useOptimizeEventClick} from '../../../components/hooks/useOptimizeEventClick'
import {CONSTANT_SETTINGS} from '../../constants'
import {TCategory} from '../../../graphql/type_logic/types'
import {DialogModalRootComponent, EasyDialogApolloProvider} from '../../../components/EasyModel/EasyModal'
import {CenteredDialog, DialogComponentQuestions} from '../../../components/Dialog/DialogBasic'
import {openDialogMoveCategory} from './category/MoveCategory'
import {SpinnerLoadingCenter} from '../../../components/Spinner/SpinnerLoading'
import TreeView from '../../../components/TreeView/TreeView'

const SettingsCategory = () => {

  const {categoryNodes, treeViewLoading, updateCategory, insertCategory, resetTreeViewState, selectedCategory, treeView, setChecked, setExpanded, deleteCategory} = useCategory()
  const [editCategory, setEditCategory]: [TCategory | undefined, (cat: TCategory | undefined) => void] = useState()
  const [resetForm, setResetForm]: [boolean, (r: boolean) => void] = useState(false as boolean)

  const handlerDeleteCategory = async () => {
    await deleteCategory()
    setEditCategory(void(0))
  }

  const handlerMoveCategory = async (data: any, id: number) => {
    await updateCategory(data, id)
    resetTreeViewState()
  }

  const {onClickHandler} = useOptimizeEventClick({
    eventHandler (data: IUseOptimizeEventData) {
      if (data.action === CONSTANT_SETTINGS.EVENTS.CATEGORY.EDIT_CATEGORY) {
        setEditCategory(selectedCategory)
        setResetForm(false)
        return
      }

      if (data.action === CONSTANT_SETTINGS.EVENTS.CATEGORY.DELETE_CATEGORY) {
        selectedCategory && selectedCategory?.id && openDialogDeleteCategory({
          actionConfirm: handlerDeleteCategory
        })
        return
      }
      if (data.action === CONSTANT_SETTINGS.EVENTS.CATEGORY.MOVE_CATEGORY) {
        selectedCategory && selectedCategory.id && openDialogMoveCategory({
          category: selectedCategory,
          successFunction: handlerMoveCategory
        })
        return
      }
    }
  })

  const insertUpdateCategory = async (data: any) => {
    editCategory && editCategory?.id ?
      await updateCategory(_omit(data, ['parentId']), Number(editCategory.id))
      : await insertCategory(data)
  }

  const cancelEditCategory = () => {
    setEditCategory(void(0))
  }

  const changeChecked = (checked: string[]) => {
    setChecked(checked[0])
    cancelEditCategory()
    setResetForm(true)
  }

  const onClick = (node: any) => {
    setChecked(node.value)
    cancelEditCategory()
    setResetForm(true)
  }

  const changeExpanded = (expanded: string[]) => {
    const arr = !expanded.length ? ['1'] : expanded
    setExpanded(arr)
  }

  return (
    <>
      {treeViewLoading ? <SpinnerLoadingCenter/> : null}
      <div className={'d-flex flex-column px-4 hw-settings-category-root'}>
        <div className={'d-flex flex-row align-items-center pb-1'}>
          <div className={'color-primary pt-1'}><FontAwesomeIcon className={'pr-2 font-bigger-1 '} style={{fontSize: 20}} icon={faTags}/></div>
          <div className={'color-primary font-bigger-1'}>Categories</div>
        </div>
        <div className={'d-flex justify-content-around align-items-start w-100 h-100 pt-2 relative'}>
          <div className={'hw-settings-category-tree-view-root pt-2'}>
            <TreeView
                nodes={categoryNodes}
                checked={treeView.checked}
                expanded={treeView.expanded}
                onClick={onClick}
                onCheck={changeChecked}
                onExpand={changeExpanded}
            />
          </div>
          <div className={'flex-2 d-flex justify-content-between '} onClick={onClickHandler} data-action-root>
            <CategoryInfo category={selectedCategory}/>
            <CategoryForm
                            successFunc={insertUpdateCategory}
                            category={editCategory}
                            reset={resetForm}
                            cancelFun={cancelEditCategory}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default SettingsCategory

export const openDialogDeleteCategory = ({actionConfirm}: { actionConfirm: () => void }) => {
  EasyDialogApolloProvider((closeDialog: () => any, openDialog: (data: any) => any) => {

    const Component = () => {
      const messages: string[] = React.useMemo(() => [
        'Are you sure you want to delete this category? '
      ], [])

      const handlerConfirm = async () => {
        await actionConfirm()
        closeDialog()
      }

      return (
        <DialogComponentQuestions
                    closeFun={closeDialog}
                    confirmFun={handlerConfirm}
                    messages={messages}
        />
      )
    }
    openDialog(<DialogModalRootComponent name={'dialog-delete-category-70707407470741'} closeFn={closeDialog}>
      <CenteredDialog
                title={'DELETE CATEGORY'}
                closeAction={closeDialog}
                Component={Component}
      />
    </DialogModalRootComponent>)
  })
}
