import React, { Component } from 'react';
import { Store } from 'context';
import { LangFile } from 'files'
import { Input } from 'antd';
import PropTypes from 'prop-types';

class Language extends Component {
  state = {
    lang: LangFile,
  }
  render() {
    const { lang } = this.state
    const { value, type, onChange } = this.props
    return (
      <Store.Consumer>
        {store => {
          return (
            type ?
              (
                type === 'input' ?
                  (
                    <Input placeholder={lang[store.currentLanguage][value]} onChange={onChange ? onChange : ''} />
                  ) : ''
              ) : lang[store.currentLanguage][value] // default text
          )
        }}
      </Store.Consumer>
    )
  }
}

export default Language;

Language.propTypes = {
  lang: PropTypes.object,
}