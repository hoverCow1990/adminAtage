import React,{Component} from 'react';
import {connect} from 'react-redux';            //connect
import {
    Row,
    Col,
    Button,
    Icon
} from 'antd';
import {hashHistory} from 'react-router';
import {ADMIN_MAX_STAR} from '../../setting/setting';

/*
 * 登录成功界面
 * 对用户的初始信息进行渲染,并提供链接主页以及其他用户按钮
 * props内包含数据[adminData]
 * 作者:hoverCow 日期:2017/02/11
 */

class WelcomeContent extends Component{
  constructor(){
    super();
  }
  //左部分渲染头像,右部分渲染用户信息,以及链接入口按钮
  render(){
      let{name,id,project} = this.props.adminData;
      return (
        <figure className="loginSucess">
          <Row >
            <Col span={9} className="sucess-perview">  
              <img className="feature" src ={require("../image/master.jpg")}/>   
            </Col>
            <Col span={14} offset={1}>
              <ul className="user-info">
                <li><span>用户id:</span><span>{`000${id}`.slice(-4)}</span></li>
                <li><span>用户姓名:</span><span>{name}</span></li>
                <li><span>项目数量:</span><span>{project.length}</span></li>
                <li><span>gitHub:</span><span>{this.getGitUrl(project)}</span></li>
                <li><span>用户等级:</span><span>{this.getStar(project.length)}</span></li>
              </ul>
              <div className="userSelect">
                <Button type="primary" onClick={()=>this.doLink("homePage")}>
                  <span className="tri tri-1"></span><span className="tri tri-2"></span><Icon type="home" />
                  我的首页
                </Button>
                <Button type="primary">
                <span className="tri tri-1"></span><span className="tri tri-2"></span><Icon type="share-alt" />
                  其他用户
                </Button>
                <Button type="primary">
                  <span className="tri tri-1"></span><span className="tri tri-2"></span><Icon type="poweroff" />
                  退出登录
                </Button>
              </div>
            </Col>
          </Row>
        </figure>
      )
  }
  //根据参数跳转路由,并更改全局currentLink
  doLink(path){
    hashHistory.push(path);
  }
  //匹配github地址
  getGitUrl(pro){
    return pro.length?pro[0].url.match(/https:\/\/github.com\/[^\/]+/)[0]:"暂未申请";
  }
  //根据羡慕数量给定星级评定
  getStar(length){
    let IconArr = [];
    length = Math.min(ADMIN_MAX_STAR,length);
    for(let i=0;i<length;i++){
      IconArr.push(<Icon type="star" key={i}/>);
    }
    return length?IconArr:"暂时没有等级!"
  }
}

const setDateProps = state => ({
    adminData : state.adminData
})


export default connect(setDateProps)(WelcomeContent);
