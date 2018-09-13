import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { Top } from 'common';
import { Introduce, About, Example } from 'components';
import { NetflixController, IncomeController } from 'containers';
import { Layout } from 'antd';
import styled from 'styled-components';
import { Store } from 'context';
import PropTypes from 'prop-types';

const { Header, Content } = Layout;
const Wrapper = styled.div`
`

class App extends Component {
  handleTheme = (color) => {
    this.setState({ theme: color })
  }

  handleLanguage = (ln) => {
    this.setState({ currentLanguage: ln })
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
      currentLanguage: 'EN',
      theme: 'black',
      handleTheme: this.handleTheme,
      handleLanguage: this.handleLanguage,
    }
  }
  render() {
    return (
      <Store.Provider value={this.state}>
        <Wrapper className={this.state.theme}>
          <Layout style={{ height: '100vh', width: '100vw', overflow: 'auto' }}>
            <Header className="header" style={{ width: '100vw'}}>
              <Route path='/' component={Top} />
            </Header>
            <Content className="content" style={{ display: 'flex', height: '100vh', width: '100vw', overflow: 'auto' }}>
              <Route exact path='/' component={Introduce} />
              <Route path='/about' component={About} />
              <Route path='/example' component={Example} />
              <Route path='/netflix' component={NetflixController} />
              <Route path='/income' component={IncomeController} />
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
  currentLanguage: PropTypes.string,
  theme: PropTypes.string,
  handleTheme: PropTypes.func,
  handleLanguage: PropTypes.func,
}