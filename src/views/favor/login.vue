<template>
    <div>
        <van-nav-bar
        title="身份钱包"
        left-text="Back"
        left-arrow
        fixed
        placeholder
      >
        <template #left>
          <img src="https://cdn.freebiesupply.com/logos/large/2x/auth0-logo-png-transparent.png" alt="Auth0 logo" width="20"/>
        </template>
      </van-nav-bar>

    <div class="login-container" style="border: 1px solid #ccc; background-color: #ffffff; padding: 10px;;">
      <img src="https://cdn.freebiesupply.com/logos/large/2x/auth0-logo-png-transparent.png" style="width: 100px; margin-bottom:50px;"/>
      <h2 style="margin-bottom: 25px; font-size: 25px">
        <span style="color: #ff8c00">欢迎</span>
        <span style="color: #f4a460">回来!</span>
      </h2>
      <van-cell-group>
        <van-field
          v-model="loginForm.email"
          label="邮箱"
          placeholder="请在此输入邮箱账号"
        />
        <van-field
          v-model="loginForm.password"
          label="密码"
          placeholder="请在此输入密码"
          type="password"
        />
        <van-button type="primary" @click="login" size="large" round>登录</van-button>
        <van-divider>或者（没有账户？注册一个）</van-divider>
        <van-button type="default" @click="$router.replace('/register')" size="large" round>注册</van-button>
      </van-cell-group>
    </div>
</div>
  </template>
  
  <script>
  import { ref } from 'vue';
  import { Toast } from 'vant';
  import axios from 'axios';
  
  export default {
    name: 'LoginPage',
    data(){
      return{
        loginForm:{
          email: '',
          password: '',
        }
      }
    },
    methods: {
      login(){
        // console.log(loginForm);
        axios.post('/user/login', this.loginForm).then(res =>{
          console.log(res);
          if (res.data.code === 1){
            Toast.success('登录成功！');

            localStorage.setItem('user', JSON.stringify(res.data.data));
            console.log(JSON.stringify(res.data.data));

            this.$router.replace("/favor");
          }else{
            Toast.fail(res.data.msg);
          }
        })
      }
    },
  };
  </script>

  <style>
  .login-container{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 85vh; /*设置父元素高度为 viewport 的高度*/
    text-align: center; /* 水平居中 */
    flex-direction: column;
  }
  </style>
  