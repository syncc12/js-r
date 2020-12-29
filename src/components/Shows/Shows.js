import React from 'react';
import './Shows.scss';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import formatDate from '../../helpers/formatDate';
import clr from '../../JSONs/coverLetterReplaceJSON';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CoverLetters from '../CoverLetters/CoverLetters'

function DetailRow(props) {
  const { dataTD } = props;

  // console.log('dataTD',dataTD);
  let title, data, hrefName;

  // const urlRegex = /(http(s)?:\/\/)?(www\.)?(.*?)\.(.{2,3})((\/?)|(.{2,3})).*$/;
  // const emailRegex = /(mailto:)?(.*?)@(.*?)\.(.{2,3})/;
  // const phoneRegex = /(tel:)?(\+)?(\d)?\(\d{3}\)(\d{3})-(\d{4})/;

  if (dataTD[0].toLowerCase().includes('url')) {
    hrefName = dataTD[1];
    data = {type: 'icon', name: hrefName, icon: ['fad','globe']};
  } else if (dataTD[0].toLowerCase().includes('email')) {
    hrefName = dataTD[1] ? dataTD[1].replace('mailto:','') : '';
    data = {type: 'icon', name: `mailto:${hrefName}`, icon: ['fad','envelope']};
  } else if (dataTD[0].toLowerCase().includes('phone')) {
    hrefName = dataTD[1] ? dataTD[1].replace('tel:','').replace(/\+\d/,'') : '';
    data = {type: 'icon', name: `tel:+1${hrefName}`, icon: ['fad','phone']};
  } else if (dataTD[0].toLowerCase().includes('created')) {
    hrefName = dataTD[1] ? formatDate(dataTD[1]) : '';
    data = {type: 'text', name: hrefName, icon: []};
  } else {
    data = {type: 'text', name: dataTD[1], icon: []};
  }



  title = dataTD[0].split('_').map((e,i) => {
    return(`${e.slice(0,1).toUpperCase()}${e.slice(1).toLowerCase()}`)
  }).join(' ');

  return (
    <tr>
      <th>{title}</th>
      <td>{data.type === 'icon' ? <a href={data.name}><FontAwesomeIcon icon={data.icon} /></a> : data.name}</td>
    </tr>
  );
}

function CoverLetter(props) {
  const { template, recordJSON } = props;

  const findRegEx = /\[(.*?)\]/gi;
  function replaceRegEx(match,p1) {
    return recordJSON[clr[p1.toLowerCase()]];
  }

  let completeCL = template === '' ? '' : template.replace(findRegEx, replaceRegEx);

  return (
    <div className="show-cover-letter"><CoverLetters coverLetterText={completeCL} jobTitle={recordJSON['title']} company={recordJSON['company']} /></div>
  );
}

function FollowUpMessage(props) {

  return (
    <div></div>
  );
}

class Shows extends React.Component {

  constructor() {
    super();
    this.state = {
      show: false
    }
  }

  showModal = () => {
    this.setState({show: true});
  }

  hideModal = () => {
    this.setState({show: false});
  }

  render() {
    const { data, currentTable, template } = this.props;
    const excludeTitles = ['id','job_description','notes','user_id','job_id','updated_at'];

    return (
      <>
        <Button variant="primary" size="sm" onClick={() => this.showModal()} block>
          Details
        </Button>

        <Modal show={this.state.show} dialogClassName="custom-modal-size" onHide={() => this.hideModal()}>
          <Modal.Header closeButton>
            <Modal.Title id="shows-modal_title">{''}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col md={6}>
                <Table hover responsive>
                  <thead>
                    <tr><th>Name</th><th>Data</th></tr>
                  </thead>
                  <tbody>
                    {Object.entries(data).map((dataTD,index) => excludeTitles.includes(dataTD[0]) === false ? <DetailRow key={index} dataTD={dataTD} /> : null)}
                  </tbody>
                </Table>
              </Col>
              <Col md={6}>
                <Row>
                  <Col md={12}>
                    <h5>{currentTable === 'listings' ? 'Cover Letter' : ''}{currentTable === 'jobs' ? 'Follow Up' : ''}</h5>
                    {currentTable === 'listings' ? <CoverLetter template={template} recordJSON={data} /> : ''}
                    {currentTable === 'jobs' ? <FollowUpMessage /> : ''}
                  </Col>
                </Row>
                <br />
                <Row>
                  <Col md={12}>
                    <h5>Job Description</h5>
                    <div>{data['job_description']}</div>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Modal.Body>
        </Modal>
      </>
    );
  }
}

export default Shows;