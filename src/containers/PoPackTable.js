import React from 'react';
import 'whatwg-fetch';
import { connect } from 'react-redux';
import Header from '../components/Header';
import PoPackTableBody from '../components/PoPackTableBody';
import { todoStatus,doingStatus,doneStatus } from '../store/actions'

const poPackTableData = (SONum,ItemsNum,State) => {
    return dispatch => {	
		dispatch(todoStatus({
			doing: true,
      poPackTabledata: []
		}))
		
		let url = "http://jisapp.jhtgroup.com/AppServer/Home/getStateListForSoItemsState?SONum="+ SONum +"&ItemsNum="+ ItemsNum +"&State="+ State;
        
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
				poPackTabledata: data 
			}))
            
		}).catch((ex) => {
			dispatch(doneStatus({
				doing: false,
        poPackTabledata: [] 
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
    getPoPackTableData:(SONum,ItemsNum,State) => {
    	dispatch(poPackTableData(SONum,ItemsNum,State))
    }
  }
}

const MainBody = connect(
  mapStateToProps,
  mapDispatchToProps
)(PoPackTableBody);

export default class PoPackTable extends React.Component {
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

