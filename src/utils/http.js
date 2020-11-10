import axios from 'axios';
import QS from 'qs';

const request=axios.create({
    baseURL:'http://localhost:9000',
    //baseURL:'http://120.26.175.167:9000',
    timeout:5000
})

//request 请求拦截器

//request 响应拦截器

export default request;
