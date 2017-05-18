import React from 'react';
import 'whatwg-fetch';
import { connect } from 'react-redux';
import Header from '../components/Header';
import PoListBody from '../components/PoListBody';
import { todoStatus,doingStatus,doneStatus } from '../store/actions'

const poListData = (UserID,State) => {
    return dispatch => {	
		dispatch(todoStatus({
			doing: true,
            poListdata: []
		}))

		let url = "http://jisapp.jhtgroup.com/AppServer/Home/SortList?UserID="+ UserID +"&State="+ State;

		return fetch(url, {
		  method: 'GET',
		  headers: {
				'Content-Type': 'application/json'
		  }
		}).then(response => {
			return response.json()
		}).then(data => {
			if(data == null||data == ''){
                dispatch(doneStatus({
				    doing: false,
				    poListdata: [] 
			    }))
            }else{
                dispatch(doneStatus({
				    doing: false,
				    poListdata: data 
			    }))
            }
		}).catch((ex) => {
			dispatch(doneStatus({
				doing: false,
                poListdata: [] 
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
    getPoListData:(UserID,State) => {
    	dispatch(poListData(UserID,State))
    }
  }
}

const MainBody = connect(
  mapStateToProps,
  mapDispatchToProps
)(PoListBody);

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

