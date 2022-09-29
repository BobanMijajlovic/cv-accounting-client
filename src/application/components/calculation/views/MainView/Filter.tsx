import {useCalculation}            from '../../../../hooks/useCalculation'
import React, {
  ChangeEvent,
  useCallback
}                                  from 'react'
import {TCustomer}                 from '../../../../../graphql/type_logic/types'
import {openDialogAddEditCustomer} from '../../../customer/modal/CustomerSearch'
import ButtonShortcut              from '../../../../../components/Button/ButtonShortcut'
import {
  faBackspace,
  faUserTie
}                                  from '@fortawesome/free-solid-svg-icons'
import CustomerViewShort           from '../../../customer/views/CustomerViewShort'
import {
  InputTextDatePicker,
  Select
}                                  from '../../../../../components/basic/withState'
import {CONSTANT_CALCULATION}      from '../../../../constants'
import * as _                      from 'lodash'
import {
  KeyboardEventCodes,
  useExternalKeyboard
}                                  from '../../../../../components/hooks/useExternalKeybaord'

const CalculationTableSearch = () => {

  const {calculation, setDateFrom, setDateTo, setStatus, setSelectedCustomer} = useCalculation()

  const changeDateFrom = useCallback((event : ChangeEvent<HTMLInputElement>) => {
    if (!_.get(event, 'target.closed')) {
      return
    }
    setDateFrom(_.get(event, 'target.date'))
  }, [setDateFrom])

  const changeDateTo = useCallback((event : ChangeEvent<HTMLInputElement>) => {
    if (!_.get(event, 'target.closed')) {
      return
    }
    setDateTo(_.get(event, 'target.date'))
  }, [setDateTo])

  const changeStatus = useCallback((event : ChangeEvent<HTMLSelectElement>) => {
    setStatus(_.get(event, 'target.value'))
  }, [setStatus])

  const handlerChangeSupplier = useCallback((customer : TCustomer) => setSelectedCustomer(customer), [setSelectedCustomer])

  const handlerChooseCustomer = () => {
    openDialogAddEditCustomer(handlerChangeSupplier)
  }

  const handlerClearCustomer = () => {
    handlerChangeSupplier({} as TCustomer)
  }

  const handlerChangeCustomer = () => {
    calculation.supplier && calculation.supplier.id ?  handlerClearCustomer() : handlerChooseCustomer()
  }

  const startSearchingDay = React.useMemo(() => {
    const date = new Date()
    date.setDate(date.getDate() - 15)
    return date
  }, [])

  const {setRef} = useExternalKeyboard((e : KeyboardEvent) => {
    switch (e.key) {
      case KeyboardEventCodes.F2:
        handlerChangeCustomer()
        return
    }
  }, true, [KeyboardEventCodes.F2], 'calculation main table search')

  return (
    <div className={'d-flex align-content-stretch h-100 justify-content-between relative warehouse-item-table-search-part border'} ref={setRef}>
      <div className={'d-flex justify-content-end align-items-center'}>
        {calculation.supplier && calculation.supplier.id ?
          <ButtonShortcut
                        icon={faBackspace}
                        label={'CLEAR'}
                        color={'danger'}
                        classNames={'hw-shortcut-button-white-version mr-3 sm '}
                        onClick={handlerClearCustomer}
                        shortcut={KeyboardEventCodes.F2}
          /> :
          <ButtonShortcut
                        icon={faUserTie}
                        label={'Customer'}
                        classNames={'hw-shortcut-button primary sm hw-button-border-color mr-3'}
                        onClick={handlerChooseCustomer}
                        shortcut={KeyboardEventCodes.F2}
          />
        }
        <div className={'warehouse-item-customer-part'}>
          <CustomerViewShort customer={calculation.supplier as TCustomer}/>
        </div>

      </div>
      <div className={'d-flex justify-content-between  align-items-end warehouse-item-table-dates-part relative'}>
        <div className={'d-flex justify-content-between warehouse-item-table-dates-part'}>
          <div>
            <InputTextDatePicker
                            date={startSearchingDay}
                            align={'align-center'}
                            format={'dd/MM/yyyy'}
                            helperText={'date from'}
                            classNames={'lined-version'}
                            value={_.get(calculation, 'dateFrom', '')}
                            onChange={changeDateFrom}
                            useLabel={false}
                            label={''}
            />
          </div>
          <div className={'mx-4'}>
            <InputTextDatePicker
                            format={'dd/MM/yyyy'}
                            align={'align-center'}
                            helperText={'date to'}
                            classNames={'lined-version '}
                            value={_.get(calculation, 'dateTo', '')}
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
                    label={'Status'}
                    helperText={''}
                    fullWidth
                    lined
                    options={CONSTANT_CALCULATION.TYPES_SELECT.CALCULATION_STATUS}
                    value={_.get(calculation, 'status', '0')}
                    onChange={changeStatus}
        />
      </div>
    </div>
  )
}

export default CalculationTableSearch
