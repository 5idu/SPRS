import React from 'react';
import 'whatwg-fetch';
import { connect } from 'react-redux';
import Header from '../components/Header';
import DetailForHistorySoItemBody from '../components/DetailForHistorySoItemBody';
import { todoStatus,doingStatus,doneStatus } from '../store/actions'

const listSearchSOItem = (SONum,ItemNum) => {
    return (dispatch,getState) => {	
		let state = getState()
		let status = state.status

		let doing = status.doing
		if(doing){
			return;
		}

		let url = "http://jisapp.jhtgroup.com/AppServer/Home/getDetailForHistorySoItem?SONum="+ SONum +"&ItemNum="+ ItemNum;

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
            let listSearchSOItemData = json
			status.listSearchSOItemData = listSearchSOItemData;			
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
    getListSearchSOItemData:(SONum,ItemNum) => {
    	dispatch(listSearchSOItem(SONum,ItemNum))
    }
  }
}

const MainBody = connect(
  mapStateToProps,
  mapDispatchToProps
)(DetailForHistorySoItemBody);

export default class DetailForHistorySoItem extends React.Component {
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

