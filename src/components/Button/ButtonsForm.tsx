import React, {useRef}        from 'react'
import {IButtonProps}         from './Button'
import {Button}               from './index'
import {
  KeyboardEventCodes,
  useExternalKeyboard
}                             from '../hooks/useExternalKeybaord'
import {
  required,
  useValidation
}                             from '../../validation'
import {ICheckBoxProps}       from '../CheckBox'
import CheckBoxWithValidation from '../withValidation/CheckBoxWithValidation'
import {guid}                 from '../../application/utils/Utils'

interface IButtonActionProps extends IButtonProps {
  action ?: (e : React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

export interface IButtonsFormProps {
  buttonsCancel : IButtonActionProps
  buttonSubmit : IButtonActionProps
  term ?: ICheckBoxProps
  size ?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12
}

export interface IButtonsFormModel {
  term : boolean
}

const ButtonsForm = ({buttonsCancel, buttonSubmit, term, size} : IButtonsFormProps) => {

  const refOk = useRef(null)
  const refCancel = useRef(null)

  const validation = useValidation<IButtonsFormModel>({
    initialData: {
      term: false
    }
  })

  const handlerOnSubmit = async (e : any) => {
    if (term) {
      const {error} = await validation.validate()
      if (error) {
        return
      }
    }
    buttonSubmit.action && buttonSubmit.action(e as any)
  }

  const {setRef} = useExternalKeyboard((e : KeyboardEvent) => {
    switch (e.key) {
      case KeyboardEventCodes.F12:
        /** this is used for enter event (double calling this)
        /*if (refOk.current !== document.activeElement && refCancel.current !== document.activeElement) {
          handlerOnSubmit(e)
        }*/
        handlerOnSubmit(e).then()
        break
      case KeyboardEventCodes.Esc:
        buttonsCancel.action && buttonsCancel.action(e as any)
        break
    }
  }, true, [KeyboardEventCodes.Esc, KeyboardEventCodes.F12], `buttons-form-${guid()}`)

  return (
    <div className={'d-flex justify-content-center container pt-2'} ref={setRef}>
      <div className={`d-flex flex-column p-0 justify-content-center${size ? ` col-${size}` : ' col-12'}`}>
        {
          term ?
            <div className={'d-flex flex-fill pb-2'}>
              <CheckBoxWithValidation
                                {...term}
                                validation={{
                                  useValidation: validation,
                                  model: 'term',
                                  rule: {
                                    required,
                                    customValidation: (value : boolean) => {
                                      if (!value) {
                                        return true
                                      }
                                      return false
                                    }
                                  }
                                }}
                                classNames={'font-smaller-3'}
              />
            </div> : <></>
        }

        <div className={'d-flex flex-fill justify-content-around'}>
          <div className={'col-md-6'}>
            <Button
                            ref={refOk}
                            classNames={`hw-form-button-root text-upper${buttonSubmit.classNames ? ` ${buttonSubmit.classNames}` : ''}`}
                            label={buttonSubmit.label ? buttonSubmit.label : 'SUBMIT'}
                            onClick={handlerOnSubmit}
                            outline
                            shortcut={'F12'}
                            fullWidth
                            color={buttonSubmit.color ? buttonSubmit.color : 'primary'}
            />
          </div>
          <div className={'col-md-6'}>
            <Button
                            ref={refCancel}
                            shortcut={'esc'}
                            classNames={`hw-form-button-root text-upper${buttonsCancel.classNames ? ` ${buttonsCancel.classNames}` : ''}`}
                            label={buttonsCancel.label ? buttonsCancel.label : 'CANCEL'}
                            onClick={buttonsCancel.action}
                            outline
                            fullWidth
                            color={buttonsCancel.color ? buttonsCancel.color : 'danger'}
            />
          </div>
        </div>

      </div>
    </div>

  )
}

ButtonsForm.defaultProps = {
  size: 12
}

export default ButtonsForm
