import React,{Component} from 'react';
import { Breadcrumb } from 'antd';
import {
	Link
} from 'react-router';
import './breadList.less';

const host = "fileCloud";

/*
 *  右边栏面包屑导航
 *  根据父级的state.filePath进行分割
 *  作者:hoverCow,日期:2017-02-17
 */

class BreadList extends Component{
	constructor(){
		super();
	}
	render(){
		return (
			<Breadcrumb>
			    <Breadcrumb.Item>
			    	<Link to={host}>
			    		Home
			    	</Link>
			    </Breadcrumb.Item>
			    {this.renderLinks()}
			</Breadcrumb>	
		)
	}
	//返回导航栏
	renderLinks(){
		let href = host;
		return this.props.path.slice(1).map((item,index) =>{
			href += '/' + item;
			return (
				<Breadcrumb.Item  key={index}>
					<Link to={href}>
						{item}
					</Link>
				</Breadcrumb.Item>)
		})
	}
}

export default BreadList;