import React      from 'react'
import EmptyTag   from '../../../components/Util/EmptyTag'
import {TAddress} from '../../../graphql/type_logic/types'

const AddressTag = ({address} : { address : TAddress }) => {

  return (
    <div>
      <sub className={'pb-1 opacity-3 text-underline'}>address:</sub>
      <div className={'d-flex flex-column px-1'}>
        <div><EmptyTag model={address} field={'street'}/></div>
        <div className={'d-flex flex-row'}>
          <div><EmptyTag model={address} field={'city'}/></div>
          <div className={'px-2'}><EmptyTag model={address} field={'zipCode'}/></div>
          <div><EmptyTag model={address} field={'state'}/></div>
        </div>
      </div>
    </div>
  )
}

export default AddressTag
