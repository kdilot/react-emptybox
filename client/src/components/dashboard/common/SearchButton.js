import React, { Component } from 'react';
import { Input, Col } from 'antd';
import styled from 'styled-components';

const Wrapper = styled.div`
  .ant-input-search-icon {
    color: white;
  }
  p { opacity: 0.7; }
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
        <Col xs={24} sm={24} md={18} lg={8} xl={8}>
          <Search
            onSearch={value => handleSearch(value)}
          />
          <p>{keyword && `(${keyword})`}</p>
        </Col>
      </Wrapper>
    );
  }
}

export default SearchButton;