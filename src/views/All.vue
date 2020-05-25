<template>
  <div class="all">
    <vue-topprogress ref="topProgress"></vue-topprogress>
    <div class="left">
      <!-- 记录区域 -->
      <div class="record">
        <header>
          <!-- 标题 -->
          <div class="title">
            <h3>所有事件</h3>
          </div>
          <!-- 标题 -->
          <!-- 中间隔 -->
          <div class="line-right">
            <!-- 排序选项 -->
            <div class="sort-right">
              <el-dropdown trigger="click">
                <a href="javascript:void(0)">
                  <svg
                    t="1586418538568"
                    class="icon"
                    viewBox="0 0 1024 1024"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    p-id="7211"
                    width="25"
                    height="25"
                  >
                    <path
                      :d="sortArr[sortNumber].svg.d"
                      fill="#999999"
                      :p-id="sortArr[sortNumber].svg.pid"
                    />
                  </svg>
                </a>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item
                    v-for="(svgs,index) in sortArr"
                    :key="index"
                    @click.native="selectedSort(svgs)"
                  >
                    <svg
                      t="1588776369082"
                      class="icon"
                      viewBox="0 0 1024 1024"
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                      p-id="542"
                      width="20"
                      height="20"
                    >
                      <path :d="svgs.svg.d" fill="#A6A6A6" :p-id="svgs.svg.pid" />
                    </svg>
                    &nbsp;{{svgs.name}}
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
            <!-- 排序选项 -->
          </div>
          <!-- 中间隔 -->
        </header>
        <section class="task-input">
          <div class="input-left">
            <el-input
              v-model="todo_tiile"
              size="medium"
              :placeholder="placeholder"
              @keyup.enter.native="add_todo"
            ></el-input>
            <div class="icon-div">
              <div
                class="icon-tag icon-click"
                @click.stop.prevent="show_selectTag"
                v-clickoutside="handlerCloseTag"
              >
                <svg
                  t="1586696099451"
                  class="icon"
                  viewBox="0 0 1024 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  p-id="6376"
                  width="20"
                  height="20"
                >
                  <path
                    d="M852 72H172l-10 880 350-314.3L862 952 852 72zM538.7 607.9l-26.7-24-26.7 24L203 861.4l8.5-749.4h600.9l8.5 749.4-282.2-253.5zM432 182h160v40H432v-40z"
                    fill
                    p-id="6377"
                  />
                </svg>
                <div class="select-tag" v-if="tag_show">
                  <div class="tag-input">
                    <el-input
                      class="input-new-tag"
                      v-model="tag_inputValue"
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
                      <ul style="width:190px;padding-left:0;max-height:150px">
                        <li
                          v-for="(tag,index) in tag_list"
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
                    <el-button type="primary" size="small" @click.stop.prevent="confirm_selected">确定</el-button>
                    <el-button type="info" size="small" @click.stop.prevent="cancelTagSelected">取消</el-button>
                  </div>
                </div>
              </div>
              <div
                class="icon-priority"
                @click.stop.prevent="show_priority"
                v-clickoutside="handlerClosePriority"
              >
                <svg
                  t="1587029230955"
                  class="icon"
                  viewBox="0 0 1024 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  p-id="5814"
                  width="23"
                  height="23"
                >
                  <path
                    d="M256 224h512a32 32 0 0 1 32 32v512a32 32 0 0 1-32 32H256a32 32 0 0 1-32-32V256a32 32 0 0 1 32-32z m256 480a32 32 0 1 0 0-64 32 32 0 0 0 0 64z m0-384a32 32 0 0 0-32 32v192a32 32 0 0 0 64 0v-192a32 32 0 0 0-32-32z"
                    p-id="5815"
                  />
                </svg>
                <div class="select-priority" v-if="priority_show">
                  <h3>优先级</h3>
                  <div class="priority-table">
                    <ul>
                      <li
                        :class="{'active' : priority_selected === index+1}"
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
              </div>
              <div class="icon-caldenar icon-click">
                <div
                  id="inputDiv"
                  class="icon-click"
                  @click.stop.prevent="handleClick"
                  v-if="timeSelect"
                ></div>
                <svg
                  t="1586868439261"
                  class="icon"
                  viewBox="0 0 1024 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  p-id="7054"
                  width="20"
                  height="20"
                  @click.stop.prevent="handleClick"
                >
                  <path
                    d="M470.036439 805.749014l83.928144 0c15.450954 0 27.976048-12.525094 27.976048-27.976048 0-15.450954-12.525094-27.976048-27.976048-27.976048l-83.928144 0c-15.450954 0-27.976048 12.525094-27.976048 27.976048C442.059369 793.222898 454.585485 805.749014 470.036439 805.749014z"
                    p-id="7055"
                  />
                  <path
                    d="M861.678627 120.335329 700.838068 120.335329 700.838068 92.359281c0-15.450954-12.525094-27.976048-27.976048-27.976048-15.450954 0-27.976048 12.525094-27.976048 27.976048l0 27.976048L379.114028 120.335329 379.114028 92.359281c0-15.450954-12.525094-27.976048-27.976048-27.976048-15.450954 0-27.976048 12.525094-27.976048 27.976048l0 27.976048L162.321373 120.335329C108.16792 120.335329 64.383234 164.175202 64.383234 218.254052l0 132.883928 0 55.952096 0 454.607968C64.383234 915.82186 108.231281 959.616766 162.321373 959.616766l699.358275 0C915.83208 959.616766 959.616766 915.776894 959.616766 861.698044L959.616766 407.090076l0-55.952096L959.616766 218.254052C959.616766 164.130236 915.768719 120.335329 861.678627 120.335329zM903.664671 861.698044c0 23.202491-18.759026 41.966627-41.986044 41.966627L162.321373 903.664671c-23.209645 0-41.986044-18.76618-41.986044-41.966627L120.335329 407.090076l783.329341 0L903.664671 861.698044zM903.664671 351.13798l-783.329341 0L120.335329 218.254052c0-23.202491 18.759026-41.966627 41.986044-41.966627l160.840559 0 0 41.963561c0 15.450954 12.525094 27.976048 27.976048 27.976048 15.450954 0 27.976048-12.525094 27.976048-27.976048L379.114028 176.287425l265.771944 0 0 41.963561c0 15.450954 12.525094 27.976048 27.976048 27.976048 15.450954 0 27.976048-12.525094 27.976048-27.976048L700.838068 176.287425l160.840559 0c23.209645 0 41.986044 18.76618 41.986044 41.966627L903.664671 351.13798z"
                    p-id="7056"
                  />
                  <path
                    d="M218.250986 553.963561l83.928144 0c15.450954 0 27.976048-12.525094 27.976048-27.976048 0-15.450954-12.525094-27.976048-27.976048-27.976048l-83.928144 0c-15.450954 0-27.976048 12.525094-27.976048 27.976048C190.27596 541.438467 202.801054 553.963561 218.250986 553.963561z"
                    p-id="7057"
                  />
                  <path
                    d="M470.036439 553.963561l83.928144 0c15.450954 0 27.976048-12.525094 27.976048-27.976048 0-15.450954-12.525094-27.976048-27.976048-27.976048l-83.928144 0c-15.450954 0-27.976048 12.525094-27.976048 27.976048C442.059369 541.438467 454.585485 553.963561 470.036439 553.963561z"
                    p-id="7058"
                  />
                  <path
                    d="M721.819848 553.963561l83.928144 0c15.450954 0 27.976048-12.525094 27.976048-27.976048 0-15.450954-12.525094-27.976048-27.976048-27.976048l-83.928144 0c-15.450954 0-27.976048 12.525094-27.976048 27.976048C693.844822 541.438467 706.369916 553.963561 721.819848 553.963561z"
                    p-id="7059"
                  />
                  <path
                    d="M218.250986 679.856287l83.928144 0c15.450954 0 27.976048-12.525094 27.976048-27.976048 0-15.450954-12.525094-27.976048-27.976048-27.976048l-83.928144 0c-15.450954 0-27.976048 12.525094-27.976048 27.976048C190.27596 667.331194 202.801054 679.856287 218.250986 679.856287z"
                    p-id="7060"
                  />
                  <path
                    d="M470.036439 679.856287l83.928144 0c15.450954 0 27.976048-12.525094 27.976048-27.976048 0-15.450954-12.525094-27.976048-27.976048-27.976048l-83.928144 0c-15.450954 0-27.976048 12.525094-27.976048 27.976048C442.059369 667.331194 454.585485 679.856287 470.036439 679.856287z"
                    p-id="7061"
                  />
                  <path
                    d="M721.819848 679.856287l83.928144 0c15.450954 0 27.976048-12.525094 27.976048-27.976048 0-15.450954-12.525094-27.976048-27.976048-27.976048l-83.928144 0c-15.450954 0-27.976048 12.525094-27.976048 27.976048C693.844822 667.331194 706.369916 679.856287 721.819848 679.856287z"
                    p-id="7062"
                  />
                  <path
                    d="M218.250986 805.749014l83.928144 0c15.450954 0 27.976048-12.525094 27.976048-27.976048 0-15.450954-12.525094-27.976048-27.976048-27.976048l-83.928144 0c-15.450954 0-27.976048 12.525094-27.976048 27.976048C190.27596 793.222898 202.801054 805.749014 218.250986 805.749014z"
                    p-id="7063"
                  />
                  <path
                    d="M721.819848 805.749014l83.928144 0c15.450954 0 27.976048-12.525094 27.976048-27.976048 0-15.450954-12.525094-27.976048-27.976048-27.976048l-83.928144 0c-15.450954 0-27.976048 12.525094-27.976048 27.976048C693.844822 793.222898 706.369916 805.749014 721.819848 805.749014z"
                    p-id="7064"
                  />
                </svg>
              </div>

              <div class="select-caldenar" v-if="timeSelect" v-clickoutside="handlerCloseTime">
                <div class="date-picker" ref="dates">
                  <el-date-picker
                    v-model="date"
                    type="datetime"
                    v-if="timeSelect"
                    :prefix-icon="''"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    :clearable="false"
                    placeholder="选择日期时间"
                  ></el-date-picker>
                </div>
              </div>
              <span
                class="date"
                v-if="date !== ''"
                @click.stop.prevent="handleClick"
              >{{date| dateFilter}}</span>
            </div>
          </div>
          <div class="commit-right">
            <el-button type="danger" size="mini" @click.stop.prevent="add_todo">添加</el-button>
          </div>
        </section>
        <div></div>
      </div>

      <!-- 记录区域 -->
      <!-- 事件区域 -->
      <div class="list">
        <el-scrollbar style="height: 796px; width :930px; overflow-x: hidden;">
          <!-- 滚动条 -->
          <tree
            name="未完成"
            :list.sync="todo_list"
            :sortNumber.sync="sortNumber"
            :types="'unfinished'"
            @current_item="hanlderItem"
          ></tree>
          <tree
            name="已完成"
            :list.sync="todo_list"
            :sortNumber.sync="sortNumber"
            :types="'finished'"
            @current_item="hanlderItem"
          ></tree>
        </el-scrollbar>
      </div>
    </div>
    <!-- 事件区域 -->
    <div class="watch-right">
      <watch ref="watch" :todo_list.sync="todo_list" v-if="current_item.eventTitle!=undefined"></watch>
    </div>
  </div>
</template>

<script>
import Tree from "../components/Ft-Tree";
import Watch from "../views/Watch";
import { mapState } from "vuex";
export default {
  name: "all",
  data() {
    return {
      todo_tiile: "",
      date: "",
      timeSelect: false,
      tag_show: false,
      priority_show: false,
      placeholder: "记录下个事情",
      color_arr: ["#d81e06", "#f4ea2a", "#e6e6e6"],
      tag_inputValue: "",
      tag_list_selected: [],
      priority_selected: 3,
      sort: "",
      sortArr: [
        {
          svg: {
            d:
              "M543.086933 512.6912h117.858134a32 32 0 1 1 0 64h-149.333334c-5.674667 0-11.008-1.476267-15.633066-4.0704a31.995733 31.995733 0 0 1-16.896-28.215467V371.242667a32 32 0 0 1 64 0v141.448533z m259.434667 278.126933v-144.273066a32 32 0 0 1 64 0v147.2512l32.192-32.196267a32 32 0 1 1 45.256533 45.256533l-85.333333 85.333334a32 32 0 0 1-45.256533 0l-85.333334-85.333334a32 32 0 1 1 45.256534-45.256533l29.218133 29.218133zM928 512a32 32 0 1 1-64 0c0-194.402133-157.597867-352-352-352S160 317.597867 160 512s157.597867 352 352 352c42.1376 0 83.2128-7.394133 121.8688-21.6576a32 32 0 0 1 22.161067 60.040533C610.304 919.253333 561.728 928 512 928c-229.751467 0-416-186.248533-416-416S282.248533 96 512 96s416 186.248533 416 416z",
            pid: "1259"
          },
          name: "按时间排序",
          value: 0
        },
        {
          svg: {
            d:
              "M804.278857 781.458286L653.385143 542.500571h110.957714V0.877714h77.750857v541.622857H950.857143l-146.578286 238.957715zM552.667429 0H0v73.142857h552.740571V0z m-9.801143 292.571429H0v73.142857h542.866286V292.571429z m0 292.571428H0v73.142857h542.866286V585.142857zM0 877.714286v73.142857h947.492571v-73.142857H0z",
            pid: "2131"
          },
          name: "按优先级排序",
          value: 1
        },
        {
          svg: {
            d:
              "M68.661841 714.401703H235.379797V47.675231c0-26.163236 21.366643-47.675231 47.67523-47.675231 26.163236 0 47.675231 21.366643 47.675231 47.675231v976.324769l-262.068417-309.598297zM473.465247 928.79489c-26.163236 0-47.675231-21.366643-47.67523-47.675231 0-26.163236 21.366643-47.675231 47.67523-47.67523h690.564088c26.163236 0 47.675231 21.366643 47.675231 47.67523 0 26.163236-21.366643 47.675231-47.675231 47.675231H473.465247z m0-357.273527c-26.163236 0-47.675231-21.366643-47.67523-47.675231 0-26.163236 21.366643-47.675231 47.67523-47.675231h690.564088c26.163236 0 47.675231 21.366643 47.675231 47.675231 0 26.163236-21.366643 47.675231-47.675231 47.675231H473.465247z m0-357.128176c-26.163236 0-47.675231-21.366643-47.67523-47.675231 0-26.163236 21.366643-47.675231 47.67523-47.675231h690.564088c26.163236 0 47.675231 21.366643 47.675231 47.675231 0 26.163236-21.366643 47.675231-47.675231 47.675231H473.465247z m0 0",
            pid: "9362"
          },
          name: "按事件标题排序",
          value: 2
        }
      ]
    };
  },
  created() {
    this.$store.dispatch("initEventList");
    this.$store.dispatch("getSortNumber");
  },
  mounted() {
    //  初始化事件数组
    // this.$store.dispatch("getSortNumber");
    setTimeout(() => {
      this.$refs.topProgress.start();
      // Use setTimeout for demo
      setTimeout(() => {
        this.$refs.topProgress.done();
      }, 2000);
    }, 500);
  },
  computed: {
    current_item() {
      return this.$store.state.current_item;
    },
    ...mapState({
      todo_list: state => state.todo_list,
      tag_list: state => state.tag_list,
      sortNumber: state => state.sortNumber
    })
  },
  components: {
    tree: Tree,
    watch: Watch
  },
  methods: {
    add_todo() {
      if (this.todo_tiile.length < 1 || this.todo_tiile == "") {
        this.$message.warning("请填写任务名");
        return;
      }
      let newTodo = {
        eventTitle: this.todo_tiile,
        date: this.date,
        tagList: this.tag_list_selected,
        priority: this.priority_selected,
        finished: false,
        eventDescription: ""
      };
      if (this.tag_list_selected !== null) {
        newTodo.tag_list = this.tag_list_selected;
      }
      this.$refs.topProgress.start();
      this.$axios({
        method: "post",
        url: "/event/addEvent",
        data: {
          eventTitle: this.todo_tiile,
          date: this.date,
          tagList: this.tag_list_selected,
          priority: this.priority_selected,
          finished: false,
          eventDescription: ""
        },
        responseType: "json"
      })
        .then(res => {
          if (res.data) {
            this.$refs.topProgress.done();
            this.$store.commit("addTodo", res.data);
          } else {
            this.$message.error("请重试");
            this.$refs.topProgress.fail();
          }
        })
        .catch(error => {
          this.$refs.topProgress.fail();
          this.$message.error(error);
        });
      this.todo_tiile = "";
      this.date = "";
      this.priority_selected = 3;
      for (let i = 0; i < this.tag_list.length; i++) {
        this.tag_list[i].selected = false;
      }
      this.tag_list_selected = [];
      this.placeholder = "记录下个事情";
    },
    hanlderItem(item) {
      let watch = this.$refs.watch;
      watch.$emit("item", item);
    },
    handleClick() {
      this.timeSelect = true;
      this.tag_show = false;
      this.priority_show = false;
    },
    handleInputConfirm() {
      let inputValue = this.tag_inputValue;
      if (inputValue) {
        let tag = {
          tagName: inputValue,
          selected: false,
          tagBgColor: "#ccc"
        };
        this.$store.dispatch("addTag", tag);
      }
      this.tag_inputValue = "";
    },
    show_selectTag() {
      this.tag_show = true;
      this.timeSelect = false;
      this.priority_show = false;
    },
    selected_tag(tag) {
      if (tag.selected) {
        this.tag_list_selected.splice(this.tag_list_selected.indexOf(tag), 1);
        this.$store.dispatch("updateSelectedTag", tag);
        return;
      }
      if (this.tag_list_selected.length === 3) {
        this.$message.warning("最多添加三个标签");
        return;
      }
      this.tag_list_selected.push(tag);

      this.$store.dispatch("updateSelectedTag", tag);
    },
    cancelTagSelected() {
      this.tag_show = false;
      for (let i = 0; i < this.tag_list_selected.length; i++) {
        this.$store.dispatch("updateSelectedTag", this.tag_list_selected[i]);
      }
      this.tag_list_selected = [];
    },
    confirm_selected() {
      if (this.tag_list_selected > 3) {
        this.$message.warning("最多选择三个标签");
        return;
      }
      this.tag_show = !this.tag_show;
    },
    show_priority() {
      this.priority_show = true;
      this.tag_show = false;
      this.timeSelect = false;
    },
    selected_priority(index) {
      this.priority_selected = index + 1;
      this.priority_show = false;
    },
    handlerCloseTime() {
      this.timeSelect = false;
    },
    handlerCloseTag() {
      this.tag_show = false;
    },
    handlerClosePriority() {
      this.priority_show = false;
    },
    selectedSort(sort) {
      this.sort = sort.value;
      this.$store.dispatch("updateSortNumber", this.sort);
    }
  },
  filters: {
    dateFilter(date) {
      return date.split("-")[2].split("")[0] + date.split("-")[2].split("")[1];
    }
  },
  watch: {
    date(value) {
      if (value === "") return;
      let now = new Date();
      let newDate = new Date(value);
      let hour = newDate.getHours();
      let month = newDate.getMonth() + 1;
      let dates = newDate.getDate();
      let minute = newDate.getMinutes();
      let second = newDate.getSeconds();
      if (month < 10) month = "0" + month;
      if (dates < 10) dates = "0" + dates;
      if (hour < 10) hour = "0" + hour;
      if (minute < 10) minute = "0" + minute;
      if (second < 10) second = "0" + second;
      this.date =
        newDate.getFullYear() +
        "-" +
        month +
        "-" +
        dates +
        " " +
        hour +
        ":" +
        minute +
        ":" +
        second;
      if (newDate.getDate() == now.getDate()) {
        if (
          newDate.getFullYear() +
            "-" +
            month +
            "-" +
            dates +
            " " +
            hour +
            ":" +
            minute +
            second !=
          "00:00:00"
        ) {
          this.placeholder =
            "添加" +
            (newDate.getHours() +
              ":" +
              newDate.getMinutes() +
              ":" +
              newDate.getSeconds()) +
            "的任务";
        } else {
          this.placeholder = "添加今天的任务";
        }
      } else if (newDate.getDate() == now.getDate() - 1) {
        this.placeholder = "添加昨天的任务";
      } else if (newDate.getFullYear() !== now.getFullYear()) {
        this.placeholder =
          "添加" +
          newDate.getFullYear() +
          "年" +
          (newDate.getMonth() + 1) +
          "月" +
          newDate.getDate() +
          "号的任务";
      } else {
        this.placeholder =
          "添加" +
          (newDate.getMonth() + 1) +
          "月" +
          newDate.getDate() +
          "号的任务";
      }
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
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
input,
textarea {
  outline: none;
}
.all {
  width: 1607px;
  height: 100%;
  background-color: #fff;
  border-right: 1px solid #ccc;
  z-index: 999;
  overflow-x: hidden;
  box-sizing: border-box;
  position: static;
}
.left {
  float: left;
  width: 950px;
  height: 935px;
  border-right: 1px solid #ccc;
}

.record {
  width: 910px;
  height: 110px;
  margin: 0 20px;
  margin-bottom: 20px;
}

.input-left > .el-input {
  width: 820px !important;
  height: 45px !important;
  border: 1px solid rgb(192, 196, 204);
  border-radius: 4px;
}
.input-left > .el-input > .el-input__inner {
  width: 720px !important;
  font-size: 16px !important;
  height: 40px !important;
  line-height: 40px;
  border: none;
}

/* 清除浮动 */
.clearfix:before,
.clearfix:after {
  content: "";
  display: table;
  clear: both;
}

.clearfix {
  *zoom: 1;
}

header {
  position: relative;
  height: 72px;
}

.record .title {
  position: absolute;
  left: 0;
  top: 50%;
  margin: -15px 0;
  width: 80px;
  height: 30px;
  line-height: 30px;
}
.record .title h3 {
  font-weight: 400;
}

.line-right {
  position: absolute;
  right: 0;
  top: 50%;
  margin: -10px 0;
  width: 680px;
  height: 24px;
}
.line-right .sort-right {
  float: right;
  position: relative;
  height: 100%;
  width: 36px;
}
.line-right .sort-right a {
  position: absolute;
  display: inline-block;
  height: 16px;
  right: -10px;
  margin-right: -25%;
  top: -20px;
}

.task-input {
  width: 905px;
  height: 42px;
  line-height: 42px;
}
.task-input .input-left {
  position: relative;
  float: left;
  width: 830px;
}
.task-input .commit-right {
  float: right;
}
.list {
  width: 930px;
  margin: 0 20px;
  /* background: #ccc; */
}
.el-scrollbar__wrap {
  overflow-x: hidden !important;
}
.watch-right {
  float: left;
  width: 650px;
  height: 900px;
}
/* 图标 */
.icon-div {
  width: 100px;
  height: 32px;
  position: absolute;
  line-height: 40px;
  right: 30px;
  top: 6px;
  vertical-align: middle;
}
.icon-div div {
  /* position: relative; */
  float: left;
  margin-left: 5px;
}

.date {
  position: absolute;
  display: inline-block;
  width: 16px;
  height: 14px;
  line-height: 13px;
  text-align: center;
  font-size: 7px;
  color: #fff;
  right: 24px;
  top: 10px;
  background-color: rgb(75, 111, 222);
  cursor: pointer;
}
.select-caldenar {
  position: absolute;
  /* width: 325px;
  height: 438px; */
  top: 100%;
  left: 50%;
}
.select-caldenar .el-input--prefix .el-input__inner {
  padding-left: 28px;
}
.select-caldenar .el-input--suffix .el-input__inner {
  padding-right: 11px;
}
#inputDiv {
  opacity: 0;
  position: absolute;
  right: 320px;
  z-index: 1;
  top: -22px;
  width: 15px;
  height: 20px;
  padding: 0 10px;
  background-color: pink;
  box-sizing: border-box;
}
[class*=" el-icon-"],
[class^="el-icon-"] {
  color: rgb(102, 177, 255);
}
.icon-click {
  cursor: pointer;
}
.x-calendar-wrapper {
  position: absolute !important;
  top: 0 !important;
  right: 0 !important;
  left: 0 !important;
  -moz-user-select: none !important; /*火狐*/
  -webkit-user-select: none !important; /*webkit浏览器*/
  -ms-user-select: none !important; /*IE10*/
  -khtml-user-select: none !important; /*早期浏览器*/
  user-select: none !important;
  border-radius: 4px;
  box-shadow: 0 2px 11px 0 rgba(0, 0, 0, 0.16);
  background-color: rgb(255, 255, 255);
}

.select-tag {
  position: absolute;
  right: 80%;
  top: 100%;
  width: 200px;
  max-height: 240px;
  border-radius: 4px;
  box-shadow: 0 2px 11px 0 rgba(0, 0, 0, 0.16);
  background-color: rgb(255, 255, 255);
  z-index: 2;
  resize: none;
}
.tag-input {
  padding: 5px 1px 3px 0;
  margin-right: 2px;
  border-bottom: 1px solid rgb(233, 233, 233);
}
.tag-input .el-input {
  width: 100%;
  margin: 0 !important;
  padding: 0 !important;
}

.tag-list {
  margin: 0 !important;
  max-height: 150px;
  overflow: hidden;
}
.tag-list li {
  position: relative;
  width: 180px;
  height: 30px;
  line-height: 30px;
  -moz-user-select: none; /*火狐*/
  -webkit-user-select: none; /*webkit浏览器*/
  -ms-user-select: none; /*IE10*/
  -khtml-user-select: none; /*早期浏览器*/
  user-select: none;
}
.icon-tag .icon-click {
  position: absolute;
  right: 30%;
  top: 10%;
}
.tag-list pre {
  position: absolute;
  width: 140px;
  top: 0;
  left: 17px;
  font-size: 12px;
  font-family: 微软雅黑;
  color: rgb(72, 74, 79);
  white-space: nowrap; /*强制文字显示为一行*/
  overflow: hidden; /*溢出部分隐藏*/
  text-overflow: ellipsis; /*超出部分变成省略号*/
}
.tag-list li:hover {
  background-color: rgba(236, 239, 245, 0.9);
}
.tag-list ul li span {
  position: absolute;
  top: 0;
  left: 0;
}

.tag-list ul li i {
  display: inline-block;
  margin: 7px 10px;
}
.select-tag .tag-btn {
  width: 200px;
  height: 40px;
  padding: 0px 10px;
  resize: none;
}
.select-tag .tag-btn .el-button {
  margin: 0 15px !important;
}

.icon-priority {
  cursor: pointer;
}
.select-priority {
  position: absolute;
  width: 140px;
  height: 70px;
  border-radius: 4px;
  box-shadow: 0 2px 11px 0 rgba(0, 0, 0, 0.16);
  background-color: rgb(255, 255, 255);
  z-index: 2;
  resize: none;
  top: 100%;
  right: 0;
}
.select-priority h3 {
  font-size: 12px;
  font-weight: 400;
  height: 20px;
  line-height: 15px;
  padding: 5px 7px;
  color: rgb(117, 117, 117);
}
.select-priority ul {
  width: 130px;
  margin: 0;
  padding: 0 5px;
  margin-top: 10px;
  line-height: 40px;
}
.select-priority ul li {
  display: inline-block;
  width: 30px;
  height: 30px;
  margin-left: 15px;
  text-align: center;
  cursor: pointer;
}
.select-priority ul li:first-child {
  margin-left: 0;
}
.active {
  background-color: rgba(238, 238, 238, 0.8);
}
.select-priority ul li:hover {
  background-color: rgba(238, 238, 238, 0.7);
}

.icon-caldenar .icon-click {
  position: relative;
}
</style>