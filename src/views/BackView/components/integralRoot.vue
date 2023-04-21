<!--
 * @Author: fengyuanyao fengyuanyao@fanyu.com
 * @Date: 2022-10-17 10:08:18
 * @LastEditors: fengyuanyao fengyuanyao@fanyu.com
 * @LastEditTime: 2023-04-20 17:25:13
 * @FilePath: \毕设\webFinal\src\views\BackView\components\integralRoot.vue
 * 
 * Copyright (c) 2022 by error: git config user.name && git config user.email & please set dead value or install git, All Rights Reserved. 
-->
<template>
  <div class="userBg">
    <h1 class="userTitle">积分管理</h1>
    <!-- <el-button class="addBtn" type="primary">新增用户</el-button> -->
    <el-table :data="tableData" style="width: 98%; margin: 20px auto" border>
      <el-table-column label="id" property="id" align="center" min-width="200"/>
      <el-table-column label="用户名称" property="name" align="center" min-width="200" />
      <el-table-column label="用户积分" property="integral" align="center" min-width="200" />
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
            <div class="mmu_tableBtn colorBorder" @click="changePoint(scope.row)">修改积分</div>
            <div class="mmu_tableBtn redBorder commonBtn" @click="resetPoint(scope.row.id)">积分重置</div>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="修改账号积分" :visible.sync="dialogVisible" :append-to-body="true">
      <el-form ref="ruleForm" :model="changeData" label-width="100px">
        <el-form-item label="账号积分：">
          <el-input v-model="changeData.integral"></el-input>
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
import { search,changePoint } from "@/api/use";
export default {
  data() {
    return {
      dialogVisible:false,
      changeData:{},
      tableData: [],
    };
  },
  mounted() {
    this.getList()
  },
  methods:{
    edit() {
      changePoint({id:this.changeData.id,integral:this.changeData.integral}).then(res => {
        if(res.status === 200) {
          this.$message.success('修改成功！')
          this.changeData = {},
            this.dialogVisible = false
          this.getList()
        } else {
          this.$message.error('修改失败！')
        }
      })
    },
    resetPoint(id) {
      this.$confirm('此操作将重置该用户的积分, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then((status) => {
          changePoint({id:id,integral: 0}).then(res => {
        if(res.status === 200) {
          this.$message.success('重置成功！')
          this.changeData = {},
            this.dialogVisible = false
          this.getList()
        } else {
          this.$message.error('重置失败！')
        }
      })
        }).catch((status) => {
          this.$message({
            type: 'info',
            message: '已取消重置'
          });
        });
    },
    changePoint(row) {
      this.changeData = row
      this.dialogVisible = true
    },
    getList() {
      search().then(res => {
        if (res.status === 200) {
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