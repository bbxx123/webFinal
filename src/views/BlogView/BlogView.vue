<!--
 * @Author: chaichai chaichai@cute.com
 * @Date: 2022-09-26 08:54:27
 * @LastEditors: Chai chai 2787922490@qq.com
 * @LastEditTime: 2023-04-16 23:07:52
 * @FilePath: \Vue-Second-dimensional-personal-blog\src\views\BlogView\BlogView.vue
 * @Description: 
 * 
 * Copyright (c) 2022 by CQUCC-4-433, All Rights Reserved. 
-->
<template>
  <div class="aboutBox">
    <div class="sideItem">
      <el-button icon="el-icon-edit" type="primary" round @click="goWrite"
        >发布文章</el-button
      >
      <br />
      <el-button
        icon="el-icon-refresh-right"
        type="primary"
        round
        style="margin-top: 20px"
        >浏览记录</el-button
      >
    </div>
    <bannerView :imgUrl="this.img" :titleName="this.title"></bannerView>
    <div class="mainBox">
      <div class="headerModel">
        <div>
          <div class="headerTitle">最热文章 TOP1</div>
          <cardView
            v-for="(user, index) in teams"
            class="card"
            :key="index"
            :name="user.name"
            :tags="user.tags"
            :selfContent="user.selfContent"
            :imgUrl="user.imgUrl"
          ></cardView>
        </div>
        <div>
          <div class="headerTitle2">TOP前10</div>
          <div style="margin: 20px 0 0 180px">
            <ul
              class="headerItem"
              v-for="(item, index) in asseyList"
              :key="index + 1"
            >
              <li
                style="margin-bottom: 23px; cursor: pointer"
                @click="clickItem(item)"
              >
                {{ item.title }} ………………………… {{ item.createTime }}
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div class="peopleBg2">
        <div class="searchBox">
          <div style="margin-top: 50px">
            <el-autocomplete
              style="width: 800px"
              class="inline-input"
              v-model="state2"
              clearable
              :fetch-suggestions="querySearch"
              placeholder="文章搜索"
              :trigger-on-focus="false"
              @select="handleSelect"
              @clear="clearSearch"
            >
              <!-- <i
                class="el-icon-search el-input__icon"
                slot="suffix"
                @click="handleIconClick"
              >
              </i> -->
            </el-autocomplete>
          </div>
        </div>
        <div class="peopleBox">
          <div class="essayBox">
            <div
              class="essayItem"
              v-for="(item, index) in essayList"
              :key="index + 1"
              :style="{
                background: 'url(' + item.titleImgUrl + ')',
                backgroundSize: 'cover',
              }"
              @click="goCheckEssay(item)"
            >
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
        </div>
        <el-pagination
          layout="prev, pager, next"
          :total="total"
          :page-size="6"
          @current-change="currentChange"
        >
        </el-pagination>
      </div>
    </div>
    <!-- <bannerList1></bannerList1>
      <bannerList2></bannerList2>
      <bannerList3></bannerList3> -->
    <footerView></footerView>
  </div>
</template>

<script>
import cardView from "@/components/cardView/index.vue";
import bannerView from "@/components/bannerView/index.vue";
import footerView from "@/components/footerView/index.vue";
import bannerList1 from "./components/bannerList1.vue";
import bannerList2 from "./components/bannerList2.vue";
import bannerList3 from "./components/bannerList3.vue";
import { searchPaper } from "@/api/use";
export default {
  name: "BlogView",
  components: {
    bannerView,
    footerView,
    bannerList1,
    bannerList2,
    bannerList3,
    cardView,
  },
  data() {
    return {
      page: 0,
      total: 0,
      essayList: [
        // {
        //   title: "flex布局详解",
        //   content: "本文详细描述了flex布局的几种常见属性及具体的示例",
        //   athour: "柴柴",
        //   createTime: "2023-4-9",
        //   img: "http://chaichaiimage.oss-cn-hangzhou.aliyuncs.com/blog3.0/bg16.jpg",
        // },
        // {
        //   title: "flex布局详解",
        //   content: "本文详细描述了flex布局的几种常见属性及具体的示例",
        //   athour: "柴柴",
        //   createTime: "2023-4-9",
        //   img: "http://chaichaiimage.oss-cn-hangzhou.aliyuncs.com/blog3.0/bg17.jpg",
        // },
        // {
        //   title: "flex布局详解",
        //   content: "本文详细描述了flex布局的几种常见属性及具体的示例",
        //   athour: "柴柴",
        //   createTime: "2023-4-9",
        //   img: "http://chaichaiimage.oss-cn-hangzhou.aliyuncs.com/blog3.0/bg15.jpg",
        // },
        // {
        //   title: "flex布局详解",
        //   content: "本文详细描述了flex布局的几种常见属性及具体的示例",
        //   athour: "柴柴",
        //   createTime: "2023-4-9",
        //   img: "http://chaichaiimage.oss-cn-hangzhou.aliyuncs.com/blog3.0/bg16.jpg",
        // },
        // {
        //   title: "flex布局详解",
        //   content: "本文详细描述了flex布局的几种常见属性及具体的示例",
        //   athour: "柴柴",
        //   createTime: "2023-4-9",
        //   img: "http://chaichaiimage.oss-cn-hangzhou.aliyuncs.com/blog3.0/bg16.jpg",
        // },
        // {
        //   title: "flex布局详解",
        //   content: "本文详细描述了flex布局的几种常见属性及具体的示例",
        //   athour: "柴柴",
        //   createTime: "2023-4-9",
        //   img: "http://chaichaiimage.oss-cn-hangzhou.aliyuncs.com/blog3.0/bg16.jpg",
        // },
      ],
      asseyList: [
        { title: "flex布局大全", createTime: "2023-4-10" },
        { title: "flex布局大全", createTime: "2023-4-10" },
        { title: "flex布局大全", createTime: "2023-4-10" },
        { title: "flex布局大全", createTime: "2023-4-10" },
        { title: "flex布局大全", createTime: "2023-4-10" },
        { title: "flex布局大全", createTime: "2023-4-10" },
        { title: "flex布局大全", createTime: "2023-4-10" },
        { title: "flex布局大全", createTime: "2023-4-10" },
        { title: "flex布局大全", createTime: "2023-4-10" },
      ],
      teams: [
        {
          name: "如何将自己的项目部署到服务器",
          selfContent: "上海市长宁区金钟路968号1幢18号楼一层商铺18-101",
          imgUrl:
            "https://4433studio.oss-cn-hangzhou.aliyuncs.com/headPortrait/chaichai.jpg",
        },
      ],
      restaurants: [],
      state2: "",
      img: "http://chaichaiimage.oss-cn-hangzhou.aliyuncs.com/blog3.0/bg17.jpg",
      title: "博客",
      formData: {},
      allData: [],
    };
  },
  created() {
    this.getList();
  },

  methods: {
    currentChange(item) {
      console.log(item - 1, "item");
      this.essayList = [];
      searchPaper({ page: item - 1 }).then((res) => {
        this.essayList = res.data.data;
        this.total = res.data.total;
      });
    },
    goCheckEssay(item) {
      // console.log(item.id);
      this.$router.push(`/paper/item/${item.id}`);
    },
    getList() {
      this.essayList = [];
      searchPaper(this.formData).then((res) => {
        if (res.status === 200) {
          res.data.allData.forEach((item) => {
            const data = {
              value: item.title,
              address: item.id,
            };
            this.restaurants.push(data);
          });
          this.essayList = res.data.data;
          this.total = res.data.total;
        }
      });
    },
    goWrite() {
      this.$router.push("/writePaper");
    },
    prevClick(item) {
      // console.log(item, "pr");
      this.currentChange(item);
      // this.page = this.page - 1;
      // this.essayList = [];
      // searchPaper({ page: this.page }).then((res) => {
      //   this.essayList = res.data.data;
      //   this.total = res.data.total;
      // });
    },
    nextClick(item) {
      this.currentChange(item);
      // this.page = this.page + 1;
      // this.essayList = [];
      // searchPaper({ page: this.page }).then((res) => {
      //   this.essayList = res.data.data;
      //   this.total = res.data.total;
      // });
    },
    clickItem(item) {
      console.log(item);
    },
    clearSearch() {
      // console.log(111);
      this.getList();
    },
    handleIconClick(ev) {
      console.log(ev);
    },
    querySearch(queryString, cb) {
      var restaurants = this.restaurants;
      var results = queryString
        ? restaurants.filter(this.createFilter(queryString))
        : restaurants;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createFilter(queryString) {
      return (restaurant) => {
        return (
          restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) ===
          0
        );
      };
    },
    handleSelect(item) {
      this.essayList = [];
      console.log(item);
      searchPaper({ id: `${item.address}` }).then((res) => {
        // console.log(res);
        this.essayList = res.data.data;
        this.total = res.data.total;
      });
    },
  },
  // mounted() {
  //   this.restaurants = this.loadAll();
  // },
};
</script>

 <style lang="scss" scoped>
.peopleBg2 {
  overflow: hidden;
  margin: 0 30px;
  padding: 0 80px;
  margin-top: 20px;
  background: rgba($color: #fff, $alpha: 1);
  border-radius: 25px;
  margin-bottom: 15px;
  .essayBox {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .essayItem {
      cursor: pointer;
      border-radius: 5px;
      width: 640px;
      margin-bottom: 25px;
      height: 320px;
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
.searchBox {
  margin-bottom: 60px;
}
.headerModel {
  margin: 0 30px;
  margin-top: 10px;
  padding: 20px 0px;
  background: rgba($color: #fff, $alpha: 1);
  display: flex;
  flex-wrap: nowrap;
  border-radius: 25px;
  .headerItem {
    color: #000;
    font-size: 18px;
    letter-spacing: 1px;
  }
  .card {
    width: 600px;
    height: 400px;
    margin-left: 80px;
  }
  .headerTitle {
    color: #000;
    font-size: 30px;
    font-weight: 600;
    text-align: left;
    margin-bottom: 30px;
    margin-left: 80px;
  }
  .headerTitle2 {
    color: #000;
    font-size: 22px;
    font-weight: 600;
    text-align: left;
    margin-bottom: 30px;
    margin-left: 175px;
  }
}
.aboutBox {
  position: relative;
  height: 100%;
  // 背景图片
  background: url("@/assets/cover.jpg");
  background-repeat: no-repeat;
  background-size: 500px;
  background-position: 110% 100%;
  background-attachment: fixed;
  .sideItem {
    width: 100px;
    height: 100px;
    padding: 15px;
    background: rgba($color: #000000, $alpha: 0.3);
    position: absolute;
    top: 50%;
    right: 0;
    overflow: hidden;
  }

  .mainBox {
    overflow: hidden;
    width: 80%;
    margin: 0 auto;
    box-shadow: 0 1px 10px rgb(0 0 0 / 10%);
    background-color: rgba($color: #1a1a1a, $alpha: 0.8);
    padding-bottom: 15px;
  }
}
</style>

