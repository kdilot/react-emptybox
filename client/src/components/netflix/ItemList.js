import React, { Component } from 'react';
import styled from 'styled-components';
import { Row, Col, Card } from 'antd';
import Slider from "react-slick";
import { PrevArrow, NextArrow } from './SliderButton';
import { Language } from 'common';
import { Netflix } from 'context'

const Wrapper = styled.div`
  .slick-slider:hover .slick-arrow {
    opacity: 0.6
  }

  .slick-slider .slick-arrow, .slick-next.slick-disabled:before, .slick-prev.slick-disabled:before {
    opacity: 0
  }
  
  .slick-arrow.slick-prev.slick-disabled,  .slick-arrow.slick-next.slick-disabled {
    opacity: 0;
    visibility: hidden
  }

  .anticon-left:before, .anticon-right:before {
    font-size: 30px
  }
  
  .slick-arrow.slick-prev::before, .slick-arrow.slick-next::before {
    display: none;
  }

  p {
    padding: 2px
  }

  margin-bottom: 1em;
`

class ItemList extends Component {
  View = (data) => {
    const settings = {
      dots: false,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      infinite: false,
      nextArrow: <NextArrow />,
      prevArrow: <PrevArrow />
    }
    let table = []
    data.movieList.forMenu.map(children => (
      table.push(
        <div key={children.name}>
          <Wrapper>
            <h2>{<Language value={children.name} />}</h2>
            <Slider {...settings}>
              {children.data.map((list, index) => {
                return (
                  <Row gutter={5} key={index}>
                    {list.map(children => {
                      return (
                        <Col span={3} key={children.id}>
                          <Card style={{ width: '100%' }} onClick={() => { data.handleMovieModal(children) }}>
                            <p><img alt="img" style={{ width: '100%' }} src={data.imgSize.medium + children.poster_path} /></p>
                          </Card>
                        </Col>
                      )
                    }
                    )}
                  </Row>
                )
              }
              )}
            </Slider>
          </Wrapper>
        </div >
      )
    ))

    return table
  }
  render() {
    const { View } = this

    return (
      <Netflix.Consumer>
        {net => {
          return (
            View(net)
          )
        }}
      </Netflix.Consumer>
    )
  }
}
export default ItemList;