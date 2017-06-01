import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RefreshIndicator from 'material-ui/RefreshIndicator';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

export default class ListForMatnrBody extends React.Component {
    constructor(props) {
    super(props);
  }


  componentWillMount() {
    //发送请求数据
    let UserID = this.props.user.loginname;
    let Matnr = this.props.location.pathname.split('/')[3];
    this.props.getListForMatnrData(UserID,Matnr);
  }

  handleRowSelection(rows) {
    for (let i = 0; i < rows.length; i++) {
        let obj=this.props.status.listForMatnrData[rows[i]]
        this.props.history.push(`/home/st6/${obj.SONum}/${obj.ItemsNum}`);
    }
  }

  render() {
  
    //加载框开始
    const doing = this.props.status.doing;
		let loadStatus = 'loading';
		if(!doing){
			loadStatus = 'hide';
		}
    const style = {
      container: {
        position: 'relative',
        textAlign: 'center'
      },
      refresh: {
        display: 'inline-block',
        position: 'relative'
      },
      displayNone: {
          display: 'none'
        },
      displayBlock: {
          display: 'block'
        }
    };
    //加载框结束

    return (
    <MuiThemeProvider>
      <div> 
      <div style={{textAlign:"center"}}>PN#:{this.props.location.pathname.split('/')[3]}</div>
      <div style={doing ? style.displayNone:style.displayBlock} >
      <Table onRowSelection={(rows) => this.handleRowSelection(rows)}>
        <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
          <TableRow>
            <TableHeaderColumn>PO</TableHeaderColumn>
            <TableHeaderColumn>Items</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody displayRowCheckbox={false}>
          {this.props.status.listForMatnrData.map((item,key) =>    
            <TableRow key={key} value={item}>              
              <TableRowColumn>{item.SONum}</TableRowColumn>
              <TableRowColumn>{item.ItemsNum}</TableRowColumn>          
            </TableRow>
            )
          }   
        </TableBody>
      </Table>
      </div>
      <div style={style.container}>
            <RefreshIndicator
              size={40}
              left={0}
              top={20}
              status={loadStatus}
              style={style.refresh}/>
      </div>
      </div>
    </MuiThemeProvider>
    );
  }
}