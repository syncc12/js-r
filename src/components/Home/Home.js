import React from 'react';
import './Home.scss';
import { GlobalContext } from '../../contexts/global-context';
import checkSignedIn from '../../helpers/checkSignedIn';
import { Switch, Route, Link } from "react-router-dom";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import pages from '../../JSONs/pages';
import DynamicComponent from '../DynamicComponent/DynamicComponent';
import SignIn from '../SignIn/SignIn';
import SignUp from '../SignUp/SignUp';

function HomeSquare(props) {
  const { page } = props;
  const name = page.name;
  
  const destName = name.toLowerCase().replace(' ','_');

  return (
    <Link className="home-square" to={`/${destName}`}>
      <p className="home-square-text">{name}</p>
    </Link>
  );
}

function HomeSquareSwitch(props) {
  const { pages } = props;
  
  return (
    <Switch>
      <Route exact path="/"></Route>
      {pages.map((e,i) => {
        const destName = e.name.toLowerCase().replace(' ','_');
        return (
          <Route key={i} path={`/${destName}`}>
            <DynamicComponent name={e.name} />
          </Route>
        )
      })}
    </Switch>
  );
}

class Home extends React.Component {
  static contextType = GlobalContext;


  async componentDidMount() {
    await checkSignedIn(this.context);
  }

  render() {
    const { signedIn } = this.context;

    return (
      <div id="home-page">

        {signedIn ?
          <div id="home-signed-in">
            <Row noGutters>
                {pages.map((e,i) => <Col key={i} xs={{ span: 10, offset: 1 }} lg={{ span: 3, offset: 1 }} className="m-2 mx-lg-5 my-lg-2"><HomeSquare page={e} /></Col>)}
                <HomeSquareSwitch pages={pages} />
            </Row>
          </div>
        :
          <div id="home-signed-out">
            <Row>
              <SignUp whole={false} />
              <SignIn whole={false} />
            </Row>
          </div>
        }
      </div>
    );
  }
}

export default Home;