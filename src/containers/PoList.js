import React from 'react';
import 'whatwg-fetch';
import { connect } from 'react-redux';
import Header from '../components/Header';
import PoListBody from '../components/PoListBody';
import { todoStatus,doingStatus,doneStatus } from '../store/actions'

const poListData = (UserID,State) => {
    return (dispatch,getState) => {	
		let state = getState()
		let status = state.status

		let doing = status.doing
		if(doing){
			return;
		}

		let url = "http://jisapp.jhtgroup.com/AppServer/Home/SortList?UserID="+ UserID +"&State="+ State;

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
            let poListdata = json
			status.poListdata = poListdata;			
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
    getPoListData:(UserID,State) => {
    	dispatch(poListData(UserID,State))
    }
  }
}

const MainBody = connect(
  mapStateToProps,
  mapDispatchToProps
)(PoListBody);

export default class PoList extends React.Component {
	render(){
		return (            
		  <div>
		  	<Header {...this.props}/>
		  	<div className="main">
		  		<MainBody {...this.props}/>
		  	</div>
		  </div>
		)	
	}
}

