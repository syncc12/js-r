import React from 'react';
import './PopOpen.scss';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


function ShowButton(props) {
  const { show, label, buttonIndex, buttonClicked } = props;

  return (
    show ? '' : <Button className="popopen-button" style={{order: buttonIndex}} onClick={(() => buttonClicked(buttonIndex))}>{label}</Button>
  );
}

function HideButton(props) {
  const { show, label, buttonIndex, buttonClicked } = props;
  return (
    show ? <Button className="popopen-button" style={{order: buttonIndex}} onClick={(() => buttonClicked(buttonIndex))}>Hide {label}</Button> : ''
  );
}

function PopCard(props) {
  const { show, contents } = props;
  return (
    show ? <>{contents}</> : ''
  );
}



class PopOpen extends React.Component {

  constructor() {
    super();
    this.state = {
      show: {0: false}
    }
  }

  buttonClicked = (buttonIndex) => {
    const { show } = this.state;
    if (show.hasOwnProperty(buttonIndex)) {
      this.setState(prevState => {
        return ({
          show: {
            ...prevState.show,
            [buttonIndex]: !show[buttonIndex]
          }
        })
      });
    } else {
      this.setState(prevState => {
        return ({
          show: {
            ...prevState.show,
            [buttonIndex]: true
          }
        })
      });
    }
  }

  render() {
    const { show } = this.state;
    const { buttonName, children } = this.props;

    const isMultiple = Array.isArray(buttonName) || Array.isArray(children);

    return (
      <Row>
        <Col lg={12}>
          <div className="popopen-container">

          {
            isMultiple ?
              <>
                <div className="popopen-button-container">
                  {buttonName.map((e,i) => <ShowButton key={i} show={show[i]} label={e} buttonIndex={i} buttonClicked={this.buttonClicked} /> )}
                  {buttonName.map((e,i) => <HideButton key={i} show={show[i]} label={e} buttonIndex={i} buttonClicked={this.buttonClicked} /> )}
                </div>
                <div className="popopen-card">
                  {children.map((e,i) => <PopCard key={i} show={show[i]} contents={e} /> )}
                </div>
              </>

            :
            
              !show[0] ? 
                <div className="popopen-button-container"><Button className="popopen-button" onClick={(() => this.buttonClicked(0))}>{buttonName}</Button></div>
              :
                <>
                  <div className="popopen-button-container"><Button className="popopen-button" onClick={(() => this.buttonClicked(0))}>Hide</Button></div>
                  <div className="popopen-card">{children}</div>
                </>
            }
          </div>
        </Col>
      </Row>
    );
  }
}

export default PopOpen;