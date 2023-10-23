import React             from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faTimesCircle}   from '@fortawesome/free-solid-svg-icons/faTimesCircle'
import {faPencilAlt}     from '@fortawesome/free-solid-svg-icons'
import SaleTableRow      from './SaleTableRow'
import {useReceipt}      from '../../../../store/receipt/useReceipt'
import {IReceiptItem}    from '../../../../store/receipt/type'
import {CONSTANT_SALE}   from '../../../constants'

const SaleTable = () => {
  const {receipt} = useReceipt()
  const itemReceipts = React.useMemo(() => receipt && receipt.items ? receipt.items : [], [receipt])
  return (
      
    <>
      <div className={'d-flex flex-fill flex-column'}>
        <div className={'d-flex col-md-12 py-1 px-0 border color-primary font-weight-500 text-shadow-white hw-sale-table-header'}>
          <div className={'col-7 pl-2'}>
            <div className={'d-flex justify-content-start text-upper align-items-center'}>
              <div className={'pl-1 pr-2 cursor-pointer d-flex align-items-center color-danger '}
                   data-action={CONSTANT_SALE.EVENTS.SALE_CLEAR_RECEIPT}      
              >
                <FontAwesomeIcon icon={faTimesCircle}/>
                <div className={'px-1 font-smaller-2 text-upper'}>
                  <small>clear receipt F2</small>
                </div>
              </div>
              <div className={'text-center flex-fill font-smaller-3 '}>Description</div>
              <div className={'font-smaller-5  font-weight-600 letter-spacing-2'}>BarCode</div>
            </div>
          </div>
          <div className={'col-5 container px-0 text-upper'}>
            <div
                        className={'col-5 d-flex justify-content-center align-items-center border-left border-right '}>
              <div className={'d-flex flex-fill justify-content-center font-smaller-3'}> Price</div>
              <div className={'pl-2 font-smaller-3'}>
                <FontAwesomeIcon className={'opacity-5 font-smaller-3'} icon={faPencilAlt}/>
              </div>
            </div>

            <div className={'col-7'}>
              <div className={'d-flex justify-content-start text-upper'}>
                <div className={'font-smaller-5 pt-1 font-weight-600 font-smaller-3 letter-spacing-2'}>Quantity</div>
                <div className={'pl-2  font-smaller-3 pt-1'}>
                  <FontAwesomeIcon className={'opacity-5'} icon={faPencilAlt}/>
                </div>
                <div className={'text-right  flex-fill font-smaller-2'}>Total</div>

              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={'border-right border-left table-body overflow-y'}>
        <div className={'h-100 w-100'}>
          {itemReceipts.map((item : IReceiptItem, key : number) => {
            return <SaleTableRow key={key} itemReceipt={item} index={key}/>
          })
          }
        </div>
      </div>
    </>
  )
}

export default SaleTable