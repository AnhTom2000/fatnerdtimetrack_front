<template>
  <div class="calculate">
    <div class="calculate-left">
      <div class="near">
        <div class="seleted-year">
          <el-select v-model="value">
            <el-option
              v-for="item in timeSlot"
              :key="item.id"
              :label="item.data"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
        <div class="show-section">
          <ft-time-calculate :todo_list="todo_list" :tag_list="tag_list" :value="value"></ft-time-calculate>
        </div>
      </div>
      <div class="change">
        <div class="seleted-year">
          <el-select v-model="date">
            <el-option
              v-for="item in timeSlot"
              :key="item.id"
              :label="item.data"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
        <div class="show-section">
          <ft-time-nearcalculate :todo_list="todo_list" :tag_list="tag_list" :types='date'></ft-time-nearcalculate>
        </div>
      </div>
    </div>
    <div class="calculate-right">
      <div class="right-bd">
        <div class="calculate-today">
          <div class="todayEvent" style=" margin: -5px 10px 20px 200px;">今日事件完成情况</div>
          <div style="width:300px;margin-left:160px;">
            <el-progress type="circle" :percentage="todayEventPercentage" :color="colors" :width="280"></el-progress>
          </div>
        </div>
        <div class="calculate-all">
          <div class="allEvent">所有事件完成情况</div>
          <ft-dashboard></ft-dashboard>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import timeCalculate from "../components/calculate/Ft-timeCalculate";
import nearCalculate from "../components/calculate/Ft-changTime";
import dashboard from "../components/calculate/Ft-dashboard";
import {mapState} from 'vuex'
export default {
  components: {
    "ft-time-calculate": timeCalculate,
    "ft-time-nearcalculate": nearCalculate,
    "ft-dashboard": dashboard
  },
  data() {
    return {
      value: "最近数据",
      date: "最近数据",
      timeSlot: [
        {
          id: 1,
          data: "最近数据",
          value : '最近数据'
        },
        {
          id: 2,
          data: "一周",
          value : '一周'
        },
        {
          id: 3,
          data: "一个月",
          value : '一个月'
        },
        {
          id: 4,
          data: "半年",
          value : '半年'
        },
        {
          id: 5,
          data: "一年",
          value : '一年'
        }
      ],
      colors: [
        { color: "#f56c6c", percentage: 20 },
        { color: "#e6a23c", percentage: 40 },
        { color: "#5cb87a", percentage: 60 },
        { color: "#1989fa", percentage: 80 },
        { color: "#6f7ad3", percentage: 100 }
      ]
    };
  },mounted(){
    this.$store.dispatch("initEventList");
    this.$store.dispatch("initTagList");
  },computed:{
    ...mapState({
      todo_list : state=>state.todo_list,
      tag_list : state=> state.tag_list
    }),
    todayEventPercentage(){
      const now = new Date();
      if(this.todo_list.length == 0) return 0;
      const finished = this.todo_list.filter(event=>event.finished).filter(event=>{
        const date = new Date(event.date);
        return date.getDate() === now.getDate();
      });
      const today = this.todo_list.filter(event=>{
        const date = new Date(event.date);
        return now.getDate() === date.getDate();
      })
      
      
      return today.length==0 ? 0 : parseFloat(finished.length/today.length*100).toFixed(2);
    }
  }
};
</script>

<style >
* {
  box-sizing: border-box;
}
.calculate {
  position: relative;
  height: 935px;
  box-sizing: border-box;
  resize: none;
  overflow-y: hidden;
}

.calculate-left {
  float: left;
  width: 1050px;
  height: 100%;
}
.near,
.change {
  position: relative;
}
.show-section {
  position: relative;
  border-right: 2px solid #ccc;
}
.time-calculate-section {
  height: 400px;
}
.seleted-year {
  position: absolute;
  z-index: 1;
  top: 60px;
  left: 50px;
}
.calculate-right {
  float: left;
  position: relative;
}
.right-bd {
  width: 100%;
  height: 100%;
}
.calculate-today {
  width: 500px;
  margin: 50px 20px;
}
.calculate-all {
  width: 500px;
  margin: 10px 20px;
  /* padding: 0 30px; */
}
.todayEvent,
.allEvent {
  width: 200px;
  height: 50px;
  margin: 0 10px 5px 200px;
  text-align: center;
  line-height: 50px;
  background-color: rgba(222, 222, 222, 0.6);
  border-radius: 300px;
  font-size: 20px;
  color: rgb(80, 80, 80);
}

.seleted-year {
  position: absolute;
}

.near {
  height: 400px;
}

/* .change{
    width: 1000px;
} */
</style>