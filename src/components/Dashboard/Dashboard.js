import React from 'react';
import './Dashboard.scss';
import { GlobalContext } from '../../contexts/global-context';
import axios from 'axios';
import ajaxPath from '../../helpers/ajax';
import checkSignedIn from '../../helpers/checkSignedIn';
import ListGroup from 'react-bootstrap/ListGroup';
import Tab from 'react-bootstrap/Tab';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function SettingsTab(props) {

  return (
    <div>Settings</div>
  )
}

function AccountInformationTab(props) {

  return (
    <>
      <Row>
        <Col xs={12} lg={5}>
          <InputGroup>
          <InputGroup.Prepend>
            <InputGroup.Text id="account-information-tab-username">Username</InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            aria-label="Username"
            aria-describedby="account-information-tab-username"
          />
        </InputGroup>
      </Col>
    </Row>
    <br />
    <Row>
      <Col xs={12} lg={5}>
        <InputGroup>
          <InputGroup.Prepend>
            <InputGroup.Text id="account-information-tab-name">Name</InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            aria-label="First Name"
            aria-describedby="account-information-tab-name"
          />
          <FormControl
            aria-label="Last Name"
            aria-describedby="account-information-tab-name"
          />
        </InputGroup>
      </Col>
    </Row>
    <br />
    <Row>
      <Col xs={12} lg={5}>
        <InputGroup>
          <InputGroup.Prepend>
            <InputGroup.Text id="account-information-tab-email">Email</InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            aria-label="Email"
            aria-describedby="account-information-tab-email"
          />
        </InputGroup>
      </Col>
    </Row>
  </>
  )
}

function CoverLetterTab(props) {
  const { saveTemplate, templateData } = props;

  const filteredTemplateData = templateData === '' ? '' : templateData.sort(function(a,b) {
      return a.id < b.id;
    })[0];

  return (
    <Form onSubmit={((e) => saveTemplate('cover_letters',e))}>
      <Form.Group>
        <Form.Label>Cover Letter Template</Form.Label>
        <Form.Row>
          <Col xs={12} lg={5}>
            <Form.Control id="cover_letter-template" as="textarea" defaultValue={filteredTemplateData !== undefined ? filteredTemplateData.template : ''} rows={25} />
          </Col>
        </Form.Row>
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  )
}

function FollowUpEmailTab(props) {
  const { saveTemplate, templateData } = props;
  const filteredTemplateData = templateData.sort(function(a,b) {
    return a.id < b.id;
  })[0];

  return (
    <Form onSubmit={((e) => saveTemplate('follow_up_emails',e))}>
      <Form.Group>
        <Form.Label>Follow Up Email Template</Form.Label>
        <Form.Row>
          <Col xs={12} lg={5}>
            <Form.Control id="follow_up_email-subject_template" placeholder="Subject" as="textarea" defaultValue={filteredTemplateData !== undefined ? filteredTemplateData.subject_template : ''} rows={1} />
          </Col>
        </Form.Row>
        <Form.Row>
          <Col xs={12} lg={5}>
            <Form.Control id="follow_up_email-content_template" placeholder="Content" as="textarea" defaultValue={filteredTemplateData !== undefined ? filteredTemplateData.content_template : ''} rows={25} />
          </Col>
        </Form.Row>
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  )
}

function NetworkingMessageTab(props) {

  return (
    <div>Networking Message</div>
  )
}

function FreelanceTab(props) {

  return (
    <div>Freelance</div>
  )
}

function DocumentsTab(props) {

  return (
    <div>Documents</div>
  )
}

function AboutTab(props) {

  return (
    <div>About</div>
  )
}

class Dashboard extends React.Component {
  static contextType = GlobalContext;

  constructor() {
    super();
    this.state = {
      templates: {
        cover_letters: [''],
        follow_up_emails: ['']
      }
    }
  }

  saveTemplate = (templateName, e) => {
    const { userID } = this.context;
    let dataJSON = {}
    dataJSON['user_id'] = userID;

    let allTextAreas = e.target.getElementsByTagName('textarea');

    for (let i of allTextAreas) {
      const dataID = i.id.split('-')[1];
      const dataValue = i.value
      dataJSON[dataID] = dataValue;
    }

    const outerJSONName = `dashboards_${allTextAreas[0].id.split('-')[0]}`;
    const finalJSON = {[outerJSONName]: dataJSON};

    axios.post(ajaxPath(`dashboards/${templateName}`), finalJSON)
    .then((res) => {
      this.setState(prevState => ({
        templates: {
          ...prevState.templates,
          [templateName]:''
        }
      }));
    })
    .catch((err) => {
      console.log(err);
      this.setState(prevState => ({
        templates: {
          ...prevState.templates,
          [templateName]:''
        }
      }));
    });
    e.preventDefault();
  }

  getTemplate = (templateName) => {
    const { userID } = this.context;

    axios.get(ajaxPath(`dashboards/${templateName}`), {params:{user_id:userID}})
    .then((res) => {
      this.setState(prevState => ({
        templates: {
          ...prevState.templates,
          [templateName]:res.data
        }
      }));
    })
    .catch((err) => {
      console.log(err);
      this.setState(prevState => ({
        templates: {
          ...prevState.templates,
          [templateName]:''
        }
      }));
    });
    
  }

  async componentDidMount() {
    await checkSignedIn(this.context);
    const templateArr = ['cover_letters','follow_up_emails'];
    for (let i of templateArr) {
      this.getTemplate(i);
    }
  }

  render() {
    const { templates } = this.state;

    const tabArr = [
      {name: 'Settings', link: 'settings_tab', icon: <FontAwesomeIcon icon={['fad','cogs']} />, content: <SettingsTab />},
      {name: 'Account Information', link: 'account_information_tab', icon: <FontAwesomeIcon icon={['fad','portrait']} />, content: <AccountInformationTab />},
      {name: 'Cover Letter', link: 'cover_letter_tab', icon: <FontAwesomeIcon icon={['fad','font']} />, content: <CoverLetterTab templateData={templates.cover_letters} saveTemplate={this.saveTemplate} />},
      {name: 'Follow Up Email', link: 'follow_up_email_tab', icon: <FontAwesomeIcon icon={['fad','envelope']} />, content: <FollowUpEmailTab templateData={templates.follow_up_emails} saveTemplate={this.saveTemplate} />},
      {name: 'Networking Message', link: 'networking_message_tab', icon: <FontAwesomeIcon icon={['fad','comment-lines']} />, content: <NetworkingMessageTab />},
      {name: 'Freelance', link: 'freelance_tab', icon: <FontAwesomeIcon icon={['fad','laptop-house']} />, content: <FreelanceTab />},
      {name: 'Documents', link: 'documents_tab', icon: <FontAwesomeIcon icon={['fad','folder-open']} />, content: <DocumentsTab />},
      {name: 'About', link: 'about_tab', icon: <FontAwesomeIcon icon={['fad','question-circle']} />, content: <AboutTab />},
    ];

    return (
      <Tab.Container id="list-group-tabs-example" defaultActiveKey={`#${tabArr[0]['link']}`}>
        <Row>
          <Col sm={2}>
            <ListGroup>
              {tabArr.map((e,i) => <ListGroup.Item key={i} action href={`#${e.link}`}>{e.icon} {e.name}</ListGroup.Item>)}
            </ListGroup>
          </Col>
          <Col sm={10}>
            <Tab.Content>
              {tabArr.map((e,i) => <Tab.Pane key={i} eventKey={`#${e.link}`}>{e.content}</Tab.Pane>)}
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    );
  }
}

export default Dashboard;