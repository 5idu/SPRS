import React from 'react';
import 'whatwg-fetch';
import { connect } from 'react-redux';
import Header from '../components/Header';
import TrendChartBody from '../components/TrendChartBody';
import { todoStatus,doingStatus,doneStatus } from '../store/actions'

const trendChart = (UserID,Type,BeginTime,OverTime,LiaoNum) => {
    return dispatch => {	
		dispatch(todoStatus({
			doing: true,
			trendChartData: {}
		}))

		let url = "http://jisapp.jhtgroup.com/AppServer/Home/HistorySearch?UserID="+ UserID +"&Type="+ Type +"&BeginTime="+ BeginTime +"&OverTime="+ OverTime +"&LiaoNum="+ LiaoNum;

        return fetch(url, {
		  method: 'GET',
		  headers: {
			'Content-Type': 'application/json'
		  }
		}).then(response => {
			return response.json()
		}).then(data => {
			if(data.order == ''){
                dispatch(doneStatus({
				    doing: false,
				    trendChartData: {}
			    }))
            }else{
                dispatch(doneStatus({
				    doing: false,
				    trendChartData: data
			    }))
            }
		}).catch((ex) => {
			dispatch(doneStatus({
				doing: false,
                trendChartData: {}
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
    getTrendChartData:(UserID,Type,BeginTime,OverTime,LiaoNum) => {
    	dispatch(trendChart(UserID,Type,BeginTime,OverTime,LiaoNum))
    }
  }
}

const MainBody = connect(
  mapStateToProps,
  mapDispatchToProps
)(TrendChartBody);

export default class TrendChart extends React.Component {
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

