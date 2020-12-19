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
        this.setState({signedIn:!this.state.signedIn});
      } else {
        this.setState({signedIn:newStatus});
      }
    };
    this.changeUserID = (newID) => this.setState({userID:newID});
    this.state = {
      signedIn: false,
      changeSignedInStatus: this.changeSignedInStatus,
      userID: 0,
      changeUserID: this.changeUserID,
      cdFormat: false
    };
  }

  widthLogic = () => {
    const smallWidth = [[5,1],[5,0]];
    const bigWidth = [[10,1],[10,1]];
    const { showListings, showJobs } = this.state;
    if (showListings === true && showJobs === true) {
      return smallWidth;
    } else {
      return bigWidth;
    }
  }

  onNavLinkClicked = (linkName) => {
    const { cdFormat } = this.state;
    if (linkName === 'cards') {
      this.setState(() => {return {cdFormat: !cdFormat}})
    }
  }

  componentDidMount() {
    const { changeSignedInStatus, changeUserID } = this.state;
    const userJSON = JSON.parse(localStorage.getItem('userData'));

    // console.log('userJSON',userJSON);
    if (userJSON !== null) {
      changeUserID(userJSON['user_id']);
      changeSignedInStatus(true);
    } else {
      changeUserID(0);
      changeSignedInStatus(false);
    }
    
  }

  render() {

    return (
      <div className="App">
        <GlobalContext.Provider value={this.state}>
          <Layouts onNavLinkClicked={this.onNavLinkClicked} />
        </GlobalContext.Provider>
      </div>
    );
  }
}

export default App;
