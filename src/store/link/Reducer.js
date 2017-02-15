import {
	DO_LINK,
	DO_PAGINATION
} from './Action';

/*
 * 用于获取用户首次登录后的url获取
 */
const stUrl   = window.location.hash,
	  nowUrl  = stUrl?stUrl.match(/[^\/]+[^\/]/)[0]:"login";

const defaultState = {
	currentLink       : nowUrl,
	currentPagination : 0,			//hompage内分页的记录
}

export const currentLink = (state = defaultState.currentLink,action) => {
	switch (action.type){
		case DO_LINK : 
			return action.currentLink;
		default :
			return state;
	}
}

export const currentPagination = (state = defaultState.currentPagination,action) => {
	switch (action.type){
		case DO_PAGINATION : 
			return action.currentPagination;
		default :
			return state;
	}
}