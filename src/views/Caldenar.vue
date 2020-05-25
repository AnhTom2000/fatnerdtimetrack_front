<template>
  <div
    style=" display: flex;
    flex-direction: column;
    height: 100%;
    padding: 0 30px 30px;
    box-sizing: border-box;"
  >
    <vue-topprogress ref="topProgress"></vue-topprogress>
    <schedule-calendar :events.sync="todo_list" @event-dragend="changeDate"></schedule-calendar>
  </div>
</template>

<script>
import scheduleCalendar from "../components/scheduleCalendar/calendar";
import { mapState } from "vuex";
export default {
  data() {
    return {};
  },
  methods: {
    changeDate(e, item, date) {
      const updateIndex = this.todo_list.findIndex(
        ele => ele.eventId === item.eventId
      );

      let drop = new Date(this.todo_list[updateIndex].date);
      let to = new Date(date);
      this.$refs.topProgress.start();
      this.todo_list[updateIndex].date = this.format(drop, to);
      this.$store.dispatch("updateEventDate", {
        date: this.todo_list[updateIndex].date,
        eventId: this.todo_list[updateIndex].eventId
      });
      setTimeout(() => {
        this.$refs.topProgress.done();
      }, 1000);
    },
    format(drop, to) {
      const y = to.getFullYear();
      const m = this.fillZero(to.getMonth() + 1);
      const d = this.fillZero(to.getDate());
      const h = this.fillZero(drop.getHours());
      const mm = this.fillZero(drop.getMinutes());
      const dd = this.fillZero(drop.getSeconds());
      return y + "-" + m + "-" + d + " " + h + ":" + mm + ":" + dd + "";
    },
    fillZero: value => (value < 10 ? `0${value}` : value)
  },
  mounted() {
    this.$store.dispatch("initEventList");
  },
  computed: {
    ...mapState({
      todo_list: state => state.todo_list
    })
  },
  components: {
    "schedule-calendar": scheduleCalendar
  }
};
</script>

<style >
</style>

