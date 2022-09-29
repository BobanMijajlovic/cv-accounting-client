import *  as _          from 'lodash'
import {
  get as _get,
  random as _random
}                       from 'lodash'
import { CONSTANT_UOM } from '../constants'
import {
  LocalStorage,
  STORAGE_APPLICATION_SETTINGS
}                       from './LocalStorage'

const TEMP_PREFIX_GUID = 'temp_hwt_843983_'

export const genTempGuid = () : string => {
  return `${ TEMP_PREFIX_GUID }${ guid() }`
}

export const guid = () : string => {
  return `${ _random( 1000, 1000000 ) }-${ _random( 1000, 1000000 ) }-${ _random( 1000, 1000000 ) }`
}

export const formatDateMonthDay = ( value : string ) => {
  const locales = _get( LocalStorage.getData( STORAGE_APPLICATION_SETTINGS ), 'dateFormat', void( 0 ) )
  return new Date( value ).toLocaleString( locales, { day : '2-digit', month : '2-digit' } as any )
}

export const formatDateShort = ( value : string ) => {
  if ( value.length === 0 ) {
    return ''
  }
  const locales = _get( LocalStorage.getData( STORAGE_APPLICATION_SETTINGS ), 'dateFormat', void( 0 ) )
  return new Date( value ).toLocaleString( locales, { day : '2-digit', month : '2-digit', year : '2-digit' } as any )
}

export const formatDateLong = ( value : string ) => {
  if ( !value || value === '' ) {
    value = new Date().toString()
  }
  const locales = _get( LocalStorage.getData( STORAGE_APPLICATION_SETTINGS ), 'dateFormat', void( 0 ) )

  return new Date( value ).toLocaleString( locales, { day : '2-digit', month : '2-digit', year : 'numeric' } as any )
    // return new Date(value).toLocaleDateString(void(0), {day: '2-digit', month: '2-digit', year: 'numeric'} as any)
}

export const formatDate = ( value : string, options ? : any ) => {
  if ( !value || value === '' ) {
    value = new Date().toString()
  }
  const locales = _get( LocalStorage.getData( STORAGE_APPLICATION_SETTINGS ), 'dateFormat', void( 0 ) )
  return new Date( value ).toLocaleString( locales, options )
}

export const formatTime = ( value : string ) => {
  return new Date( value ).toLocaleTimeString( void( 0 ), { hour : '2-digit', minute : '2-digit', hour12 : false } as any )
}

export const calculationPercentIncreased = ( valueStart : string | number, valueEnd : string | number ) => {
  const diff = _.multiply( _.subtract( _.divide( +valueStart, +valueEnd ), 1 ), 100 )
  return _.round( diff, 2 )
}

export const getUnit = ( value : string | number ) => {
  const unit = CONSTANT_UOM.find( x => x.value === `${ value }` )
  return !unit ? '' : unit.short
}

export const formatPrice = ( value : ( number | string ) ) : string => {
  const valNumber = typeof value === 'number' ? value : Number( value )
  const formatter = new Intl.NumberFormat( 'en-US', {
    minimumFractionDigits : 2,
    maximumFractionDigits : 2
  } )
  return formatter.format( valNumber )
}

export const formatCurrency = ( value : ( number | string ) ) : string => {
  const valNumber = typeof value === 'number' ? value : Number( value )
  const formatter = new Intl.NumberFormat( 'en-US', {
    minimumFractionDigits : 2,
    maximumFractionDigits : 4
  } )
  return formatter.format( valNumber )
}

export const formatQuantity = ( value : ( number | string ) ) : string => {
  const valNumber = typeof value === 'number' ? value : Number( value )
  const formatter = new Intl.NumberFormat( 'en-US', {
    minimumFractionDigits : 3,
    maximumFractionDigits : 3
  } )
  return formatter.format( valNumber )
}

export const toNumberFixed = ( value : string | number ) => {
  if ( !value ) {
    return 0
  }
  if ( typeof value === 'number' ) {
    value = value.toString()
  }
  while ( /,/g.test( value ) ) {
    value = value.replace( ',', '' )
  }
  return _.toNumber( value )
}

export const checkObjectAreSameByValues = ( src : any, desc : any ) => {
  if ( _.isNil( src ) || _.isNil( desc ) ) {
    return false
  }
  if ( typeof src != typeof desc ) {
    return false
  }

  const str = typeof desc
  switch ( str ) {
    case 'object':
      if ( Array.isArray( str ) || Array.isArray( desc ) ) {
        return false
      }
      break

    case 'bigint':
    case 'function':
    case 'symbol':
      return false
    default:
      return src === desc
  }

  const keysSrc = Object.keys( src ).sort()
  const keysDest = Object.keys( desc ).sort()
  if ( keysSrc.length !== keysDest.length ) {
    return false
  }
  if ( !_.isEqual( keysSrc, keysDest ) ) {
    return false
  }

  const len = keysSrc.length
  for ( let i = 0; i < len; i++ ) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
    if ( !checkObjectAreSameByValues( src[keysSrc[i]], desc[keysSrc[i]] ) ) {
      return false
    }
  }

  return true
}

export const firstLetterCapitalize = ( value : string ) => {
  return value.charAt( 0 ).toUpperCase() + value.slice( 1 )
}

/** Compare two dates without comparing times ( ONLY DATES ) */
export const compareTwoDates = ( date1 : string | Date, date2 : string | Date ) => {
  const _date1 = new Date( date1 ).setHours( 0, 0, 0, 0 )
  const _date2 = new Date( date2 ).setHours( 0, 0, 0, 0 )
  return _date1 === _date2
}

export const delayCallFunction = ( callback : () => void, timer : number ) => {
  setTimeout( () => callback(), timer )
  clearTimeout( timer )
}