import React from 'react';
import './Tree.scss';
import { GlobalContext } from '../../contexts/global-context';

class Tree extends React.Component {
  static contextType = GlobalContext;

  render() {

    return (
      <div>
        Tree
      </div>
    );
  }
}

export default Tree;