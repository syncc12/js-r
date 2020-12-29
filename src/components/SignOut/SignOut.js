import React from 'react';
import './SignOut.scss';
import { GlobalContext } from '../../contexts/global-context';
import { createBrowserHistory } from 'history';
import axios from 'axios';
import ajaxPath from '../../helpers/ajax';

class SignOut extends React.Component {
  static contextType = GlobalContext;

  deleteSignOut = () => {
    let userJSON = JSON.parse(localStorage.getItem('userData'));
    userJSON = userJSON[0] ? userJSON[0] : userJSON;
    axios.delete(ajaxPath(`users/sign_ins/${userJSON['id']}`))
    .then((res) => {
      // console.log(res);
      localStorage.clear();
    })
    .catch((err) => {
      localStorage.clear();
      console.log(err);
    });
  }

  signOutHandler = (e) => {
    const { changeSignedInStatus, changeUserID } = this.context;
    let history = createBrowserHistory();
    this.deleteSignOut();
    changeSignedInStatus(false);
    changeUserID(0);
    // history.push('/');
    if (history.location.pathname !== '/') {
      window.location.pathname = '/';
    }
    e.preventDefault();
    // this.setState({signOutSuccess: true});
    // window.location.reload();
  }

  render() {
    const { children } = this.props;

    return (
      <div onClick={((e) => this.signOutHandler(e))}>{children}</div>
    );
  }
}

export default SignOut;