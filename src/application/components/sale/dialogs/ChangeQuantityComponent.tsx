import React, {
  useCallback,
  useEffect
}                              from 'react'
import Fab                     from '../../../../components/Button/Fab'
import {
  faMinus,
  faPlus
}                              from '@fortawesome/free-solid-svg-icons'
import ButtonsForm             from '../../../../components/Button/ButtonsForm'
import InputTextWithValidation from '../../../../components/withValidation/InputTextWithValidation'
import {
  FORMAT_QUANTITY_STANDARD,
  useValidation
}                              from '../../../../validation'
import { useReceipt }          from '../../../../store/receipt/useReceipt'
import {
  IUseOptimizeEventData,
  useOptimizeEventClick
}                              from '../../../../components/hooks/useOptimizeEventClick'
import {
  formatQuantity,
  toNumberFixed
}                              from '../../../utils/Utils'
import {
  DialogModalRootComponent,
  EasyDialogApolloProvider
}                              from '../../../../components/EasyModel/EasyModal'
import { CenteredDialog }      from '../../../../components/Dialog/DialogBasic'
import {
  KeyboardEventCodes,
  useExternalKeyboard
}                              from '../../../../components/hooks/useExternalKeybaord'

export interface IChangeQuantityModel {
  quantity : string
}

export interface IChangeQuantityComponentProps {
  id : string
  closeDialog ?: () => void
}

const  ChangeQuantityComponent = ({id, closeDialog} : IChangeQuantityComponentProps) => {
  const {receipt,receiptEditItem} = useReceipt()
    
  const item : any = React.useMemo(() => receipt.items.find(x => x.id === id), [id,receipt])
  const validation = useValidation<IChangeQuantityModel>({
    initialData: {
      quantity:`${formatQuantity(item && item.quantity ? item.quantity : 1)}`
    }
  })

  const { state, setFieldValue } = validation
  useEffect(() => {
    if (!item) {
      return 
    }
    const qty = `${item.quantity}`
    setFieldValue('quantity',`${formatQuantity(qty)}`,false)
  },[item, setFieldValue])

  const incDecrement = useCallback((increment ?: boolean) => {
    let value = toNumberFixed(state.quantity)
    if (increment) {
      value += 1
    } else {
      value < 2 ? value = 1 : value -= 1
    }
    const finale = value
    setFieldValue('quantity', `${formatQuantity(finale)}`, true)
  },[setFieldValue,state.quantity])

  const {onClickHandler} = useOptimizeEventClick({
    eventHandler (data : IUseOptimizeEventData) {
      if (data.action === 'quantity-decrement') {
        incDecrement()     
      }
        
      if (data.action === 'quantity-increment') {
        incDecrement(true)
      }
    }
  })  
    
  const handlerOnSubmit = async () => {
    const {error, data} = await validation.validate()
    if (error) {
      return
    }
    receiptEditItem(id,'quantity', data.quantity)
    closeDialog && closeDialog()
  }

  const handlerCancel = () => {
    closeDialog && closeDialog()
  }

  const {setRef} = useExternalKeyboard((e : KeyboardEvent) => {
    switch (e.key) {
      case KeyboardEventCodes.F12:
        handlerOnSubmit()
        break
      case KeyboardEventCodes.Esc: 
        handlerCancel()
        break
      default: break
    }
  }, true, [], 'sale-change-quantity-dialog')
  
  return (
    <>
      <div className={'d-flex align-items-center container justify-content-around col-md-12 hw-change-quantity-component-root'} onClick={onClickHandler} data-action-root ref={setRef}>
        <div className={'button-effect icon-shadow '} data-action={'quantity-decrement'}>
          <Fab
             icon={faMinus}
             size={'lg'}
             color={'danger'}
             disabled={Number(state.quantity) < 2}
          />
        </div>
        <div className={'d-flex col-md-6'}>
          <InputTextWithValidation
                        fontSize={'large-input-font'}
                        label={'Quantity'}
                        helperText={'enter quantity'}
                        align={'align-right'}
                        focusOnMount
                        selectOnFocus
                        validation={{
                          useValidation: validation,
                          model: 'quantity',
                          format: {
                            rule: FORMAT_QUANTITY_STANDARD,
                            validationMessage: 'Enter valid quantity'
                          }
                        }}
          />
        </div>
        <div className={'d-flex col-3 p-0 button-effect icon-shadow'} data-action={'quantity-increment'}>
          <Fab

                        icon={faPlus}
                        size={'lg'}
                        color={'primary'}
                        data-type={'inc'}
                      
          />
        </div>

        <div className={'col-md-12 p-3'}>
          <ButtonsForm
              buttonsCancel={{
                label: 'CANCEL',
                action: handlerCancel
              }}
              buttonSubmit={{
                label: 'CHANGE',
                action:handlerOnSubmit
              }}
          />
        </div>
      </div>
    </>
  )
}

export default ChangeQuantityComponent

export const openDialogEditQuantity = (id : string) => {
  EasyDialogApolloProvider((closeDialog : () => any, openDialog : (data : any) => any) => {

    const Component = () => {
      const ComponentToRender = () => {
        return (
          <ChangeQuantityComponent
                id={id}
                closeDialog={closeDialog}
          />
        )
      }
      return (
        <DialogModalRootComponent name={'dialog-receipt-item-edit-quantity-425632201520052801'} closeFn={closeDialog}>
          <CenteredDialog
                title={'Change Quantity'}
                closeAction={closeDialog}
                Component={ComponentToRender}

          />
        </DialogModalRootComponent>
      )
    }
    openDialog(<Component/>)
  })
}