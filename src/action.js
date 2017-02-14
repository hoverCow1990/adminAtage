/**
 * Created by ljc on 2016/11/30.
 */
import React from 'react';
import request from 'superagent'
// import {Promise} from 'es6-promise'
import ReactDOM from 'react-dom'
import Init from './init'
var host = 'http://101.200.129.112:9527';
var api = {
    logout : '/deploy/logout/',
    detail : '/deploy/detail/',
    deploy : '/deploy/deploy/',
    branch : '/deploy/branch/',
    checkout:'/deploy/checkout/',
    pull : '/deploy/pull/',
    reset : '/deploy/reset/',
    editDeploy : '/deploy/editDeploy/',
    clone : '/deploy/clone/'
}
import {hashHistory} from 'react-router'
import {message} from 'antd'


export function getInit(obj) {
    return {
        type : 'get-init',
        info : obj.info,
        project:obj.project,
        users:obj.users
    }
}

export function getLogin(obj) {
    return {
        type : 'get-login',
        data : obj
    }
}



export function getDetail(obj) {
    return {
        type : 'get-detail',
        data : obj
    }
}

var cookieExpireMiddleware = function (res) {

    return new Promise((resolve,reject)=>{
        var data = res.body
        if(data.noLogin){
            ReactDOM.unmountComponentAtNode(document.getElementById('root'))
            ReactDOM.render(
                <Init/>,
                document.getElementById('root')
            )
        }else {
            resolve(res)
        }
    })
}

export function newLocalBranch(name) {
    return {
        type:'new-local-branch',
        name:name
    }

}

export function branch(query) {
    message.info('starting checkout new branch')
    return function (dispatch) {
        request
            .get(host+api.branch)
            .query(query)
            .withCredentials()
            .then(cookieExpireMiddleware)
            .then(function (res) {
                message.success('checkout new branch successful')
                dispatch(getDetail(res.body))
            })
    }
}

export function checkout(query) {
    console.log(query)
    message.info('starting switch local branch')
    return function (dispatch) {
        request
            .get(host+api.checkout)
            .query(query)
            .withCredentials()
            .then(cookieExpireMiddleware)
            .then(function (res) {
                message.success('switch local branch successful')
                dispatch(getDetail(res.body))
            })
    }
}

export function pull(query) {
    message.info('starting pull from origin '+query.branch)
    return function (dispatch) {
        request
            .get(host+api.pull)
            .query(query)
            .withCredentials()
            .then(cookieExpireMiddleware)
            .then(function (res) {
                message.success('pull from origin '+query.branch+ ' successful')
                dispatch(getDetail(res.body))
            })
    }
}

export function deploy(query) {

    return function (dispatch) {
        request
            .get(host+api.deploy)
            .query(query)
            .withCredentials()
            .then(cookieExpireMiddleware)
            .then(function (res) {
                console.log(res.body)
            })
    }
}

export function detail(query) {
    message.info('initialize')
    return function (dispatch) {
        request
            .get(host+api.detail)
            .query(query)
            .withCredentials()
            .then(cookieExpireMiddleware)
            .then(function (res) {
                message.success('reder successful')
                var data = res.body
                dispatch(getDetail(data))
            })
    }
}

export function reset(query) {
    message.info('starting reset repo')
    return function (dispatch) {
        request
            .get(host+api.reset)
            .query(query)
            .withCredentials()
            .then(cookieExpireMiddleware)
            .then(function (res) {
                message.success('reset repo successful')
                var data = res.body
                dispatch(getDetail(data))
            })
    }
}


export function editDeploy(query) {
    message.info('starting edit repo deploy folder')
    return function (dispatch) {
        request
            .get(host+api.editDeploy)
            .query(query)
            .withCredentials()
            .then(cookieExpireMiddleware)
            .then(function (res) {
                message.success('edit repo deploy folder successful')
                dispatch(getDetail(res.body))
            })
    }
}

export function createProject(project) {
    return {
        type : 'create-project',
        project:project
    }
}

export function clone(query,cb) {
    message.info('starting clone repo from '+query.url)
    return function (dispatch) {
        request
            .get(host+api.clone)
            .query(query)
            .withCredentials()
            .then(cookieExpireMiddleware)
            .then(function (res) {
                message.success('clone repo '+query.name+'successful')
                dispatch(createProject(res.body))
                cb()
            })
    }
}




