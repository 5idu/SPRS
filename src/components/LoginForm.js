import React from 'react';
import { Redirect } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import RefreshIndicator from 'material-ui/RefreshIndicator';

export default class LoginForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
            UserName:'',
            PassWord:''
		};
	}

	handleUserNameChange = (event) => {
	    this.setState({
            UserName:event.target.value
        });
	}

    handlePassWordChange = (event) => {
	    this.setState({
            PassWord:event.target.value
        });
	}

	login = () => {
		let UserName = this.state.UserName,
            PassWord = this.state.PassWord;
		this.props.login(UserName,PassWord);
	}

	goTo = () => {
		let user = this.props.user;
		if(user && Object.keys(user).length > 0){
			this.props.history.push('/home');
		}
	}
	
	// componentWillMount(){ 
	// 	this.goTo();
	// }

	componentWillUpdate(nextProps){
    	let user = nextProps.user; //注意：user使用this.props.user时取不到数据
    	if(user && Object.keys(user).length > 0){
			this.props.history.push('/home')
			return true
    	}
    	return false
  	}

	render(){
		const errorText = this.props.status.error;
		const doing = this.props.status.doing;

		let loadStatus = 'hide';
		if(doing){
			loadStatus = 'loading';
		}
		
		const style = {
		  container: {
		    position: 'relative',
		    textAlign: 'center'
		  },
		  refresh: {
		    display: 'inline-block',
		    position: 'relative',
		  },
		  displayNone: {
		  	display: 'none'
		  },
		  displayBlock: {
		  	display: 'block'
		  }
		};

		return (
		  	<MuiThemeProvider>
			  	<div>
				  	<TextField
				      hintText="UserName"
					  floatingLabelText="UserName"
				      fullWidth={true}
				      style={{marginBottom:30}}
				      onChange={this.handleUserNameChange}
				    />
                    <TextField
				      hintText="PassWord"
					  floatingLabelText="PassWord"
				      fullWidth={true}
				      style={{marginBottom:30}}
				      onChange={this.handlePassWordChange}
				      errorText={errorText}
				    />
				    <div style={doing ? style.displayNone:style.displayBlock} >
				    	<RaisedButton onTouchTap={this.login} label="Login" primary={true} fullWidth={true}  />
				    </div>
			    	<div style={style.container}>
					    <RefreshIndicator
					      size={40}
					      left={0}
					      top={0}
					      status={loadStatus}
					      style={style.refresh}
					    />
					</div>
			    </div>
			    
			</MuiThemeProvider>
		)
	}
}