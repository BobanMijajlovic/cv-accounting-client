import {
  AuthLoginDocument,
  AuthUserLogin,
  BankAccountFilterDocument,
  CalculationsDocument,
  CustomerExternalByBankAccountDocument,
  CustomerExternalByNameDocument,
  CustomerExternalByTinDocument,
  CustomersDocument,
  DueDatesSummarizeByFilterDocument,
  FindItemsWithNormativeDocument,
  GetTranslateDocument,
  InvoicesDocument,
  ItemDocument,
  ItemsDocument,
  NormativeDocument,
  ReturnInvoicesDocument,
  UserDocument,
  WarehouseDocument,
  WarehouseItemByFilterDocument,
  WarehousesDocument
} from './graphql'
import {
  queryDueDatesSummarizeByFilter,
  queryVariablesForAutoComplete,
  queryVariablesForAutoCompleteNormativeItems,
  queryVariablesForCustomerCardTableCalculation,
  queryVariablesForCustomerCardTableInvoice,
  queryVariablesForSale
} from './variablesQ'
import { client }         from '../apollo'
import {
  TCalculation,
  TDueDates,
  TInvoice,
  TReturnInvoice
}                         from './type_logic/types'
import {
  add as _add,
  get as _get,
  pick as _pick,
  round as _round,
  sortBy as _sortBy
}                         from 'lodash'
import { CONSTANT_MODEL } from '../application/constants'

class ApolloAsyncCallClass {

  private logOutCallBack : any
  private logInCallBack : any

  setLogOutFun = ( f : any ) => this.logOutCallBack = f
  setLogInFun = ( f : any ) => this.logInCallBack = f

  logOut = () => {
    this.logOutCallBack()
  }

  logIn = ( userId : number ) => {
    this.logInCallBack( userId )
  }

  user = ( id : number ) => {
    return new Promise( ( resolve, reject ) => {
      client.query( {
        query : UserDocument,
        fetchPolicy : 'network-only',
        variables : {
          id
        }
      } ).then( ( result : any ) => resolve( result ) )
        .catch( ( e : any ) => reject( e ) )
    } )
  }

  login = ( data : Partial<AuthUserLogin> ) => {
    return new Promise( ( resolve, reject ) => {
      client.query( {
        query : AuthLoginDocument,
        fetchPolicy : 'network-only',
        variables : { data }
      } ).then( ( result : any ) => resolve( result ) )
        .catch( ( e : any ) => reject( e ) )
    } )
  }

  warehouse = ( id : number ) => {
    return new Promise( ( resolve, reject ) => {
      client.query( {
        query : WarehouseDocument,
        fetchPolicy : 'network-only',
        variables : {
          id
        }
      } ).then( ( result : any ) => resolve( result ) )
        .catch( ( e : any ) => reject( e ) )
    } )
  }

  itemsFind = ( value : string, findBy : string[] = ['shortName', 'fullName', 'barCode', 'code'] ) => {
    value = value.trim()
    return new Promise( resolve => {
      if ( value.length === 0 ) {
        return resolve( [] )
      }
      client.query( {
        query : ItemsDocument,
        fetchPolicy : 'network-only',
        variables : queryVariablesForAutoComplete( findBy, value )
      } ).then( ( result : any ) => {
        let data = _get( result, 'data.data.items' )
        !data && ( data = [] )
        resolve( data )
      } )
        .catch( ( e : any ) => {
          console.log( e )
        } )
    } )
  }

  getItemById = ( value : string | number ) => {
    return new Promise( resolve => {
      client.query( {
        query : ItemDocument,
        fetchPolicy : 'network-only',
        variables : {
          id : Number( value )
        }
      } ).then( ( result : any ) => {
        resolve( result?.data?.item )
      } )
        .catch( ( e : any ) => {
          console.log( e )
        } )
    } )
  }

  findItemForSale = ( value : string, findBy : string[] = ['barCode', 'code'] ) => {
    value = value.trim()
    return new Promise( resolve => {
      if ( value.length === 0 ) {
        return resolve( [] )
      }
      client.query( {
        query : ItemsDocument,
        fetchPolicy : 'network-only',
        variables : queryVariablesForSale( findBy, value )
      } ).then( ( result : any ) => {
        let data = _get( result, 'data.data.items' )
        !data && ( data = [] )
        resolve( data )
      } )
        .catch( ( e : any ) => {
          console.log( e )
        } )
    } )
  }

  customerFind = ( value : string, findBy : string[] = ['shortName', 'fullName', 'taxNumber', 'uniqueCompanyNumber'] ) => {
    value = value.trim()
    return new Promise( resolve => {
      if ( value.length === 0 ) {
        return resolve( [] )
      }
      client.query( {
        query : CustomersDocument,
        fetchPolicy : 'network-only',
        variables : queryVariablesForAutoComplete( findBy, value, 10 )
      } ).then( ( result : any ) => {
        let data = _get( result, 'data.data.items' )
        !data && ( data = [] )
        resolve( data )
      } )
        .catch( ( e : any ) => {
          console.log( e )
        } )
    } )
  }

  warehouseFind = ( value : string, findBy : string[] = ['name', 'description'] ) => {
    value = value.trim()
    return new Promise( resolve => {
      if ( value.length === 0 ) {
        return resolve( [] )
      }
      client.query( {
        query : WarehousesDocument,
        fetchPolicy : 'network-only',
        variables : queryVariablesForAutoComplete( findBy, value, 10 )
      } ).then( ( result : any ) => {
        let data = _get( result, 'data.data.items' )
        !data && ( data = [] )
        resolve( data )
      } )
        .catch( ( e : any ) => {
          console.log( e )
        } )
    } )
  }

  bankAccounts = ( value : string ) => {
    value = value.trim()
    return new Promise( resolve => {
      if ( value.length === 0 ) {
        return resolve( [] )
      }
      client.query( {
        query : BankAccountFilterDocument,
        fetchPolicy : 'network-only',
        variables : {
          value
        }
      } ).then( ( result : any ) => {
        let data = _get( result, 'data.data' )
        !data && ( data = [] )
        resolve( data )
      } )
        .catch( ( e : any ) => {
          console.log( e )
        } )
    } )
  }

  warehouseItem = ( value : string, warehouseId : number ) => {
    value = value.trim()
    return new Promise( resolve => {
      if ( value.length === 0 ) {
        return resolve( [] )
      }
      client.query( {
        query : WarehouseItemByFilterDocument,
        fetchPolicy : 'network-only',
        variables : {
          value,
          warehouseId
        }
      } ).then( ( result : any ) => {
        let data = _get( result, 'data.data' )
        !data && ( data = [] )
        resolve( data )
      } )
        .catch( ( e : any ) => {
          console.log( e )
        } )
    } )
  }

  getLanguage = ( lang : string, force? : boolean ) => {
    return new Promise( resolve => {
      client.query( {
        query : GetTranslateDocument,
        fetchPolicy : 'no-cache',
        variables : {
          lang,
          force
        }
      } ).then( ( result : any ) => {
        let data = _get( result, 'data.data' )
        !data && ( data = [] )
        resolve( data )
      } )
        .catch( ( e : any ) => {
          console.log( e )
        } )
    } )
  }

  getCustomerExternal = ( value : string ) => {
    value = value.trim()
    return new Promise( resolve => {
      if ( value.length === 0 ) {
        return resolve( [] )
      }
      client.query( {
        query : CustomerExternalByNameDocument,
        fetchPolicy : 'network-only',
        variables : {
          value
        }
      } )
        .then( ( result : any ) => {
          let data = _get( result, 'data.data' )
          !data && ( data = [] )
          resolve( data )
        } )
        .catch( ( e : any ) => {
          console.log( e )
        } )
    } )
  }

  getCustomerExternalByTin = ( value : string ) => {
    value = value.trim()
    return new Promise( ( resolve, reject ) => {
      if ( value.length === 0 ) {
        return resolve( {} )
      }
      client.query( {
        query : CustomerExternalByTinDocument,
        fetchPolicy : 'network-only',
        variables : {
          value
        }
      } )
        .then( ( result : any ) => {
          let data = _get( result, 'data.data' )
          !data && ( data = {} )
          resolve( data )
        } )
        .catch( ( e : any ) => {
          reject( e )
        } )
    } )
  }

  getCustomerExternalByBankAccount = ( value : string ) => {
    value = value.trim()
    return new Promise( ( resolve, reject ) => {
      if ( value.length === 0 ) {
        return resolve( {} )
      }
      client.query( {
        query : CustomerExternalByBankAccountDocument,
        fetchPolicy : 'network-only',
        variables : {
          value
        }
      } )
        .then( ( result : any ) => {
          let data = _get( result, 'data.data' )
          !data && ( data = {} )
          resolve( data )
        } )
        .catch( ( e : any ) => {
          reject( e )
        } )
    } )
  }

  getCustomerSummarize = async ( customerId ?: number ) => {
    const delayDate = new Date()
    const futureDate = new Date()
    const todayDate = new Date()
    delayDate.setDate( delayDate.getDate() - 1 )
    futureDate.setDate( futureDate.getDate() + 1 )
      
    const variables = Object.assign({
      status : CONSTANT_MODEL.DUE_DATES_STATUS.ACTIVE,
      attributes : ['flag', 'status', 'customerId'],
      group : ['flag', 'status', 'customerId'],
    },customerId ? {customerId} : {})

    const delayPromise = client.query( {
      query : DueDatesSummarizeByFilterDocument,
      fetchPolicy : 'no-cache',
      variables : queryDueDatesSummarizeByFilter( {
        ...variables,
        dateTo : delayDate,       
      } )
    } )

    const todayPromise = client.query( {
      query : DueDatesSummarizeByFilterDocument,
      fetchPolicy : 'no-cache',
      variables : queryDueDatesSummarizeByFilter( {
        ...variables,
        dateFrom : todayDate,
        dateTo : todayDate,
      } )
    } )

    const futurePromise = client.query( {
      query : DueDatesSummarizeByFilterDocument,
      fetchPolicy : 'no-cache',
      variables : queryDueDatesSummarizeByFilter( {
        ...variables,
        dateFrom : futureDate,
      } )
    } )

    const [_delay, _today, _future] = await Promise.all( [delayPromise, todayPromise, futurePromise] )

    const defaultState = {
      finance : 0,
      flag : null
    }

    const delay = _get( _delay, 'data.data', void( 0 ) )
    const today = _get( _today, 'data.data', void( 0 ) )
    const future = _get( _future, 'data.data', void( 0 ) )

    const getDataInFlag = ( data : any ) => {
      if ( !data ) {
        return data
      }
      return data.find( ( x : any ) => x.flag === CONSTANT_MODEL.TAX_FINANCE_FLAG.IN )
    }
    const getDataOutFlag = ( data : any ) => {
      if ( !data ) {
        return data
      }
      return data.find( ( x : any ) => x.flag === CONSTANT_MODEL.TAX_FINANCE_FLAG.OUT )
    }

    return {
      owesDelay : getDataInFlag( delay ) || defaultState,
      claimsDelay : getDataOutFlag( delay ) || defaultState,
      owesToday : getDataInFlag( today ) || defaultState,
      claimsToday : getDataOutFlag( today ) || defaultState,
      owesFuture : getDataInFlag( future ) || defaultState,
      claimsFuture : getDataOutFlag( future ) || defaultState
    }
  }

  getCustomerCardData = async ( options : any ) => {
    const calcPromise = client.query( {
      query : CalculationsDocument,
      fetchPolicy : 'no-cache',
      variables : queryVariablesForCustomerCardTableCalculation( options )
    } )
    const invoicePromise = client.query( {
      query : InvoicesDocument,
      fetchPolicy : 'no-cache',
      variables : queryVariablesForCustomerCardTableInvoice( options )
    } )

    const returnInvoicePromise = client.query( {
      query : ReturnInvoicesDocument,
      fetchPolicy : 'no-cache',
      variables : queryVariablesForCustomerCardTableInvoice( options )
    } )

    const [calcData, invData, retInvData] = await Promise.all( [calcPromise, invoicePromise, returnInvoicePromise] )

    const newCalcData = _get( calcData, 'data.data.items' ).map( ( calc : TCalculation ) => {
      return {
        document : calc.number,
        calculationId : calc.id,
        owes : calc.totalFinanceMP,
        claims : 0,
        date : calc.date,
        dueDates : calc.dueDate && ( calc.dueDate as any ).length === 1 ? _pick( ( calc.dueDate as any )[0], ['dueDate', 'finance'] ) : ( calc.dueDate as any ).map( ( x : TDueDates ) => _pick( x, ['date', 'finance'] ) )
      }
    } )
    const newInvoiceData = _get( invData, 'data.data.items' ).map( ( inv : TInvoice, index : number ) => {
      return {
        document : inv.number,
        invoiceId : inv.id,
        owes : 0,
        claims : _round( _add( Number( inv.totalFinanceVP ), Number( inv.totalFinanceTax ) ), 2 ),
        date : inv.date,
        dueDates : inv.dueDates && ( inv.dueDates as any ).length === 1 ? _pick( ( inv.dueDates as any )[0], ['dueDate', 'finance'] ) : ( inv.dueDates as any ).map( ( x : TDueDates ) => {
          return {
            finance : x.finance,
            date : x.date
          }
        } )
      }
    } )

    const newReturnInvoiceData = _get( retInvData, 'data.data.items' ).map( ( inv : TReturnInvoice, index : number ) => {
      return {
        document : inv.number,
        returnInvoiceId : inv.id,
        owes : _round( _add( Number( inv.totalFinanceVP ), Number( inv.totalFinanceTax ) ), 2 ),
        claims : 0,
        date : inv.date,
        dueDates : inv.dueDates && ( inv.dueDates as any ).length === 1 ? _pick( ( inv.dueDates as any )[0], ['dueDate', 'finance'] ) : ( inv.dueDates as any ).map( ( x : TDueDates ) => {
          return {
            finance : x.finance,
            date : x.date
          }
        } )
      }
    } )

    const result = _sortBy( [...newCalcData,
      ...newInvoiceData, ...newReturnInvoiceData], ['date'] )
    return result.map( ( x : any, index : number ) => {
      return {
        ...x,
        id : index
      }
    } )
  }

  normativeItemsFind = ( value : string ) => {
    value = value.trim()
    return new Promise( resolve => {
      if ( value.length === 0 ) {
        return resolve( [] )
      }
      client.query( {
        query : FindItemsWithNormativeDocument,
        fetchPolicy : 'network-only',
        variables : {
          value
        }
      } ).then( ( result : any ) => {
        let data = _get( result, 'data.data' )
        !data && ( data = [] )
        resolve( data )
      } )
        .catch( ( e : any ) => {
          console.log( e )
        } )
    } )
  }

}
const ApolloAsyncCall = new ApolloAsyncCallClass()

export default ApolloAsyncCall
