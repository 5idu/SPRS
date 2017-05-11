import React from 'react';
import { Provider } from 'react-redux';
import configureStore from '../store/configureStore';
import Router from './Router';
import '../static/css/global.css';
import '../static/css/github-markdown.css';

const store = configureStore()

export default class Root extends React.Component {
	render(){
		return (
			<Provider store={store}>
				<Router />
			</Provider>
		)
	}
}