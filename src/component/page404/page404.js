import React,{Component} from 'react';
import {Button} from 'antd';
import {Link} from 'react-router'
import './page404.less';

/*
 *  404页面
 *  用户进入没有人路由的连接后生效
 *  作者:hoverCow,日期:2017-02-15
 */

class Page404 extends Component{
	constructor(){
		super();
	}
	render(){
		return (
			<section className='page404'>
				<div className='default-container'>
					<img src='http://www.web-jackiee.com/templets/blog/demo/publicImage/adminAtage/404.jpg'/>
					<Link to='homePage'>
						<div className='go-home'>回到主页</div>
					</Link>
				</div>
			</section>
		)
	}
}

export default Page404;