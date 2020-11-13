import React from 'react';
import './TableController.scss';
import axios from 'axios';
import ajaxPath from '../../helpers/ajax';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';


class TableController extends React.Component {

  constructor() {
    super();
    this.state = {
      value: {
        title:'',
        headers:[]
      }
    };
    this.collectValues = this.collectValues.bind(this);
  }

  collectValues = (event) => {
    const thisColName = document.getElementById(event.target.id).dataset.columnname;
    event.persist();
    console.log('event',event);
    if (thisColName.includes('.')) {
      const thisColArr = thisColName.split('.');
      this.setState({value: {
        ...this.state.value,
        [thisColArr[0]]: {
          ...this.state.value[thisColArr[0]],
          [thisColArr[1]]: event.target.value
        }
      }
      });
    } else {
      this.setState({value: {
        ...this.state.value,
        [thisColName]: event.target.value 
      }
      });
    }
    
    console.log(this.state.value);
  }

  getTableData = () => {

  }

  updateTableData = () => {
    
  }

  createTable = (values, e) => {
    const { userID } = this.context;
    const columnsArr = values.headers.map((e,i) => {
      return {order:e.order,name:e.name,type:e.type};
    })
    const postJSON = {title:values.title, table_data:{title:values.title,columns:columnsArr},user_id:userID};
    console.log('postJSON',postJSON);
    // axios.post(ajaxPath('custom_tables'), postJSON)
    // .then((res) => {
      
    // })
    // .catch((err) => console.log(err));
    e.preventDefault();

  }

  render() {
    const { type } = this.props;
    const headerColWidth = 3;
    let totalHeaders = 1;

    return ( 

      <div>
        {type === 'new' && 
          <Form onSubmit={(e) => this.createTable(this.state.value, e)}>
            <Form.Row>
              <Col lg={3}>
                <Form.Control id="title-form_control" placeholder="Title" type="text" as="input" data-columnname="title" onChange={this.collectValues} value={this.state.value.title || ''} />
              </Col>
            </Form.Row>
            <Form.Label>Headers</Form.Label>
            <Form.Row>
              <Col lg={headerColWidth}>
                <Form.Control id="header-order-form_control" placeholder="Order" type="text" as="input" data-columnname="headers.order" onChange={this.collectValues} value={this.state.value.headers.order || ''} />
              </Col>
            </Form.Row>
            <Form.Row>
              <Col lg={headerColWidth}>
                <Form.Control id="header-name-form_control" placeholder="Name" type="text" as="input" data-columnname="headers.name" onChange={this.collectValues} value={this.state.value.headers.name || ''} />
              </Col>
            </Form.Row>
            <Form.Row>
              <Col lg={headerColWidth}>
                <Form.Control id="header-type-form_control" placeholder="Type" type="text" as="input" data-columnname="headers.type" onChange={this.collectValues} value={this.state.value.headers.type || ''} />
              </Col>
            </Form.Row>
            <br/>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        }
        {type === 'add' && <div>Add Data</div>}
        {type === 'update' && <div>Update Table</div>}
      </div>
    )
  }
}


export default TableController;