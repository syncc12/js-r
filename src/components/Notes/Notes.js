import React from 'react';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import ajaxPath from '../../helpers/ajax';
import Forms from '../Forms/Forms';

class Notes extends React.Component {

  constructor() {
    super();
    this.state = {
      show: false,
      noteData: []
    }
  }

  getNotes = () => {
    const { route } = this.props;
    axios.get(ajaxPath(route))
    .then((res) => {
      this.setState({noteData: res.data});
    })
    .catch((err) => console.log(err));
  }

  addData = () => {
    this.getNotes();
  }

  showModal = () => {
    this.getNotes();
    this.setState({show: true});
  }

  hideModal = () => {
    this.setState({show: false});
  }

  render() {
    const { route } = this.props;
    const { show, noteData } = this.state;
    const inputArr = [['Note','note','textarea']];
    const inputPattern = [['12']];


    return (
      <>
        <Button variant="primary" size="sm" onClick={() => this.showModal()} block>
          Notes
        </Button>
        
        <Modal show={show} dialogClassName="custom-modal-size" onHide={() => this.hideModal()}>
          <Modal.Header closeButton>
            <Modal.Title id="shows-modal_title">{''}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Forms endpoint={route} inputArr={inputArr} inputPattern={inputPattern} addData={this.addData} />
            <br/>
            <Table hover responsive>
              <thead>
                <tr><th><i className="fas fa-hashtag"></i></th><th>Note</th><th>Date</th></tr>
              </thead>
              <tbody>
                {noteData.map((dataTD,index) => <tr key={`tr${index}`}>
                  <td key={`A${index+1}`}>{index+1}</td>
                  <td key={`B${index+1}`}>{dataTD['note']}</td>
                  <td key={`C${index+1}`}>{dataTD['created_at']}</td>
                </tr>)}
              </tbody>
            </Table>
          </Modal.Body>
        </Modal>
      </>
    );
  }
}

export default Notes;