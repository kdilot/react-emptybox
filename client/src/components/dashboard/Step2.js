import React from 'react';
import { Language } from 'common';
import { Checkbox } from 'antd';

class Step2 extends React.Component {
  render() {
    return (
      <div>
        <h5><Language text='AgreementInfo' /></h5>
        <div><Checkbox><Language text='AgreementCheck' /></Checkbox></div>
      </div>
    )
  }
}

export default Step2;