import React, {useRef} from 'react'
import {Doughnut}      from 'react-chartjs-2'

export interface IDoughnutChartProps {
  label ?: string
  chartData : any
}

const DoughnutChart =  ({chartData,label} : IDoughnutChartProps) => {
  const chartRef = useRef(null)
  const data = {
    labels: ['January', 'February', 'March',
      'April', 'May'],
    datasets: [
      {
        label: label,
        backgroundColor: [
          '#B21F00',
          '#C9DE00',
          '#2FDE00',
          '#00A6B4',
          '#6800B4'
        ],
        hoverBackgroundColor: [
          '#501800',
          '#4B5000',
          '#175000',
          '#003350',
          '#35014F'
        ],
        data: chartData
      }
    ]
  }

  return (
    <Doughnut ref={chartRef} data={data}/>
  )
}

export default DoughnutChart
