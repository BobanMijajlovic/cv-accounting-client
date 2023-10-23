import React                    from 'react'
import {
  DialogModalRootComponent,
  EasyDialogApolloProvider
}                               from '../../../../../../components/EasyModel/EasyModal'
import { CenteredDialog }       from '../../../../../../components/Dialog/DialogBasic'
import ExpensesForm             from '../../../modal/forms/ExpensesForm'
import ClientPart               from '../../../preview/Header'
import NumberDate               from './NumberDate'
import Finance                  from './Finance'
import { FontAwesomeIcon }      from '@fortawesome/react-fontawesome'
import {
  faCaretDown,
  faCaretLeft
}                               from '@fortawesome/free-solid-svg-icons'
import EmptyTag                 from '../../../../../../components/Util/EmptyTag'
import DueDateView              from './DueDateView'
import { TCalculation }         from '../../../../../../graphql/type_logic/types'
import {
  IHeaderDocumentState,
  IInvoiceExpense
}                               from '../../../modal/DocumentHeaderForm'
import InvoiceTaxesView         from './InvoiceTaxesView'
import _                        from 'lodash'
import { formatPrice }          from '../../../../../utils/Utils'
import { FOCUS_ID }             from '../../../../../constants/FocusElementIDs'
import {
  IUseOptimizeEventData,
  useOptimizeEventClick
}                               from '../../../../../../components/hooks/useOptimizeEventClick'
import { CONSTANT_CALCULATION } from '../../../../../constants'

const Header = ( { calculation, state, handlerOpenCloseHeader, changeHeaderDialog } : { calculation : TCalculation, state : boolean, handlerOpenCloseHeader : () => void, changeHeaderDialog? : ( { fieldFocus, focusId } : { fieldFocus? : string, focusId? : string } ) => void } ) => {

  const totalFinance = React.useMemo( () => ( calculation as any ).totalFinanceVP || 0, [calculation] )
  const taxFinance = React.useMemo( () => calculation.financeTax || 0, [calculation] )

  const finalFinance = _.round( _.add( totalFinance, taxFinance ), 2 )

  const { onClickHandler } = useOptimizeEventClick( {
    eventHandler ( data : IUseOptimizeEventData ) {
      if ( data.action === CONSTANT_CALCULATION.EVENTS.HEADER.CHANGE_CLICK_EVENT_HEADER_PARTS ) {
        changeHeaderDialog && changeHeaderDialog( {
          fieldFocus : data.id,
          focusId : data.param
        } )
      }
    }
  } )

  return (
    <div className={ 'relative' }>
      {
        calculation.supplier && ( calculation as any ).totalFinanceMP && calculation.number ?
          <div className={ 'cursor-pointer hw-show-hide-header-icon' } onClick={ handlerOpenCloseHeader }>
            <FontAwesomeIcon icon={ state ? faCaretDown : faCaretLeft } style={ { fontSize : '30px' } }/>
          </div> : <></>
      }
      {
        state ?
          <div data-action-root onClick={ onClickHandler } className={ `d-flex flex-row align-items-center justify-content-between px-2 mb-1 cursor-pointer ${ state ? '' : '' }` }>
            <div className={ '' }>
              <ClientPart supplier={ calculation.supplier } warehouse={ calculation.warehouse }/>
            </div>
            <div className={ '' }>
              <NumberDate calculation={ calculation }/>
            </div>
            <div
                            data-action={ CONSTANT_CALCULATION.EVENTS.HEADER.CHANGE_CLICK_EVENT_HEADER_PARTS }
                            data-action-param={ FOCUS_ID.CALCULATION.DOCUMENT_FORM.DUE_DATE_BUTTON }
            >
              <DueDateView dueDate={ calculation.dueDate }/>
            </div>
            <div
                            className={ 'calculation-form-invoice-vats' }
                            data-action={ CONSTANT_CALCULATION.EVENTS.HEADER.CHANGE_CLICK_EVENT_HEADER_PARTS }
                            data-action-param={ FOCUS_ID.CALCULATION.DOCUMENT_FORM.INVOICE_TAXES_BUTTON }
            >
              <InvoiceTaxesView invoiceTaxes={ calculation.vats }/>
            </div>
            <div
                            className={ 'calculation-discount-expenses ' }
                            data-action={ CONSTANT_CALCULATION.EVENTS.HEADER.CHANGE_CLICK_EVENT_HEADER_PARTS }
                            data-action-id={ 'totalFinanceMP' }
            >
              <Finance calculation={ calculation }/>
            </div>
          </div>
          :
          <div className={ `d-flex flex-row align-items-center justify-content-between px-2 mb-1 ${ state ? ' hw-height-effect' : '' }` }>
            <div className={ '' }>
              <div style={ { color : '#184264' } } className={ 'font-bold text-upper d-flex flex-column text-center' }>
                <div className={ 'font-smaller-6 opacity-6 hw-show-hide-header-label' }>description</div>
                <EmptyTag model={ calculation.supplier } field={ 'shortName' } placeholder={ 'CLIENT NAME' }/>
              </div>
            </div>
            <div className={ '' }>
              <div style={ { color : '#184264' } } className={ 'font-bold text-upper d-flex flex-column text-center' }>
                <div className={ 'font-smaller-6 opacity-6 font-weight-bold hw-show-hide-header-label text-center' }>calculation number</div>
                <EmptyTag model={ calculation } field={ 'number' } placeholder={ 'CALCULATION NUMBER' }/>
              </div>
            </div>
            <div className={ '' }>
              <div style={ { color : '#184264' } } className={ 'font-bold text-upper d-flex flex-column text-center' }>
                <div className={ ' font-smaller-6 opacity-6 hw-show-hide-header-label text-center' }>Base finance</div>
                { ( calculation as any ).totalFinanceVP ? formatPrice( totalFinance ) : 'INVOICE FINANCE' }
              </div>
            </div>
            {/*  <div className={''}>
                         <div style={{color: '#184264'}} className={'font-bold text-upper d-flex flex-column text-center'}>
                         <div className={' font-smaller-6 opacity-6 hw-show-hide-header-label text-center'}>discount</div>
                         {formatPrice(discountFinance)}
                         </div>
                         </div>*/ }
            <div className={ '' }>
              <div style={ { color : '#184264' } } className={ 'font-bold text-upper d-flex flex-column text-center' }>
                <div className={ ' font-smaller-6 opacity-6 hw-show-hide-header-label text-center' }>Tax</div>
                { formatPrice( taxFinance ) }
              </div>
            </div>
            <div className={ '' }>
              <div style={ { color : '#184264' } } className={ 'font-bold text-upper d-flex flex-column text-center' }>
                <div className={ 'font-smaller-6 opacity-6 hw-show-hide-header-label text-center' }>Finance</div>
                <div>{ formatPrice( finalFinance ) }</div>
              </div>
            </div>
          </div>
      }
    </div>
  )
}

export default Header

export const openDialogCalculationExpenses = ( handlerSuccessFunction : ( extraExpense : IInvoiceExpense ) => void, state : IHeaderDocumentState ) => {

  EasyDialogApolloProvider( ( closeDialog : () => any, openDialog : ( data : any ) => any ) => {
    openDialog( <DialogModalRootComponent name={ 'open-calculation-expenses-84938059' } closeFn={ closeDialog }>
      <CenteredDialog
                closeAction={ closeDialog }
                Component={ ExpensesForm }
                componentRenderProps={ {
                  closeDialog : closeDialog,
                  successFunction : handlerSuccessFunction,
                  state
                } }
      />
    </DialogModalRootComponent> )
  }, FOCUS_ID.CALCULATION.DOCUMENT_FORM.INVOICE_EXPENSE_BUTTON )
}
