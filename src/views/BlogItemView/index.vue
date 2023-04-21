<template>
  <div class="aboutBox">
    <bannerView
      :imgUrl="this.img"
      :titleName="this.titleU"
      ref="banner"
    ></bannerView>
    <div class="mainBox">
      <div class="contentBox">
        <div class="contentTitle">
          <div class="markdown-body">
            <!-- <markdown /> -->
            <div>
              <div
                style="
                  margin: 20px 0 20px 0px;
                  font-size: 30px;
                  font-weight: 600;
                "
              >
                {{ essayList[0].title }}
              </div>
              <div style="margin: 0px 0 20px 0px; color: #ccc">
                {{ essayList[0].titleKey }}
              </div>
              <el-divider>正文部分</el-divider>
              <div v-html="essayList[0].content" style="margin-top: 30px"></div>
            </div>
          </div>
        </div>
      </div>
      <div class="contentBox">
        <div style="font-size: 22px; font-weight: 600; margin-top: 20px">
          评论：
        </div>
        <div
          style="
            margin-top: 20px;
            padding-bottom: 25px;
            padding-left: 25px;
            border-bottom: 1px solid #dcdfe6;
            disply: felx;
            flex-wrap: nowrap;
          "
        >
          <el-input
            placeholder="发表评论~"
            v-model="inputMsg"
            style="width: 800px; margin-right: 30px"
          ></el-input>
          <el-button type="primary" @click="goAddInput">发送</el-button>
        </div>
        <div v-if="inputList.length !== 0">
          <div
            style="padding: 15px 10px"
            v-for="(item, index) in inputList"
            :key="index + 1"
          >
            <div style="display: flex; flex-wrap: nowrap">
              <span class="peoplePic">
                <img :src="item.imgUrl" alt="" />
              </span>
              <span style="margin-left: 10px">
                <div style="font-size: 18px; margin-top: 3px">
                  {{ item.userName }}
                </div>
                <div style="color: #9a9a9a; margin-top: 5px">
                  {{ item.createTime }}
                </div>
              </span>
            </div>
            <div class="contentMsg">{{ item.content }}</div>
          </div>
        </div>
        <div style="padding:35px 10px;text-align:center;" v-else>暂无评论！</div>
      </div>

      <div :class="locked ? 'asideBoxFix' : 'asideBox'">
        <div class="asideImg">
          <!-- 头像 -->
          <el-avatar
            :src="essayList[0].imgUrl"
            :size="size"
            class="asidePic"
          ></el-avatar>
        </div>
        <div class="asideTile">{{ essayList[0].auther }}</div>
        <!-- <div class="asideTile1">老爷保佑！前途无量！</div> -->
        <el-divider>🌴</el-divider>
        <!-- 侧边栏底部图片 -->
        <!-- <img src="@/assets/huli.gif" alt="" class="bottomImg" /> -->
        <div style="margin-bottom: 20px">
          <el-button
            :type="!caseStatus ? 'warning' : 'info'"
            icon="el-icon-star-off"
            round
            @click="caseItem"
            v-preventReClick
            >{{ !caseStatus ? "关注" : "取消关注" }}</el-button
          >
          <el-button
            :type="!likeStatus ? 'danger' : 'info'"
            icon="el-icon-thumb"
            round
            @click="likeItem"
            v-preventReClick
            >{{ !likeStatus ? "点赞" : "取消点赞" }}</el-button
          >
        </div>
      </div>
      <!-- <div v-if="btnFlag" class="go-top" @click="backTop"> -->
      <!-- 返回顶部图标 -->
      <!-- <img src="@/assets/backTop.png" alt="" class="backTopbtn" />
      </div> -->
    </div>
    <footerView></footerView>
  </div>
</template>

<script>
import {
  changeIntegral,
  searchPaper,
  searchIntegral,
  changeLikes,
  searchLikes,
  isWatch,
  watchR,
  changeLikeStatus,
  changeCaseStatus,
  addinput,
  searchInput,
} from "@/api/use";
import bannerView from "@/components/bannerView/index";
import footerView from "@/components/footerView/index.vue";
// md文件地址
import markdown from "../home.md";
import "highlight.js/styles/github.css";
import "github-markdown-css";
export default {
  name: "paperItem",
  components: { bannerView, markdown, footerView },
  async mounted() {
    const info = localStorage.getItem("imgUrlS");
    const data = {
      lookId: info.split("+")[3],
      paperId: this.$route.path.split("/")[3],
      caseStatus: this.caseStatus ? 0 : 1,
      likeStatus: this.likeStatus ? 0 : 1,
    };
    this.getList();
    isWatch({ paperId: this.$route.path.split("/")[3] }).then((res) => {
      if (res.data.length === 0) {
        watchR(data).then((res) => {
          if (res.status === 200) {
            localStorage.setItem("paperId", this.$route.path.split("/")[3]);
          }
        });
      } else {
        this.caseStatus = res.data[0].caseStatus === 1 ? false : true;
        this.likeStatus = res.data[0].likeStatus === 1 ? false : true;
      }
    });
  },
  data() {
    return {
      autherId:'',
      inputMsg: "",
      inputList: [],
      caseStatus: false,
      likeStatus: false,
      essayList: [{ title: "" }],
      //侧边栏头像大小
      size: 90,
      bannerH: 0,
      locked: false,
      btnFlag: false,
      //导航背景图片
      img: "http://chaichaiimage.oss-cn-hangzhou.aliyuncs.com/blog3.0/bg7.jpg",
      // 导航文字说明
      titleU: "文章详情",
      integralNum: 0,
      likeNum: 0,
    };
  },
  methods: {
    searchInput() {
      searchInput({ paperId: this.$route.path.split("/")[3] }).then((res) => {
        if (res.status === 200) {
          this.inputList = res.data;
        }
      });
    },
    goAddInput() {
      if (this.inputMsg === "") {
        this.$message.error("请输入评论！");
        return;
      }
      const info = localStorage.getItem("imgUrlS");
      const data = {
        userId: info.split("+")[3],
        paperId: this.$route.path.split("/")[3],
        userName: info.split("+")[1],
        content: this.inputMsg,
        createTime: this.$dayjs(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
        imgUrl: info.split("+")[0],
      };
      addinput(data).then((res) => {
        if (res.status === 200) {
          this.$message.success("评论成功！");
          this.inputMsg = ''
          this.getList();
        } else {
          this.$message.error("评论失败！");
        }
      });
    },
    changeLikeStatus() {
      const info = localStorage.getItem("imgUrlS");
      const data = {
        lookId: info.split("+")[3],
        paperId: this.$route.path.split("/")[3],
        likeStatus: this.likeStatus ? 0 : 1,
      };
      changeLikeStatus(data).then((res) => {});
    },
    changeCaseStatus() {
      const info = localStorage.getItem("imgUrlS");
      const data = {
        lookId: info.split("+")[3],
        paperId: this.$route.path.split("/")[3],
        caseStatus: this.caseStatus ? 0 : 1,
      };
      changeCaseStatus(data).then((res) => {});
    },
    caseItem() {
      this.caseStatus = !this.caseStatus;
      const data = {
        id: this.autherId,
        integral: this.integralNum,
        type: this.caseStatus ? true : false,
      };
      changeIntegral(data).then((res) => {
        if (res.status === 200) {
          this.$message.success(
            !this.caseStatus ? "取消关注成功！" : "关注成功！"
          );
          this.changeCaseStatus();
          this.getList();
        }
      });
    },
    likeItem() {
      this.likeStatus = !this.likeStatus;
      const data = {
        id: this.$route.path.split("/")[3],
        likes: this.likeNum,
        type: this.likeStatus ? true : false,
      };
      changeLikes(data).then((res) => {
        if (res.status === 200) {
          this.$message.success(
            !this.likeStatus ? "取消点赞成功！" : "点赞成功！"
          );
          this.changeLikeStatus();
          this.getList();
        }
      });
    },
    async getList() {
      await searchPaper({ id: `${this.$route.path.split("/")[3]}` }).then(
        (res) => {
          this.essayList = res.data.data;
          this.autherId = res.data.data[0].autherId
          this.total = res.data.total;
        }
      );
      searchIntegral({ id: this.autherId }).then((res) => {
        if (res.status === 200) {
          this.integralNum = res.data[0].integral;
        }
      });
      searchLikes({ id: `${this.$route.path.split("/")[3]}` }).then((res) => {
        if (res.status === 200) {
          this.likeNum = res.data[0].likes;
        }
      });
      this.searchInput();
    },
  },
};
</script>

<style lang="scss" scoped>
.contentMsg {
  color: #000;
  border-radius: 10px;
  font-size: 13px;
  background: rgba($color: #ccc, $alpha: 0.5);
  padding: 20px 10px;
  margin-left: 25px;
  margin-top: 10px;
  border-bottom: 1px solid rgba($color: #ccc, $alpha: 0.3);
}

.peoplePic {
  display: inline-block;
  width: 45px;
  height: 45px;
  border-radius: 50%;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
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
    width: 70%;
    margin: 0 auto;
    margin-top: 10px;

    .contentBox {
      overflow: hidden;
      width: 71%;
      background-color: #fff !important;
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
          background-size: cover;
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