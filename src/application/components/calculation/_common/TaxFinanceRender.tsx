import React                            from 'react'
import { formatPrice }                  from '../../../utils/Utils'
import ConditionalRendering             from '../../../../components/Util/ConditionalRender'
import { TABLE_INDEX_SUMMARIZE_COLUMN } from '../../../../components/Table'
import { useVats }                      from '../../../../store/vats/useVats'

const TaxFinanceRender = ( { value, index, model, classNames } : any ) => {
  const { getVat } = useVats()

  const { mark } = getVat( model.taxId )
  return (
    <div className={ `d-flex flex-row justify-content-between align-items-center${ classNames ? ` ${ classNames }` : '' }` }>
      <div style={ { maxWidth : '35%' } } className={ 'font-smaller-5' }>
        <ConditionalRendering condition={ index !== TABLE_INDEX_SUMMARIZE_COLUMN }>
          <span>{ mark }</span>
          <span>&nbsp;</span>
          <span>{ formatPrice( +model.taxPercent ) }</span>
          <sup>%</sup>
        </ConditionalRendering>
      </div>
      <div className={ 'flex-2 text-right' }>
        { formatPrice( value ) }
      </div>
    </div>
  )
}

export default TaxFinanceRender

export const TaxFinanceRenderSummarize = ( { value, index, model, taxes, additionalData } : any ) => {

  return (
    <div className={ 'w-100' }>
      <TaxFinanceRender value={ value } index={ index } model={ model } additionalData={ additionalData }/>

      <ConditionalRendering condition={ index === TABLE_INDEX_SUMMARIZE_COLUMN }>
        <div className={ 'hw-table-taxes-recapitulation-root' }>
          {
            taxes && taxes.map( ( x : any, key : number ) => {
              const model = {
                taxPercent : x.taxPercent,
                taxId : x.taxId
              }
              return <TaxFinanceRender key={ key } value={ x.taxFinance } index={ key + 1 } model={ model } classNames={ `font-smaller-3 pt-1${ key !== 0 ? ' border-top' : '' }` }/>
            } )
          }
        </div>
      </ConditionalRendering>

    </div>
  )
}
