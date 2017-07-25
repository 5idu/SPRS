import React from 'react';
import 'whatwg-fetch';
import { connect } from 'react-redux';
import FPHeader from '../components/FPHeader';
import FPHomeBody from '../components/FPHomeBody';
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

const FPHomeForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(FPHomeBody);

export default class FPHome extends React.Component {
	render(){
		return (
		  <div>
		  	<FPHeader {...this.props}/>
		  	<div>
		  		<FPHomeForm {...this.props}/>
		  	</div>
		  </div>
		)	
	}
}

