import React from 'react';
import ReactECharts from 'echarts-for-react';
import commonOption from '../commonOption'

interface PropsType {
  title: string;
  data: {
    cetegory: Array<string>
    value: Array<Array<number>>
  }
}

const Bar = (props: PropsType) => {
  const { title, data } = props;

  const options = {
    ...commonOption,

    title: {
      text: title,
      padding: [20, 20, 0, 20]
    },

    xAxis: {
      type: 'category',
      data: data.cetegory,
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      }
    },

    yAxis: {
      type: 'value',
    },

    series: data.value.map((val) => {
      return {
        type: 'bar',
        data: val,
      }
    }),

    tooltip: {
      trigger: 'axis',
    },
  };

  return (
    <ReactECharts option={options} style={{ height: '100%', width: '100%' }} />
  )
}

export default Bar
