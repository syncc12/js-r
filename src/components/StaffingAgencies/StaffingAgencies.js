import React from 'react';
// import axios from 'axios';
// import ajaxPath from '../../helpers/ajax';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Tables from '../Tables/Tables';
// import Forms from '../Forms/Forms';

class StaffingAgencies extends React.Component {

  constructor() {
    super();
    this.state = {
      staffingAgencyData: []
    };
  }

  getStaffingAgencies = () => {
    // axios.get(ajaxPath('staffing_agencies'))
    // .then((res) => this.setState({staffingAgencyData: res.data}))
    // .catch((err) => console.log(err));
  }

  addData = () => {
    this.getStaffingAgencies();
  }

  componentDidMount() {
    this.getStaffingAgencies();
  }

  render() {
    const { staffingAgencyData } = this.state;
    
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

    return (
      <div>
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