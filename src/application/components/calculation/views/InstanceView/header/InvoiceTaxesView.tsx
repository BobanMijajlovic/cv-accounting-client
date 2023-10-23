import React              from 'react'
import InvoiceTaxRow      from '../common/InvoiceTaxRow'
import {TTaxFinance}      from '../../../../../../graphql/type_logic/types'

const InvoiceTaxesView = ({invoiceTaxes,title} : { invoiceTaxes : TTaxFinance[] | undefined ,title ?: string}) => {

  if (!invoiceTaxes || invoiceTaxes.length === 0) {
    return (<div className={'opacity-6 mr-2 text-upper d-flex flex-column font-smaller-2 '}>
      <div className={'text-upper font-smaller-6 font-weight-600 color-primary letter-spacing-5'}>  Invoice Taxes :  </div>
      <div className={'font-smaller-5'}> No invoice taxes </div>
    </div>)
  }
  return (
    <div className={'d-flex flex-column relative calculation-due-date-preview-root pt-2'} style={{ minWidth: 250, maxWidth: 300 }}>
      <small className={'hw-additional-expenses_label text-upper font-smaller-6 font-weight-600 color-primary letter-spacing-5'}>Invoice Taxes :</small>

      <div className={'d-flex flex-row opacity-4 border-bottom border-width-2 border-color-blue-light pb-1 mb-1 '}>
        <div style={{ width: 30 }} className={'font-smaller-5 due-date-title text-upper'}>Tax %</div>
        <div className={'font-smaller-5 flex-1 text-center text-upper'}>Tax fin.</div>
        <div className={'font-smaller-5 flex-1 text-center text-upper'}>Finance MP</div>
      </div>

      <div className={'d-flex flex-column'}>
        {
          invoiceTaxes.map((invoiceTax : TTaxFinance, key : number) => {
            return (
              <InvoiceTaxRow invoiceTax={invoiceTax} key={key} classNames={key + 1 === invoiceTaxes?.length ?  void(0) : 'border-bottom'}/>
            )
          })
        }
      </div>

      {/* <table className={'w-100'}>
        <thead className={'font-smaller-5 opacity-4 border-bottom border-width-2 border-color-blue-light text-upper'}>
          <tr>
            <td>Tax %</td>
            <td>Tax fin.</td>
            <td>Finance MP</td>
          </tr>
        </thead>
        <tbody className={'pt-2'}>
          {
            invoiceTaxes.map((invoiceTax : TTaxFinance, key : number) => {
              return (
                <InvoiceTaxRow invoiceTax={invoiceTax} key={key} classNames={key + 1 === invoiceTaxes?.length ?  void(0) : 'border-bottom'}/>
              )
            })
          }
        </tbody>
      </table>*/}

    </div>

  )
}

InvoiceTaxesView.defaultProps = {
  title : 'Invoice taxes'
}

export default InvoiceTaxesView
