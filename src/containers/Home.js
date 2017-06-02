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
			data:{}
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
				data:{}
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

