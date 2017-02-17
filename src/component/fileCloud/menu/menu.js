import React,{Component} from 'react';
import './menu.less';

/*
 *  右键菜单的组件
 *  根据父组件传输而来的props.menuPos
 *  以及props.meneData[name:'',fn:function]来注册列表名字以及点击事件
 *  其中fn使用了箭头函数所以this指向没有问题
 *  作者:hoverCow,日期:2017-02-16
 */


class Menu extends Component{
	constructor(){
		super();
	}
	render(){
		let {display,x,y} = this.props.menuPos;
		return (
			<div className="myMenuList" style={{display:display,top:y,left:x}}>
				<ul>
					{this.renderLi(this.props.menuData)}
				</ul>
			</div>)
	}
	renderLi(data){
		return data.map((item,index) => 
			<li key={index} onMouseDown={(e)=>item.fn(e)}>
				{item.name}
			</li>)
	}
}

export default Menu;