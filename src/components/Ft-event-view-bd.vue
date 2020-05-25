<template>
  <div class="bd">
    <div class="bd-header">
      <div class="bd-task-icon">
        <i v-if="item.finished">
          <svg
            t="1586588419701"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="5653"
            width="30"
            height="30"
          >
            <path
              d="M925.6 951.4H100.4c-14.9 0-27-12.1-27-27V99.2c0-14.9 12.1-27 27-27h825.1c14.9 0 27 12.1 27 27v825c0.1 7.2-2.7 14-7.8 19.1-5.1 5.3-11.9 8.1-19.1 8.1zM100.4 92.2c-3.8 0-7 3.2-7 7v825.2c0 3.8 3.2 7 7 7h825.2c1.8 0 3.6-0.7 4.9-2.1 1.3-1.3 2-3.1 2-4.9V99.2c0-3.8-3.2-7-7-7H100.4z"
              p-id="5654"
            />
            <path
              d="M511.4 587.2c-1.9 0-3.9-0.6-5.6-1.7L313.7 456.1a9.99 9.99 0 0 1-2.7-13.9c3.1-4.6 9.3-5.8 13.9-2.7L517 568.9c4.6 3.1 5.8 9.3 2.7 13.9-1.9 2.9-5.1 4.4-8.3 4.4z"
              p-id="5655"
            />
            <path
              d="M511.4 587.2c-2.2 0-4.4-0.7-6.2-2.2-4.3-3.4-5-9.7-1.6-14.1l256.7-321.3c3.4-4.3 9.7-5 14.1-1.6 4.3 3.4 5 9.7 1.6 14.1L519.2 583.4c-2 2.5-4.9 3.8-7.8 3.8z"
              p-id="5656"
            />
          </svg>
        </i>
        <i v-else>
          <svg
            t="1586423267664"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="8573"
            width="30"
            height="30"
          >
            <path
              d="M817.8 109.7H207.5c-12.9 0-22.7-10.6-22.7-22.7 0-12.9 10.6-22.7 22.7-22.7h610.2c12.9 0 22.7 10.6 22.7 22.7 0.8 12.1-9.8 22.7-22.6 22.7zM848 962.2H178c-13.6 0-25-11.4-25-25s11.4-25 25-25h670c13.6 0 25 11.4 25 25s-11.3 25-25 25z"
              p-id="8574"
            />
            <path
              d="M753.4 653.3l-0.8-1.5C714 584.4 662.5 540.5 608 514c54.5-27.3 105.2-70.4 144.6-137.8l0.8-1.5C792 308 817.8 217.2 822.3 96h-44.7c-3.8 112.1-27.3 195.3-62.8 256.7l-0.8 0.8c-43.9 78-93.1 119.6-156.7 139.3l-3 0.8h-0.8c-1.5 0.8-2.3 1.5-3.8 2.3l-0.8 0.8-1.5 1.5-1.5 1.5v0.8c-0.8 0.8-1.5 2.3-2.3 3.8l-0.8 0.8-1.5 5.3v8.3l1.5 5.3 0.8 0.8c0.8 1.5 1.5 2.3 2.3 3.8v0.8l1.5 1.5v-0.8l1.5 0.8 0.8 0.8c0.8 0.8 2.3 1.5 3.8 2.3h0.8l3 1.5c64.4 20.4 112.8 61.3 157.5 138.6l0.8 1.5c18.9 31.8 33.3 70.4 44.7 115.1 2.3 12.9 10.6 40.9 12.1 77.2-35.6-31.8-134-54.5-252.1-56V461.7c1.5 0 2.3-0.8 3.8-1.5v-0.8l6.1-2.3h1.5c43.2-13.6 77.2-34.8 106-62.8 30.3-30.3 53.8-67.4 69.7-109 4.5-11.4-0.8-24.2-12.9-28.8-11.4-4.5-24.2 0.8-28.8 12.1v0.8c-13.6 34.8-33.3 67.4-59.1 93.1-23.6 22.7-51.6 40.9-87.2 51.5l-0.8 0.8-2.3 0.8-3.8 0.8-2.3-0.8-1.5-0.8-2.3-0.8c-34.8-11.4-64.4-28.8-87.1-51.5-26.5-25.7-45.4-57.5-59.1-93.1-4.5-11.4-17.4-17.4-28-12.9-11.4 4.5-16.7 16.7-12.9 28.8 15.9 41.6 38.6 78.7 69.7 109 28 28 62.8 49.2 105.2 62.8h0.8l6.1 2.3 1.5 0.8c0.8 0.8 1.5 0.8 3 1.5v349.8c-110.5 0-206.7 18.9-252.1 45.4 1.5-18.2 5.3-37.9 12.1-66.6 11.4-45.4 26.5-83.3 44.7-115.1l0.8-1.5c44.7-77.2 93.1-118.1 158.2-138.6l2.3-1.5h0.8c1.5-0.8 2.3-1.5 3.8-2.3l0.8-0.8 1.5-0.8v-0.8l1.5-1.5v-0.8c0.8-0.8 1.5-2.3 2.3-3.8v-0.8c0.8-1.5 1.5-3.8 1.5-5.3v-7.6c0-1.5-0.8-3.8-1.5-5.3v-0.8c-0.8-1.5-1.5-3-2.3-3.8v-0.8l-1.5-1.5-1.5-1.5-2.3 0.8c-1.5-0.8-2.3-1.5-3.8-2.3h-0.8l-2.3-0.8c-64.4-19.7-113.6-61.3-158.2-139.3l-0.8-0.8C274 291.7 250.5 208.4 246 96.3h-44.7c4.5 121.1 30.3 211.2 68.9 278.6l0.8 1.5c38.6 67.4 90.1 110.5 144.6 137.8C361.1 540.7 310.4 584.6 271 652l-0.8 1.5C234 717.6 208.3 802.4 203 915.2h617.8c-5.3-113.5-30.3-198.3-67.4-261.9z"
              p-id="8575"
            />
          </svg>
        </i>
      </div>
      <div class="bd-icon-priority" style="float:right" @click.stop.prevent="show_priority">
        <svg
          t="1587029230955"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="5814"
          width="30"
          height="30"
        >
          <path
            d="M256 224h512a32 32 0 0 1 32 32v512a32 32 0 0 1-32 32H256a32 32 0 0 1-32-32V256a32 32 0 0 1 32-32z m256 480a32 32 0 1 0 0-64 32 32 0 0 0 0 64z m0-384a32 32 0 0 0-32 32v192a32 32 0 0 0 64 0v-192a32 32 0 0 0-32-32z"
            p-id="5815"
          />
        </svg>
      </div>
      <div class="bd-select-priority" v-if="priority_show">
        <h3>优先级</h3>
        <div class="bd-priority-table">
          <ul>
            <li
              :class="{'active' : item.priorityId === index+1}"
              v-for="(color,index) in color_arr"
              :key="index"
              @click.stop.prevent="selected_priority(index)"
            >
              <svg
                t="1587031433161"
                class="icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="8679"
                width="20"
                height="20"
              >
                <path
                  d="M576 832v128h-128v-128h128z m384 0v128h-128v-128h128z m-768 0v128h-128v-128h128z m384-768v640h-128v-640h128z m384 0v640h-128v-640h128z m-768 0v640h-128v-640h128z"
                  :fill="color"
                  p-id="8680"
                />
              </svg>
            </li>
          </ul>
        </div>
      </div>
      <div class="bd-block" style="float:right">
        <el-date-picker
          v-model="item.date"
          type="datetime"
          :prefix-icon="''"
          :clearable="false"
          value-format="yyyy-MM-dd hh:mm:ss"
          placeholder="选择日期时间"
          @change="changeDate"
        ></el-date-picker>
      </div>
    </div>
    <section class="bd-item_main">
      <div class="bd-caption-section">
        <ft-area
          :placeholder="'要做点什么'"
          :value.sync="item.eventTitle"
          @input.native="changeEventTitle"
        ></ft-area>
      </div>
      <div class="bd-description">
        <ft-area
          :placeholder="'添加描述'"
          :value.sync="item.eventDescription"
          style="font-size:14px;font-weight:400"
          @input.native="changeEventDescription"
        ></ft-area>
      </div>
    </section>
    <footer class="bd-footer">
      <div class="bd-tag-left">
        <el-tag
          :key="tag.id"
          v-for="tag in item.tagList"
          closable
          :disable-transitions="false"
          @close="handleClose(tag)"
        >{{tag.tagName}}</el-tag>
        <div class="select-tag" v-if="inputVisible" v-clickoutside="handleCloseTag">
          <div class="tag-input">
            <el-input
              class="input-new-tag"
              v-model="inputValue"
              ref="saveTagInput"
              clearable
              resize="none"
              size="small"
              @keyup.enter.native.stop.prevent="handleInputConfirm"
              @blur="handleInputConfirm"
              placeholder="输入标签,回车确认"
              :autofocus="true"
            ></el-input>
          </div>
          <div class="tag-list">
            <el-scrollbar style="height:162px;width:190px;padding-bottom:10px">
              <ul style="width:190px;max-height:150px;padding-left:15px;margin-bottom:6px">
                <li
                  v-for="(tag,index) in currentTagList"
                  :key="index"
                  @click.stop.prevent="selected_tag(tag)"
                >
                  <span>
                    <svg
                      t="1586957222563"
                      class="icon"
                      viewBox="0 0 1024 1024"
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                      p-id="2037"
                      width="14"
                      height="14"
                    >
                      <path
                        d="M908.9 541L486 117.5a65.762 65.762 0 0 0-46.6-19.3H164c-36.4 0-66 29.5-66 66v276c0 17.5 6.9 34.2 19.3 46.6l421.9 422.4c25.7 25.7 67.4 25.8 93.2 0.1l276.4-274.9 0.1-0.1c25.7-25.8 25.7-67.5 0-93.3z m-580-112.6c-54.6 0-98.9-44.3-98.9-99.1 0-54.7 44.4-99 99.1-98.9 54.7 0 99 44.4 98.9 99.1-0.1 54.7-44.4 99-99.1 98.9z"
                        p-id="2038"
                      />
                    </svg>
                  </span>
                  <pre v-text="tag.tagName"></pre>
                  <i class="el-icon-check" style="float:right;" v-if="tag.selected"></i>
                </li>
              </ul>
            </el-scrollbar>
          </div>
          <div class="tag-btn">
            <el-button type="primary" size="small" @click="confirm_selected">确定</el-button>
            <el-button type="info" size="small" @click.stop.prevent="tag_show = false">取消</el-button>
          </div>
        </div>
        <el-button class="bd-button-new-tag" size="small" @click="showInput">+ 新建标签</el-button>
      </div>

      <div class="bd-Trash-right" @click="deleteThisItem">
        <el-tooltip class="bd-item" effect="dark" content="删除任务" placement="top-start">
          <em>
            <svg
              t="1587194595758"
              class="icon"
              viewBox="0 0 1030 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="7153"
              width="20"
              height="20"
            >
              <path
                d="M1030.4 192v44.8c0 6.4 0 12.8-6.4 12.8-6.4 6.4-12.8 6.4-19.2 6.4h-70.4v633.6c0 38.4-12.8 70.4-32 96-25.6 25.6-51.2 38.4-83.2 38.4H211.2c-32 0-57.6-12.8-83.2-38.4-25.6-25.6-32-57.6-32-96V256H25.6C19.2 256 12.8 256 6.4 249.6c-6.4-6.4-6.4-6.4-6.4-12.8V192c0-6.4 0-12.8 6.4-12.8 6.4-6.4 12.8-6.4 19.2-6.4h224L300.8 64c6.4-19.2 19.2-32 38.4-44.8 19.2-12.8 38.4-19.2 57.6-19.2h230.4c19.2 0 38.4 6.4 57.6 19.2 19.2 12.8 32 25.6 38.4 44.8l51.2 108.8h224c6.4 0 12.8 0 19.2 6.4 12.8 0 12.8 6.4 12.8 12.8z m-185.6 697.6V256H192v633.6c0 12.8 0 19.2 6.4 25.6 6.4 6.4 6.4 12.8 12.8 19.2l6.4 6.4h608s6.4 0 6.4-6.4c6.4-6.4 6.4-12.8 12.8-19.2v-25.6zM377.6 403.2v384c0 6.4 0 12.8-6.4 12.8-6.4 6.4-12.8 6.4-19.2 6.4h-44.8c-6.4 0-12.8 0-19.2-6.4-6.4-6.4-6.4-6.4-6.4-12.8v-384c0-6.4 0-12.8 6.4-12.8 6.4-6.4 12.8-6.4 19.2-6.4h44.8c6.4 0 12.8 0 19.2 6.4 6.4 6.4 6.4 6.4 6.4 12.8z m-19.2-230.4h326.4l-32-76.8c-6.4-6.4-6.4-6.4-12.8-6.4H409.6c-6.4 0-6.4 6.4-12.8 6.4l-38.4 76.8z m204.8 230.4v384c0 6.4 0 12.8-6.4 12.8s-12.8 6.4-19.2 6.4h-44.8c-6.4 0-12.8 0-19.2-6.4-6.4-6.4-6.4-6.4-6.4-12.8v-384c0-6.4 0-12.8 6.4-12.8 6.4-6.4 12.8-6.4 19.2-6.4h44.8c6.4 0 12.8 0 19.2 6.4 6.4 6.4 6.4 6.4 6.4 12.8z m185.6 0v384c0 6.4 0 12.8-6.4 12.8-6.4 6.4-12.8 6.4-19.2 6.4h-44.8c-6.4 0-12.8 0-19.2-6.4-6.4-6.4-6.4-6.4-6.4-12.8v-384c0-6.4 0-12.8 6.4-12.8 6.4-6.4 12.8-6.4 19.2-6.4h44.8c6.4 0 12.8 0 19.2 6.4 6.4 6.4 6.4 6.4 6.4 12.8z"
                fill="#108EE9"
                p-id="7154"
              />
            </svg>
          </em>
        </el-tooltip>
      </div>
    </footer>
  </div>
</template>


<script>
import { EventBus } from "./scheduleCalendar/utils";
import ftArea from "./Ft-textarea";
export default {
  components: {
    ftArea
  },
  props: {
    item: Object
  },
  data() {
    return {
      priority_show: false,
      color_arr: ["#d81e06", "#f4ea2a", "#e6e6e6"],
      inputVisible: false,
      inputValue: "",
      currentTagList: [],
      tag_list_selected: []
    };
  },
  watch: {
    item() {
      this.getTagList();
      this.initList();
    }
  },
  mounted() {
    this.getTagList();
  },
  methods: {
    getTagList() {
      this.$axios({
        url: "/tag/findAll",
        method: "get"
      })
        .then(res => {
          console.log(123);

          this.currentTagList = res.data;
          this.initList();
        })
        .catch(error => {
          console.log(error);
        });
    },
    initList() {
      this.tag_list_selected = [];
      var tags = this.item.tagList;
      // console.log(tags);
      if (tags != undefined || tags != null || tags.length > 0) {
        for (let i = 0; i < tags.length; i++) {
          for (let k = 0; k < this.currentTagList.length; k++) {
            if (this.currentTagList[k].tagId == tags[i].tagId) {
              this.tag_list_selected.push(tags[i]);
              this.currentTagList[k].selected = true;
              break;
            }
          }
        }
      }
      console.log(123);

      console.log(this.tag_list_selected);
    },
    selected_tag(tag) {
      if (tag.selected) {
        this.tag_list_selected.splice(this.tag_list_selected.indexOf(tag), 1);
        tag.selected = false;
        return;
      }
      if (this.tag_list_selected.length >= 3) {
        this.$message.warning("最多添加三个标签");
        return;
      }
      tag.selected = true;
      this.tag_list_selected.push(tag);
    },
    confirm_selected() {
      if (this.tag_list_selected.length > 3) {
        this.$message.warning("最多选择三个标签");
        return;
      }
      this.$store.dispatch("updateEventTag", {
        tagList: this.tag_list_selected,
        eventId: this.item.eventId
      });
      this.inputVisible = false;
    },
    handleCloseTag() {
      this.inputVisible = false;
    },
    show_priority() {
      this.priority_show = !this.priority_show;
    },
    selected_priority(index) {
      this.item.priorityId = index + 1;
      this.$store.dispatch("updateEventPriority", {
        priorityId: this.item.priorityId,
        eventId: this.item.eventId
      });
      this.priority_show = !this.priority_show;
    },
    handleClose(tag) {
      this.$store.dispatch("deleteEventTag", {
        tag: tag,
        event: this.item
      });
      this.item.tagList.splice(this.item.tagList.indexOf(tag), 1);
      this.getTagList();
      this.initList();
    },

    showInput() {
      this.inputVisible = true;
    },
    handleInputConfirm() {
      let inputValues = this.inputValue;
      if (inputValues) {
        let tag = {
          tagName: inputValues,
          selected: false,
          tagBgColor: "#ccc"
        };
        this.$store.dispatch("addTag", tag);
      }
      this.inputValue = "";
    },
    deleteThisItem() {
      let vm = this;
      this.$confirm("此操作将永久删除该任务, 是否继续?", "删除任务", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          // EventBus.$emit("item-delete", vm.item);
          this.$store.dispatch("deleteEvent", vm.item);
        })
        .catch(() => {
          this.$message({
            type: "success",
            message: "取消删除成功"
          });
        });
    },
    changeDate() {
      console.log(this.item.date);
      this.$store.dispatch("updateEventDate", this.item);
    },
    changeEventTitle() {
      this.$store.dispatch("updateEventTitle", {
        title: this.item.eventTitle,
        event: this.item
      });
    },
    changeEventDescription() {
      this.$store.dispatch("updateEventDescription", this.item);
    }
  }
};
</script>


<style >
.bd {
  width: 100%;
  height: 100%;
}
.bd-header {
  position: relative;
  width: 100%;
  height: 65px;
  box-sizing: border-box;
  border-bottom: 1.5px solid rgb(153, 153, 153);
  padding: 15px 5px 5px 0px;
  vertical-align: bottom;
}
.bd-task-icon {
  float: left;
  margin-left: 15px;
  height: 24px;
  line-height: 24px;
}

.bd-block {
  width: 150px;
  box-sizing: border-box;
  margin-right: 20px;
}

.el-date-editor.el-input {
  width: 150px !important;
}
.bd-header .el-input--small .el-input__inner {
  float: left;
  width: 150px;
  padding-right: 10px;
}

.bd-header .el-input--suffix .el-input__inner {
  padding-right: 8px;
}
.el-popper {
  top: 400px;
}

.bd-caption-section {
  width: 328px;
  margin: 10px 0 20px 20px;
}

.bd-description {
  width: 328px;
  margin: 0 0 0 20px;
}

.bd-icon-priority {
  margin-left: 20px;
}
.bd-select-priority {
  position: absolute;
  width: 140px;
  height: 70px;
  border-radius: 4px;
  box-shadow: 0 2px 11px 0 rgba(0, 0, 0, 0.16);
  background-color: rgb(255, 255, 255);
  z-index: 2;
  resize: none;
  top: 70px;
  right: 0px;
}
.bd-select-priority h3 {
  font-size: 12px;
  font-weight: 400;
  height: 20px;
  line-height: 15px;
  padding: 5px 7px;
  color: rgb(117, 117, 117);
}
.bd-select-priority ul {
  width: 130px;
  margin: 0;
  padding: 0 5px;
  margin-top: 10px;
  line-height: 40px;
}
.bd-select-priority ul li {
  display: inline-block;
  width: 30px;
  height: 30px;
  margin-left: 15px;
  text-align: center;
  cursor: pointer;
}
.bd-select-priority ul li:first-child {
  margin-left: 0;
}
.bd-active {
  background-color: rgba(238, 238, 238, 0.8);
}
.bd-select-priority ul li:hover {
  background-color: rgba(238, 238, 238, 0.7);
}
.el-tag + .el-tag {
  margin-left: 10px;
}
.bd-button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.bd-input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}

.bd-footer {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 60px;
  line-height: 24px;

  box-sizing: border-box;
  resize: none;
  padding: 0 10px;
}

.bd-footer .bd-tag-left {
  float: left;
  width: 315px;
}

.bd-footer .bd-Trash-right {
  float: right;
  cursor: pointer;
}

.bd-item_main {
  width: 343px;
}

.bd-item_main .my-textarea {
  width: 260px !important;
}
</style>