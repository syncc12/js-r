const routifyString = (inString) => {
  return inString.toLowerCase().replace(/ /g, '_');
    
};

export default routifyString;