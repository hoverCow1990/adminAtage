import React,{ Component} from 'react';
import {hashHistory} from 'react-router';
import {REQUEST_BASE_URL} from '../../../store/requestApi/requestApi';

/*
 *  云盘列表信息
 *	点击文件支持[新建文件夹,删除,重命名,复制,剪切]
 *  作者:hoverCow,日期:2017-02-16
 */

class FileList extends Component{
	constructor(){
		super();
	}
	//渲染文件列表
	render(){
		return (
			<section className='file-wrapper'>
				<ul className='file-list'>
					{this.renderList()}
				</ul>
			</section>	
		)
	}
	//更换this.props.fileList的数组信息,设置文件名,点击事件
	renderList(){
		return this.props.fileList.map((item,index) => 
		<li key={index} onMouseDown={ e => this.handleFileClick(e,item)}>
			<div className='file-icon'>
				<img alt='hello' src={'http://www.web-jackiee.com/templets/blog/demo/publicImage/adminAtage/icon-'+ this.inconSwitch(item.ext) +'.png'}/>
			</div>
			<p>{item.name}</p>
		</li>)
	}
	shouldComponentUpdate(nextProps){
		return true;
	}
	//e.button(0为左键,2为右键),设置冒泡组组织背景层点击事件,点击左键时均调用福组件的hideMenu
	handleFileClick(e,item){
		e.stopPropagation();
		e.preventDefault();
		let {isFolder,path,name} = item;
		if(0 == e.button){
			this.props.hideMenu();
			if(isFolder){
				hashHistory.push("/fileCloud"+path);
			}else{
				window.open(REQUEST_BASE_URL+"/static/"+path);
			}
		}else{
			this.props.showMenu(e,'folder',{name,path});
		} 
	}
	//查看文件类型,返回不一样的文件图标
	inconSwitch(ext){
		switch(ext){
			case "":
				return "folder";
			case '.html':
			case '.css':
	        case '.js':
	        case '.md':
	        case '.json':
	        case '.txt':
	        case '.zip':
	        case '.xml':
	            return ext.slice(1);
	        case '.jpg':
	        case '.png':
	        case '.gif':
	        case '.ico':
	        case '.map':
	            return 'pic';
	        case '.mp3':
	        	return 'music';
	        default :
	        	return 'default';
		}
	}
}
export default FileList;