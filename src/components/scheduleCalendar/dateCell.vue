<template>
  <div
    class="schedule-calendar-date"
    :class="[type, { today: isToday, dragged: draggedIndex === index }]"
    @dragover.prevent
    @dragenter.prevent="dragenter"
    @drop="onDrop"
    @click="cellClick"
  >
    <div class="schedule-calendar-date-hd">
      <div class="schedule-calendar-date-label">{{date.getDate()}}</div>
      <button
        type="button"
        class="schedule-calendar-counter"
        v-if="details.length > volume"
        @click.stop.prevent="expandAll"
      >共 {{details.length}} 项</button>
    </div>
    <div
      class="schedule-calendar-details"
      :class="[{ expanded }]"
      :style="detailsPost"
      ref="details"
      @mouseover="showadd"
      @mouseleave="hideadd"
    >
      <div v-show="expanded" class="schedule-calendar-details-hd">{{ dateString }}</div>
      <div class="schedule-calendar-details-bd">
        <div class="add" :class="{'showadd' : isShowAdd}">
          <el-tooltip class="item" effect="dark" content="添加事件" placement="bottom-end">
            <svg
              t="1587636992903"
              class="icon"
              viewBox="0 0 1025 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="7520"
              width="35"
              height="35"
            >
              <path
                d="M446.402662 446.402662V63.041597c0-34.076539 28.965058-63.041597 64.745425-63.041597s64.745424 28.965058 64.745424 64.745424v383.361065h383.361065c35.780366 0 64.745424 28.965058 64.745424 64.745424s-28.965058 63.041597-64.745424 63.041598H575.893511v383.361065c0 35.780366-28.965058 64.745424-64.745424 64.745424s-64.745424-28.965058-64.745425-64.745424V574.189684H64.745424C28.965058 574.189684 0 546.928453 0 511.148087s28.965058-64.745424 64.745424-64.745425h381.657238z"
                fill="#aaaaaa"
                p-id="7521"
              />
            </svg>
          </el-tooltip>
        </div>
        <event-item
          v-if="details.length"
          v-for="item in displayDetails"
          :item="item"
          :date="date"
          :type="type"
          @item-dragstart="dragItem"
          :key="item.id"
          @mouseover="showadd"
        ></event-item>
      </div>
    </div>
    
  </div>
</template>
<script>
import { EventBus, isSameDay, format, Store } from "./utils";
import eventItem from "./eventItem";
export default {
  components: {
    eventItem
  },
  props: {
    date: Date,
    type: String,
    data: Array,
    index: Number,
    draggedIndex: Number,
    itemRender: Function
  },
  data() {
    return {
      volume: 0,
      expanded: false,
      currentItem: {},
      isShowAdd: false,
      dialogFormVisible : false 
    };
  },
  computed: {
    isToday() {
      return isSameDay(new Date(), this.date);
    },
    details() {
      return this.data.length
        ? this.data.filter(item => isSameDay(item.date, this.date))
        : [];
    },
    displayDetails() {
      return this.expanded ? this.details : this.details.slice(0, this.volume);
    },
    dateString() {
      return format(this.date,"yyyy年MM月dd日");
    },
    detailsPost() {
      const post = {};

      if (this.index >= 35) {
        post.bottom = 0;
      } else {
        post.top = 0;
      }

      if ((this.index + 1) % 7 === 0) {
        post.right = 0;
      } else {
        post.left = 0;
      }

      return post;
    }
  },
  methods: {
    calcVolume() {
      this.volume = Math.floor(this.$refs.details.clientHeight / 27);
    },
    expandAll() {
      this.expanded = true;
      document.addEventListener("mouseup", this.reduceAll);
    },
    reduceAll(e) {
      if (!this.$refs.details.contains(e.target)) {
        this.expanded = false;
        Store.hasExpand = true; // 设为 true，当前点击仅仅是为了收缩单元格
        document.removeEventListener("mouseup", this.reduceAll);
      }
    },
    dragenter(e) {
      
      if (this.$el.contains(e.target)) {
        this.$emit("highlight", this.index);

        if (this.$el === e.target) {
          EventBus.$emit(
            "cell-dragenter",
            e,
            format(this.date, "yyyy-MM-dd hh:mm:ss"),
            this.type,
            this.index
          );
        }
      }
    },
    dragItem(e, item, date, type) {
      console.log("drapItem");
      
      this.$emit("highlight", this.index);
      EventBus.$emit(
        "item-dragstart",
        e,
        item,
        format(date, "yyyy-MM-dd hh:mm:ss"),
        type
      );
    },
    onDrop(e) {
      this.$emit("highlight", -1);
      EventBus.$emit(
        "item-drop",
        e,
        format(this.date, "yyyy-MM-dd hh:mm:ss"),
        this.type,
        this.index
      );
    },
    cellClick(e) {
      // 此时为收缩单页格，不触发 date-click
      if (Store.hasExpand) {
        // 设为 false，下次正常触发 date-click
        Store.hasExpand = false;
        return;
      }
      EventBus.$emit("date-click", e, format(this.date, "yyyy-MM-dd hh:mm:ss"));
    },
    showadd() {
      if (this.details.length < 1) {
        this.isShowAdd = true;
      } else this.isShowAdd = false;
    },
    hideadd() {
      this.isShowAdd = false;
    }
  },
  mounted() {
    this.calcVolume();
    window.addEventListener("resize", this.calcVolume);
  },
  destroyed() {
    window.removeEventListener("resize", this.calcVolume);
  }
};
</script>
<style lang="less">
@import "./variables.less";
.add {
  position: absolute;
  display: none;
  left: 50%;
  top: 50%;
  margin-left: -20px;
  margin-top: -10px;
}
.showadd {
  display: block;
  cursor: pointer;
}
.schedule-calendar- {
  &date {
    position: relative;
    display: flex;
    flex-direction: column;
    width: ~"calc(100% / 7)";
    height: ~"calc(100% / 6)";
    min-width: 94px;
    min-height: 40px;
    padding: 4px;
    border-top: 1px solid @sc-border-color;
    border-left: 1px solid @sc-border-color;
    user-select: none;

    &:nth-child(7n + 1) {
      border-left: none;
    }

    &.prev,
    &.next {
      color: @sc-gray-light-color;
      background: @sc-gray-background;
    }

    &-label {
      width: @sc-data-label-size;
      height: @sc-data-label-size;
      line-height: @sc-data-label-size;
      text-align: center;
      border-radius: 50%;
    }

    &.today {
      .schedule-calendar-date-label {
        color: @sc-body-color;
        background: @sc-primary-color;
      }
    }

    &.dragged {
      background: @sc-primary-light-color;
      .schedule-calendar-details {
        background: @sc-primary-light-color;
      }
    }
  }
  &date-hd {
    display: flex;
    justify-content: space-between;
    align-content: center;
  }
  &details {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-content: center;
    cursor: pointer;

    &.expanded {
      position: absolute;
      z-index: 2;
      width: @sc-details-width;
      min-width: 100%;
      padding: 0 6px 10px;
      background: @sc-body-color;
      box-shadow: @sc-box-shadow;
      .schedule-calendar-details-bd {
        overflow-y: auto;
        max-height: @sc-details-height - @sc-details-hd-height;
      }
    }
  }
  &details-hd {
    height: @sc-details-hd-height;
    line-height: @sc-details-hd-height;
    font-size: 13px;
    color: @sc-gray-color;
    text-align: center;
  }
  &counter {
    font-size: 13px;
    color: @sc-primary-color;
  }
}
</style>
