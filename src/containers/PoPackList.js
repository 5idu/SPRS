import React from 'react';
import 'whatwg-fetch';
import { connect } from 'react-redux';
import Header from '../components/Header';
import PoPackListBody from '../components/PoPackListBody';
import { todoStatus,doingStatus,doneStatus } from '../store/actions'

const poPackListData = (SONum,ItemsNum) => {
    return dispatch => {	
		dispatch(todoStatus({
			doing: true,
      poPackListData: []
		}))
		
		let url = "http://jisapp.jhtgroup.com/AppServer/Home/getPoItemsType?SONum="+ SONum +"&ItemsNum="+ ItemsNum;
        
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
				poPackListData: data 
			}))    
		}).catch((ex) => {
			dispatch(doneStatus({
				doing: false,
        poPackListData: [] 
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
    getPoPackListData:(SONum,ItemsNum) => {
    	dispatch(poPackListData(SONum,ItemsNum))
    }
  }
}

const MainBody = connect(
  mapStateToProps,
  mapDispatchToProps
)(PoPackListBody);

export default class PoList extends React.Component {
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

