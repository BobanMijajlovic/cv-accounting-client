import React, {
  useEffect,
  useMemo,
  useState
}                           from 'react'
import _                    from 'lodash'
import FinanceBalanceData   from './views/FinanceBalanceData'
import ApolloAsyncCallClass from '../../../../graphql/ApolloAsyncCallClass'

interface ICustomerFinanceBalanceProps {
  customerId ?: string
}

const CustomerFinanceBalance = ( { customerId } : ICustomerFinanceBalanceProps ) => {

  const [state, setState] = useState( {} as any )

  useEffect( () => {
    ( async () => {
      const data = await ApolloAsyncCallClass.getCustomerSummarize( Number( customerId ) )
      setState( data )
    } )()
  }, [customerId] )

  const data = useMemo( () => {
    if ( _.isEmpty( state ) ) {
      return {
        owes : 0,
        claims : 0,
        owesToday : 0,
        claimsToday : 0,
        delayOwes : 0,
        delayClaims : 0
      }
    }
    const { owesDelay, owesToday, owesFuture, claimsDelay, claimsToday, claimsFuture } = state
    return {
      owes : _.round( _.add( Number( owesDelay.finance ), _.add( owesToday.finance, owesFuture.finance ) ), 2 ),
      claims : _.round( _.add( Number( claimsDelay.finance ), _.add( claimsToday.finance, claimsFuture.finance ) ), 2 ),
      delayClaims : claimsDelay.finance,
      delayOwes : owesDelay.finance,
      claimsToday : claimsToday.finance,
      owesToday : owesToday.finance
    }
  }, [state] )

  return <FinanceBalanceData
        title={ `${customerId ? 'customer' : 'client'} finance balance` }
        { ...data }
  />

}

export default CustomerFinanceBalance

