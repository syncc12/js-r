import axios from 'axios';
import ajaxPath from './ajax';
import { GlobalContext } from '../contexts/global-context';

const ajaxGET = (endpoint) => {
  const { signedIn, userID } = GlobalContext._currentValue;

  if (signedIn) {
    axios.get(ajaxPath(endpoint), {params:{user_id:userID}})
    .then((res) => {
      return res.data;
    })
    .catch((err) => console.log(err));
  }
}

export default ajaxGET;