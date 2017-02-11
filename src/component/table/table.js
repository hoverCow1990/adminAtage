import React, { Component } from 'react';
import {Table} from 'antd';
import request from '../../node_modules/superagent/superagent.js'
import { Button,Icon,Row,Col} from 'antd';
import 'antd/dist/antd.css';

var MyTable = React.createClass({
  getInitialState(){
    return {
    columns : [{
                title: 'Name',
                dataIndex: 'name',
                key: 'name',
                render: text => <a href="#">{text}</a>,
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
                    <a href="#">{text?"单身狗":"热恋猪"}</a>
                  </div>
                ),
              
      }],
      date : []
    }
  },
  render() {
      return (
        <Table columns={this.state.columns} dataSource={this.state.date} />
    )
  },
  componentDidMount() {
    var This = this;
    request
      .get('http://101.200.129.112:9527/react1/student/')
      .end(function(err,res){
        if(err) return;
        var arr = res.body.map(function(item){
            item.key = item.id;
            delete item.key;
            return item;
        })
        This.setState({date:arr});
      })
  }
});

export default MyTable;
