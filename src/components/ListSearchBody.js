import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RefreshIndicator from 'material-ui/RefreshIndicator';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

export default class ListSearchBody extends React.Component {
    constructor(props) {
    super(props);
  }


  componentWillMount() {
    //发送请求数据
    let UserID = this.props.user.loginname;
    let Type = this.props.location.pathname.split('/')[3];
    let BeginTime = this.props.location.pathname.split('/')[4];
    let OverTime = this.props.location.pathname.split('/')[5];
    let LiaoNum = this.props.location.pathname.split('/')[6];
    this.props.getListSearchData(UserID,Type,BeginTime,OverTime,LiaoNum);
  }

  handleRowSelection(rows) {
    for (let i = 0; i < rows.length; i++) {
        let obj=this.props.status.listSearchData[rows[i]]
        this.props.history.push(`/historys/listSearch/${obj.SONum}/${obj.ItemsNum}`);
    }
  }

  render() {
  
    let listSearchData = []
    if(this.props.status.listSearchData){
        listSearchData = this.props.status.listSearchData
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
            <TableHeaderColumn>Items</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody displayRowCheckbox={false}>
          {listSearchData.map((item,key) =>    
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