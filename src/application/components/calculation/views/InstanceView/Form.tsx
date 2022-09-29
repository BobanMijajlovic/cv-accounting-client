import React, {
  useEffect,
  useState
}                 from 'react'
import InsertForm from './items/InsertForm'

import ItemsTable                     from './items/Table'
import Header                         from './header/Header'
import {
  DialogModalRootComponent,
  EasyDialogApolloProvider
}                                     from '../../../../../components/EasyModel/EasyModal'
import DueDateForm                    from '../../modal/forms/DueDateForm'
import {
  faBook,
  faCheckDouble,
  faFileInvoice,
  faPencilAlt,
  faPrint,
  faSave,
  faSearch
} from '@fortawesome/free-solid-svg-icons'
import Preview                        from '../../preview/Preview'
import {useAppBar}                    from '../../../../hooks/useAppBar'
import {KeyboardEventCodes}           from '../../../../../components/hooks/useExternalKeybaord'
import {
  CenteredDialog,
  DialogComponentQuestions
}                                     from '../../../../../components/Dialog/DialogBasic'
import {useUpdateCalculationMutation} from '../../../../../graphql/graphql'
import {SpinnerLoadingCenter}         from '../../../../../components/Spinner/SpinnerLoading'
import {
  useCalculationForm,
  useCalculationTabs
}                                     from '../../../../hooks/useCalculation'
import {
  IDueDateRecord,
  IHeaderDocumentState,
  openDialogCalculationHeaderForm
}                                     from '../../modal/DocumentHeaderForm'
import {CONSTANT_CALCULATION}         from '../../../../constants'
import StatusComponent                from './common/StatusComponent'
import {processErrorGraphQL}          from '../../../../../apollo'
import {FOCUS_ID}                     from '../../../../constants/FocusElementIDs'
import DivExternalKeyboardRoot        from '../../../../../components/hooks/DivParentExternalKeybardRoot'
import { openDialogCalculationPrint } from '../../pdf/Pdf'

const CalculationForm = ({calculationId} : { calculationId : string }) => {

  const [headerState, setHeaderState] : [boolean, (r : boolean) => void] = useState(true as boolean)

  const [mutationUpdateCalculation, {loading: mutationLoading}] = useUpdateCalculationMutation()
  const {removeTab} = useCalculationTabs()
  const {calculation, calculationLoading, calculationItemUpdate, calculationItemDelete, bookCalculation, validCalculation, saveCalculation, editCalculation, recalculateCalculation} = useCalculationForm(calculationId, true)

  const {setButtonsForPage, clearButtonsForPage} = useAppBar()
  
  const openDialogChangeHeader = ({fieldFocus,focusId}:{fieldFocus ?: string,focusId?:string}) => {
    openDialogCalculationHeaderForm({
      handlerSuccess: handlerUpdateCalculationHeader,
      calculationId,
      fieldFocus,
      focusId
    })
  }
  
  const validEditButton = React.useMemo(() => {
    if ((calculation as any).status === CONSTANT_CALCULATION.STATUS.BOOKED || (calculation as any).status === CONSTANT_CALCULATION.STATUS.VOID) {
      return []
    }
    if ((calculation as any).status === CONSTANT_CALCULATION.STATUS.OPENED) {
      return [
        {
          label: 'test',
          color: 'primary',
          icon: faCheckDouble,
          shortcut: KeyboardEventCodes.F9,
          onClick: () => handlerValidate()
        },
        {
          label: 'recalc',
          color: 'success',
          icon: faCheckDouble,
          shortcut: KeyboardEventCodes.F10,
          onClick: () => handlerRecalculate()
        },
        {
          label: 'save',
          icon: faSave,
          color: 'primary',
          shortcut: KeyboardEventCodes.F11,
          onClick: () => handlerOnSave()
        }
      ]
    }
    if ((calculation as any).status === CONSTANT_CALCULATION.STATUS.VALIDATE) {
      return [
        {
          label: 'edit',
          color: 'success',
          icon: faPencilAlt,
          shortcut: KeyboardEventCodes.F10,
          onClick: () => handlerEditCalculation()
        },
        {
          label: 'save',
          icon: faSave,
          color: 'primary',
          shortcut: KeyboardEventCodes.F11,
          onClick: () => handlerOnSave()
        }
      ]
    }
    return [
      {
        label: 'edit',
        color: 'success',
        icon: faPencilAlt,
        shortcut: KeyboardEventCodes.F11,
        onClick: () => handlerEditCalculation()
      },
    ]
  }, [calculation])

  const headerPreviewButtons = React.useMemo(() => {
    const arr = [
      {
        label: 'Print',
        icon: faPrint,
        shortcut: KeyboardEventCodes.F8,
        classNames: 'mr-5',
        onClick: () => openDialogCalculationPrint({
          calculationId,
          tableSettings: []
        })
      },
      {
        label: 'Preview',
        icon: faSearch,
        shortcut: KeyboardEventCodes.F7,
        onClick: () => openDialogPreviewCalculation({
          calculationId
        })
      }
    ]

    if ((calculation as any).status === CONSTANT_CALCULATION.STATUS.OPENED) {
      arr.push({
        label: 'Header',
        icon: faFileInvoice,
        shortcut: KeyboardEventCodes.F4,
        onClick: () => openDialogChangeHeader({})
      } as any)
    }
    return arr.reverse()
  }, [calculation, calculationId])

  useEffect(() => {
    const id = setButtonsForPage([
      ...headerPreviewButtons as any,
      ...validEditButton as any,
      {
        label: 'book',
        icon: faBook,
        color: 'primary',
        shortcut: KeyboardEventCodes.F12,
        onClick: () => handlerOnSubmit()
      },
    ])
    return () => clearButtonsForPage(id)
  }, [setButtonsForPage, clearButtonsForPage, calculation])

  const currentItemPosition = React.useMemo(() => !calculation || !(calculation as any).items || ((calculation as any).items as any).length === 0 ? 1 : Number([...(calculation as any).items].reverse()[0].posNumber) + 1, [calculation])

  const handlerUpdateCalculationHeader = async (calculation ?: any) => {
    await mutationUpdateCalculation({
      variables: {
        id: Number(calculationId),
        data: calculation
      }
    })
  }

  const handlerBookCalculation = async () => {
    await bookCalculation().then((v) => {
      removeTab(calculationId)
    })
  }

  const handlerSaveCalculation = () => {
    saveCalculation()
      .then()
      .catch(e => {
        processErrorGraphQL(e)
      })
  }

  const handlerEditCalculation = () => {
    editCalculation()
      .then()
      .catch(e => {
        processErrorGraphQL(e)
      })
  }

  const handlerValidate = () => {
    validCalculation()
      .then()
      .catch(e => {
        processErrorGraphQL(e)
      })
  }

  const handlerRecalculate = () => {
    recalculateCalculation()
      .then()
      .catch(e => {
        processErrorGraphQL(e)
      })
  }

  const handlerOnSave = () => {
    openDialogSaveCalculation({
      actionConfirm: handlerSaveCalculation
    })
  }

  const handlerOnSubmit = () => {
    openDialogBookCalculation({
      actionConfirm: handlerBookCalculation
    })
  }

  const handlerOpenCloseHeader = () => {
    setHeaderState(!headerState)
  }

  return (
    <DivExternalKeyboardRoot className={'d-flex flex-column justify-content-between p-2 calculation-form-root'}>
      {mutationLoading || calculationLoading ? <SpinnerLoadingCenter/> : <></>}
      <StatusComponent status={(calculation as any).status}/>
      <div className={'d-flex flex-column hw-calculation-form-div flex-2'}>
        <div className={'border-bottom border-light-0 pt-1'}>
          <Header calculation={calculation} state={headerState} handlerOpenCloseHeader={handlerOpenCloseHeader} changeHeaderDialog={openDialogChangeHeader}/>
        </div>
        {
          ((calculation as any).status === CONSTANT_CALCULATION.STATUS.OPENED) ?
            <div className={'d-flex justify-content-center align-items-center background-grey pr-3 mb-2'}>
              <InsertForm currentPosition={currentItemPosition} calculation={calculation}/>
            </div>
            : <>&nbsp;</>
        }
        <div className={'d-flex flex-column w-100 flex-2'}>
          <ItemsTable
                        calculation={calculation}
                        updateItem={calculationItemUpdate}
                        deleteItem={calculationItemDelete}
                        headerState={headerState}
          />
        </div>

      </div>
    </DivExternalKeyboardRoot>
  )
}

export default CalculationForm

interface IOpenDialogDueDateProps {
  handlerSuccess : (dueDate : IDueDateRecord) => void,
  state : IHeaderDocumentState
}

export const openDialogDueDate = ({handlerSuccess, state} : IOpenDialogDueDateProps) => {
  EasyDialogApolloProvider((closeDialog : () => any, openDialog : (data : any) => any) => {
    openDialog(<DialogModalRootComponent closeFn={closeDialog} name={'calculation-dialog-due-date-89r784573298457382'}>
      <CenteredDialog
                closeAction={closeDialog}
                Component={DueDateForm}
                componentRenderProps={{
                  closeDialog: closeDialog,
                  successFunction: handlerSuccess,
                  state
                }}
      />

    </DialogModalRootComponent>)
  },FOCUS_ID.CALCULATION.DOCUMENT_FORM.DUE_DATE_BUTTON)
}

export interface IDialogPreviewCalculationProps {
  calculationId : string
  actionConfirm ?: () => void
}

export const openDialogPreviewCalculation = (props : IDialogPreviewCalculationProps) => {
  EasyDialogApolloProvider((closeDialog : () => any, openDialog : (data : any) => any) => {
    openDialog(<DialogModalRootComponent name={'dialog-calculation-preview-5487512'} closeFn={closeDialog}>
      <CenteredDialog
                title={'Calculation preview'}
                closeAction={closeDialog}
                Component={Preview}
                componentRenderProps={{
                  closeDialog: closeDialog,
                  ...props
                }}
      />
    </DialogModalRootComponent>)
  })
}

export const openDialogBookCalculation = ({actionConfirm} : { actionConfirm : () => void }) => {
  EasyDialogApolloProvider((closeDialog : () => any, openDialog : (data : any) => any) => {
    const Component = () => {
      const messages : string[] = React.useMemo(() => [
        'Are you sure you want to book a calculation? ',
        'You cannot change the data in the calculation.'
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
    openDialog(<DialogModalRootComponent name={'dialog-calculation-book-1564896a4d84a'} closeFn={closeDialog}>
      <CenteredDialog
                title={'BOOK CALCULATION'}
                closeAction={closeDialog}
                Component={Component}
      />
    </DialogModalRootComponent>)
  })
}

export const openDialogSaveCalculation = ({actionConfirm} : { actionConfirm : () => void }) => {
  EasyDialogApolloProvider((closeDialog : () => any, openDialog : (data : any) => any) => {
    const Component = () => {
      const messages : string[] = React.useMemo(() => [
        'Are you sure you want to save a calculation? '
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
    openDialog(<DialogModalRootComponent name={'dialog-calculation-save-45387400212'} closeFn={closeDialog}>
      <CenteredDialog
                title={'SAVE CALCULATION'}
                closeAction={closeDialog}
                Component={Component}
      />
    </DialogModalRootComponent>)
  })
}

