import React from 'react';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';


class Cards extends React.Component {

  render() {
    const { data } = this.props;

    return (
      <Card style={{width:'250px'}}>
        <Card.Body>
          <Card.Title>{data['title']}</Card.Title>
        </Card.Body>
        <ListGroup variant="flush">
          <ListGroup.Item>{data['company']}</ListGroup.Item>
          <ListGroup.Item>{data['job_type']}</ListGroup.Item>
          <ListGroup.Item>{data['application_status'].toString()}</ListGroup.Item>
        </ListGroup>
        <Card.Body className="card-link-body">
          <Card.Link className="card-link" href={data['website_url']}><i className="fas fa-globe"></i></Card.Link>
          <Card.Link className="card-link" href={`tel:+1${data['phone_number']}`}><i className="fas fa-phone"></i></Card.Link>
          <Card.Link className="card-link" href={`mailto:${data['email']}`}><i className="fas fa-envelope"></i></Card.Link>
        </Card.Body>
      </Card>
    );
  }
}

export default Cards;