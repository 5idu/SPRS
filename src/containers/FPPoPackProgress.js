import React from 'react';
import 'whatwg-fetch';
import { connect } from 'react-redux';
import FPHeader from '../components/FPHeader';
import FPPoPackProgressBody from '../components/FPPoPackProgressBody';
import { todoStatus,doingStatus,doneStatus } from '../store/actions'

const poPackProgressData = (SONum,ItemsNum,State) => {
   return (dispatch,getState) => {	
		let state = getState()
		let status = state.status

		let doing = status.doing
		if(doing){
			return;
		}

		let url = "http://jisapp.jhtgroup.com/FinishedProducts/Home/getDatailForSoItemsStaPack?SONum="+ SONum +"&ItemsNum="+ ItemsNum +"&State="+ State;

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
    getPoPackProgressData:(SONum,ItemsNum,State) => {
    	dispatch(poPackProgressData(SONum,ItemsNum,State))
    }
  }
}

const FPPoPackProgressForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(FPPoPackProgressBody);

export default class FPPoPackProgress extends React.Component {
	render(){
		return (
		  <div>
		  	<FPHeader {...this.props}/>
		  	<div>
		  		<FPPoPackProgressForm {...this.props}/>
		  	</div>
		  </div>
		)	
	}
}

