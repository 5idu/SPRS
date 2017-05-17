import React from 'react';
import { connect } from 'react-redux';
import 'whatwg-fetch';
import Header from '../components/Header';
import LoginForm from '../components/LoginForm';
import { saveUser,todoStatus,doingStatus,doneStatus } from '../store/actions';

const getUser = (UserName,PassWord) => {
	return dispatch => {	
		dispatch(todoStatus({
			error: '',
			doing: true
		}))

		if(UserName.length <= 0){
		  return dispatch(doneStatus({
				error:"UserName can't be empty",
				doing : false
			}));
		}
		
		if(PassWord.length <= 0){
			return dispatch(doneStatus({
				error:"PassWord can't be empty",
				doing : false
			}));
		}

		let url = "http://jisapp.jhtgroup.com/AppServer/Home/Login?UserName="+ UserName +"&PassWord="+ PassWord;

		return fetch(url, {
		  method: 'GET',
		  headers: {
				'Content-Type': 'application/json'
		  }
		}).then(response => {
			return response.json()
		}).then(data => {
			if(data.State == '1'){
				let user = {
		            loginname: UserName     
		        };
		        dispatch(saveUser(user));
		        dispatch(doneStatus({
							error: '',
							doing: false
						}))
			}else{
				dispatch(doneStatus({
					error: "UserName or PassWord is not right",
					doing: false
				}))
			}
		}).catch((ex) => {
			dispatch(doneStatus({
				error: "Something mistake :" + ex,
				doing: false
			}))
		})
	}
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    status: state.status
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    login: (UserName,PassWord) => {
		dispatch(getUser(UserName,PassWord))
    }
  }
}

const UserLogin = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginForm)


export default class Login extends React.Component {
	render(){
		return (
		  <div>
		  	<Header {...this.props}/>
		  	<div className="main">
		  		<UserLogin {...this.props}/>
		  	</div>
		  </div>
		)
	}
}