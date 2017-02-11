import {combineReducers} from 'redux';
import {
	CHECK_LOGIN,
	checkLogin,
	GET_STUDENT,
	getStudent
} from './Action';

const initState = {
	adminData : {
		noLogin : true
	}
}

export const adminData = (state = initState.adminData,action) =>{
	switch(action.type){
		case CHECK_LOGIN :
			return Object.assign({},adminData,
				{...action.noLogin});
		default :
			return state;	
	}
}


export const student = (state = initState.student,action) =>{
	switch(action.type){
		case GET_STUDENT : 
			return action.list;
		default :
			return state;		
	}
}
