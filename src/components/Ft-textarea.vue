<template>
  <textarea
    ref="textarea"
    :style="{'height': height}"
    v-model="temp"
    class="my-textarea"
    :placeholder="placeholder"
    cols="50"
  ></textarea>
</template>

<script>
import calcTextareaHeight from "@/assets/calcTextareaHeight";

export default {
  name: "ft-area",
  props: {
    value: {
      type: String,
      default: ""
    },
    placeholder: {
      type: String,
      default: "要做点什么"
    }
  },
  data() {
    return {
      height: "30px",
      temp: this.value
    };
  },
  methods: {
    getHeight() {
      this.height = calcTextareaHeight(this.$refs.textarea, 1, null).height;
    }
  },
  watch: {
    temp() {
      this.getHeight();
      this.$emit('update:value',this.temp);
    },value(){
        this.temp = this.value
    }
  }
};
</script>
<style >
.my-textarea {
  display: inline-block;
  width: 610px;
  /*height: 30px;*/
  line-height: 30px;
  font-size: 20px;
  font-weight: bold;
  font-family: "微软雅黑";
  resize: none;
  border: 0;
  outline: none;
  color: rgb(137,137,137);
}
</style>