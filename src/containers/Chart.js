import React from 'react';
import 'whatwg-fetch';
import { connect } from 'react-redux';
import Header from '../components/Header';
import ChartBody from '../components/ChartBody';
import { todoStatus,doingStatus,doneStatus } from '../store/actions'

const ChartData = (UserID) => {
    return dispatch => {	
		dispatch(todoStatus({
			doing: true,
			chartData:[{
				"pieChartData":
					[{value:0,name:"On Way"},{value:0,name:'In Transit at Port'},
					{value:0,name:'Ready for Departure'},
					{value:0,name:'Packed but no Shipping'},
					{value:0,name:'Preparation'}],
				"barChartData":[{
					"noX":[],
					"haveX":[]
				}]
			}]
		}))

		let urlPie = "http://jisapp.jhtgroup.com/AppServer/Home/Main?UserID="+ UserID;
		let urlBar = "http://jisapp.jhtgroup.com/AppServer/Home/getStatisticsForUserID?UserID="+ UserID;

		let arr=[{
						"pieChartData":
							[{value:0,name:"On Way"},
							{value:0,name:'In Transit at Port'},
							{value:0,name:'Ready for Departure'},
							{value:0,name:'Packed but no Shipping'},
							{value:0,name:'Preparation'}],
						"barChartData":[{
							"noX":[],
							"haveX":[]
						}]
					}];
		
	//获取pie图表数据
	  fetch(urlPie, {
		  method: 'GET',
		  headers: {
				'Content-Type': 'application/json'
		  }
		}).then(response => {
			return response.json()
		}).then(data => {
			arr[0].pieChartData[0].value=data.State1
			arr[0].pieChartData[1].value=data.State2
			arr[0].pieChartData[2].value=data.State3
			arr[0].pieChartData[3].value=data.State4
			arr[0].pieChartData[4].value=data.State5
			console.log('1');
			//获取bar图表数据
			return fetch(urlBar, {
		  	method: 'GET',
		  	headers: {
					'Content-Type': 'application/json'
		 	 }
			}).then(response => {
				return response.json()
			}).then(data => {
				console.log('2');
					arr[0].barChartData[0].noX.push(data.OnePlus)
					arr[0].barChartData[0].noX.push(data.One)
					arr[0].barChartData[0].noX.push(data.Now)
					arr[0].barChartData[0].noX.push(data.NowPlus)
					arr[0].barChartData[0].noX.push(data.NowPlusPlus)

					arr[0].barChartData[0].haveX.push(data.OnePlusX)
					arr[0].barChartData[0].haveX.push(data.OneX);
					arr[0].barChartData[0].haveX.push(data.NowX);
					arr[0].barChartData[0].haveX.push(data.NowPlusX);
					arr[0].barChartData[0].haveX.push(data.NowPlusPlusX);
					console.log('3');
					console.log(arr);
					dispatch(doneStatus({
						doing: false,
						chartData: arr
					}))
					
			}).catch((ex) => {
				console.log('4');
				console.log(ex);
				dispatch(doneStatus({
				doing: false,
					chartData:[{
						"pieChartData":
							[{value:0,name:"On Way"},{value:0,name:'In Transit at Port'},
							{value:0,name:'Ready for Departure'},
							{value:0,name:'Packed but no Shipping'},
							{value:0,name:'Preparation'}],
						"barChartData":[{
							"noX":[],
							"haveX":[]
						}]
					}]
				}))
			})
		}).catch((ex) => {
			console.log('5');
			dispatch(doneStatus({
				doing: false,
					chartData:[{
						"pieChartData":
							[{value:0,name:"On Way"},{value:0,name:'In Transit at Port'},
							{value:0,name:'Ready for Departure'},
							{value:0,name:'Packed but no Shipping'},
							{value:0,name:'Preparation'}],
						"barChartData":[{
							"noX":[],
							"haveX":[]
						}]
					}]
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
    	dispatch(ChartData(UserID))
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

