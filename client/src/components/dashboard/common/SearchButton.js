import React, { Component } from 'react';
import { Input, Row, Col } from 'antd';
import styled from 'styled-components';

const Wrapper = styled.div`
  .ant-input-search-icon {
    color: white;
  }
  h5 { 
    margin: 0.3em 0;
    opacity: 0.7;
  }
`
const Search = Input.Search
class SearchButton extends Component {
  handleSearch = (value) => {
    const { list, func } = this.props
    let filter = []
    if (value) {
      filter = list.filter(child => {
        if (child.hasOwnProperty('name'))
          return child.name.toLowerCase().indexOf(value.toLowerCase()) !== -1
        else if (child.hasOwnProperty('address'))
          return child.address.toLowerCase().indexOf(value.toLowerCase()) !== -1
        return true
      })
    } else {
      filter = list
    }
    func(filter, value)
  }
  state = {
    handleSearch: this.handleSearch
  }

  render() {
    const { keyword } = this.props
    const {
      handleSearch
    } = this.state

    return (
      <Wrapper>
        <Row gutter={10} type="flex" justify="space-around" align="middle">
          <Col xs={24} sm={24} md={12} lg={8} xl={8}>
            <Search
              onSearch={value => handleSearch(value)}
            />
          </Col>
          <Col xs={24} sm={24} md={12} lg={16} xl={16}>
            <h5>{keyword && `(${keyword})`}</h5>
          </Col>
        </Row>
      </Wrapper>
    );
  }
}

export default SearchButton;