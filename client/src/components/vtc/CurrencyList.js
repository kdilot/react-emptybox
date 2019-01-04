import React, { Component } from 'react';
import { Row, Col, Icon } from 'antd';
import { CurrencyCard, CurrencyType } from 'components/vtc';
import { Language } from 'common';
import styled from 'styled-components';

const Wrapper = styled.div`
  h1 { 
    margin: 0;
  }
  text-align: center;
`

class CurrencyList extends Component {
  render() {
    const {
      list,
      currencyNameList,
      handleCurrencyType,
      selectedCurrencyType,
      currencyChartData
    } = this.props
    const type = list.map(_list => _list.name.split('_')[0]).reduce(function (a, b) {
      if (a.indexOf(b) < 0) a.push(b);
      return a;
    }, []).sort((a, b) => {
      if (a > b) return 1;
      if (a < b) return -1;
      return 0;
    })
    return (
      <Row>
        {list.length ?
          <Col span={24} style={{ textAlign: 'center' }}>
            <CurrencyType
              selected={selectedCurrencyType}
              handleCurrencyType={handleCurrencyType}
              type={type}
            />
          </Col>
          :
          ''}
        {list.length ?
          list.sort(
            (a, b) => {
              if (a.name > b.name) return 1;
              if (a.name < b.name) return -1;
              return 0;
            }
          ).filter(_list => _list.name.indexOf(selectedCurrencyType + '_') !== -1)
            .map((_list, index) =>
              <Col xs={24} sm={12} md={6} lg={6} xl={4} key={index}>
                <CurrencyCard
                  name={_list.name}
                  currency={currencyNameList.filter(e => e.currency === _list.name.split('_')[1]).map(info => info.name)}
                  price={_list.last}
                  volume={_list.baseVolume}
                  change={_list.percentChange}
                  date={_list.lastUpdate}
                  frozen={_list.isFrozen}
                  selected={selectedCurrencyType}
                  currencyChartData={currencyChartData}
                />
              </Col>
            )
          :
          <Col span={24}>
            <Wrapper>
              <h1><Language text="UpdatingData" /></h1><Icon type="loading" theme="outlined" style={{ fontSize: '30px' }} />
            </Wrapper>
          </Col>
        }
      </Row>
    );
  }
}

export default CurrencyList;