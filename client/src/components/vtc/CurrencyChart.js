import React, { Component } from 'react';
import echarts from 'echarts';
import { Row, Col, Icon } from 'antd';
import debounce from 'lodash/debounce';
import moment from 'moment';
import styled from 'styled-components';

const Wrapper = styled.div`
  margin: 0.7em;
  font-size: 1.15em;

  div {
    margin: 0.5em 0;
  }
  h2, .slt-currencyType {
    font-weight: bold;
  }
`

class CurrencyChart extends Component {
  state = {
    selected: 0
  }
  drawChart = (params) => {
    if (params.length === 0) return ''
    const myChart = echarts.init(this.chart)
    this.echart = myChart
    let colorList = ['#c23531', '#2f4554', '#61a0a8', '#d48265', '#91c7ae', '#749f83', '#ca8622', '#bda29a', '#6e7074', '#546570', '#c4ccd3']
    function calculateMA(dayCount, data) {
      let result = []
      for (let i = 0; i < data.length; i++) {
        if (i < dayCount) {
          result.push('-')
          continue;
        }
        let sum = 0;
        for (let j = 0; j < dayCount; j++) {
          sum += data[i - j][1]
        }
        result.push((sum / dayCount).toFixed(8))
      }
      return result
    }

    let dates = []
    let data = []
    let volumes = []

    dates = params.map(list => moment(list.date * 1000).format('YYYY-MM-DD hh:mm:ss'))
    data = []
    volumes = []
    params.map(list => {
      let arr = []
      arr.push(list.open)
      arr.push(list.close)
      arr.push(list.low)
      arr.push(list.high)
      arr.push(list.volume)
      data.push(arr)
      volumes.push(list.volume)
      return ''
    })

    const option = {
      animation: false,
      color: colorList,
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          label: {
            formatter: (object) => {
              return isNaN(object.value)
                ? moment(object.value).format('YYYY MMM DD HH:mm')
                : object.value
            }
          },
          type: 'cross'
        },
        backgroundColor: 'rgba(245, 245, 245, 1)',
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        textStyle: {
          color: '#000'
        },
        position: function (pos, params, el, elRect, size) {
          let obj = {
            top: 32
          };
          obj[
            ['left', 'right'][+ (pos[0] < size.viewSize[0] / 2)]
          ] = 100;
          return obj;
        },
        extraCssText: 'width: 200px'
      },
      axisPointer: {
        link: {
          xAxisIndex: 'all'
        },
        label: {
          backgroundColor: '#777'
        }
      },
      dataZoom: [
        {
          type: 'inside',
          xAxisIndex: [
            0, 1
          ],
          start: 60,
          end: 100
        }, {
          show: true,
          xAxisIndex: [
            0, 1
          ],
          type: 'slider',
          bottom: '15%',
          height: '5%',
          start: 60,
          end: 100,
          showDetail: false
        }
      ],
      // animation: false,
      xAxis: [
        {
          type: 'category',
          data: dates,
          scale: true,
          axisLabel: {
            formatter: (date) => moment(date).format('MMM DD HH:mm')
          },
          axisLine: {
            onZero: false,
            lineStyle: { color: '#fff' }
          },
          splitLine: {
            show: false
          },
          splitNumber: 20,
          min: 'dataMin',
          max: 'dataMax',
          axisPointer: {
            z: 100
          }
        }, {
          type: 'category',
          gridIndex: 1,
          data: dates,
          scale: true,
          axisLine: {
            onZero: false
          },
          axisTick: {
            show: false
          },
          splitLine: {
            show: false
          },
          axisLabel: {
            show: false
          },
          splitNumber: 20,
          min: 'dataMin',
          max: 'dataMax'
        }
      ],
      yAxis: [
        {
          scale: true,
          axisLine: { lineStyle: { color: '#fff' } },
          splitArea: {
            show: true
          }
        }, {
          scale: true,
          gridIndex: 1,
          splitNumber: 2,
          axisLabel: {
            show: false
          },
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false
          },
          splitLine: {
            show: false
          }
        }
      ],
      grid: [
        {
          top: '1%',
          left: '5%',
          right: '5%',
          height: '60%'
        }, {
          left: '5%',
          right: '5%',
          bottom: '20%',
          height: '10%'
        }
      ],
      series: [{
        name: 'Volume',
        type: 'bar',
        xAxisIndex: 1,
        yAxisIndex: 1,
        itemStyle: {
          normal: {
            color: '#7fbe9e'
          },
          emphasis: {
            color: '#140'
          }
        },
        data: volumes
      }, {
        type: 'candlestick',
        name: 'value change',
        data: data,
        itemStyle: {
          normal: {
            opacity: 0.5,
            color: '#0CF49B',
            color0: '#FD1050',
            borderColor: '#0CF49B',
            borderColor0: '#FD1050'
          }
        }
      }, {
        name: 'MA5',
        type: 'line',
        data: calculateMA(5, data),
        showAllSymbol: false,
        smooth: true,
        lineStyle: {
          normal: {
            width: 2
          }
        },
        areaStyle: {
          normal: {
            color: new echarts
              .graphic
              .LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: 'rgba(255, 158, 68, 0.25)'
                }, {
                  offset: 1,
                  color: 'rgba(255, 70, 131, 0.25)'
                }
              ])
          }
        }
      }, {
        name: 'MA15',
        type: 'line',
        data: calculateMA(15, data),
        showAllSymbol: false,
        enabled: false,
        smooth: true,
        lineStyle: {
          normal: {
            width: 1,
            opacity: 0.7
          }
        }
      }, {
        name: 'MA50',
        type: 'line',
        data: calculateMA(50, data),
        showAllSymbol: false,
        smooth: true,
        lineStyle: {
          normal: {
            width: 1,
            opacity: 0.7
          }
        },
      }]
    };
    myChart.setOption(option)
    this.chart.scrollIntoView({ block: 'end', behavior: 'smooth' })
  }
  handleChart = (day) => {
    const { currencyChartData, pathname } = this.props
    const name = pathname.split('/')
    this.setState({ selected: day })
    currencyChartData({ currencyPair: name[2], day: day })
  }

  handleResize = debounce(() => {
    if (this.echart) {
      this.echart.resize()
    }
  }, 100)

  componentDidMount() {
    const { currencyChartData, pathname } = this.props
    const name = pathname.split('/')
    currencyChartData({ currencyPair: name[2] })
    window.addEventListener('resize', this.handleResize)
  }

  componentDidUpdate(prevProps, prevState) {
    const { chart, currencyChartData, pathname } = this.props
    if (prevProps.chart.length !== chart.length) {
      this.drawChart(chart)
    }

    if (prevProps.pathname !== pathname) {
      const name = pathname.split('/')
      currencyChartData({ currencyPair: name[2] })
      this.setState({ selected: 0 })
    }
  }

  render() {
    const { selected } = this.state
    return (
      <Row>
        {this.props.chart.length === 0 ?
          <Row type="flex" justify="space-around" align="middle" style={{ width: '100%', height: '45em', border: '1px solid white' }}>
            <Col span={24} style={{ textAlign: 'center' }}>
              <Icon type="loading" theme="outlined" style={{ fontSize: '30px' }} />
            </Col>
          </Row>
          :
          <Row type="flex" justify="space-around" align="middle" style={{ width: '100%', height: '45em', border: '1px solid white' }}>
            <Col span={24}>
              <Wrapper>
                <Row style={{ textAlign: 'center' }}>
                  <Col xs={3} sm={2} md={2} lg={2} xl={1} style={{ padding: '0.3em', marginRight: '1em' }} onClick={() => { this.handleChart(1) }} className={selected === 1 ? "currencyType slt-currencyType" : "currencyType"}>1D</Col>
                  <Col xs={3} sm={2} md={2} lg={2} xl={1} style={{ padding: '0.3em', marginRight: '1em' }} onClick={() => { this.handleChart(7) }} className={selected === 7 ? "currencyType slt-currencyType" : "currencyType"}>1W</Col>
                  <Col xs={3} sm={2} md={2} lg={2} xl={1} style={{ padding: '0.3em', marginRight: '1em' }} onClick={() => { this.handleChart(30) }} className={selected === 30 ? "currencyType slt-currencyType" : "currencyType"}>1M</Col>
                  <Col xs={3} sm={2} md={2} lg={2} xl={1} style={{ padding: '0.3em', marginRight: '1em' }} onClick={() => { this.handleChart(365) }} className={selected === 365 ? "currencyType slt-currencyType" : "currencyType"}>1Y</Col>
                  <Col xs={3} sm={2} md={2} lg={2} xl={1} style={{ padding: '0.3em', marginRight: '1em' }} onClick={() => { this.handleChart(0) }} className={selected === 0 ? "currencyType slt-currencyType" : "currencyType"}>All</Col>
                </Row>
              </Wrapper>
            </Col>
            <Col xs={1} sm={1} md={1} lg={0} xl={0} />
            <Col xs={22} sm={22} md={22} lg={24} xl={24}>
              <div style={{ width: '100%', height: '45em' }} ref={ref => (this.chart = ref)} />
            </Col>
            <Col xs={1} sm={1} md={1} lg={0} xl={0} />
          </Row>
        }
      </Row>
    );
  }
}

export default CurrencyChart;