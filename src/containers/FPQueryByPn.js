import React from 'react';
import 'whatwg-fetch';
import { connect } from 'react-redux';
import FPHeader from '../components/FPHeader';
import FPQueryByPnBody from '../components/FPQueryByPnBody';
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

const FPQueryByPnForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(FPQueryByPnBody);

export default class FPQueryByPn extends React.Component {
	render(){
		return (
		  <div>
		  	<FPHeader {...this.props}/>
		  	<div>
		  		<FPQueryByPnForm {...this.props}/>
		  	</div>
		  </div>
		)	
	}
}

