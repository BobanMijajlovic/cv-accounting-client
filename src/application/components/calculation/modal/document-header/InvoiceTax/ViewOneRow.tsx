import React                  from 'react'
import {IInvoiceTax}          from '../../DocumentHeaderForm'
import {VatCustomRender}      from '../../../../_common/VatRender'
import {CONSTANT_CALCULATION} from '../../../../../constants'
import {FontAwesomeIcon}      from '@fortawesome/react-fontawesome'
import {faTimes}              from '@fortawesome/free-solid-svg-icons'
import ConditionalRendering   from '../../../../../../components/Util/ConditionalRender'
import {formatPrice}          from '../../../../../utils/Utils'

interface IInvoiceTaxViewRowProps {
  invoiceTax : IInvoiceTax
  index : number
  notShowRemoveButton ?: boolean
  extraAction ?: boolean
}

export const InvoiceTaxViewRow = ({invoiceTax, index,notShowRemoveButton,extraAction} : IInvoiceTaxViewRowProps) => {
  return (
    <tr key={index} className={`border-bottom text-center${index % 2 === 1 ? ' row-odd' : ' row-even'}`}>
      <td style={{width: '20%'}}>
        <div className={'font-smaller-2'}><VatCustomRender value={invoiceTax.taxId}/></div>
      </td>
      <td>
        <div className={'font-smaller-2 text-right'}>{formatPrice(invoiceTax.finance)}&nbsp;</div>
      </td>
      <td>
        <div className={'font-smaller-2 text-right'}>{formatPrice(invoiceTax.financeMP)}&nbsp;</div>
      </td>
      <td style={{width: 50}}>
        <ConditionalRendering condition={!notShowRemoveButton}>
          <div className={'d-flex justify-content-between align-items-center px-2'}>
            <div className={'px-1 button-effect '}
                       data-action={extraAction ? CONSTANT_CALCULATION.EVENTS.HEADER.EXTRA_EXPENSE_TAX_REMOVE : CONSTANT_CALCULATION.EVENTS.HEADER.INVOICE_TAX_REMOVE}
                       data-action-id={index}
            >
              <FontAwesomeIcon className={'color-danger'} icon={faTimes}/>
            </div>
          </div> 
        </ConditionalRendering>
        
      </td>
    </tr>
  )
}
export default InvoiceTaxViewRow

