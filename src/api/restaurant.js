import request from '@/utils/http.js'

export function getRestaurantList(params){
    return request({
        url:'/restaurant/list',
        method:'get',
        params:params
    })
}

export function getRestaurant(params){
    return request({
        url:'/restaurant',
        method:'get',
        params:params
    })
}
export function updateRestaurant(params){
    return request({
        url:'/restaurant/update',
        method:'post',
        data:params
    })
}

export function register(params){
    return request({
        url:'/restaurant/register',
        method:'post',
        data:params
    })
}

export function login(params){
    return request({
        url:'/restaurant/login',
        method:'post',
        data:params
    })
}

export function pass(params){
    return request({
        url:'/restaurant/pass',
        method:'get',
        params:params
    })
}

export function getRestaurantCount(params){
    return request({
      url:'/restaurant/count',
      method:'get',
      params:params
    })
  }
  
  export function getAllRestaurantCount(){
    return request({
      url:'/restaurant/allCount',
      method:'get'
    })
  }