import React from 'react';
import axios from 'axios';
import ajaxPath from '../../helpers/ajax';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Tables from '../Tables/Tables';
import Forms from '../Forms/Forms';
import PopOpen from '../PopOpen/PopOpen';

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
    // console.log(rowData,rowData.id);
    this.getSubtasks(rowData.id);
  }

  addTaskData = () => {
    this.getTasks();
  }

  addSubtaskData = () => {
    this.getSubtasks();
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
      ['Due Date','due_date']
    ];
    const subtaskHeaders = [
      ['#','id'],
      ['Status', 'status'],
      ['Subtask','subtask_text']
    ];

    const tasksInputArr = [['Task','task_text','textarea'],['Due Date','due_date','input'],['Note','note','textarea']];
    const tasksInputPattern = [['12'],['4','8']];

    const subtasksInputArr = [['Task','task_text','textarea'],['Note','note','textarea']];
    const subtasksInputPattern = [['12'],['12']];

    return (
      <div>
        <Row>
          <Col lg={8}>
            <PopOpen buttonName="Add Task">
              <Forms endpoint={'tasks'} inputArr={tasksInputArr} inputPattern={tasksInputPattern} addData={this.addTaskData} />
            </PopOpen>
          </Col>
          <Col lg={4}>
            <PopOpen buttonName="Add Subtask">
              <Forms endpoint={'subtasks'} inputArr={subtasksInputArr} inputPattern={subtasksInputPattern} addData={this.addSubtaskData} />
            </PopOpen>
          </Col>
        </Row>
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