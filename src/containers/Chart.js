import React from 'react';
import 'whatwg-fetch';
import { connect } from 'react-redux';
import Header from '../components/Header';
import ChartBody from '../components/ChartBody';
import { todoStatus,doingStatus,doneStatus } from '../store/actions'

const chartData = (UserID) => {
    return dispatch => {	
		dispatch(todoStatus({
			doing: true,
			chartData:[]
		}))

		let url = "http://jisapp.jhtgroup.com/AppServer/Home/Main?UserID="+ UserID;

		return fetch(url, {
		  method: 'GET',
		  headers: {
				'Content-Type': 'application/json'
		  }
		}).then(response => {
			return response.json()
		}).then(data => {
			let arr=[
				{value:0, name:'On Way'},
				{value:0,name:'In Transit at Port'},
				{value:0,name:'Ready for Departure'},
				{value:0,name:'Packed but no Shipping'},
				{value:0,name:'Preparation'}
			]
			arr[0].value=data.State1
			arr[1].value=data.State2
			arr[2].value=data.State3
			arr[3].value=data.State4
			arr[4].value=data.State5
			dispatch(doneStatus({
				doing: false,
				chartData: arr
			}))
		}).catch((ex) => {
			dispatch(doneStatus({
				doing: false,
				chartData:[]
			}))
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
    getChartData:(UserID) => {
    	dispatch(chartData(UserID))
    }
  }
}

const MainBody = connect(
  mapStateToProps,
  mapDispatchToProps
)(ChartBody);

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

