import React from 'react';
import 'whatwg-fetch';
import { connect } from 'react-redux';
import FPHeader from '../components/FPHeader';
import FPListForDescriptionBody from '../components/FPListForDescriptionBody';
import { todoStatus,doingStatus,doneStatus } from '../store/actions'

const listForDesc = (UserID,Matnr) => {
    return (dispatch,getState) => {	
		let state = getState()
		let status = state.status

		let doing = status.doing
		if(doing){
			return;
		}

		let url = "http://jisapp.jhtgroup.com/FinishedProducts/Home/MatnrSearch?UserID="+ UserID +"&Matnr="+ Matnr;

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
            let listForDescData = json
			status.listForDescData = listForDescData;			
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
    getListForDescData:(UserID,Matnr) => {
    	dispatch(listForDesc(UserID,Matnr))
    }
  }
}

const FPListForDescriptionForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(FPListForDescriptionBody);

export default class FPListForDescription extends React.Component {
	render(){
		return (
		  <div>
		  	<FPHeader {...this.props}/>
		  	<div>
		  		<FPListForDescriptionForm {...this.props}/>
		  	</div>
		  </div>
		)	
	}
}

