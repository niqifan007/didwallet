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
        title="公司证明"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
        />
        
        <div>
            <van-notice-bar :scrollable="false">
                注册完成，以下为您的公司信息，请确认！
            </van-notice-bar>
            <div style="display: flex; justify-content: center;">
                <van-image
                    round
                    width="130"
                    height="130"
                    fit="contain"
                    src="https://icon-library.com/images/credentials-icon/credentials-icon-12.jpg" 
                />
            </div>
        </div>
        
        <van-cell-group>
            <van-cell title="姓名" icon="user-circle-o">
                {{name}}
            </van-cell>
            <van-cell title="公司" icon="hotel-o">
                {{company}}
            </van-cell>
            <van-cell title="职位" icon="friends-o">
                {{position}}
            </van-cell>
            <van-cell title="开始日期" icon="clock-o">
                {{timeValue}}
            </van-cell>
        </van-cell-group>

        <div class="button">
            <van-button type="danger" round style="width: 30%;flex: 1;" @click="refuse">拒绝</van-button>
            <van-button type="primary" round style="width: 30%;flex: 1;" @click="accept">接受</van-button>
        </div>
        
    </div>
    
  </template>
  
  <script>
  import axios from 'axios';
  import { Toast } from 'vant';

  export default {
    data() {
      return {
        value: '',
        name: '',
        company: '',
        position: '',
        timeValue: ''
      }
    },
    methods: {
        onClickLeft() {
          this.$router.replace("/favor");
        },
        refuse(){
            //拒绝，回到注册界面
            this.$router.replace("/favor");
        },
        accept(){
            //接受并保存到数据库
            var user = JSON.parse(localStorage.getItem("user"))
            var email = user.email
            axios.get('/information/update?activeId=' + 4 + '&email=' + email).then(res => {
                Toast.success(res.data);
                this.$router.replace("/front");
            })
        },
    },
    mounted() {
        var user = JSON.parse(localStorage.getItem("user"))
        var email = user.email
        axios.get('/information/' + email).then(res => {
            this.name = res.data.data.name
            this.timeValue = res.data.data.joinedDate
            this.company = res.data.data.company
            this.position = res.data.data.position
        })
 
    },

  }
  </script>
  
<style>
.button{
    display: flex; 
    justify-content: space-between; 
    align-items: center;
    margin-top: 50px;
}
</style>