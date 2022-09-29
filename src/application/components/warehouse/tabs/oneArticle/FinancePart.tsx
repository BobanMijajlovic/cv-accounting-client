import React             from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faInfoCircle}    from '@fortawesome/free-solid-svg-icons/faInfoCircle'
import {useWarehouse}    from '../../../../../store/warehouse/useWarehouse'
import ComponentRender   from '../../../../../components/Util/ComponentRender'
import _                 from 'lodash'
import {formatPrice}     from '../../../../utils/Utils'

const FinancePart = ({warehouseId} : any) => {

  const {data} = useWarehouse(warehouseId)

  const warehouse = React.useMemo(() => _.get(data, 'warehouse'), [data])

  const owes = React.useMemo(() => Number(_.get(warehouse, 'financeTotalOwes')), [warehouse])
  const claims = React.useMemo(() => Number(_.get(warehouse, 'financeTotalClaims')), [warehouse])
  const balance = React.useMemo(() => _.round(_.subtract(owes, claims), 2), [warehouse,owes,claims])
  return (
    <div className={'d-flex flex-column w-100 justify-content-start align-items-start relative  '}>
      <div className={'d-flex justify-content-start mb-1 color-primary w-100 font-smaller-4 absolute-top-minus'}>
        <div className={'pr-2'}><FontAwesomeIcon icon={faInfoCircle}/></div>
        <div className={'font-smaller-5'}>FINANCE WAREHOUSE DETAILS</div>
      </div>
      <div className={'d-flex justify-content-between w-100  font-smaller-1'}>
        <ComponentRender label={'Owes'} value={formatPrice(owes)} labelClass={'justify-content-center'}/>
        <ComponentRender label={'Claims'} value={formatPrice(claims)} labelClass={'justify-content-center'}/>
        <ComponentRender label={'Balance'} value={formatPrice(balance)} labelClass={'justify-content-center'}/>
      </div>
    </div>
  )

}

export default FinancePart
