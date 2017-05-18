import React from 'react';
import 'whatwg-fetch';
import { connect } from 'react-redux';
import Header from '../components/Header';
import PoPackBody from '../components/PoPackBody';
import { todoStatus,doingStatus,doneStatus } from '../store/actions'

const poPackData = (SONum,ItemsNum,State,packListNo) => {
    return dispatch => {	
		dispatch(todoStatus({
			doing: true,
            poPackdata: []
		}))

        if(typeof(packListNo)!="undefined"){
            let url = "http://jisapp.jhtgroup.com/AppServer/Home/getDatailForSoItemsStaPack?SONum="+ SONum +"&ItemsNum="+ ItemsNum +"&State="+ State +"&packListNo="+ packListNo;
        }else if(typeof(State)!="undefined"){
            let url = "http://jisapp.jhtgroup.com/AppServer/Home/getStateListForSoItemsState?SONum="+ SONum +"&ItemsNum="+ ItemsNum +"&State="+ State;
        }else{
            let url = "http://jisapp.jhtgroup.com/AppServer/Home/getPoItemsType?SONum="+ SONum +"&ItemsNum="+ ItemsNum;
        }

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
				    poPackdata: [] 
			    }))
            }else{
                dispatch(doneStatus({
				    doing: false,
				    poPackdata: data 
			    }))
            }
		}).catch((ex) => {
			dispatch(doneStatus({
				doing: false,
                poPackdata: [] 
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
    getPoPackData:(SONum,ItemsNum,State,packListNo) => {
    	dispatch(poPackData(SONum,ItemsNum,State,packListNo))
    }
  }
}

const MainBody = connect(
  mapStateToProps,
  mapDispatchToProps
)(PoPackBody);

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

