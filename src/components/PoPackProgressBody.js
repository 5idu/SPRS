import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RefreshIndicator from 'material-ui/RefreshIndicator';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import {Step,Stepper,StepLabel,StepContent} from 'material-ui/Stepper';

export default class PoPackProgressBody extends React.Component {
    constructor(props) {
    super(props);
  }


  componentWillMount() {
    //发送请求数据
    let State = this.props.location.pathname.split('/')[2];
    let SONum = this.props.location.pathname.split('/')[3];
    let ItemsNum = this.props.location.pathname.split('/')[4]
    let packListNo = this.props.location.pathname.split('/')[5]
    if(this.props.location.pathname.split('/')[1]==='home' && this.props.location.pathname.split('/')[2]==='st5'){
        this.props.getPoPackProgressData(SONum,ItemsNum,State,0);
    }else if(this.props.location.pathname.split('/')[1]==='home' && this.props.location.pathname.split('/')[2]==='st6'){
        this.props.getPoPackProgressData(SONum,ItemsNum,5,'Packaging');
    }else{
        this.props.getPoPackProgressData(SONum,ItemsNum,State,packListNo);
    }
  }


  render() {
    
    let poPackProgressdata= [],transport= [];
    if(this.props.status.poPackProgressdata){
        poPackProgressdata = this.props.status.poPackProgressdata;
        transport = poPackProgressdata.transport.map((item,key)=>{
            item.Title=item.Title.replace('</br><p style=\"color:blue\">','')
            item.Title=item.Title.replace('</p>','')
            return item
        })
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
          <Card>
              <CardHeader
                title="SO+Item"
                subtitle={poPackProgressdata.SONum +'+'+ poPackProgressdata.ItemsNum}
                actAsExpander={false}
                showExpandableButton={false}
              />
          </Card>
          <Card>
              <CardHeader
                title="PN#"
                subtitle={poPackProgressdata.LiaoNum}
                actAsExpander={false}
                showExpandableButton={false}
              />
          </Card>
          <Card>
              <CardHeader
                title="Description"
                subtitle={poPackProgressdata.PinName}
                actAsExpander={false}
                showExpandableButton={false}
              />
          </Card>
          <Card>
              <CardHeader
                title="PCS"
                subtitle={poPackProgressdata.PCSNum}
                actAsExpander={false}
                showExpandableButton={false}
              />
          </Card>
          <Card>
              <CardHeader
                title="Status"
                subtitle={poPackProgressdata.State}
                actAsExpander={false}
                showExpandableButton={false}
              />
          </Card>
          <div style={{maxWidth: 400, maxHeight: 400, margin: 'auto'}}>
        <Stepper orientation="vertical">
            {transport.map((item,key) =>
                <Step key={key}>
                    <StepLabel active={true} icon={key + 1}>{item.Title}</StepLabel>
                    <StepContent active={true}>
                        <p>
                            {item.Time}
                        </p>
                    </StepContent>
                </Step>
            )}
          
        </Stepper>
      </div>
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