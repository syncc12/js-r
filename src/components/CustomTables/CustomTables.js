import React from 'react';
import './CustomTables.scss';
import DynamicTables from '../DynamicTables/DynamicTables';
import TableController from '../TableController/TableController';
import tableDataJSON from '../../JSONs/tableDataJSON';


class CustomTables extends React.Component {

  constructor() {
    super();
    this.state = {
      tableData: ''
    }
  }

  componentDidMount() {
    this.setState({tableData: tableDataJSON});
  }

  render() {
    const { tableData } = this.state;

    return ( 

      <div>
        {
          tableData !== '' && 
          tableData.map((e,i) => {
            return (
              <div key={i}>
                <TableController type="new" tableData={e} />
                <DynamicTables tableData={e} />
              </div>
            )
          })
        }
      </div>
    )
  }
}


export default CustomTables;

