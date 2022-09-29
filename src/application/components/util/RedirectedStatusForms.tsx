import React                    from 'react'
import {DialogMessageComponent} from '../../../components/Dialog/DialogBasic'

interface IRedirectedStatusFormsProps {
  link : string,
  redirectLink : string,
  redirectLayout : string
  title : string,
  text : string,
  sub : string
}

const RedirectedStatusForm = ({title, link, sub, text, redirectLink, redirectLayout} : IRedirectedStatusFormsProps) => {

    /*  const {setRedirectLink, redirectLink: redirectedLinkObject} = useApplication()
      useEffect(() => {
        const reg = new RegExp(`.*${link}$`)
        if (!redirectedLinkObject || !reg.exec(redirectedLinkObject)) {
          setRedirectLink(`/${APPLICATION_MAIN_SUB_DOMAIN}/${redirectLayout}/${redirectLink}`)
        }
      }, [redirectedLinkObject, link, redirectLayout, redirectLink, setRedirectLink])*/

  return (
    <DialogMessageComponent
            title={title}
            text={text}
            sub={sub}
    />
  )
}
export default RedirectedStatusForm
