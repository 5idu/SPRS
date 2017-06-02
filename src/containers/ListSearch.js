import React from 'react';
import 'whatwg-fetch';
import { connect } from 'react-redux';
import Header from '../components/Header';
import ListSearchBody from '../components/ListSearchBody';
import { todoStatus,doingStatus,doneStatus } from '../store/actions'

const listSearch = (UserID,Type,BeginTime,OverTime,LiaoNum) => {
    return dispatch => {	
		dispatch(todoStatus({
			doing: true,
            listSearchData: []
		}))

		let url = "http://jisapp.jhtgroup.com/AppServer/Home/HistorySearch?UserID="+ UserID +"&Type="+ Type +"&BeginTime="+ BeginTime +"&OverTime="+ OverTime +"&LiaoNum="+ LiaoNum;

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
				    listSearchData: [] 
			    }))
            }else{
                dispatch(doneStatus({
				    doing: false,
				    listSearchData: data 
			    }))
    	    }
		}).catch((ex) => {
			dispatch(doneStatus({
				doing: false,
                listSearchData: [] 
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
    getListSearchData:(UserID,Type,BeginTime,OverTime,LiaoNum) => {
    	dispatch(listSearch(UserID,Type,BeginTime,OverTime,LiaoNum))
    }
  }
}

const MainBody = connect(
  mapStateToProps,
  mapDispatchToProps
)(ListSearchBody);

export default class ListSearch extends React.Component {
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

