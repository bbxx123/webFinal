<!--
 * @Author: Chai chai 2787922490@qq.com
 * @Date: 2023-02-05 19:45:11
 * @LastEditors: fengyuanyao fengyuanyao@fanyu.com
 * @LastEditTime: 2023-04-19 14:23:37
 * @FilePath: \毕设\webFinal\src\views\RegestView\index.vue
 * @Description: 
 * 
 * Copyright (c) 2023 by Chai chai 2787922490@qq.com, All Rights Reserved. 
-->
<template>
  <div class="bgBox">
    <div class="coverBox">
      <div class="loginBox2">
        <!-- <div class="loginTitle">欢迎来到注册页</div> -->
        <el-page-header
          style="margin-left: 100px"
          class="loginTitle"
          @back="goBack"
          content="欢迎来到注册页"
        >
        </el-page-header>
        <div style="width: 550px; margin: 0 auto; margin-top: 70px">
          <el-form
            label-position="left"
            label-width="120px"
            :rules="rules"
            :model="formLabelAlign"
            ref="formLabelAlign"
          >
            <el-form-item label="用户名" prop="name">
              <el-input
                v-model="formLabelAlign.name"
                style="width: 450px"
                oninput="value=value.replace(/[\W]/g,'')"
                placeholder="只能输入数字和字母"
              ></el-input>
            </el-form-item>
            <el-form-item label="密 码" prop="region">
              <el-input
                show-password
                v-model="formLabelAlign.region"
                oninput="value=value.replace(/[^\w_]/g,'')"
                style="width: 450px"
                placeholder="只能输入大小写字母、数字、下划线"
              ></el-input>
            </el-form-item>
            <el-form-item label="再次输入密码" prop="regionAgain">
              <el-input
                show-password
                v-model="formLabelAlign.regionAgain"
                oninput="value=value.replace(/[^\w_]/g,'')"
                style="width: 450px"
                placeholder="只能输入大小写字母、数字、下划线"
              ></el-input>
            </el-form-item>
            <el-form-item label="上传头像" required>
              <Upload @func="getImg"></Upload>
            </el-form-item>
            <el-form-item style="margin: 50px 0 0 240px;text-align: right;" label-width="180" >
              <el-button @click="goLogin">去登录</el-button>
              <el-button type="primary" @click="submitForm('formLabelAlign')"
                >注册</el-button
              >
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Upload from "@/components/uploadView/index.vue";
import { Regest } from "@/api/use.js";

export default {
  name:'regestView',
  components: { Upload },
  data() {
    return {
      rules: {
        name: [{ required: true, message: "请输入用户名", trigger: "blur" }],
        region: [{ required: true, message: "请输入密码", trigger: "blur" }],
        regionAgain: [
          { required: true, message: "请输入确认密码", trigger: "blur" },
        ],
      },
      formLabelAlign: {
        name: "",
        region: "",
        regionAgain: "",
        imgUrl: "",
      },
    };
  },
  methods: {
    submitForm(formName) {
      if (this.formLabelAlign.imgUrl === "") {
        this.$message.error("请上传头像！");
        return;
      }
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.formLabelAlign.region !== this.formLabelAlign.regionAgain) {
            this.$message.error("两次密码不一致！请重新输入！");
            return;
          } else {
            Regest(this.formLabelAlign).then((res) => {
              // console.log(res, "res");
              if (res.status === 200) {
                this.$message.success("注册成功！即将跳转登录页面！");
                this.$router.push("login");
              } else {
                this.$message.error("注册失败！");
              }
            });
          }
        } else {
          this.$message.error("请按照提示补全信息！");
          return false;
        }
      });
    },
    getImg(data) {
      this.formLabelAlign.imgUrl = data;
    },
    goBack() {
      this.$router.push("/");
    },
    goLogin() {
      this.$router.push("login");
    },
  },
};
</script>

<style lang="scss" scoped>
.bgBox {
  width: 100vw;
  height: 100vh;
  background-image: url("@/assets/bg12.jpg");
  background-position: 0 0;
  background-repeat: repeat-x;
  overflow: hidden;
  animation: animatedBackground 80s linear infinite;

@keyframes animatedBackground {
  0% {
    background-position: 0% 49%;
  }

  50% {
    background-position: 100% 49%;
  }

  100% {
    background-position: 0% 49%;
  }
}
  .coverBox {
    position: absolute;
    background: rgba($color: #000000, $alpha: 0.3);
  }
  .loginBox2 {
    margin: 0 auto;
    margin-top: 160px;
    width: 700px;
    padding-bottom:30px;
    // height: 570px;
    background: rgba($color: #fff, $alpha: 0.6);
    border-radius: 40px;
    overflow: hidden;
    .loginTitle {
      margin: 60px auto;
      font-size: 28px;
      letter-spacing: 3px;
      color: rgba($color: #00000058, $alpha: 0.7);
    }
  }
}
</style>