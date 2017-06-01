import React from 'react';
import 'whatwg-fetch';
import { connect } from 'react-redux';
import Header from '../components/Header';
import ListForMatnrBody from '../components/ListForMatnrBody';
import { todoStatus,doingStatus,doneStatus } from '../store/actions'

const listForMatnr = (UserID,Matnr) => {
    return dispatch => {	
		dispatch(todoStatus({
			doing: true,
            listForMatnrData: []
		}))

		let url = "http://jisapp.jhtgroup.com/AppServer/Home/getSoItemsListForMatnr?UserID="+ UserID +"&Matnr="+ Matnr;

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
				    listForMatnrData: [] 
			    }))
            }else{
                dispatch(doneStatus({
				    doing: false,
				    listForMatnrData: data 
			    }))
    	    }
		}).catch((ex) => {
			dispatch(doneStatus({
				doing: false,
                listForMatnrData: [] 
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
    getListForMatnrData:(UserID,Matnr) => {
    	dispatch(listForMatnr(UserID,Matnr))
    }
  }
}

const MainBody = connect(
  mapStateToProps,
  mapDispatchToProps
)(ListForMatnrBody);

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

