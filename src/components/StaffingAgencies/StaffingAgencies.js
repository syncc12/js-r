import React from 'react';
import { GlobalContext } from '../../contexts/global-context';
import axios from 'axios';
import ajaxPath from '../../helpers/ajax';
import checkSignedIn from '../../helpers/checkSignedIn';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Tables from '../Tables/Tables';
import Forms from '../Forms/Forms';
import BatchAdd from '../BatchAdd/BatchAdd';
import PopOpen from '../PopOpen/PopOpen';

class StaffingAgencies extends React.Component {
  static contextType = GlobalContext;

  constructor() {
    super();
    this.state = {
      staffingAgencyData: []
    };
  }

  getStaffingAgencies = () => {
    const { signedIn, userID } = this.context;
    if (signedIn) {
      axios.get(ajaxPath('staffing_agencies'), {params:{user_id:userID}})
      .then((res) => this.setState({staffingAgencyData: res.data}))
      .catch((err) => console.log(err));
    }
  }

  addData = () => {
    this.getStaffingAgencies();
  }

  async componentDidMount() {
    await checkSignedIn(this.context);
    this.getStaffingAgencies();
  }

  render() {
    const { staffingAgencyData } = this.state;
    
    const inputArr = [['Agency Name','name','input'],['Address','address','input'],['Email Address','email','input'],['Website URL','website_url','input'],['Phone Number','phone_number','input'],['Industry','industry','input']];

    const headers = [
        ['#','id'],
        ['Name', 'name'],
        ['Industry','industry'],
        ['Address','address'],
        ['Website URL','website_url'],
        ['Email Address','email'],
        ['Phone Number','phone_number'],
        ['Notes','notes']
      ];
    const inputPattern = [['6','6'],['6','6'],['6','6']];

    return (
      <div>
        <Row>
          <Col lg={12}>
            <PopOpen buttonName={["Add Staffing Agency","Add Multiple Staffing Agencies"]}>
              <Forms endpoint={'staffing_agencies'} inputArr={inputArr} inputPattern={inputPattern} addData={this.addData} />
              <BatchAdd endpoint={'staffing_agencies'} inputArr={inputArr} addData={this.addData} />
            </PopOpen>
          </Col>
        </Row>
        <Row>
          <Col lg={12}>
            <Tables headers={headers} dataJSON={staffingAgencyData} addData={this.addData} currentTable="staffing_agencies" />
          </Col>
        </Row>
      </div>
    );
  }
}

export default StaffingAgencies;