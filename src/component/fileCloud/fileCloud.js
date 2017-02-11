import React from 'react';
import { message, Modal, Button} from 'antd';
import { 
  hashHistory,
} from 'react-router';
import './fileCloud.css';
import BreadList from "./breadList/breadList.js";
import FileList from "./fileList/fileList.js";
import {getFileList,reName,newFolder,removeFile,pasteCopyFile,pasteCutFile} from "./fileApi/fileApi.js";
import Menu from "./menu/menu.js";

const confirm = Modal.confirm;

const FileCloud=React.createClass({
	getInitialState(){
		return {
			path : [],
			file : [],
			loading : false,
			loaction : "http://101.200.129.112:9527/",
			menuDis : false,
			menuLi : [],
			menuPos : {
				x : 20,
				y : 100
			},
			copyItem : null,
			cutItem : null,
			renameInput : false,
			activeFile : null,
			renameValue : null,
		}
	},
	render(){
		return (
			<div className="fileWrapper" onContextMenu={(e)=>e.preventDefault()} onMouseDown={(e) => this.takeMenu(e,e.clientX,e.clientY)}>
				<BreadList path={this.state.path}/ >
				<FileList  path={this.state.path} file={this.state.file} mouseEvent={this.mouseEvent} renameInput = {this.state.renameInput} activeFile={this.state.activeFile} reNameSub={this.reNameSub} reNameEnd = {this.reNameEnd} reNameEvent={this.reNameEvent} renameValue={this.state.renameValue} newFileSub={this.newFileSub} endNewFile={this.endNewFile}/ >
				<Menu dis={this.state.menuDis} x={this.state.menuPos.x} y={this.state.menuPos.y} menuLi={this.state.menuLi}/>
			</div>
		)
	},
	componentDidMount(){
		console.log(1);
		const {params} = this.props;     //this.props.params.splat为当前#/后的路径
		const {splat} = params;
		this.getFile(splat);
	},
	componentWillReceiveProps(nextProps){
		const {params} = nextProps
        const {splat} = params
		this.getFile(splat);
	},
	takeMenu(e,x,y){
		console.log(x);
		const This = this;
		if(e.button == 2){
			this.setState({
				menuDis : true,
				menuPos : {
					x : x,
					y : y
				},
				menuLi : [
					["新建文件夹",This.newFile],
					["黏贴",This.paste],
				],
				renameInput : false,
			})
		}else if(e.button == 0){
			this.setState({
				menuDis : false,
				activeFile : null,
			})
		}
	},
	mouseEvent(e,path,isFolder,name){
		e.stopPropagation();
		e.preventDefault();
		const This = this;
		if(e.button == 2){
			this.setState({
				menuDis : true,
				menuPos : {
					x : e.clientX,
					y : e.clientY
				},
				menuLi : [
					["新建文件夹",This.newFile],
					["重命名",This.renameDis],
					["删除",This.removeFile],
					["复制",This.copy],
					["剪切",This.cut],
				],
				renameInput : false,
				renameValue : null,
				activeFile : name,
			})		}else if(e.button == 0){
			if(this.state.renameInput) return;
			isFolder?hashHistory.push("/fileCloud/"+path):window.open(this.state.loaction+"static/"+path);
			this.setState({
				menuDis : false,
				activeFile : null,
			})
		}
	},
	reNameEvent(val){
		this.setState({
			renameValue : val,
		})
	},
	getFile(path){
		const This = this;
		path = path||"";
		getFileList(path,function(err){
			throw new Error(err);
		},function(res){
			This.setState({
				file : res.file,
				path : res.path.split("/"),
			});
		});
	},
	renameDis(e) {
		e.stopPropagation();
		e.preventDefault();
		if(e.button != 0) return;
		this.setState({
			menuDis : false,
			renameInput : true,
		})
	},
	reNameSub(path,value){
		if(!value || this.state.activeFile == value){
			this.setState({
				renameInput : false,
				activeFile : null,
			});
			return;
		}
		if(this.hasName(value)){
			message.error("不得与其他文件重名,请更改");
			return;
		}
		const file = this.state.file,
		      This = this;
		reName({
			path : path,
			name : value
		},function(err){
			return new Error(err);
		},function(res){
			var json = [];
			file.map(function(obj){
				if(obj.name == This.state.activeFile){
					json.push(res)
				}else{
					json.push(obj)
				}
			})
			This.setState({
				renameInput : false,
				activeFile : null,
				renameValue : null,
				file : json,
			});
			message.success('成功更换了文件名');
		});
	},
	reNameEnd() {
		this.setState({
			renameInput : false,
			activeFile : null,
			renameValue : null,
		});
	},
	newFile(e) {
		e.stopPropagation();
		e.preventDefault();
		var name = "",
			json = this.state.file;
			json.push({
				ext: "",
				isFolder: true,
				name: name,
				path: name,
			});
		this.setState({
			file : json,
			menuDis : false,
			renameInput : true,
			activeFile : name,
		});
	},
	newFileSub(value){
		if(this.hasName(value)){
			message.error("不得与其他文件重名,请更改");
			return;
		};
		const path = this.state.path.join("/"),
			  query = {
				name : value,
				path : path,
			},
			   file = this.state.file,
			   This = this;
		newFolder(query,function(err){
			throw new Error(err);
		},function(res){
			file[file.length-1] = res.body;
			This.setState({
				renameInput : false,
				activeFile : null,
				renameValue : null,
				file : file,
			});
		});
	},
	removeFile(e){
		e.stopPropagation();
		e.preventDefault();
		const This = this;
		confirm({
	    title: '删除文件',
	    content: '您是否确定要删除文件,系统不可逆',
	    onOk: function() {
	    		const path = This.state.path.join("/"),
					  name = This.state.activeFile,
					  query = {
					  	path : path?path+"/"+name:name,
					  },
					  file = This.state.file;
			    removeFile(query,function(err){
			    	throw new Error(err);
			    },function(res){
			    	file.map(function(obj,index){
			    		if(obj.name == name){
			    			file.splice(index,1);
			    		}
			    	})
			    	This.setState({
			    		file : file,
						activeFile : null,
						menuDis : false,
			    	})
			    	message.success('恭喜你成功删除文件');
			    });
			},
	    	onCancel(){},
	  	});
	},
	endNewFile(){
		const file = this.state.file;
			  file.splice(file.length-1,1); 
		this.setState({
			file : file,
			renameInput : false,
			renameValue : null,
		})
	},
	copy(){
		const This = this;
		this.state.file.map(function(item){
			if(item.name == This.state.activeFile){
				This.setState({
					copyItem : item,
				})
			}
		});
		message.success("成功复制文件"+This.state.activeFile);
	},
	paste() {
		const obj = this.state.copyItem || this.state.cutItem,
			  pasteFn = this.state.copyItem?pasteCopyFile : pasteCutFile,
			  item = this.deepCopy(obj),
			  oldPath = item.path,
			  file = this.state.file,
			  This = this;
	    if(this.hasName(item.name)){
	    	item.name = item.name + "-副本",
	    	item.path = item.path + "-副本" 
	    }
		const query = {
			  old_path : oldPath,
              new_path : this.state.path.join("/") + "/" + item.name,
		}
		pasteFn(query,function(err){
			throw new Error(err);
		},function(res){
			file.push(res.body);
			This.setState({
				file : file,
				copyItem : null,
				cutItem : null,
			})
			message.success("成功黏贴文件"+item.name);
		});
		
	},
	cut() {
		const This = this;
		this.state.file.map(function(item){
			if(item.name == This.state.activeFile){
				This.setState({
					cutItem : item,
				})
			}
		});
		message.success("成功剪切文件"+This.state.activeFile);
	},
	hasName(value){
		return this.state.file.some(function(obj){
			return obj.name == value;
		})
	},
	deepCopy(json){
		var item = new Object();
		for (var key in json){
			item[key] = json[key];
		}
		return item;
	},
});

export default FileCloud;