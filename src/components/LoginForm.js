import React from 'react';
import { Redirect } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import RefreshIndicator from 'material-ui/RefreshIndicator';

export default class LoginForm extends React.Component {
	constructor(props) {
		super(props);
		/*需要给个默认用户吗？*/
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

	goBack = () => {
		let user = this.props.user;
		if(user && Object.keys(user).length > 0){
			let uri = this.props.location.state.fromUri;
			this.props.history.push(uri);
		}
	}
	componentWillMount(){
		this.goBack();
	}

	shouldComponentUpdate(nextProps){
		this.goBack();
		return true;
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
				      hintStyle={{"width":"100%"}}
				      fullWidth={true}
				      style={{textAlign:'center',marginBottom:30}}
				      onChange={this.handleUserNameChange}
				    />
                    <TextField
				      hintText="PassWord"
				      hintStyle={{"width":"100%"}}
				      fullWidth={true}
				      style={{textAlign:'center',marginBottom:30}}
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