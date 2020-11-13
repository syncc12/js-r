const componentifyString = (inString) => {
  const stringArr = inString.split(' ');
  const modifiedArr = stringArr.map((e,i) => {
    const s1 = e.slice(0,1);
    const s2 = e.slice(1);
    return [s1.toUpperCase(), s2.toLowerCase()].join('');
  });
  return modifiedArr.join('');
    
};

export default componentifyString;