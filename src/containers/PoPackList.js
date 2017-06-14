import React from 'react';
import 'whatwg-fetch';
import { connect } from 'react-redux';
import Header from '../components/Header';
import PoPackListBody from '../components/PoPackListBody';
import { todoStatus,doingStatus,doneStatus } from '../store/actions'

const poPackListData = (SONum,ItemsNum) => {
    return (dispatch,getState) => {	
		let state = getState()
		let status = state.status

		let doing = status.doing
		if(doing){
			return;
		}

		let url = "http://jisapp.jhtgroup.com/AppServer/Home/getPoItemsType?SONum="+ SONum +"&ItemsNum="+ ItemsNum;

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
      let poPackListData = json
			status.poPackListData = poPackListData;			
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
    getPoPackListData:(SONum,ItemsNum) => {
    	dispatch(poPackListData(SONum,ItemsNum))
    }
  }
}

const MainBody = connect(
  mapStateToProps,
  mapDispatchToProps
)(PoPackListBody);

export default class PoPackList extends React.Component {
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

