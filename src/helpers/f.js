export const decompileRoute = (inRoute,first='',last='') => {
  if (inRoute.includes('/')) {
    const splitRoute = inRoute.split('/');
    let outRoute = [];
    for (let i = 0; i<splitRoute.length;i+=2) {
      outRoute.push({
        route: splitRoute[i],
        id: parseInt(splitRoute[i+1]) || ''
      });
    }
    return {'routeArr':outRoute,'first':outRoute[0],'last':outRoute[outRoute.length-1]};
  } else {
    return {'routeArr':inRoute,'first':inRoute,'last':inRoute};
  }
}

export const uniqueIdGenerator = (inPostJSON) => {
  console.log('inPostJSON',inPostJSON);
  let postArr = [];
  let uniqueID = 0;
  Object.entries(inPostJSON).map((postEntry,index) => postArr.push([postEntry[0],postEntry[1]]));
  const postStr = postArr.flat().join('');
  postStr.split('').map((cStr,index) => uniqueID += cStr.charCodeAt(0));
  return uniqueID;
}

export const cloneJSON = (inJSON) => {
  let outJSON = {};
  Object.entries(inJSON).map((i,index) => {
    return outJSON[i[0]] = i[1];
  });
  return outJSON;
}

// export default '*'