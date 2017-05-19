import React from 'react';
import 'whatwg-fetch';
import { connect } from 'react-redux';
import Header from '../components/Header';
import PoPackProgressBody from '../components/PoPackProgressBody';
import { todoStatus,doingStatus,doneStatus } from '../store/actions'

const poPackProgressData = (SONum,ItemsNum,State,packListNo) => {
    return dispatch => {	
		dispatch(todoStatus({
			doing: true,
      poPackProgressdata: {}
		}))
  
    let url = "http://jisapp.jhtgroup.com/AppServer/Home/getDatailForSoItemsStaPack?SONum="+ SONum +"&ItemsNum="+ ItemsNum +"&State="+ State +"&packListNo="+ packListNo;

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
				poPackProgressdata: data 
			}))
            
		}).catch((ex) => {
			dispatch(doneStatus({
				doing: false,
        poPackProgressdata: {} 
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
    getPoPackProgressData:(SONum,ItemsNum,State,packListNo) => {
    	dispatch(poPackProgressData(SONum,ItemsNum,State,packListNo))
    }
  }
}

const MainBody = connect(
  mapStateToProps,
  mapDispatchToProps
)(PoPackProgressBody);

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

