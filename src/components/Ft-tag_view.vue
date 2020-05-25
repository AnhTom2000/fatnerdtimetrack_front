<template>
  <div class="tag_view">
    <ul v-clickoutside="closed">
      <li v-for="tag in tag_list" :key="tag.tagId">
        <em class="tag_icon">
          <svg
            t="1587217900928"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="4082"
            width="23"
            height="23"
          >
            <path
              d="M940.032 461.824q45.056 53.248 1.024 102.4l-317.44 318.464q-10.24 8.192-22.016 11.776t-24.064 2.56-23.04-5.12-17.92-11.264q-114.688-114.688-204.8-205.824l-75.776-76.8q-37.888-36.864-67.072-66.56t-47.616-48.128l-19.456-19.456q-2.048-2.048-6.656-8.704t-9.728-17.408-9.216-24.064-4.096-28.672l0-18.432q0-14.336 0.512-35.84t1.024-47.104 0.512-52.224q1.024-62.464 2.048-138.24 2.048-12.288 4.608-24.576t12.8-23.552q10.24-10.24 23.04-13.824t23.04-3.584l311.296 0q2.048-1.024 14.336-0.512t15.36 2.56q6.144 2.048 13.824 7.168t12.8 10.24zM241.664 236.544q26.624 0 45.056-18.432t18.432-45.056-18.432-45.056-45.056-18.432-45.568 18.432-18.944 45.056 18.944 45.056 45.568 18.432z"
              p-id="4083"
              fill="#8a8a8a"
            />
          </svg>
        </em>
        <span class="tag_name">
          <el-input v-model="tag.tagName" @input.native="changTagName(tag)" class="inner_input"></el-input>
        </span>
        <div
          class="tag_color"
          :style="{'background-color':tag.tagBgColor}"
          @click="showColorSelected(tag)"
        >
          <ft-color_seleted
            class="color_selected_init"
            :class="{'color_seleted': color_seleted_show  === tag.tagId}"
            :color.sync="tag.tagBgColor"
            :color_seleted.sync="color_seleted_show"
            :tagId="tag.tagId"
          ></ft-color_seleted>
        </div>
        <em class="more" @click.stop.prevent="showMore(tag)">
          <svg
            t="1587218230239"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="4874"
            width="20"
            height="20"
          >
            <path
              d="M200.753 408.251c-57.062 0-103.749 46.687-103.749 103.749s46.687 103.749 103.749 103.749S304.502 569.062 304.502 512s-46.687-103.749-103.749-103.749z m622.494 0c-57.062 0-103.749 46.687-103.749 103.749s46.687 103.749 103.749 103.749S926.996 569.062 926.996 512s-46.687-103.749-103.749-103.749z m-311.247 0c-57.062 0-103.749 46.687-103.749 103.749S454.938 615.749 512 615.749 615.749 569.062 615.749 512 569.062 408.251 512 408.251z"
              fill="#515151"
              p-id="4875"
            />
          </svg>
        </em>
        <div class="more_edit" :class="{'active':active===tag.tagId}">
          <div class="edit_tag" @click="showEdit">
            <span>编辑</span>
          </div>
          <div @click.stop.prevent="delete_tag(tag)" class="delete_tag">
            <span>删除</span>
          </div>
        </div>
      </li>
      <tag-edit
        v-if="edited"
        :edited.sync="edited"
        :color.sync="computedTag.tagBgColor"
        :tag_name.sync="computedTag.tagName"
        :tagId="computedTag.tagId"
      ></tag-edit>
    </ul>
  </div>
</template>

<script>
import TagEdit from "./Ft-tag_edit";
import color_seleted from "./Ft-colorSelect";

export default {
  props: {
    tag_list: {
      type: Array,
      default: () => []
    }
  },
  name: "ft-tag_view",
  data() {
    return {
      active: "",
      temp_tag: {},
      edited: false,
      color_seleted_show: ""
    };
  },
  watch: {
    tag_list: {
      handler() {
        this.$emit("update:tag_list", this.tag_list);
      },
      deep: true
    }
  },
  components: {
    "tag-edit": TagEdit,
    "ft-color_seleted": color_seleted
  },
  methods: {
    selectTag(tag) {
      this.temp_tag = tag;
    },
    delete_tag(tag) {
      this.$store.dispatch("deleteTag", {
        tagId: tag.tagId
      });
      this.tag_list.splice(this.tag_list.indexOf(tag), 1);
      this.$emit("update:tag_list", this.tag_list);
    },
    showMore(tag) {
      this.active = tag.tagId;
      this.selectTag(tag);
    },
    showEdit() {
      this.edited = true;
      this.active = "";
    },
    showColorSelected(tag) {
      this.color_seleted_show = tag.tagId;
      this.selectTag(tag);
    },
    closed() {
      this.active = "";
      this.color_seleted_show = "";
    },
    changTagName(tag) {
      this.$store.dispatch("updateTagName", {
        tagName: tag.tagName,
        tagId: tag.tagId
      });
    }
  },
  computed: {
    computedTag() {
      return this.temp_tag;
    }
  },
  directives: {
    clickoutside: {
      bind: function(el, binding, vnode) {
        function documentHandler(e) {
          if (el.contains(e.target)) {
            return false;
          }
          if (binding.expression) {
            binding.value(e);
          }
        }
        el._vueClickOutside_ = documentHandler;
        document.addEventListener("click", documentHandler);
      },
      unbind: function(el, binding) {
        document.removeEventListener("click", el._vueClickOutside_);
        delete el._vueClickOutside_;
      }
    }
  }
};
</script>

<style >
.tag_view {
  width: 275px;
  height: 300px;
  box-sizing: border-box;
  resize: none;
  border-top: 1.5px solid rgb(168, 167, 167);
  z-index: 1;
}
.tag_view ul {
  margin-top: 10px;
}

.tag_view ul li {
  position: relative;
  vertical-align: top;
  height: 35px;
  line-height: 30px;
}
.tag_view ul li .tag_icon {
  position: relative;
  float: left;
  width: 35px;
  height: 35px;
  box-sizing: border-box;
  padding: 5px 5px;
}

.tag_view ul li .tag_name {
  margin-left: 5px;
  display: inline-block;
  width: 180px;
  white-space: nowrap; /*强制文字显示为一行*/
  overflow: hidden; /*溢出部分隐藏*/
  text-overflow: ellipsis; /*超出部分变成省略号*/
}
.tag_color {
  position: absolute;
  top: 12px;
  right: 40px;
  width: 10px;
  height: 10px;
  border-radius: 100%;
}
.tag_color:hover {
  cursor: pointer;
}

.more {
  display: none;
  position: absolute;
  top: 5px;
  right: 0px;
}
.tag_view ul li:hover .more {
  display: block;
  cursor: pointer;
}

.more_edit {
  display: none;
  position: absolute;
  top: 20px;
  right: -100px;
  width: 100px;
  height: 70px;
  border-radius: 4px;
  box-shadow: 0 2px 11px 0 rgba(0, 0, 0, 0.16);
  background-color: rgb(255, 255, 255);
  z-index: 1;
  resize: none;
}
.more_edit span {
  display: block;
  height: 35px;
  line-height: 35px;
  padding: 0 15px;
  font-size: 14px;
  font-family: 微软雅黑;
}
.more_edit span:first-child {
  border-bottom: 1px solid rgb(255, 255, 255);
}
.more_edit span:first-child:hover {
  background-color: rgba(236, 239, 245, 0.9);
}

.active {
  display: block;
}

.tag_name > .inner_input > .el-input__inner {
  border: none !important;
  background-color: rgb(221, 217, 217) !important;
  padding: 0 5px 5px 0;
  font-size: 16px;
  white-space: nowrap; /*强制文字显示为一行*/
  overflow: hidden; /*溢出部分隐藏*/
  text-overflow: ellipsis; /*超出部分变成省略号*/
}

.color_selected_init {
  display: none;
}
.color_seleted {
  display: block;
}
</style>