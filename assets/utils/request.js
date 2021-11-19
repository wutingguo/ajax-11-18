// 全局配置根路径
axios.defaults.baseURL = 'http://www.itcbc.com:8000';

// 全局配置请求头
axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');


// 添加响应拦截器
axios.interceptors.response.use(
  function (response) {
    // 对响应数据做点什么
    // 响应状态码 小于 400 执行这个函数
    if (response.data.code === 1) {
    }
    return response;
  },
  function (error) {
    // 对响应错误做点什么
    // 响应状态码 大于等于 400， 执行这个函数
    if (error.response) { // error.response 表示服务器响应的结果，相当于通过 .then 得到的 result
      if (error.response.data.code === 1 && error.response.data.message === '身份认证失败') {
        // 说明用户使用了假token、过期的token
        localStorage.removeItem('token');
        location.href = './login.html';
      } 
    }
    return Promise.reject(error);
  }
);