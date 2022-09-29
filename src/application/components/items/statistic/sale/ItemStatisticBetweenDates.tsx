import React, {
  ChangeEvent,
  useCallback,
  useState
}                                                     from 'react'
import * as _                                         from 'lodash'
import { get as _get }                                from 'lodash'
import { FontAwesomeIcon }                            from '@fortawesome/react-fontawesome'
import {
  faDollarSign,
  faWeightHanging
}                                                     from '@fortawesome/free-solid-svg-icons'
import { useTotalTransactionBetweenDatesByItemQuery } from '../../../../../graphql/graphql'
import { InputTextDatePicker }                        from '../../../../../components/basic/withState'
import {
  formatDateShort,
  formatPrice,
  formatQuantity
}                                                     from '../../../../utils/Utils'
import ConditionalRendering                           from '../../../../../components/Util/ConditionalRender'
import { IconProp }                                   from '@fortawesome/fontawesome-svg-core'
import { useItemDashboard }                           from '../../../../../store/items/useItem'
import { SpinnerLoadingCenter }                       from '../../../../../components/Spinner/SpinnerLoading'

interface IItemStatisticBetweenDates {
  dateFrom ?: string | Date
  dateTo ?: string | Date
}

const setDateStartEnd = (date : Date | string,end ?: boolean) => {
  const _date = new Date(date)
  _date.setMinutes(end ? 59 : 0 )
  _date.setSeconds(end ? 59 : 0 )
  _date.setHours(end ? 23 : 0 )
  return _date
}

const ItemStatisticBetweenDates = () => {
  const {selected: globalItemData} = useItemDashboard()

  const [state,setState] : [IItemStatisticBetweenDates, (r : IItemStatisticBetweenDates) => void] = useState({} as IItemStatisticBetweenDates)

  const startSearchingDay = React.useMemo(() => {
    const date = new Date()
    date.setDate(date.getDate() - 14)
    return date
  }, [])

  const querySaleItems = React.useMemo(() => {
    const itemId = _get(globalItemData, 'id', 0)
    if (!itemId) {
      return undefined
    }
    return {
      itemId: Number(itemId),
      dateStart: state.dateFrom ? setDateStartEnd(state.dateFrom) : startSearchingDay,
      dateEnd: state.dateTo ? setDateStartEnd(state.dateTo,true) : new Date(),
    }
  }, [globalItemData,state, setDateStartEnd, startSearchingDay])

  const {data, loading} = useTotalTransactionBetweenDatesByItemQuery({
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'no-cache',
    variables: querySaleItems,
    skip: !querySaleItems
  })

  const tableData = React.useMemo(() => !data || !data.saleItems ? [] : data.saleItems ,[data])

  const changeDateFrom = useCallback((event : ChangeEvent<HTMLInputElement>) => {
    if (!_.get(event, 'target.closed')) {
      return
    }
    setState({
      ...state,
      dateFrom: _.get(event, 'target.date')
    })
  }, [state])

  const changeDateTo = useCallback((event : ChangeEvent<HTMLInputElement>) => {
    if (!_.get(event, 'target.closed')) {
      return
    }
    setState({
      ...state,
      dateTo: _.get(event, 'target.date')
    })
  }, [state])

  return (
    <>
      {loading ? <SpinnerLoadingCenter/> : null}
      <div className={'d-flex flex-column hw-item-statistic-between-dates-root flex-2'} >
        <div className={'d-flex justify-content-between align-items-center pb-2'}>
          <div className={'color-primary font-smaller-5'}>SALE STATISTIC BETWEEN DATES</div>
          <div className={'d-flex justify-content-between hw-item-statistic-dates-root'}>
            <div>
              <InputTextDatePicker
                date={startSearchingDay}
                format={'dd/MM/yyyy'}
                align={'align-center'}
                classNames={'lined-version hw-datepicker-no-input'}
                value={_.get(state, 'dateFrom', '')}
                onChange={changeDateFrom}
                useHelpText={false}
                label={'date from'}
                position={'right'}
              />

            </div>
            <div className={'ml-4'}>
              <InputTextDatePicker
                date={new Date()}
                align={'align-center'}
                format={'dd/MM/yyyy'}
                helperText={'date to'}
                useHelpText={false}
                classNames={'lined-version hw-datepicker-no-input'}
                value={_.get(state, 'dateTo', '')}
                onChange={changeDateTo}
                label={'date to'}
              />
            </div>
          </div>
        </div>
        <div style={{minHeight: 60}}>
          <ConditionalRendering condition={tableData.length === 0} >
            <div className={'d-flex flex-row flex-fill color-primary text-center font-smaller-3'}>
            No data in table. Choose dates to show data.
            </div>
          </ConditionalRendering>
          <ConditionalRendering condition={tableData.length !== 0}>
            <div className={'d-flex flex-row flex-fill font-smaller-3 overflow-x relative'}>
              {
                tableData.map((item : any,key : number) => {
                  return <OneItem key={key} data={item} index={key}/>
                })
              }
            </div>
          </ConditionalRendering>
        </div>

      </div>
    </>
  )
}

export default ItemStatisticBetweenDates

export const OneItem = ({data, index} : {data : any, index : number}) => {
  const financeMP = _.round(_.add(data.financeVP,data.taxFinance),2)
  return (
    <div className={`d-flex flex-column align-items-end flex-1 hw-item-statistic-between-row${index % 2 === 0 ? ' row-even' : ' row-odd'}`}>
      <div className={'letter-spacing-1 text-center w-100'}>{formatDateShort(data.date)}</div>
      <Field value={data.quantity} icon={faWeightHanging} format={formatQuantity}/>
      <Field value={financeMP} icon={faDollarSign} format={formatPrice}/>
    </div>
  )
}

export const Field = ({value,format,icon} : {value : number, format : (value : any) => any,icon : IconProp}) => {
  return (
    <div className={'d-flex justify-content-between border-left pr-1 w-100'}>
      <div className={' color-primary px-1 font-smaller-1'}><FontAwesomeIcon icon={icon} style={{width: '1.1em'}}/></div>
      <div>{format(value)}</div>
    </div>
  )
}