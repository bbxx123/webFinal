<!--
 * @Author: fengyuanyao fengyuanyao@fanyu.com
 * @Date: 2022-10-17 10:08:18
 * @LastEditors: fengyuanyao fengyuanyao@fanyu.com
 * @LastEditTime: 2023-04-21 10:35:36
 * @FilePath: \毕设\webFinal\src\views\BackView\components\noticeRoot.vue
 * 
 * Copyright (c) 2022 by error: git config user.name && git config user.email & please set dead value or install git, All Rights Reserved. 
-->
<template>
  <div class="userBg">
    <h1 class="userTitle" style="margin-top:20px">发布公告</h1>
    <el-button class="addBtn" type="primary" @click="addNewMsg">新增公告</el-button>
    <el-table :data="tableData" style="width: 98%; margin: 10px auto" border>
      <el-table-column
        label="id"
        property="msgId"
        align="center"
        min-width="40"
      />
      <el-table-column
        label="公告信息"
        property="content"
        align="center"
        min-width="200"
      />
      <el-table-column
        label="发布人员"
        property="userName"
        align="center"
        min-width="60"
      />
      <el-table-column
        label="创建时间"
        property="createTime"
        align="center"
        min-width="60"
      />
      <el-table-column
        label="首页显示状态"
        align="center"
        min-width="50"
      >
      <template slot-scope="scope">
        <div>{{ scope.row.isShow === 0 ? "不显示" : "显示" }}</div>
      </template>
    </el-table-column>
    <el-dialog title="发布公告" :visible.sync="dialogVisible" :append-to-body="true">
      <el-form ref="ruleForm" :model="changeData" label-width="80px">
        <el-form-item label="公告内容：" label-width="100px">
          <el-input v-model="changeData.name" type="textarea"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="add">确 定</el-button>
      </span>
    </el-dialog>
    </el-table>
  </div>
</template>
  
  <script>
import { searchMsg,addMsg } from "@/api/use";
export default {
  data() {
    return {
      tableData: [],
      changeData:{},
      dialogVisible:false
    };
  },
  mounted() {
    this.searchMsg()
  },
  methods:{
    add() {
      const info = localStorage.getItem("imgUrlS");
      const data = {
        userId: info.split("+")[3],
        userName: info.split("+")[1],
        content: this.changeData.name,
        createTime: this.$dayjs(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
      }
      addMsg(data).then(res=> {
        if(res.status === 200) {
          this.$message.success('发布成功！')
          this.changeData = {}
          this.searchMsg()
          this.dialogVisible = false
        } else {
          this.$message.error('发布失败！')
        }
      })
    },
    addNewMsg() {
      this.dialogVisible = true
    },
    searchMsg() {
      searchMsg().then(res=> {
        if(res.status ===200) {
          this.tableData = res.data
        }
      })
    }
  }
};
</script>
  
  <style lang="scss" scoped>
.addBtn {
  margin: 10px 0 20px -1550px;
}
.userBg {
  overflow: hidden;
  /* background: #ccc; */
}
.userTitle {
  margin: 20px 0 20px 60px;
  text-align: left;
}
.table_optionItem {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  .mmu_tableBtn {
    padding: 2px 8px;
    color: #5c666e;
    border: 1px solid #5c666e;
    font-size: 14px;
    cursor: pointer;
    margin-bottom: 10px;
    margin-right: 10px;
    border-radius: 4px;
    white-space: nowrap;
    &.blueFont {
      color: #fff;
      background: #2d7df5;
      border: 1px solid #2d7df5;
    }
    &.greenFont {
      color: #fff;
      background: #3ba988;
      border: 1px solid #3ba988;
    }
    &.originFont {
      color: #fff;
      background: #ff8a58;
      border: 1px solid #ff8a58;
    }
    &.colorBorder {
      color: #2d7df5;
      border: 1px solid #2d7df5;
    }
    &.redBorder {
      color: #ef3131;
      border: 1px solid #ef3131;
    }
    &.grayBorder {
      color: #aaa;
      border: 1px solid #aaa;
    }
  }
}
</style>