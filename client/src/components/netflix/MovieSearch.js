import React, { Component } from 'react';
import styled from 'styled-components';
import { Row, Col, Icon, Card } from 'antd';
import { Language } from 'common';
import { Netflix } from 'context';

const Wrapper = styled.div`
`
const Search = styled.div`
  padding: 3em 1.5em;
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: black;

  .search-back {
    /* position: absolute;
    left: 1%; */
  }

  input {
    background: black;
    border: 2px solid gray;
    color: white;
  }

  input:hover {
    border: 2px solid white;
  }
`
const Result = styled.div`
  padding: 1em 1.5em;
  width: 100vw;
  height: 90vh;
  display: table-cell;
  background: black;
  text-align: center;
  vertical-align: middle;

  h1 {
    color: #FFF;
  }
`
const SearchResult = styled.div`
  padding: 1em 1.5em;
  height: 90vh;
  overflow: auto;
  background: black;

  p {
    padding: 0;
    display: flex;
    align-items: center;
    color: white;
    height: 100%;
  }

  .ant-card-grid {
    box-shadow: 
    1px 0 0 0 black, 
    0 1px 0 0 black, 
    1px 1px 0 0 black, 
    1px 0 0 0 black inset, 
    0 1px 0 0 black inset;
    padding: 3px;
  }
  .ant-card-grid:hover {
    box-shadow: 0 0 1px 1px white;
  }
`

class Modal extends Component {
  render() {
    return (
      <Netflix.Consumer>
        {net => {
          const web = net.web
          return (
            <Wrapper>
              <Search>
                <Row style={{ width: '100%' }}>
                  <Col span={3}>
                    <Icon type="left" style={{ fontSize: 30, color: 'white', fontWeight: 'bold' }} className="search-back" onClick={net.handleSearch} />
                  </Col>
                  <Col span={18} style={{ textAlign: 'center' }}>
                    {/* <Icon type="search" style={{ fontSize: 30, color: 'white', fontWeight: 'bold', marginRight: '0.2em' }} /> */}
                    <Language value="Search" type="input" onChange={net.handleSearchList} />
                  </Col>
                  <Col span={3} />
                </Row>
              </Search>
              {net.movieList.search.length !== 0 ?
                (
                  <SearchResult>
                    <Card>
                      {net.movieList.search.map(children => {
                        return (
                          children.backdrop_path ?
                            (
                              <Card.Grid key={children.title} style={{ width: web ? '20%' : '50%', textAlign: 'center' }} onClick={() => { net.handleMovieModal(children) }}>
                                <img alt={children.title} style={{ width: '100%' }} src={net.imgSize.small + children.backdrop_path} />
                              </Card.Grid>
                            ) : ('')
                        )
                      }
                      )}
                    </Card>
                  </SearchResult>
                ) : (
                  <Row type="flex" justify="center">
                    <Col span={24}>
                      <Result>
                        <h1><Language value="EnterSearch" /></h1>
                      </Result>
                    </Col>
                  </Row>
                )}
            </Wrapper>
          )
        }}
      </Netflix.Consumer>
    )
  }
}

export default Modal;