const relativeRoot = () => {
  const path = require('path');
  let buildPath = [];
  let currentDir = './';
  const checkDir = 'jobsearch-react';

  console.log(checkDir);
  console.log(path.dirname(currentDir));

  // while (path.dirname(currentDir) !== checkDir) {
  //   buildPath.push(path.dirname(currentDir));
  //   currentDir = currentDir === './' ? '../' : `../${currentDir}`;
  // }
  // console.log(currentDir);
}

relativeRoot();