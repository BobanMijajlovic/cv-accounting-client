import React, {
  useEffect,
  useMemo,
  useState
} from 'react'
import { formatPrice }            from '../../../../utils/Utils'
import { CONSTANT_CALCULATION }   from '../../../../constants'
import { FontAwesomeIcon }        from '@fortawesome/react-fontawesome'
import {
  faPercent,
  faTimes
}                                 from '@fortawesome/free-solid-svg-icons'
import {
  IHeaderDocumentState,
  IInvoiceTax
}                                 from '../DocumentHeaderForm'
import ConditionalRendering       from '../../../../../components/Util/ConditionalRender'
import { VatCustomRender }        from '../../../_common/VatRender'
import ButtonShortcut             from '../../../../../components/Button/ButtonShortcut'
import { KeyboardEventCodes }     from '../../../../../components/hooks/useExternalKeybaord'
import CheckBox                   from '../../../../../components/CheckBox/CheckBox'
import { useTranslationFunction } from '../../../../../components/Translation/useTranslation'
import { round as _round, subtract as _subtract} from 'lodash'

interface IInvoiceTaxesProps<T> {
  invoiceTaxes? : IInvoiceTax[],
  addNew : () => void
  error? : boolean | string
  state : IHeaderDocumentState
}

const InvoiceTaxes = <T extends any>( { invoiceTaxes, addNew, error, state } : IInvoiceTaxesProps<T> ) => {
  const { translate } = useTranslationFunction()
  const invoiceTaxesError = React.useMemo( () => error ? error : void( 0 ), [error] )/*
     const totalAdded = React.useMemo(() => getTotalAddedTaxPerInvoice(state), [state])
     const total = React.useMemo(() => getCalculationFinanceAfterDiscount(state), [state])*/
  const [check, setCheck] : [ boolean, ( b : boolean ) => void ] = useState( false as boolean )

  useEffect( () => {
    if ( !invoiceTaxes ) {
      return
    }
    setCheck( invoiceTaxes.length !== 0 )
  }, [invoiceTaxes] )

  const handlerOnCheck = ( e : any ) => {
    setCheck( e.target.value )
  }

  return (
    <div className={ 'd-flex flex-column flex-1 pb-2 pt-3 relative' }>
      <div style={ { position : 'absolute', right : 0, top : 0 } }>
        <CheckBox
                    label={ translate( 'CALCULATION_HEADER_CHECKBOX_ADD_TAX_RECAPITULATION' ) }
                    labelSize={ 1 }
                    labelColor={ 'grey' }
                    classNames={ 'font-smaller-4' }
                    value={ check }
                    onChange={ handlerOnCheck }
        />
      </div>
      <div className={ 'd-flex flex-column w-100 pl-3' }>
        <ConditionalRendering condition={ !!check }>

          <div className={ 'd-flex align-items-center justify-content-between pb-2 w-100 font-smaller-2' }>
            <div className={ 'd-flex align-items-center relative' }>
              <div
                                className={ 'mr-3' }
              >
                <ButtonShortcut

                                    icon={ faPercent }
                                    label={ translate( 'SMALL_BUTTON_ADD' ) }
                                    shortcut={ KeyboardEventCodes.F3 }
                                    classNames={ 'hw-shortcut-button primary sm hw-button-border-color' }
                                    onClick={ addNew }
                />
              </div>
              <div className={ 'font-smaller-5 color-primary text-upper absolute-left-top-3' }>
                                Invoice Taxes
              </div>
            </div>
            {/* <div className={'d-flex justify-content-between align-items-center'}>
                         <div className={'d-flex flex-column align-items-center mr-3'}>
                         <div className={'font-smaller-5 color-primary text-upper'}>
                         Total added
                         </div>
                         <div className={'font-smaller-2 color-primary text-upper'}>
                         {formatPrice(totalAdded)}
                         </div>
                         </div>
                         <div className={'d-flex flex-column align-items-center'}>
                         <div className={'font-smaller-5 color-primary text-upper'}>
                         Total taxes
                         </div>
                         <div className={'font-smaller-2 color-primary text-upper'}>
                         {formatPrice(total)}
                         </div>
                         </div>
                         </div>*/ }
          </div>
          <div className={ 'border-top-double relative pb-3' }>
            <ConditionalRendering condition={ !invoiceTaxes || invoiceTaxes.length === 0 }>
              <div className={ 'm-8 p-8' } style={ { minWidth : '400px' } }>&nbsp;</div>
            </ConditionalRendering>
            <table className={ 'w-100' } data-action-root>
              <tbody>
                { invoiceTaxes && invoiceTaxes.map( ( tax : IInvoiceTax, index : number ) => {
                  return <TaxRow key={ index } tax={ tax } index={ index }/>
                } ) }
              </tbody>
            </table>
            <ConditionalRendering condition={!!invoiceTaxesError}>
              <div className={'d-flex align-items-center justify-content-between error background-danger absolute-left-down w-100 mt-1 px-1'}>
                <div className={'text-left font-smaller-5 font-weight-bold pl-2 text-upper'}>{ invoiceTaxesError }</div>
              </div>
            </ConditionalRendering>
          </div>
        </ConditionalRendering>
      </div>
    </div>
  )
}

export default InvoiceTaxes

interface IInvoiceTaxRowProps {
  tax : IInvoiceTax
  index : number
  notShowRemoveButton? : boolean
}

export const TaxRow = ( { tax, index, notShowRemoveButton } : IInvoiceTaxRowProps ) => {

  const financeVP = useMemo(() => _round(_subtract(tax.financeMP,tax.finance),2) ,[tax])
  return (
    <tr key={ index } className={ `border-bottom${ index % 2 === 1 ? ' row-odd' : ' row-even' }` }>
      <td style={ { width : 80 } }>
        <div className={ 'font-smaller-2' }><VatCustomRender value={ tax.taxId }/></div>
      </td>
      <td>
        <div className={ 'font-smaller-2  letter-spacing ' }>{ formatPrice( financeVP ) }</div>
      </td>
      <td>
        <div className={ 'font-smaller-2  letter-spacing ' }>{ formatPrice( tax.finance ) }</div>
      </td>
      <td>
        <div className={ 'font-smaller-2  letter-spacing ml-2' }>{ formatPrice( tax.financeMP ) }</div>
      </td>
      <td style={ { width : 50 } }>
        <ConditionalRendering condition={ !notShowRemoveButton }>
          <div className={ 'd-flex justify-content-between align-items-center px-2' }>
            <div className={ 'px-1 button-effect ' }
                             data-action={ CONSTANT_CALCULATION.EVENTS.HEADER.INVOICE_TAX_REMOVE }
                             data-action-id={ index }
            >
              <FontAwesomeIcon className={ 'color-danger' } icon={ faTimes }/>
            </div>
          </div>
        </ConditionalRendering>
      </td>
    </tr>
  )
}
