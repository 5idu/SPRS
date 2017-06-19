import React from 'react';
import 'whatwg-fetch';
import { connect } from 'react-redux';
import Header from '../components/Header';
import PoDetailBody from '../components/PoDetailBody';
import { todoStatus,doingStatus,doneStatus } from '../store/actions'

const poDetailData = (UserID,SoNum,State) => {
    return (dispatch,getState) => {	
		let state = getState()
		let status = state.status

		let doing = status.doing
		if(doing){
			return;
		}

		let url = "http://jisapp.jhtgroup.com/AppServer/Home/PoSearch?UserID="+ UserID +"&SoNum="+ SoNum +"&State="+ State;

		status.doing = true
		status.done = false
		dispatch(todoStatus(status))

		return fetch(url, {
		  method: 'GET',
		  headers: {
			'Content-Type': 'application/json'
		  }
		}).then(response => {
			return response.json()
		}).then(json => {
            let poDetaildata = json
			status.poDetaildata = poDetaildata;			
			status.doing = false
			status.done = true
			dispatch(doneStatus(status))		
		}).catch((ex) => {
			status.error = "Something mistake :" + ex;
			status.doing = false
			status.done = true
			dispatch(doneStatus(status))
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
    getPoDetailData:(UserID,SoNum,State) => {
    	dispatch(poDetailData(UserID,SoNum,State))
    }
  }
}

const PoDetailForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(PoDetailBody);

export default class PoDetail extends React.Component {
	render(){
		return (
		  <div>
		  	<Header {...this.props}/>
		  	<div className="main">
		  		<PoDetailForm {...this.props}/>
		  	</div>
		  </div>
		)	
	}
}

