import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RefreshIndicator from 'material-ui/RefreshIndicator';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';

export default class DetailForHistorySoItemBody extends React.Component {
    constructor(props) {
    super(props);
  }


  componentWillMount() {
    //发送请求数据
    let SONum = this.props.location.pathname.split('/')[3];
    let ItemNum = this.props.location.pathname.split('/')[4]
    this.props.getListSearchSOItemData(SONum,ItemNum);
  }


  render() {

    const listSearchSOItemData = this.props.status.listSearchSOItemData;

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
          <Card>
              <CardHeader
                title="SO+Item"
                subtitle={this.props.location.pathname.split('/')[3] +'+'+ this.props.location.pathname.split('/')[4]}
                actAsExpander={false}
                showExpandableButton={false}
              />
          </Card>
          <Card>
              <CardHeader
                title="PN#"
                subtitle={listSearchSOItemData.MATNR}
                actAsExpander={false}
                showExpandableButton={false}
              />
          </Card>
          <Card>
              <CardHeader
                title="Description"
                subtitle={listSearchSOItemData.MAKTXEN}
                actAsExpander={false}
                showExpandableButton={false}
              />
          </Card>
          <Card>
              <CardHeader
                title="PCS"
                subtitle={listSearchSOItemData.SOQTY}
                actAsExpander={false}
                showExpandableButton={false}
              />
          </Card>
          <Card>
              <CardHeader
                title="Amount"
                subtitle={listSearchSOItemData.NETWR}
                actAsExpander={false}
                showExpandableButton={false}
              />
          </Card>
          <Card>
              <CardHeader
                title="ERT"
                subtitle={listSearchSOItemData.ERDAT}
                actAsExpander={false}
                showExpandableButton={false}
              />
          </Card>
          <Card>
              <CardHeader
                title="ETD"
                subtitle={listSearchSOItemData.EDATU}
                actAsExpander={false}
                showExpandableButton={false}
              />
          </Card>
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