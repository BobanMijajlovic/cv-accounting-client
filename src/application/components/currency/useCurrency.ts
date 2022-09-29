import {
  useGetCurrencyListQuery,
  useUpdateCurrencyDefinitionMutation
} from '../../../graphql/graphql'
import React, { useEffect } from 'react'
import {
  LocalStorage,
  STORAGE_APPLICATION_CURRENCIES
}                           from '../../utils/LocalStorage'
import { CONSTANT_MODEL }   from '../../constants'

export const useCurrency = (init ?: boolean) => {

  const {saveData, getData} = LocalStorage

  const [updateCurrency] = useUpdateCurrencyDefinitionMutation()
  const {data, refetch} = useGetCurrencyListQuery({
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'network-only',
    skip: !init
  })

  const updateCurrencyStatus = (id : number | string, status : number) => {
    updateCurrency({
      variables: {
        id: Number(id),
        data: {
          status
        }
      }
    })
      .then(() => {
        refetch().then()
      })
  }

  useEffect(() => {
    if (data && data.data && data.data.length !== 0) {
      saveData(data.data, STORAGE_APPLICATION_CURRENCIES)
    }
  }, [data, saveData])

  const currencies = getData(STORAGE_APPLICATION_CURRENCIES)

  const {activeCurrencies, selectNotActiveCurrencies} = React.useMemo(() => currencies && currencies.length !== 0 ?
    {
      activeCurrencies: currencies.filter((currency : any) => currency && currency.currencyDefinition && currency.currencyDefinition.status === CONSTANT_MODEL.STATUS.ACTIVE),
      selectNotActiveCurrencies: currencies.filter((currency : any) => currency && currency.currencyDefinition && currency.currencyDefinition.status === CONSTANT_MODEL.STATUS.NOT_ACTIVE).map((x : any) => {
        return {
          label: x.currencyDefinition.name,
          value: x.currencyDefinition.id
        }
      }),
    }
    : {
      activeCurrencies: [],
      selectNotActiveCurrencies: []
    },
    [currencies])

  return {
    activeCurrencies,
    selectNotActiveCurrencies,
    updateCurrencyStatus
  }
}
