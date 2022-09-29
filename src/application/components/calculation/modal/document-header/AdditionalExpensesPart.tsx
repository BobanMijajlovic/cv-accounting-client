import React                  from 'react'
import {CONSTANT_CALCULATION} from '../../../../constants'
import ButtonShortcut         from '../../../../../components/Button/ButtonShortcut'
import {
  faHandHoldingUsd,
  faTimes
}                             from '@fortawesome/free-solid-svg-icons'
import {
  IAdditionalExpense,
  IInvoiceTax
}                             from '../DocumentHeaderForm'
import {FontAwesomeIcon}      from '@fortawesome/react-fontawesome'
import ConditionalRendering   from '../../../../../components/Util/ConditionalRender'
import {
  formatDateShort,
  formatPrice,
  toNumberFixed
}                             from '../../../../utils/Utils'
import {VatCustomRender}      from '../../../_common/VatRender'
import EmptyTag               from '../../../../../components/Util/EmptyTag'
import {KeyboardEventCodes}   from '../../../../../components/hooks/useExternalKeybaord'
import {FOCUS_ID}             from '../../../../constants/FocusElementIDs'

interface IAdditionalExpensesPartProps {
  additionalExpenses ?: IAdditionalExpense[]
  addNew : () => void,
  shortcutButton ?: string
}

const AdditionalExpensesPart = ({additionalExpenses, addNew, shortcutButton} : IAdditionalExpensesPartProps) => {
  return (
    <div className={'d-flex flex-column w-100 pb-3'}>
      <div className={'d-flex align-items-center justify-content-start pb-2 mt-4 relative'}>
        <div
                    className={'mr-3'}
        >
          <ButtonShortcut
                        focusId={FOCUS_ID.CALCULATION.DOCUMENT_FORM.ADDITIONAL_EXPENSE_BUTTON}
                        icon={faHandHoldingUsd}
                        label={'add'}
                        shortcut={shortcutButton ? shortcutButton : KeyboardEventCodes.F6}
                        classNames={'hw-shortcut-button primary hw-button-border-color font-smaller-2'}
                        onClick={addNew}
          />
        </div>
        <div className={'font-smaller-5 color-primary text-upper absolute-left-top-3'}>
                    Additional expenses
        </div>
      </div>

      <div className={'border-top-double'}>
        <ConditionalRendering condition={!additionalExpenses || additionalExpenses.length === 0}>
          <div className={'m-8 p-8'} style={{minWidth: '400px'}}>&nbsp;</div>
        </ConditionalRendering>
        <ConditionalRendering condition={!!(additionalExpenses && additionalExpenses.length !== 0)}>
          <table className={'w-100'} data-action-root>
            <thead className={'font-smaller-2 color-primary font-normal text-center'}>
              <tr>
                <th>Customer</th>
                <th>Inv. Num #</th>
                <th>Inv. Date</th>
                <th>Finance total</th>
                <th>Finance tax</th>
                <th>Tax Recapit.</th>
                <th>Due Date</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {additionalExpenses && additionalExpenses.map((expense : IAdditionalExpense, index : number) => {
                return <AdditionalExpenseRow key={index} expense={expense} index={index}/>
              })}
            </tbody>
          </table>
        </ConditionalRendering>
      </div>
    </div>
  )
}

export default AdditionalExpensesPart

interface IAdditionalExpenseRowProps {
  expense : IAdditionalExpense
  index : number
}

export const AdditionalExpenseRow = ({expense, index} : IAdditionalExpenseRowProps) => {
  return (
    <tr key={index} className={`border-bottom text-center${index % 2 === 1 ? ' row-odd' : ' row-even'}`}>
      <td style={{width: '25%'}}>
        <div className={'d-flex  flex-column justify-content-center text-align-left font-smaller-2  letter-spacing ml-2 color-primary'}>
          <div className={'font-bold text-upper'}><EmptyTag model={expense.customer} field={'shortName'} placeholder={'SUPPLIER NAME'}/></div>
          <div className={'d-flex flex-row align-items-center pt-1 text-upper'}>
            <sub className={'opacity-6 px-1'}>Tax ID&nbsp;:</sub>
            <div className={'px-1 '}><EmptyTag model={expense.customer} field={'taxNumber'} placeholder={'#########'}/>
            </div>
          </div>
        </div>
      </td>
      <td>
        <div className={'font-smaller-3'}>&nbsp;{expense.invoiceNumber}&nbsp;</div>
      </td>
      <td style={{width: 60}}>
        <div className={'font-smaller-3'}>{formatDateShort(expense.invoiceDate)}&nbsp;</div>
      </td>
      <td>
        <div className={'font-smaller-3'}> {formatPrice(toNumberFixed(expense.financeMP))}</div>
      </td>
      <td>
        <div className={'font-smaller-3'}> {formatPrice(toNumberFixed(expense.financeTax))}</div>
      </td>
      <td style={{width: 135}}>
        {expense.items && expense.items.map((tax : IInvoiceTax, key : number) => {
          return <ExpenseItemTaxPart key={key} tax={tax}/>
        })}
      </td>
      <td style={{width: 60}}>
        <div className={'font-smaller-3'}>{formatDateShort(expense.dueDate)}&nbsp;</div>
      </td>
      <td style={{width: 50}}>
        <div className={'d-flex justify-content-between align-items-center px-2'}>
          <div className={'px-1 button-effect '}
                         data-action={CONSTANT_CALCULATION.EVENTS.HEADER.EXTRA_EXPENSE_REMOVE}
                         data-action-id={index}
          >
            <FontAwesomeIcon className={'color-danger'} icon={faTimes}/>
          </div>
        </div>
      </td>
    </tr>
  )
}

export const ExpenseItemTaxPart = ({tax} : { tax : IInvoiceTax }) => {
  return (
    <div className={'d-flex justify-content-between align-items-center font-smaller-3 letter-spacing py-0 px-1 '}>
      <div className={'font-smaller-4'}><VatCustomRender value={tax.taxId}/></div>
      <div className={''}>{formatPrice(toNumberFixed(tax.finance))}</div>
    </div>

  )
}
