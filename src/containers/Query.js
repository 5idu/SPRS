import React from 'react';
import 'whatwg-fetch';
import { connect } from 'react-redux';
import Header from '../components/Header';
import QueryBody from '../components/QueryBody';
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

const QueryForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(QueryBody);

export default class Query extends React.Component {
	render(){
		return (
		  <div>
		  	<Header {...this.props}/>
		  	<div className="main">
		  		<QueryForm {...this.props}/>
		  	</div>
		  </div>
		)	
	}
}

