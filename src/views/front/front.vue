<template>
  <div id="app">
    <van-nav-bar title="身份钱包" left-text="Back" left-arrow fixed placeholder>
      <template #left>
        <img src="https://cdn.freebiesupply.com/logos/large/2x/auth0-logo-png-transparent.png" alt="Auth0 logo"
          width="20" />
      </template>
    </van-nav-bar>
    <div>
      <div class="card" @click="expandCard" v-if="IdData.idActive === 1" :class="{ 'card-expanded': isExpanded }">
        <article>
          <figure>
            <img src="https://pic.onlinewebfonts.com/svg/img_451571.png" alt="">
          </figure>
          <h2>{{ IdData.type }}</h2>
        </article>
      </div>
      <div v-show="isExpanded" class="card-back" @click="expandCard2">
        <div class="cardlit">
          <div v-if="!isExpandedlit">
            <p>{{ IdData.name }}</p>
            <p>{{ IdData.birthday }}</p>
            <p>{{ IdData.area }}</p>
            <p>{{ IdData.country }}</p>
          </div>
          <div v-if="isExpandedlit" class="scrollable-content">
            <p>{{ IdData.did }}</p>
          </div>
        </div>
      </div>
    </div>
    <div>
      <div class="card" @click="expandCardSTU" v-if="StuVcard.stActive === 1" :class="{ 'card-expanded': isExpandedSTU }">
        <article>
          <figure>
            <img src="https://upload.wikimedia.org/wikipedia/zh/2/2e/Donghua_University_logo.svg" alt="">
          </figure>
          <h2>{{ StuVcard.type }}</h2>
        </article>
      </div>
      <div v-show="isExpandedSTU" class="card-back" @click="expandCardSTU2">
        <div class="cardlit">
          <div v-if="!isExpandedSTU2">
            <p>{{ StuVcard.name }}</p>
            <p>{{ StuVcard.speciality }}</p>
            <p>{{ StuVcard.university }}</p>
            <p>{{ StuVcard.enrollmentYear }}</p>
          </div>
          <div v-if="isExpandedSTU2" class="scrollable-content">
            <p>{{ StuVcard.did }}</p>
          </div>
        </div>
      </div>
    </div>
    <div>
      <article id="plus">
        <figure>
          <router-link to="/favor">
            <img src="https://img.icons8.com/?size=512&id=114100&format=png" alt="">
          </router-link>
        </figure>
      </article>
    </div>
  </div>
</template>
  
<script>
import axios from 'axios';
export default {
  data() {
    return {
      isExpanded: false,
      isExpandedlit: false,
      isExpandedSTU: false,
      isExpandedSTU2: false,
      IdData: {
        type: "身份证",
        name: "",
        timeValue: "",
        country: "",
        area: "",
        birthday: "",
        idActive: 0,
        did: ""
      },
      StuVcard: {
        type:'学籍证明',
        value: '',
        name: '',
        speciality: '',
        university: '',
        enrollmentYear: '',
        stActive: 0,
        did: ''
      },
    }
  },
  methods: {
    // 点击展开更多
    expandCard() {
      this.isExpanded = !this.isExpanded;
    },
    expandCard2() {
      this.isExpandedlit = !this.isExpandedlit;
    },
    expandCardSTU() {
      this.isExpandedSTU = !this.isExpandedSTU;
    },
    expandCardSTU2() {
      this.isExpandedSTU2 = !this.isExpandedSTU2;
    },
    // 异步获取数据
    async fetchUserIDInformation(email) {
      try {
        const { data } = await axios.get(`/information/${email}`);
        const { name, speciality, university, enrollmentYear, stActive, did } = data.data;
        this.StuVcard.name = name;
        this.StuVcard.speciality = speciality;
        this.StuVcard.university = university;
        this.StuVcard.enrollmentYear = enrollmentYear;
        this.StuVcard.stActive = stActive;
        this.StuVcard.did = did;
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    },
    async fetchUserStuInformation(email) {
      try {
        const { data } = await axios.get(`/information/${email}`);
        const { name, birthday, country, area, idActive, did } = data.data;
        this.IdData.name = name;
        this.IdData.birthday = birthday;
        this.IdData.country = country;
        this.IdData.area = area;
        this.IdData.idActive = idActive;
        this.IdData.did = did;
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    }
  },
  mounted() {
    var user = JSON.parse(localStorage.getItem("user"))
    // console.log(user.token);
    var email = user.email
    this.fetchUserIDInformation(email)
    this.fetchUserStuInformation(email)
  },
};
</script>
  
<style scoped>
* {
  box-sizing: border-box;
  margin-bottom: 25px;
}

html {
  font-family: sans-serif;
  font-weight: 300;
  color: hsl(0 0% 15%);
}

h2 {
  font-weight: 400;
  margin: auto 0 0;
  padding-left: 40%;
}

h1 {
  position: fixed;
  right: 1rem;
  bottom: 1rem;
  opacity: 0.5;
  margin: 0;

}

.scrollable-content {
  width: 100%;
  /* 或你需要的宽度 */
  height: 300px;
  /* 或你需要的高度 */
  overflow: auto;
  /* 添加滚动条 */
}

.cardlit p {
  display: block;
  margin-bottom: 10px;
  /* 添加底部外边距 */
  padding: 5px;
  /* 添加内边距 */
}

body {
  display: grid;
  place-items: center;
  min-height: 100vh;
}

figure {
  width: 90%;
  aspect-ratio: 8 / 5;
  --bg: hsl(200 80% calc(90% - (var(--hover) * 10%)));
  --accent: hsl(202, 83%, 50%);
  transition: background 0.2s;
  background:
    radial-gradient(circle at top left, var(--accent), transparent 75%),
    var(--bg);
  margin: auto;
  position: relative;
  overflow: hidden;
  border-radius: 1.5rem;
}

#plus figure {
  width: 90%;
  aspect-ratio: 8 / 5;
  --bg: hsl(99 80% calc(90% - (var(--hover) * 10%)));
  --accent: hsl(118, 97%, 75%);
  transition: background 0.2s;
  background:
    radial-gradient(circle at top left, var(--accent), transparent 75%),
    var(--bg);
  margin: auto;
  position: relative;
  overflow: hidden;
  border-radius: 1.5rem;
}



figure:after {
  content: "";
  position: absolute;
  width: 20%;
  aspect-ratio: 1;
  border-radius: 50%;
  bottom: 0%;
  left: 10%;
  background: linear-gradient(-65deg, var(--bg) 50%, var(--accent) 50%);
  filter: blur(25px);
  transform:
    translateX(calc(var(--hover) * 15%)) scale(calc(1 + (var(--hover) * 0.2)));
  transition: transform 0.2s, background 0.2s;
}

#plus figure:after {
  content: "";
  position: absolute;
  width: 20%;
  aspect-ratio: 1;
  border-radius: 50%;
  bottom: 0%;
  left: 10%;
  background: linear-gradient(-65deg, var(--bg) 50%, var(--accent) 50%);
  filter: blur(25px);
  transform:
    translateX(calc(var(--hover) * 15%)) scale(calc(1 + (var(--hover) * 0.2)));
  transition: transform 0.2s, background 0.2s;
}

img {
  position: absolute;
  left: 30%;
  top: 25%;
  width: 40%;
  transform:
    translateX(calc(var(--hover) * -20%)) scale(calc(1 + (var(--hover) * 0.2)));
  transition: transform 0.2s;
}

article {
  --hover: 0;
}

article:hover {
  --hover: 1;
}

.cardlit {
  margin: 0 auto;
  box-sizing: border-box;
  width: 190px;
  height: 254px;
  background: rgba(217, 217, 217, 0.58);
  border: 1px solid white;
  box-shadow: 12px 17px 51px rgba(0, 0, 0, 0.22);
  backdrop-filter: blur(6px);
  border-radius: 17px;
  text-align: center;
  cursor: pointer;
  transition: all 0.5s;
  display: flex;
  flex-direction: column;
  /* 添加这一行 */
  align-items: center;
  justify-content: center;
  user-select: none;
  font-weight: bolder;
  color: black;
}

.cardlit:hover {
  border: 1px solid black;
  transform: scale(1.05);
}

.cardlit:active {
  transform: scale(0.95) rotateZ(1.7deg);
}
</style>
  
  