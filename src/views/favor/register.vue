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

      <van-nav-bar
        title="注册"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
        />

    <div class="register-container">
        <h2 style="margin-bottom: 45px; margin-left: 5px; font-size: 27px">
            <span style="color: #ff8c00">现在就</span>
            <span style="color: #f4a460">注册!</span>
        </h2>
      <van-cell-group>
        <van-field
          v-model="registerForm.email"
          label="邮箱"
          placeholder="请在此输入邮箱地址"
        />
        <van-field
          v-model="registerForm.password"
          label="密码"
          placeholder="请在此输入密码"
          type="password"
        />
        <van-field
          v-model="registerForm.confirmPassword"
          label="确认密码"
          placeholder="请确认密码"
          type="password"
        />
        <van-button type="primary" @click="register" size="large" round style="margin-top: 25px">注册</van-button>
      </van-cell-group>
    </div>
</div>
  </template>
  
  <script>
  import { ref } from 'vue';
  import { Toast } from 'vant';
  import axios from 'axios';
  
  export default {
    name: 'RegisterPage',
    data() {
      return {
        registerForm:{
          email: '',
          password: '',
          confirmPassword: '',
        }
      }
    },
    methods: {
        onClickLeft(){
          this.$router.replace("/login");
        },
        register(){
          if (this.registerForm.password == this.registerForm.confirmPassword){
            axios.put('/user/register', 
                  {
                    email: this.registerForm.email, 
                    password: this.registerForm.password
                  }).then(res =>{
              console.log(res);
              if (res.data.code === 1){
                Toast.success('注册成功！');
                this.$router.replace("/login");
              }else{
                Toast.fail(res.data.msg);
              }
            
            } )
          }else{
            Toast.fail("两次密码输入不一致！");
          }
        }
    },
  };
  </script>
    <style>
    .register-container{
      display: flex;
      justify-content: center;
      align-items: center;
      height: 75vh; /*设置父元素高度为 viewport 的高度*/
      text-align: center; /* 水平居中 */
      flex-direction: column;
    }
    </style>
  