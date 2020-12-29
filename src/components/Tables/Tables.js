import React from 'react';
import Table from 'react-bootstrap/Table';
import Shows from '../Shows/Shows';
import TableRows from '../TableRows/TableRows';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class Tables extends React.Component {

  constructor() {
    super();
    this.state = {
      rowData: []
    };
  }

  headerConvert = (inHeader) => {
    const convertJSON = {
      '#':<FontAwesomeIcon icon={['fad','hashtag']} />,
      'Transfer':<FontAwesomeIcon icon={['fad','exchange-alt']} />,
      'Applied':<FontAwesomeIcon icon={['fad','check-circle']} />,
      'Open':<span className="fa-stack fa-xs"><i className="fas fa-stack-2x fa-spinner"></i><i className="fas fa-stack-1x fa-question question-icon"></i></span>,
      'Website URL':<FontAwesomeIcon icon={['fad','globe']} />,
      'Email Address':<FontAwesomeIcon icon={['fad','envelope']} />,
      'Phone Number':<FontAwesomeIcon icon={['fad','phone']} />
    };

    if (convertJSON.hasOwnProperty(inHeader)) {
      return convertJSON[inHeader];
    } else {
      return inHeader;
    }

  }

  selectedRow = (rowData) => {
    if (this.props.selectedRow !== undefined) {
      this.props.selectedRow(rowData);
    }
  }


  decompileJSON = (inJSON, exclude=[], includeButton=false) => {
    let outArr = [];
    for (var i of Object.entries(inJSON)) {
      if (!exclude.includes(i[0])) outArr.push([i[0],i[1]]);
    }
    if (includeButton === true) {
      outArr.push(['',<Shows />])
    }
    return outArr;
  }

  orderTDs = (inHeaders, inDataJSON) => {

  }

  render() {
    const { headers, dataJSON, currentTable, showData } = this.props;
    const inData = dataJSON !== ' ' ? dataJSON.sort(((a,b) => a.id > b.id)) : [''];

    return (
      <div className="shadow-box">
        <Table hover responsive>
          <thead>
            <tr>
              {headers.map((header,index) => <th key={index}>{this.headerConvert(header[0])}</th>)}
              <th><FontAwesomeIcon icon={['fad','file-edit']} /></th>
              <th><FontAwesomeIcon icon={['fad','info-circle']} /></th>
            </tr>
          </thead>
          <tbody>
            {dataJSON !== ' ' ? inData.map((data,index) => <TableRows key={index} headers={headers} data={data} rowNum={index} currentTable={currentTable} selectedRow={this.selectedRow} showData={showData} />) : <tr><td></td></tr>}
          </tbody>
        </Table>
      </div>
    );
  }
}

export default Tables;