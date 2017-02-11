import React from 'react';
import { Breadcrumb } from 'antd';
import {Link} from 'react-router';
import './breadList.css';

const host = "fileCloud";

const BreadList = React.createClass({
	render(){
		var href = host;
		const items = this.props.path.map(function(item,i){
			href += "/" + item
			return (
				<Breadcrumb.Item  href="" key={i}>
					<Link to={href}>
						{item}
					</Link>
				</Breadcrumb.Item>
			)
		});
		return (
			<Breadcrumb>
			    <Breadcrumb.Item>
			    	<Link to={host}>
			    		Home
			    	</Link>
			    </Breadcrumb.Item>
			    {items}
			</Breadcrumb>
		)
	}
});

export default BreadList;