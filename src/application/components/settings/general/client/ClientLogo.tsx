import React, {
  useRef,
  useState
} from 'react'
import { faUpload }        from '@fortawesome/free-solid-svg-icons'
import logoPlaceholder     from '../../../../../assets/images/circle-placeholder.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useClient }       from '../../../../../store/client/useClient'

const ClientLogo = ({img}: { img?: string|null|undefined }) => {
  const [file,setFile] : [string,(f:string)=> void] = useState('')
  const {uploadLogo} = useClient()
  const fileInput = useRef(null)

  const handlerOnClick = () => {
    fileInput && (fileInput.current as any).click()
  }

  const _onChange = ({
    target:{
      validity,
      files:[file],
    },
  }: any) => {
    validity.valid && uploadLogo({variables:{file}}).then(() => {
      setFile('')
    })
  }

  return (
    <div className={'hw-client-logo-upload'}>
      <div className={'font-smaller-3'}>UPLOAD LOGO</div>
      <div className={'circle'}>
        <img className={'logo-image'} src={img ? img : logoPlaceholder}/>
      </div>
      <div className={'upload-button cursor-pointer'} onClick={handlerOnClick}>
        <FontAwesomeIcon className={'font-bigger-1'} icon={faUpload}/>
        <input
                    ref={fileInput}
                    value={file ? file : ''}
                    onChange={_onChange}
                    type={'file'}
                    className={'d-none'}
        />
      </div>
    </div>
  )
}

export default ClientLogo