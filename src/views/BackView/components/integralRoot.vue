<!--
 * @Author: fengyuanyao fengyuanyao@fanyu.com
 * @Date: 2022-10-17 10:08:18
 * @LastEditors: Chai chai 2787922490@qq.com
 * @LastEditTime: 2023-04-11 23:17:59
 * @FilePath: \Vue-Second-dimensional-personal-blog\src\views\BackView\components\inputRoot.vue
 * 
 * Copyright (c) 2022 by error: git config user.name && git config user.email & please set dead value or install git, All Rights Reserved. 
-->
<template>
  <div class="userBg">
    <h1 class="userTitle">积分管理</h1>
    <!-- <el-button class="addBtn" type="primary">新增用户</el-button> -->
    <el-table :data="tableData" style="width: 98%; margin: 20px auto" border>
      <el-table-column
        label="id"
        property="id"
        align="center"
        min-width="200"
      />
      <el-table-column
        label="留言内容"
        property="inputContent"
        align="center"
        min-width="200"
      />
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
            <div class="mmu_tableBtn redBorder commonBtn">删除</div>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
  
  <script>
// import { SearchIput, DelInput } from "@/api/user";
export default {
  data() {
    return {
      tableData: [],
    };
  },
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