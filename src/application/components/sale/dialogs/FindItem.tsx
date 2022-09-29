import React, {
  useEffect,
  useRef,
  useState
}                                  from 'react'
import {queryVariablesForItems}    from '../../../../graphql/variablesQ'
import {SearchInput}               from '../../../../components/InputText'
import Table                       from '../../../../components/Table/Table'
import {SALE_FIND_ITEM_TABLE_NAME} from '../../../constants'
import {InputTextEditorCurrency}   from '../../../../components/Table/editors/InputTextEditor'
import {formatPrice}               from '../../../utils/Utils'
import {useItemsQuery}             from '../../../../graphql/graphql'
import {SpinnerLoadingCenter}      from '../../../../components/Spinner/SpinnerLoading'
import {
  DialogModalRootComponent,
  EasyDialogApolloProvider
}                                  from '../../../../components/EasyModel/EasyModal'
import {CenteredDialog}            from '../../../../components/Dialog/DialogBasic'
import {useReceipt}                from '../../../../store/receipt/useReceipt'
import {Button}                    from '../../../../components/Button'
import {
  KeyboardEventCodes,
  useExternalKeyboard
}                                  from '../../../../components/hooks/useExternalKeybaord'
import useSellingKeyboard          from '../../../hooks/useSellingKeyboard'

interface IFindItemProps {
  closeDialog ?: () => void
  quantity ?: number
  resetKeyboardState ?: () => void
}

export const findItemTable = [
  {
    label: 'Name',
    field: 'shortName',
    cell: {
      classes: ['text-left'],
    }
  },
  {
    label: 'BarCode',
    field: 'barCode',
  },
  {
    label: 'Code',
    field: 'code',
  },
  {
    label: 'Price',
    field: 'vp',
    cell: {
      editor: {
        render: InputTextEditorCurrency
      },
      classes: ['text-right'],
      format: (value : string) => {
        return formatPrice(value)
      }
    }
  }
]

const FindItem = ({closeDialog,quantity,resetKeyboardState} : IFindItemProps) => {
  const [searchString, setSearchString] : [string, (s : string) => void] = useState('')
  const tableRoot = useRef(null)
  const inputRef = useRef(null)

  const {receiptAddItemById} = useReceipt()

  const queryVariables = React.useMemo(() => queryVariablesForItems(searchString, 20), [searchString])

  const {loading, data: items} = useItemsQuery({
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'network-only',
    variables: queryVariables
  })
  const _items = React.useMemo(() => (!items || !items.data || !items.data.items) ? [] : items.data.items, [items])

  const handlerSearch = (value : string) => {
    setSearchString(value)
  }

  const handlerCloseFunction = () => {
    setTimeout(() => {
      resetKeyboardState && resetKeyboardState()
      closeDialog && closeDialog()
    }, 50)
  }

  const handlerDataEventClick = React.useCallback((event : any, id : any, action : any, param : any) => {

    if ((action === 'table-cell-edit' || action === 'table-row-selected') && id) {
      receiptAddItemById(id,quantity).then()
      handlerCloseFunction()
      return
    }
  }, [receiptAddItemById, resetKeyboardState, closeDialog])

  const {setRef} = useExternalKeyboard((event : KeyboardEvent) => {

    switch (event.key) {
      default:
        (inputRef.current as any).focus()
        return
      case KeyboardEventCodes.Esc:
        handlerCancel()
        return

      case KeyboardEventCodes.ArrowDown:
                (tableRoot.current as any)?.getElementsByClassName('hw-table-root-ancestor')[0].focus()
    }

  }, true)

  useEffect(() => {
    setTimeout(() => (inputRef as any).current.focus(), 10)
  }, [])

  const handlerCancel = () => {
    closeDialog && closeDialog()
  }

  return (
    <>
      {loading ? <SpinnerLoadingCenter/> : <></>}
      <div className={'hw-sale-find-item-root relative d-flex flex-column justify-content-between py-1 px-3 font-smaller-2'} ref={setRef}>
        <div className={'d-flex flex-column align-content-stretch  align-items-center pb-3'}>
          <div className={'d-flex flex-grow-1 col-md-5 px-2'}>
            <SearchInput
                            inputRef={inputRef}
                            handlerSearch={handlerSearch}
                            placeholder={'eg_ 8988 art'}
                            label={''}
                            fullWidth
                            helperText={'barcode / code / name '}
            />
          </div>
        </div>
        <div ref={tableRoot} className={'w-100 flex-1'}>
          <Table

                        handlerEventDataClick={handlerDataEventClick}
                        header={findItemTable}
                        separator={'cell'}
                        data={_items}
                        tableName={SALE_FIND_ITEM_TABLE_NAME}
          />
        </div>
        <div className={'d-flex justify-content-center pt-3 pb-2'}>
          <Button
                        style={{maxWidth: 80}}
                        classNames={'hw-form-button-root'}
                        label={'CLOSE'}
                        onClick={handlerCancel}
                        outline
                        color={'danger'}
          />
        </div>
      </div>
    </>
  )
}

export default FindItem

export const openDialogFindItem = ({quantity,resetKeyboardState} : {quantity ?: number,resetKeyboardState ?: () => void}) => {
  EasyDialogApolloProvider((closeDialog : () => any, openDialog : (data : any) => any) => {
    const Component = () => {
      const ComponentToRender = () => {
        return (
          <FindItem closeDialog={closeDialog} quantity={quantity} resetKeyboardState={resetKeyboardState}/>
        )
      }
      return (
        <DialogModalRootComponent name={'dialog-receipt-find-item-132453873877'} closeFn={closeDialog}>
          <CenteredDialog
                        title={'Find item'}
                        closeAction={closeDialog}
                        Component={ComponentToRender}
          />
        </DialogModalRootComponent>
      )
    }
    openDialog(<Component/>)
  })
}
