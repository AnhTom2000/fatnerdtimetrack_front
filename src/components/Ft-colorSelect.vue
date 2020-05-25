<template>
  <div class="color_selected" v-if="color_seleted!=''">
    <swatches-picker v-model="colors" />
  </div>
</template>
<script>
import { Swatches } from "vue-color";
export default {
  props: {
    color: {
      type: String,
      default: "#ccc"
    },
    color_seleted: {},
    tagId: {
      type: String
    }
  },
  data() {
    return {
      colors: {}
    };
  },
  components: {
    "swatches-picker": Swatches
  },
  watch: {
    colors() {
     this.$store.dispatch("updateTagColor",{
       color : this.colors.hex,
       tagId : this.tagId
     })
      this.$emit("update:color", this.colors.hex);
    }
  }
};
</script>

<style scoped>
.vc-swatches {
  position: absolute;
  top: 10px;
  right: -320px;
}
</style>