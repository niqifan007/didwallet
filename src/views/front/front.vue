<template>
    <div id="app">
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
      <div class="content">
        <van-tabs v-model="active" sticky>
          <van-tab title="数字身份">
            <van-grid clickable column-num="2" border="false">
              <van-grid-item
                v-for="(card, index) in cards"
                :key="index"
                @click="selectCard(index)"
              >
                <img :src="card.image" :alt="card.title"/>
                <span>{{ card.title }}</span>
              </van-grid-item>
            </van-grid>
          </van-tab>
          <van-tab title="详细信息" v-if="selectedCard">
            <h2>{{ selectedCard.title }}</h2>
            <img :src="selectedCard.image" :alt="selectedCard.title" />
            <van-cell-group inset>
              <van-cell
                v-for="(value, key) in selectedCard.data"
                :key="key"
                :title="key"
                :value="value"
              />
            </van-cell-group>
          </van-tab>
        </van-tabs>
      </div>
    </div>
  </template>
  
  <script>
  import { ref } from "vue";
  import {
    NavBar,
    Grid,
    GridItem,
    Tabs,
    Tab,
    Cell,
    CellGroup,
  } from "vant";
  
  export default {
    components: {
      [NavBar.name]: NavBar,
      [Grid.name]: Grid,
      [GridItem.name]: GridItem,
      [Tabs.name]: Tabs,
      [Tab.name]: Tab,
      [Cell.name]: Cell,
      [CellGroup.name]: CellGroup,
    },
    setup() {
      const cards = ref([
        {
          title: "身份证",
          image: "https://pic.onlinewebfonts.com/svg/img_451571.png",
          data: {
            名字: "赵日天",
            生日: "01/01/1990",
            国家: "CHN",
            地区: "Shanghai",
          },
        },
        {
          title: "学籍证明",
          image: "https://upload.wikimedia.org/wikipedia/zh/2/2e/Donghua_University_logo.svg",
          data: {
            名字: "赵日天",
            专业: "计算机科学与技术",
            大学: "东华大学",
            Year: "2015",
          },
        },
        {
          title: "疫苗接种证明",
          image: "https://sbcovid19.com/wp-content/uploads/sites/41/2021/09/Vaccination-Card-Website-Icon-Update-III-1024x1024.png",
          data: {
            名字: "赵日天",
            接种疫苗: "Pfizer-BioNTech COVID-19 Vaccine",
            日期: "01/02/2021",
            接种地点: "Health Center A",
          },
        },
        {
          title: "公司证明",
          image: "https://icon-library.com/images/credentials-icon/credentials-icon-12.jpg",
          data: {
            名字: "赵日天",
            公司: "Baidu",
            职位: "软件工程师",
            开始日期: "01/03/2021",
          },
        },
      ]);
  
      const selectedCard = ref(null);
  
      const active = ref(0);
  
      const selectCard = (index) => {
        selectedCard.value = cards.value[index];
        active.value = 1;
      };
  
      return {
        cards,
        selectedCard,
        active,
        selectCard,
      };
    },
  };
  </script>
  
  <style scoped>
  .content {
    position: relative; /* Add this line */
    margin-bottom: 50px; /* Increase this value if your NavBar is taller than 50px */
  }
  
  .content h2 {
    text-align: center;
  }
  
  .content img {
    width: 100%;
  }
  </style>
  
  