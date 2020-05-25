<template>
  <div class="login">
    <vue-particles
      color="#dedede"
      :particleOpacity="0.7"
      :particlesNumber="80"
      shapeType="circle"
      :particleSize="4"
      linesColor="#dedede"
      :linesWidth="1"
      :lineLinked="true"
      :lineOpacity="0.4"
      :linesDistance="150"
      :moveSpeed="3"
      :hoverEffect="true"
      hoverMode="grab"
      :clickEffect="true"
      clickMode="push"
    ></vue-particles>
    <div class="login-item">
      <router-view />
    </div>
  </div>
</template>

<style >
.login {
  position: relative;
  width: 1920px;
  height: 938px;
  margin: 0;
  padding: 0;
  background: url("../images/sky.871d198.jpg");
  background-repeat: no-repeat;
  background-attachment: fixed;
  filter: progid:DXImageTransform.Microsoft.AlphaImageLoader(src='../images/img3615969469ee8.jpg', sizingMethod='scale');
  -ms-filter: progid:DXImageTransform.Microsoft.AlphaImageLoader(src='../images/img3615969469ee8.jpg', sizingMethod='scale');
  background-size: cover;
  -moz-background-size: cover;
  -webkit-background-size: cover;
  z-index: 196;
  box-sizing: border-box;
  overflow: hidden;
}
.login-item {
  position: absolute;
  width: 446px;
  height: 634px;
  background-color: rgba(201, 201, 201, 0.5);
  left: 50%;
  top: 50%;
  margin-top: -312px;
  margin-left: -223px;
}
</style>

<script>
export default {
  created() {
    this.isLogin();
  },
  methods: {
    isLogin() {
      this.$axios({
        method: "get",
        url: "/user/isLogin"
      }).then(res => {
        if (res.data) {
          this.$router.push({ name: "all" });
        }
      });
    }
  }
};
</script>