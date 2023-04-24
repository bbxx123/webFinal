<!--
 * @Author: fengyuanyao fengyuanyao@fanyu.com
 * @Date: 2022-10-17 10:08:18
 * @LastEditors: Chai chai 2787922490@qq.com
 * @LastEditTime: 2023-04-24 21:37:56
 * @FilePath: \webFinal\src\views\BackView\components\userRoot.vue
 * 
 * Copyright (c) 2022 by error: git config user.name && git config user.email & please set dead value or install git, All Rights Reserved. 
-->
<template>
  <div class="userBg">
    <h1 class="userTitle">账号管理</h1>
    <!-- <el-button class="addBtn" type="primary">新增用户</el-button> -->
    <el-table :data="tableData" style="width: 98%; margin: 20px auto" border>
      <el-table-column
        label="id"
        property="id"
        align="center"
        min-width="200"
      />
      <el-table-column
        label="用户名称"
        property="name"
        align="center"
        min-width="200"
      />
      <el-table-column
        label="用户密码"
        property="region"
        align="center"
        min-width="200"
      />
      <el-table-column label="用户头像" align="center">
        <template slot-scope="{ row }">
          <el-popover
            placement="bottom-start"
            title="详情："
            width="200"
            trigger="click"
          >
            <img
              v-if="row.imgUrl !== ''"
              :src="row.imgUrl"
              alt=""
              class="bannerImg"
            />
            <div v-else>暂无</div>
            <span slot="reference" class="processExplainBtn"> 查看详情 </span>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column label="用户权限" align="center" min-width="200">
        <template slot-scope="scope">
          {{
            scope.row.root === 1
              ? "管理员"
              : scope.row.root === 3
              ? "全站管理员"
              : "普通用户"
          }}
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        align="center"
        header-align="center"
        min-width="200"
        fixed="right"
      >
        <!-- eslint-disable-next-line -->
        <template slot-scope="scope">
          <div class="table_optionItem">
            <div
              class="mmu_tableBtn colorBorder"
              @click="changeInfo(scope.row)"
            >
              修改账号
            </div>
            <div class="mmu_tableBtn greenFont" @click="changeRoot(scope.row)">
              修改权限
            </div>
            <div
              class="mmu_tableBtn redBorder commonBtn"
              @click="deleteUser(scope.row)"
            >
              删除
            </div>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      title="修改账号信息"
      :visible.sync="dialogVisible"
      :append-to-body="true"
    >
      <el-form ref="ruleForm" :model="changeData" label-width="80px">
        <el-form-item label="账号：">
          <el-input v-model="changeData.name"></el-input>
        </el-form-item>
        <el-form-item label="密码：">
          <el-input v-model="changeData.region"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="edit">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="修改账号权限"
      :visible.sync="dialogVisibleE"
      :append-to-body="true"
    >
      <el-form ref="ruleForm" :model="changeData" label-width="80px">
        <el-form-item label="用户权限：" label-width="100px">
          <el-select
            v-model="changeData.root"
            clearable
            placeholder="请选择用户权限"
          >
            <el-option label="普通用户" :value="0" />
            <el-option label="管理员" :value="1" />
            <el-option label="全站管理员" :value="3" />
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibleE = false">取 消</el-button>
        <el-button type="primary" @click="changeRt">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
  
<script>
import { search, change, deluser, changeuserRoot } from "@/api/use";
export default {
  data() {
    return {
      dialogVisible: false,
      dialogVisibleE: false,
      tableData: [],
      changeData: {},
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    changeRt() {
      changeuserRoot({
        id: this.changeData.id,
        root: this.changeData.root,
      }).then((res) => {
        if (res.status === 200) {
          this.$message.success("修改成功！");
          (this.changeData = {}), (this.dialogVisibleE = false);
          this.getList();
        } else {
          this.$message.error("修改失败！");
        }
      });
    },
    edit() {
      change({
        id: this.changeData.id,
        name: this.changeData.name,
        region: this.changeData.region,
      }).then((res) => {
        if (res.status === 200) {
          this.$message.success("修改成功！");
          (this.changeData = {}), (this.dialogVisible = false);
          this.getList();
        } else {
          this.$message.error("修改失败！");
        }
      });
    },
    deleteUser(row) {
      const info = localStorage.getItem("imgUrlS");
      const nowRoot = info.split("+")[2];
      if (row.root < nowRoot || nowRoot === 3) {
        this.delete(row);
      } else {
        this.$message.error("您的权限不足！无法删除此账号！");
      }
    },
    delete(row) {
      this.$confirm("此操作将永久删除该账号, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then((status) => {
          if (status == "confirm") {
            deluser({ id: row.id }).then((res) => {
              if (res.status === 200) {
                this.$message.success("删除成功!");
                this.getList();
              } else {
                this.$message.error("删除失败");
              }
            });
          }
        })
        .catch((status) => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    changeRoot(row) {
      const info = localStorage.getItem("imgUrlS");
      const nowRoot = info.split("+")[2];
      if (nowRoot === 3) {
        this.changeData = row;
        this.dialogVisibleE = true;
      } else {
        this.$message.error("您的权限不足！无法修改此账号的权限等级！");
      }
    },
    changeInfo(row) {
      const info = localStorage.getItem("imgUrlS");
      const nowRoot = info.split("+")[2];
      if (row.root < nowRoot || nowRoot === 3) {
        this.changeData = row;
        this.dialogVisible = true;
      } else {
        this.$message.error("您的权限不足！无法修改此账号的信息！");
      }
    },
    getList() {
      search().then((res) => {
        if (res.status === 200) {
          this.tableData = res.data;
        }
      });
    },
  },
};
</script>
  
<style lang="scss" scoped>
.bannerImg {
  width: 100%;
}

.processExplainBtn {
  cursor: pointer;
  color: #2d7df5;
}

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