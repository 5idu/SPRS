import React from 'react';
import 'whatwg-fetch';
import { connect } from 'react-redux';
import Header from '../components/Header';
import PoDetailBody from '../components/PoDetailBody';
import { todoStatus,doingStatus,doneStatus } from '../store/actions'

const poDetailData = (UserID,SoNum,State) => {
    return dispatch => {	
		dispatch(todoStatus({
			doing: true,
            poDetaildata: []
		}))

		let url = "http://jisapp.jhtgroup.com/AppServer/Home/PoSearch?UserID="+ UserID +"&SoNum="+ SoNum +"&State="+ State;

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
				    poDetaildata: [] 
			    }))
            }else{
                dispatch(doneStatus({
				    doing: false,
				    poDetaildata: data 
			    }))
            }
		}).catch((ex) => {
			dispatch(doneStatus({
				doing: false,
                poDetaildata: [] 
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
    getPoDetailData:(UserID,SoNum,State) => {
    	dispatch(poDetailData(UserID,SoNum,State))
    }
  }
}

const MainBody = connect(
  mapStateToProps,
  mapDispatchToProps
)(PoDetailBody);

export default class PoDetail extends React.Component {
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

