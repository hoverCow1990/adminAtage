import request from 'superagent';
// import {hashHistory} from 'react-router';	//路由机制
import {cookieMiddleware} from '../cookieMiddleware'; //中间件
import {
	REQUEST_BASE_URL,
	FILE_CLOUD_API,
} from '../requestApi/requestApi';        	//各类请求的Api地址以及请求根地址

/*
 * 获取云盘详情
 * query一个当前当前路径path
 * 返回信息例如{file:[{},{}],path:"/lielie2/test7"}
 */

export const GET_CLOUD_INIT = 'GET_CLOUD_INIT';
const getCloudInitData = ({file,path}) =>({
	type : GET_CLOUD_INIT,
	file,
	path
})

export const getCloudInit = (query,cb) => dispatch => {
	request
		.get(REQUEST_BASE_URL + FILE_CLOUD_API.GET_FOLDER)
		.query(query)
		.withCredentials()
		.then(cookieMiddleware(dispatch))
		.then(res=>{
			dispatch(getCloudInitData(res));
			cb&&cb(res);
		})
		.catch(err=>console.error(err))
	
}

/*
 * 新建文件夹
 * query一个当前当前路径{name,path}
 * 返回单个文件夹的例如:{xt:"",isFolder:true,name:"test7,"path:"lielie2/test7"}信息
 */

export const NEW_CLOUD_FOLDER = 'NEW_CLOUD_FOLDER';
const newCloudFolderData = file =>({
	type : NEW_CLOUD_FOLDER,
	file
})

export const newCloudFolder = (query,cb) => dispatch => {
	request
		.get(REQUEST_BASE_URL + FILE_CLOUD_API.NEW_FOLDER)
		.query(query)
		.withCredentials()
		.then(cookieMiddleware(dispatch))
		.then(res=>{
			res.path = '/'+res.path;
			dispatch(newCloudFolderData(res));
			cb&&cb(res);
		})
		.catch(err=>console.error(err))
}

/*
 * 重命名文件夹
 * query一个原本名字以及当前路径{name,path}
 * 返回单个文件夹的{}信息
 */

export const RENAME_CLOUD_FOLDER = 'NEW_CLOUD_FOLDER';
const renameCloudFolderData = (file,oldName) =>({
	type : RENAME_CLOUD_FOLDER,
	file,
	oldName
})

export const renameCloudFolder = (query,oldName,cb) => dispatch => {
	request
		.get(REQUEST_BASE_URL + FILE_CLOUD_API.RENAME_FOLDER)
		.query(query)
		.withCredentials()
		.then(cookieMiddleware(dispatch))
		.then(res=>{
			res.path = '/'+res.path;
			dispatch(renameCloudFolderData(res,oldName));
			cb&&cb(res);
		})
		.catch(err=>console.error(err))
}

/*
 * 删除文件夹
 * query一个当前当前路径{path}
 * 不返回值
 */

export const REMOVE_CLOUD_FOLDER = 'REMOVE_CLOUD_FOLDER';
const removeCloudFolderData = oldName =>({
	type : REMOVE_CLOUD_FOLDER,
	oldName
})

export const removeCloudFolder = (query,oldName,cb) => dispatch => {
	request
		.get(REQUEST_BASE_URL + FILE_CLOUD_API.REMOVE_FOLDER)
		.query(query)
		.withCredentials()
		.then(cookieMiddleware(dispatch))
		.then(()=>{
			dispatch(removeCloudFolderData(oldName));
			cb&&cb();
		})
		.catch(err=>console.error(err))
}

/*
 * 黏贴复制一个文件
 * query一个文件当前路径,新路径{old_path,new_path}
 * 返回单个文件信息{}
 */

export const PASTE_FOLDER = 'PASTE_FOLDER';
const pasteFolderData = file =>({
	type : PASTE_FOLDER,
	file
})

export const pasteCopyFolder = (query,cb) => dispatch => {
	request
		.get(REQUEST_BASE_URL + FILE_CLOUD_API.COPY_FOLDER)
		.query(query)
		.withCredentials()
		.then(cookieMiddleware(dispatch))
		.then(res=>{
			res.path = '/'+res.path;
			dispatch(pasteFolderData(res));
			cb&&cb(res);
		})
		.catch(err=>console.error(err))
}

/*
 * 黏贴剪切一个文件
 * query一个文件当前路径,新路径{old_path,new_path}
 * 返回单个文件信息{}
 */

export const pasteCutFolder = (query,cb) => dispatch => {
	request
		.get(REQUEST_BASE_URL + FILE_CLOUD_API.CUT_FOLDER)
		.query(query)
		.withCredentials()
		.then(cookieMiddleware(dispatch))
		.then(res=>{
			res.path = '/'+res.path;
			dispatch(pasteFolderData(res));
			cb&&cb(res);
		})
		.catch(err=>console.error(err))
}