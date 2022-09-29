import React                    from 'react'
import { TCalculation }         from '../../../../../../graphql/type_logic/types'
import { formatDateLong }       from '../../../../../utils/Utils'
import ComponentRender          from '../../../../../../components/Util/ComponentRender'
import { CONSTANT_CALCULATION } from '../../../../../constants'

const NumberDate = ( { calculation } : { calculation : TCalculation } ) => {

  return (
    <div className={ 'd-flex flex-column justify-content-between align-items-center font-smaller-1' }>
      <div className={ 'd-flex flex-row pb-4' }>
        <ComponentRender
                    label={ 'calculation number' }
                    value={ calculation.number }
                    labelClass={ 'text-upper opacity-6 font-weight-normal' }
                    classNames={ 'pr-4 font-weight-bold' }
                    data-action={ CONSTANT_CALCULATION.EVENTS.HEADER.CHANGE_CLICK_EVENT_HEADER_PARTS }
                    data-action-id={ 'number' }
        />
        <ComponentRender
                    label={ 'invoice number' }
                    value={ calculation.invoiceNumber }
                    labelClass={ 'text-upper opacity-6 font-weight-normal' }
                    classNames={ 'font-weight-bold' }
                    data-action={ CONSTANT_CALCULATION.EVENTS.HEADER.CHANGE_CLICK_EVENT_HEADER_PARTS }
                    data-action-id={ 'invoiceNumber' }
        />
      </div>
      <div className={ 'd-flex flex-row pb-4' }>
        <ComponentRender
                    label={ 'date of calculation' }
                    value={ calculation.date }
                    format={ formatDateLong }
                    labelClass={ 'text-upper opacity-6 font-weight-normal' }
                    classNames={ 'pr-4 font-weight-bold' }
                    data-action={ CONSTANT_CALCULATION.EVENTS.HEADER.CHANGE_CLICK_EVENT_HEADER_PARTS }
                    data-action-id={ 'date' }
        />
        <ComponentRender
                    label={ 'date of invoice' }
                    value={ calculation.invoiceDate }
                    format={ formatDateLong }
                    labelClass={ 'text-upper opacity-6 font-weight-normal' }
                    classNames={ 'font-weight-bold' }
                    data-action={ CONSTANT_CALCULATION.EVENTS.HEADER.CHANGE_CLICK_EVENT_HEADER_PARTS }
                    data-action-id={ 'invoiceDate' }
        />
      </div>
    </div>
  )
}

export default NumberDate
