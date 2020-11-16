import React from 'react';
import './SignOut.scss';
import { GlobalContext } from '../../contexts/global-context';
import axios from 'axios';
import ajaxPath from '../../helpers/ajax';

class SignOut extends React.Component {
  static contextType = GlobalContext;

  deleteSignOut = () => {
    axios.delete(ajaxPath('users/sign_out'))
    .then((res) => {
      console.log(res);
    })
    .catch((err) => console.log(err));
  }

  signOutHandler = (e) => {
    const { changeSignedInStatus, changeUserID, signedIn, userID } = this.context;
    this.deleteSignOut();
    changeSignedInStatus(false);
    changeUserID(0);
    console.log(signedIn, userID);
    e.preventDefault();
  }

  render() {
    const { children } = this.props;

    return (
      <div onClick={((e) => this.signOutHandler(e))}>{children}</div>
    );
  }
}

export default SignOut;