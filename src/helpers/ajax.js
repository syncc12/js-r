const ajaxPath = (endpoint, port=8080) => {
  if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    console.log('endpoint',`http://localhost:${port}/${endpoint}`);
    return `http://localhost:${port}/${endpoint}`;
  } else {
    // console.log('endpoint','https://jobsearch-react-api.herokuapp.com/');
    // return `https://jobsearch-react-api.herokuapp.com/${endpoint}`;
    return `https://js-r.herokuapp.com/${endpoint}`;
  }
    
};

export default ajaxPath;