<!--
 * @Author: chaichai chaichai@cute.com
 * @Date: 2022-09-26 08:54:27
 * @LastEditors: fengyuanyao fengyuanyao@fanyu.com
 * @LastEditTime: 2023-04-24 15:49:14
 * @FilePath: \毕设\webFinal\src\views\BlogView\BlogView.vue
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
        @click="goWatch"
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
            :name="user.title"
            :tags="user.tags"
            :selfContent="user.titleKey"
            :imgUrl="user.titleImgUrl"
            :teams='teams'
          ></cardView>
        </div>
        <div>
          <div class="headerTitle2">TOP前9</div>
          <div style="margin: 20px 0 0 100px">
            <ul
              class="headerItem"
              v-for="(item, index) in asseyList"
              :key="index + 1"
            >
              <li
                style="margin-bottom: 23px; cursor: pointer"
                @click="clickItem(item)"
              >
                {{ item.title }} ………………… {{ item.createTime }}
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
          <div class="essayBox"  v-loading="loading" v-if="essayList.length !== 0">
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
                <div style="color: #efefef;font-size:30px margin-top: 20px; height: 80px">
                  {{ item.titleKey }}
                </div>
                <div style="margin-bottom: 20px">作者: {{ item.auther }}</div>
                <div>发布日期: {{ item.createTime }}</div>
              </div>
            </div>
          </div>
          <el-empty v-else description="暂无数据"></el-empty>
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
import { searchPaper,searchNinePage,searchOnePage } from "@/api/use";
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
      loading: false,
      page: 0,
      total: 0,
      essayList: [],
      asseyList: [],
      teams: [
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
  watch:{
    state2: function(newN,oldN) {
      if(newN === '') {
        this.clearSearch()
      }
    }
  },
  methods: {
    goWatch() {
      this.$router.push('/watch')
    },
    searchNinePage() {
      searchNinePage().then(res => {
        if(res.status === 200) {
          this.asseyList = res.data
        }
      })
    },
    searchOnePage() {
      searchOnePage().then(res => {
        if(res.status === 200) {
          this.teams = res.data
        }
      })
    },
    currentChange(item) {
      this.loading = true
      this.essayList = [];
      searchPaper({ page: item - 1 }).then((res) => {
        this.essayList = res.data.data;
        this.total = res.data.total;
      });
      setTimeout(() => { this.loading = false},1000)
    },
    goCheckEssay(item) {
      this.$router.push(`/paper/item/${item.id}`);
    },
    getList() {
      this.loading = true
      this.essayList = [];
      searchPaper(this.formData).then((res) => {
        if (res.status === 200) {
          res.data.data.forEach((item) => {
            const data = {
              value: item.title,
              address: item.id,
            };
            this.restaurants.push(data);
          });
          this.essayList = res.data.data;
          this.total = res.data.total;
         
          setTimeout(() => { this.loading = false},1000)
        }
      });
      this.searchNinePage()
      this.searchOnePage()
    },
    goWrite() {
      this.$router.push("/writePaper");
    },
    prevClick(item) {
      // console.log(item, "pr");
      this.currentChange(item);
    },
    nextClick(item) {
      this.currentChange(item);
    },
    clickItem(item) {
      this.$router.push(`/paper/item/${item.id}`);
    },
    clearSearch() {
      // console.log(111);
      this.getList();
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
      this.loading = true
      this.essayList = [];
      // console.log(item);
      searchPaper({ id: `${item.address}` }).then((res) => {
        // console.log(res);
        this.essayList = res.data.data;
        this.total = res.data.total;
        setTimeout(() => { this.loading = false},1000)
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
    text-align: left;
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
    margin-left: 95px;
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
    margin-top: 10px;
    box-shadow: 0 1px 10px rgb(0 0 0 / 10%);
    background-color: rgba($color: #1a1a1a, $alpha: 0.8);
    padding-bottom: 15px;
  }
}
</style>

