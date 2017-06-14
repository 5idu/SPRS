import React from 'react';
import 'whatwg-fetch';
import { connect } from 'react-redux';
import Header from '../components/Header';
import HistoryBody from '../components/HistoryBody';
import { todoStatus,doingStatus,doneStatus } from '../store/actions'

const trendChart = (UserID,Type,BeginTime,OverTime,LiaoNum) => {
    return (dispatch,getState) => {	
		let state = getState()
		let status = state.status

		let url = "http://jisapp.jhtgroup.com/AppServer/Home/HistorySearch?UserID="+ UserID +"&Type="+ Type +"&BeginTime="+ BeginTime +"&OverTime="+ OverTime +"&LiaoNum="+ LiaoNum;

		return fetch(url, {
		  method: 'GET',
		  headers: {
			'Content-Type': 'application/json'
		  }
		}).then(response => {
			return response.json()
		}).then(json => {
			status.trendChartData = json;			
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
		getTrendChartData:(UserID,Type,BeginTime,OverTime,LiaoNum) => {
    	dispatch(trendChart(UserID,Type,BeginTime,OverTime,LiaoNum))
    }
	}
}

const MainBody = connect(
  mapStateToProps,
  mapDispatchToProps
)(HistoryBody);

export default class History extends React.Component {
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

