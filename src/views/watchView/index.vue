<!--
 * @Author: chaichai chaichai@cute.com
 * @Date: 2022-09-26 08:29:56
 * @LastEditors: fengyuanyao fengyuanyao@fanyu.com
 * @LastEditTime: 2023-04-19 15:12:32
 * @FilePath: \毕设\webFinal\src\views\watchView\index.vue
 * @Description:  [CQUCC-4-433](https://github.com/4-433) 正在找寻志同道合的小伙伴，欢迎前端、后端、UI加入我们！
 * 
 * Copyright (c) 2022 by CQUCC-4-433, All Rights Reserved. 
-->

<template>
    <div class="aboutBox">
      <bannerView :imgUrl="this.img" :titleName="this.title" ref="banner"></bannerView>
      <div class="mainBox">
        <div class="peopleBg2">
          <div class="sendTitle"><i class="el-icon-view"></i>浏览记录：</div>
          <div class="peopleBox">
            <div class="essayBox"  v-if="essayList.length !== 0">
              <div class="essayItem" v-for="(item, index) in essayList" :key="index + 1" :style="{
                background: 'url(' + item.titleImgUrl + ')',
                backgroundSize: 'cover',
              }" @click="goCheckEssay(item)">
                <div class="essayShadow">
                  <div style="font-size: 35px; margin-top: 50px">
                    {{ item.title }}
                  </div>
                  <div style="color: #efefef; margin-top: 20px; height: 80px">
                    {{ item.titleKey }}
                  </div>
                  <div style="margin-bottom: 20px">作者: {{ item.auther }}</div>
                  <div>发布日期: {{ item.createTime }}</div>
                </div>
              </div>
            </div>
            <el-empty v-else description="暂无数据"></el-empty>
          </div>
        </div>
  
      <!-- <div class="contentBox">
          <div class="contentTitle">
            <div class="markdown-body">
              <markdown />
            </div>
          </div>
        </div>
        <div :class="locked ? 'asideBoxFix' : 'asideBox'">
            <div class="asideImg"> -->
        <!-- 头像 -->
      <!-- <el-avatar
                src="https://chaichaiimage.oss-cn-hangzhou.aliyuncs.com/blogimg/0d1b2cad168244918d2ee927bb664eb5.jpeg"
                :size="size"
                class="asidePic"
              ></el-avatar>
            </div>
            <div class="asideTile">柴</div>
            <div class="asideTile1">老爷保佑！前途无量！</div>
            <el-divider>🌴</el-divider> -->
        <!-- 侧边栏底部图片 -->
        <!-- <img src="@/assets/huli.gif" alt="" class="bottomImg" />
          </div> -->
        <div v-if="btnFlag" class="go-top" @click="backTop">
          <!-- 返回顶部图标 -->
          <img src="@/assets/backTop.png" alt="" class="backTopbtn" />
        </div>
      </div>
      <footerView></footerView>
    </div>
  </template>
  
  <script>
  import bannerView from "@/components/bannerView/index";
  import footerView from "@/components/footerView/index.vue";
  // md文件地址
  import markdown from "../home.md";
  import "highlight.js/styles/github.css";
  import "github-markdown-css";
  import { watchInfo } from "@/api/use";
  export default {
    name: "FirstView",
    components: { bannerView, markdown, footerView },
    mounted() {
      window.addEventListener("scroll", this.scrollToTop);
      this.$nextTick(() => {
        let $ele = this.$refs.banner;
        this.bannerH = $ele.$el.offsetHeight;
      });
      this.watchInfo()
    },
    destroyed() {
      window.removeEventListener("scroll", this.scrollToTop);
    },
    data() {
      return {
        essayList: [],
        //侧边栏头像大小
        size: 90,
        bannerH: 0,
        locked: false,
        btnFlag: false,
        //导航背景图片
        img: "http://chaichaiimage.oss-cn-hangzhou.aliyuncs.com/blog3.0/bg13.jpg",
        // 导航文字说明
        title: "浏览记录",
      };
    },
    methods: {
        watchInfo(){
            watchInfo().then(res=> {
                if(res.status === 200) {
                    this.essayList = res.data
                }
            })
        },
      goCheckEssay(item) {
        this.$router.push(`/paper/item/${item.id}`);
      },
      backTop() {
        const that = this;
        let timer = setInterval(() => {
          let ispeed = Math.floor(-that.scrollTop / 5);
          document.documentElement.scrollTop = document.body.scrollTop =
            that.scrollTop + ispeed;
          if (that.scrollTop === 0) {
            clearInterval(timer);
          }
        }, 16);
      },
      scrollToTop() {
        const that = this;
        let scrollTop =
          window.pageYOffset ||
          document.documentElement.scrollTop ||
          document.body.scrollTop;
        that.scrollTop = scrollTop;
        that.locked = that.btnFlag = that.scrollTop > that.bannerH;
        if (that.scrollTop > that.bannerH) {
          that.locked = true;
          that.btnFlag = true;
        } else {
          that.locked = false;
          that.btnFlag = false;
        }
      },
    },
  };
  </script>
  
  <style lang="scss" scoped>
  .sendTitle {
    padding-left: 30px;
    font-size: 20px;
    text-align: left;
    font-weight: 600;
    letter-spacing: 2px;
    margin-bottom: 20px;
    margin-top: 20px;
  }
  
  .sendBox {
    margin-top: 20px;
    padding-top: 20px;
    height: 150px;
    background: rgba($color: #d1d1d1, $alpha: 0.1);
    margin-bottom: 20px;
    position: relative;
    overflow: hidden;
  
    .sendContent {
      animation: rotaryBlockFirst 20s linear infinite;
      white-space: nowrap;
      position: absolute;
      font-size: 18px;
      letter-spacing: 1px;
    }
  
    .sendContent2 {
      animation: rotaryBlockSecond 20s linear infinite;
      white-space: nowrap;
      position: absolute;
      font-size: 18px;
      letter-spacing: 1px;
    }
  
    @keyframes rotaryBlockFirst {
      0% {
        left: 0;
      }
  
      100% {
        left: -100%;
      }
    }
  
    @keyframes rotaryBlockSecond {
      0% {
        left: 100%;
      }
  
      100% {
        left: 0;
      }
    }
  }
  
  .peopleBg {
    overflow: hidden;
    margin: 0 auto;
    width: 83%;
    padding: 0 60px;
    margin-bottom: 20px;
    background: #fff;
  
    .peopleBox {
      width: 29%;
      padding: 25px 0 25px 50px;
      margin-bottom: 15px;
      display: flex;
      flex-wrap: nowrap;
      box-shadow: 0 1px 10px rgb(0 0 0 / 10%);
      text-align: left;
      border-radius: 5px;
  
      .peopleItem {
        margin-top: 10px;
        margin-left: 60px;
        font-size: 17px;
      }
  
      .peopleItem2 {
        margin-left: 180px;
        font-size: 17px;
  
        .newsBox {
          border-radius: 5px;
          padding: 20px;
          text-align: center;
          cursor: pointer;
          display: inline-block;
          margin-left: 25px;
          background: rgba($color: #d1d1d1, $alpha: 0.1);
          border: 1px solid rgba($color: #d1d1d1, $alpha: 0.3);
        }
      }
  
      .peoplePic {
        width: 90px;
        height: 90px;
        border-radius: 50%;
        overflow: hidden;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
  
  .peopleBg2 {
    overflow: hidden;
    margin: 0 auto;
    width: 83%;
    padding: 0 60px;
    margin-top: 10px;
    border-radius: 25px;
    // display: flex;
    // flex-wrap: nowrap;
    margin-bottom: 15px;
    background: #fff;
  
    .essayBox {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
  
      .essayItem {
        cursor: pointer;
        border-radius: 5px;
        width: 580px;
        margin-bottom: 25px;
        height: 320px;
        background: pink;
      }
  
      .essayShadow {
        letter-spacing: 1px;
        overflow: hidden;
        border-radius: 5px;
        color: #fff;
        font-size: 19px;
        font-weight: 600;
        width: 100%;
        height: 100%;
        // position: absolute;
        // top: 0;
        // bottom: 0;
        background: rgba($color: #000000, $alpha: 0.3);
      }
    }
  }
  
  .aboutBox {
    height: 100%;
    // 背景图片
    background: url("@/assets/cover.jpg");
    background-repeat: no-repeat;
    background-size: 500px;
    background-position: 110% 100%;
    background-attachment: fixed;
  
    .mainBox {
      position: relative;
      width: 80%;
      margin: 0 auto;
      margin-top: 10px;
      box-shadow: 0 1px 10px rgb(0 0 0 / 10%);
      background-color: rgba($color: #1a1a1a, $alpha: 0.8);
      padding-bottom: 15px;
      overflow: hidden;
  
      .contentBox {
        width: 71%;
        background: #fff;
        box-shadow: 0 1px 10px rgb(0 0 0 / 10%);
        text-align: left;
        padding: 0 20px;
        margin-bottom: 30px;
      }
  
      .asideBoxFix {
        position: fixed;
        top: 0px;
        right: 286px;
        box-shadow: 0 1px 10px rgb(0 0 0 / 10%);
        width: 335px;
        //   height: 55vh;
        background: #fff;
  
        .el-avatar--circle {
          width: 100px !important;
          height: 100px !important;
        }
  
        .bottomImg {
          display: block;
          width: 100%;
        }
  
        .asideImg {
          position: relative;
          width: 100%;
          height: 140px;
          //侧边栏顶部图片--固定位置后
          background: url("http://chaichaiimage.oss-cn-hangzhou.aliyuncs.com/blog3.0/bg12.jpg");
          background-position: 0 -70px;
          background-size: cover;
  
          .asidePic {
            border: 4px solid rgb(241, 241, 241);
            position: absolute;
            margin: 0 auto;
            left: 50%;
            bottom: -38px;
            transform: translate(-50%);
          }
        }
  
        .asideTile {
          padding: 0 20px;
          color: rgb(51, 51, 51);
          margin-top: 45px;
          font-size: 20px;
          font-weight: 550;
          letter-spacing: 3px;
        }
  
        .asideTile1 {
          padding: 0 20px;
          color: rgb(51, 51, 51);
          margin-top: 10px;
          font-size: 20px;
          font-weight: 550;
          letter-spacing: 3px;
        }
      }
  
      .asideBox {
        position: absolute;
        top: 0;
        right: 0;
        box-shadow: 0 1px 10px rgb(0 0 0 / 10%);
        width: 25%;
        background: #fff;
  
        .el-avatar--circle {
          width: 100px !important;
          height: 100px !important;
        }
  
        .bottomImg {
          display: block;
          width: 100%;
        }
  
        .asideImg {
          position: relative;
          width: 100%;
          height: 140px;
          // 侧边栏顶部图片--原始
          background: url("http://chaichaiimage.oss-cn-hangzhou.aliyuncs.com/blog3.0/bg12.jpg");
          background-position: 0 -70px;
          background-size: cover;
  
          .asidePic {
            border: 4px solid rgb(241, 241, 241);
            position: absolute;
            margin: 0 auto;
            left: 50%;
            bottom: -38px;
            transform: translate(-50%);
          }
        }
  
        .asideTile {
          padding: 0 20px;
          color: rgb(51, 51, 51);
          margin-top: 45px;
          font-size: 20px;
          font-weight: 550;
          letter-spacing: 3px;
        }
  
        .asideTile1 {
          padding: 0 20px;
          color: rgb(51, 51, 51);
          margin-top: 10px;
          font-size: 20px;
          font-weight: 550;
          letter-spacing: 3px;
        }
      }
    }
  
    .go-top {
      z-index: 99999999;
      position: fixed;
      width: 50px;
      height: 50px;
      border-radius: 50%;
      //返回顶部图片
      background: url("@/assets/bg6.jpg");
      background-size: cover;
      bottom: 50px;
      right: 50px;
  
      .backTopbtn {
        font-style: 20px;
        margin: 10px auto;
      }
    }
  }
  </style>