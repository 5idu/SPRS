import React from 'react';
import 'whatwg-fetch';
import { connect } from 'react-redux';
import Header from '../components/Header';
import QueryByPoBody from '../components/QueryByPoBody';
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

const QueryByPoForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(QueryByPoBody);

export default class QueryByPo extends React.Component {
	render(){
		return (
		  <div>
		  	<Header {...this.props}/>
		  	<div className="main">
		  		<QueryByPoForm {...this.props}/>
		  	</div>
		  </div>
		)	
	}
}

