import React from 'react';
import './Jobs.scss';
import axios from 'axios';
import ajaxPath from '../../helpers/ajax';
import Tables from '../Tables/Tables';
import Forms from '../Forms/Forms';
import PopOpen from '../PopOpen/PopOpen';
import CardDeck from '../CardDeck/CardDeck';

class Jobs extends React.Component {

  constructor() {
    super();
    this.state = {
      jobData: []
    };
  }

  getJobs = () => {
    axios.get(ajaxPath('jobs'))
    .then((res) => this.setState({jobData: res.data}))
    .catch((err) => console.log(err));
  }

  addData = () => {
    this.getJobs();
  }

  componentDidMount() {
    this.getJobs();
  }

  render() {
    const { jobData } = this.state;
    const { cardState } = this.props;
    
    const inputArr = [['Title','title','input'],['Company','company','input'],['Job Type','job_type','input'],['Address','address','input'],['Phone Number','phone_number','input'],['Email Address','email','input'],['Website URL','website_url','input'],['Job Description','job_description','textarea']];
    const headers = [
        ['#','id'],
        ['Transfer', 'transferred'],
        ['Applied','application_status'],
        ['Open','consideration_status'],
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
      <>
        {cardState ?
          <CardDeck data={jobData} />
          :
          <div>
            <PopOpen buttonName="Add Job">
              <Forms endpoint={'jobs'} inputArr={inputArr} inputPattern={inputPattern} addData={this.addData} />
            </PopOpen>
            <div>
              <Tables headers={headers} dataJSON={jobData} currentTable="jobs" />
            </div>
          </div>
        }
      </>
    );
  }
}

export default Jobs;