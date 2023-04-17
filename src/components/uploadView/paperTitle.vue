<template>
  <div class="dashboard-editor-container">
    <span style="margin-bottom: 20px">
      <span style="color=red!important;">*</span>
      请先选择封面图片，再点击“上传封面”（仅支持jpg格式图片）<span>*</span>
    </span>

    <el-upload
      class="upload-demo"
      action=""
      ref="upload"
      :file-list="fileList"
      :limit="2"
      :on-change="handleChange"
      :on-remove="handleRemove"
      :auto-upload="false"
      accept=""
    >
      <el-button slot="trigger" size="small" type="primary"
        >① 选择封面</el-button
      >
      <el-button
        style="margin-left: 10px"
        size="small"
        type="success"
        @click="submitForm"
        >② 上传封面</el-button
      >
      <!-- <el-button style="margin-left: 10px;" size="small" type="success" @click="resumeUpload">继续</el-button>
      <el-button style="margin-left: 10px;" size="small" type="success" @click="stopUplosd">暂停</el-button> -->
      <!-- <el-button style="margin-left: 10px;" size="small" type="success" @click="abortMultipartUpload">清除切片</el-button> -->
    </el-upload>
    <el-progress
      :percentage="percentage"
      :status="uploadStatus"
      style="margin-top: 20px"
    ></el-progress>
  </div>
</template>
 
<script>
let OSS = require("ali-oss");
//oss配置
const client = new OSS({
  //地址
  region: "oss-cn-hangzhou",
  //id
  accessKeyId: "LTAI5tRe5mmNGBY257AXkRvU",
  //密码
  accessKeySecret: "GdBx0IwsRBtPblsoyMlJGgulWJ2TZH",
  //桶的名字
  bucket: "familydemo",
});
export default {
  data() {
    return {
      img: "",
      fileList: [],
      file: null,
      tempCheckpoint: null, // 用来缓存当前切片内容
      uploadId: "",
      uploadStatus: null, // 进度条上传状态
      percentage: 0, // 进度条百分比
      uploadName: "", //Object所在Bucket的完整路径
    };
  },
  mounted() {
    // window.addEventListener('online',  this.resumeUpload);
  },
  methods: {
    // 点击上传至服务器
    submitForm(file) {
      this.multipartUpload();
    },
    // 取消分片上传事件
    // async abortMultipartUpload() {
    //   window.removeEventListener('online', this.resumeUpload)
    //   const name = this.uploadName; // Object所在Bucket的完整路径。
    //   const uploadId = this.upload; // 分片上传uploadId。
    //   const result = await client.abortMultipartUpload(name, uploadId);
    //   console.log(result, '=======清除切片====');
    // },
    // 暂停分片上传。
    stopUplosd() {
      window.removeEventListener("online", this.resumeUpload); // 暂停时清除时间监听
      let result = client.cancel();
      console.log(result, "---------暂停上传-----------");
    },
    // 切片上传
    async multipartUpload() {
      // console.log(!this.file.name.includes('.jpg'));
      if (!this.file) {
        this.$message.error("请选择文件");
        return;
      }
      if (!this.file.name.includes(".jpg")) {
        this.$message.error("只能上传jpg文件！");
        return;
      }
      this.uploadStatus = null;
      // console.log("this.uploadStatus",this.file, this.uploadStatus);

      this.percentage = 0;
      try {
        console.log(1111);
        //object-name可以自定义为文件名（例如file.txt）或目录（例如abc/test/file.txt）的形式，实现将文件上传至当前Bucket或Bucket下的指定目录。
        let result = await client.multipartUpload(this.file.name, this.file, {
          headers: {
            "Content-Disposition": "inline",
            "Content-Type": this.file.type, //注意：根据图片或者文件的后缀来设置，我试验用的‘.png’的图片，具体为什么下文解释
          },
          progress: (p, checkpoint) => {
            this.tempCheckpoint = checkpoint;
            this.upload = checkpoint.uploadId;
            this.uploadName = checkpoint.name;
            this.percentage = p * 100;
            // console.log(p, checkpoint, this.percentage, '---------uploadId-----------')
            // 断点记录点。浏览器重启后无法直接继续上传，您需要手动触发上传操作。
          },
          meta: { year: 2020, people: "dev" },
          mime: this.file.type,
        });
        console.log(result);
        if (result.res.status === 200) {
          this.$message.success("上传成功！");
        } else {
          this.$message.error("上传失败请重试！");
        }
        // console.log(result);
        // console.log(result.res.requestUrls[0].split('?')[0], 'result= 切片上传完毕=');
        this.img = result.res.requestUrls[0].split("?")[0];
        this.$emit("func", this.img);
      } catch (e) {
        window.addEventListener("online", this.resumeUpload); // 该监听放在断网的异常处理
        // 捕获超时异常。
        if (e.code === "ConnectionTimeoutError") {
          // 请求超时异常处理
          this.uploadStatus = "exception";
          console.log("TimeoutError");
          // do ConnectionTimeoutError operation
        }
        // console.log(e)
      }
    },
    // 恢复上传。
    async resumeUpload() {
      window.removeEventListener("online", this.resumeUpload);
      if (!this.tempCheckpoint) {
        this.$message.error("请先上传");
        return;
      }
      this.uploadStatus = null;
      try {
        let result = await client.multipartUpload(this.file.name, this.file, {
          headers: {
            "Content-Disposition": "inline",
            "Content-Type": this.file.type, //注意：根据图片或者文件的后缀来设置，我试验用的‘.png’的图片，具体为什么下文解释
          },

          progress: (p, checkpoint) => {
            this.percentage = p * 100;
            console.log(
              p,
              checkpoint,
              "checkpoint----恢复上传的切片信息-------"
            );
            this.tempCheckpoint = checkpoint;
          },
          checkpoint: this.tempCheckpoint,
          meta: { year: 2020, people: "dev" },
          mime: this.file.type,
        });
        console.log(result, "result-=-=-恢复上传完毕");
      } catch (e) {
        console.log(e, "e-=-=-");
      }
    },

    // 选择文件发生改变
    handleChange(file, fileList) {
      this.fileList = fileList.filter((row) => row.uid == file.uid);
      this.file = file.raw;
      console.log(this.file, "file");
      // 文件改变时上传
      // this.submitForm(file)
    },
    handleRemove(file, fileList) {
      this.percentage = 0; //进度条置空
      this.fileList = [];
    },
  },
};
</script>
 
<style scoped>
</style>
