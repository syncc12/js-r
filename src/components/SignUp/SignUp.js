import React from 'react';
import './SignUp.scss';
import { GlobalContext } from '../../contexts/global-context';
import axios from 'axios';
import ajaxPath from '../../helpers/ajax';
import { useHistory } from "react-router-dom";
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

function SignInRedirect() {
  let history = useHistory();
  history.push('/');
  return (<></>);
}

class SignUp extends React.Component {
  static contextType = GlobalContext;

  constructor() {
    super();
    this.state = {
      firstName: '',
      lastName: '',
      username: '',
      emailAddress: '',
      password: '',
      confirmPassword: '',
      redirect: false
    }
  }

  postSignUp = (firstName, lastName, username, emailAddress, password, confirmPassword) => {
    const postJSON = {users_sign_up:{first_name:firstName, last_name:lastName, username:username, email:emailAddress, password:password, confirm_password:confirmPassword}};
    // axios.post(ajaxPath('users'), postJSON, {withCredentials: true})
    axios.post(ajaxPath('users/sign_ups'), postJSON)
    .then((res) => {
      // console.log(res);
      if (res.status === 200) {
        this.postSignIn(emailAddress,password);
      }
    })
    .catch((err) => console.log(err));
  }

  signUpHandler = (e) => {
    this.setState({firstName:e.target[0].value,lastName:e.target[1].value,username:e.target[2].value,emailAddress:e.target[3].value,password:e.target[4].value,confirmPassword:e.target[5].value})
    this.postSignUp(e.target[0].value,e.target[1].value,e.target[2].value,e.target[3].value,e.target[4].value,e.target[5].value,);    
    e.preventDefault();
  }

  postSignIn = (emailAddress, password) => {
    const { changeSignedInStatus, changeUserID } = this.context;
    const postJSON = {users_sign_in:{email:emailAddress, password:password}};
    // axios.post(ajaxPath('users/sign_in.json'), postJSON, {withCredentials: true})
    axios.post(ajaxPath('users/sign_ins'), postJSON)
    .then((res) => {
      // console.log(res);
      if (res.status === 201) {
        localStorage.setItem('userData', JSON.stringify(res.data));
        // this.setState({redirect: true});
        changeSignedInStatus(true);
      }
    })
    .catch((err) => console.log(err));
  }

  // componentDidMount() {
  //   this.getSignUp();
  // }

  render() {
    const{ redirect } = this.state;
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
        {redirect && <SignInRedirect />}
      </SignUpHolder>
    );
  }
}

export default SignUp;