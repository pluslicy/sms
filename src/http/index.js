import axios from 'axios'
import qs from 'qs'
import {message} from 'antd'
axios.defaults.baseURL = 'http://134.175.154.93:7777';
//axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
// axios.defaults.transformRequest = [function(data){
//   return qs.stringify(data);
// }]
// 请求拦截器，在请求发送之前进行拦截，作用是改变一些配置信息，参数...
axios.interceptors.request.use(function(config){
  if(config.method==="post"){
    config.data = qs.stringify(config.data)
  }
  // 返回配置信息
  return config;
})
// 在响应刚刚回来后，处理response
axios.interceptors.response.use(function(response){
  let {data} = response;
  response.status =data.status;
  response.statusText = data.message;
  response.data = data.data;
  return response;
},function(error){
  message.error('服务器异常');
  Promise.reject(error)
})

export default axios;