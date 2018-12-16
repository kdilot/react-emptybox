import React from 'react';
import { Language } from 'common';
import { Checkbox } from 'antd';

class Step3 extends React.Component {
  render() {
    return (
      <div>
        <h5><Language text='Servey' /></h5>
        <h6><Checkbox><Language text='Servey1' /></Checkbox></h6>
        <h6><Checkbox><Language text='Servey2' /></Checkbox></h6>
        <h6><Checkbox><Language text='Servey3' /></Checkbox></h6>
        <h6><Checkbox><Language text='Servey4' /></Checkbox></h6>
      </div>
    )
  }
}

export default Step3;