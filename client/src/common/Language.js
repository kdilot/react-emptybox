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
    const { value, type, prefix, onChange } = this.props
    return (
      <Store.Consumer>
        {store => {
          const web = store.web
          return (
            type ?
              (
                type === 'input' ?
                  (
                    <Input style={{ width: web ? '27em' : '15em' }} placeholder={lang[store.currentLanguage][value] ? lang[store.currentLanguage][value] : value} onChange={onChange ? onChange : ''} />
                  ) :
                  type === 'default' ?
                    (
                      <Input prefix={prefix} placeholder={lang[store.currentLanguage][value] ? lang[store.currentLanguage][value] : value} onChange={onChange ? onChange : ''} />
                    ) : ''
              ) : lang[store.currentLanguage][value] ? lang[store.currentLanguage][value] : value // default text
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