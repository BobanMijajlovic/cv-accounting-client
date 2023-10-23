import React          from 'react'
import GeneralDetails from './GeneralDetails'

const UserInfo = () => {
  return (
    <div className={'d-flex flex-column w-100 '}>
      <div className={'d-flex flex-row flex-fill'}>
        <div className={'user-tabs-general-details mr-5'}>
          <GeneralDetails/>
        </div>
        <div className={'w-75'}>

        </div>
      </div>
    </div>
  )
}

export default UserInfo
