import React from 'react';
import './BatchAdd.scss';
import { GlobalContext } from '../../contexts/global-context';
import axios from 'axios';
import ajaxPath from '../../helpers/ajax';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import BatchAddForm from '../BatchAddForm/BatchAddForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class BatchAdd extends React.Component {
  static contextType = GlobalContext;

  constructor() {
    super();
    this.state = {
      formRows: 1,
      childValues: ['']
    };
  }

  initialState = () => {
    this.setState({formRows: 1, childValues: ['']})
  }

  setChildValues = (rowIndex, inputKey, inputValue) => {
    const { childValues } = this.state;
    let newCVArr = [...childValues];
    newCVArr[rowIndex] = {...newCVArr[rowIndex], [inputKey]: inputValue};
    
    // console.log('newCVArr',newCVArr);
    this.setState({childValues: newCVArr});
  }

  postRecord = (postEndpoint, postJSONArr, e) => {
    const { userID } = this.context;
    let payload = [];
    for (let i in postJSONArr) {
      postJSONArr[i]['user_id'] = userID;
      if (this.props.note !== undefined) {
        const { note } = this.props;
        postJSONArr[i]['table_name'] = note.tableName;
        postJSONArr[i]['record_id'] = note.recordID;
      }
      payload.push(axios.post(ajaxPath(postEndpoint),postJSONArr[i]))
    }

    // console.log(payload);

    axios.all(payload)
    .then((res) => {
      this.props.addData();
      this.initialState();
    })
    .catch((err) => console.log(err));
    e.preventDefault();
  }

  addRowControl = () => {
    const { formRows, childValues } = this.state;
    const childValuesNewRow = new Array(childValues.length + 1).fill('')
    
    this.setState({formRows: this.state.formRows + 1, childValues: childValuesNewRow});
  }

  render() {
    const { formRows, childValues } = this.state;
    const { endpoint, inputArr } = this.props;

    const rowMap = [...Array(formRows).keys()];

    return (
      <Row>
        <Col xs={12}>
          <div className="shadow-box">
            <Form onSubmit={(e) => this.postRecord(endpoint, this.state.childValues, e)}>
              {rowMap.map((e,i) => <Form.Row><BatchAddForm endpoint={endpoint} inputArr={inputArr} rowIndex={i} setChildValues={this.setChildValues} value={childValues[i]} /></Form.Row>)}
              <div id="add-row-button" onClick={(() => this.addRowControl())}><FontAwesomeIcon icon={['fad','plus-square']} /></div>
              <br/>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </div>
        </Col>
      </Row>
    );
  }
}

export default BatchAdd;