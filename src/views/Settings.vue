<template>
  <div class="settings">
    <div class="inner"></div>
    <div class="s-body">
      <div class="settings-title">
        <h2>设置</h2>
        <span>
          <el-button type="primary" @click="$router.push({name : 'all'})">完成</el-button>
        </span>
      </div>
      <el-container>
        <el-aside>
          <el-menu
            default-active="1"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
          >
            <el-menu-item index="1">
              <i class="el-icon-menu"></i>
              <span slot="title">
                <router-link :to="{name : 'personalSettings'}">个人设置</router-link>
              </span>
            </el-menu-item>
            <el-menu-item index="3">
              <i class="el-icon-setting"></i>
              <span slot="title">
                <router-link :to="{name : 'otherSettings'}">其他</router-link>
              </span>
            </el-menu-item>
            <el-menu-item index="4">
              <i class="el-icon-setting"></i>
              <span slot="title">
                <router-link :to="{name : 'feedback'}">反馈</router-link>
              </span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-main style="overflow:auto !important;">
          <el-scrollbar style="height: 700px; width :678px; ">
            <router-view />
          </el-scrollbar>
        </el-main>
      </el-container>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isCollapse: true
    };
  },
  created() {
    this.$store.dispatch("initEventList");
    this.$store.dispatch("initTagList");
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
};
</script>

<style >
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 226px;
}
.settings {
  position: relative;
  width: 100%;
  height: 938px;
  background: #fafafa;
  overflow-y: hidden;
  z-index: 10;
}

.settings a {
  color: #303133;
}
.settings-title {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 333;
  padding: 0 20px;
}
.settings-title h2 {
  display: inline-block;
  width: 100px;
  font-size: 25px;
}
.settings-title .el-button {
  float: right;
  width: 100px;
}
.settings .inner {
  position: relative;
  width: 960px;
  height: 20px;
  margin: auto;
  padding-top: 42px;
}
.settings .el-container {
  border: 1px solid #eee;
  border-radius: 3px;
  background-color: #fff;
}
.settings .el-menu {
  border-right: none;
}
.settings .el-aside {
  width: 210px !important;
  height: 700px;
  border-right: 1px solid rgb(235, 235, 235);
  padding: 25px 0;
}
.settings .el-main {
  margin: 30px 0;
  margin-left: 70px;
  z-index: 555;
}
.settings .s-body {
  position: relative;
  width: 960px;
  height: 100%;
  padding-top: 78px;
  margin: auto;
  z-index: 999;
}

.el-menu-item {
  font-size: 21px !important;
}
.v-modal{
  z-index: 8!important;
}
</style>