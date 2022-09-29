import React, { useEffect } from 'react'
import {
  ICalendarDay,
  ICalendarPanelDaysProps
}                           from './interfaces'
import { firstLetterCapitalize } from '../../application/utils/Utils'

const CalendarPanelDays = ({locales, active, startDay, month, year, minDate} : ICalendarPanelDaysProps) => {

  const arrayDays = React.useMemo(() => {
    const date = new Date(2000, 1, 1, 12, 12, 12)
    const daysArray = []
    for (let i = 0; i < 7; i++) {
      daysArray[date.getDay()] = firstLetterCapitalize(date.toLocaleString(locales, {weekday : 'short'}))
      date.setDate(date.getDate() + 1)
    }

    const stringsDays = [...daysArray].map(x => x.substr(0, 2))
    if (startDay !== 0) {
      stringsDays.push(stringsDays.shift() as string)
    }

    const days = new Date(year, month + 1, 0)
    let weekDay = new Date(year, month, 1, 12, 12, 12).getDay()
    let daysPrev : number = new Date(year, month, 0).getDate()
    let numPrevious = 0

    const array : ICalendarDay [] = [...Array(days.getDate())].map((x : number, index : number) => {
            /** added for min date */
      const isAccessible = minDate ? (() => {
        const _date1 = new Date(minDate).setHours(0, 0, 0, 0)
        const _date2 = new Date(year, month, index + 1).setHours(0, 0, 0, 0)
        return _date1 <= _date2
      })() : true
            /** added for min date */

      return {
        day : index + 1,
                // accessible : true,
        accessible : isAccessible
      } as ICalendarDay
    })
    while (weekDay !== startDay || numPrevious < 1) {
      weekDay = weekDay === 0 ? 6 : (weekDay - 1)
      array.unshift({
        day : daysPrev--,
        accessible : false
      })
      numPrevious++
    }
    let pos = 1
    while (array.length < 42) {
      array.push({
        day : pos++,
        accessible : false
      })
    }
    const arr = []
    for (let i = 0; i < 6; i++) {
      arr.push(array.slice(i * 7, i * 7 + 7))
    }
    arr.unshift(stringsDays.map(x => {
      return {
        day : x,
        accessible : true
      }
    }))
    return arr
  }, [startDay, month, year, locales, minDate])

  return (
    <>
      {
        arrayDays.map((arrRow, index) => {
          return (
            <div className={ `hw-calendar-data-rows${ index === 0 ? ' hw-calendar-header' : '' }` }
                             key={ `row_${ index }` }>
              {
                arrRow.map((cDay, ind) => {
                  const calendarData = cDay.accessible && index !== 0 ? cDay.day : void(0)

                  return (
                    <div
                                            className={ `hw-calendar-panel-data${ index === 0 ? ' hw-calendar-header' : '' }${ cDay.accessible ? '' : ' disabled' }${ active === calendarData ? ' active' : '' }` }
                                            key={ index * 10 + ind } calendar-data={ calendarData }>
                      { cDay.day }
                    </div>
                  )
                })
              }
            </div>
          )
        })
      }
    </>
  )
}

export default CalendarPanelDays
