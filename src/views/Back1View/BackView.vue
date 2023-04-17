<!--
 * @Author: Chai chai 2787922490@qq.com
 * @Date: 2023-02-05 19:10:57
 * @LastEditors: Chai chai 2787922490@qq.com
 * @LastEditTime: 2023-04-17 22:50:46
 * @FilePath: \Vue-Second-dimensional-personal-blog\src\views\Back1View\BackView.vue
 * @Description: 
 * 
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
-->

<template>
  <div class="postBox">
    <div class="postLeft">
      <div
        class="leftName"
        style="
          color: #fff;
          font-size: 30px;
          font-weight: 600;
          text-align: left;
          margin: 0 0 20px 20px;
          padding-top: 20px;
        "
      >
        发布文章
      </div>
      <div class="posttitleBox">
        <div
          class="tltleName"
          style="
            color: #fff;
            font-weight: 600;
            font-size: 24px;
            margin-bottom: 20px;
          "
        >
          文章标题
        </div>
        <el-input
          class="titleIpt"
          v-model="titleText"
          placeholder="请输入文章标题"
        />
      </div>
      <div class="posttitleBox">
        <div
          class="tltleName"
          style="
            color: #fff;
            font-weight: 600;
            font-size: 24px;
            margin-bottom: 20px;
            margin-top: 20px;
          "
        >
          摘要
        </div>
        <el-input
          class="titleIpt"
          v-model="titleKey"
          placeholder="请输入文章摘要"
        />
      </div>
      <div class="postarticleBox">
        <div
          class="tltleName"
          style="
            color: #fff;
            font-weight: 600;
            font-size: 24px;
            margin-bottom: 20px;
            margin-top: 20px;
          "
        >
          文章内容
        </div>
        <el-tiptap
          @onInit="onInit"
          v-model="content"
          :extensions="extensions"
          lang="zh"
          class="postArticle"
        />
      </div>
      <div class="postarticleBox">
        <div
          class="tltleName"
          style="
            color: #fff !important;
            font-weight: 600;
            font-size: 24px;
            margin-bottom: 20px;
            margin-top: 20px;
          "
        >
          文章封面
        </div>
        <Upload
          style="color: #fff !important; margin-bottom: 20px"
          @func="getImg"
        ></Upload>
      </div>
      <!-- <div class="classificationBox">
        <div class="className">文章分类</div>
        <el-select class="classIfication"></el-select>
      </div> -->
      <div class="buttonBox">
        <el-button type="info" @click="$router.push('/blog')">返回</el-button>
        <el-button type="primary" class="okBox" @click="pushSbumit"
          >发布文章</el-button
        >
      </div>
    </div>
    <div class="postRight"></div>
  </div>
</template>

<script>
import { newPaper, changeIntegral, searchIntegral } from "@/api/use";
import Upload from "@/components/uploadView/paperTitle.vue";

import {
  ElementTiptap,
  // 需要的 extensions
  Doc,
  Text,
  Paragraph,
  Heading,
  Bold,
  Italic,
  Strike,
  ListItem,
  BulletList,
  OrderedList,
  Link,
  Image,
  CodeBlock,
  Blockquote,
  TodoItem,
  TodoList,
  TextAlign,
  FontSize,
  FontType,
  Fullscreen,
  TextHighlight,
  TextColor,
  FormatClear,
  Table,
  TableHeader,
  TableCell,
  TableRow,
  History,
  TrailingNode,
  HardBreak,
  HorizontalRule,
  LineHeight,
  Indent,
} from "element-tiptap";

export default {
  components: { Upload },
  name: "postarticle",
  data() {
    // 编辑器的 extensions
    // 它们将会按照你声明的顺序被添加到菜单栏和气泡菜单中
    return {
      titleImgUrl: "",
      titleKey: "",
      titleText: "",
      extensions: [
        new Doc(), // 必须项
        new Text(), // 必须项
        new Paragraph(), // 必须项
        new Heading({ level: 6 }), // 标题
        new Bold({ bubble: true }), // 加粗 bubble: true 在气泡菜单中渲染菜单按钮
        // new Underline({ bubble: true, menubar: false }), // 下划线 bubble: true, menubar: false 在气泡菜单而不在菜单栏中渲染菜单按钮
        new Italic({ bubble: true }), // 斜体
        new Strike({ bubble: true }), // 删除线
        new ListItem(), // 使用列表必须项
        new BulletList({ bubble: true }), // 无序列表
        new OrderedList({ bubble: true }), // 有序列表
        new Link(), // 链接
        // new Image(), // 图片
        new CodeBlock({ bubble: true }), // 代码块
        new Blockquote(), // 引用
        new TodoItem(), // 任务列表必须项
        new TodoList(), // 任务列表
        new TextAlign({ bubble: true }), // 文本对齐方式
        new FontSize({ bubble: true }), // 字号
        new FontType({ bubble: true }), // 字体
        new Fullscreen(), // 全屏
        new TextHighlight({ bubble: true }), // 文本高亮
        new TextColor({ bubble: true }), // 文本颜色
        new FormatClear({ bubble: true }), // 清除格式
        new Table({ resizable: true }), // 表格
        new TableHeader(), // 表格必须项
        new TableCell(), // 表格必须项
        new TableRow(), // 表格必须项
        new History(), // 撤销
        new TrailingNode(), // 重做
        new HardBreak(), // 分割线
        new HorizontalRule(), // 行距
        new LineHeight(), // 增加缩进
        new Indent(), // 减少缩进
      ],
      // 编辑器的内容
      content: `
        <h1>请输入文章内容</h1>
      `,
    };
  },
  mounted() {
    this.searchIntegral();
  },
  methods: {
    searchIntegral() {
      const info = localStorage.getItem("imgUrlS");
      searchIntegral({ id: info.split("+")[3] }).then((res) => {
        if (res.status === 200) {
          this.data = res.data[0].integral;
        }
      });
    },
    getImg(data) {
      this.titleImgUrl = data;
    },
    /*
     * tiptap editor 实例
     * 阅读 https://tiptap.scrumpy.io/docs/guide/editor.html
     */
    onInit({ editor }) {
      console.log(editor);
    },
    changeIntegral() {
      const info = localStorage.getItem("imgUrlS");
      const data = {
        id: info.split("+")[3],
        integral: this.data,
      };
      changeIntegral(data).then((res) => {});
    },
    pushSbumit() {
      const info = localStorage.getItem("imgUrlS");
      const data = {
        name: info.split("+")[1],
        imgUrl: info.split("+")[0],
        title: this.titleText,
        content: this.content,
        createTime: this.$dayjs(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
        titleKey: this.titleKey,
        titleImgUrl: this.titleImgUrl,
      };
      if (this.titleText === "") {
        this.$message.error("请输入文章标题");
        return;
      }
      if (this.titleKey === "") {
        this.$message.error("请输入文章摘要");
        return;
      }
      if (this.content === "") {
        this.$message.error("请输入文章内容");
        return;
      }
      if (this.titleImgUrl === "") {
        this.$message.error("请上传文章封面");
        return;
      }
      newPaper(data).then((res) => {
        if (res.status === 200) {
          this.$message.success("发布成功！");
          this.changeIntegral();
          this.$router.push("/blog");
        } else {
          this.$message.error("发布失败！");
        }
      });
    },
  },
};
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
}
.postBox {
  // width: 90%;
  padding: 0 30px;
  margin: 0 auto;
  height: 100vh;
  // 背景图片
  background: url("@/assets/bg4.png");
  background-repeat: no-repeat;
  background-size: cover;
  // background-size: 500px;
  // background-position: 110% 100%;
  // background-attachment: fixed;
}
.buttonBox {
  margin-top: 30px;
}
</style>