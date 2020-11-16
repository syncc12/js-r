import React from 'react';
import './SignUp.scss';
import axios from 'axios';
import ajaxPath from '../../helpers/ajax';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function SignUpHolder(props) {
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

class SignUp extends React.Component {

  constructor() {
    super();
    this.state = {
      firstName: '',
      lastName: '',
      username: '',
      emailAddress: '',
      password: '',
      confirmPassword: ''
    }
  }

  postSignUp = (firstName, lastName, username, emailAddress, password, confirmPassword) => {
    const postJSON = {user:{first_name:firstName, last_name:lastName, username:username, email:emailAddress, password:password, password_confirmation:confirmPassword}};
    axios.post(ajaxPath('users'), postJSON)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => console.log(err));
  }

  signUpHandler = (e) => {
    this.setState({firstName:e.target[0].value,lastName:e.target[1].value,username:e.target[2].value,emailAddress:e.target[3].value,password:e.target[4].value,confirmPassword:e.target[5].value})
    this.postSignUp(e.target[0].value,e.target[1].value,e.target[2].value,e.target[3].value,e.target[4].value,e.target[5].value,);
    e.preventDefault();
  }

  render() {
    const { whole } = this.props;

    return (
      <SignUpHolder whole={whole}>
        <Col xs={{ span: 12, offset: 0 }} lg={ whole ? 12 : 6 }>
          <div id="sign-up">
            <div id={`sign-up-${whole ? 'whole' : 'half'}`}>
              <Form onSubmit={((e) => this.signUpHandler(e))}>
                <Form.Row>
                  <Col>
                    <Form.Group controlId="first_name">
                      <Form.Label>First Name</Form.Label>
                      <Form.Control type="text" />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group controlId="last_name">
                      <Form.Label>Last Name</Form.Label>
                      <Form.Control type="text" />
                    </Form.Group>
                  </Col>
                </Form.Row>
                <Form.Row>
                  <Col>
                    <Form.Group controlId="username">
                      <Form.Label>Username</Form.Label>
                      <Form.Control type="text" />
                    </Form.Group>
                    <Form.Group controlId="email_address">
                      <Form.Label>Email address</Form.Label>
                      <Form.Control type="email" />
                    </Form.Group>
                    <Form.Group controlId="password">
                      <Form.Label>Password</Form.Label>
                      <Form.Control type="password" />
                      <Form.Text className="text-muted">
                        (6 characters minimum)
                      </Form.Text>
                    </Form.Group>
                    <Form.Group controlId="password">
                      <Form.Label>Confirm Password</Form.Label>
                      <Form.Control type="password" />
                    </Form.Group>
                  </Col>
                </Form.Row>
                <Button variant="primary" type="submit">
                  Sign Up
                </Button>
              </Form>
            </div>
          </div>
        </Col>
      </SignUpHolder>
    );
  }
}

export default SignUp;