import React from 'react';
import 'whatwg-fetch';
import { connect } from 'react-redux';
import FPHeader from '../components/FPHeader';
import FPHisPoDetailBody from '../components/FPHisPoDetailBody';
import { todoStatus,doingStatus,doneStatus } from '../store/actions'

const poHisDetailData = (UserID,SoNum,State) => {
    return (dispatch,getState) => {	
		let state = getState()
		let status = state.status

		let doing = status.doing
		if(doing){
			return;
		}

		let url = "http://jisapp.jhtgroup.com/FinishedProducts/Home/HisPoSearch?UserID="+ UserID +"&SoNum="+ SoNum +"&State="+ State;

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
            let poHisDetaildata = json
			status.poHisDetaildata = poHisDetaildata;			
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
    getHisPoDetailData:(UserID,SoNum,State) => {
    	dispatch(poHisDetailData(UserID,SoNum,State))
    }
  }
}

const FPHisPoDetailForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(FPHisPoDetailBody);

export default class FPHisPoDetail extends React.Component {
	render(){
		return (
		  <div>
		  	<FPHeader {...this.props}/>
		  	<div>
		  		<FPHisPoDetailForm {...this.props}/>
		  	</div>
		  </div>
		)	
	}
}

