import React                      from 'react'
import { formatPrice }            from '../../../utils/Utils'
import { VatCustomRender }        from '../../_common/VatRender'
import {
  TCustomer,
  TItem
}                                 from '../../../../graphql/type_logic/types'
import { useTranslationFunction } from '../../../../components/Translation/useTranslation'

const AutoCompleteResultRenderItem = ({data, classNames, customer} : { data : TItem, classNames? : string, customer? : TCustomer }) => {
  const {translate} = useTranslationFunction()
  const isDefined = React.useMemo(() => {
    return data && data.vp !== undefined
  }, [data])

  const taxId = React.useMemo(() => !data || !data.taxId ? 0 : data.taxId, [data])
  const code = React.useMemo(() => !data || !data.itemSuppliers || (data.itemSuppliers as any).length === 0 ? '' : (() => {
    if (!customer || !data.itemSuppliers || !(data.itemSuppliers as any).length) {
      return ''
    }
    const itemSupplier = (data.itemSuppliers as any).reverse().find((x : any) => `${ (x.supplier as any).id }` === `${ customer.id }`)
    return itemSupplier ? itemSupplier.code : ''
  })(), [data, customer])

  return (
    <div className={ `d-flex flex-row border-bottom justify-content-between align-items-center p-1 cursor-pointer color-primary hw-height-effect ${ classNames ? ` ${ classNames }` : '' }` }>
      <div className={ 'd-flex flex-column flex-2  pl-1 align-items-start' }>
        { isDefined ? <div className={ 'text-upper text-overflow font-smaller-2' }>{ data.shortName }</div> :
          <div className={ 'opacity-7 text-upper font-smaller-4' }>{ translate('AUTOCOMPLETE_ITEM_SEARCH_RESULT_DESCRIPTION') }</div> }
        {/* {isDefined ?
          <div className={'text-overflow font-smaller-2'}>{isDefined ? data.fullName : '&nbsp;'}</div> :
          <div className={'opacity-7 text-upper font-smaller-5'}>Item long description</div>}*/ }
      </div>
      <div className={ 'd-flex flex-column' }>
        <div className={ 'd-flex flex-row justify-content-between font-smaller-3' }>
          { isDefined ? <div>{ data.barCode }</div> :
            <div className={ 'opacity-7 mr-3' }><sup> { translate('BARCODE') }</sup> ########</div> }
          { isDefined ? <div>{ code }</div> :
            <div className={ 'opacity-7' }><sup> { translate('CODE') }</sup> ########</div> }
        </div>
        <div className={ 'd-flex flex-row justify-content-end font-smaller-3' }>
          <div className={ 'd-flex flex-row ' }>
            { isDefined ? <div className={ 'pl-1' }>{ formatPrice(data.vp as any) }</div> :
              <div className={ 'opacity-7' }><sub>{ translate('LABEL_PRICE') }</sub> ##.##</div> }

            { isDefined ? <div className={ 'pl-3' }><VatCustomRender value={ taxId }/></div> :
              <div className={ 'opacity-7 pl-3' }><sub>{ translate('WAREHOUSE_ITEMS_TH_VAT') }</sub> ##.##%</div> }
            <div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AutoCompleteResultRenderItem
