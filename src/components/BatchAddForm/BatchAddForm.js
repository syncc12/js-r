import React from 'react';
import './BatchAddForm.scss';
import { GlobalContext } from '../../contexts/global-context';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';

class BatchAddForm extends React.Component {
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
    const { setChildValues, rowIndex } = this.props;
    
    const thisColName = document.getElementById(event.target.id).dataset.columnname;
    const etValue = event.target.value;

    setChildValues(rowIndex, thisColName, etValue);

    // this.setState({value: {
    //   ...this.state.value,
    //   [thisColName]: etValue 
    //   }
    // });
  }

  arrExclude = (inArr, exclude=[]) => {
    let outArr = [];
    for (var i of inArr) {
      if (!exclude.includes(i)) outArr.push(i);
    }
    return outArr;
  }

  componentDidMount() {
    this.initialState();
  }

  render() {
    const { endpoint, inputArr, value } = this.props;
    // console.log('value',value);

    return (
      <>
        {inputArr.map((e,i) => <Col key={i} xs={12} lg="auto"><Form.Control id={`${endpoint}-batch_add-form_control-${e[1]}`} placeholder={e[0]} type="text" as={e[2]} data-columnname={e[1]} onChange={this.getValues} value={value[e[1]] || ''} /></Col>)}
      </>
    );
  }
}

export default BatchAddForm;