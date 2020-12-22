import React from 'react';
import axios from 'axios';
import ajaxPath from '../../helpers/ajax';
import Tables from '../Tables/Tables';
import Forms from '../Forms/Forms';
import BatchAdd from '../BatchAdd/BatchAdd';
import PopOpen from '../PopOpen/PopOpen';
import CardDeck from '../CardDeck/CardDeck';

class Listings extends React.Component {

  constructor() {
    super();
    this.state = {
      listingData: []
    };
  }

  getListings = () => {
    axios.get(ajaxPath('listings'))
    .then((res) => this.setState({listingData: res.data}))
    .catch((err) => console.log(err));
  }

  addData = () => {
    this.getListings();
  }

  componentDidMount() {
    this.getListings();
  }

  render() {
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
    const { listingData } = this.state
    const { cardState } = this.props;

    return (
      <>
        {cardState ?
          <CardDeck data={listingData} />
          :
          <div>
            <PopOpen buttonName={["Add Listing","Add Multiple Listings"]}>
              <Forms endpoint={'listings'} inputArr={inputArr} inputPattern={inputPattern} addData={this.addData} />
              <BatchAdd endpoint={'listings'} inputArr={inputArr} addData={this.addData} />
            </PopOpen>
            <div>
              <Tables headers={headers} dataJSON={listingData} currentTable="listings" />
            </div>
          </div>
        }
      </>
    );
  }
}

export default Listings;