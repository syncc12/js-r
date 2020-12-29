import axios from 'axios';
import ajaxPath from './ajax';
import { createBrowserHistory } from 'history';

const checkSignedIn = (inContext) => {
  const { changeSignedInStatus, changeUserID } = inContext;
  let userJSON = JSON.parse(localStorage.getItem('userData'));
  let history = createBrowserHistory();


  if (userJSON !== null) {
    userJSON = userJSON[0] ? userJSON[0] : userJSON;
    const emailAddress = userJSON['email'];
    return axios.get(ajaxPath('users/sign_ins'), {params:{email:emailAddress}})
    .then((res) => {
      if (res.status === 200) {
        const newUserID = changeUserID(res.data[0]['user_id']);
        const newSignedInStatus = changeSignedInStatus(true);
        return [newSignedInStatus,newUserID];
      } else {
        // history.push('/');
        if (history.location.pathname !== '/') {
          window.location.pathname = '/';
        }
      }
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
  } else {
    changeUserID(0);
    changeSignedInStatus(false);
    // history.push('/');
    if (history.location.pathname !== '/') {
      window.location.pathname = '/';
    }
    return [false,0];
  }
  
}

export default checkSignedIn;