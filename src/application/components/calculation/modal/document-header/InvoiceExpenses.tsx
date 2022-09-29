import React                  from 'react'
import {CONSTANT_CALCULATION} from '../../../../constants'
import {FontAwesomeIcon}    from '@fortawesome/react-fontawesome'
import {
  faHandHoldingUsd,
  faTimes
}                           from '@fortawesome/free-solid-svg-icons'
import ButtonShortcut       from '../../../../../components/Button/ButtonShortcut'
import {IInvoiceExpense}    from '../DocumentHeaderForm'
import ConditionalRendering from '../../../../../components/Util/ConditionalRender'
import {VatCustomRender}    from '../../../_common/VatRender'
import {KeyboardEventCodes} from '../../../../../components/hooks/useExternalKeybaord'
import {formatPrice}        from '../../../../utils/Utils'
import {FOCUS_ID}           from '../../../../constants/FocusElementIDs'

const InvoiceExpenses = ({invoiceExpenses,addNew} : { invoiceExpenses ?: IInvoiceExpense[],addNew : () => void }) => {

  return (
    <div className={'d-flex flex-column w-100 pb-3'}>
      <div className={'d-flex align-items-center justify-content-start pb-2 relative mt-4'}>
        <div
              className={'mr-3'}
        >
          <ButtonShortcut
                  focusId ={FOCUS_ID.CALCULATION.DOCUMENT_FORM.INVOICE_EXPENSE_BUTTON}
                  icon={faHandHoldingUsd}
                  label={'add'}
                  shortcut={KeyboardEventCodes.F4}
                  classNames={'hw-shortcut-button primary sm hw-button-border-color'}
                  onClick={addNew}
          />
        </div>
        <div className={'font-smaller-5 color-primary text-upper absolute-left-top-3'}>
                    Invoice Expenses
        </div>
      </div>
      <div className={'border-top-double'}>
        <ConditionalRendering condition={!invoiceExpenses || invoiceExpenses.length === 0}>
          <div className={'m-8 p-8'} style={{minWidth: '400px'}}>&nbsp;</div>
        </ConditionalRendering>
        <table className={'w-100'} data-action-root>
          <tbody>
            {invoiceExpenses && invoiceExpenses.map((expense : IInvoiceExpense, index : number) => {
              return <ExpenseRow key={index} expense={expense} index={index}/>
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default InvoiceExpenses

interface IInvoiceExpenseRowProps {
  expense : IInvoiceExpense
  index : number
}

export const ExpenseRow = ({expense, index} : IInvoiceExpenseRowProps) => {

  return (
    <tr key={index} className={`border-bottom${index % 2 === 1 ? ' row-odd' : ' row-even'}`}>
      <td style={{width: 80}}>
        <div className={'font-smaller-2 d-flex justify-content-start ml-2'}><VatCustomRender value={expense.tax}/></div>
      </td>
      <td >
        <div className={'font-smaller-2  letter-spacing ml-2'}>{formatPrice(expense.financeMP)}</div>
      </td>
      <td >
        <div className={'font-smaller-2  letter-spacing ml-2'}>{formatPrice(expense.financeVP || 0)}</div>
      </td>
      <td >
        <div className={'font-weight-300 font-smaller-2'}>{expense.description}&nbsp;</div>
      </td>
      <td style={{width: 50}}>
        <div className={'d-flex justify-content-between align-items-center px-2'}>
          <div className={'px-1 button-effect '}
                         data-action={CONSTANT_CALCULATION.EVENTS.HEADER.INVOICE_EXPENSE_REMOVE}
                         data-action-id={index}
          >
            <FontAwesomeIcon className={'color-danger'} icon={faTimes}/>
          </div>
        </div>
      </td>
    </tr>
  )
}
