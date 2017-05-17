import React from 'react'
import { Redirect } from 'react-router-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RefreshIndicator from 'material-ui/RefreshIndicator';
import Divider from 'material-ui/Divider';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';
import ContentReply from 'material-ui/svg-icons/content/reply';
import SelectField from 'material-ui/SelectField';

export default class HomeBody extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      
    } 
  }

  componentWillMount(){
    //根据用户名查询数据
    // this.props.getDefaultData();
  }

  render(){
    return (
      <MuiThemeProvider>
        <div>
            {this.props.user.loginname}
        </div>
      </MuiThemeProvider>
    )
  }
}

