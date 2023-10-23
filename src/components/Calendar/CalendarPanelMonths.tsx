import React from 'react'

const CalendarPanelMonths = ({locales, month} : { locales ?: string, month ?: number }) => {

  const months = React.useMemo(() => {
    const date = new Date(2000, 1, 1, 12, 12, 12)
    return [...Array(12)].map((x, index) => {
      date.setMonth(index)
      return date.toLocaleString(locales, {month: 'short'}).toUpperCase()
    })
  }, [locales])

  const array = React.useMemo(() => {
    const arr = []
    for (let i = 0; i < 4; i++) {
      arr.push(months.slice(i * 3, i * 3 + 3))
    }
    return arr
  }, [months])

  return (
    <>
      {
        array.map((arr, index) => {
          return (
            <div className={'hw-calendar-data-rows'} key={`months_${index}`}>
              {
                arr.map((m, ind) => {
                  return (
                    <div
                                            className={`hw-calendar-panel-data hw-calendar-month${month === index * 3 + ind ? `${' active'}` : ''}`}
                                            key={`mon_${ind}`} calendar-data={index * 3 + ind}>
                      {m}
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
export default CalendarPanelMonths
