import request from 'superagent';
import {hashHistory} from 'react-router';	//路由机制
// import {message} from 'antd'; 				//antd组件
import {cookieMiddleware} from '../cookieMiddleware'; //中间件
import {
	REQUEST_BASE_URL,
	API
} from '../requestApi/requestApi';        	//各类请求的Api地址以及请求根地址

/*
 * 获取项目详情
 * 发送数据query为{repo_id:id} id为项目的id号
 * 返回一个res数据{active_branch,admin,commit_info,deploy,description,folder,is_my_repo,local,logo,name,remote,url}
 */

export const SET_PRO_DETAIL = 'SET_PRO_DETAIL';
const setProDetailData = projectDetail =>({
	type : SET_PRO_DETAIL,
	projectDetail
})

export const setProDetail = query => dispatch => {
	request
		.get(REQUEST_BASE_URL + API.DETAIL)
		.query(query)
		.withCredentials()
		.then(cookieMiddleware(dispatch))
		.then(res=>{
			dispatch(setProDetailData(res));
		})
		.catch(err => console.error(err))
}

/*
 * 更改当前需要上线的项目
 * 发送数据query为{repo_id:id,deploy:folder}
 */

export const selectFolder = (query,cb) => dispatch => {
	request
		.get(REQUEST_BASE_URL + API.EDITDEPLOY)
		.query(query)
		.withCredentials()
		.then(cookieMiddleware(dispatch))
		.then(res => {
			dispatch(setProDetailData(res));
			cb && cb();
		})
		.catch(err =>{
			console.error(err);
		})
}