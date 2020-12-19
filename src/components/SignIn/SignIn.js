import React from 'react';
import './SignIn.scss';
import { GlobalContext } from '../../contexts/global-context';
import axios from 'axios';
import ajaxPath from '../../helpers/ajax';
import { useHistory } from "react-router-dom";
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

function SignInRedirect() {
  let history = useHistory();
  history.push('/');
  return (<></>);
}

class SignIn extends React.Component {
  static contextType = GlobalContext;

  constructor() {
    super();
    this.state = {
      emailAddress: '',
      password: '',
      redirect: false
    }
  }

  postSignInJSON = (emailAddress, password) => {
    const { changeSignedInStatus, changeUserID } = this.context;
    const postJSON = {user:{email:emailAddress, password:password}};
    axios.post(ajaxPath('users/sign_in.json'), postJSON, {withCredentials: true})
    .then((res) => {
      // console.log(res);
      if (res.status === 201) {
        localStorage.setItem('userData', JSON.stringify(res.data));
        // this.setState({redirect: true});
        changeUserID(res.data.id);
        changeSignedInStatus(true);
      }
    })
    .catch((err) => console.log(err));
  }

  postSignIn = (emailAddress, password) => {
    const { changeSignedInStatus, changeUserID } = this.context;
    const postJSON = {users_sign_in:{email:emailAddress, password:password}};
    // axios.post(ajaxPath('users/sign_in.json'), postJSON, {withCredentials: true})
    axios.post(ajaxPath('users/sign_ins'), postJSON)
    .then((res) => {
      // console.log(res);
      if (res.status === 201) {
        // this.setState({redirect: true});
        localStorage.setItem('userData', JSON.stringify(res.data));
        changeUserID(res.data.id);
        changeSignedInStatus(true);
      }
    })
    .catch((err) => console.log(err));
  }

  signInHandler = (e) => {
    this.setState({emailAddress:e.target[0].value,password:e.target[1].value});
    // this.postSignInJSON(e.target[0].value,e.target[1].value);
    this.postSignIn(e.target[0].value,e.target[1].value);
    e.preventDefault();
  }

  render() {
    const{ redirect } = this.state;
    const { whole } = this.props;
    // console.log('redirect',redirect);

    return (
      <SignInHolder whole={whole}>
        <Col xs={{ span: 12, offset: 0 }} lg={ whole ? 12 : 6 }>
          <div id="sign-in">
            <div id={`sign-in-${whole ? 'whole' : 'half'}`}>
              <Form onSubmit={((e) => this.signInHandler(e))}>
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
        {redirect && <SignInRedirect />}
      </SignInHolder>
    );
  }
}

export default SignIn;