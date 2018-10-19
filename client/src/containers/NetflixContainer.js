import React, { Component } from 'react';
import { MovieSearch, SideMenu, MovieList, Profile, MovieInformation } from 'components/netflix';
import { genres, movieList, allMovieList, IMG_large, IMG_medium, IMG_small } from 'common/movie';
import { Modal, Language } from 'common';
import { Netflix } from 'context';
import { Badge, Icon, Drawer, Row, Col } from 'antd';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Wrapper = styled.div`
  width: 100vw;
  overflow: auto;
  overflow-x: hidden;
  background-color: black;
  color: white;
`
const Header = styled.div`
  width: 100vw;
  height: 10vh;
  padding: 3em 1.5em;
  display: flex;
  align-items: center;

  h1 {
    margin: 0;
    color: red;
    display: inline;
    padding-left: 1em;
    font-weight: bold;
  }
  
`
const Content = styled.div`
  width: 100vw;
  height: 90vh;
  padding: 1.5em;
`

class NetflixController extends Component {
  constructor(props) {
    super(props)

    this.state = {
      user: [
        {
          name: 'USER1',
          color: '#C7E5FF'
        },
        {
          name: 'USER2',
          color: '#E5B29F'
        },
        {
          name: 'USER3',
          color: '#B4E8BC'
        },
        {
          name: 'USER4',
          color: '#AD99B5'
        }
      ],
      imgSize: {
        large: IMG_large,
        medium: IMG_medium,
        small: IMG_small,
      },
      movieList: {
        all: allMovieList,
        genre: movieList,
        forMenu: movieList,
        information: {},
        search: [],
      },
      display: {
        profile: 'none',
        movieInfomation: 'none',
        movieSearch: 'none',
        sideMenu: true,
        visible: false
      },
      menuSelected: 'Home',
      currentUser: 0,
      genres: genres,
      web: window.innerWidth > 768 ? true : false,
      handleSearch: this.handleSearch,
      handleSearchList: this.handleSearchList,
      handleKeyUp: this.handleKeyUp,
      handleMovieModal: this.handleMovieModal,
      handleProfile: this.handleProfile,
      handleMenu: this.handleMenu,
      handleSideMenu: this.handleSideMenu,
      changeProfile: this.changeProfile,
      showDrawer: this.showDrawer,
    }
  }

  changeProfile = (index) => {
    this.setState({ currentUser: index })
    this.handleProfile()
  }

  handleProfile = () => {
    const { display } = this.state
    if (display.profile === 'none') {
      this.setState({
        display: {
          ...display,
          profile: 'block'
        }
      })
    } else {
      this.setState({
        display: {
          ...display,
          profile: 'none'
        }
      })
    }
  }

  handleSearch = () => {
    const { display } = this.state
    if (display.movieSearch === 'none') {
      this.setState({
        display: {
          ...display,
          movieSearch: 'block'
        }
      })
    } else {
      this.setState({
        display: {
          ...display,
          movieSearch: 'none'
        }
      })
    }
  }

  handleSearchList = (e) => {
    const { movieList } = this.state
    if (e.target.value) {
      const searchList = movieList.all.filter(data =>
        data.title.toLowerCase().indexOf(e.target.value) !== -1
      )
      this.setState({
        movieList: {
          ...movieList,
          search: searchList
        }
      })
    } else {
      this.setState({
        movieList: {
          ...movieList,
          search: []
        }
      })
    }
  }

  handleMovieModal = (data) => {
    const { display, movieList } = this.state
    if (display.movieInfomation === 'none') {
      this.setState({
        display: {
          ...display,
          movieInfomation: 'block'
        }
      })
    } else {
      this.setState({
        display: {
          ...display,
          movieInfomation: 'none'
        }
      })
    }
    if (data) this.setState({
      movieList: {
        ...movieList,
        information: data
      }
    })
  }

  handleSideMenu = () => {
    const { display } = this.state
    this.setState({
      display: {
        ...display,
        sideMenu: !display.sideMenu
      }
    })
  }

  handleKeyUp = (e) => {
    const { display } = this.state
    //  click ESC button event
    if (e.keyCode === 27) {
      if (display.movieInfomation !== 'none') {
        this.handleMovieModal(false)
      } else if (display.movieSearch !== 'none') {
        this.handleSearch()
      } else if (display.profile !== 'none') {
        this.handleProfile()
      } else if (display.visible) {
        this.showDrawer()
      }
    }
  }

  handleMenu = (menu) => {
    const { movieList } = this.state
    this.setState({
      movieList: {
        ...movieList,
        forMenu: menu === 'Home' ? movieList.genre : movieList.genre.filter(children => children.name === menu)
      },
      menuSelected: menu
    })
    this.showDrawer()
  }

  showDrawer = () => {
    const { display } = this.state
    this.setState({
      display: {
        ...display,
        visible: !display.visible,
        sideMenu: !display.sideMenu ? !display.sideMenu : display.sideMenu
      }
    })
  }

  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyUp, false);
  }
  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyUp, false);
  }

  render() {
    const {
      movieList,
      handleSearch,
      showDrawer,
      display,
      web
    } = this.state

    return (
      <Netflix.Provider value={this.state}>
        <Wrapper className="netflix">
          <Modal display={display.movieInfomation} children={<MovieInformation />} zIndex={2000} />
          <Modal display={display.movieSearch} children={<MovieSearch />} zIndex={99} />
          <Modal display={display.profile} children={<Profile />} zIndex={2000} />
          <Header>
            <Row style={{ width: '100%' }}>
              <Col span={16}>
                <Badge count={Object.keys(movieList.all).length} style={{ backgroundColor: 'red', boxShadow: 'red' }} overflowCount={999}>
                  <Icon type="menu-unfold" style={{ fontSize: 30, color: 'white' }} onClick={showDrawer} />
                  <Drawer
                    className="netflix"
                    width="300px"
                    placement="left"
                    closable={false}
                    onClose={showDrawer}
                    visible={display.visible}
                  >
                    <SideMenu />
                  </Drawer>
                </Badge>
                <h1><Language value="Netflix" /></h1>
              </Col>
              <Col span={8} style={{ textAlign: 'right', marginTop: '0.5em', paddingRight: '1em' }}>
                <Icon type="search" style={{ fontSize: 30, color: 'white', fontWeight: 'bolder', marginRight: web ? '2em' : '1em' }} onClick={() => { handleSearch() }} />
                <Icon type="ellipsis" style={{ fontSize: 30, color: 'white', fontWeight: 'bold' }} />
              </Col>
            </Row>
          </Header>
          <Content>
            <MovieList />
          </Content>
        </Wrapper>
      </Netflix.Provider>
    );
  }
}

export default NetflixController;

NetflixController.proptypes = {
  user: PropTypes.shape({
    name: PropTypes.string,
    color: PropTypes.string,
  }),
  imgSize: PropTypes.shape({
    large: PropTypes.string,
    medium: PropTypes.string,
    small: PropTypes.string,
  }),
  movieList: PropTypes.shape({
    all: PropTypes.array,
    genre: PropTypes.array,
    forMenu: PropTypes.array,
    information: PropTypes.object,
    search: PropTypes.array,
  }),
  display: PropTypes.shape({
    profile: PropTypes.string,
    movieSearch: PropTypes.string,
    movieInfomation: PropTypes.string,
    sideMenu: PropTypes.boolean,
    visible: PropTypes.boolean,
  }),
  menuSelected: PropTypes.string,
  currentUser: PropTypes.number,
  genres: PropTypes.array,
  web: PropTypes.boolean,
  handleSearch: PropTypes.func,
  handleSearchList: PropTypes.func,
  handleKeyUp: PropTypes.func,
  handleMovieModal: PropTypes.func,
  handleProfile: PropTypes.func,
  handleMenu: PropTypes.func,
  handleSideMenu: PropTypes.func,
  changeProfile: PropTypes.func,
  showDrawer: PropTypes.func,
}