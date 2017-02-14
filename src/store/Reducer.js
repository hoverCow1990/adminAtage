import {combineReducers} from 'redux';
import {
	adminData,
	otherUser,
} from './login/Reducer';
import {
	projectDetail,
} from './projectDetail/Reducer';
import {currentLink} from './link/Reducer';

const reducer = combineReducers({
	currentLink,
	adminData,
	otherUser,
	projectDetail
})

export default reducer;