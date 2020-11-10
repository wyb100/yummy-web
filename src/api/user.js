import request from '@/utils/http.js'

//登录
export function login(data) {
  return request({
      url:'/member/login',
      method:'post',
      data:data
    });
}

//注册
export function register(data) {
  return request({
      url:'/member/register',
      method:'post',
      data:data
  });
}
//更新个人信息
export function update(params){
  return request({
    url:'/member/update',
    method:'post',
    data:params
  })
}

export function deleteUser(params){
  return request({
    url:'/member/delete',
    method:'get',
    params:params
  })
}

export function getUser(params){
  return request({
    url:'/member',
    method:'get',
    params:params
  })
}

export function getUserCount(params){
  return request({
    url:'/member/count',
    method:'get',
    params:params
  })
}

export function getAllUserCount(){
  return request({
    url:'/member/allCount',
    method:'get'
  })
}

//注销
export function exit(){
    return request({
        url:'member/exit',
        method:'post',
    });
}
 


export function getAddress(params){
  return request({
    url:'/address/list',
    method:'get',
    params:params
  })
}

export function addAddress(params){
  return request({
    url:'/address/add',
    method:'post',
    data:params
  })
}

export function deposit(params){
  return request({
    url:'/member/deposit',
    method:'get',
    params:params
  })
}


