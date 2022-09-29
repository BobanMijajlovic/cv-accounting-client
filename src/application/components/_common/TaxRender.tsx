import React         from 'react'
import {formatPrice} from '../../utils/Utils'
import { useVats }   from "../../../store/vats/useVats";

const _TaxRender = ({value} : any) => {
  const {getVat} = useVats()
  const {mark, valueStr} = getVat(value.taxId)
  return (
    <div className={'d-flex flex-row justify-content-between align-items-center'}>
      <div style={{maxWidth: '35%'}} className={'font-smaller-5'}>
        <span>{mark}</span>
        <span>&nbsp;</span>
        <span>{valueStr}</span>
        <sup>%</sup>
      </div>
      <div className={'flex-2 text-right'}>
        {formatPrice(value.taxFinance)}
      </div>
    </div>
  )
}

export const TaxRender = React.memo(_TaxRender,
    (prevProps, nextProps) => {
      return nextProps.value.taxId === prevProps.value.taxId && nextProps.value.taxFinance === prevProps.value.taxFinance
    })
