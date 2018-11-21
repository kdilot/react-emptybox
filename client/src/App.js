import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { Top } from 'common';
import { Introduce, About, Example } from 'components';
import { NetflixContainer, VtcContainer, ProductContainer, DashboardContainer } from 'containers';
import { Layout } from 'antd';
import styled from 'styled-components';
import { Store } from 'context';
import PropTypes from 'prop-types';

const { Header, Content } = Layout;
const Wrapper = styled.div`
  height: '100vh';
  width: '100vw';
  overflow: 'auto';
`

class App extends Component {
  handleTheme = (color) => {
    this.setState({ theme: color })
    this.drawerOnClose('theme')
  }

  handleLanguage = (ln) => {
    this.setState({ currentLanguage: ln })
  }

  handleDrawer = (type, show = false) => {
    const { drawer } = this.state
    if (show) {
      this.setState({
        drawer: {
          ...drawer,
          [type]: {
            visible: true
          }
        }
      })
    } else {
      this.setState({
        drawer: {
          ...drawer,
          [type]: {
            visible: false
          }
        }
      })
    }
  }
  drawerOnClose = (type) => {
    const { drawer } = this.state
    this.setState({
      drawer: {
        ...drawer,
        [type]: {
          visible: false
        }
      }
    })
  }
  drawerShow = (type) => {
    const { drawer } = this.state
    this.setState({
      drawer: {
        ...drawer,
        [type]: {
          visible: true
        }
      }
    })
  }

  handleKeyUp = (e) => {
    const { drawer } = this.state
    //  click ESC button event
    if (e.keyCode === 27) {
      if (drawer.menu.visible) {
        this.drawerOnClose('menu')
      }
    }
  }

  constructor(props) {
    super(props)

    this.state = {
      color: [
        {
          name: 'black',
          hex: '#252525'
        },
        {
          name: 'yellow',
          hex: '#F29832'
        },
        {
          name: 'blue',
          hex: '#4C92FF'
        },
        {
          name: 'mint',
          hex: '#03A678'
        },
        {
          name: 'beige',
          hex: '#BFA98E'
        },
      ],
      drawer: {
        menu: {
          visible: false
        }
      },
      currentLanguage: 'EN',
      theme: 'black',
      web: window.innerWidth > 768 ? true : false,
      handleTheme: this.handleTheme,
      handleLanguage: this.handleLanguage,
      drawerOnClose: this.drawerOnClose,
      drawerShow: this.drawerShow,
      handleDrawer: this.handleDrawer,
      handleKeyUp: this.handleKeyUp,
    }
  }

  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyUp, false);
  }
  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyUp, false);
  }

  render() {
    return (
      <Store.Provider value={this.state}>
        <Wrapper className={this.state.theme}>
          <Layout>
            <Header className="header" style={{ width: '100vw', height: '7vh', lineHeight: '7vh' }}>
              <Route path='/' component={Top} />
            </Header>
            <Content className="content" style={{ display: 'flex', height: '93vh', width: '100vw', overflow: 'auto', justifyContent: 'center' }}>
              <Route exact path='/' breadcrumbName="Home" component={Introduce} />
              <Route path='/about' breadcrumbName="About" component={About} />
              <Route path='/project' breadcrumbName="Project" component={Example} />
              <Route path='/netflix' breadcrumbName="Netflix" component={NetflixContainer} />
              <Route path='/vtc' breadcrumbName="Vtc" component={VtcContainer} />
              <Route path='/product' breadcrumbName="Product" component={ProductContainer} />
              <Route path='/dashboard' breadcrumbName="Dashboard" component={DashboardContainer} />
            </Content>
          </Layout>
        </Wrapper>
      </Store.Provider>
    )
  }
}

export default App

App.proptypes = {
  color: PropTypes.shape({
    name: PropTypes.string,
    hex: PropTypes.string,
  }),
  drawer: PropTypes.shape({
    menu: PropTypes.shape({
      visible: PropTypes.bool,
    })
  }),
  currentLanguage: PropTypes.string,
  theme: PropTypes.string,
  handleTheme: PropTypes.func,
  handleLanguage: PropTypes.func,
  handleDrawer: PropTypes.func,
  handleKeyUp: PropTypes.func,
  drawerOnClose: PropTypes.func,
  drawerShow: PropTypes.func,
}