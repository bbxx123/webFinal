<!--
 * @Author: Chai chai 2787922490@qq.com
 * @Date: 2023-02-05 20:28:59
 * @LastEditors: fengyuanyao fengyuanyao@fanyu.com
 * @LastEditTime: 2023-04-20 15:31:12
 * @FilePath: \毕设\webFinal\src\views\BackView\index.vue
 * @Description: 
 * 
 * Copyright (c) 2023 by Chai chai 2787922490@qq.com, All Rights Reserved. 
-->
<template>
  <div class="bgBox1">
    <el-menu
      default-active="/userRoot"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      :collapse="isCollapse"
      :router="true"
      background-color="#393d49"
      text-color="#fff"
    >
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-user"></i>
          <span slot="title">博客后台</span>
        </template>
        <!-- <el-menu-item index="/userRoot" route="/userRoot"
          >用户管理</el-menu-item
        > -->
        <el-submenu index="2">
          <template slot="title">用户</template>
          <el-menu-item index="/userRoot">账号管理</el-menu-item>
          <el-menu-item index="/integralRoot">积分管理</el-menu-item>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title">公告</template>
          <el-menu-item index="/noticeRoot">发布公告</el-menu-item>
          <el-menu-item index="/noticeManageRoot">公告管理</el-menu-item>
        </el-submenu>
        <!-- <el-menu-item index="/inputRoot">公告管理</el-menu-item> -->
        <el-menu-item index="/processRoot">文章审核</el-menu-item>
        <el-menu-item index="/inputRoot">评论管理</el-menu-item>
        <el-menu-item index="/authorRoot">作者推荐</el-menu-item>
        <el-menu-item index="/">退出后台</el-menu-item>
      </el-submenu>
    </el-menu>
    <div class="contentBox">
      <transition
        class="auto-scroll"
        appear
        name="animate__animated animate__bounce"
        enter-active-class="animate__backInUp animate__slow"
        leave-active-class="animate__fadeOutDownBig contron"
      >
        <router-view></router-view>
      </transition>
    </div>
  </div>
</template>

<style>
.bgBox1 {
  display: flex;
  flex-wrap: nowrap;
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 12%;
  height: 100vh;
}

.contentBox {
  width: 88%;
}
</style>

<script>
export default {
  data() {
    return {
      isCollapse: false,
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      // console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      // console.log(key, keyPath);
    },
  },
};
</script>