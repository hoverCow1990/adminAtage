import request from 'superagent'
import $ from 'jquery'

const host = 'http://101.200.129.112:9527/';
const GET_FILE = host + 'file/get/';
const RENAME_FILE = host + 'file/rename/';
const NEW_FOLDER = host + 'file/mkdir/';
const REMOVE = host + 'file/remove/';
const PASTE = host + 'file/copy';
const CUT = host + 'file/move';

export function getFileList(path,error,sucess){    //输出一个用default 两个直接export
	request
		.get(GET_FILE)
		.query({
			path:path
		})
		.end(function (err,res){
			if(err) return error(err);
			return sucess(res.body);
		})
} 

export function reName(query,error,sucess){
	request
		.get(RENAME_FILE)
		.query(query)
		.end(function(err,res){
			if(err) return error(err);
			return sucess(res.body);
		})
}

export function newFolder(query,error,sucess){
	request
		.get(NEW_FOLDER)
		.query(query)
		.end(function(err,res){
			if(err) return error(err);
			return sucess(res);
		});
}

export function removeFile(query,error,sucess){
	request
		.get(REMOVE)
		.query(query)
		.end(function(err,res){
			if(err) return error(err);
			return sucess(res);
		})
}

export function pasteCopyFile(query,error,sucess){
	request
		.get(PASTE)
		.query(query)
		.end(function(err,res){
			if(err) return error(err);
			return sucess(res);
		})
}

export function pasteCutFile(query,error,sucess){
	request
		.get(CUT)
		.query(query)
		.end(function(err,res){
			if(err) return error(err);
			return sucess(res);
		})
}
export function jqGet(query){
	$.ajax({
	    url : "http://101.200.129.112:9527/file/get/",
	    type:'post',
	    data :{
	    	path : "a"
	    },
	    dataType : "jsonp",
	    success:function(data){
	      console.log(data)
	    },
	    error : function(XMLHttpRequest, textStatus, errorThrown){
	    	console.log(XMLHttpRequest)
	    }
	})
}