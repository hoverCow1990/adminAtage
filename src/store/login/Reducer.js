import {combineReducers} from 'redux';
import {
	INIT_LOGIN,
	DO_LOGIN,
	SET_OTHER_USER,
} from './Action';

//对登录用户的信息,以及其他用户文件信息进行管理

const defaultState = {
	adminData : {
		noLogin : true,
		name : null,
		project : [], 
	},
	otherUser : [],
}

export const adminData = (state = defaultState.adminData,action) =>{
	switch(action.type){
		case INIT_LOGIN :
			return Object.assign({},state,
				{...action.data});
		case DO_LOGIN : 
			return Object.assign({},state);
		default :
			return state;	
	}
}

export const otherUser = (state = defaultState.otherUser,action) =>{
	switch(action.type){
		case SET_OTHER_USER :
			return [...state,action.otherList];
		default :
			return state;
	}
}
