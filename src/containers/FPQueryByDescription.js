import React from 'react';
import 'whatwg-fetch';
import { connect } from 'react-redux';
import FPHeader from '../components/FPHeader';
import FPQueryByDescriptionBody from '../components/FPQueryByDescriptionBody';
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

const FPQueryByDescriptionForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(FPQueryByDescriptionBody);

export default class FPQueryByDescription extends React.Component {
	render(){
		return (
		  <div>
		  	<FPHeader {...this.props}/>
		  	<div>
		  		<FPQueryByDescriptionForm {...this.props}/>
		  	</div>
		  </div>
		)	
	}
}

