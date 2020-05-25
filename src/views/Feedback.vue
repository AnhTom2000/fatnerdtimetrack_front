<template>
  <div class="feedback">
    <vue-topprogress ref="topProgress"></vue-topprogress>
    <div class="feedbackType">
      <span class="feedbackTitle">反馈类型</span>
      <el-select v-model="value" placeholder="请选择">
        <el-option v-for="type in types" :key="type.id" :label="type.name" :value="type.name"></el-option>
      </el-select>
    </div>
    <div class="feedbackValue">
      <span class="feedbackTitle">反馈内容</span>
      <div class="feedbackMain">
        <el-input
          type="textarea"
          :autosize="{ minRows: 10, maxRows: 10}"
          placeholder="请输入内容"
          v-model="feedback"
          resize="false"
        ></el-input>
      </div>
    </div>
    <div class="feedbackFooter">
      <el-button type="success" round @click="submit">提交反馈</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      types: [
        {
          id: "1",
          name: "建议"
        },
        {
          id: "2",
          name: "反馈"
        }
      ],
      value: "",
      feedback: ""
    };
  },
  methods: {
    submit() {
      if (this.value.length < 1 || this.feedback.length < 1) {
        this.$message.error("请填写必要的字段");
        return false;
      }
      this.$refs.topProgress.start();
      this.$axios({
        url: "/feedback/submitFeedback",
        method: "post",
        transformRequest: [
          data => {
            //  对data进行任意转换处理
            return this.$qs.stringify(data);
          }
        ],
        data: {
          type: this.value,
          feedbackContent: this.feedback
        }
      }).then(res => {
        if (res.data.code == 200) {
          this.$refs.topProgress.done();
          this.value = "";
          this.feedback = "";
          this.$message.success("提交成功,感谢您的反馈");
        }
      });
    }
  }
};
</script>

<style >
.feedback {
  width: 100%;
  height: 100%;
}

.feedback .feedbackTitle {
  margin-right: 30px;
}
.feedback .feedbackType {
  margin-bottom: 50px;
}

.feedback .feedbackValue {
  position: relative;
  height: 200px;
  margin-bottom: 80px;
}
.feedback .el-textarea {
  position: absolute;
  width: 498px;
  top: 20%;
  left: 14%;
}

.feedback .feedbackFooter {
  position: relative;
  width: 100%;
  height: 100%;
  border-top: 1px solid rgba(217, 217, 217, 0.6);
}
.feedback .feedbackFooter .el-button {
  display: block;
  margin: 40px auto;
}
</style>