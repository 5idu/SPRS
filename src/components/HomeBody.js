import React from 'react'
import ReactDom, { unstable_batchedUpdates } from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RefreshIndicator from 'material-ui/RefreshIndicator';
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import Chip from 'material-ui/Chip';

export default class HomeBody extends React.Component {
  constructor(props) {
    super(props);
  }

  getStateTable(args) {
    if (args === 'po') {
      this
        .props
        .history
        .push('/home/st6');
      return;
    }
    if (args === 'onWay') {
      this
        .props
        .history
        .push('/home/st1');
      return;
    }
    if (args === 'in') {
      this
        .props
        .history
        .push('/home/st2');
      return;
    }
    if (args === 'ready') {
      this
        .props
        .history
        .push('/home/st3');
      return;
    }
    if (args === 'packed') {
      this
        .props
        .history
        .push('/home/st4');
      return;
    }
    if (args === 'preparation') {
      this
        .props
        .history
        .push('/home/st5');
      return;
    }
  }

  componentWillMount() {
    const UserID = this.props.user.loginname
    this.props.getChartBarData(UserID);
  }

//   componentWillReceiveProps(nextProps){
//     if(nextProps.status.data){
//         this.setState({
//             PoSum: nextProps.status.data.PoSum,
//             SoSum: nextProps.status.data.SoSum,
//             PcsSum: nextProps.status.data.PcsSum,
//             State1: nextProps.status.data.State1,
//             State2: nextProps.status.data.State2,
//             State3: nextProps.status.data.State3,
//             State4: nextProps.status.data.State4,
//             State5: nextProps.status.data.State5
//         })
//     }
      
//   }

//   shouldComponentUpdate(nextProps,nextState){

//       //return nextState.PoSum === this.state.PoSum 
//       return nextProps.status.data!==this.props.status.data
//   }

  render() {
    //数量样式开始
    const styles = {
      po: {
        width: 'auto',
        height: 'auto',
        backgroundColor: '#8C8465'
      },
      items: {
        width: 'auto',
        height: 'auto',
        backgroundColor: '#8C8465'
      },
      quantity: {
        width: 'auto',
        height: 'auto',
        backgroundColor: '#8C8465'
      },
      onWay: {
        width: 'auto',
        height: 'auto',
        backgroundColor: '#4CD664'
      }, in: {
        width: 'auto',
        height: 'auto',
        backgroundColor: '#0475F1'
      },
      ready: {
        width: 'auto',
        height: 'auto',
        backgroundColor: '#EAAE51'
      },
      packed: {
        width: 'auto',
        height: 'auto',
        backgroundColor: '#866BEA'
      },
      preparation: {
        width: 'auto',
        height: 'auto',
        backgroundColor: '#DC5446'
      }
    };
    const icon = {
      po: (
        <Chip style={styles.po} labelColor={'#FFFFFF'}>{this.props.status.data?this.props.status.data.PoSum:0}</Chip>
      ),
      items: (
        <Chip style={styles.items} labelColor={'#FFFFFF'}>{this.props.status.data?this.props.status.data.SoSum:0}</Chip>
      ),
      quantity: (
        <Chip style={styles.quantity} labelColor={'#FFFFFF'}>{this.props.status.data?this.props.status.data.PcsSum:0}</Chip>
      ),
      onWay: (
        <Chip style={styles.onWay} labelColor={'#FFFFFF'}>{this.props.status.data?this.props.status.data.State1:0}</Chip>
      ), in: (
        <Chip style={styles. in} labelColor={'#FFFFFF'}>{this.props.status.data?this.props.status.data.State2:0}</Chip>
      ),
      ready: (
        <Chip style={styles.ready} labelColor={'#FFFFFF'}>{this.props.status.data?this.props.status.data.State3:0}</Chip>
      ),
      packed: (
        <Chip style={styles.packed} labelColor={'#FFFFFF'}>{this.props.status.data?this.props.status.data.State4:0}</Chip>
      ),
      preparation: (
        <Chip style={styles.preparation} labelColor={'#FFFFFF'}>{this.props.status.data?this.props.status.data.State5:0}</Chip>
      )
    }
    //数量样式结束 加载框开始
    const doing = this.props.status.doing;
    let loadStatus = 'loading';
    if (!doing) {
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
          <div
            style={doing
            ? style.displayNone
            : style.displayBlock}>
            <List>
              <Subheader style={{
                textAlign: 'center'
              }}>Order Summary</Subheader>
              <ListItem
                primaryText="PO"
                onClick={() => this.getStateTable('po')}
                rightIcon={icon.po}/>
              <ListItem
                primaryText="Items"
                onClick={() => this.getStateTable('po')}
                rightIcon={icon.items}/>
              <ListItem
                primaryText="Quantity"
                onClick={() => this.getStateTable('po')}
                rightIcon={icon.quantity}/>
              <Divider/>
              <Subheader style={{
                textAlign: 'center'
              }}>Order Info List(PCS)</Subheader>
              <ListItem
                primaryText="On Way"
                onClick={() => this.getStateTable('onWay')}
                rightIcon={icon.onWay}/>
              <ListItem
                primaryText="In Transit at Port"
                onClick={() => this.getStateTable('in')}
                rightIcon={icon. in}/>
              <ListItem
                primaryText="Ready for Departure"
                onClick={() => this.getStateTable('ready')}
                rightIcon={icon.ready}/>
              <ListItem
                primaryText="Packed but no Shipping Space Confirmation"
                onClick={() => this.getStateTable('packed')}
                rightIcon={icon.packed}/>
              <ListItem
                primaryText="Preparation"
                onClick={() => this.getStateTable('preparation')}
                rightIcon={icon.preparation}/>
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
    )
  }
}

