import {
	DO_LINK
} from './Action';

/*
 * 用于获取用户首次登录后的url获取
 */
const stUrl   = window.location.hash,
	  nowUrl  = stUrl?stUrl.match(/[^\/]+[^\/]/)[0]:"login";

const defaultState = {
	currentLink : nowUrl,
}

export const currentLink = (state = defaultState.currentLink,action) => {
	switch (action.type){
		case DO_LINK : 
			return action.currentLink;
		default :
			return state;
	}
}