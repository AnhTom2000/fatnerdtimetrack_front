<template>
  <div
    ref="priority"
    :class="{'selected_priority':selected}"
    class="prioritys"
    @click.stop.prevent="selected_priority"
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
  </div>
</template>

<script>
export default {
  props: {
    color: {
      type: String,
      default: ""
    },
    current_priority: {
      type: Number,
      default: ""
    },
    priority_number: {
      type: Number
    }
  },
  data() {
    return {
      selected: false
    };
  },
  methods: {
    selected_priority() {
      this.selected = true;
      this.$emit("update:current_priority", this.priority_number);
    }
  }
};
</script>

<style  scoped>



div:hover {
  background-color: rgba(238, 238, 238, .3);
}
</style>