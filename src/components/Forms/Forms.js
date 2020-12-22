import React from 'react';
import { GlobalContext } from '../../contexts/global-context';
import axios from 'axios';
import ajaxPath from '../../helpers/ajax';
import { uniqueIdGenerator } from '../../helpers/f';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

class Forms extends React.Component {
  static contextType = GlobalContext;

  constructor() {
    super();
    this.state = {
      value: {}
    };
    this.getValues = this.getValues.bind(this);
  }

  initialState = () => {
    let outJSON = {};
    this.props.inputArr.map((input,index) => {
      return outJSON[input[1]] = '';
    });
    this.setState({value: outJSON})
  }

  getValues = (event) => {
    const thisColName = document.getElementById(event.target.id).dataset.columnname;
    this.setState({value: {
      ...this.state.value,
      [thisColName]: event.target.value 
      }
    });
  }

  addUniqueID = (inJSON) => {
    const uniqueID = uniqueIdGenerator(inJSON);
    if (uniqueID !== '') {
      return inJSON['unique_id'] = uniqueID;
    } else {
      return inJSON;
    }
  }

  postRecord = (postEndpoint, postJSON, e) => {
    const { userID } = this.context;
    postJSON['user_id'] = userID;
    if (this.props.note !== undefined) {
      const { note } = this.props;
      postJSON['table_name'] = note.tableName;
      postJSON['record_id'] = note.recordID;
    }
    // this.addUniqueID(postJSON);
    console.log('postJSON',postJSON);
    axios.post(ajaxPath(postEndpoint), postJSON)
    .then((res) => {
      this.props.addData();
      this.initialState();
    })
    .catch((err) => console.log(err));
    e.preventDefault();
  }

  arrExclude = (inArr, exclude=[]) => {
    let outArr = [];
    for (var i of inArr) {
      if (!exclude.includes(i)) outArr.push(i);
    }
    return outArr;
  }

  tally = (outerIndex,innerIndex) => {
    return (outerIndex * 2) + innerIndex;
  }

  componentDidMount() {
    this.initialState();
  }

  render() {

    const { endpoint, inputArr, inputPattern } = this.props;

    return (
      <Row>
        <Col lg={5}>
          <div className="shadow-box">
            <Form onSubmit={(e) => this.postRecord(endpoint, this.state.value, e)}>
              {
                inputPattern.map((patternGroup,outerIndex) => {
                  return (
                    <Form.Row key={outerIndex}>{
                      patternGroup.map((pattern,innerIndex) => {
                        const thisTally = this.tally(outerIndex,innerIndex);
                        return (
                          <Col key={thisTally} lg={pattern}>
                            <Form.Control id={`${endpoint}-form_control-${inputArr[thisTally][1]}`} key={thisTally} placeholder={inputArr[thisTally][0]} type="text" as={inputArr[thisTally][2]} data-columnname={inputArr[thisTally][1]} onChange={this.getValues} value={this.state.value[inputArr[thisTally][1]] || ''} />
                          </Col>
                        );
                      })
                    }</Form.Row>
                  )
                })
              }

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

export default Forms;