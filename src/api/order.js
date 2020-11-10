import request from '@/utils/http.js'

//所有订单
export function getList(params){
    return request({
        url:'/order/list',
        method:'get',
        params:params
    })
}

export function addOrder(params){
    return request({
        url:'/order/add',
        method:'post',
        data:params
    })
}
export function addOrderFood(params){
    return request({
        url:'/orderFood/add',
        method:'post',
        data:params
    })
}

export function getOrderDetail(params){
    return request({
        url:'/order/detail',
        method:'get',
        params:params
    })
}

export function updateOrder(params){
    return request({
        url:'/order/update',
        method:'get',
        params:params
    })
}

export function getOrderCount(params){
    return request({
      url:'/order/count',
      method:'get',
      params:params
    })
  }
  
  export function getAllOrderCount(){
    return request({
      url:'/order/allCount',
      method:'get'
    })
  }

  export function getAllAmount(){
      return request({
          url:'/order/allAmount',
          method:'get'
      })
  }
export function getAmount(parmas){
    return request({
        url:'/order/amount',
        method:'get',
        params:parmas
    })
}

export function getAllMoney(){
    return request({
        url:"/manager/money",
        method:'get'
    })
}