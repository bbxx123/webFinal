<!--
 * @Author: fengyuanyao fengyuanyao@fanyu.com
 * @Date: 2022-10-17 10:08:18
 * @LastEditors: fengyuanyao fengyuanyao@fanyu.com
 * @LastEditTime: 2023-04-21 15:13:18
 * @FilePath: \毕设\webFinal\src\views\BackView\components\noticeManageRoot.vue
 * 
 * Copyright (c) 2022 by error: git config user.name && git config user.email & please set dead value or install git, All Rights Reserved. 
-->
<template>
  <div class="userBg">
    <h1 class="userTitle">公告管理</h1>
    <!-- <el-button class="addBtn" type="primary">新增用户</el-button> -->
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
      <el-table-column
        label="操作"
        align="right"
        header-align="center"
        min-width="200"
        fixed="right"
      >
        <!-- eslint-disable-next-line -->
        <template slot-scope="scope">
          <div class="table_optionItem">
            <div class="mmu_tableBtn colorBorder" @click="changeMsg(scope.row)">修改公告</div>
            <div class="mmu_tableBtn redBorder commonBtn" @click="delMsg(scope.row.msgId)">删除</div>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="修改公告" :visible.sync="dialogVisible" :append-to-body="true">
      <el-form ref="ruleForm" :model="changeData" label-width="80px">
        <el-form-item label="公告内容：" label-width="100px">
          <el-input v-model="changeData.content" type="textarea"></el-input>
        </el-form-item>
        <el-form-item label="首页展示：" label-width="100px">
          <el-select
            v-model="changeData.isShow"
            clearable
            placeholder="请选择首页是否显示"
          >
            <el-option label="显示" :value="1" />
            <el-option label="不显示" :value="0" />
          </el-select>
          <div>*提示：首页只能展示一条公告，当前公告选择展示，其他公告就会默认隐藏*</div>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="edit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

  <script>
import { searchMsg,changeMsg,changeAllMsg,delMsg } from "@/api/use";
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
    delMsg(id) {
      this.$confirm('此操作将永久删除该公告, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then((status) => {
          if(status == 'confirm') {
            delMsg({ id: id }).then(res => {
            if (res.status === 200) {
              this.$message.success('删除成功!')
              this.searchMsg()
            } else {
              this.$message.error('删除失败')
            }
          })
          }
        }).catch((status) => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
    },
    edit() {
      const data = {
        msgId:this.changeData.msgId,
        content:this.changeData.content,
        isShow:this.changeData.isShow
      }
      if(this.changeData.isShow === 1) {
        changeAllMsg().then(res=>{
        
      })
      }
      changeMsg(data).then(res=>{
        if(res.status === 200) {
          this.$message.success('修改成功！')
          this.searchMsg()
          this.changeData ={}
          this.dialogVisible = false
        } else {
          this.$message.error('修改失败！')
        }
      })
    },
    changeMsg(row) {
      console.log(row);
      this.dialogVisible = true
      this.changeData = row
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