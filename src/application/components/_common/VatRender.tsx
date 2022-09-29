import React       from 'react'
import { useVats } from "../../../store/vats/useVats";


interface IVatRender {
  value : number | string,
  small ?: boolean
}

const VatRender = ({value, small} : IVatRender) => {
  const {getVat} = useVats()
  if (small) {
    return (
      <small>{getVat(value).valueStr}</small>
    )
  }
  return (
    <div>
      {getVat(value).valueStr}
    </div>
  )
}
export default VatRender

const _VatCustomRender = ({value, classNames} : { value : number | string, classNames ?: string }) => {
  const {getVat} = useVats()
  const {mark, valueStr} = getVat(value)
  return (
    <div className={classNames}>
      <span>{mark}</span>
      <span>&nbsp;</span>
      <span>{valueStr}</span>
      <sup>%</sup>
    </div>
  )
}

export const VatCustomRender = React.memo(_VatCustomRender,
    (prevProps, nextProps) => {
      return nextProps.value === prevProps.value && nextProps.classNames === prevProps.classNames
    })

