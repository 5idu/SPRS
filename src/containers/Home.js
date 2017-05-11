import React from 'react';
import 'whatwg-fetch';
import { connect } from 'react-redux';
import Header from '../components/Header';
import HomeBody from '../components/HomeBody';
import { saveUser,todoStatus,doingStatus,doneStatus } from '../store/actions'

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
)(HomeBody);

export default class Home extends React.Component {
	render(){
		return (
		  <div>
		  	<Header {...this.props}/>
		  	<div className="main">
		  		<MainBody {...this.props} />
		  	</div>
		  </div>
		)	
	}
}

