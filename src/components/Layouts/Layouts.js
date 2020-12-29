import React from 'react';
import './Layouts.scss';
import { GlobalContext } from '../../contexts/global-context';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import pages from '../../JSONs/pages';
// import DynamicComponent from '../DynamicComponent/DynamicComponent';
import routifyString from '../../helpers/routifyString';
import Home from '../Home/Home';
import Listings from '../Listings/Listings';
import Jobs from '../Jobs/Jobs';
import Tasks from '../Tasks/Tasks';
import StaffingAgencies from '../StaffingAgencies/StaffingAgencies';
import GeneralNotes from '../GeneralNotes/GeneralNotes';
import Dashboard from '../Dashboard/Dashboard';
import SignIn from '../SignIn/SignIn';
import SignUp from '../SignUp/SignUp';
import SignOut from '../SignOut/SignOut';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class Layouts extends React.Component {
  static contextType = GlobalContext;

  

  render() {
    const { signedIn } = this.context;

    return (
      <Router>
        <Navbar bg="dark" variant="dark" expand="lg">
          <Navbar.Brand href="/">JobSearch</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
            {signedIn &&
              pages.map((e,i) => e.show ? <Nav.Link key={i} href={`/${routifyString(e.name)}`}>{e.name}</Nav.Link> : '')
            }
            </Nav>
            <Nav>
              {signedIn ?
                <>
                  <Nav.Link href={'/dashboard'}><FontAwesomeIcon icon={['fal','user-circle']} /></Nav.Link>
                  <Nav.Link href={'/#'}><SignOut>Sign Out</SignOut></Nav.Link>
                </>
                :
                <>
                  <Nav.Link href={'/sign_in'}>Sign In</Nav.Link>
                  <Nav.Link href={'/sign_up'}>Sign Up</Nav.Link>
                </>
              }
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <br />

          <div id="layout-container">
            <Row>
              <Col lg={12}>
                <Switch>
                  <Route exact path="/">
                    <Home />
                  </Route>
                  <Route path="/listings">
                    <Listings />
                  </Route>
                  <Route path="/jobs">
                    <Jobs />
                  </Route>
                  <Route path="/tasks">
                    <Tasks />
                  </Route>
                  <Route path="/staffing_agencies">
                    <StaffingAgencies />
                  </Route>
                  <Route path="/general_notes">
                    <GeneralNotes />
                  </Route>
                  <Route path="/sign_in">
                    <SignIn whole={true} />
                  </Route>
                  <Route path="/sign_up">
                    <SignUp whole={true} />
                  </Route>
                  <Route path="/dashboard">
                    <Dashboard />
                  </Route>
                </Switch>
              </Col>
            </Row>
          </div>
      </Router>
    );
  }
}

export default Layouts;