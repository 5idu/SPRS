import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RefreshIndicator from 'material-ui/RefreshIndicator';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

export default class PoListBody extends React.Component {
    constructor(props) {
    super(props);
  }

  componentWillMount() {
    //发送请求数据
    let UserID = this.props.user.loginname;
    let State = this.props.location.pathname.split('/')[2];
    this.props.getPoListData(UserID,State);
  }

  handleRowSelection(rows) {
    let State = this.props.location.pathname.split('/')[2];
    for (let i = 0; i < rows.length; i++) {
        let obj=this.props.status.poListdata[rows[i]]
        this.props.history.push(`/home/${State}/${obj.SO}`);
    }
  }

  render() {

    let poListdata=[];
    if(this.props.status.poListdata){
        poListdata= this.props.status.poListdata
    }
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
      <div style={doing ? style.displayNone:style.displayBlock} >
      <Table onRowSelection={(rows) => this.handleRowSelection(rows)}>
        <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
          <TableRow>
            <TableHeaderColumn>PO</TableHeaderColumn>
            <TableHeaderColumn>ETD</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody displayRowCheckbox={false}>
          {poListdata.map((item,key) =>    
            <TableRow key={key} value={item}>              
              <TableRowColumn>{item.SO}</TableRowColumn>
              <TableRowColumn>{item.EDATU}</TableRowColumn>          
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