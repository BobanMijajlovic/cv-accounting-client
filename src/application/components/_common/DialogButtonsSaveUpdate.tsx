import React                      from 'react'
import ButtonsForm                from '../../../components/Button/ButtonsForm'
import { IconProp }               from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon }        from '@fortawesome/react-fontawesome'
import { useTranslationFunction } from '../../../components/Translation/useTranslation'
import DivExternalKeyboardRoot    from '../../../components/hooks/DivParentExternalKeybardRoot'

interface IDialogButtonsSaveUpdateProps<T> {
  cancelFun : () => void
  submitFun : () => void
  submitBtnLabel ?: string
  update ?: boolean
  icon ?: IconProp
  classNames ?: string
  iconClassNames ?: string
  cancelBtnLabel ?: string
}

const DialogButtonsSaveUpdate = <T extends any>({update, cancelFun, submitFun, icon, cancelBtnLabel, submitBtnLabel, classNames,iconClassNames} : IDialogButtonsSaveUpdateProps<T>) => {
  const {translate} = useTranslationFunction()

  return (
    <DivExternalKeyboardRoot className={`pt-4${classNames ? ` ${classNames}` : ''}`}>
      <ButtonsForm
                buttonsCancel={{
                  classNames: 'text-upper',
                  label: cancelBtnLabel ? cancelBtnLabel : translate('BUTTON_CANCEL'),
                  action: cancelFun
                }}
                buttonSubmit={{
                  classNames: 'text-upper',
                  label: !update ? !submitBtnLabel ? translate('BUTTON_SAVE') : submitBtnLabel : translate('BUTTON_UPDATE'),
                  action: submitFun
                }}
      />
      {
        icon ? <FontAwesomeIcon className={`color-primary form-icon-opacity-view${iconClassNames ? ` ${iconClassNames}` : ''}`} icon={icon}/> : null
      }
    </DivExternalKeyboardRoot>
  )
}

export default DialogButtonsSaveUpdate
