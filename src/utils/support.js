import Cookies from 'js-cookie';
export function setCookie(key,value,expires){
    return Cookies.set(key,value,{expires:expires})
}

export function getCookie(key){
    return Cookies.get(key)
}
export function removeCookie(key){
    Cookies.remove(key)
}
export function setStorage(data){
    const {totalMount,totalPrice,cartData}=data;
    localStorage.setItem('totalMount',totalMount);
    localStorage.setItem('totalPrice',totalPrice);
    localStorage.setItem('cartData',JSON.stringify(cartData));
}

export function formatDate(date, fmt) {
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    let o = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds()
    };
    for (let k in o) {
        if (new RegExp(`(${k})`).test(fmt)) {
            let str = o[k] + '';
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
        }
    }
    return fmt;
};

function padLeftZero(str) {
    return ('00' + str).substr(str.length);
}