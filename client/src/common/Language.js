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
    const { text, type, prefix, onChange, inputType } = this.props
    return (
      <Store.Consumer>
        {store => {
          const web = store.web
          return (
            type ?
              (
                type === 'input' ?
                  (
                    <Input style={{ width: web ? '27em' : '15em' }} placeholder={lang[store.currentLanguage][text] ? lang[store.currentLanguage][text] : text} onChange={onChange} />
                  ) :
                  type === 'default' ?
                    (
                      <Input type={inputType} prefix={prefix} placeholder={lang[store.currentLanguage][text] ? lang[store.currentLanguage][text] : text} onChange={onChange} />
                    ) : ''
              ) : lang[store.currentLanguage][text] ? lang[store.currentLanguage][text] : text // default text
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