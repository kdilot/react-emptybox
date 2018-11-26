import React, { Component } from 'react';
import echarts from 'echarts';
import debounce from 'lodash/debounce';

const colorArray = ['#FF8B94','#F4BE90', '#9BBFCC', '#96BEB2', '#EEEBB7']
const browser = {
  color: colorArray,
  tooltip: {
    trigger: 'item',
    formatter: "{a} <br/>{b}: {d}%"
  },
  legend: {
    orient: 'vertical',
    x: 'left',
    data: ['IE', 'Chrome', 'Firefox', 'Safari', 'Etc'],
    textStyle: {
      fontSize: '15'
    }
  },
  series: [
    {
      name: 'Browser',
      type: 'pie',
      center: ['60%', '50%'],
      radius: ['50%', '65%'],
      avoidLabelOverlap: false,
      label: {
        normal: {
          show: false,
          position: 'center'
        },
        emphasis: {
          show: true,
          textStyle: {
            fontSize: '30',
            fontWeight: 'bold'
          }
        }
      },
      labelLine: {
        normal: {
          show: false
        }
      },
      data: [
        { value: 22, name: 'IE' },
        { value: 33, name: 'Chrome' },
        { value: 16, name: 'Firefox' },
        { value: 20, name: 'Safari' },
        { value: 7, name: 'Etc' }
      ]
    }
  ]
}
const bar = {
  color: colorArray,
  xAxis: {
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    }
  },
  yAxis: {
    type: 'value'
  },
  series: [{
    data: [98, 159, 132, 248, 200, 216, 247],
    type: 'bar'
  }]
}
const comp = {
  color: colorArray,
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross',
      crossStyle: {
        color: '#999'
      }
    },
    formatter: '{a0}: {c0}%<br />{a1}: {c1}%<br />{a2}: {c2}%'
  },
  toolbox: {
    feature: {
      magicType: { show: true, type: ['line', 'bar'], title: { 'line': 'line', 'bar': 'bar' } },
      restore: { show: true, title: 'restore' },

    }
  },
  legend: {
    left: 10,
    data: ['~2016', '2017', '2018']
  },
  grid: {
    left: '3%',
    right: '3%',
    containLabel: true
  },
  xAxis: [
    {
      type: 'category',
      data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      axisPointer: {
        type: 'shadow'
      }
    }
  ],
  yAxis: [
    {
      type: 'value',
      min: 0,
      max: 20,
      interval: 4,
      axisLabel: {
        formatter: '{value}%'
      }
    },
    {
      type: 'value',
      min: 0,
      max: 20,
      interval: 4,
      axisLabel: {
        formatter: '{value}%'
      }
    }
  ],
  series: [
    {
      name: '2017',
      type: 'bar',
      data: [6,10,4,5,11,7,17,8,5,11,13,3]
    },
    {
      name: '2018',
      type: 'bar',
      data: [3,6,9,4,6,13,10,12,8,8,11,10]
    },
    {
      name: '~2016',
      type: 'line',
      yAxisIndex: 1,
      data: [10,4,7,14,5,5,6,10,7,11,8,13]
    }
  ]
}

class VisitorCharts extends Component {
  showChart = (opt) => {
    const myChart = echarts.init(this.chart)
    this.echart = myChart
    opt === 'browser' ?
      myChart.setOption(browser)
      : opt === 'bar' ?
        myChart.setOption(bar)
        :
        myChart.setOption(comp)
  }

  handleResize = debounce(() => {
    if (this.echart) {
      this.echart.resize()
    }
  }, 100)

  componentDidMount() {
    this.showChart(this.props.option)
    window.addEventListener('resize', this.handleResize)
  }
  render() {
    return (
      <div>
        <div style={{ width: '100%', height: '15em' }} ref={ref => (this.chart = ref)} />
      </div>
    );
  }
}

export default VisitorCharts;