/*
 * @Author: waka 923325372@qq.com
 * @Date: 2022-10-07 19:19:17
 * @LastEditors: waka 923325372@qq.com
 * @LastEditTime: 2022-10-07 20:17:50
 * @FilePath: \trip-demo\src\main.js
 * @Description:  
 * 
 * Copyright (c) 2022 by waka 923325372@qq.com, All Rights Reserved. 
 */

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import pinia from './stores'
import Vant from 'vant';
import axios from 'axios'

import "normalize.css"
import 'vant/lib/index.css'
import "./assets/css/index.css"

axios.defaults.baseURL = 'http://localhost:8081' // 设置请求的基础URL
axios.defaults.withCredentials = true // 允许携带cookie
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'
// 发送请求时将token值设置到请求头中
axios.interceptors.request.use(
    config => {
        var user = JSON.parse(localStorage.getItem("user"))
        var token = user ? user.token : null;
      if (token) {
        config.headers['token'] = token
      }
      return config
    },
    error => {
      return Promise.reject(error)
    }
  )


const app = createApp(App)

app.config.globalProperties.$axios = axios // 把 axios 实例挂载到全局
app.use(router).use(pinia).use(Vant).mount('#app')
