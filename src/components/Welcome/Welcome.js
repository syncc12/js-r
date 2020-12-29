import React from 'react';
import './Welcome.scss';
import { GlobalContext } from '../../contexts/global-context';

class Welcome extends React.Component {
  static contextType = GlobalContext;

  render() {

    return (
      <div>
        Welcome
      </div>
    );
  }
}

export default Welcome;