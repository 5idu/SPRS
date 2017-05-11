import React from 'react';
import 'whatwg-fetch'
import Header from '../components/Header'
import { connect } from 'react-redux'
import { saveUser,todoStatus,doingStatus,doneStatus } from '../store/actions'

export default class Home extends React.Component {
	render(){
		return (
		  <div>
		  	<Header {...this.props}/>
		  	<div className="main">
		  		body
		  	</div>
		  </div>
		)	
	}
}

