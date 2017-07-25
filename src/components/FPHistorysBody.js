import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RefreshIndicator from 'material-ui/RefreshIndicator';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

export default class FPHistorysBody extends React.Component {
    constructor(props) {
    super(props);
  }

  componentWillMount() {
    //发送请求数据
    let UserID = this.props.user.loginname;
    this.props.getHisData(UserID);
  }

  handleRowSelection(rows) {
    for (let i = 0; i < rows.length; i++) {
        let obj=this.props.status.hisdata[rows[i]]
        this.props.history.push(`/fphistorys/${obj.STA}/${obj.SO}`);
    }
    return;
  }

  render() {

    let hisdata=[];
    if(this.props.status.hisdata){
        hisdata= this.props.status.hisdata
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
            <TableHeaderColumn>EXW</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody displayRowCheckbox={false}>
          {hisdata.map((item,key) =>    
            <TableRow key={key} value={item}>              
              <TableRowColumn style={{width:'100%',paddingRight:'5px',paddingLeft:'10px'}}>{item.SO}</TableRowColumn>
              <TableRowColumn style={{width:'100%',paddingRight:'5px'}}>{item.EDATU}</TableRowColumn>  
              <TableRowColumn style={{width:'100%',paddingRight:'10px'}}>{item.ZETDS2}</TableRowColumn>                 
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