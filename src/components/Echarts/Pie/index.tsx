import React from 'react';
import ReactECharts from 'echarts-for-react';
import commonOption from '../commonOption'

interface item {
  value: number,
  name: string
}

interface PropsType {
  title: string,
  data: Array<item>
}

const Pie = (props: PropsType) => {
  const { title, data } = props

  const options = {
    ...commonOption,

    title: {
      text: title,
      padding: [20, 20, 0, 20]
    },



    tooltip: {
      trigger: 'item'
    },

    legend: {
      right: 10,
      top: '20%',
      orient: 'vertical',
    },

    series: [
      {
        name: '时间占比',
        type: 'pie',
        radius: ['40%', '70%'],
        center: ['40%', '55%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2
        },
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: '20',
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: false
        },
        data: data
      }
    ]
  };


  return (
    <ReactECharts option={options} style={{ height: '100%', width: '100%' }} />
  )
}

export default Pie