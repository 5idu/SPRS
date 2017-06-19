import React from 'react';
import 'whatwg-fetch';
import { connect } from 'react-redux';
import Header from '../components/Header';
import TrendChartBody from '../components/TrendChartBody';
import { todoStatus,doingStatus,doneStatus } from '../store/actions'

const trendChart = (UserID,Type,BeginTime,OverTime,LiaoNum) => {
    return (dispatch,getState) => {	
		let state = getState()
		let status = state.status

		let doing = status.doing
		if(doing){
			return;
		}

		let url = "http://jisapp.jhtgroup.com/AppServer/Home/HistorySearch?UserID="+ UserID +"&Type="+ Type +"&BeginTime="+ BeginTime +"&OverTime="+ OverTime +"&LiaoNum="+ LiaoNum;
		
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

const TrendChartForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(TrendChartBody);

export default class TrendChart extends React.Component {
	render(){
		return (
		  <div>
		  	<Header {...this.props}/>
		  	<div className="main">
		  		<TrendChartForm {...this.props}/>
		  	</div>
		  </div>
		)	
	}
}

