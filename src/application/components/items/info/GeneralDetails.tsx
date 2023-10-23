import React, { useMemo }                   from 'react'
import EmptyTag                             from '../../../../components/Util/EmptyTag'
import { FontAwesomeIcon }                  from '@fortawesome/react-fontawesome'
import ConditionalRendering                 from '../../../../components/Util/ConditionalRender'
import { CONSTANT_ITEM }                    from '../../../constants'
import ButtonShortcut                       from '../../../../components/Button/ButtonShortcut'
import { KeyboardEventCodes }               from '../../../../components/hooks/useExternalKeybaord'
import { faInfoCircle }                     from '@fortawesome/free-solid-svg-icons/faInfoCircle'
import { VatCustomRender }                  from '../../_common/VatRender'
import * as _                               from 'lodash'
import { get as _get }                      from 'lodash'
import { formatPrice }                      from '../../../utils/Utils'
import { useTranslationFunction }           from '../../../../components/Translation/useTranslation'
import { useItemDashboard }                 from '../../../../store/items/useItem'
import ItemPurchasePriceRender              from '../../_common/ItemPurchasePriceRender'
import { faEye }                            from '@fortawesome/free-solid-svg-icons'
import { useWarehouseItemsQuery }           from '../../../../graphql/graphql'
import { queryVariablesItemPurchasePrices } from '../../../../graphql/variablesQ'
import { TWarehouseItem }                   from '../../../../graphql/type_logic/types'

interface IGeneralDetailsProps {
  notShowEditButton? : boolean
}

const GeneralDetails = ({notShowEditButton} : IGeneralDetailsProps) => {

  const {selected : item} = useItemDashboard()
  const {translate} = useTranslationFunction()

  const queryWarehouseItems = React.useMemo(() => {
    const itemId = _get(item, 'id', 0)
    if (!itemId) {
      return undefined
    }
    return queryVariablesItemPurchasePrices(0, 1, `${ itemId }`)
  }, [item])

  const {data} = useWarehouseItemsQuery({
    notifyOnNetworkStatusChange : true,
    fetchPolicy : 'cache-and-network',
    variables : queryWarehouseItems,
    skip : !queryWarehouseItems
  })
    
  const warehouseItems = useMemo(() => !data || !data.data || !data.data.items ? [] :  data.data.items,[data])

  const category = useMemo(() => item && item.itemsCategories && item.itemsCategories.length ? item.itemsCategories[0].category : {},[item])

  return (
    <div className={ 'd-flex flex-column w-100 justify-content-start align-items-start mt-2 text-upper'}>
      <div className={ 'd-flex justify-content-between mb-1 color-primary w-100' }>
        <div className={ 'd-flex font-smaller-2 align-items-center ' }>
          <div className={ 'pr-2' }><FontAwesomeIcon icon={ faInfoCircle }/></div>
          <div className={ 'text-upper' }>{ translate('GENERAL_DETAILS') }</div>
        </div>
        <ConditionalRendering condition={ !notShowEditButton }>
          <div
                        data-action={ CONSTANT_ITEM.EVENTS.EDIT }
                        data-action-id={ _.get(item, 'id') }
          >
            <ButtonShortcut
                            icon={ faInfoCircle }
                            label={ translate('SMALL_BUTTON_EDIT') }
                            shortcut={ KeyboardEventCodes.F5 }
                            classNames={ 'hw-shortcut-button primary sm hw-button-border-color mr-3' }
            />
          </div>
        </ConditionalRendering>
      </div>
      <div className={ 'font-bigger-2 font-weight-300 line-height-11 color-primary font-weight-600 pb-2' }>
        <EmptyTag model={ item } field={ 'shortName' } placeholder={ translate('LABEL_SHORT_NAME') }/>
      </div>
      <div className={ 'font-smaller-4 text-center pb-2' }>
        <EmptyTag model={ item } field={ 'fullName' } placeholder={ translate('LABEL_FULL_NAME') }/>
      </div>
      <div className={ 'd-flex flex-column hw-items-general-details-row' }>
        <div className={ 'd-flex flex-row justify-content-start align-items-center color-primary' }>
          <div className={ 'font-smaller-3 text-left opacity-6 min-width-120' }>{ translate('BARCODE', true) }&nbsp;:</div>
          <div className={ 'px-1 font-smaller-1 font-weight-bold flex-2 text-right' }>
            <EmptyTag model={ item } field={ 'barCode' } placeholder={ '#########' }/>
          </div>
        </div>
        <div className={ 'd-flex flex-row align-items-center color-primary' }>
          <div className={ 'font-smaller-3 text-left opacity-6 min-width-120' }>{ translate('CODE', true) }&nbsp;:</div>
          <div className={ 'px-1 font-smaller-1 font-weight-bold flex-2 text-right' }>
            <EmptyTag model={ item } field={ 'code' } placeholder={ '#########' }/>
          </div>
        </div>
        <div className={ 'd-flex flex-row align-items-center color-primary' }>
          <div className={ 'font-smaller-3 text-left opacity-6 min-width-120' }>Category &nbsp;:</div>
          <div className={ 'px-1 font-smaller-1 font-weight-bold flex-2 text-right' }>
            <EmptyTag model={ category } field={ 'name' } placeholder={ 'Category' }/>
          </div>
        </div>
        <div className={ 'd-flex flex-row align-items-center color-primary' }>
          <div className={ 'font-smaller-3 text-left opacity-6 min-width-120' }>{ translate('ITEMS_WHOLESALE_PRICE', true) }&nbsp;:</div>
          <div className={ 'px-1 font-smaller-1 font-weight-bold flex-2 text-right' }>
            <EmptyTag model={ item } field={ 'vp' } placeholder={ '####' } format={ formatPrice }/>
          </div>
        </div>
        <div className={ 'd-flex flex-row align-items-center color-primary' }>
          <div className={ 'font-smaller-3 text-left opacity-6 min-width-120' }>{ translate('ITEMS_RETAIL_PRICE', true) }&nbsp;:</div>
          <div className={ 'px-1 font-smaller-1 font-weight-bold flex-2 text-right' }>
            <EmptyTag model={ item } field={ 'mp' } placeholder={ '####' } format={ formatPrice }/>
          </div>
        </div>
        <div className={ 'd-flex flex-row align-items-center color-primary' }>
          <div className={ 'font-smaller-3 text-left opacity-6 min-width-120 text-upper' }>{ translate('LABEL_TAX') }&nbsp;:</div>
          <div className={ 'px-1 font-smaller-1 font-weight-bold flex-2 text-right' }>
            { item ? <VatCustomRender value={ (item as any).taxId }/> : <>&nbsp;</> }
          </div>
        </div>
        <div className={ 'd-flex flex-row align-items-center color-primary relative' }>
          <div className={ 'font-smaller-3 text-left opacity-6 min-width-120 text-upper' }>{ translate('LABEL_PURCHASE_PRICE') }&nbsp;:</div>
          { item ? <ItemPurchasePriceRender warehouseItems={warehouseItems as  TWarehouseItem[]}/> : <span className={ 'opacity-6' }>##.##</span> }
          { item && warehouseItems?.[0] && (
            <div
                            className={ 'hw-item-purchase-price-show-history-button' }
                            data-action={ CONSTANT_ITEM.EVENTS.SHOW_PURCHASE_PRICE_HISTORY }
                            data-action-id={ _.get(item, 'id') }
            >
              <ButtonShortcut
                                icon={ faEye }
                                shortcut={ KeyboardEventCodes.F7 }
                                label={ translate('LABEL_SHOW_HISTORY_BUTTON') }
                                classNames={ 'hw-shortcut-button primary sm hw-button-border-color mr-3' }
              />
            </div>
          )
          }
        </div>
      </div>

    </div>
  )

}

export default GeneralDetails
