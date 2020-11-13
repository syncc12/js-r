import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

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
    const { data } = this.props;

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
                    {Object.entries(data).map((dataTD,index) => <tr key={`tr${index}`}>
                      <th key={`th${index}`}>{dataTD[0]}</th><td key={`td${index}`}>{dataTD[1]}</td>
                    </tr>)}
                  </tbody>
                </Table>
              </Col>
              <Col md={6}>
                <Row>
                  <Col md={12}>
                    <div>{data['cover_letter_outline'] || data['follow_up_outline']}</div>
                  </Col>
                </Row>
                <Row>
                  <Col md={12}>
                    <div>{data['cover_letter_template'] || data['follow_up_template']}</div>
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