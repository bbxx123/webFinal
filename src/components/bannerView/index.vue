<!--
 * @Author: chaichai chaichai@cute.com
 * @Date: 2022-09-26 08:42:49
 * @LastEditors: fengyuanyao fengyuanyao@fanyu.com
 * @LastEditTime: 2023-04-18 17:01:09
 * @FilePath: \毕设\webFinal\src\components\bannerView\index.vue
 * @Description: 
 * 
 * Copyright (c) 2022 by CQUCC-4-433, All Rights Reserved. 
-->
<template>
  <div>
    <div
      class="bannerBox"
      :style="{ background: 'url(' + imgUrl + ')', backgroundSize: 'cover' }"
    >
      <div class="coverBox">
        <div class="navBox">
          <div class="topTitle">chaichai.top</div>
          <el-menu
          v-if="isShow"
            class="el-menu-demo"
            mode="horizontal"
            @select="handleSelect"
            collapse-transition
            background-color="#0000001D"
            text-color="#fff"
            menu-trigger="click"
          >
            <el-menu-item index="about">首页</el-menu-item>
            <el-menu-item index="blog">博客</el-menu-item>
            <el-menu-item index="watch">浏览记录</el-menu-item>
            <el-submenu index="2">
              <template slot="title">友链</template>
              <el-menu-item index="2-1" class="friendList"
                ><img src="@/assets/baimeng.png" alt="" class="friendIco" /><a
                  href="https://marrydream.top/"
                  style="color: #fff"
                  >百梦</a
                ></el-menu-item
              >
              <el-menu-item index="2-2" class="friendList">
                <a href="#" style="color: #fff">虚位以待~</a>
              </el-menu-item>
            </el-submenu>
          </el-menu>
        </div>
        <div class="centerTile">{{ titleName }}</div>
        <div class="icon">﹀</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "bannerView",
  props: {
    imgUrl: {
      required: true,
    },
    titleName: {
      required: true,
    },
  },
  created() {
    this.$route.path.split("/")[2] === 'root' ? this.isShow = false : this.isShow = true
  },
  data() {
    return {
      isShow:true,
      activeIndex: "1",
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      this.$router.push(`/${key}`);
      // console.log(key, keyPath);
    },
  },
};
</script>

<style lang="scss">
.bannerBox {
  width: 100vw;
  height: 100vh;
  background-size: cover;
  overflow: hidden;
}
.coverBox {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);

  .navBox {
    height: 60px;
    display: flex;
    flex-wrap: nowrap;
    line-height: 60px;
    justify-content: space-between;
    padding: 20px 35px 0 35px;

    .topTitle {
      width: 300px;
      text-align: left;
      color: #fff;
      font-size: 38px;
      font-weight: 900;
      text-transform: uppercase;
    }
    .el-menu {
      background-color: rgb(0, 0, 0, 0) !important;
      border: 0px;
    }

    .el-menu-item {
      font-size: 18px;
      font-weight: 600;
      background-color: rgb(0, 0, 0, 0) !important;
    }
    .el-submenu__title {
      font-size: 18px !important;
      font-weight: 600;
      background-color: rgb(0, 0, 0, 0) !important;
    }
  }
  .centerTile {
    width: 100%;
    line-height: 70vh;
    color: #fff;
    font-size: 38px;
    font-weight: 900;
    letter-spacing: 8px;
  }
  .icon {
    margin-top: 30px;
    z-index: 99999;
    font-weight: 900;
    font-size: 35px;
    color: #fff;
  }
}
</style>
<style>
.friendIco {
  display: inline-block;
  width: 25px;
  margin: 0 3px;
  vertical-align: middle;
}
.friendList {
  height: 80px !important;
  line-height: 80px !important;
  margin: 5px auto;
  text-align: center;
}
</style>