import React, {
  useMemo,
  useRef
}                                               from 'react'
import { faCalendarAlt, }                       from '@fortawesome/free-regular-svg-icons'
import InputText, { IInputTextDatePickerProps } from './InputText'
import Calendar                                 from '../Calendar/Calendar'
import { ICalendarEventData }                   from '../Calendar/interfaces'
import { useActiveBackground }                  from '../../store/active-background/useActiveBackground'
import {
  LocalStorage,
  STORAGE_APPLICATION_SETTINGS
}                                               from '../../application/utils/LocalStorage'
import { get as _get }                          from 'lodash'

const InputTextDatePicker = ( props : IInputTextDatePickerProps ) => {

  const uniqueId = useRef( null )

  const checkFormat = React.useCallback( ( format : string ) => {
    const objectOptions : Intl.DateTimeFormatOptions = {}
    if ( /(M){4,}/.exec( format ) ) {
      objectOptions.month = 'long'
    }
    if ( !objectOptions.month && /(M){3,}/.exec( format ) ) {
      objectOptions.month = 'short'
    }
    if ( !objectOptions.month && /(M){2,}/.exec( format ) ) {
      objectOptions.month = '2-digit'
    }
    if ( /(d){2,}/.exec( format ) ) {
      objectOptions.day = '2-digit'
    }
    if ( !objectOptions.day && /(d){1,}/.exec( format ) ) {
      objectOptions.day = 'numeric'
    }
    if ( /(y){4,}/.exec( format ) ) {
      objectOptions.year = 'numeric'
    }
    if ( !objectOptions.year && /(y){2,}/.exec( format ) ) {
      objectOptions.year = '2-digit'
    }
    if ( /(E){2,}/.exec( format ) ) {
      objectOptions.weekday = 'long'
    }
    if ( !objectOptions.weekday && /(E){1,}/.exec( format ) ) {
      objectOptions.weekday = 'short'
    }
    return objectOptions
  }, [] )

  const { openCloseActiveBackground, isOpen, style : styleActiveBackground } = useActiveBackground()

  const handlerOnClickCalendar = React.useCallback( () => {
    openCloseActiveBackground( !isOpen )
  }, [openCloseActiveBackground, isOpen] )

  const iconAction = React.useMemo( () => {
    return {
      handler : handlerOnClickCalendar,
      icon : faCalendarAlt
    }
  }, [handlerOnClickCalendar] )

  const _popOverRoot = React.useCallback( ( parent : HTMLElement ) => {
    return parent.getElementsByTagName( 'input' )[0] as HTMLElement
  }, [] )

  const handlerOnClick = ( e : React.MouseEvent ) => {
    e.persist();
    ( e.nativeEvent as any ).ownerTarget = uniqueId.current
  }

  const { onChange, format, locales : _locales, value, 'min-date' : minDate, classNames } = props
  const storage = LocalStorage.getData( STORAGE_APPLICATION_SETTINGS )
  const locales = React.useMemo( () => !_locales ? _get( storage, 'dateFormat', void( 0 ) ) : _locales, [storage, _locales] )

  const handlerCalendarEvent = React.useCallback( ( data : ICalendarEventData, close ? : boolean ) => {
    const date = new Date( data.year, data.month, data.day )
    const objectLocalOption = checkFormat( format as string )
    const str = date.toLocaleString( locales, objectLocalOption )
    if ( onChange ) {
      onChange( {
        target : {
          closed : close,
          valueFormat : str,
          value : date.toISOString(),
          date : date
        } as any,
        persist () : void {
                    /** just simulate the function */
        }
      } as React.ChangeEvent<HTMLInputElement> )
    }
    close && openCloseActiveBackground( false )
  }, [onChange, format, locales, openCloseActiveBackground, checkFormat] )

  const [day, month, year] = React.useMemo( () => {
    const date = props.date ? new Date( props.date ) : new Date()
    return [date.getDate(), date.getMonth(), date.getFullYear()]
  }, [props.date] )

  const _value = React.useMemo( () => {
    const objectLocalOption = checkFormat( format as string )
    const date = new Date( value as string )
    return date.toLocaleString( locales, objectLocalOption )
  }, [value, format, locales, checkFormat] )

  const rootStyle = useMemo( () => {
    return styleActiveBackground && styleActiveBackground.zIndex ? { ...styleActiveBackground, zIndex : ( styleActiveBackground.zIndex as number ) + 10 } : styleActiveBackground
  }, [styleActiveBackground] )

  return (
    <div className={ `hw-input-text-date-picker${ classNames ? ` ${ classNames }` : '' }` } hw-calendar-data='parent' onClick={ handlerOnClick } ref={ ( ele ) => uniqueId.current = ele as any } style={ rootStyle }>
      <InputText
                {
                    ...props
                }
                align={ props.align }
                readOnly
                type={ 'text' }
                iconAction={ iconAction }
                value={ _value }
      />
      <Calendar
                show-type={ 'popover' }
                start-day={ props['start-day'] }
                locales={ locales }
                popover-root={ _popOverRoot }
                visible-state={ isOpen ? 'show' : 'hide' }
                onCalendarEvent={ handlerCalendarEvent }
                sub-header={ props['sub-header'] }
                day={ day }
                month={ month }
                year={ year }
                position={ props.position }
                panel={ props.panel }
                min-date={ minDate }
      />
    </div>
  )
}

export default InputTextDatePicker