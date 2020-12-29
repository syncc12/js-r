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

class Tasks extends React.Component {
  static contextType = GlobalContext;
  
  constructor() {
    super();
    this.state = {
      taskData: [],
      subtaskData: []
    };
  }

  getTasks = () => {
    const { signedIn, userID } = this.context;
    if (signedIn) {
      axios.get(ajaxPath('tasks'), {params:{user_id:userID}})
      .then((res) => this.setState({taskData: res.data}))
      .catch((err) => console.log(err));
    }
  }

  getSubtasks = (taskID) => {
    const { signedIn } = this.context;
    if (signedIn) {
      axios.get(ajaxPath('subtasks'), {params:{task_id:taskID}})
      .then((res) => {
        this.setState({subtaskData: res.data});

      })
      .catch((err) => console.log(err));
    }
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

  async componentDidMount() {
    await checkSignedIn(this.context);
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