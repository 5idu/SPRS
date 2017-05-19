import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RefreshIndicator from 'material-ui/RefreshIndicator';
import {List, ListItem} from 'material-ui/List';
import Chip from 'material-ui/Chip';
import ContentInbox from 'material-ui/svg-icons/content/inbox';

export default class PoPackListBody extends React.Component {
    constructor(props) {
    super(props);
  }

  componentWillMount() {
    //发送请求数据
    let SoNum = this.props.location.pathname.split('/')[3];
    let ItemsNum = this.props.location.pathname.split('/')[4];
    this.props.getPoPackListData(SoNum,ItemsNum);
  }

  handlePrimaryText() {
      let poPackListData = this.props.status.poPackListData
      for(var items in poPackListData){
          if (poPackListData[items].STA == '1') {
              return 'On Way'
          }
          if (poPackListData[items].STA == '2') {
              return 'In Transit at Port'
          }
          if (poPackListData[items].STA == '3') {
              return 'Ready for Departure'
          }
          if (poPackListData[items].STA == '4') {
              return 'Packed but no Shipping Space Confirmation'
          }
          if (poPackListData[items].STA == '5') {
              return 'Preparation'
          }
      }
  }

  handleListItemText(type) {
      let poPackListData = this.props.status.poPackListData
      if(type==='PackListNo'){
          for(var items in poPackListData){
              return poPackListData[items].PackListNo
          }
      }
      if(type==='T_QTY'){
          for(var items in poPackListData){
              return poPackListData[items].T_QTY
          }
      }
  }

  getPoPackProgress() {
      let SoNum = this.props.location.pathname.split('/')[3];
      let ItemsNum = this.props.location.pathname.split('/')[4];
      this.props.history.push(`/home/st6/${SoNum}/${ItemsNum}/Packaging`);
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
      <div style={doing ? style.displayNone:style.displayBlock} >
           <List>
            <ListItem
              primaryText={this.handlePrimaryText()}
              leftIcon={<ContentInbox />}
              initiallyOpen={false}
              primaryTogglesNestedList={true}
              nestedItems={[
                <ListItem
                  key={1}
                  primaryText={this.handleListItemText('PackListNo')}
                  onClick={()=>this.getPoPackProgress()}
                  rightIcon={
                      <Chip 
                        style={{width: 'auto',height: 'auto',backgroundColor: '#DC5446'}} 
                        labelColor={'#FFFFFF'}>
                        {this.handleListItemText('T_QTY')}
                      </Chip>}
                />
              ]}
            />
          </List>
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