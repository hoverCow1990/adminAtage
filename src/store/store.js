import {createStore,applyMiddleware,compose} from 'redux'
import reducer from './Reducer.js';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';

const logger = createLogger();

const store = createStore(
	reducer,
	compose(
    	applyMiddleware(thunk,logger),
	)
);
// ,
// 	compose(
//     	applyMiddleware(thunk,logger),
// 	)
//,compose(window.devToolsExtension())

export default store;