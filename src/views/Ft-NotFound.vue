<template>
  <div>
    <div style="z-index : 99999999; margin-top: auto;margin-bottom: auto;">
      <el-button @click="goto" type="danger" style="position:absolute; top:50%;left:50%;margin-left:-50px">
        <svg
          t="1582105811913"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="3503"
          width="16"
          height="16"
        >
          <path
            d="M1020.809969 540.71028028l-861.30841101 0L159.50155799 460.95950128 1020.80996901 460.95950128l-1e-8 79.750779z"
            fill="#d81e06"
            p-id="3504"
          />
          <path
            d="M200.97196302 620.46105929L1e-8 502.42990627l200.97196301-121.22118401 0 239.25233703z"
            fill="#d81e06"
            p-id="3505"
          />
        </svg>返回首页
      </el-button>
    </div>
  </div>
</template>
<script>
export default {
  methods:{
    goto(){
      this.$router.push({ name: "all" });
    }
  }
}
</script>
<style scoped>
div {
  width: 1920px;
  height: 940px;
  z-index: 1;
  background: url("../images/404.jpg") no-repeat center center;
}

</style>