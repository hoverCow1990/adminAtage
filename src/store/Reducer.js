import {combineReducers} from 'redux';
import {
	adminData,
	otherUser,
} from './login/Reducer';
import {currentLink} from './link/Reducer';

const reducer = combineReducers({
	currentLink,
	adminData,
	otherUser
})

export default reducer;