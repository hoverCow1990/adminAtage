import {combineReducers} from 'redux';
import {
	SET_PRO_DETAIL
} from './Action';

//对用户的详细文件数据进行管理

const defaultState = {
	projectDetail :{},
}

export const projectDetail = (state = defaultState.projectDetail,action) =>{
	switch(action.type){
		case SET_PRO_DETAIL:
			return Object.assign({},state,action.projectDetail);
		default :
			return state;
	}
}