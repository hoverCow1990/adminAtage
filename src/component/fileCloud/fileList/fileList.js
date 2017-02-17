import React,{ Component} from 'react';
import './fileList.css';
import {Icon} from 'antd';
import {hashHistory} from 'react-router';
import {REQUEST_BASE_URL} from '../../../store/requestApi/requestApi';
class FileList extends Component{
	constructor(){
		super();
	}
	render(){
		// console.log(this.props);
		//console.log('render');
		return (
			<section className='file-wrapper'>
				<ul className='file-list'>
					{this.renderList()}
				</ul>
			</section>	
		)
	}
	renderList(){
		console.log('render');
		return this.props.fileList.map(item => 
		<li key={item.name} onMouseDown={ e => this.handleFileClick(e,item)}>
			<div className='file-icon'>
				<img src={'http://www.web-jackiee.com/templets/blog/demo/publicImage/adminAtage/icon-'+ this.inconSwitch(item.ext) +'.png'}/>
			</div>
			<p>{item.name}</p>
		</li>)
	}
	shouldComponentUpdate(nextProps){
		// console.log('---------------------');
		// console.log(this.props)
		// console.log(nextProps);
		// console.log('---------------------');
		// let fileList = nextProps.fileList;
		// return (fileList && fileList.length);
		return true;
	}
	//e.button(0为左键,2为右键)
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
//isFolder?hashHistory.push("/fileCloud/"+path):window.open(this.state.loaction+"static/"+path);
export default FileList;