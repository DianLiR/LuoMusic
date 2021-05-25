'use strict'

import Vue from 'vue'
import axios from 'axios'

// Full config:  https://github.com/axios/axios#request-config
// axios.defaults.baseURL = process.env.baseURL || process.env.apiUrl || '';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

let config = {
  baseURL: 'https://music.keuaile75.top',
  // baseURL: ' http://192.168.54.2:3000'
  // baseURL: ' http://localhost:3000'
  withCredentials: true
  // headers: {
  // 'Content-Type': 'application/json;charset=UTF-8' //表单数据传递转化
  // }
  // timeout: 60 * 1000, // Timeout
  // headers: { "Content-Type":"application/json;charset=UTF-8" //表单数据传递转化}
  // withCredentials: true, // Check cross-site Access-Control
}

const _axios = axios.create(config)

_axios.interceptors.request.use(
  config => {
    // 在发送请求之前先做点事
    return config
  },
  error => {
    console.log('🚀 ~ error', error)
    // 做一些请求错误
    return Promise.reject(error)
  }
)

// 添加响应拦截器
_axios.interceptors.response.use(
  function(response) {
    // 对响应数据进行处理
    return response.data
  },
  function(error) {
    console.log('🚀 ~ error', error)
    // 做一些响应错误
    return Promise.reject(error)
  }
)

Plugin.install = function(Vue, options) {
  options
  Vue.axios = _axios
  window.axios = _axios
  Object.defineProperties(Vue.prototype, {
    axios: {
      get() {
        return _axios
      }
    },
    $axios: {
      get() {
        return _axios
      }
    }
  })
}

Vue.use(Plugin)

export default Plugin
