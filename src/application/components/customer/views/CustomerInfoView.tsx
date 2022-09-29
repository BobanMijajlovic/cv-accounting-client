import React                    from 'react'
import { get as _get }          from 'lodash'
import ComponentRender          from '../../../../components/Util/ComponentRender'
import { useCustomerDashboard } from '../../../../store/customer/useCustomer'

const CustomerInfoView = () => {
  const {data} = useCustomerDashboard()

  const customer = _get(data, 'selected', 0)

  const isShortName = React.useMemo(() => customer && customer.shortName && customer.shortName.length > 0, [customer])

  return (
    <div className={'d-flex flex-row justify-content-between align-items-center hw-info-view-root font-smaller-2'}>
      <ComponentRender justify-content={'center'} label={'Name'} model={customer} field={isShortName ? 'shortName' : 'fullName'} maxLength={!isShortName ? 40 : undefined} classNames={'font-bold'}/>
      <ComponentRender justify-content={'center'} label={'Tax ID#'} model={customer} field={'taxNumber'}/>
      <ComponentRender justify-content={'center'} label={'Company Num#'} model={customer} field={'uniqueCompanyNumber'}/>
    </div>
  )
}

export default CustomerInfoView