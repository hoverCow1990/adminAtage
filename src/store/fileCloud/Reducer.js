import {
	GET_CLOUD_INIT,
	NEW_CLOUD_FOLDER,
	RENAME_CLOUD_FOLDER,
	REMOVE_CLOUD_FOLDER,
	PASTE_FOLDER,
} from './Action';

//对用户的详细文件数据进行管理

const defaultState = {
	files : [],
	filePath : '',
}

export const fileClouds = (state = defaultState,action) =>{
	let oldName = action.oldName;
	switch(action.type){
		case GET_CLOUD_INIT:
			return Object.assign({},state,{
				files : action.file,
				filePath : action.path
			});
		case NEW_CLOUD_FOLDER:
			return Object.assign({},state,{
				files:[...state.files,action.file]
			})
		case RENAME_CLOUD_FOLDER:
			return Object.assign({},state,{
				files:state.files.map(item => {
					if(item.name == oldName){
						return action.file;
					}
					return item;
				})
			})
		case REMOVE_CLOUD_FOLDER:
			return Object.assign({},state,{
				files:state.files.filter(item => item.name != oldName)
			})
		case PASTE_FOLDER:
			return Object.assign({},state,{
				files:[...state.files,action.file]
			})
		default :
			return state;
	}
}