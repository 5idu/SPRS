import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RefreshIndicator from 'material-ui/RefreshIndicator';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

export default class PoPackTableBody extends React.Component {
    constructor(props) {
    super(props);
  }

  componentWillMount() {
    //发送请求数据
    let State = this.props.location.pathname.split('/')[2];
    let SONum = this.props.location.pathname.split('/')[3];
    let ItemsNum = this.props.location.pathname.split('/')[4];
    this.props.getPoPackTableData(SONum,ItemsNum,State);
  }

  handSubtitle(){
      let State = this.props.location.pathname.split('/')[2];
      if(State==='st1'){
          return 'On Way'
      }
      if(State==='st2'){
          return 'In Transit at Port'
      }
      if(State==='st3'){
          return 'Ready for Departure'
      }
      if(State==='st4'){
          return 'Packed but no Shipping'
      }
      if(State==='st5'){
          return 'Preparation'
      }
      if(State==='st6'){
          return 'All Order'
      }
  }

  handleRowSelection(rows) {
    let State = this.props.location.pathname.split('/')[2];
    let SONum = this.props.location.pathname.split('/')[3];
    let ItemsNum = this.props.location.pathname.split('/')[4]
    for (let i = 0; i < rows.length; i++) {
        let obj=this.props.status.poPackTabledata[rows[i]]
        this.props.history.push(`/home/${State}/${SONum}/${ItemsNum}/${obj.PackListNo}`);
    }
  }

  render() {
    
    let poPackTabledata = []
    if(this.props.status.poPackTabledata){
        poPackTabledata = this.props.status.poPackTabledata
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
          <div style={{width:'100%',textAlign:'center'}}>
              {this.handSubtitle()}
          </div>
          <Table>
              <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                  <TableRow>
                      <TableHeaderColumn>PO</TableHeaderColumn>
                      <TableHeaderColumn>Item</TableHeaderColumn>
                  </TableRow>
              </TableHeader>
              <TableBody displayRowCheckbox={false}>
                  <TableRow key={1}>              
                      <TableRowColumn>{this.props.location.pathname.split('/')[3]}</TableRowColumn>
                      <TableRowColumn>{this.props.location.pathname.split('/')[4]}</TableRowColumn>          
                 </TableRow>
              </TableBody>
         </Table>
         <Table onRowSelection={(rows) => this.handleRowSelection(rows)}>
            <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                <TableRow>
                    <TableHeaderColumn>PACKED-UP NO</TableHeaderColumn>
                    <TableHeaderColumn>PCS</TableHeaderColumn>
                </TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox={false}>
                {poPackTabledata.map((item,key) =>    
                    <TableRow key={key} value={item}>              
                        <TableRowColumn>{item.PackListNo}</TableRowColumn>
                        <TableRowColumn>{item.T_QTY}</TableRowColumn>          
                    </TableRow>)}   
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