import React from 'react';
import './SignOut.scss';
import { GlobalContext } from '../../contexts/global-context';
import axios from 'axios';
import ajaxPath from '../../helpers/ajax';

class SignOut extends React.Component {
  static contextType = GlobalContext;

  deleteSignOut = () => {
    const { userID } = this.context;
    axios.delete(ajaxPath(`users/sign_ins/${userID}`))
    .then((res) => {
      // console.log(res);
      localStorage.clear();
    })
    .catch((err) => {
      localStorage.clear();
      console.log(err)
    });
  }

  signOutHandler = (e) => {
    const { changeSignedInStatus, changeUserID } = this.context;
    this.deleteSignOut();
    changeSignedInStatus(false);
    changeUserID(0);
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