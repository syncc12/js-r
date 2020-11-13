const rerute = (endpoint, port='8080') => {
  let newEndpoint = endpoint;
  if (endpoint.split('')[0]==='/') {newEndpoint = endpoint.slice(1)}
  if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    // console.log('endpoint',`http://localhost:${port}/${newEndpoint}`);
    return `http://localhost:${port}/${newEndpoint}`;
  } else {
    // console.log('endpoint','https://jobsearch-react-api.herokuapp.com/');
    return `https://jobsearch-patricklyden.herokuapp.com/${newEndpoint}`;
  }
    
};

export default rerute;