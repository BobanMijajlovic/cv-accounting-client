import React, { useEffect }       from 'react'
import { CONSTANT_CALCULATION }   from '../../../../constants'
import { FontAwesomeIcon }        from '@fortawesome/react-fontawesome'
import {
  faHandHoldingUsd,
  faTimes
}                                 from '@fortawesome/free-solid-svg-icons'
import ButtonShortcut             from '../../../../../components/Button/ButtonShortcut'
import ConditionalRendering       from '../../../../../components/Util/ConditionalRender'
import { VatCustomRender }        from '../../../_common/VatRender'
import {
  KeyboardEventCodes,
  useExternalKeyboard
}                                 from '../../../../../components/hooks/useExternalKeybaord'
import {
  formatPrice,
  toNumberFixed
}                                 from '../../../../utils/Utils'
import {
  TExpenseItem,
  TExpense
}                                 from '../../../../../graphql/type_logic/types'
import { calculateFinances }      from '../../../calculation/util'
import { FOCUS_ID }               from '../../../../constants/FocusElementIDs'
import { useVats }                from '../../../../../store/vats/useVats'
import { useTranslationFunction } from '../../../../../components/Translation/useTranslation'

const InvoiceExpenses = ({ invoiceExpenses, addNew }: { invoiceExpenses?: TExpense[], addNew: ()=> void }) => {

  const { translate } = useTranslationFunction()
  const { setRef } = useExternalKeyboard((e: KeyboardEvent) => {
    switch (e.key) {
      case KeyboardEventCodes.F4:
        addNew()
        return
    }
  }, true, [KeyboardEventCodes.F4], 'invoice_footer_form_additional_expense')

  return (
    <div className={'d-flex flex-column w-100 pb-3'} ref={setRef}>
      <div className={'d-flex align-items-center justify-content-start p-1'}>
        <div
          className={'mr-3'}
        >
          <ButtonShortcut
            focusId={FOCUS_ID.INVOICE.EXPENSES_FORM.ADD_BUTTON}
            icon={faHandHoldingUsd}
            label={translate('SMALL_BUTTON_ADD')}
            shortcut={KeyboardEventCodes.F4}
            classNames={'hw-shortcut-button primary sm hw-button-border-color mr-3'}
            onClick={addNew}
          />
        </div>
        <div className={'font-smaller-3 color-primary text-upper'}>
          {translate('LABEL_ADDITIONAL_EXPENSES')}
        </div>
      </div>
      <div className={'border-top-double'}>
        <ConditionalRendering condition={!invoiceExpenses || invoiceExpenses.length === 0}>
          <div className={'m-8 p-8 font-smaller-2 row-even'} style={{ minWidth: '400px' }}> {translate('ADDITIONAL_EXPENSES_VIEW_NO_ADDITIONAL EXPENSE')}</div>
        </ConditionalRendering>
        <table className={'w-100'} data-action-root>
          <tbody>
            {invoiceExpenses && (invoiceExpenses as any).map((expense: TExpense, ind: number) => {
              return (expense as any).items.map((item: TExpenseItem, index: number) => {
                return <ExpenseRow key={index} expense={item} index={ind + index}/>
              })
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default InvoiceExpenses

interface IInvoiceExpenseRowProps {
  expense: TExpenseItem
  index: number
}

export const ExpenseRow = ({ expense, index }: IInvoiceExpenseRowProps) => {
  const { getVat } = useVats()
  const { value } = getVat(expense.taxId as number)
  const financeVP = calculateFinances(false, toNumberFixed(expense.financeMP as number), value as number)
  return (
    <tr key={index} className={`border-bottom${(index % 2) === 1 ? ' row-odd' : ' row-even'}`}>
      <td style={{ width: 80 }}>
        <div className={'font-smaller-2 d-flex justify-content-start'}><VatCustomRender value={expense.taxId as number}/></div>
      </td>
      <td>
        <div className={'font-smaller-2  letter-spacing ml-2'}>{formatPrice(expense.financeMP as number)}</div>
      </td>
      <td>
        <div className={'font-smaller-2  letter-spacing ml-2'}>{financeVP}</div>
      </td>
      <td>
        <div className={'font-weight-300 font-smaller-2'}>{expense.description}&nbsp;</div>
      </td>
      <td style={{ width: 50 }}>
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

