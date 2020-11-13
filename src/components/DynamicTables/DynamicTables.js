import React from 'react';
import './DynamicTables.scss';
import Table from 'react-bootstrap/Table';


class DynamicTables extends React.Component {

  render() {
    const { tableData } = this.props;

    return ( 

      <div>
        <h2 className="table-title">{tableData.title}</h2>
        <Table responsive>
          <thead>
            <tr>
              {tableData.columns.map((e,i) => <th key={`HeaderColumn${i}`}>{e.name}</th>)}
            </tr>
          </thead>
          <tbody>
            {tableData.rows.map((e,i) => {
              return(
                <tr key={`BodyRow${i}`}>
                  {e.datas.map((ee,ii) => <td key={`BodyRow${i}Column${ii}`}>{ee.data}</td>)}
                </tr>
              )
            })}
          </tbody>
        </Table>
      </div>
    )
  }
}


export default DynamicTables;