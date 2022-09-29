import React                from 'react'
import { TCalculationItem } from '../../../../../../graphql/type_logic/types'
import { formatPrice }      from '../../../../../utils/Utils'
import _                    from 'lodash'
import ConditionalRendering from '../../../../../../components/Util/ConditionalRender'
import { useVats }          from '../../../../../../store/vats/useVats'

const TaxRecapitulation = ({items}: { items: TCalculationItem[] }) => {
  
  const _data = React.useMemo(() => {
    if (!items) {
      return []
    }

    const arr = items.reduce((acc: any, x: any) => {
      const index = acc.findIndex((y: any) => Number(y.taxId) === Number(x.taxId))
      if (index === -1) {
        return [...acc, {
          taxId:x.taxId,
          taxValue:x.taxPercent,
          financeVP:x.financeExpInternalVP,
          taxFinance:_.round(_.subtract(Number(x.financeExpInternalMP), Number(x.financeExpInternalVP)), 2),
          financeMP:x.financeExpInternalMP
        }]
      }
      const vat = acc[index]
      const taxFinance = _.round(_.subtract(Number(x.financeExpInternalMP), Number(x.financeExpInternalVP)), 2)
      vat.financeVP = _.round(_.add(Number(vat.financeVP), Number(x.financeExpInternalVP)), 2)
      vat.taxFinance = _.round(_.add(Number(vat.taxFinance), taxFinance), 2)
      vat.financeMP = _.round(_.add(Number(vat.financeMP), Number(x.financeExpInternalMP)), 2)
      acc.splice(index, 1, {
        ...vat
      })
      return acc
    }, [])

    return [
      ...arr,
      {
        summary:true,
        financeVP:arr.reduce((acc: number, x: any) => _.round(_.add(acc, x.financeVP), 2), 0),
        taxFinance:arr.reduce((acc: number, x: any) => _.round(_.add(acc, x.taxFinance), 2), 0),
        financeMP:arr.reduce((acc: number, x: any) => _.round(_.add(acc, x.financeMP), 2), 0),
      }
    ]
  }, [items])

  return (
    <div className={'d-flex flex-column hw-tax-recapitulation-root py-1'}>
      <div className={'font-smaller-1 color-primary'}>Tax recapitulation</div>

      <div className={'border-top-double'}>
        <table className={'w-100 font-smaller-3'} data-action-root>
          <thead>
            <tr>
              <th>Tax %</th>
              <th>Base Finance</th>
              <th>Tax</th>
              <th>Finance</th>
            </tr>
          </thead>
          <tbody>
            {_data && _data.map((vat: any, key: number) => {
              return <TaxRecapitulationRow key={key} vat={vat}/>
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default TaxRecapitulation

const TaxRecapitulationRow = ({vat}: { vat: any }) => {
  const {getVat} = useVats()
  const {mark} = vat.summary ? getVat(vat.taxId) : {mark:''}
  return (
    <tr className={vat.summary ? 'border-top' : ''}>
      <td>
        <ConditionalRendering condition={!vat.summary}>
          <span>{mark}</span>
          <span>&nbsp;</span>
          <span>{formatPrice(vat.taxValue)}</span>
          <sup>%</sup>
        </ConditionalRendering>
      </td>
      <td className={'text-right pr-1'}>
        {formatPrice(vat.financeVP)}
      </td>
      <td className={'text-right pr-1'}>
        {formatPrice(vat.taxFinance)}
      </td>
      <td className={'text-right pr-1'}>
        {formatPrice(vat.financeMP)}
      </td>
    </tr>
  )
}