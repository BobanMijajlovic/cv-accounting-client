import ReturnInvoiceTable from '../../application/components/return-invoice/views/MainView/MainView'
import {
  ACTIONS,
  IReturnInvoiceDashboard,
  IStateAction,
  IStoreReturnInvoice
}                         from './type'
import ReturnInvoiceForm  from '../../application/components/return-invoice/views/InstanceView'

const initStateTabs = {
  tabName : 'Return Invoices',
  tabContent : ReturnInvoiceTable
}

export const initialState : IStoreReturnInvoice = {
  returnInvoiceTabs : [
    initStateTabs
  ],
  activeTab : {
    activeTab : 0,
    triggerChange : 0
  },
  returnInvoice : {} as IReturnInvoiceDashboard
}

export default ( state = initialState, action : IStateAction ) : IStoreReturnInvoice => {
  switch ( action.type ) {
    case ACTIONS.removeReturnInvoiceTab:
      return ( ( state ) => {
        const index = state.returnInvoiceTabs.findIndex( x => x.id === action.payload.id )
        if ( index !== -1 ) {
          return state
        }
        const returnInvoiceTabs = [...state.returnInvoiceTabs]
        returnInvoiceTabs.splice( index, 1 )
        return {
          ...state,
          activeTab : {
            activeTab : 0,
            triggerChange : ( new Date() ).getTime()
          },
          returnInvoiceTabs
        }
      } )( state )

    case ACTIONS.setFieldReturnInvoiceDashboard:
      return ( ( state ) => {
        const { payload } = action
        const { field, data } = payload
        return {
          ...state,
          returnInvoice : {
            ...state.returnInvoice,
            [field as string] : data
          }
        }
      } )( state ) as IStoreReturnInvoice

    case ACTIONS.addReturnInvoiceTab:
      return ( ( state ) => {
        return {
          ...state,
          activeTab : {
            activeTab : Number( action.payload.id ),
            triggerChange : ( new Date() ).getTime()
          },
          returnInvoiceTabs : [{ ...initStateTabs }, {
            tabName : 'Return Invoice Form',
            tabContent : ReturnInvoiceForm,
            tabContentProps : {
              returnInvoiceId : action.payload.id
            }
          }]
        }
      } )( state )
    default:
      return state
  }

}
