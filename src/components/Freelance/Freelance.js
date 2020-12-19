import React from 'react';
import './Freelance.scss';
import { GlobalContext } from '../../contexts/global-context';

class Freelance extends React.Component {
  static contextType = GlobalContext;

  render() {

    return (
      <div>
        Freelance
      </div>
    );
  }
}

export default Freelance;