import React, {Component} from 'react';
import request from '../../node_modules/superagent/superagent.js'
import {Table} from 'antd';
import '../../node_modules/antd/dist/antd.css';
import './staff.css';

const Staff = React.createClass({
	getInitialState(){
	    return {
	    columns : [{
	                title: 'Name',
	                dataIndex: 'name',
	                key: 'name',
	                render: text => <a href={"#/staffList/"+text}>{text}</a>,
	              }, 
	              {
	                title: 'Age',
	                dataIndex: 'age',
	                key: 'age',
	              }, 
	              {
	                title: 'Sex',
	                dataIndex: 'sex',
	                key: 'sex',
	              }, 
	              {
	                title: 'Single',
	                dataIndex: 'single',
	                key: 'single',
	                render: (text, record) =>(
	                  <div>
	                    <a href="/">{text?"单身狗":"热恋猪"}</a>
	                  </div>
	                ),
	              
	      }],
	      date : [],
	      loading : true,
	    }
	},
	render() {
	      return (
	      	<div className="staffList">
	        	<Table columns={this.state.columns} dataSource={this.state.date} loading={this.state.loading} bordered/>
	        </div>
	    )
	  },
	componentDidMount() {
	    var This = this;
	    this.setState({loading:true})
	    request
	      .get('http://101.200.129.112:9527/react1/student/')
	      .end(function(err,res){
	        if(err) return;
	        var arr = res.body.map(function(item){
	            item.key = item.id;
	            delete item.key;
	            return item;
	        })
	        This.setState({
	        	date : arr,
	        	loading : false,
	        });
	    });

	}
});

export default Staff;
