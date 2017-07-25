import React from 'react';
import { Redirect } from 'react-router-dom';
import {blue500} from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import RefreshIndicator from 'material-ui/RefreshIndicator';
import {Card, CardMedia} from 'material-ui/Card';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton'

export default class LoginBody extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
            UserName:'',
            PassWord:'',
			radioCheck: "radioSP",
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
			if(this.state.radioCheck==='radioSP'){
				//获取数据，传递给子组件,这样子组件就是无状态的
				if(user.loginname){
					this.props.getOrderData(user.loginname,'SP');
				}else{
					this.props.getOrderData(this.state.UserName,'SP');
				}
				this.props.history.push('/home');
			}else{
				if(user.loginname){
					this.props.getOrderData(user.loginname,'FP');
				}else{
					this.props.getOrderData(this.state.UserName,'FP');
				}
				this.props.history.push('/fphome');
			}
			
		}
	}

	 _handleRadioInput = (event, value) => {
        this.setState({radioCheck: value});
    }

	componentWillMount(){
		this.goTo()
	}

	shouldComponentUpdate(nextProps){
		let user = nextProps.user; 
    	if(user && Object.keys(user).length > 0){
			if(this.state.radioCheck==='radioSP'){
				//获取数据，传递给子组件,这样子组件就是无状态的
				if(user.loginname){
					this.props.getOrderData(user.loginname,'SP');
				}else{
					this.props.getOrderData(this.state.UserName,'SP');
				}
				this.props.history.push('/home')
			}else{
				if(user.loginname){
					this.props.getOrderData(user.loginname,'FP');
				}else{
					this.props.getOrderData(this.state.UserName,'FP');
				}
				this.props.history.push('/fphome');
			}
    	}
		return true
	}

	componentWillUnmount() {
		let user = this.props.user; 
		if(user.loginname){
			this.props.getUserInfo(user.loginname)
		}else{
			this.props.getUserInfo(this.state.UserName);
		}
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
		  		display: 'block',
			 	marginTop: 50
		  	},
		  	radioButton: {
                margin: 12
			}
		};

		const muiTheme = getMuiTheme({
            raisedButton:{
                primaryColor: blue500
            },
            textField: {
                focusColor: blue500
            },
			radioButton: {   
                checkedColor: blue500
            }
		});

		return (
		  	<MuiThemeProvider muiTheme={muiTheme}>
			  	<div>
					<Card>
						<CardMedia>
							<img src="dist/images/mainLogobg.jpg"/>
    					</CardMedia>
  					</Card>
				  	<TextField
				      hintText="UserName"
					  floatingLabelText="UserName"
				      fullWidth={true}
					  style={{marginTop:30}}
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
					<div>
                        <RadioButtonGroup
                            name="radioGroup"
                            valueSelected={this.state.radioCheck}
                            ref="radioGroup"
                            onChange={this._handleRadioInput}
							style={{display:'inline-block'}}>
                            <RadioButton 
                                value="radioSP" 
                                label="Service Parts" 
                                style={style.radioButton}/>
                            <RadioButton
                                value="radioFP"
                                label="Products"
                                style={style.radioButton}/>
                        </RadioButtonGroup>
                    </div>	

				    <div style={doing ? style.displayNone:style.displayBlock} >
				    	<RaisedButton onTouchTap={this.login} label="Sign In" primary={true} fullWidth={true}  />
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