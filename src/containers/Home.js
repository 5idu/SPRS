import React from 'react';
import 'whatwg-fetch';
import { connect } from 'react-redux';
import Header from '../components/Header';
import HomeBody from '../components/HomeBody';
import { todoStatus,doingStatus,doneStatus } from '../store/actions'

const orderData = (UserID) => {
	return dispatch => {	
		dispatch(todoStatus({
			doing: true,
			data:{
				PoSum: "0",
      	SoSum: "0",
      	PcsSum: "0",
     		State1: "0",
      	State2: "0",
      	State3: "0",
      	State4: "0",
      	State5: "0"
			}
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
			dispatch(doneStatus({
				doing: false,
				data: data
			}))
		}).catch((ex) => {
			dispatch(doneStatus({
				doing: false,
				data:{
					PoSum: "0",
      		SoSum: "0",
      		PcsSum: "0",
     			State1: "0",
      		State2: "0",
      		State3: "0",
      		State4: "0",
      		State5: "0"
				}
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
    getOrderData:(UserID) => {
    	dispatch(orderData(UserID))
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

