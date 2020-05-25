<template>
  <div :class="types" v-if="computedList.length>0">
    <vue-topprogress ref="topProgress"></vue-topprogress>
    <h5 class="section-header" :class="{open : open}" @click="openTree()">
      <em>
        <svg
          t="1586435768671"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="553"
          width="7"
          height="7"
        >
          <path d="M1024 255.996 511.971 767.909 0 255.996 1024 255.996z" p-id="554" />
        </svg>
      </em>
      <i v-if="name==='未完成'">
        <svg
          t="1586423267664"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="8573"
          width="20"
          height="20"
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
      <i v-else>
        <svg
          t="1586588419701"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="5653"
          width="20"
          height="20"
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
      {{name}}
    </h5>
    <transition name="ul-fade">
      <ul v-if="this.open">
        <li v-for="(item,index) in computedList" :key="index" v-contextmenu:contextmenu>
          <item :event.sync="item" @click.native="send(item)"></item>
          <v-contextmenu ref="contextmenu" :theme="'default'">
            <v-contextmenu-group max-width="240px" style="font-size: 18px;">
              <h3 style="font-weight:400;font-size:12px;color:#ccc;margin-bottom:5px">优先级</h3>
              <ul class="prioritys">
                <li
                  :class="{'active' : item.priorityId === index+1}"
                  v-for="(color,index) in color_arr"
                  :key="index"
                  @click.stop.prevent="selected_priority(index,item)"
                >
                  <v-contextmenu-item>
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
                  </v-contextmenu-item>
                </li>
              </ul>
            </v-contextmenu-group>
            <v-contextmenu-item divider></v-contextmenu-item>
            <v-contextmenu-item @click="deleteThisItem(item)">删除</v-contextmenu-item>
          </v-contextmenu>
        </li>
      </ul>
    </transition>
  </div>
</template>

<script>
import Item from "./Ft-item";
import contextMemu from "../components/Ft-contextMemu";
import { mapState } from "vuex";
export default {
  props: {
    name: {
      type: String,
      default: "未定义"
    },
    types: {
      type: String,
      default: "undifined"
    },
    list: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      open: false,
      type: this.types,
      color_arr: ["#d81e06", "#f4ea2a", "#e6e6e6"]
    };
  },
  mounted() {
    this.sort();
  },
  methods: {
    sort() {
      if (this.sortNumber == 0) {
        this.list.sort((t1, t2) => {
          if (
            (t1.date != "" || t1.date != undefined || t1.date != null) &&
            (t2.date != "" || t2.date != undefined || t2.date != null)
          ) {
            let d1 = new Date(t1.date);
            let d2 = new Date(t2.date);
            return d1.getTime() - d2.getTime();
          } else return 1;
        });
      } else if (this.sortNumber == 1) {
        this.list.sort((p1, p2) => {
          return p1.priorityId - p2.priorityId;
        });
      } else if (this.sortNumber == 2) {
        Object.keys(this.list).sort((t1, t2) => {
          return this.list[t1].eventTitle - this.list[t2].eventTitle;
        });
      }
    },
    openTree() {
      this.open = !this.open;
    },
    send(item) {
      this.$store.commit("setItem", item);
    },
    selected_priority(index, item) {
      this.$refs.topProgress.start();
      item.priorityId = index + 1;
      this.priority_show = false;
      this.$axios({
        url: "/event/updateEventPriority",
        method: "post",
        transformRequest: [
          data => {
            //  对data进行任意转换处理
            return this.$qs.stringify(data);
          }
        ],
        data: {
          priorityId: index + 1,
          eventId: item.eventId
        }
      }).then(res => {
        if (res.data.code === 200) {
          this.$refs.topProgress.done();
        } else {
          this.$message.error("服务器异常，请重试");
          this.$refs.topProgress.fail();
        }
      });
    },
    deleteThisItem(item) {
      let vm = this;
      this.$confirm("此操作将永久删除该事件, 是否继续?", "删除事件", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$refs.topProgress.start();
          this.$store.dispatch("deleteEvent", item);
          setTimeout(() => {
            this.$refs.topProgress.done();
          }, 1000);
        })
        .catch(() => {
          this.$message({
            type: "success",
            message: "取消删除成功"
          });
        });
    }
  },
  components: {
    item: Item,
    contextMemu: contextMemu
  },
  computed: {
    computedList() {
      if (this.type === "finished") {
        return this.list.filter(item => item.finished);
      } else if (this.type === "unfinished") {
        return this.list.filter(item => !item.finished);
      }
    },
    ...mapState({
      sortNumber: state => state.sortNumber
    })
  },
  watch: {
    sortNumber() {
      this.sort();
    }
  }
};
</script>

<style >
.unfinished,
.finished {
  width: 730px;
  padding-left: 10px;
}

h5 {
  position: relative;
  width: 70px;
  line-height: 20px;
  padding-top: 10px;
  padding-left: 6px;
  padding-bottom: 5px;
  margin-bottom: 5px;
  margin-top: 10px;
  font-weight: 400;
  cursor: pointer;
  border-bottom: 1px solid rgb(166, 166, 166);
}
h5 em {
  position: absolute;
  top: 50%;
  margin-top: -8px;
  left: -10px;
  margin-left: 5px;
  transition: all 0.3s ease;
  transform: rotate(-90deg);
}

ul {
  transition: all 0.1s ease;
  padding-left: 10px;
  margin-top: 0;
  resize: none;
}

.open {
  border-bottom: 1px solid transparent;
}
.open > em {
  transform: rotate(0deg);
}
i svg {
  vertical-align: top;
}
.ul-fade-enter-active,
.ul-fade-leave-active {
  transition: all 0.1s ease;
}
.ul-fade-enter, .ul-fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.prioritys li {
  float: left;
}
.select-tags {
  position: absolute;
  left: 0px;
  top: 0px;
  width: 200px;
  max-height: 240px;
  border-radius: 4px;
  box-shadow: 0 2px 11px 0 rgba(0, 0, 0, 0.16);
  background-color: rgb(255, 255, 255);
  z-index: 2;
  resize: none;
}

.select-tags .tag-btn {
  width: 200px;
  height: 40px;
  padding: 0px 10px;
  resize: none;
}
.select-tags .tag-btn .el-button {
  margin: 0 15px !important;
}
</style>