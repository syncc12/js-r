import React from 'react';
import axios from 'axios';
import ajaxPath from '../../helpers/ajax';
import { cloneJSON } from '../../helpers/f';
import Shows from '../Shows/Shows';
import Notes from '../Notes/Notes';
import pluralize from 'pluralize'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function TableCell(props) {
  const { cellIndex, header, data, applied, transfered, currentTable, considering, openEvent, appliedEvent, transferEvent } = props;

  return (
    <td>
      {
        header[1] === 'consideration_status' ? <input type="checkbox" id={`open-checkbox-${cellIndex}`} className="form-checkbox" onChange={(e) => openEvent(e)} checked={considering} />
        : header[1] === 'applied' ? <input type="checkbox" id={`applied-checkbox-${cellIndex}`} className="form-checkbox" onChange={(e) => appliedEvent(e)} checked={applied} />
        : header[1] === 'transfered' && applied === true && transfered === false && currentTable === 'listings' ? <FontAwesomeIcon icon={['fas','check-circle']} onClick={(e) => transferEvent(e)} />
        : header[1] === 'transfered' && applied === true && transfered === true && currentTable === 'listings' ? <FontAwesomeIcon icon={['far','check-circle']} />
        : header[1] === 'phone_number' ? (data[header[1]] && data[header[1]] !== "") ? <a href={`tel:+1${data[header[1]]}`}><FontAwesomeIcon icon={['fad','phone']} /></a> : ""
        : header[1] === 'email' ? (data[header[1]] && data[header[1]] !== "") ? <a href={`mailto:${data[header[1]].replace('mailto:','')}`}><FontAwesomeIcon icon={['fad','envelope']} /></a> : ""
        : header[1] === 'website_url' ? (data[header[1]] && data[header[1]] !== "") ? <a href={data[header[1]]} target="_blank" rel="noreferrer"><FontAwesomeIcon icon={['fad','globe']} /></a> : ""
        : data[header[1]]
      }
    </td>
  );
}

class TableRows extends React.Component {

  constructor() {
    super();
    this.state = {
      considering: true,
      applied: false,
      transfered: false
    }
  }

  prepareData = (inJSON) => {
    let clonedJSON = cloneJSON(inJSON);
    delete clonedJSON['id'];
    delete clonedJSON['created_at'];
    delete clonedJSON['updated_at'];
    delete clonedJSON['cover_letter_outline'];
    delete clonedJSON['cover_letter_template'];
    return clonedJSON;
  }

  transferRecord = (postJSON,e) => {
    axios.post(ajaxPath('jobs'), postJSON)
    .then(() => {
      this.props.addData();
    })
    .catch((err) => console.log(err.response.data));
    e.preventDefault();
  }

  updateRecord = (e, putJSON) => {
    const recordID = this.props.data['id'];
    axios.put(ajaxPath(`listings/${recordID}`), putJSON)
    .catch((err) => console.log(err.response.data));
    e.preventDefault();
  }

  appliedEvent = (e) => {
    const recordID = this.props.data['id'];
    const newRecordState = !this.state.applied;
    const putJSON = {applied: newRecordState};

    axios.put(ajaxPath(`listings/${recordID}`), putJSON)
    .then(() => {
      this.setState({applied: newRecordState});
    })
    .catch((err) => console.log(err.response.data));
    e.preventDefault();
  }

  openEvent = (e) => {
    const recordID = this.props.data['id'];
    const newRecordState = !this.state.considering;
    const putJSON = {consideration_status: newRecordState}

    axios.put(ajaxPath(`listings/${recordID}`), putJSON)
    .then(() => {
      this.setState({considering: newRecordState});
    })
    .catch((err) => console.log(err.response.data));
    e.preventDefault();
  }

  transferEvent = (e) => {
    let postJSON = this.props.data;
    postJSON = this.prepareData(postJSON);
    postJSON['transfer_status'] = true;
    postJSON['applied'] = true;
    postJSON['consideration_status'] = true;
    console.log(postJSON);
    axios.post(ajaxPath('jobs'), postJSON)
    .then((res) => {
      this.setState({transfered: true});
      axios.put(ajaxPath(`listings/${this.props.data['id']}`),{transfer_status: true})
      .catch((err) => console.log(err.response.data));
    })
    .catch((err) => console.log(err.response.data));
    e.preventDefault();
    
  }

  selectedRow = (rowData) => {
    this.props.selectedRow(rowData);
  }

  componentDidMount() {
    this.setState({
      considering: this.props.data['consideration_status'],
      applied: this.props.data['applied'],
      transfered: this.props.data['transfer_status']
    });
  }

  render() {
    const { considering, applied, transfered } = this.state;
    const { headers, data, currentTable, showData } = this.props;

    // const transfered = data['job_id'] ? true : false;
    // console.log(data['id'],data['job_id'],transfered,applied);
    // console.log(data);

    return (
      <tr onClick={(() => this.selectedRow(data))}>
        {headers.map((header,index) => <TableCell key={index} cellIndex={index} header={header} data={data} applied={applied} transfered={transfered} currentTable={currentTable} considering={considering} openEvent={this.openEvent} appliedEvent={this.appliedEvent} transferEvent={this.transferEvent} />)}
        <td><Notes tableName={currentTable} recordID={data['id']} route={`${currentTable}/${data['id']}/${pluralize(currentTable,1)}_notes`} /></td><td><Shows data={data} currentTable={currentTable} template={showData} /></td>
      </tr>
    );
  }
}

export default TableRows;