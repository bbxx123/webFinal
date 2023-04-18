<!--
 * @Author: Chai chai 2787922490@qq.com
 * @Date: 2022-11-09 20:41:58
 * @LastEditors: fengyuanyao fengyuanyao@fanyu.com
 * @LastEditTime: 2023-04-18 10:39:02
 * @FilePath: \毕设\webFinal\src\components\cardView\index.vue
 * @Description: 
 * 
 * Copyright (c) 2022 by Chai chai 2787922490@qq.com, All Rights Reserved. 
-->
<template>
  <div class="card-warp">
    <div class="content">
      <div class="cover">
        <img :src="imgUrl" alt=""/>
      </div>
    </div>
    <div class="mask" >
      <div class="description">
        <div class="name">
          {{ name }}
        </div>
        <div class="bio">
          {{ selfContent }}
        </div>
        <el-button plain style="margin-top:40px" @click="topOneClick()">查看详情👉</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    teams: {
      type:Array,
      require:true
    },
    imgUrl: {
      required: true,
    },
    name: {
      required: true,
    },
    selfContent: {
      require: true,
    },
    tags: {
      type: Array,
      require: true,
    },
  },
  methods:{
    topOneClick(){
      this.$router.push(`/paper/item/${this.teams[0].id}`);
    }
  }
};
</script>

<style lang="scss" scoped>
.card-warp {
  overflow: hidden;
  background-color: #ccc;
  margin-bottom: 20px;
  // filter: grayscale(1);
  position: relative;
  box-sizing: border-box;
  border-radius: 5px;
  &:hover {
    filter: unset;
    cursor: pointer;
    .mask {
      height: 100%;
      display: flex;
      justify-content: space-around;
      flex-direction: column;
    }
  }
  .content {
    height: 100%;
    .cover {
      height: 100%;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }
  .mask {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 0;
    transition: height 0.3s;
    backdrop-filter: blur(20px);
    background: rgba(39, 139, 255, 0.7);
    .name {
      color: #fff;
      font-size: 25px;
      font-weight: 600;
      padding: 15px;
      .line {
        width: 40px;
        height: 6px;
        // background-image: linear-gradient(to right, #71b7fe, #1c81ff);
        margin-top: -6px;
      }
    }
    .tags {
      margin: 0 15px;
      display: flex;
      flex-wrap: wrap;
      .tag {
        font-size: 14px;
        font-weight: normal;
        padding: 5px 10px;
        background-image: linear-gradient(to right, #71b7fe, #1c81ff);
        border-radius: 5px;
        margin-top: 10px;
        margin-right: 5px;
      }
    }
    .bio {
      color: #fff;
      word-wrap: break-word;
      line-height: 1.5;
      padding: 15px;
      font-size: 18px;
      text-align: justify;
      text-align-last: left;
    }
  }
}
</style>
