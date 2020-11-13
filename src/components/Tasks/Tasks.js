import React from 'react';
import axios from 'axios';
import ajaxPath from '../../helpers/ajax';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Tables from '../Tables/Tables';
import Forms from '../Forms/Forms';

class Tasks extends React.Component {
  
  constructor() {
    super();
    this.state = {
      taskData: [],
      subtaskData: []
    };
  }

  getTasks = () => {
    axios.get(ajaxPath('tasks'))
    .then((res) => this.setState({taskData: res.data}))
    .catch((err) => console.log(err));
  }

  getSubtasks = (taskID) => {
    axios.get(ajaxPath('subtasks'))
    .then((res) => {
      let filteredArr = [];
      res.data.map((e) => {
        if (e.task_id === taskID) {
          filteredArr.push(e);
        }
      });
      // console.log('filteredArr',filteredArr);
      this.setState({subtaskData: filteredArr});
    })
    .catch((err) => console.log(err));
  }

  taskSelectHandler = (rowData) => {
    console.log(rowData,rowData.id);
    this.getSubtasks(rowData.id);
  }

  componentDidMount() {
    this.getTasks();
  }

  render() {
    const { taskData, subtaskData } = this.state;
    
    const taskHeaders = [
      ['#','id'],
      ['Status', 'status'],
      ['Task','task_text'],
      ['Start Date','created_at'],
      ['Due Date','due_date'],
      ['Notes','notes']
    ];
    const subtaskHeaders = [
      ['#','id'],
      ['Status', 'status'],
      ['Subtask','subtask_text'],
      ['Notes','notes']
    ];

    return (
      <div>
        <Row>
          <Col lg={8}>
            <Tables headers={taskHeaders} dataJSON={taskData} currentTable="tasks" selectedRow={this.taskSelectHandler} />
          </Col>
          <Col lg={4}>
            <Tables headers={subtaskHeaders} dataJSON={subtaskData} currentTable="subtasks" />
          </Col>
        </Row>
      </div>
    );
  }
}

export default Tasks;