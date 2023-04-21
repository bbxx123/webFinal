/*
 * @Author: Chai chai 2787922490@qq.com
 * @Date: 2023-02-05 19:10:57
 * @LastEditors: fengyuanyao fengyuanyao@fanyu.com
 * @LastEditTime: 2023-04-18 17:00:54
 * @FilePath: \毕设\webFinal\src\router\index.js
 * @Description: 
 * 
 * Copyright (c) 2023 by Chai chai 2787922490@qq.com, All Rights Reserved. 
 */
/*
 * @Author: chaichai chaichai@cute.com
 * @Date: 2022-09-26 08:29:56
 * @LastEditors: chaichai chaichai@cute.com
 * @LastEditTime: 2022-10-09 15:01:15
 * @FilePath: \blog3.0\src\router\index.js
 * @Description: 
 * 
 * Copyright (c) 2022 by CQUCC-4-433, All Rights Reserved. 
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: {
      title: '柴の博客 | 柴的个人博客'
    }
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/FirstView/FirstView.vue'),
    meta: {
      title: '首页 | 柴的个人博客'
    }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/LoginView/index.vue'),
    meta: {
      title: '登录 | 柴的个人博客'
    }
  },
  {
    path: '/adminLogin',
    name: 'adminLogin',
    component: () => import('../views/AdminLoginView/index.vue'),
    meta: {
      title: '管理员登录 | 柴的个人博客'
    }
  },
  {
    path: '/regest',
    name: 'regest',
    component: () => import('../views/RegestView/index.vue'),
    meta: {
      title: '注册 | 柴的个人博客'
    }
  },
  {
    path: '/blog',
    name: 'blog',
    component: () => import('../views/BlogView/BlogView.vue'),
    meta: {
      title: '博客 | 柴的个人博客'
    }
  },
  {
    path: '/watch',
    name: 'watch',
    component: () => import('../views/watchView/index.vue'),
    meta: {
      title: '浏览记录 | 柴的个人博客'
    }
  },
  {
    path: '/paper',
    name: 'paper',
    component: () => import('../views/BlogItemView/index.vue'),
    meta: {
      title: '文章 | 柴的个人博客'
    }
  },
  {
    path: '/writePaper',
    name: 'writePaper',
    component: () => import('../views/Back1View/BackView.vue'),
    meta: {
      title: '发布文章 | 柴的个人博客'
    }
  },
  {
    path: '/back',
    name: 'back',
    component: () => import('../views/BackView/index.vue'),
    meta: {
      title: '后台 | 柴的个人博客'
    },
    children: [
      {
        path: '/userRoot',
        component: () => import('../views/BackView/components/userRoot.vue'),
        meta: {
          title: '账号管理 | 柴的个人博客'
        },
      },
      {
        path: '/inputRoot',
        component: () => import('../views/BackView/components/inputRoot.vue'),
        meta: {
          title: '评论管理 | 柴的个人博客'
        },
      },
      {
        path: '/integralRoot',
        component: () => import('../views/BackView/components/integralRoot.vue'),
        meta: {
          title: '积分管理 | 柴的个人博客'
        },
      },
      {
        path: '/noticeRoot',
        component: () => import('../views/BackView/components/noticeRoot.vue'),
        meta: {
          title: '发布公告 | 柴的个人博客'
        },
      },
      {
        path: '/noticeManageRoot',
        component: () => import('../views/BackView/components/noticeManageRoot.vue'),
        meta: {
          title: '公告管理 | 柴的个人博客'
        },
      },
      {
        path: '/processRoot',
        component: () => import('../views/BackView/components/processRoot.vue'),
        meta: {
          title: '文章审核 | 柴的个人博客'
        },
      },
      {
        path: '/authorRoot',
        component: () => import('../views/BackView/components/authorRoot.vue'),
        meta: {
          title: '作者推荐 | 柴的个人博客'
        },
      }
    ]
  },
  {
    path: '/paper/item/:id',
    name: 'paper',
    component: () => import('../views/BlogItemView/index.vue'),
    meta: {
      title: '文章详情 | 柴的个人博客'
    }
  },
  {
    path: '/404',
    name: '404',
    component: () => import('../views/404View.vue'),
    meta: {
      title: '404 | 柴的个人博客'
    }
  },

  { path: '*', redirect: '/404', hidden: true }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})

export default router