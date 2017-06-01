import React from 'react';
import 'whatwg-fetch';
import { connect } from 'react-redux';
import Header from '../components/Header';
import QueryByPnBody from '../components/QueryByPnBody';
import { todoStatus,doingStatus,doneStatus } from '../store/actions'


const mapStateToProps = (state) => {
  return {
    user: state.user,
    status: state.status
  }
}

const mapDispatchToProps = (dispatch) => {
    return {}
}

const MainBody = connect(
  mapStateToProps,
  mapDispatchToProps
)(QueryByPnBody);

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

