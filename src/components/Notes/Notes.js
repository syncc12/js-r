import React from 'react';
import { GlobalContext } from '../../contexts/global-context';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import ajaxPath from '../../helpers/ajax';
import Forms from '../Forms/Forms';
import formatDate from '../../helpers/formatDate';
// import pluralize from 'pluralize'


class Notes extends React.Component {
  static contextType = GlobalContext;

  constructor() {
    super();
    this.state = {
      show: false,
      noteData: []
    }
  }

  filterNotes = (inNotes) => {
    const { tableName, recordID } = this.props;
    const { userID } = this.context;
    // console.log(userID);

    function noteFilter(item) {
      if (item.table_name === tableName && item.record_id === recordID && item.user_id === userID) {
        return true;
      } else {
        return false;
      }
    }

    return inNotes.filter(noteFilter);

  }

  getNotes = () => {
    // const { route } = this.props;
    const route = 'notes';
    axios.get(ajaxPath(route))
    .then((res) => {
      const filteredNotes = this.filterNotes(res.data);
      // console.log('filteredNotes',filteredNotes);
      this.setState({noteData: filteredNotes});
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
    const { show, noteData } = this.state;
    const { tableName, recordID } = this.props;
    // const { route } = this.props;
    const route = 'notes';
    const inputArr = [['Note','note_text','textarea']];
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
            <Forms endpoint={route} inputArr={inputArr} inputPattern={inputPattern} addData={this.addData} note={{tableName:tableName,recordID:recordID}} />
            <br/>
            <Table hover responsive>
              <thead>
                <tr><th><i className="fas fa-hashtag"></i></th><th>Note</th><th>Date</th></tr>
              </thead>
              <tbody>
                {noteData.map((dataTD,index) => <tr key={`tr${index}`}>
                  <td key={`A${index+1}`}>{index+1}</td>
                  <td key={`B${index+1}`}>{dataTD['note_text']}</td>
                  <td key={`C${index+1}`}>{formatDate(dataTD['created_at'])}</td>
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