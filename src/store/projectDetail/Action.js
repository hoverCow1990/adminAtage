import request from 'superagent';
import {hashHistory} from 'react-router';	//路由机制
import {cookieMiddleware} from '../cookieMiddleware'; //中间件
import {
	REQUEST_BASE_URL,
	API
} from '../requestApi/requestApi';        	//各类请求的Api地址以及请求根地址

/*
 * 获取项目详情
 * 发送数据query为{repo_id:id} id为项目的id号
 * 返回一个res数据{active_branch,admin,commit_info,deploy,description,folder,is_my_repo,local,logo,name,remote,url}
 * 由于需要将commit的数据按时间戳从远至近排序所此处将res.commit_info.reverse();
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
			res.commit_info.reverse();
			dispatch(setProDetailData(res));
		})
		.catch(err => console.error(err))
}

/*
 * 更改当前需要上线的项目
 * 发送数据query为{repo_id:id,deploy:folder}
 * 接受数据后返回一个与detail请求一致的数据
 * 可以选择只改动deploy,但为了同步云盘刷新(可能其他用户操作了你的文件),
 * 所以选择直接dispatchProDetailData刷新完整数据
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
		.catch(err => console.error(err))
}

/*
 * 切换当前本地分支
 * 发送数据query为{repo_id:id,branch:branch[string]}
 * 返回一个和setProDetailData一致的数据
 */

 export const selectBranch = (query,cb) => dispatch => {
 	request
 		.get(REQUEST_BASE_URL + API.CHECKOUT)
 		.query(query)
 		.withCredentials()
 		.then(cookieMiddleware(dispatch))
 		.then(res => {
 			dispatch(setProDetailData(res));
			cb && cb();
 		})
 		.catch(err =>console.error(err))
 }

 /*
 * 回退到某个版本
 * 发送数据query为{repo_id:id,sha:sha} sha为版本的指针
 * 返回一个和setProDetailData一致的数据
 */

export const commitBack = (query,cb) => dispatch => {
	request
		.get(REQUEST_BASE_URL + API.RESET)
		.query(query)
		.withCredentials()
		.then(cookieMiddleware(dispatch))
		.then(res => {
			dispatch(setProDetailData(res))
			cb && cb();
		})
		.catch(err => console.error(err));
}

/*
* 将远程仓库同步至本地仓库
* 发送数据query为{repo_id:id}
* 返回一个和setProDetailData一致的数据
*/

export const pullRemoteBranch = (query,cb) => dispatch =>{
	request
		.get(REQUEST_BASE_URL + API.PULL)
		.query(query)
		.withCredentials()
		.then(cookieMiddleware(dispatch))
		.then(res => {
			dispatch(setProDetailData(res))
			cb && cb();
		})
		.catch(err => console.error(err));
}