import React from 'react';
import Cards from '../Cards/Cards';
import CardColumns from 'react-bootstrap/CardColumns';


class CardDeck extends React.Component {

  render() {
    const { data } = this.props;

    return (
      <CardColumns>
        {data.map((dataRow, index) => <Cards key={index} data={dataRow} />)}
        
      </CardColumns>
    );
  }
}

export default CardDeck;