import React from 'react';
import './menu.css';


const Menu = React.createClass({
	render(){
		const nodes = this.props.menuLi.map(function(item){
			return (
					<li key={item[0]} onMouseDown={(e)=>item[1](e)}>{item[0]}</li>
				)
		});
		return (
			<div className="myMenuList" style={{display:this.props.dis?"block":"none",top:this.props.y,left:this.props.x}}>
				<ul>
					{nodes}
				</ul>
			</div>
		)
	}
});

export default Menu;