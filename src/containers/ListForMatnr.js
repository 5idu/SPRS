import React from 'react';
import 'whatwg-fetch';
import { connect } from 'react-redux';
import Header from '../components/Header';
import ListForMatnrBody from '../components/ListForMatnrBody';
import { todoStatus,doingStatus,doneStatus } from '../store/actions'

const listForMatnr = (UserID,Matnr) => {
    return (dispatch,getState) => {	
		let state = getState()
		let status = state.status

		let doing = status.doing
		if(doing){
			return;
		}

		let url = "http://jisapp.jhtgroup.com/AppServer/Home/getSoItemsListForMatnr?UserID="+ UserID +"&Matnr="+ Matnr;

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

const ListForMatnrForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(ListForMatnrBody);

export default class ListForMatnr extends React.Component {
	render(){
		return (
		  <div>
		  	<Header {...this.props}/>
		  	<div className="main">
		  		<ListForMatnrForm {...this.props}/>
		  	</div>
		  </div>
		)	
	}
}

