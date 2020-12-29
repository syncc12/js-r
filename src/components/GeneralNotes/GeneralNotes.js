import React from 'react';
import { GlobalContext } from '../../contexts/global-context';
import axios from 'axios';
import ajaxPath from '../../helpers/ajax';
import checkSignedIn from '../../helpers/checkSignedIn';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Tables from '../Tables/Tables';
import Forms from '../Forms/Forms';
import PopOpen from '../PopOpen/PopOpen';

class GeneralNotes extends React.Component {
  static contextType = GlobalContext;

  constructor() {
    super();
    this.state = {
      generalNoteData: []
    };
  }

  getGeneralNotes = () => {
    axios.get(ajaxPath('general_notes'))
    .then((res) => this.setState({generalNoteData: res.data}))
    .catch((err) => console.log(err));
  }

  addData = () => {
    this.getGeneralNotes();
  }

  async componentDidMount() {
    await checkSignedIn(this.context);
    this.getGeneralNotes();
  }

  render() {
    const { generalNoteData } = this.state;
    
    const headers = [
      ['#','id'],
      ['Date', 'created_at'],
      ['Note','note']
    ];
    const inputArr = [['Note','note','textarea']];
    const inputPattern = [['12']];

    return (
      <div>
        <Row>
          <Col lg={12}>
            <PopOpen buttonName="Add Note">
              <Forms endpoint={'general_notes'} inputArr={inputArr} inputPattern={inputPattern} addData={this.addData} />
            </PopOpen>
          </Col>
        </Row>
        <Row>
          <Col lg={12}>
            <Tables headers={headers} dataJSON={generalNoteData} currentTable="general_notes" />
          </Col>
        </Row>
      </div>
    );
  }
}

export default GeneralNotes;