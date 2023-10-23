import React              from 'react'
import {TProformaInvoice} from '../../../../../../graphql/type_logic/types'
import {
  formatDateLong,
  formatPrice
}                         from '../../../../../utils/Utils'
import ComponentRender    from '../../../../../../components/Util/ComponentRender'

const NumberDate = ({proformaInvoice, handlerChangeDiscount} : { proformaInvoice : TProformaInvoice,handlerChangeDiscount : (field? : string) => void }) => {
  const discount = React.useMemo(() => proformaInvoice.discountDefault ? proformaInvoice.discountDefault : 0, [proformaInvoice])
  return (
    <div className={'d-flex flex-column justify-content-between align-items-center font-smaller-1 flex-fill'}>
      <div className={'d-flex flex-row pb-4 justify-content-between w-100'}>
        <ComponentRender label={'invoice number'} value={proformaInvoice.number} labelClass={'text-upper opacity-6 font-weight-normal'} classNames={'pr-4'}/>
        <ComponentRender label={'invoice discount'} value={`${formatPrice(discount)} %`} handlerClick={ handlerChangeDiscount } classNames={'cursor-pointer'} labelClass={'text-upper opacity-6 font-weight-normal'}/>
      </div>
      <div className={'d-flex flex-row pb-4 justify-content-between w-100'}>
        <ComponentRender label={'date of invoice'} value={proformaInvoice.date} format={formatDateLong} labelClass={'text-upper opacity-6 font-weight-normal'} classNames={'pr-4'}/>
        <ComponentRender label={''} value={''} labelClass={'text-upper opacity-6 font-weight-normal'}/>
      </div>
    </div>
  )
}

export default NumberDate