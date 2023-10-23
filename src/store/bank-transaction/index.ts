import {
  ACTIONS,
  IBankTransactionDashboard,
  IStateAction,
  IStoreBankTransaction
}                                from './type'
import BankTransactionDashboard from '../../application/components/bank-transaction/MainView'
import MainFormBankTransaction  from '../../application/components/bank-transaction/form'

const initSateTabs = {
  tabName : 'Bank Transactions',
  tabContent : BankTransactionDashboard
}

export const initialState : IStoreBankTransaction = {
  bankTransactionTabs : [
    initSateTabs
  ],
  activeTab : {
    activeTab : 0,
    triggerChange : 0
  },
  bankTransaction : {} as IBankTransactionDashboard
}

export default ( state = initialState, action : IStateAction ) : IStoreBankTransaction => {
  switch ( action.type ) {
    case ACTIONS.removeBankTransactionTab:
      return ( ( state ) => {
        const index = state.bankTransactionTabs.findIndex( x => x.id === action.payload.id )
        if ( index !== -1 ) {
          return state
        }
        const bankTransactionTabs = [...state.bankTransactionTabs]
        bankTransactionTabs.splice( index, 1 )
        return {
          ...state,
          activeTab : {
            activeTab : 0,
            triggerChange : ( new Date() ).getTime()
          },
          bankTransactionTabs
        }
      } )( state )

    case ACTIONS.setSelectedBankTransactionItem:
      return ( ( state ) => {
        return {
          ...state,
          selectedBankTransactionItemId: action.payload.id as any
        }
      } )( state )

    case ACTIONS.addBankTransactionTab:
      return ( ( state ) => {
        return {
          ...state,
          activeTab : {
            activeTab : Number( action.payload.id ),
            triggerChange : ( new Date() ).getTime()
          },
          bankTransactionTabs : [{ ...initSateTabs }, {
            tabName : 'Bank transaction Form',
            tabContent : MainFormBankTransaction,
            tabContentProps : {
              bankHeaderTransactionId : action.payload.id
            }
          }]
        }
      } )( state )

    case ACTIONS.setFieldBankTransactionDashboard:
      return ( ( state ) => {
        const { payload } = action
        const { field, data } = payload
        return {
          ...state,
          bankTransaction : {
            ...state.bankTransaction,
            [field as string] : data
          }
        }
      } )( state ) as IStoreBankTransaction

    default:
      return state
  }

}
