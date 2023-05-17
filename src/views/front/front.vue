<template>
  <div id="app">
    <van-nav-bar title="身份钱包" left-text="Back" left-arrow fixed placeholder>
      <template #left>
        <img src="https://cdn.freebiesupply.com/logos/large/2x/auth0-logo-png-transparent.png" alt="Auth0 logo"
          width="20" />
      </template>
    </van-nav-bar>
    <div class="card" @click="expandCard" :class="{ expanded: isExpanded }">
      <article>
        <figure>
          <img src="https://pic.onlinewebfonts.com/svg/img_451571.png" alt="">
        </figure>
        <h2>{{ cards[0].title }}</h2>
        <div v-show="isExpanded" class="card-back">
          <p> {{ cards[0].data.名字 }}</p>
          <p>{{ cards[0].data.生日 }}</p>
          <p>{{ cards[0].data.地区 }}</p>
        </div>
      </article>
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
import { ref, onMounted } from "vue";

export default {
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

    const cardData = ref(null);
    const isExpanded = ref(false);

    const fetchData = async () => {
      const res = await fetch('your-api-url');
      const data = await res.json();
      cardData.value = data;
    };

    const expandCard = () => {
      isExpanded.value = !isExpanded.value;
    };

    onMounted(fetchData);

    return {
      cards,
      cardData,
      isExpanded,
      expandCard
    };
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
  padding-left: 25%;
}

h1 {
  position: fixed;
  right: 1rem;
  bottom: 1rem;
  opacity: 0.5;
  margin: 0;

}

p {
  margin: 0;
  padding-left: 25%;
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

</style>
  
  