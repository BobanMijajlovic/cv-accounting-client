import React, {
  useEffect,
  useRef
}                              from 'react'
import ButtonsForm             from '../../../../components/Button/ButtonsForm'
import KeyboardDefault         from '../../keyboard/KeyboardDefault'
import {
  formatPrice,
  toNumberFixed
}                              from '../../../utils/Utils'
import { useReceipt }          from '../../../../store/receipt/useReceipt'
import {
  FORMAT_CURRENCY_STANDARD,
  useValidation
}                              from '../../../../validation'
import InputTextWithValidation from '../../../../components/withValidation/InputTextWithValidation'
import {
  DialogModalRootComponent,
  EasyDialogApolloProvider
}                              from '../../../../components/EasyModel/EasyModal'
import { CenteredDialog }      from '../../../../components/Dialog/DialogBasic'
import {
  KeyboardEventCodes,
  useExternalKeyboard
}                              from '../../../../components/hooks/useExternalKeybaord'
import usePaymentKeyboard      from '../../../hooks/usePaymentKeyboard'
import {
  IUseOptimizeEventData,
  useOptimizeEventClick
}                              from '../../../../components/hooks/useOptimizeEventClick'

export interface IChangePriceComponentProps {
  id : string
  closeDialog : () => void
}
interface IChangePrice {
  price : string
}

const ChangePriceComponent = ({id,closeDialog} : IChangePriceComponentProps ) => {

  const inputRef = useRef(null)
  const {receipt,receiptEditItem} = useReceipt()
  const item : any = React.useMemo(() => receipt.items.find(x => x.id === id), [receipt, id])
  const {displaysKeyboardActivity,_processKeyEvent} = usePaymentKeyboard({processedKeyboardString: item && `${formatPrice(item.price)}`})

  const validation = useValidation<IChangePrice>()
  const { setFieldValue } = validation
  useEffect(() => {
    setFieldValue('price',`${displaysKeyboardActivity.line1.length !== 0 ? displaysKeyboardActivity.line1 : '0'}`,false)
  },[item, displaysKeyboardActivity, setFieldValue])
 
  const handlerOnSubmit =  () => {
   /* const {error, data} = await validation.validate()
    if (error) {
      return
    }*/
    const value = displaysKeyboardActivity.line1
    if (Number(value) < 0.01) {
      validation.setFieldError('price','Price must be greater then 0.01')
      return
    }
    if (value && value.length !== 0) {
      receiptEditItem(id, 'price',toNumberFixed(value))
    }
    closeDialog()
  }

  const {setRef} = useExternalKeyboard((e : KeyboardEvent) => {
    switch (e.key) {
      case KeyboardEventCodes.F12:
        handlerOnSubmit()
        break
      case KeyboardEventCodes.Esc:
        closeDialog()
        break
      default:
        _processKeyEvent(e.key.toLowerCase())
        inputRef && (inputRef.current as any).focus()
        break
    }
  }, true, [], 'sale-change-price-dialog')

  const {onClickHandler} = useOptimizeEventClick({
    eventHandler (data : IUseOptimizeEventData) {
      _processKeyEvent((data as any).id)
    }
  })

  return (
    <div style={{minWidth: 700}} className={'d-flex flex-fill flex-column p-3'} ref={setRef}>
      <div className={'d-flex flex-row justify-content-around align-items-center'}>
        <div style={{minHeight: 280}}
            className={'d-flex flex-column col-md-7 justify-content-center align-items-center pb-2'}>
          <div className={'d-flex flex-fill justify-content-end align-self-center align-items-center color-primary font-weight-400 mx-2 font-bigger-12 round-md pt-2 pl-4 pr-1 mr-3 w-75'}>
            <InputTextWithValidation
                inputRef={inputRef}
                required
                label={''}
                useLabel={false}
                helperText={''}
                classNames={'lined-version font-bigger-6'}
                fullWidth
                focusOnMount
                maxLength={14}
                align={'align-right'}
                validation={{
                  useValidation: validation,
                  model: 'price',
                  format: {
                    rule: FORMAT_CURRENCY_STANDARD,
                    validationMessage: 'Enter valid value',
                  }
                }}
            />
          </div>

          <div>
            <ButtonsForm
                            buttonsCancel={{
                              label: 'CANCEL',
                              action: closeDialog
                            }}
                            buttonSubmit={{
                              label: 'CHANGE',
                              action: handlerOnSubmit
                            }}
            />
          </div>
        </div>
        <div className={'col-md-5 justify-content-center'} data-action-root onClick={onClickHandler} >
          <KeyboardDefault />
        </div>
      </div>

    </div>

  )
}

export default ChangePriceComponent

export const openDialogEditPrice = (id : string) => {
  EasyDialogApolloProvider((closeDialog : () => any, openDialog : (data : any) => any) => {

    const Component = () => {
      const ComponentToRender = () => {
        return (
          <ChangePriceComponent
                id={id}
                closeDialog={closeDialog}
          />
        )
      }
      return (
        <DialogModalRootComponent name={'dialog-receipt-item-edit-price-21392q7521l'} closeFn={closeDialog}>
          <CenteredDialog
                title={'Change price'}
                closeAction={closeDialog}
                Component={ComponentToRender}

          />
        </DialogModalRootComponent>
      )
    }
    openDialog(<Component/>)
  })
}
