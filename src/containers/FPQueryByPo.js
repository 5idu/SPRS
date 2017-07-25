import React from 'react';
import 'whatwg-fetch';
import { connect } from 'react-redux';
import FPHeader from '../components/FPHeader';
import FPQueryByPoBody from '../components/FPQueryByPoBody';
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

const FPQueryByPoForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(FPQueryByPoBody);

export default class FPQueryByPo extends React.Component {
	render(){
		return (
		  <div>
		  	<FPHeader {...this.props}/>
		  	<div>
		  		<FPQueryByPoForm {...this.props}/>
		  	</div>
		  </div>
		)	
	}
}

