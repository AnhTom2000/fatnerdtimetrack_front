<template>
  <div class="schedule-calendar" ref="calendar">
    <vue-topprogress ref="topProgress"></vue-topprogress>
    <header-bar :year="year" :month="month" @updateValue="updateView"></header-bar>
    <div class="schedule-calendar-body">
      <week :startWeek="startWeek"></week>
      <month :year="year" :month="month" :startWeek="startWeek" :data="events"></month>
    </div>
    <transition>
      <div v-clickoutside="unshow">
        <ft-event-card v-if="shows" :item.sync="current_item" />
      </div>
    </transition>
    <el-dialog title="添加事件" :visible.sync="dialogFormVisible" width="500px">
      <div>
        <div class="event-add">
          <el-input v-model="input" placeholder="记录下个事情"></el-input>
          <div class="event-seleted-time">
            <span>日期时间:</span>
            <el-date-picker
              v-model="date"
              type="datetime"
              :prefix-icon="''"
              :clearable="false"
              value-format="yyyy-MM-dd HH:mm:ss"
              placeholder="选择日期时间"
            ></el-date-picker>
          </div>
          <div class="event-tag_selected">
            <span>选择标签:</span>
            <el-select
              v-model="tag_input"
              multiple
              collapse-tags
              style="margin-left: 20px;"
              placeholder="请选择"
              :multiple-limit="3"
            >
              <el-option
                v-for="tag in tag_list"
                :key="tag.tagId"
                :label="tag.tagName"
                :value="tag.tagId"
              ></el-option>
            </el-select>
          </div>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addEvent">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { EventBus, isSameDay, format, Store } from "./utils";
import headerBar from "./header";
import week from "./week";
import month from "./month";
import event_card from "../Ft-event-card";
import { mapState } from "vuex";
export default {
  name: "schedule-calendar",
  components: {
    headerBar,
    week,
    month,
    "ft-event-card": event_card
  },
  props: {
    startMonth: String,
    startWeek: {
      type: Number,
      default: 1
    },
    events: {
      type: Array,
      default: []
    }
    // dateItemRender: Function
  },
  data() {
    return {
      year: new Date().getFullYear(),
      month: new Date().getMonth(),
      dragItem: null,
      current_item: {},
      shows: false,
      dialogFormVisible: false,
      date: "",
      input: "",
      tag_input: ""
    };
  },
  methods: {
    updateView(year, month) {
      this.year = year;
      this.month = month;
    },
    cellDragenter(e, date, type, index) {
      if (!this.type) return;
      this.$emit("event-dragenter", e, this.dragItem, date);
    },
    itemDragstart(e, item, date, type) {
      console.log("itemDragStart");

      if (item != null) {
        this.dragItem = item;
        this.$emit("event-dragstart", e, item, date);
      } else {
      }
    },
    itemDrop(e, date, type, index) {
      console.log("itemdrop");
      if (!this.dragItem) return;
      this.$emit("event-dragend", e, this.dragItem, date);
      this.dragItem = null;
    },
    itemClick(e, item) {
      console.log("[event-click]:", item);
      this.current_item = item;
      this.shows = true;

      this.$emit("event-click", e, item);
    },
    dateClick(e, date) {
      console.log("[date-click]:", date);
      this.dialogFormVisible = true;
      this.$emit("date-click", e, date);
    },
    itemDelete(item) {
      this.events.splice(this.events.indexOf(item), 1);
      this.$emit("update:events", this.events);
      this.current_item = {};
      this.shows = false;
    },
    unshow(e) {
      this.shows = false;
    },
    addEvent() {
      let tagList = [];
      if (this.input.length < 1 || this.input == "") {
        this.$message.warning("请填写任务名");
        return;
      }
      for (let i = 0; i < this.tag_input.length; i++) {
        for (let j = 0; j < this.tag_list.length; j++) {
          if (this.tag_input[i] === this.tag_list[j].tagId) {
            tagList.push(this.tag_list[j]);
          }
        }
      }
      this.dialogFormVisible = false;
      let newTodo = {
        eventTitle: this.input,
        date: this.date,
        tagList: tagList,
        priority: 3,
        finished: false,
        eventDescription: ""
      };
      this.$refs.topProgress.start();
      this.$axios({
        method: "post",
        url: "/event/addEvent",
        data: {
          eventTitle: this.input,
          date: this.date,
          tagList: tagList,
          priority: 3,
          finished: false,
          eventDescription: ""
        },
        responseType: "json"
      })
        .then(res => {
          if (res.data) {
            this.$refs.topProgress.done();
            this.$message.success("添加成功,+1事件");
            this.$store.commit("addTodo", res.data);
          } else {
            this.$refs.topProgress.fail();
            this.$message.error("请重试");
          }
        })
        .catch(error => {
          this.$refs.topProgress.fail();
          this.$message.error(error);
        });
      this.input = "";
      this.tag_input = [];
    }
  },
  computed: {
    ...mapState({
      tag_list: state => state.tag_list
    })
  },
  created() {
    EventBus.$on("cell-dragenter", this.cellDragenter);
    EventBus.$on("item-dragstart", this.itemDragstart);
    EventBus.$on("item-drop", this.itemDrop);
    EventBus.$on("item-click", this.itemClick);
    EventBus.$on("date-click", this.dateClick);
    EventBus.$on("item-delete", this.itemDelete);
  },
  destoryed() {
    EventBus.$off();
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
<style lang="less">
.event-add {
  width: 100%;
  height: 100%;
}

.event-seleted-time {
  height: 80px;
  margin-top: 30px;
}
.event-seleted-time span {
  margin-right: 30px;
}
.event-seleted-time .el-input--suffix .el-input__inner {
  padding-right: 7px;
}
.event-tag_selected {
  width: 460px;
  margin: 0 auto;
}
@import "./variables.less";

.schedule- {
  &calendar {
    position: relative;
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    min-width: @sc-cell-min-width * 7;
    color: @sc-base-color;
    font-size: @sc-base-font-size;
    box-shadow: @sc-box-shadow;

    *,
    *::before,
    *::after {
      box-sizing: border-box;
    }

    button {
      border: 0;
      outline: none;
      cursor: pointer;
      background: transparent;
    }

    &-body {
      position: relative;
      flex: 1;
      width: 100%;
      overflow: hidden;
      background: @sc-body-color;
    }
  }
}
</style>
