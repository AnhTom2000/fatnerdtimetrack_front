<template>
  <div class="tag_edit">
    <em class="close" @click="changeEdited">
      <el-tooltip class="item" effect="dark" content="关闭" placement="top-end">
        <svg
          t="1587284567153"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="4370"
          width="20"
          height="20"
        >
          <path
            d="M512 1016C233.6 1016 8 790.4 8 512S233.6 8 512 8s504 225.6 504 504-225.6 504-504 504z m0-960C260.8 56 56 260.8 56 512s204.8 456 456 456 456-204.8 456-456S763.2 56 512 56z"
            fill="#36a8cc"
            p-id="4371"
          />
          <path
            d="M548.8 512L744 316.8c9.6-9.6 9.6-25.6 0-36.8l-1.6-1.6c-9.6-9.6-25.6-9.6-35.2 0L512 475.2 316.8 280c-9.6-9.6-25.6-9.6-35.2 0l-1.6 1.6c-9.6 9.6-9.6 25.6 0 36.8L475.2 512 280 707.2c-9.6 9.6-9.6 25.6 0 36.8l1.6 1.6c9.6 9.6 25.6 9.6 35.2 0L512 548.8 707.2 744c9.6 9.6 25.6 9.6 35.2 0l1.6-1.6c9.6-9.6 9.6-25.6 0-36.8L548.8 512z"
            fill="#36a8cc"
            p-id="4372"
          />
        </svg>
      </el-tooltip>
    </em>
    <h3>修改标签名称</h3>
    <div class="name_edit">
      <el-input placeholder="修改标签" v-model="temp_name" autofocus clearable></el-input>
    </div>
    <h3>修改标签颜色</h3>
    <div class="color_edit">
      <chrome-picker v-model="colors" />
    </div>
    <div class="tag_edit_footer">
      <el-button @click="changeEdited">取消</el-button>
      <el-button type="primary" @click="changeAll">确定</el-button>
    </div>
  </div>
</template>

<script>
import { Chrome } from "vue-color";
export default {
  name: "tag-edit",
  props: {
    color: {
      type: String,
      default: "#ccc"
    },
    tag_name: {
      type: String,
      default: ""
    },
    edited: {
      type: Boolean,
      default: false
    },
    tagId: {
      type: String
    }
  },
  data() {
    return {
      colors: {
        hex: this.color
      },
      temp_name: this.tag_name
    };
  },
  methods: {
   
    changeColor() {
      this.showProperss();
      this.$store.dispatch("updateTagColor", {
        color: this.colors.hex,
        tagId: this.tagId
      });
      this.$emit("update:color", this.colors.hex);
    },
    changeName() {
      this.showProperss();
      this.$store.dispatch("updateTagName", {
        tagName: this.temp_name,
        tagId: this.tagId
      });
      this.$emit("update:tag_name", this.temp_name);
    },
    changeEdited() {
      this.$emit("update:edited", false);
    },
    changeAll() {
      this.changeName();
      this.changeColor();
      this.changeEdited();
    }
  },
  components: {
    "chrome-picker": Chrome
  }
};
</script>

<style scoped>
.tag_edit {
  position: absolute;
  top: 100px;
  left: 500px;
  width: 500px;
  height: 550px;
  z-index: 1;
  border-radius: 4px;
  box-shadow: 0 2px 11px 0 rgba(0, 0, 0, 0.16);
  background-color: rgb(255, 255, 255);
  padding: 10px 30px 0 35px;
}
.name_edit {
  width: 400px;
}
.color_edit {
  width: 400px;
  /* margin-top: 10px; */
  /* padding: 0 125px 0 100px; */
}
.vc-chrome {
  width: 400px;
}
.tag_edit > h3 {
  font-weight: 400;
  font-family: "微软雅黑";
  font-size: 14px;
  margin: 10px 0;
  /* padding-left: 5px; */
  color: #000;
}

.tag_edit_footer {
  margin-top: 30px;
  float: right;
}

.close {
  display: inline-block;
  float: right;
  transition: all 0.2s;
  transform-origin: left bottom;
}

.close:hover {
  transform: rotate(90deg);
  cursor: pointer;
}
</style>