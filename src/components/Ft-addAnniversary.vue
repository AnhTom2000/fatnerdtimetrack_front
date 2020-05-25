<template>
  <div class="event-add">
    <el-input v-model="input" @input="titleinput" placeholder="输入纪念日标题"></el-input>
    <div class="event-seleted-time">
      <div class="event-date">
        <el-date-picker  value-format="yyyy-MM-dd" v-model="selectDate" @change="selectDates" type="date" placeholder="选择日期"></el-date-picker>
      </div>
    </div>
    <div class="event-description">
      <el-input v-model="description" @input="descriptioninput" placeholder="添加描述"></el-input>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    endTime: String,
    descriptions: String
  },
  data() {
    return {
      input: "",
      selectDate: this.date,
      time: new Date().getTime(),
      description: ""
    };
  },
  methods: {
    titleinput() {
      this.$emit("update:title", this.input);
    },
    descriptioninput() {  
      this.$emit("update:desciptions", this.description);
    },
    selectDates() {
      this.$emit("update:endTime", this.selectDate);
    }
  }
};
</script>


<style lang="less" scoped>
.event-add {
  width: 100%;
  height: 100%;
}

.event-date {
  width: 460px;
  float: left;
  margin-right: 20px;
}
.event-date .el-date-editor.el-input,
.el-date-editor.el-input__inner {
  width: 460px !important;
}
.event-seleted-time {
  height: 80px;
  margin-top: 30px;
}
.event-tag_selected {
  width: 460px;
  margin: 0 auto;
}
</style>