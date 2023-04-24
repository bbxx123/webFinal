<!--
 * @Author: Chai chai 2787922490@qq.com
 * @Date: 2023-02-05 19:17:03
 * @LastEditors: fengyuanyao fengyuanyao@fanyu.com
 * @LastEditTime: 2023-04-19 14:30:41
 * @FilePath: \毕设\webFinal\src\views\LoginView\index.vue
 * @Description: 
 * 
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
-->
<template>
  <div class="bgBox">
    <div class="coverBox">
      <div class="loginBox">
        <el-page-header
          style="margin-left: 50px"
          class="loginTitle"
          @back="goBack"
          content="欢迎来到登录页"
        >
        </el-page-header>
        <div style="width: 550px; margin: 0 auto; margin-top: 70px">
          <el-form
            :rules="rules"
            label-position="left"
            label-width="100px"
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
                style="width: 450px"
                oninput="value=value.replace(/[^\w_]/g,'')"
                placeholder="只能输入大小写字母、数字、下划线"
              ></el-input>
            </el-form-item>
            <el-form-item style="margin: 50px 0 0 260px;text-align: right;" label-width="200">
              <el-button @click="goRegest">去注册</el-button>
              <el-button type="primary" @click="submitForm('formLabelAlign')"
                >登录</el-button
              >
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Login,deleteWatch } from "@/api/use.js";
export default {
  name:"loginView",
  data() {
    return {
      rules: {
        name: [{ required: true, message: "请输入用户名", trigger: "blur" }],
        region: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
      formLabelAlign: {
        name: "",
        region: "",
      },
    };
  },
  mounted() {
    localStorage.removeItem("imgUrlS");
    localStorage.removeItem("isRead")
    this.deleteWatch()
  },
  methods: {
    deleteWatch() {
      deleteWatch().then(res=> {
        // console.log(res);
      })
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          Login(this.formLabelAlign).then((res) => {
            if (res.status === 200) {
              res.data.forEach((item) => {
                if (item.name === this.formLabelAlign.name) {
                  item.region === this.formLabelAlign.region
                    ? this.$router.push("/about") &&
                      this.$message.success("登录成功！") &&
                      localStorage.setItem(
                        "imgUrlS",
                        item.imgUrl +
                          "+" +
                          item.name +
                          "+" +
                          item.root +
                          "+" +
                          item.id +
                          "+" +
                          item.integral
                      )
                    : this.$message.error("密码错误！请重试！");
                }
              });
              // this.$message.success("登录成功！");
              // this.$router.push("/about");
            } else {
              this.$message.error("登录失败");
            }
          });
        } else {
          this.$message.error("请按照提示补全信息！");
          return false;
        }
      });
    },
    loginIng() {
      // this.$router.push("about");
    },
    goBack() {
      this.$router.push("/");
    },
    goRegest() {
      this.$router.push("regest");
    },
  },
};
</script>

<style lang="scss" scoped>
.bgBox {
  width: 100vw;
  height: 100vh;
  background-image: url("@/assets/bg18.jpg");
  // background-size: cover;
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
  .loginBox {
    margin: 0 auto;
    margin-top: 220px;
    width: 600px;
    padding-bottom: 30px;
    background: rgba($color: #fff, $alpha: 0.4);
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