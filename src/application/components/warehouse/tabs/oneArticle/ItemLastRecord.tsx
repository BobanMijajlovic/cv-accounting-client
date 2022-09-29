import React                   from 'react'
import {useWarehouse}  from '../../../../../store/warehouse/useWarehouse'
import {
  formatDateLong,
  formatPrice,
  formatQuantity
} from '../../../../utils/Utils'
import ComponentRender from '../../../../../components/Util/ComponentRender'

const ItemLastRecord = ({warehouseId} : any) => {
  const {data: globalWarehouseData} = useWarehouse(warehouseId)
  /*  const [limit, setLimit] = useState(100)
    const _q = React.useMemo(() => {
      return queryVariablesWarehouseItemsLastRecords(0, limit, '1', ['1', '2'])
    }, [limit])

    useEffect(() => {
      setInterval(() => {
        setLimit(_random(90, 500))
      }, 5000)
    }, [setLimit])

    const __data = useWarehouseItemsInfoQuery({
      notifyOnNetworkStatusChange: true,
      fetchPolicy: 'network-only',
      variables: _q,
      onCompleted: (data) => {

      }
    })*/

  const itemRecord = React.useMemo(() => !globalWarehouseData?.item?.warehouseItem ? {
    transactionDate: '',
    quantityOnStack: '0',
    financeOnStack: '0',
    quantityTotalOwes: '0',
    quantityTotalClaims: '0',
    financeTotalOwes: '0',
    financeTotalClaims: '0'
  } as any : globalWarehouseData.item.warehouseItem, [globalWarehouseData])

  return (
    <div className={'d-flex flex-column  w-100'}>
      <div className={'d-flex justify-content-between flex-fill pt-1 font-smaller-1'}>
        <ComponentRender label={'Date'} value={formatDateLong(itemRecord.transactionDate)} labelClass={'justify-content-center'}/>
        <ComponentRender label={'Quantity Stack'} value={formatQuantity(`${itemRecord.quantityOnStack}`)} labelClass={'justify-content-center'}/>
        <ComponentRender label={'Finance Stack'} value={formatPrice(`${itemRecord.financeOnStack}`)} labelClass={'justify-content-center'}/>
        <ComponentRender label={'Quantity Owes'} value={formatQuantity(`${itemRecord.quantityTotalOwes}`)} labelClass={'justify-content-center'}/>
        <ComponentRender label={'Quantity Claims'} value={formatQuantity(`${itemRecord.quantityTotalClaims}`)} labelClass={'justify-content-center'}/>
        <ComponentRender label={'Finance Owes'} value={formatPrice(`${itemRecord.financeTotalOwes}`)} labelClass={'justify-content-center'}/>
        <ComponentRender label={'Finance Claims'} value={formatPrice(`${itemRecord.financeTotalClaims}`)} labelClass={'justify-content-center'}/>
      </div>
    </div>
  )
}

export default ItemLastRecord
