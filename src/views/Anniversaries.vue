<template>
  <div class="anniversary">
    <vue-topprogress ref="topProgress"></vue-topprogress>
    <div id="noevent" v-if="!firstDay">
      <ft-noEvents :dialogShow.sync="dialogFormVisible"></ft-noEvents>
    </div>
    <div class="anniversaryEvents" v-if="firstDay">
      <div class="todayAnniversary">
        <P>
          <span style="font-size :50px">距离</span>
          <span
            style="display:inline-block;font-size :30px;margin-left:10px;color : rgb(80,80,80)"
          >{{firstDay.anniversaryTitle}}</span>
          <span style="display:inline-block;font-size :30px;color : rgb(80,80,80)">还有....</span>
          <span class="distanceDay">{{ todayAnniversarydistanceDay(firstDay)}}</span>
          <span class="day">day</span>
        </P>
      </div>
      <div class="anniversaryUl">
        <ul>
          <li
            style="cursor:pointer"
            v-for="(event,index) in anniversaryList"
            :key="index"
            @click="selectItem(event)"
            v-contextmenu:contextmenu
          >
            <P>
              <span>距离</span>
              <span>{{event.anniversaryTitle}}</span>
              <span>还有</span>
            </P>
            <div class="distanceDays">
              <span>{{todayAnniversarydistanceDay(event)}}</span>
              <span>Days</span>
            </div>
            <v-contextmenu ref="contextmenu" :theme="'default'">
              <v-contextmenu-item @click="deleteAnniversary(event)">删除</v-contextmenu-item>
            </v-contextmenu>
          </li>
          <li class="addNewAnniversary">
            <el-button type="info" @click="dialogFormVisible = true">+</el-button>
          </li>
        </ul>
      </div>
    </div>
    <el-dialog title="添加纪念日" :visible.sync="dialogFormVisible" width="500px">
      <div>
        <anniversaryAdd :title.sync="title" :endTime.sync="endTime" :desciptions.sync="description"></anniversaryAdd>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addAnniversary">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="查看/修改纪念日" :visible.sync="dialogView" width="500px">
      <div class="anniversary-view">
        <el-input v-model="currentItem.anniversaryTitle" placeholder="输入纪念日标题"></el-input>
        <div class="event-seleted-time">
          <div class="event-date">
            <el-date-picker
              value-format="yyyy-MM-dd"
              v-model="currentItem.anniversaryTime"
              type="date"
              placeholder="选择日期"
            ></el-date-picker>
          </div>
        </div>
        <div class="event-description">
          <el-input v-model="currentItem.anniversaryDescription" placeholder="添加描述"></el-input>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click=" dialogView = false">取 消</el-button>
        <el-button type="primary" @click="updateAnniversary">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import NoEvents from "../components/Ft-noEvent";
import anniversaryAdd from "../components/Ft-addAnniversary";
import { mapState } from "vuex";
import contextMemu from "../components/Ft-contextMemu";
export default {
  components: {
    "ft-noEvents": NoEvents,
    anniversaryAdd: anniversaryAdd
  },
  data() {
    return {
      dialogFormVisible: false,
      dialogView: false,
      title: "",
      startTime: new Date().toLocaleDateString(),
      endTime: "",
      description: "",
      currentItem: {}
    };
  },
  methods: {
    showPropress() {
      this.$refs.topProgress.start();
      setTimeout(() => {
        this.$refs.topProgress.done();
      }, 1000);
    },
    sortList() {
      if (this.anniversaryList[0] == undefined) return;
      this.anniversaryList.sort((a, b) => {
        const now = new Date();
        const day = new Date(a.anniversaryTime);
        const dayb = new Date(b.anniversaryTime);
        var timea = parseInt(
          (day.getTime() / 1000 - parseInt(now.getTime() / 1000)) / 60 / 60 / 24
        );
        var timeb = parseInt(
          (dayb.getTime() / 1000 - parseInt(now.getTime() / 1000)) /
            60 /
            60 /
            24
        );
        if (timea < 0) return 1;
        if (timeb < 0) return -1;

        return timea - timeb;
      });
    },
    addAnniversary() {
      if (
        this.title.length < 1 ||
        this.endTime.length < 1 ||
        this.description.length < 1
      ) {
        this.$message.error("请填写必要的字段");
      }
      this.showPropress();
      this.dialogFormVisible = false;
      this.$store.dispatch("addAnniversary", {
        anniversaryTitle: this.title,
        anniversaryTime: this.endTime,
        anniversaryDescription: this.description
      });
      this.title = "";
      this.endTime = "";
      this.description = "";
      setTimeout(() => {
        this.sortList();
      }, 500);
    },
    updateAnniversary() {
      this.showPropress();
      this.$store.dispatch("updateAnniversary", this.currentItem);
      this.dialogView = false;
      setTimeout(() => {
        this.sortList();
      }, 500);
    },
    todayAnniversarydistanceDay(anniversary) {
      const now = new Date();
      const day = new Date(anniversary.anniversaryTime);

      var timeDay = day.getTime() / 1000 - parseInt(now.getTime() / 1000);
      return parseInt(timeDay / 60 / 60 / 24) + 1;
    },
    selectItem(item) {
      this.currentItem = item;
      this.dialogView = true;
    },
    deleteAnniversary(anniversary) {
      this.$confirm("此操作将永久删除该纪念日, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.showPropress();
          this.$store.dispatch("deleteAnniversary", anniversary);
          this.anniversaryList.splice(
            this.anniversaryList.indexOf(anniversary),
            1
          );
          setTimeout(() => {
            this.sortList();
          }, 500);
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  },
  mounted() {
    this.showPropress();
    this.$store.dispatch("initAnniversary");
    setTimeout(() => {
      this.sortList();
    }, 500);
  },
  computed: {
    ...mapState({
      anniversaryList: state => state.anniversaryList
    }),
    firstDay() {
      return this.anniversaryList[0];
    }
  }
};
</script>


<style >
.anniversary {
  position: relative;
  width: 100%;
  height: 100%;
}
#noevent {
  position: absolute;
  top: 50%;
  margin-top: -200px;
  left: 50%;
  margin-left: -250px;
}

.todayAnniversary {
  position: relative;
  width: 939px;
  height: 203px;
  background-color: rgb(233, 233, 233);
  border-radius: 10px;
  line-height: 203px;
}
.todayAnniversary .day {
  display: inline-block;
  position: absolute;
  top: 5px;
  right: 20px;
  font-size: 30px;
  color: rgb(139, 49, 49);
}
.todayAnniversary p {
  position: relative;
  display: inline-block;
  width: 800px;
  margin-left: 40px;
}
.todayAnniversary .distanceDay {
  display: inline-block;
  position: absolute;
  font-size: 50px;
  right: 30%;
}
.anniversaryUl {
  margin-top: 10px;
}
.anniversaryUl ul li {
  position: relative;
  width: 619px;
  height: 48px;
  background-color: rgb(208, 208, 208);
  margin-bottom: 10px;
  border-radius: 10px;
  margin-left: 5px;
  line-height: 48px;
  font-size: 20px;
  font-weight: bold;
}
.anniversaryUl ul li p {
  margin-left: 10px;
}
.anniversaryUl ul li .distanceDays {
  position: absolute;
  height: 100%;
  top: 0;
  right: 30px;
  color: rgb(109, 109, 109);
  background-color: rgb(193, 193, 193);
  text-align: center;
  border-radius: 15px;
}
.addNewAnniversary {
  position: relative;
}
.addNewAnniversary .el-button {
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 10px;

  margin: 0;
}

.anniversary-view .anniversary-view {
  width: 100%;
  height: 100%;
}

.anniversary-view .event-date {
  width: 460px;
  float: left;
  margin-right: 20px;
}

.anniversary-view .event-date .el-date-editor.el-input,
.el-date-editor.el-input__inner {
  width: 460px !important;
}
.anniversary-view .event-seleted-time {
  height: 80px;
  margin-top: 30px;
}
.anniversary-view .event-tag_selected {
  width: 460px;
  margin: 0 auto;
}
</style>