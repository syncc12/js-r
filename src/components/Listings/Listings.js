import React from 'react';
import { GlobalContext } from '../../contexts/global-context';
import axios from 'axios';
import ajaxPath from '../../helpers/ajax';
import checkSignedIn from '../../helpers/checkSignedIn';
import Tables from '../Tables/Tables';
import Forms from '../Forms/Forms';
import BatchAdd from '../BatchAdd/BatchAdd';
import PopOpen from '../PopOpen/PopOpen';

class Listings extends React.Component {
  static contextType = GlobalContext;

  constructor() {
    super();
    this.state = {
      listingData: [],
      coverLetter: ''
    };
  }

  getListings = () => {
    let { signedIn, userID } = this.context;
    if (signedIn) {
      axios.get(ajaxPath('listings'), {params:{user_id:userID}})
      .then((res) => {
        console.log('res',res);
        this.setState({listingData: res.data})
      })
      .catch((err) => console.log(err));
    }
  }

  addData = () => {
    this.getListings();
  }

  getCoverLetterTemplate = () => {
    let { signedIn, userID } = this.context;
    if (signedIn) {
      axios.get(ajaxPath('dashboards/cover_letters'), {params:{user_id:userID}})
      .then((res) => {
        const filteredTemplateData = res.data.sort(function(a,b) {
          return a.id < b.id;
        })[0];
        this.setState({coverLetter:filteredTemplateData.template});
      })
      .catch((err) => {
        console.log(err);
        this.setState({coverLetter:''});
      });
    }
  }

  async componentDidMount() {
    await checkSignedIn(this.context);
    this.getListings();
    this.getCoverLetterTemplate();
  }

  render() {
    const { listingData, coverLetter } = this.state;

    const inputArr = [['Title','title','input'],['Company','company','input'],['Job Type','job_type','input'],['Address','address','input'],['Phone Number','phone_number','input'],['Email Address','email','input'],['Website URL','website_url','input'],['Job Description','job_description','textarea']];
    const headers = [
        ['#','id'],
        ['Transfer', 'transfered'],
        ['Applied','applied'],
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
        <PopOpen buttonName={["Add Listing","Add Multiple Listings"]}>
          <Forms endpoint={'listings'} inputArr={inputArr} inputPattern={inputPattern} addData={this.addData} />
          <BatchAdd endpoint={'listings'} inputArr={inputArr} addData={this.addData} />
        </PopOpen>
        <div>
          <Tables headers={headers} dataJSON={listingData} currentTable="listings" showData={coverLetter} />
        </div>
      </div>
    );
  }
}

export default Listings;