import React from 'react';
import 'whatwg-fetch';
import { connect } from 'react-redux';
import FPHeader from '../components/FPHeader';
import FPHisPoPackProgressBody from '../components/FPHisPoPackProgressBody';
import { todoStatus,doingStatus,doneStatus } from '../store/actions'

const poHisPackProgressData = (SONum,ItemsNum,State) => {
   return (dispatch,getState) => {	
		let state = getState()
		let status = state.status

		let doing = status.doing
		if(doing){
			return;
		}

		let url = "http://jisapp.jhtgroup.com/FinishedProducts/Home/getHisDatailForSoItemsStaPack?SONum="+ SONum +"&ItemsNum="+ ItemsNum +"&State="+ State;

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
            let poHisPackProgressdata = json
			status.poHisPackProgressdata = poHisPackProgressdata;			
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
    getHisPoPackProgressData:(SONum,ItemsNum,State) => {
    	dispatch(poHisPackProgressData(SONum,ItemsNum,State))
    }
  }
}

const FPHisPoPackProgressForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(FPHisPoPackProgressBody);

export default class FPHisPoPackProgress extends React.Component {
	render(){
		return (
		  <div>
		  	<FPHeader {...this.props}/>
		  	<div>
		  		<FPHisPoPackProgressForm {...this.props}/>
		  	</div>
		  </div>
		)	
	}
}

