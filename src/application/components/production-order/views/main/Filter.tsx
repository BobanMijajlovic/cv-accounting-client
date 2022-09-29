import React, {
  ChangeEvent,
  useCallback
}                                    from 'react'
import ButtonShortcut                from '../../../../../components/Button/ButtonShortcut'
import {
  faBackspace,
  faBarcode,
  faUserTie
} from '@fortawesome/free-solid-svg-icons'
import {
  KeyboardEventCodes,
  useExternalKeyboard
}                                    from '../../../../../components/hooks/useExternalKeybaord'
import { TItem }                     from '../../../../../graphql/type_logic/types'
import {
  InputTextDatePicker,
  Select
}                                    from '../../../../../components/basic/withState'
import * as _                        from 'lodash'
import { CONSTANT_PRODUCTION_ORDER } from '../../../../constants'
import { useProductionOrder }        from '../../../../../store/production-order/useProductionOrder'
import { useTranslationFunction }    from '../../../../../components/Translation/useTranslation'
import { openDialogItemSearch }      from '../../../items/modal/ItemSearch'
import ItemShortView                 from '../../../items/view/ItemShortView'

const ProductionOrderFilter = () => {
  const { translate } = useTranslationFunction()
  const {productionOrder, setItem, setDateFrom, setDateTo, setStatus} = useProductionOrder()

  const changeDateFrom = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    if (!_.get(event, 'target.closed')) {
      return
    }
    setDateFrom(_.get(event, 'target.date'))
  }, [setDateFrom])

  const changeDateTo = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    if (!_.get(event, 'target.closed')) {
      return
    }
    setDateTo(_.get(event, 'target.date'))
  }, [setDateTo])

  const changeStatus = useCallback((event: ChangeEvent<HTMLSelectElement>) => {
    setStatus(_.get(event, 'target.value'))
  }, [setStatus])

  const startSearchingDay = React.useMemo(() => {
    const date = new Date()
    date.setDate(date.getDate() - 15)
    return date
  }, [])

  const {setRef} = useExternalKeyboard((e: KeyboardEvent) => {
    switch (e.key) {
      case KeyboardEventCodes.F2:
        return
    }
  }, true, [KeyboardEventCodes.F2], 'production-order-main-table-search')

  const changeItem = useCallback((item: TItem) => setItem(item), [setItem])

  const handlerChooseItem = () => {
    openDialogItemSearch(changeItem)
  }
  const handlerClearItem = () => {
    changeItem({} as TItem)
  }
  
  const handlerChangeItem = () => {
    productionOrder.item && productionOrder.item.id  ? handlerClearItem() : handlerChooseItem()
  }
  
  return (
    <div className={'d-flex align-content-stretch h-100 justify-content-between relative warehouse-item-table-search-part border'} ref={setRef}>
      <div className={'d-flex justify-content-end align-items-center'}>
        {productionOrder.item && productionOrder.item.id ?
          <ButtonShortcut
                        icon={faBackspace}
                        label={translate('BUTTON_CLEAR')}
                        color={'danger'}
                        shortcut={KeyboardEventCodes.F2}
                        classNames={'hw-shortcut-button-white-version mr-3 '}
                        onClick={handlerChangeItem}
          /> :
          <ButtonShortcut
                        icon={faBarcode}
                        label={'ITEM'}
                        shortcut={KeyboardEventCodes.F2}
                        classNames={'hw-shortcut-button primary sm hw-button-border-color mr-3'}
                        onClick={handlerChangeItem}
          />
        }
        <div className={'warehouse-item-customer-part'}>
          <ItemShortView item={productionOrder.item as TItem}/>
        </div>

      </div>
      <div className={'d-flex justify-content-between  align-items-end warehouse-item-table-dates-part relative'}>
        <div className={'d-flex justify-content-between warehouse-item-table-dates-part'}>
          <div>
            <InputTextDatePicker
                            date={startSearchingDay}
                            align={'align-center'}
                            format={'dd/MM/yyyy'}
                            helperText={translate('DATE_FROM')}
                            classNames={'lined-version'}
                            value={_.get(productionOrder, 'dateFrom', '')}
                            onChange={changeDateFrom}
                            useLabel={false}
                            label={''}
            />
          </div>
          <div className={'mx-4'}>
            <InputTextDatePicker
                            format={'dd/MM/yyyy'}
                            align={'align-center'}
                            helperText={translate('DATE_TO')}
                            classNames={'lined-version '}
                            value={_.get(productionOrder, 'dateTo', '')}
                            onChange={changeDateTo}
                            useLabel={false}
                            label={''}
                            position={'right'}
            />
          </div>
        </div>
      </div>
      <div className={'hw-calculation-table-status-part'}>
        <Select
                    label={translate('LABEL_STATUS')}
                    helperText={''}
                    fullWidth
                    lined
                    options={CONSTANT_PRODUCTION_ORDER.TYPES_SELECT.STATUS}
                    value={_.get(productionOrder, 'status', '0')}
                    onChange={changeStatus}
        />
      </div>
    </div> 
  )
}

export default ProductionOrderFilter