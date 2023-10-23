import {
  useDispatch,
  useSelector
}                            from 'react-redux'
import {IReduxStore}         from '../index'
import {useGetValidTaxQuery} from '../../graphql/graphql'
import {useCallback}         from 'react'
import {TTax}                from '../../graphql/type_logic/types'
import {fetchVats}           from './action'
import {formatPrice}         from '../../application/utils/Utils'

export const _fetchVats = (init ?: boolean) => {
  const dispatch = useDispatch()
  useGetValidTaxQuery({
    onCompleted: (data) => {
      data && data.validTax && setVats(data.validTax as any)
    },
    skip: !init
  })

  const setVats = useCallback((vats : TTax[]) => {
    dispatch(fetchVats(vats))
  }, [dispatch])
}

export const useVats = () => {
  const {vats} = useSelector((state : IReduxStore) => state.vats)

  const getVat = (id : number | string) => {

    if (!vats) {
      return {
        mark: undefined,
        value: 0,
        valueStr: formatPrice(0)
      } as any
    }
    id = +id
    const vat = vats.find(v => v.id === `${id}`)
    if (!vat) {
      return {
        mark: undefined,
        value: 0,
        valueStr: formatPrice(0)
      } as any
    }
    const value = (vat.values as any)[0].value
    const format = formatPrice(value)
    return {
      mark: vat.mark,
      value: value,
      valueStr: format
    } as any
  }

  return {
    data: vats,
    getVat
  }
}