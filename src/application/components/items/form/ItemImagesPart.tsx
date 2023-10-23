import React, {
  useMemo,
  useRef,
  useState
}                              from 'react'
import itemPlaceholder         from '../../../../assets/images/item-placeholder.png'
import {FontAwesomeIcon}       from '@fortawesome/react-fontawesome'
import {faUpload}              from '@fortawesome/free-solid-svg-icons'
import DivExternalKeyboardRoot from '../../../../components/hooks/DivParentExternalKeybardRoot'

interface IItemImagesPartProps {
  imagesTmp?: string[]
  onClick: (e: any) => void
  onChange: (image: any) => void
}

const ItemImagesPart = ({imagesTmp, onChange, onClick}: IItemImagesPartProps) => {
  const [file, setFile]: [string, (f: string) => void] = useState('')
  const fileInput = useRef(null)

  const handlerOnClick = () => {
    fileInput && (fileInput.current as any).click()
  }

  const _onChange = ({
    target: {
      validity,
      files: [file],
    },
  }: any) => {
    validity.valid && onChange(file)
    setFile('')
  }

  const image = useMemo(() => imagesTmp && imagesTmp.length !== 0 ? imagesTmp[0] : itemPlaceholder, [imagesTmp])

  return (
    <DivExternalKeyboardRoot className={'d-flex flex-column align-items-center hw-item-image-part w-100'}>
      <div className={'hw-item-title'}>Image</div>
      <div className={'pt-2 hw-item-image-upload'}>
        <div className={'circle'}>
          <img className={'logo-image'} src={image}/>
        </div>
        <div className={'upload-button cursor-pointer'} onClick={handlerOnClick}>
          <FontAwesomeIcon className={'font-bigger-1'} icon={faUpload}/>
          <input
                        ref={fileInput}
                        value={file ? file : ''}
                        onClick={onClick}
                        onChange={_onChange}
                        onBlur={onClick}
                        type={'file'}
                        className={'d-none'}
          />
        </div>
      </div>
    </DivExternalKeyboardRoot>
  )
}

export default ItemImagesPart