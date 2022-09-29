import {
  HTMLAttributes,
  PropsWithoutRef
} from 'react'

export interface ICalendarPanelDaysProps {
  startDay : 0 | 1
  month : number
  year : number
  active ?: number
  locales ?: string,
  minDate ?: Date
}

export interface ICalendarDay {
  day : number | string
  accessible ?: boolean
}

export interface ICalendarEventData {
  year : number
  month : number
  day : number
}

export interface ICalendarProps extends PropsWithoutRef<HTMLAttributes<HTMLInputElement>> {
  'start-day' ?: 'MON' | 'SUN',
  day ?: number
  month ?: number
  year ?: number
  panel ?: 'D' | 'M' | 'Y'
    /** describe current visible panel that  */
  monthsNextPanel ?: 'D' | 'Y'
  'min-date' ?: Date
  maxDate ?: Date
  'sub-header' ?: 'show' | 'hide'
  locales ?: string
  'onCalendarEvent' ?: (data : ICalendarEventData, close ?: boolean) => void
  'show-type' ?: 'popover' | 'modal' | 'component'
  'popover-root' ?: (parent : HTMLElement) => HTMLElement
  'visible-state' ?: 'show' | 'hide'
  position : 'left' | 'right'
}

