import React               from 'react'
import { VatCustomRender } from '../../../../_common/VatRender'
import { TTaxFinance }     from '../../../../../../graphql/type_logic/types'
import { formatPrice }     from '../../../../../utils/Utils'
import { useVats }         from '../../../../../../store/vats/useVats'

const InvoiceTaxRow = ( { invoiceTax, classNames } : { invoiceTax : TTaxFinance, classNames? : string } ) => {
  const { taxId, taxFinance, financeMP } = invoiceTax

  return (
    <div className={ 'd-flex flex-row justify-content-start align-items-center relative font-smaller-1 pt-1 border-bottom' }>
      <div className={ 'px-0 font-weight-bold vats font-smaller-4' }><VatCustomRender value={ taxId as number }/></div>
      <div className={ 'px-0 d-flex flex-row flex-2 justify-content-start align-items-center' }>
        <div className={ 'text-right px-1 flex-1 font-smaller-2 font-weight-bold' }>
          { formatPrice( taxFinance as number ) }
        </div>
        <div className={ 'text-right px-1 flex-1 font-smaller-2 font-weight-bold' }>
          { formatPrice( financeMP as number ) }
        </div>
      </div>
    </div>/*
         <tr className={`w-100 font-smaller-2 border-bottom${classNames ? ` ${classNames}` : ''}`}>
         <td className={'font-smaller-4 pt-1 vats'}><VatCustomRender value={taxId as number}/></td>
         <td className={'text-right flex-1'}>{valueTaxFinance}</td>
         <td className={'text-right flex-1'}>{formatPrice(taxFinance as number)}</td>
         </tr>*/
  )
}

export default InvoiceTaxRow
