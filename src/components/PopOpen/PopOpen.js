import React from 'react';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class PopOpen extends React.Component {

  constructor() {
    super();
    this.state = {
      show: false
    }
  }

  buttonClicked = () => {
    this.setState(() => {return {show: !this.state.show}});
  }

  render() {
    const { show } = this.state;

    return (
      <Row>
        <Col lg={12}>
          {
            !show ? 
              <Button onClick={this.buttonClicked}>{this.props.buttonName}</Button>
            :
              <>
                <Button onClick={this.buttonClicked}>Hide</Button>
                <div id="popopen-card">
                  {this.props.children}
                </div>
              </>
          }
        </Col>
      </Row>
    );
  }
}

export default PopOpen;