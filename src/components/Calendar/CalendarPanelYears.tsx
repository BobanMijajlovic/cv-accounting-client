import React, {useState} from 'react'
import {
  faAngleDoubleLeft,
  faAngleDoubleRight
}                        from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

interface ICalendarPanelYearsProps {
  year : number,
  maxDate : Date,
  minDate : Date
}

const CalendarPanelYears = ({year, maxDate, minDate} : ICalendarPanelYearsProps) => {

  const [state, setState] = useState(year - 10)

  const array = React.useMemo(() => {
    const array = [...Array(20)].map((x, index) => state + index)
    const arr = []
    for (let i = 0; i < 4; i++) {
      arr.push(array.slice(i * 5, i * 5 + 5))
    }
    return arr
  }, [state])

  const onClickHandlerChangeRange = (e : React.MouseEvent, value : 'up' | 'down') => {
    if (value === 'up') {
      const maxYear = maxDate.getFullYear()
      if (maxYear <= state + 20 - 1) {
        return
      }
    } else {
      const minYear = minDate.getFullYear()
      if (minYear >= state - 1) {
        return
      }
    }
    setState(value === 'down' ? state - 20 : state + 20)
  }

  const maxYear = maxDate.getFullYear()
  const minYear = minDate.getFullYear()

  return (
    <>
      {
        array.map((arr, index) => {
          return (
            <div className={'hw-calendar-data-rows'} key={`years_${index}`}>
              {
                arr.map((m, ind) => {
                  const calendarData = m > maxYear || m < minYear ? void(0) : m
                  return (
                    <div
                                            className={`hw-calendar-panel-data hw-calendar-year${m > maxYear || m < minYear ? ' disabled' : ''}${year === calendarData ? ' active' : ''}`}
                                            key={`year_${ind}`} calendar-data={calendarData}>
                      {m}
                    </div>
                  )
                })
              }
            </div>
          )
        })
      }
      <div className={'hw-calendar-data-rows hw-calendar-years-control'}>
        <div className={`hw-control-year-button${state - 1 < minYear ? ' disabled' : ''}`}
                     onClick={(e) => onClickHandlerChangeRange(e, 'down')}>
          <div>{state - 20 - 1}</div>
          <div><FontAwesomeIcon icon={faAngleDoubleLeft}/></div>
          <div>{state - 1}</div>
        </div>

        <div>

        </div>

        <div className={`hw-control-year-button${state + 20 > maxYear ? ' disabled' : ''}`}
                     onClick={(e) => onClickHandlerChangeRange(e, 'up')}>
          <div>{state + 20}</div>
          <div><FontAwesomeIcon icon={faAngleDoubleRight}/></div>
          <div>{state + 40 - 1}</div>
        </div>
      </div>
    </>
  )
}

export default CalendarPanelYears
