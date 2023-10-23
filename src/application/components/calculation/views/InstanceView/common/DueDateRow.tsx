import React              from 'react'
import {
  formatDateLong,
  formatPrice,
}                         from '../../../../../utils/Utils'
import { IDueDateRecord } from '../../../modal/DocumentHeaderForm'

const DueDateRow = ({ dueDate }: { dueDate: IDueDateRecord }) => {

  return (
    <div className={'d-flex flex-row justify-content-start align-items-center relative font-smaller-1 pt-1 border-bottom'}>
      <div className={'px-0 font-weight-bold'} style={{ width: 80 }}> {formatDateLong(dueDate.date || dueDate.dueDate as string)} </div>
      <div className={'px-0 d-flex flex-row flex-2 justify-content-start align-items-center'}>
        <div className={'text-right px-1 flex-1 font-smaller-2 font-weight-bold'}>
          {formatPrice(dueDate.finance)}
        </div>
      </div>
    </div>
  )
}

export default DueDateRow
