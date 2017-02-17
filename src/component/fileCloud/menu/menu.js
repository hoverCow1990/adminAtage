import React,{Component} from 'react';
import './menu.less';



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