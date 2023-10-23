import React, {useRef} from 'react'
import {Line}          from 'react-chartjs-2'

export interface ILineChartProps {
  label ?: string
  labels ?: string[]
  chartData : any
}

const LineChart = ({chartData,label, labels} : ILineChartProps) => {
  const chartRef = useRef(null)
  const data = {
    labels: labels || ['January', 'February', 'March', 'April', 'May', 'June', 'July','August','September','October','November','December'],
    datasets: [
      {
        label: label,
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'rgb(24, 66, 100)',
        borderColor: 'rgb(24, 66, 100)',
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
        data: chartData
      }
    ]
  }

  return (
    <Line ref={chartRef} data={data} />
  )
}

export default LineChart
