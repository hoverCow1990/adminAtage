import React,{Component} from 'react';					//React
import {connect} from 'react-redux';					//链接view以及store
import {bindActionCreators} from 'redux';       	    //用于链接异步redux的dispacth
import BreadList from "./breadList/breadList.js";		//面包屑导航模块
import FileList from "./fileList/fileList.js";			//文件列表模块
import Menu from "./menu/menu.js";						//右键菜单栏模块
import {initLogin} from '../../store/login/Action';		//用于存入用户信息的行为
import {
	getCloudInit,
	newCloudFolder,
	renameCloudFolder,
	removeCloudFolder,
	pasteCopyFolder,
	pasteCutFolder
} from '../../store/fileCloud/Action';					//用于处理各文件请求的行为
import {
	Spin,
    Button,
    Modal,
    message
} from 'antd';
import './fileCloud.less';								//antd组件

/*
 *  公司云盘展示页面
 *	支持[新建文件夹,删除,重命名,复制,剪切,黏贴]
 *  作者:hoverCow,日期:2017-02-16
 */

class FileCloud extends Component{
	constructor(){
		super();
		this.state = {
			admin : '',					//用户信息
			getInitLoading : false,		//请求时的loading动画
			files : [],					//所有文件
			filePath : [],				//当前页面路径[由后台请求后返回数据],最后用split('/')处理成数组
			activeFolder : {			//保存当前被右键点击的文件夹
				name : '',
				path : ''
			},
			pasteFolder : {				//保存被复制或者剪切的文件
				type : '',
				path : ''
			},
			menu : {					//储存右键menu后的开关以及xy值
				pos : {display:'none',x:0,y:0},	
				data : []
			},
			modelVisible : false,		//模态框的显示隐藏
			folderName : '',			//模态框内输入名字input的控制
			handleType : '',			//弹出模态框前储存是重命名还是新建操作
			requestTimer : new Date(),	//用于判断componentWillReceiveProps内改变路由发起2次请求
		}
	}
	//以及获取当前路径文件,同时进行用户是否登录超时检测,若超时返回登录界面
	componentWillMount(){
		this.getFileInIt(this.getNowPath());
	}
	//渲染文件列表,面包屑导航以及模态框组件
	render(){
		let {pos,data} = this.state.menu;
		return (
			<div className='cloud-wrapper'>
				<div className='initLoading' style={{display:this.state.getInitLoading?'flex':'none'}}><Spin spinning={this.state.getInitLoading}></Spin></div>
				<article className='fileCloud baseWrapper' onContextMenu={e=>e.preventDefault()} onMouseDown={e => this.showMenu(e,'bg')}>
					<div className='title-wrapper'>
						<h2 className="base-title"><span>1</span>文件信息</h2>
						<div className='base-breadList'><BreadList path={this.state.filePath}/></div>
					</div>
					<FileList fileList={this.state.files} showMenu={this.showMenu.bind(this)} hideMenu={this.hideMenu.bind(this)}/>
					<Menu menuPos={pos} menuData={data}/>
				</article>
				<Modal title="请输入文件名" visible={this.state.modelVisible}
					onCancel={()=>this.hideModal()}
		            footer={[
			            <Button key="back" size="large" onClick={()=>this.hideModal()}>返回</Button>,
			            <Button key="submit" type="primary" size="large"
			            	onClick={()=>this.handleSubmit()}>确定
			            </Button>
		          	]}
		        >
		         	<div className="cloneForm">
		         		<div><p>文件名:</p><input type='text' 
		         			value={this.state.folderName}
		         			onChange={(e) => this.setState({folderName:e.target.value})} />
		         		</div>
		         	</div>
		        </Modal>
			</div>
		)
	}
	//当页面路由发生变化时进行是否超时登录以及获取当前路径的文件信息
	//nowTimer用来避免由于变化路径时发生的多次请求
	componentWillReceiveProps(nextProps,a,b){
		let path = this.getNowPath(nextProps),
			nowTimer = new Date();
		if(nowTimer-this.state.requestTimer<300) return;
		this.setState({
			requestTimer:nowTimer,
			menu : {pos:{display:'none',x:0,y:0},data:[]}
		})
		this.getFileInIt(path);
	}
	//用于发送请求获取当前路径文件信息,并将结果放置于store中的fileClouds以及adminDate
	//并且复制了一份存入当前state中
	getFileInIt(path){
		//发起用户是否登录请求同时打开loading蒙版界面
		let promise = new Promise((solve,reject) => {
			this.setState({getInitLoading:true});
			this.props.initLogin(solve,false);
		})
		//完成登录检测后获取当前路径发起文件请求,最后关闭loading界面
		promise
			.then((res) => {
				this.setState({
					admin : res
				})
				return new Promise((solve,reject) => {
					this.props.getCloudInit({path},solve);
				})
			})
			.then(res =>{
				this.setState({
					getInitLoading : false,
					filePath : res.path.split('/'),
					files : res.file
				});
			})
	}
	//fileCloud主路径被返回undefined,转换当前路径至请求需要的路径.
	getNowPath(props = this.props){
		let splat = props.params.splat;
		return `/${void 0 === splat?'':splat}`;
	}
	//显示Menu组件,x,y为其位置,在fileList以当前组件中都会被调用
	//当用户右键的目标为文件时,则额外多传入一个item参数用于设置当前被选中的文件夹
	showMenu(e,type,item){
		let x = e.clientX,
			y = e.clientY,
			data = this.getMenuDetail(type);
		if(e.button === 0){
			this.hideMenu();
		}else{
			let state = {
				menu : {pos : {display:'block',x:x,y:y},data}
			};
			if(void 0 !== item) state = Object.assign(state,{activeFolder:item});
			this.setState(state);
		}
	}
	//隐藏Menu组件
	hideMenu(){
		let menu = this.state.menu;
		menu.pos.display = 'none';
		this.setState({
			menu
		})
	}
	//根据用户点击的是文件还是背景层来给出不同的menu菜单列表
	//type[string]根据点击时传入
	//最后folder数据被作为props传入filelist,作为右键文件时的事件,箭头函数则保留this的指向
	getMenuDetail(type){
		switch(type){
			case 'bg':
				return [{name : '新建文件夹',fn:()=>this.showModel('newFolder')},
						{name : '黏贴',fn:()=>this.pasteFolder()}
				];
			case 'folder':
				return [{name : '新建文件夹',fn:()=>this.showModel('newFolder')},
						{name : '重命名',fn:()=>this.showModel('renameFolder')},
						{name : '删除',fn:()=>this.removeFolder()},
						{name : '复制',fn:() =>this.copyCutFolder('copy')},
						{name : '剪切',fn:() =>this.copyCutFolder('cut')}
				];
			default :
				return false;
		}
	}
	//复制或者剪切一个文件时的操作,用state内的pasteFolder储存信息,并不发送请求,只在state内自己消化
	copyCutFolder(type){ 
		var pasteFolder = {
				type,
				name : this.state.activeFolder.name,
				path : this.state.activeFolder.path.replace(/^\//,'')
			},
			files = this.state.files;
		if(type === 'cut') files = files.filter(item => item.name !== this.state.activeFolder.name);
		this.setState({
			pasteFolder,
			files
		})
		message.success('操作成功您可以进行黏贴')
	}
	//黏贴文件,判断当前文件夹内是否有重名,有就-1,并且正则匹配之后按-2,-3,-4排序
	//排序会用while进行递归操作防止一个文件夹内同时存在-2,-3后黏贴-2的文件
	//在云盘首页不支持黏贴~~
	pasteFolder(){
		let {type,path:old_path,name}= this.state.pasteFolder,
			reg = /\-(\d+)$/;
		if(type === ''||name === '') return;
		if(this.state.filePath[1] === ''){
			message.error('云盘首页只存放用户文件夹');
			return;
		}
		while(this.validatorName(name).length > 10){
			if(reg.test(name)){
				name = name.replace(reg,num =>{return `-${Number(num.slice(1))+1}`})
			}else{
				name = name + '-1';
			}
		}
		let new_path = this.state.filePath.join("/").replace(/^\//,'') +'/'+ name,
			fn = type === 'copy'?this.props.pasteCopyFolder:this.props.pasteCutFolder;
		if(old_path === new_path.replace(/^\//,'')){
			this.getFileInIt(this.getNowPath());
			return;
		}
		fn({old_path,new_path},res =>{
			this.setState({
				files : [...this.state.files,res]
			})
			message.success('成功你黏贴一个文件');
		})
	}
	//移除文件夹
	removeFolder(){
		Modal.confirm({
		    title: '删除文件',
		    content: '您是否确定要删除文件,系统不可逆',
		    onOk:() =>{
		    	var {name:oldName,path} = this.state.activeFolder,
		    		path = path.replace(/^\//,''),
					query = {
						path
					}
				console.log(path);
				if(!path.startsWith(this.state.admin)){
					message.error('您只能删除您自己的文件');
					return;
				}else if(path === this.state.admin){
					message.error('您的主文件夹不能删除');
					return;
				}
				this.props.removeCloudFolder(query,oldName,() =>{
					let files = this.state.files.filter(item => item.name !== oldName);
					this.setState({
						files,
						modelVisible : false,
					});
					message.success('成功删除文件夹');
				})
		    },
		    onCancel(){},
	  	});
	}
	//模态框提交重命名或者新建的请求,根据handlerType判断
	handleSubmit(){
		let name = this.state.folderName,
			couldSub = this.validatorName(name),
			nowPath = this.state.filePath[1] === '';
		if(typeof couldSub === 'string'){
			message.error(couldSub);
			return;
		}
		if(this.state.handleType === 'newFolder'){
			if(nowPath) return message.error('云盘首页不能新建文件夹');
			this.props.newCloudFolder({
				name,
				path : this.state.filePath.join('/')
			},res=>{
				this.setState({
					files : [...this.state.files,res],
					modelVisible : false,
				});
				message.success('成功新建一个文件夹');
			})
		}else{
			if(nowPath) return message.error('用户主文件夹不能更改名字');
			let {name:oldName,path} = this.state.activeFolder,
				query = {name,path};
			this.props.renameCloudFolder(query,oldName,res=>{
					let files = this.state.files.map(item => {
					if(item.name === oldName) return res;
					return item;
				})
				this.setState({
					files,
					modelVisible : false,
					folderName : ''
				});
				message.success('成功重命名文件夹');
			})
		}
	}
	//验证当前文件夹内是否有重名
	validatorName(name){
		if(name === '') return '文件名不能为空';
		if(this.state.files.find(item => item.name === name)) return '已经有相同名字文件,请更换名字';
		return true;
	}
	//展示模态框,传入参数handleType[string],用于设置是重命名的点击还是新建文件夹的点击
	showModel(handleType){
		this.setState({
			modelVisible : true,
			handleType
		})
	}
	//隐藏模态框,清空input信息
	hideModal(){
		this.setState({
			modelVisible:false,
			folderName : ''
		})
	}
}



//projectDetail数据
const getDataProps = state => ({});

//链接方法
const setFnProps = dispatch => ({
  dispatch,
  initLogin         : bindActionCreators(initLogin,dispatch),
  getCloudInit      : bindActionCreators(getCloudInit,dispatch),
  newCloudFolder    : bindActionCreators(newCloudFolder,dispatch),
  renameCloudFolder : bindActionCreators(renameCloudFolder,dispatch),
  removeCloudFolder : bindActionCreators(removeCloudFolder,dispatch),
  pasteCopyFolder   : bindActionCreators(pasteCopyFolder,dispatch),
  pasteCutFolder	: bindActionCreators(pasteCutFolder,dispatch),
})
//链接数据层
export default connect(getDataProps,setFnProps)(FileCloud);
