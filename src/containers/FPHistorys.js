import React from 'react';
import 'whatwg-fetch';
import { connect } from 'react-redux';
import FPHeader from '../components/FPHeader';
import FPHistorysBody from '../components/FPHistorysBody';
import { todoStatus,doingStatus,doneStatus } from '../store/actions'

const hisData = (UserID) => {
    return (dispatch,getState) => {	
		let state = getState()
		let status = state.status

		let doing = status.doing
		if(doing){
			return;
		}

		
    let url = "http://jisapp.jhtgroup.com/FinishedProducts/Home/HisSortList?UserID="+ UserID;

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
            let hisdata = json
			status.hisdata = hisdata;			
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
    getHisData:(UserID) => {
    	dispatch(hisData(UserID))
    }
  }
}

const FPHistorysForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(FPHistorysBody);

export default class FPHistorys extends React.Component {
	render(){
		return (            
		  <div>
		  	<FPHeader {...this.props}/>
		  	<div>
		  		<FPHistorysForm {...this.props}/>
		  	</div>
		  </div>
		)	
	}
}

