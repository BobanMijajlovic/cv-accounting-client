import {
  applyMiddleware,
  combineReducers,
  compose,
  createStore
}                                        from 'redux'
import thunk, { ThunkMiddleware }        from 'redux-thunk'
import { IStoreWarehouse }               from './warehouse/type'
import warehouse                         from './warehouse'
import activeBackground                  from './active-background'
import calculation                       from './calculation'
import dialogsUI                         from './dialog-ui'
import invoice                           from './invoice'
import receipt                           from './receipt'
import application                       from './application'
import bankTransaction                   from './bank-transaction'
import warehouseTransfer                 from './warehouse-transfer'
import proformaInvoice                   from './proforma-invoice'
import customer                          from './customer'
import item                              from './items'
import vats                              from './vats'
import client                            from './client'
import returnInvoice                     from './return-invoice'
import financeTransferDocument           from './finance-transfer-document'
import normative                         from './normative'
import productionOrder                   from './production-order'
import category                          from './category'
import { IStoreActiveBackground }        from './active-background/type'
import { IStoreCalculation }             from './calculation/type'
import { IStoreInvoice }                 from './invoice/type'
import { IDialogUI }                     from './dialog-ui/type'
import { IStoreReceipt }                 from './receipt/type'
import { IApplicationStore }             from './application/type'
import { IStoreBankTransaction }         from './bank-transaction/type'
import { IStoreWarehouseTransfer }       from './warehouse-transfer/type'
import { IStoreProformaInvoice }         from './proforma-invoice/type'
import { IStoreCustomer }                from './customer/type'
import { IStoreItem }                    from './items/type'
import { IStoreVats }                    from './vats/type'
import { IStoreClient }                  from './client/type'
import { IStoreReturnInvoice }           from './return-invoice/type'
import { IStoreFinanceTransferDocument } from './finance-transfer-document/type'
import { IStoreNormative }               from './normative/type'
import { IStoreProductionOrder }         from './production-order/type'
import { IStoreCategory }                from './category/type'

export interface IReduxStore {
  application : IApplicationStore,
  warehouse : IStoreWarehouse,
  activeBackground : IStoreActiveBackground,
  calculation : IStoreCalculation
  dialogsUI : IDialogUI[],
  invoice : IStoreInvoice
  receipt : IStoreReceipt
  bankTransaction : IStoreBankTransaction
  warehouseTransfer : IStoreWarehouseTransfer
  proformaInvoice : IStoreProformaInvoice,
  customer : IStoreCustomer,
  item : IStoreItem,
  vats : IStoreVats,
  client : IStoreClient,
  returnInvoice : IStoreReturnInvoice,
  financeTransferDocument : IStoreFinanceTransferDocument,
  normative : IStoreNormative,
  productionOrder: IStoreProductionOrder,
  category: IStoreCategory
}

export const rootReducer = combineReducers( {
  application,
  warehouse,
  activeBackground,
  calculation,
  dialogsUI,
  invoice,
  receipt,
  bankTransaction,
  warehouseTransfer,
  proformaInvoice,
  customer,
  item,
  vats,
  client,
  returnInvoice,
  financeTransferDocument,
  normative,
  productionOrder,
  category
} )

export type RootState = ReturnType<typeof rootReducer>

const middleware = thunk as ThunkMiddleware

// const ReduxDevTools = (window as any).__REDUX_DEVTOOLS_EXTENSION__ && ((window as any).__REDUX_DEVTOOLS_EXTENSION__() || compose)
const ReduxDevTools = typeof ( window as any ).__REDUX_DEVTOOLS_EXTENSION__ === 'undefined'
  ? ( a : any ) => a
  : ( window as any ).__REDUX_DEVTOOLS_EXTENSION__ &&
    ( window as any ).__REDUX_DEVTOOLS_EXTENSION__()

const store = createStore( rootReducer, compose( applyMiddleware( middleware ), ReduxDevTools ) )

export default store
