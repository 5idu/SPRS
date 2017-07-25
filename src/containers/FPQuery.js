import React from 'react';
import 'whatwg-fetch';
import { connect } from 'react-redux';
import FPHeader from '../components/FPHeader';
import FPQueryBody from '../components/FPQueryBody';
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

const FPQueryForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(FPQueryBody);

export default class FPQuery extends React.Component {
	render(){
		return (
		  <div>
		  	<FPHeader {...this.props}/>
		  	<div>
		  		<FPQueryForm {...this.props}/>
		  	</div>
		  </div>
		)	
	}
}

