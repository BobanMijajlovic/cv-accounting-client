import React             from 'react'
import CellDescription   from './cell/CellDescription'
import CellPrice         from './cell/CellPrice'
import CellQuantityTotal from './cell/CellQuantityTotal'
import {IReceiptItem}    from '../../../../store/receipt/type'

const SaleTableRow = ({itemReceipt,index} : { itemReceipt : IReceiptItem,index : number }) => {
  return (
    <>
      <div
          className={'container col-12 border-bottom py-1 my-0 mx-0 px-0 row-style '}>
        <div className={'col-7'}>
          <CellDescription itemReceipt={itemReceipt} index={index + 1}/>
        </div>
        <div className={'col-5 container px-0'}>
          <div className={'col-5 border-left border-right px-2'}>
            <CellPrice itemReceipt={itemReceipt}/>
          </div>
          <div className={'col-7'}>
            <CellQuantityTotal itemReceipt={itemReceipt}/>
          </div>
        </div>
      </div>
    </>
  )
}

export default SaleTableRow