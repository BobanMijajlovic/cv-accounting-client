import { useBanksQuery } from '../../graphql/graphql'
import { useMemo }       from 'react'

export const useBanks = () => {

  const {data} = useBanksQuery({
    fetchPolicy:'cache-and-network'
  })

  const banks = useMemo(() => data && data.data ?  data.data : [] ,[data])

  const getBankByCode = (code: number) => {
    return banks.find(b => Number(b.id) === code)
  }

  return {
    banks:banks,
    getBankByCode
  }
}