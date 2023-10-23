import React, {useRef} from 'react'
import {Pie}           from 'react-chartjs-2'

export interface IPieChartProps {
  label ?: string
  chartData : any
  labels : string[]
}

const PieChart = ({chartData,label,labels} : IPieChartProps) => {
  const chartRef = useRef(null)
  const data = {
    labels: labels,
    datasets: [
      {
        label: label,
        backgroundColor: [
          '#B21F00',
          '#C9DE00',
          '#2FDE00',
          '#00A6B4',
          '#6800B4',
          '#4400b2',
          '#C9DE00',
          '#a2b49c',
          '#00A6B4',
          '#c36df8',
          '#ec957f',
          '#C9DE00',
        ],
        hoverBackgroundColor: [
          '#501800',
          '#4B5000',
          '#175000',
          '#003350',
          '#35014F',
          '#a83802',
          '#4B5000',
          '#0b2400',
          '#014f7b',
          '#56007b',
          '#2c9501',
          '#1a4d68',
        ],
        data: chartData
      }
    ]
  }
  const legend = {
    display: true,
    position: 'top',
    fullWidth: true,
    reverse: false,
    labels: {
      fontColor: 'rgb(1,66,95)'
    }
  }
  return (
    <Pie ref={chartRef} data={data} legend={legend}/>
  )
}

export default PieChart
