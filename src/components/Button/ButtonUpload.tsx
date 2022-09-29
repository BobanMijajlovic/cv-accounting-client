import React, {
  ChangeEvent,
  useRef
}                          from 'react'
import { IButtonProps }    from './Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUpload }        from '@fortawesome/free-solid-svg-icons'

type TButtonUploadProps = IButtonProps  & {
  onChange ?: (e: ChangeEvent<HTMLInputElement>) => void
}

type TIconButtonUploadProps =  IButtonProps  & {
  onChange ?: (e: ChangeEvent<HTMLInputElement>) => void
  label ?: string
}

const ButtonUpload = ({value, label, color, size, outline, fullWidth, classNames, glossy, disabled, onChange,icon }:TButtonUploadProps) => {

  const fileInput = useRef(null)

  const _onChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange && onChange(event)
  }
  const btnClass = React.useMemo(() => {
    return `btn${color ? ` ${color}` : ''}${size ? ` ${size}` : ''}${fullWidth ? ' full-width' : ''}${outline ? ' outline' : ''}${glossy ? ' glossy' : ''}${disabled ? ' hw-disabled' : ''}${classNames ? ` ${classNames}` : ''}`
  }, [fullWidth, color, size, outline, glossy,disabled, classNames])

  return (
    <div className={'button-upload-root'}>
      <input
                ref={fileInput}
                value={value}
                onChange={_onChange}
                type="file"
                style={{display:'none'}}
      />
      <button className={btnClass} disabled={disabled} onClick={() => (fileInput.current as any).click()}>
        {icon ? <span className={'pr-1'}><FontAwesomeIcon icon={icon} /> </span> : null}
        {label}
      </button>
    </div>
  )
}

ButtonUpload.defaultProps = {
  color: 'primary',
}

export default ButtonUpload

export const IconButtonUpload = ({value, classNames, onChange }:TIconButtonUploadProps) => {

  const fileInput = useRef(null)

  const _onChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange && onChange(event)
  }

  const handlerOnClick = () => {
    console.log('click',fileInput)
    fileInput && (fileInput.current as any).click()
  }

  return (
    <div className={`upload-button cursor-pointer${classNames ? ` ${classNames}` : ''}`} onClick={handlerOnClick}>
      <FontAwesomeIcon className={'font-bigger-1'} icon={faUpload}/>
      <input
                ref={fileInput}
                value={value}
                onChange={_onChange}
                type={'file'}
                accept={'image/*'}
                style={{display:'none'}}
      />
    </div>
  )
}

