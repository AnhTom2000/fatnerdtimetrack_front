<template>
  <el-container id="app">
    <el-aside width="230px" class="aside-left">
      <div class="user-img">
        <div>
          <img class="user_img" :src="user.avatarUrl" />
          <span class="user_name">{{user.username}}</span>
          <!-- 选择框--->
          <div class="selected">  
            <router-link :to="{name : 'personalSettings'}">个人中心</router-link>
            <a href="#" @click="exit">退出登录</a>
          </div>
          <!-- 选择框 -->
        </div>
      </div>
      <!-- 用户头像 -->
      <section class="aside_main">
        <router-link :to="{path:'/webapp/all'}" :class="{'selected-active' : active == 'all'}">
          <em>
            <svg
              t="1587201353750"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="1158"
              width="25"
              height="25"
            >
              <path
                d="M0 238.933333m68.266667 0l887.466666 0q68.266667 0 68.266667 68.266667l0 648.533333q0 68.266667-68.266667 68.266667l-887.466666 0q-68.266667 0-68.266667-68.266667l0-648.533333q0-68.266667 68.266667-68.266667Z"
                fill="#3377FF"
                p-id="1159"
              />
              <path
                d="M0 0m68.266667 0l887.466666 0q68.266667 0 68.266667 68.266667l0 68.266666q0 68.266667-68.266667 68.266667l-887.466666 0q-68.266667 0-68.266667-68.266667l0-68.266666q0-68.266667 68.266667-68.266667Z"
                fill="#A5C8FA"
                p-id="1160"
              />
              <path
                d="M420.864 829.781333l-120.832-392.192H180.224L59.392 829.781333h91.136l29.696-90.112h91.136c13.653333 1.365333 22.186667 3.413333 25.6 6.144 3.413333 2.730667 7.509333 9.898667 12.288 21.504l21.504 62.464h90.112z"
                fill="#A5C8FA"
                p-id="1161"
              />
              <path
                d="M271.36 528.725333l28.672 118.784H180.224l29.696-118.784z"
                fill="#3377FF"
                p-id="1162"
              />
              <path
                d="M692.224 739.669333h-120.832a28.16 28.16 0 0 1-21.504-8.704 30.856533 30.856533 0 0 1-8.192-22.016v-271.36h-90.112v302.08c0 25.258667 8.021333 46.592 24.064 64s38.058667 26.112 66.048 26.112h150.528v-90.112zM962.56 739.669333h-120.832a26.965333 26.965333 0 0 1-20.48-8.704 30.856533 30.856533 0 0 1-8.192-22.016v-271.36h-90.112v302.08c0 25.258667 8.021333 46.592 24.064 64s38.058667 26.112 66.048 26.112h149.504v-90.112z"
                fill="#A5C8FA"
                p-id="1163"
              />
            </svg>
          </em> 所&nbsp;有
        </router-link>
        <router-link
          :to="{path:'/webapp/caldenar',params:{tag_list:tag_list}}"
          :class="{'selected-active' : active == 'caldenar'}"
        >
          <em>
            <svg
              t="1587201107085"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="9038"
              width="25"
              height="25"
            >
              <path
                d="M505.6 1013.33333332h-400c-35.2 0-64-9.6-86.4-32-9.6-9.6-12.8-22.4-12.8-35.2v-608c0-35.2 38.4-64 83.2-67.2h83.2c12.8 0 19.2-3.2 19.2-12.8v-25.6c6.4-25.6 25.6-38.4 57.6-38.4 25.6 0 44.8 16 48 41.6v3.2c3.2 35.2 3.2 35.2 44.8 35.2h348.8c16 0 22.4-3.2 22.4-16v-22.4c3.2-25.6 25.6-38.4 54.4-38.4 28.8 0 48 16 51.2 38.4 0 12.8-6.4 28.8 3.2 35.2 12.8 6.4 32 3.2 48 3.2h48c48 3.2 86.4 32 86.4 70.4v601.6c0 41.6-41.6 70.4-99.2 73.6-128-6.4-265.6-6.4-400-6.4z m3.2-547.2h-400c-16 0-22.4 3.2-22.4 16v441.6c0 19.2 9.6 22.4 28.8 22.4h787.2c28.8 0 28.8 0 28.8-22.4V485.33333332c0-16-3.2-19.2-22.4-19.2h-400z"
                fill="#7774fd"
                p-id="9039"
              />
              <path
                d="M259.2 850.13333332H208c-22.4 0-32-9.6-35.2-25.6v-54.4c0-16 12.8-25.6 32-25.6h108.8c22.4 0 32 9.6 32 28.8v51.2c0 16-9.6 25.6-32 25.6h-54.4z m249.6 0h-51.2c-22.4 0-35.2-9.6-35.2-25.6V773.33333332c0-19.2 9.6-25.6 32-28.8H560c19.2 0 32 9.6 32 25.6v54.4c0 16-12.8 25.6-32 25.6h-51.2z m249.6-105.6h54.4c19.2 0 32 9.6 28.8 25.6v57.6c0 16-12.8 25.6-32 25.6H700.8c-19.2 0-32-9.6-32-25.6V773.33333332c0-16 12.8-25.6 32-25.6 19.2-6.4 38.4-3.2 57.6-3.2z m-249.6-76.8h-54.4c-22.4 0-32-6.4-32-25.6v-57.6c0-16 9.6-22.4 28.8-22.4h112c19.2 0 28.8 9.6 32 25.6v54.4c0 16-9.6 25.6-32 25.6h-54.4zM259.2 562.13333332h54.4c19.2 0 32 9.6 32 22.4v57.6c0 16-9.6 22.4-28.8 22.4h-112c-19.2 0-28.8-6.4-28.8-22.4V581.33333332c0-16 12.8-22.4 32-22.4 16 3.2 32 3.2 51.2 3.2z m496 105.6h-54.4c-19.2 0-32-9.6-32-25.6v-57.6c0-16 9.6-22.4 28.8-22.4h112c19.2 0 28.8 9.6 28.8 22.4v57.6c0 12.8-9.6 22.4-28.8 22.4-16 3.2-35.2 3.2-54.4 3.2z"
                fill="#7774fd"
                p-id="9040"
              />
            </svg>
          </em> 日&nbsp;历
        </router-link>
        <router-link
          :to="{path:'/webapp/calculate'}"
          :class="{'selected-active' : active === 'calculate'}"
        >
          <em>
            <svg
              t="1587201378497"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="1910"
              width="25"
              height="25"
            >
              <path
                d="M496 943.6c-55.8 0-110.1-11.1-161.4-32.9-49.4-21.1-93.9-51.2-132.2-89.5C164.1 783 134 738.5 112.9 689 91.1 637.7 80 583.4 80 527.6c0-55.8 11.1-110.1 32.9-161.4C134 316.8 164 272.3 202.3 234c38.3-38.3 82.8-68.4 132.2-89.5 51.3-21.9 105.6-32.9 161.3-33h26l0.1 390h390v26c0 55.8-11.1 110.1-32.9 161.4-21.1 49.4-51.2 93.9-89.5 132.2-38.3 38.3-82.8 68.4-132.2 89.5-51.2 22-105.5 33-161.3 33z m-26.1-779C281.3 178 132 335.7 132 527.6c0 200.7 163.3 364 364 364 192 0 349.7-149.4 363.1-338H470l-0.1-389z"
                fill="#4462FF"
                p-id="1911"
              />
              <path
                d="M944 472.4l-392-0.1V80.4h26c49.1 0 96.9 9.7 142 29 43.5 18.5 82.6 45 116.3 78.7s60.2 72.8 78.7 116.3c19.2 45.1 29 92.9 29 142v26z m-340-52.1l286.9 0.1C878.4 267.9 756.5 146 604 133.4v286.9z"
                fill="#4462FF"
                p-id="1912"
              />
              <path
                d="M432.1 838.3c-1.7 0-3.5-0.2-5.2-0.7-57.5-15.5-110.2-46-152.5-88.4-42.3-42.3-72.8-95-88.3-152.4-2.9-10.7 3.4-21.6 14.1-24.5 10.7-2.9 21.6 3.4 24.5 14.1 13.7 50.7 40.6 97.2 78 134.5 37.4 37.4 83.9 64.3 134.6 78 10.7 2.9 17 13.8 14.1 24.5-2.4 9.1-10.5 14.9-19.3 14.9z"
                fill="#FF636F"
                p-id="1913"
              />
            </svg>
          </em> 统&nbsp;计
        </router-link>
        <router-link
          :to="{path:'/webapp/anniversary'}"
          :class="{'selected-active' : active === 'anniversary'}"
        >
          <em>
            <svg
              t="1587201430407"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="2892"
              width="25"
              height="25"
            >
              <path
                d="M276.052 626.525L104.809 459.603c-35.446-34.552-24.369-68.645 24.617-75.763l236.653-34.388M511.744 797.764L300.075 909.045c-43.814 23.034-72.816 1.964-64.448-46.824l40.425-235.696M747.435 626.525l40.425 235.696c8.368 48.788-20.634 69.858-64.448 46.824L511.744 797.764M657.409 349.453l236.653 34.388c48.986 7.118 60.063 41.211 24.617 75.763L747.435 626.525M657.409 349.453L551.575 135.009c-21.907-44.388-57.755-44.388-79.662 0L366.079 349.453"
                fill="#FBB03B"
                p-id="2893"
              />
              <path
                d="M513.14 131.501l144.269 217.952 264.718 68.713-174.692 208.359 8.026 259.972-243.717-88.733-237.947 93.733 2.255-264.972-167.255-203.359 257.282-73.713z"
                fill="#FBB03B"
                p-id="2894"
              />
            </svg>
          </em> 纪&nbsp;念&nbsp;日
        </router-link>
        <h3 class="tag-header">标签</h3>
        <ft-tag_view :tag_list.sync="tag_list"></ft-tag_view>
      </section>
    </el-aside>
    <!-- 主区域 -->
    <el-main class="main" style="overflow-x:hidden;">
      <router-view />
    </el-main>
    <!-- 主区域 -->
  </el-container>
</template>

<script>
import Tag_view from "../components/Ft-tag_view";
import { mapState } from "vuex";
export default {
  data() {
    return {
      show_1: false,
      active: "",
      user: {}
    };
  },
  methods: {
    open() {},
    handleClick() {
      this.show_1 = true;
    },exit(){
      this.$axios({
        url : '/exit/userExit',
        method : 'get'
      }).then(res=>{
        if(res.data.code == 200){
          this.$router.push({name : '#login'});
        }
      })
    },
    isLogin() {
      this.$axios({
        method: "get",
        url: "/user/isLogin"
      }).then(res => {
        if (res.data) {
          this.user = res.data;
        } else {
          this.$confirm("您的会话已过期或者您未注册", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          })
            .then(() => {
              this.$router.push({ name: "#login" });
            })
            .catch(() => {
              this.$router.push({ name: "#login" });
            });
        }
      });
    },
    addTag(tag) {
      this.$axios({
        url: "/tag/addTag",
        method: post,
        data: {
          tag: tag
        }
      }).then(res => {
        if (res.data.code !== 200) {
          this.$message.error("服务器错误，请重试");
        }
      });
      this.$store.commit('pushTag',tag);
    }
  },
  watch: {
    $route(to, from) {
      this.active = to.name;
    }
  },
  components: {
    "ft-tag_view": Tag_view
  },
  created() {
    this.isLogin();
     this.$store.dispatch("initTagList");
  },
  computed: {
    ...mapState(["tag_list"])
  }
};
</script>
<style lang="scss">
* {
  body ::selection {
    background-color: rgb(186, 215, 251);
    text-shadow: none;
  }
  body ::-moz-selection {
    background-color: rgb(186, 215, 251);
    text-shadow: none;
    padding: 0;
    margin: 0;
  }
}

.aside-left,
.list {
  -moz-user-select: none; /*火狐*/
  -webkit-user-select: none; /*webkit浏览器*/
  -ms-user-select: none; /*IE10*/
  -khtml-user-select: none; /*早期浏览器*/
  user-select: none;
}
body {
  font-family: -apple-system, \.SFNSText-Regular, Helvetica Neue,
    Hiragino Sans GB, WenQuanYi Micro Hei, Microsoft Yahei, sans-serif, Meiryo;
  padding: 0;
  margin: 0;
}
ul {
  list-style: none;
}
a {
  text-decoration: none;
}
.el-main {
  padding: 0 !important;
  overflow-y: hidden !important;
}

.aside-left {
  position: relative !important;
  width: 300px !important;
  height: 935px;
  z-index: 1;
  background: rgb(221, 217, 217);
  overflow: visible !important;
}
.user-img {
  position: relative;
  height: 100px;
}
.user-img > div {
  position: absolute;
  width: 53px;
  height: 53px;
  left: 20px;
  top: 20px;
  border-radius: 50%;
}
.user-img > div span {
  position: absolute;
  top: 22px;
  left: 60px;
  font-size: 14px;
}

.user-img > div img {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  border-radius: 50%;
}
.selected {
  position: absolute;
  display: none;
  left: 7px;
  top: 56px;
  width: 152px;
  height:75px;
  border-radius: 4px;
  box-shadow: 0 2px 11px 0 rgba(0, 0, 0, 0.16);
  background-color: rgb(255, 255, 255);
  transition: all 1s;
  z-index: 1;
}
.selected::before {
  content: "";
  width: 0;
  height: 0;
  line-height: 0;
  font-size: 0;
  display: block;
  position: absolute;
  left: 13px;
  top: -14px;
  border: 7px solid transparent;
  border-bottom-color: rgb(255, 255, 255);
}
.user-img > div:hover .selected {
  display: block;
}

.user-img > div .selected a {
  display: block;
  padding: 10px 12px;
  border-radius: 4px;
  font-size: 10px;
  color: #000;
}
.user-img > div .selected a:hover {
  background: rgba(239, 241, 246, 1);
}
.aside_main {
  height: 300px;
  position: relative;
  padding: 20px 0 0 20px;
}

.aside_main a {
  display: block;
  width: 270px;
  height: 50px;
  padding: 3px 10px;
  border-radius: 10px;
  font-size: 20px;
  line-height: 45px;
  color: #000;
  margin-bottom: 10px;
}

.aside_main a em {
  vertical-align: middle;
  margin-right: 5px;
}
.aside_main a i {
  float: right;
}

.aside_main a:hover {
  background: rgba(174, 174, 174, 0.8);
}

.selected-active {
  background: rgba(174, 174, 174, 0.8);
}

.tag-header {
  margin: 50px 0 10px 0;
  font-weight: 400;
  color: rgb(80, 80, 80);
  font-size: 20px;
}
</style>
