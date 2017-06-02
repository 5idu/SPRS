import React from 'react';
import 'whatwg-fetch';
import { connect } from 'react-redux';
import Header from '../components/Header';
import DetailForHistorySoItemBody from '../components/DetailForHistorySoItemBody';
import { todoStatus,doingStatus,doneStatus } from '../store/actions'

const listSearchSOItem = (SONum,ItemNum) => {
    return dispatch => {	
		dispatch(todoStatus({
			doing: true,
            listSearchSOItemData: {}
		}))

		let url = "http://jisapp.jhtgroup.com/AppServer/Home/getDetailForHistorySoItem?SONum="+ SONum +"&ItemNum="+ ItemNum;

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
				listSearchSOItemData: data 
		    }))
		}).catch((ex) => {
			dispatch(doneStatus({
				doing: false,
                listSearchSOItemData: {} 
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

