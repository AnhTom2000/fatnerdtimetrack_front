<template>
  <div :class="{editing:isEdited}" class="view" @dblclick="editItem() ">
    <vue-topprogress ref="topProgress"></vue-topprogress>
    <div class="task-line clearfix">
      <label v-if="!isEdited">{{event.eventTitle}}</label>
      <input
        type="text"
        class="edit"
        v-model="editingTitle"
        @blur="cancelEdit"
        v-autofocus
        v-if="isEdited"
        style="font-size:16px"
      />
    </div>
    <div class="toggle clearfix">
      <input
        type="checkbox"
        @click.stop.prevent="updateFinished($event.target.checked)"
        v-model="event.finished"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "ft-item",
  props: {
    event: Object
  },
  data() {
    return {
      editingTitle: "",
      isEdited: false
    };
  },
  methods: {
    showProgress() {
      this.$refs.topProgress.start();
      setTimeout(() => {
        this.$refs.topProgress.done();
      }, 1000);
    },
    editItem() {
      this.isEdited = true;
      this.editingTitle = this.event.eventTitle;
    },
    updateFinished() {
      this.showProgress();
      this.$store.dispatch("updateEventFinished", this.event);
    },
    updateTitle() {
      this.showProgress();
      let events = {
        title: this.editingTitle,
        event: this.event
      };
      this.$store.dispatch("updateEventTitle", events);
    },
    cancelEdit() {
      this.isEdited = false;
    }
  },
  watch: {
    editingTitle() {
      this.updateTitle();
    },
    "item.title": {
      handler(newval, old) {
        this.editingTitle = newval;
        this.updateTitle();
      },
      deep: true
    }
  },
  directives: {
    autofocus: {
      inserted: el => {
        el.focus();
      }
    }
  }
};
</script>

<style scoped>
.view {
  width: 870px;
  height: 30px;
  resize: none;
  box-sizing: border-box;
  padding: 5px;
  border-radius: 2.5%;
  border-bottom: 1px solid #ccc;
  cursor: pointer;
}

.task-line {
  float: left;
  width: 730px;
  height: 100%;
}
.task-line label {
  cursor: pointer;
}

.task-line input {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  outline: none;
  border: 0;
}

.toggle {
  float: left;
  width: 130px;
}
</style>