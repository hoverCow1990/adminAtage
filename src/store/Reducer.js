import {combineReducers} from 'redux';
import {
	adminData,
	student
} from './login/Reducer';

const reducer = combineReducers({
	adminData
})

export default reducer;