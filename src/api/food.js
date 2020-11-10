import request from '@/utils/http.js'

export function getFoodList(params){
    return request({
        url:'food/list',
        method:'get',
        params:params
    })
}
export function getFood(params){
    return request({
        url:'food',
        method:'get',
        params:params
    })
}

export function updateFood(params){
    return request({
        url:'food/update',
        method:'post',
        data:params
    })
}

export function deleteFood(params){
    return request({
        url:'food/delete',
        method:'post',
        data:params
    })
}

export function addFood(params){
    return request({
        url:'food/add',
        method:'post',
        data:params
    })
}

export function downFood(params){
    return request({
        url:'food/down',
        method:'get',
        params:params
    })
}