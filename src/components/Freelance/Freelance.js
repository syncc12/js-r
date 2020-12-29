import React from 'react';
import './Freelance.scss';
import { GlobalContext } from '../../contexts/global-context';
import checkSignedIn from '../../helpers/checkSignedIn';

class Freelance extends React.Component {
  static contextType = GlobalContext;


  async componentDidMount() {
    await checkSignedIn(this.context);
    // this.getFreelanceData();
  }

  render() {

    return (
      <div>
        Freelance
      </div>
    );
  }
}

export default Freelance;