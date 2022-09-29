import {
  ACTIONS,
  IInvoiceDashboard,
  IStateAction,
  IStoreInvoice
}                   from './type'
import InvoiceTable from '../../application/components/invoice/views/MainView'
import InvoiceForm  from '../../application/components/invoice/form'

const initSateTabs = {
  tabName: 'Invoices',
  tabContent: InvoiceTable,
}

export const initialState: IStoreInvoice = {
  invoiceTabs: [
    initSateTabs
  ],
  activeTab: {
    activeTab: 0,
    triggerChange: 0
  },
  invoice: {} as IInvoiceDashboard
}

export default (state = initialState, action: IStateAction): IStoreInvoice => {
  switch (action.type) {
    case ACTIONS.removeInvoiceTab:
      return ((state) => {
        const index = state.invoiceTabs.findIndex(x => x.id === action.payload.id)
        if (index !== -1) {
          return state
        }
        const invoiceTabs = [...state.invoiceTabs]
        invoiceTabs.splice(index, 1)
        return {
          ...state,
          activeTab: {
            activeTab: 0,
            triggerChange: (new Date()).getTime()
          },
          invoiceTabs
        }
      })(state)

    case ACTIONS.setFieldInvoiceDashboard:
      return ((state) => {
        const { payload } = action
        const { field, data } = payload
        return {
          ...state,
          invoice: {
            ...state.invoice,
            [field as string]: data
          }
        }
      })(state) as IStoreInvoice

    case ACTIONS.addInvoiceTab:
      return ((state) => {
        return {
          ...state,
          activeTab: {
            activeTab: Number(action.payload.id),
            triggerChange: (new Date()).getTime()
          },
          invoiceTabs: [{ ...initSateTabs }, {
            tabName: 'Invoice Form',
            tabContent: InvoiceForm,
            tabContentProps: {
              invoiceId: action.payload.id
            }
          }]
        }
      })(state)
    default:
      return state
  }

}

