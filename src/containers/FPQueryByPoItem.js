import React from 'react';
import 'whatwg-fetch';
import { connect } from 'react-redux';
import FPHeader from '../components/FPHeader';
import FPQueryByPoItemBody from '../components/FPQueryByPoItemBody';
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

const FPQueryByPoItemForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(FPQueryByPoItemBody);

export default class FPQueryByPoItem extends React.Component {
	render(){
		return (
		  <div>
		  	<FPHeader {...this.props}/>
		  	<div>
		  		<FPQueryByPoItemForm {...this.props}/>
		  	</div>
		  </div>
		)	
	}
}

