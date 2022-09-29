import React             from 'react'
import {formatPrice}     from '../../../../../utils/Utils'
import {
  TCalculation,
  TCalculationItem
}                        from '../../../../../../graphql/type_logic/types'
import _                 from 'lodash'
import {VatCustomRender} from '../../../../_common/VatRender'

const Summary = ({calculation} : { calculation ?: TCalculation }) => {

  const items = React.useMemo(() => !(calculation as any) || !(calculation as any).items ? [] : (calculation as any).items, [calculation])

  const finance = React.useMemo(() => {
    return _.round(items.reduce((acc : number, item : TCalculationItem) => _.add(acc, Number(item?.financeVP)), 0), 2)
  }, [items])

  const vatsArray = React.useMemo(() => {
    return (calculation?.vats || []).map((c : any) => ({...c, finance: 0, taxValue: 0, mark: c.tax.mark}))
  }, [calculation])

  const vats = React.useMemo(() => {
    const arr = items.reduce((acc : any, item : TCalculationItem) => {
      const index = acc.findIndex((x : any) => x.taxId === item.taxId)
      let obj = index === -1 ? {
        taxId: item.taxId,
        taxValue: item.taxPercent,
        mark: item.tax?.mark,
        finance: 0
      } : {
        ...acc[index],
        taxValue: item.taxPercent
      }

      obj = {
        ...obj,
        finance: 0 /** FIX ME   */
      }
      if (index !== -1) {
        acc.splice(index, 1, obj)
      } else {
        acc.push(obj)
      }
      return [...acc]
    }, vatsArray).map((y : any) => ({
      ...y,
      finance: _.round(y.finance, 2)
    }))

    arr.sort((a : any, b : any) => Number(a.taxId) - Number(b.taxId))
    return [...arr]
  }, [items, vatsArray])

  const totalTax = React.useMemo(() => {
    return _.round(vats.reduce((acc : number, v : any) => {
      return _.add(acc, v.finance)
    }, 0), 2)
  }, [vats])

  return (
    <div className={'d-flex flex-column calculation-footer-finance-table'}>
      {/* <div className={'d-flex flex-1 border-bottom align-items-center justify-content-between font-smaller-6'}>
        <div className={'d-flex flex-column flex-1 text-align-right'}>
          <div className={'opacity-4'}>DISCOUNT</div>
          <div className={'font-weight-400 font-smaller-1 text'}>{discount}</div>
        </div>
        <div className={'flex-2  text-align-right'}>
          <div className={'opacity-4'}>FINANCE</div>
          <div className={'font-weight-400 font-smaller-1'}>{formatPrice(finance)}</div>
        </div>
      </div>*/}
      <TaxShow vats={vats} totalTax={totalTax}/>
      {/* <div className={'d-flex justify-content-between border-bottom'}>
        <div className={'opacity-4 font-smaller-6'}> TOTAL</div>
        <div className={'font-weight-400'}>{total}</div>
      </div>*/}
    </div>
  )
}

export default Summary

export const TaxShow = ({vats, totalTax} : { vats : any[], totalTax : number }) => {

  return (
        /* <div className={'d-flex justify-content-between border-bottom'}>
           <div className={'opacity-4 font-smaller-5 flex-1'}> Tax</div>
           <div className={'d-flex flex-column'}>
             {
               vats.map(v => (
                 <div key={v.taxId} className={'d-flex font-smaller-4 justify-content-between align-items-center flex-4 border-bottom pt-1'}>
                   <div className={'font-smaller-5 d-flex  justify-content-between align-items-center'}>
                     <div>{v?.mark}</div>
                     <div className={'pl-1'}>{`${formatPrice(v.taxValue)}%`}</div>
                   </div>
                   <div className={'font-smaller-2 text-align-right flex-1 pl-3 '}>{formatPrice(v.finance)}</div>
                 </div>
               ))
             }

           </div>
           <div className={'font-weight-400 d-flex align-items-end flex-2 justify-content-end font-smaller-1'}>{formatPrice(totalTax)}</div>
         </div>*/
    <div className={'d-flex justify-content-between border-bottom'}>
      <div className={'d-flex flex-column'} style={{minWidth: 170}}>
        <div className={'opacity-4 font-smaller-5 flex-1'}> Tax</div>
        <table>
          <tbody>
            {
              vats.map(v => {
                const valueTaxFinance = formatPrice(_.round(_.divide(_.multiply(v.taxValue, Number(v.finance)), 100), 2))
                return (
                  <tr className={'w-100 font-smaller-1'} key={v.taxId}>
                    <td className={'font-smaller-4'} style={{maxWidth: 30}}><VatCustomRender value={v.taxId as number}/></td>
                    <td className={'font-smaller-3 text-right flex-1'}>{valueTaxFinance}</td>
                    <td className={'text-right flex-1'}>{formatPrice(v.finance as number)}</td>
                  </tr>
                )
              })
            }

          </tbody>
        </table>
      </div>
      <div className={'font-weight-400 d-flex align-items-end justify-content-end font-smaller-1 flex-2'}>{formatPrice(totalTax)}</div>
    </div>
  )
}

