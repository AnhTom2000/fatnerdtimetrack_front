<template>
  <div class="inner-input" @click.stop="Onactive">
    <el-input
      v-model="name"
      placeholder="请输入内容"
      :class="{'inner-input-active' : active}"
      @blur="Onblur"
    ></el-input>
  </div>
</template>

<script>
export default {
  props: {
    username: String
  },
  data() {
    return {
      name : '',
      active: false
    };
  },mounted(){
    this.name = this.username
  },
  methods: {
    Onactive() {
      this.active = true;
    },
    Onblur() {
      this.active = false;
      this.$emit('update:username',this.name);
    }
  },watch :{
    username(){
        this.name = this.username
    }
  }
};
</script>
<style >
.inner-input {
  height: 50px;
  box-sizing: border-box !important;
}
.inner-input .el-input__inner {
  border: none;
  border-radius: 0;
  font-size: 35px;
  box-sizing: border-box !important;
}
.inner-input-active {
  box-sizing: border-box !important;
  border-bottom: 2px solid rgb(129, 148, 222);
}
</style>