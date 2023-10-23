import React             from 'react'
import {formatPrice}     from '../../../utils/Utils'
import {getTotalFinance} from '../util'
import {useReceipt}      from '../../../../store/receipt/useReceipt'

const TotalComponent = () => {
  const {receipt} = useReceipt()
  const {items} = receipt
  return (

    <div className={'d-flex flex-column align-items-end total-component mr-2'}>
      <div className={'font-weight-300 font-smaller-5 pt-1 '}>TOTAL</div>
      <div className={'align-self-end font-weight-600 font-bigger-6 justify-content-end'}>{formatPrice(getTotalFinance(items))}</div>
    </div>
  )
}

export default TotalComponent