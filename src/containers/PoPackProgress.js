import React from 'react';
import 'whatwg-fetch';
import { connect } from 'react-redux';
import Header from '../components/Header';
import PoPackProgressBody from '../components/PoPackProgressBody';
import { todoStatus,doingStatus,doneStatus } from '../store/actions'

const poPackProgressData = (SONum,ItemsNum,State,packListNo) => {
   return (dispatch,getState) => {	
		let state = getState()
		let status = state.status

		let doing = status.doing
		if(doing){
			return;
		}

		let url = "http://jisapp.jhtgroup.com/AppServer/Home/getDatailForSoItemsStaPack?SONum="+ SONum +"&ItemsNum="+ ItemsNum +"&State="+ State +"&packListNo="+ packListNo;

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
            let poPackProgressdata = json
			status.poPackProgressdata = poPackProgressdata;			
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
    getPoPackProgressData:(SONum,ItemsNum,State,packListNo) => {
    	dispatch(poPackProgressData(SONum,ItemsNum,State,packListNo))
    }
  }
}

const MainBody = connect(
  mapStateToProps,
  mapDispatchToProps
)(PoPackProgressBody);

export default class PoPackProgress extends React.Component {
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

