import React from 'react';
import './fileList.css';
import {Icon} from 'antd';
const FileList = React.createClass({
	getInitialState() {
		return ({
			val : null,
		})
	},
	inconSwitch(ext){
		switch(ext){
			case "":
				return "folder";
				break;
			case '.html':
	            return 'file-text';
	            break;
	        case '.css':
	            return 'copy';
	            break;
	        case '.js':
	        case '.md':
	        case '.json':
	            return 'code';
	            break;
	        case '.jpg':
	        case '.png':
	        case '.gif':
	        case '.ico':
	        case '.map':
	            return 'picture';
	            break;
		}
	},
	render(){
		const That = this,
			  {mouseEvent,reNameSub,activeFile,renameInput,renameValue,reNameEvent,file,newFileSub,endNewFile} = this.props,
			  nodes = file.map(function(item,index){
			  	var active = false,
			  		d1 = "block",
			  		d2 = "none";
			  	if(activeFile == item.name){
			  		active = true;
			  		if(renameInput){
			  			d1 = "none";
			  			d2 = "block";
			  		}  
			  	}
				return <li className={ active?"active":""} key={item.path} onMouseDown={(e,path,isFolder,name) => mouseEvent(e,item.path,item.isFolder,item.name)} >
					<Icon type={That.inconSwitch(item.ext)} />
					<div>
						<p style={{display:d1}}>{item.name}</p>
						<div className="inputGroup" style={{display:d2}}>
							<input onClick={(e) => e.target.focus()} value={renameValue !== null?renameValue:item.name} onChange={(e) => reNameEvent(e.target.value)} type="text"/>
							<input type="button" onClick={item.path?(path,value) => reNameSub(item.path,renameValue):(value) => newFileSub(renameValue)} value="确定"/>
							<input type="button" onClick={item.path?(e) => That.endInput(e):endNewFile} value="取消"/>
						</div>
					</div>
				</li>
		}); 
		return (
			<div className="file-box">
				<ul>
					{nodes}
				</ul>
			</div>
		)
	},
	endInput(e){
		this.props.reNameEnd();
		this.setState({
			val : null,
		})
	}
})

export default FileList;