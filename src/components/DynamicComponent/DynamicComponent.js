import React from 'react';
import componentifyString from '../../helpers/componentifyString';

function DynamicComponent(props) {
  const { name } = props;
  const ThisComponent = require(`../${componentifyString(name)}/${componentifyString(name)}`);
  // console.log('ThisComponent',ThisComponent);
  return (
    <ThisComponent />
  );
}

export default DynamicComponent;