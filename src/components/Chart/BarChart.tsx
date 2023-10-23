import React, { useRef } from 'react'
import { Bar }           from 'react-chartjs-2'

export interface IBarChartProps {
  label ?: string
  chartData : any
  labels ?: string[] | null,
  onHover ?: (event : any,elements : any) => void
  options ?: any
}

const BarChart = ({chartData,label,labels,options} : IBarChartProps) => {
  const chartRef = useRef(null)
  const data = {
    labels: labels || ['January', 'February', 'March', 'April', 'May', 'June', 'July','August','September','October','November','December'],
    datasets: [
      {
        label: label,
        backgroundColor: 'rgb(24, 66, 100)',
        borderColor: 'rgba(0,0,0,0.35)',
        borderWidth: 0.5,
        data: chartData
      }
    ]
  }

  return (
    <Bar ref={chartRef} data={data} options={options}/>
  )
}

export default BarChart

