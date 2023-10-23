import React, {useState} from 'react'
import LineChart         from './LineChart'
import {Select}          from '../basic/withState'
import BarChart          from './BarChart'
import PieChart          from './PieChart'
import DoughnutChart     from './DoughnutChart'

interface IItemChartState {
  labelsType : 'weekly' | 'monthly' | 'year',
  chartType : 'line'| 'pie' | 'doughnut' | 'bar' | 'bubble' | 'polar',
  charType2 : 'line' | 'bar'
}

const selectBy = [
  {
    label: 'Calculation',
    value: 'line'
  },
  {
    label: 'Invoice',
    value: 'bar'
  }
]

const selectChartsOptions = [
  {
    label: 'Line Chart',
    value: 'line'
  },
  {
    label: 'Pie Chart',
    value: 'pie'
  },
  {
    label: 'Doughnut Chart',
    value: 'doughnut'
  },
  {
    label: 'Bar Chart',
    value: 'bar'
  }
]

interface IChartProps {
  title : string
  labels : string[]
  chartData : number[]
  chartType ?: 'line' | 'bar' | 'pie' | 'doughnut' | 'bubble' | 'polar'
}

const Chart = (props : IChartProps) => {

  const [state,setState] : [IItemChartState,(r : IItemChartState) => void] = useState({
    labelsType : 'monthly',
    chartType: props.chartType,

  } as IItemChartState)

  const handlerOnChangeChartType = (e : React.ChangeEvent<HTMLSelectElement>) => {
    setState({
      ...state,
      chartType: e.target.value as any,
    })
  }

  const renderChartByType = () => {
    let Component : any
    switch (state.chartType) {
      case 'line': Component = LineChart;break
      case 'bar':  Component = BarChart;break
      case 'pie': Component = PieChart ;break
      case 'doughnut': Component = DoughnutChart;break
    }
    return <Component label={props.title} labels={props.labels} chartData={props.chartData}  />
  }

  return (
    <div className={'d-flex flex-column flex-fill mt-2'}>
      <div className={'d-flex justify-content-between align-items-center'}>
        <div style={{minWidth: 160}}>
          <Select
              label={'Chart'}
              onChange={handlerOnChangeChartType}
              options={selectChartsOptions}
              value={state.chartType}
          />
        </div>
        <div style={{minWidth: 160}}>
          <Select
              label={'Select by input/output'}
              onChange={handlerOnChangeChartType}
              options={selectBy}
              value={state.charType2}

          />
        </div>
      </div>
      <div>
        { state.chartType ?
          renderChartByType()  : null
        }

      </div>
    </div>

  )
}

Chart.defaultProps = {
  chartType: 'line'
}

export default Chart
