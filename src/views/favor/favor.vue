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

      <div class="text">
        <h2>注册身份</h2>
        <p>请在下方选择一种身份证明并开始注册申请您的数字身份</p>
      </div>
    
        <div class="register">
            <van-grid :column-num="1">
                <van-grid-item>
                    <van-button type="primary" 
                        icon="https://pic.onlinewebfonts.com/svg/img_451571.png" 
                        color="#fcded9" round
                        :icon-size="24" :icon-position="left" :size="size"
                        @click="goToId">
                        {{ identityCard }}
                    </van-button>
                    <router-view></router-view>
                </van-grid-item>

                <van-grid-item>
                    <van-button type="primary" 
                        icon="https://upload.wikimedia.org/wikipedia/zh/2/2e/Donghua_University_logo.svg" 
                        color='#e4cfb4' round
                        :icon-size="24" :icon-position="left" :size="size"
                        @click="goToSt">
                        {{ studentStatus }}
                    </van-button>
                </van-grid-item>

                <van-grid-item>
                    <van-button type="primary" 
                        icon="https://sbcovid19.com/wp-content/uploads/sites/41/2021/09/Vaccination-Card-Website-Icon-Update-III-1024x1024.png" 
                        color='#c3dbc2' round
                        :icon-size="24" :icon-position="left" :size="size"
                        @click="goToVc">
                        {{ vaccinationCertificate }}
                    </van-button>
                </van-grid-item>

                <van-grid-item>
                    <van-button type="primary" 
                        icon="https://icon-library.com/images/credentials-icon/credentials-icon-12.jpg" 
                        color='#a7d1df' round
                        :icon-size="24" :icon-position="left" :size="size"
                        @click="goToCp">
                        {{ companyCertificate }}
                    </van-button>
                </van-grid-item>
            </van-grid>
        </div>
    </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: "favor",
  data() {
    return {
      size: 'large',
      identityCard: '身份证',
      studentStatus: '学籍证明',
      vaccinationCertificate: '疫苗接种证明',
      companyCertificate: '公司证明',
    };
  },
  methods:{
    goToId(){
      var user = JSON.parse(localStorage.getItem("user"))
      var token = user ? user.token : null;
      console.log(user)
      if (!token){
        this.$router.replace('/login')
      }else{
        this.$router.replace('/successID')
      }
    },
    goToSt(){
      var user = JSON.parse(localStorage.getItem("user"))
      var token = user ? user.token : null;
      // console.log(token)
      if (!token){
        this.$router.replace('/login')
      }else{
        this.$router.replace('/successStudent')
      }
    },
    goToVc(){
      var user = JSON.parse(localStorage.getItem("user"))
      var token = user ? user.token : null;
      // console.log(token)
      if (!token){
        this.$router.replace('/login')
      }else{
        this.$router.replace('/successVc')
      }
    },
    goToCp(){
      var user = JSON.parse(localStorage.getItem("user"))
      var token = user ? user.token : null;
      // console.log(token)
      if (!token){
        this.$router.replace('/login')
      }else{
        this.$router.replace('/successCompany')
      }
    }
  }
});
</script>

<style>
.register {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60vh; /*设置父元素高度为 viewport 的高度*/
}

.text {
  text-align: center; /* 水平居中 */
  display: flex; /* 使用 flex 布局 */
  flex-wrap: wrap; /* 自动换行 */
  justify-content: center; /* 垂直居中 */
  align-items: center; /* 垂直居中 */
  flex-direction: column;
  font-family: "Microsoft YaHei"; /* 设置字体 */
  margin: 25px;
  margin-top: 50px;
}

.text p {
  font-size: 18px; /* 设置字体大小 */
  font-family: "Microsoft YaHei"; /* 设置字体 */
  margin-top: 30px;
}


</style>