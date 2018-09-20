import React, { Component } from 'react';
import styled from 'styled-components';
import { Icon, Card } from 'antd';
import { Language } from 'common';
import { Netflix } from 'context';
const Wrapper = styled.div`
`
const Search = styled.div`
  padding: 0 1.5em;
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: black;

  .search-back {
    position: absolute;
    left: 1%;
  }

  input {
    width: 27em; 
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
  height: 90vh;
  background: black;

  h1 {
    position: fixed;
    top: 50%;
    left: 40%;
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
          return (
            <Wrapper>
              <Search>
                <Icon type="arrow-left" style={{ fontSize: 30, color: 'white', fontWeight: 'bold' }} className="search-back" onClick={net.handleSearch} />
                <Icon type="search" style={{ fontSize: 30, color: 'white', fontWeight: 'bold' }} />
                <Language value="Search" type="input" onChange={net.handleSearchList} />
              </Search>
              {net.movieList.search.length !== 0 ?
                (
                  <SearchResult>
                    <Card>
                      {net.movieList.search.map(children => {
                        return (
                          children.backdrop_path ?
                            (
                              <Card.Grid key={children.title} style={{ width: '20%', textAlign: 'center' }} onClick={() => { net.handleMovieModal(children) }}>
                                <img alt={children.title} style={{ width: '100%' }} src={net.imgSize.small + children.backdrop_path} />
                              </Card.Grid>
                            ) : ('')
                        )
                      }
                      )}
                    </Card>
                  </SearchResult>
                ) : (
                  <Result>
                    <h1><Language value="EnterSearch" /></h1>
                  </Result>
                )}
            </Wrapper>
          )
        }}
      </Netflix.Consumer>
    )
  }
}

export default Modal;