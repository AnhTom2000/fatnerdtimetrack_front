<template>
  <div
    class="schedule-calendar-detail-item"
    :class="`schedule-calendar-status_${this.item.status}`"
    draggable="true"
    @dragstart="onDrag"
    @click="onClick"
  >
    <span>{{this.item.eventTitle}}</span>
  </div>
</template>

<script>
import { EventBus } from "./utils";

export default {
  props: {
    item: Object,
    date: Date,
    type: String
  },
  methods: {
    onDrag(e) {
      console.log('开始拖动');
      
      this.$emit("item-dragstart", e, this.item, new Date(this.item.date), this.type);
    },
    onClick(e) {
      e.stopPropagation();
      e.preventDefault();
      EventBus.$emit("item-click", e, this.item);
    }
  }
};
</script>
<style lang="less">
@import "./variables.less";

.schedule-calendar- {
  &detail-item {
    margin: 3px 6px 0;
    font-size: 12px;
    color: #fff;
    line-height: 2em;
    border-radius: 2px;
    background: @sc-primary-color;
    cursor: pointer;
    transition: 0.2s ease-in-out;
    white-space: nowrap; /*强制文字显示为一行*/
    overflow: hidden; /*溢出部分隐藏*/
    text-overflow: ellipsis; /*超出部分变成省略号*/
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 3px 8px rgba(0, 0, 0, 0.2), 0 -3px 8px rgba(0, 0, 0, 0.2);
    }

    > * {
      padding: 0 5px;
    }
  }

  &status_1 {
    background: #f44336;
  }
  &status_2 {
    background: #e91e63;
  }
  &status_3 {
    background: #9c27b0;
  }
  &status_4 {
    background: #3f51b5;
  }
  &status_5 {
    background: #2196f3;
  }
  &status_6 {
    background: #00bcd4;
  }
  &status_7 {
    background: #4caf50;
  }
  &status_8 {
    background: #cddc39;
  }
  &status_9 {
    background: #ff9800;
  }
  &status_10 {
    background: #607d8b;
  }
}
</style>
