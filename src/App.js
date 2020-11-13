import React from 'react';
import './App.scss';
import { GlobalContext } from './contexts/global-context';
import Layouts from './components/Layouts/Layouts';
// import Layout from './stitch/Layout';

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
      signedIn: true,
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

  render() {
    const { changeSignedInStatus, changeUserID, signedIn, userID } = this.state

    return (
      <div className="App">
        <GlobalContext.Provider value={this.state}>
          <Layouts onNavLinkClicked={this.onNavLinkClicked} changeSignedInStatus={changeSignedInStatus} signedIn={signedIn}  changeUserID={changeUserID}userID={userID} />
          {/*<Layout userID={1}/>*/}
        </GlobalContext.Provider>
      </div>
    );
  }
}

export default App;
