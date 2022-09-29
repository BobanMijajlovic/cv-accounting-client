import React                from 'react'
import ConditionalRendering from '../../../../../../components/Util/ConditionalRender'
import {IInvoiceTax}        from '../../DocumentHeaderForm'
import InvoiceTaxViewRow    from './ViewOneRow'

interface IInvoiceTaxViewProps {
  invoiceTaxes ?: IInvoiceTax[]
  extraAction ?: boolean
}

const InvoiceTaxView = ({invoiceTaxes, extraAction} : IInvoiceTaxViewProps) => {

  return (
    <div className={'border-top-double'}>
      <ConditionalRendering condition={!invoiceTaxes || invoiceTaxes.length === 0}>
        <div className={'m-8 p-8'} style={{minWidth: '400px'}}>&nbsp;</div>
      </ConditionalRendering>
      <ConditionalRendering condition={!!(invoiceTaxes && invoiceTaxes.length !== 0)}>
        <table className={'w-100'} data-action-root>
          <tbody>
            {invoiceTaxes && invoiceTaxes.map((invoiceTax : IInvoiceTax, index : number) => {
              return <InvoiceTaxViewRow key={index} invoiceTax={invoiceTax} index={index} notShowRemoveButton={invoiceTaxes.length < 2} extraAction={extraAction}/>
            })}
          </tbody>
        </table>
      </ConditionalRendering>
    </div>
  )

}

export default InvoiceTaxView