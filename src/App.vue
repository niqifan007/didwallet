<!--
 * @Author: waka 923325372@qq.com
 * @Date: 2022-10-07 19:19:17
 * @LastEditors: waka 923325372@qq.com
 * @LastEditTime: 2022-10-24 15:42:44
 * @FilePath: \trip-demo\src\App.vue
 * @Description:  
 * 
 * Copyright (c) 2022 by waka 923325372@qq.com, All Rights Reserved. 
-->
<template>
    <div class="app">
        <router-view v-slot="props">
            <keep-alive include="front">
            <component :is="props.Component"></component>
            </keep-alive>
        </router-view>
        <tab-bar v-show="!route.meta.hideTabBar"/>
        <loading/>
        <!-- <tab-bar /> -->
    </div>
</template>

<script setup>

import TabBar from "@/components/tab-bar/tab-bar.vue"
import Loading from "@/components/loading/loading.vue"
import { useRoute } from "vue-router";


const route = useRoute()

</script>

<style lang="less" scoped>
#app {
  background-color: #f2f2f2;
  min-height: 100vh;
}
#app2 {
  background-color: #f2f2f2;
  height: 100vh;
}


</style>