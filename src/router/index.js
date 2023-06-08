/*
 * @Author: waka 923325372@qq.com
 * @Date: 2022-10-07 19:57:07
 * @LastEditors: waka 923325372@qq.com
 * @LastEditTime: 2022-10-10 01:22:02
 * @FilePath: \trip-demo\src\router\index.js
 * @Description:  
 * 
 * Copyright (c) 2022 by waka 923325372@qq.com, All Rights Reserved. 
 */
import login from "@/views/favor/login.vue";
import register from "@/views/favor/register.vue";
import successID from "@/views/favor/success/successID.vue";
import successStudent from "@/views/favor/success/successStudent.vue";
import successVc from "@/views/favor/success/successVc.vue";
import successCompany from "@/views/favor/success/successCompany.vue";
import { createRouter,createWebHashHistory  } from "vue-router";
import jwtDecode from "jwt-decode";


const router = createRouter({
    history: createWebHashHistory(),
    // 映射关系 path -> component
    routes:[
        {
            path: "/",
            redirect: "/front"
        },
        // {
        //     path: "/home",
        //     component: () => import("@/views/home/home.vue")
        // },
        {
            path: "/front",
            component: () => import("@/views/front/front.vue")
        },
        {
            path: "/order",
            component: () => import("@/views/order/order.vue")
        },
        {
            path: "/message",
            component: () => import("@/views/message/message.vue")
        },
        {
            path: "/favor",
            component: () => import("@/views/favor/favor.vue")
        },
        {
            path: "/login",
            component: login
        },
        {
            path: "/register",
            component: register
        },
        {
            path: "/successID",
            component: successID
        },
        {
            path: "/successStudent",
            component: successStudent
        },
        {
            path: "/successVc",
            component: successVc
        },
        {
            path: "/successCompany",
            component: successCompany
        },
        {
            path: "/city",
            component: () => import("@/views/city/city.vue"),
            // meta: {
            //     hideTabBar: true
            // }
        },
        {
            path: "/search",
            component: () => import("@/views/search/search.vue"),
            meta: {
                hideTabBar: true
            }
        },
        {
            path: "/detail/:id",
            component: () => import("@/views/detail/detail.vue"),
            
        }

    ]
})

// router.beforeEach((to, from, next) => {
//     var token = JSON.parse(localStorage.getItem("user"))
//     // console.log(token.token);
//     if (token.token && !isTokenExpired(token.token)) {
//       // token 未过期，可以直接进入
//       next()
//     } else {
//       // token 过期了，需要重新登录
//       // 重新登录的操作可以根据具体情况来实现
//       // 更新本地的 token
//     //   localStorage.setItem('user', newToken)
//       next('/login')
//     }
//   })
  
//   function isTokenExpired(token) {
//     const decodedToken = jwtDecode(token)
//     const now = Date.now() / 1000
//     return now > decodedToken.exp
//   }
  

export default router