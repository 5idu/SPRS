import React from 'react';
import 'whatwg-fetch';
import { connect } from 'react-redux';
import Header from '../components/Header';
import HomeBody from '../components/HomeBody';
import { todoStatus,doingStatus,doneStatus } from '../store/actions'

/*
const orderData = (UserID) => {
	return (dispatch,getState) => {	
		let state = getState()
		let status = state.status

		let doing = status.doing
		if(doing){
			return;
		}

	    let url = "http://jisapp.jhtgroup.com/AppServer/Home/Main?UserID="+ UserID;

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
			
			status.data = json
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
*/

const chartBarData = (UserID) => {
    return (dispatch,getState) => {	
		let state = getState()
		let status = state.status

    let url = "http://jisapp.jhtgroup.com/AppServer/Home/getStatisticsForUserID?UserID="+ UserID;

		//获取bar图表数据
		return fetch(url, {
		  	method: 'GET',
		  	headers: {
					'Content-Type': 'application/json'
		 	 }
			}).then(response => {
				return response.json()
			}).then(data => {
          let chartBarData = data
			    status.chartBarData = chartBarData;			
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
    getChartBarData:(UserID) => {
    	dispatch(chartBarData(UserID))
    }
  }
}

const MainBody = connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeBody);

export default class Home extends React.Component {
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

