import {IInvoiceDashboard}  from '../invoice/type'
import {
  ACTIONS,
  IStateAction,
  IStoreProformaInvoice
}                           from '../proforma-invoice/type'
import ProformaInvoiceTable from '../../application/components/proforma-invoice/views/MainView/MainView'
import ProformaInvoiceForm  from '../../application/components/proforma-invoice/views/InstanceView'

const initStateTabs = {
  tabName: 'Proforma Invoices',
  tabContent: ProformaInvoiceTable,
}

export const initialState : IStoreProformaInvoice = {
  proformaInvoiceTabs: [
    initStateTabs
  ],
  activeTab: {
    activeTab: 0,
    triggerChange: 0
  },
  proformaInvoice: {} as IInvoiceDashboard
}

export default (state = initialState, action : IStateAction) : IStoreProformaInvoice => {
  switch (action.type) {
    case ACTIONS.removeProformaInvoiceTab:
      return ((state) => {
        const index = state.proformaInvoiceTabs.findIndex(x => x.id === action.payload.id)
        if (index !== -1) {
          return state
        }
        const proformaInvoiceTabs = [...state.proformaInvoiceTabs]
        proformaInvoiceTabs.splice(index, 1)
        return {
          ...state,
          activeTab: {
            activeTab: 0,
            triggerChange: (new Date()).getTime()
          },
          proformaInvoiceTabs
        }
      })(state) as IStoreProformaInvoice

    case ACTIONS.setFieldProformaInvoiceDashboard:
      return ((state) => {
        const {payload} = action
        const {field, data} = payload
        return {
          ...state,
          proformaInvoice: {
            ...state.proformaInvoice,
            [field as string]: data
          }
        }
      })(state) as IStoreProformaInvoice

    case ACTIONS.addProformaInvoiceTab:
      return ((state) => {
        return {
          ...state,
          activeTab: {
            activeTab: Number(action.payload.id),
            triggerChange: (new Date()).getTime()
          },
          proformaInvoiceTabs: [{...initStateTabs}, {
            tabName: 'Proforma Invoice Form',
            tabContent: ProformaInvoiceForm,
            tabContentProps: {
              proformaInvoiceId: action.payload.id
            }
          }]
        }
      })(state) as IStoreProformaInvoice
    default:
      return state
  }

}