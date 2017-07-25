import React from 'react';
import 'whatwg-fetch';
import { connect } from 'react-redux';
import FPHeader from '../components/FPHeader';
import FPListForMatnrBody from '../components/FPListForMatnrBody';
import { todoStatus,doingStatus,doneStatus } from '../store/actions'

const listForMatnr = (UserID,Matnr) => {
    return (dispatch,getState) => {	
		let state = getState()
		let status = state.status

		let doing = status.doing
		if(doing){
			return;
		}

		let url = "http://jisapp.jhtgroup.com/FinishedProducts/Home/getSoItemsListForMatnr?UserID="+ UserID +"&Matnr="+ Matnr;

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
      let listForMatnrData = json
			status.listForMatnrData = listForMatnrData;			
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
    getListForMatnrData:(UserID,Matnr) => {
    	dispatch(listForMatnr(UserID,Matnr))
    }
  }
}

const FPListForMatnrForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(FPListForMatnrBody);

export default class FPListForMatnr extends React.Component {
	render(){
		return (
		  <div>
		  	<FPHeader {...this.props}/>
		  	<div>
		  		<FPListForMatnrForm {...this.props}/>
		  	</div>
		  </div>
		)	
	}
}

