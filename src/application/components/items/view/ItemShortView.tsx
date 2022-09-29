import React    from 'react'
import EmptyTag from '../../../../components/Util/EmptyTag'
import {TItem}  from '../../../../graphql/type_logic/types'

interface IItemShortViewProps {
  item : TItem
}

const ItemShortView = ({item} : IItemShortViewProps) => {

  return (
    <div className={'text-align-left mt-2'}>
      <div className={'d-flex  flex-column justify-content-center text-align-left'}>
        <div className={'px-1 font-bold text-upper'}><EmptyTag model={item} field={'shortName'} placeholder={'ITEM NAME'}/></div>
        <small className={'px-1'}><EmptyTag model={item} field={'fullName'} placeholder={'Item full name'}/> </small>
      </div>
      <div className={'d-flex  flex-row justify-content-between py-1'}>
        <div className={'d-flex flex-row align-items-center pr-1 font-smaller-4'}>
          <sub className={'opacity-4'}>Barcode&nbsp;:</sub>
          <div className={'px-1 '}><EmptyTag model={item} field={'barCode'} placeholder={'#########'}/>
          </div>
        </div>
        <div className={'d-flex flex-row align-items-center px-1 font-smaller-4'}>
          <sub className={'opacity-4'}>Code&nbsp;:</sub>
          <div className={'px-1'}><EmptyTag model={item} field={'code'} placeholder={'#########'}/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ItemShortView