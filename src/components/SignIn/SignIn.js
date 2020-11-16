import React from 'react';
import './SignIn.scss';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function SignInHolder(props) {
  const { whole, children } = props;

  return (
    <>
      {whole ?
        <Row>
          {children}
        </Row>
        :
        <>
          {children}
        </>
      }
    </>
  );
}

class SignIn extends React.Component {

  signInHandler = (e) => {

    e.preventDefault();
  }

  render() {
    const { whole } = this.props;

    return (
      <SignInHolder whole={whole}>
        <Col xs={{ span: 12, offset: 0 }} lg={ whole ? 12 : 6 }>
          <div id="sign-in">
            <div id={`sign-in-${whole ? 'whole' : 'half'}`}>
              <Form>
                <Form.Row>
                  <Col>
                    <Form.Group controlId="email_address">
                      <Form.Label>Email</Form.Label>
                      <Form.Control type="email" />
                    </Form.Group>
                    <Form.Group controlId="password">
                      <Form.Label>Password</Form.Label>
                      <Form.Control type="password" />
                    </Form.Group>
                  </Col>
                </Form.Row>
                <Button variant="primary" type="submit">
                  Sign In
                </Button>
              </Form>
            </div>
          </div>
        </Col>
      </SignInHolder>
    );
  }
}

export default SignIn;