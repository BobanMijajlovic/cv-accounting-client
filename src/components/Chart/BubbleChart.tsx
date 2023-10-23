import React    from 'react'
import {Bubble} from 'react-chartjs-2'

const bubbleStyle = {
  fill: false,
  lineTension: 0.1,
  backgroundColor: 'rgba(75,192,192,0.4)',
  borderColor: 'rgba(75,192,192,1)',
  borderCapStyle: 'butt',
  borderDash: [],
  borderDashOffset: 0.0,
  borderJoinStyle: 'miter',
  pointBorderColor: 'rgba(75,192,192,1)',
  pointBackgroundColor: '#fff',
  pointBorderWidth: 1,
  pointHoverRadius: 5,
  pointHoverBackgroundColor: 'rgba(75,192,192,1)',
  pointHoverBorderColor: 'rgba(220,220,220,1)',
  pointHoverBorderWidth: 2,
  pointRadius: 1,
  pointHitRadius: 10,
}

export interface IBubbleChartProps {
  label ?: string
  labels ?: string[]
  chartData : any
}

const BubbleChart = ({labels, label, chartData} : IBubbleChartProps) => {

  const dataChart = chartData.map((value : any, index : number) => {
    return {
      x: (labels as any)[index],
      y: value,
      r: 5
    }
  })
  const data = {
    labels: labels || ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    datasets: [
      {
        label: label,
        data: dataChart,
        ...bubbleStyle
      }
    ]
  }

  return <Bubble data={data}/>
}

export default BubbleChart