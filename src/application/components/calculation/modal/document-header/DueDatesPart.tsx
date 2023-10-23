import React                  from 'react'
import {CONSTANT_CALCULATION} from '../../../../constants'
import ButtonShortcut         from '../../../../../components/Button/ButtonShortcut'
import {
  faCalendarAlt,
  faTimes,
}                             from '@fortawesome/free-solid-svg-icons'
import {
  IDueDateRecord,
  IHeaderDocumentState
}                             from '../DocumentHeaderForm'
import {FontAwesomeIcon}      from '@fortawesome/react-fontawesome'
import ConditionalRendering   from '../../../../../components/Util/ConditionalRender'
import {
  formatDateLong,
  formatPrice
}                             from '../../../../utils/Utils'
import {KeyboardEventCodes}   from '../../../../../components/hooks/useExternalKeybaord'
import {
  getCalculationFinance,
  getTotalAddedDueDates
}                             from '../../util'
import {FOCUS_ID}             from '../../../../constants/FocusElementIDs'

interface IDueDatesPartProps {
  dueDates ?: IDueDateRecord[]
  addNew : () => void,
  state : IHeaderDocumentState
}

const DueDatesPart = ({dueDates, addNew, state} : IDueDatesPartProps) => {

  const total = React.useMemo(() => getCalculationFinance(state), [state])
  const totalAdded = React.useMemo(() => getTotalAddedDueDates(state), [state])

  return (
    <div className={'d-flex flex-column w-100 pb-3'}>
      <div className={'d-flex align-items-center justify-content-between pb-2 mt-4 w-100  '}>
        <div className={'d-flex align-items-center relative'}>
          <div
                        className={'mr-3 '}
          >
            <ButtonShortcut
                 focusId = {FOCUS_ID.CALCULATION.DOCUMENT_FORM.DUE_DATE_BUTTON}
                 icon={faCalendarAlt}
                 label={'add'}
                 shortcut={KeyboardEventCodes.F5}
                 classNames={'hw-shortcut-button primary sm hw-button-border-color'}
                 onClick={addNew}
            />
          </div>
          <div className={'font-smaller-5 color-primary text-upper absolute-left-top-3'}>
                        Due Dates
          </div>
        </div>
        <div className={'d-flex justify-content-between align-items-center'}>
          <div className={'d-flex flex-column align-items-center mr-3'}>
            <div className={'font-smaller-5 color-primary text-upper'}>
                            Total added
            </div>
            <div className={'font-smaller-2 color-primary text-upper'}>
              {formatPrice(totalAdded ? totalAdded : 0)}
            </div>
          </div>
          <div className={'d-flex flex-column align-items-center'}>
            <div className={'font-smaller-5 color-primary text-upper'}>
                            Total due dates
            </div>
            <div className={'font-smaller-2 color-primary text-upper'}>
              {formatPrice(total)}
            </div>
          </div>
        </div>
      </div>

      <div className={'border-top-double'}>
        <ConditionalRendering condition={!dueDates || dueDates.length === 0}>
          <div className={'m-8 p-8'} style={{minWidth: '400px'}}>&nbsp;</div>
        </ConditionalRendering>
        <table className={'w-100'} data-action-root>
          <tbody>
            {dueDates && dueDates.map((dueDate : IDueDateRecord, index : number) => {
              return <DueDateRow key={index} dueDate={dueDate} index={index}/>
            })}
          </tbody>
        </table>
      </div>

    </div>
  )
}

export default DueDatesPart

interface IDueDatesRowProps {
  dueDate : IDueDateRecord
  index : number
}

export const DueDateRow = ({dueDate, index} : IDueDatesRowProps) => {
  return (
    <tr key={index} className={`border-bottom${index % 2 === 1 ? ' row-odd' : ' row-even'}`}>
      <td style={{width: '25%'}}>
        <div className={'font-smaller-2  letter-spacing ml-2'}>{formatDateLong(dueDate.date)}</div>
      </td>
      <td>
        <div className={'font-smaller-2 d-flex justify-content-start'}>&nbsp;{formatPrice(dueDate.finance)}&nbsp;</div>
      </td>
      <td style={{width: '40%'}}>
        <div className={'font-weight-300 font-smaller-2'}>{dueDate.description}&nbsp;</div>
      </td>
      <td style={{width: 50}}>
        <div className={'d-flex justify-content-between align-items-center px-2'}>
          <div className={'px-1 button-effect '}
                         data-action={CONSTANT_CALCULATION.EVENTS.HEADER.DUE_DATES_REMOVE}
                         data-action-id={index}
          >
            <FontAwesomeIcon className={'color-danger'} icon={faTimes}/>
          </div>
        </div>
      </td>
    </tr>
  )
}
