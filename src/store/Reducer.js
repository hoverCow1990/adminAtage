import {combineReducers} from 'redux';
import {
	adminData,
	otherUser
} from './login/Reducer';

const reducer = combineReducers({
	adminData,
	otherUser
})

export default reducer;