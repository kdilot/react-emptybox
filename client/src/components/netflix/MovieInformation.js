import React from 'react';
import styled from 'styled-components';
import { Icon, Row, Col, Rate, Tag } from 'antd';
import { Netflix } from 'context';
import { Language } from 'common';
import { CSSTransition } from 'react-transition-group';

const CSS = styled.div`
  .fade-enter {
    opacity: 0.01;
    transform: translateY(100%);
  }
  .fade-enter-active {
    opacity: 1;
    transform: translateY(0%);
    -webkit-transition: all 300ms ease-out 0s;
    transition: all 300ms ease-out 0s;
  }
  .fade-exit {
    opacity: 1;
    transform: translateY(0%);
  }
  .fade-exit-active {
    opacity: 0.1;
    transform: translateY(100%);
    -webkit-transition: all 300ms ease-out 0s;
    transition: all 300ms ease-out 0s;
  }
`
const Info = styled.div`
  height: 100vh;
  overflow: auto;
  background: #242424;
  z-index: 2001;
  display: flex;

  img {
    width: 100%;
  }
  h1, h2 {
    font-size: 1.5em;
    color: white;
    padding: 0;
    margin: 0 40px;
  }
  h1 {
    margin-top: 1em;
    margin-bottom: 1em;
  }
  h2 {
    margin-top: 0.3em;
    font-size: 1em;
    font-weight: normal;
  }
  .ant-tag {
    background: white;
  }
`

const MovieInformation = () => {
  return (
    <Netflix.Consumer>
      {net => {
        const web = net.web
        return (
          <CSS>
            <CSSTransition
              in={net.display.movieInfomation === 'block'}
              classNames="fade"
              timeout={300}
              appear
              mountOnEnter
              unmountOnExit
            >
              <Row type="flex" justify="center">
                <Info style={{ width: web ? '40vw' : '100vw', marginTop: web ? '2.5em' : 0 }}>
                  <Row style={{ width: '100vw' }}>
                    <Col span={24} style={{ textAlign: 'right' }}>
                      <img alt="img" src={net.movieList.information.backdrop_path ? net.imgSize.large + net.movieList.information.backdrop_path : net.imgSize.medium + net.movieList.information.poster_path} />
                      <Icon type="close" style={{ fontSize: 25, margin: '0.3em', position: 'absolute', right: 0, top: 0, fontWeight: 'bolder', color: 'black' }} onClick={() => { net.handleMovieModal(false) }} />
                    </Col>
                    <Col span={24}>
                      <h1>{net.movieList.information ? net.movieList.information.title : ''}</h1>
                      <h2>
                        {net.movieList.information.genre_ids && net.movieList.information.genre_ids.length > 0 ? net.movieList.information.genre_ids.map(
                          (list, index) => <Tag key={index} style={{margin: '0.5em 0', marginRight: '0.5em'}}>{net.genres[list]}</Tag>
                        ) : ''}
                      </h2>
                      <h2><Rate disabled value={net.movieList.information.vote_average} count={10} /></h2>
                      <h2><b><Language text="ReleaseInfo" /> :</b> {net.movieList.information ? net.movieList.information.release_date : ''}</h2>
                      <h2>{net.movieList.information ? net.movieList.information.overview : ''}</h2>
                    </Col>
                  </Row>
                </Info>
              </Row>
            </CSSTransition>
          </CSS>
        )
      }}
    </Netflix.Consumer>
  );
};

export default MovieInformation;