import React from 'react';
import './App.scss';
import { GlobalContext } from './contexts/global-context';
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/pro-regular-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { fad } from "@fortawesome/pro-duotone-svg-icons";
import { fal } from "@fortawesome/pro-light-svg-icons";
import Layouts from './components/Layouts/Layouts';

library.add(fas, far, fab, fad, fal);

class App extends React.Component {

  constructor() {
    super();
    this.changeSignedInStatus = (newStatus='') => {
      if (newStatus === '') {
        const inverseStatus = !this.state.signedIn;
        this.setState({signedIn:inverseStatus});
        return inverseStatus;
      } else {
        this.setState({signedIn:newStatus});
        return newStatus;
      }
    };
    this.changeUserID = (newID) => {
      this.setState({userID:newID});
      return newID;
    };
    this.state = {
      signedIn: false,
      changeSignedInStatus: this.changeSignedInStatus,
      userID: 0,
      changeUserID: this.changeUserID
    };
  }

  // componentDidMount() {
  //   console.log('Remount');
  //   const { changeSignedInStatus, changeUserID } = this.state;
  //   const userJSON = JSON.parse(localStorage.getItem('userData'));
    
  //   if (userJSON !== null) {
  //     console.log('Signed In');
  //     this.setState({userID:userJSON[0]['user_id'],signedIn:true});
  //     // changeUserID(userJSON[0]['user_id']);
  //     // changeSignedInStatus(true);
  //   } else {
  //     console.log('Not Signed In');
  //     this.setState({userID:0,signedIn:false});
  //     // changeUserID(0);
  //     // changeSignedInStatus(false);
  //   }
  // }

  render() {

    return (
      <div className="App">
        <GlobalContext.Provider value={this.state}>
          <Layouts />
        </GlobalContext.Provider>
      </div>
    );
  }
}

export default App;
