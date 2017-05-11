import {compose,createStore ,applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import {persistStore, autoRehydrate} from 'redux-persist'
import reducers from './reducers/index';

export default function configureStore() {

	const store = createStore(
		reducers,
		undefined,
		compose(
		    applyMiddleware(
				thunkMiddleware,
			),
		    autoRehydrate()
		)
	)

	persistStore(store)

	if (module.hot) {
		module.hot.accept(() => {
		  const nextRootReducer = require('./reducers/index').default;
		  store.replaceReducer(nextRootReducer);
		});
	}

  	return store;
};