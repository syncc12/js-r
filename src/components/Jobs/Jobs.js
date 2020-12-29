import React from 'react';
import './Jobs.scss';
import { GlobalContext } from '../../contexts/global-context';
import axios from 'axios';
import ajaxPath from '../../helpers/ajax';
import checkSignedIn from '../../helpers/checkSignedIn';
import Tables from '../Tables/Tables';
import Forms from '../Forms/Forms';
import BatchAdd from '../BatchAdd/BatchAdd';
import PopOpen from '../PopOpen/PopOpen';

class Jobs extends React.Component {
  static contextType = GlobalContext;

  constructor() {
    super();
    this.state = {
      jobData: []
    };
  }

  getJobs = () => {
    const { signedIn, userID } = this.context;
    if (signedIn) {
      axios.get(ajaxPath('jobs'), {params:{user_id:userID}})
      .then((res) => this.setState({jobData: res.data}))
      .catch((err) => console.log(err));
    }
  }

  addData = () => {
    this.getJobs();
  }

  async componentDidMount() {
    await checkSignedIn(this.context);
    this.getJobs();
  }

  render() {
    const { jobData } = this.state;
    
    const inputArr = [['Title','title','input'],['Company','company','input'],['Job Type','job_type','input'],['Address','address','input'],['Phone Number','phone_number','input'],['Email Address','email','input'],['Website URL','website_url','input'],['Job Description','job_description','textarea']];
    const headers = [
        ['#','id'],
        ['Title','title'],
        ['Job Type','job_type'],
        ['Company','company'],
        ['Address','address'],
        ['Phone Number','phone_number'],
        ['Email Address','email'],
        ['Website URL','website_url']
      ];
    const inputPattern = [['6','6'],['6','6'],['6','6'],['6','6']];

    return (
      <div>
        <PopOpen buttonName={["Add Job","Add Multiple Jobs"]}>
          <Forms endpoint={'jobs'} inputArr={inputArr} inputPattern={inputPattern} addData={this.addData} />
          <BatchAdd endpoint={'jobs'} inputArr={inputArr} addData={this.addData} />
        </PopOpen>
        <div>
          <Tables headers={headers} dataJSON={jobData} currentTable="jobs" />
        </div>
      </div>
    );
  }
}

export default Jobs;