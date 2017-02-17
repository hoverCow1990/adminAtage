import {doLink} from './link/Action';		//处理未登录时设置全局currentLink
import {doLogoutData} from './login/Action';
import {hashHistory} from 'react-router';	//路由机制
import {message} from 'antd'; 				//antd组件


//用于远程服务器是否登录的验证,如果没有登录则跳转至登录页面,并提示优先登录
export const cookieMiddleware = dispatch => res => {
	res = res.body;
	return new Promise((solve,reject) => {
		if(res.hasOwnProperty("noLogin") && res.noLogin){
			dispatch(doLink('login')); 		//处理侧导航高亮store
			dispatch(doLogoutData())
			hashHistory.push('login');
			reject("没有登录");
			message.warning('麻烦请先登录');
			return;
		}
		solve(res);
	})
}