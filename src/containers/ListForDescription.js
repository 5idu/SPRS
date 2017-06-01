import React from 'react';
import 'whatwg-fetch';
import { connect } from 'react-redux';
import Header from '../components/Header';
import ListForDescriptionBody from '../components/ListForDescriptionBody';
import { todoStatus,doingStatus,doneStatus } from '../store/actions'

const listForDesc = (UserID,Matnr) => {
    return dispatch => {	
		dispatch(todoStatus({
			doing: true,
            listForDescData: []
		}))

		let url = "http://jisapp.jhtgroup.com/AppServer/Home/MatnrSearch?UserID="+ UserID +"&Matnr="+ Matnr;

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
				    listForDescData: [] 
			    }))
            }else{
                dispatch(doneStatus({
				    doing: false,
				    listForDescData: data 
			    }))
    	    }
		}).catch((ex) => {
			dispatch(doneStatus({
				doing: false,
                listForDescData: [] 
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
    getListForDescData:(UserID,Matnr) => {
    	dispatch(listForDesc(UserID,Matnr))
    }
  }
}

const MainBody = connect(
  mapStateToProps,
  mapDispatchToProps
)(ListForDescriptionBody);

export default class ListForDescription extends React.Component {
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

