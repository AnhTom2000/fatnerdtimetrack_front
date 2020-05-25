<template>
  <div>
    <div class="time-calculate-header">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="柱形图" name="bar"></el-tab-pane>
        <el-tab-pane label="饼状图" name="pie"></el-tab-pane>
      </el-tabs>
    </div>
    <div class="time-calculate-section">
      <div ref="charts" style="width: 600px;height:400px;"></div>
    </div>
  </div>
</template>

<script>
import { isLeap } from "../scheduleCalendar/utils";
export default {
  props: {
    tag_list: Array,
    todo_list: Array,
    value: String
  },
  data() {
    return {
      activeName: "bar",
      chartType: "bar"
    };
  },
  methods: {
    handleClick(tab, event) {
      this.chartType = tab.name;
      this.drawChart();
    },
    drawChart() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(this.$refs.charts);
      let option;
      // 指定图表的配置项和数据
      if (this.chartType === "bar") {
        option = {
          tooltip: {},
          legend: {
            data: ["时间"]
          },
          xAxis: {
            show : true,
            data: this.tags.name
          },
          yAxis: {
            show : true
          },
          series: [
            {
              name: "时间",
              type: this.chartType,
              data: this.tags.value
            }
          ]
        };
      } else {
        option = {
          tooltip: {
            trigger: "item",
            formatter: "{a} <br/>{b}: {c} ({d}%)"
          },
          legend: {
            orient: "vertical",
            left: 10,
            data: this.circleTag.name
          },
          xAxis: {
            show: false
          },
          yAxis: { show: false },
          series: [
            {
              name: "",
              type: this.chartType,
              radius: ["50%", "70%"],
              avoidLabelOverlap: false,
              label: {
                show: false,
                position: "center"
              },
              emphasis: {
                label: {
                  show: true,
                  fontSize: "30",
                  fontWeight: "bold"
                }
              },
              labelLine: {
                show: false
              },
              data: this.circleTag.value
            }
          ]
        };
      }
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    }
  },
  computed: {
    tags() {
      const tag = [];
      const value1 = {
        name: [],
        value: []
      };
      let now = new Date();
      for (let i = 0; i < this.tag_list.length; i++) {
        tag.push(this.tag_list[i].tagName);
        value1.name.push(this.tag_list[i].tagName);
        value1.value.push(0);
      }

      for (let i = 0; i < this.todo_list.length; i++) {
        if (
          this.todo_list[i].tagList.length > 0 &&
          this.todo_list[i].finished
        ) {
        
          let tagList = this.todo_list[i].tagList;

          for (let k = 0; k < tagList.length; k++) {
            let index = value1.name.indexOf(tagList[k].tagName);
            let sh = new Date(this.todo_list[i].date);
            let h = new Date(this.todo_list[i].endDate);

            if (sh.getDate() === h.getDate()) {
              value1.value[index] += h.getHours()-sh.getHours();
            }else{
              value1.value[index] += (24-sh.getHours())+h.getHours();
            }
          }
        }
      }
      const tagArray = {
        name: tag,
        value: value1.value
      };
      return tagArray;
    },circleTag(){
       const tag = [];
      const value1 = {
        name: [],
        value: []
      };
      let now = new Date();
      for (let i = 0; i < this.tag_list.length; i++) {
        tag.push(this.tag_list[i].tagName);
        value1.name.push(this.tag_list[i].tagName);
        value1.value.push(0);
      }

      for (let i = 0; i < this.todo_list.length; i++) {
        if (
          this.todo_list[i].tagList.length > 0 &&
          this.todo_list[i].finished
        ) {
          let tagList = this.todo_list[i].tagList;

          for (let k = 0; k < tagList.length; k++) {
            let index = value1.name.indexOf(tagList[k].tagName);
            let sh = new Date(this.todo_list[i].date);
            let h = new Date(this.todo_list[i].endDate);

            if (sh.getDate() === h.getDate()) {
              value1.value[index] += h.getHours()-sh.getHours();
            }else{
              value1.value[index] += (24-sh.getHours())+h.getHours();
            }
          }
        }
      }
      const tagArray = {
        name: tag,
        value: []
      };
    for(let i = 0;i<value1.value.length;i++){
      tagArray.value.push({
        name : value1.name[i],
        value: value1.value[i]
      })
    }
    console.log(tagArray);
    
      return tagArray;
    }
  },
  watch: {
    tags() {
      this.drawChart();
    }
  }
};
</script>

<style scoped>
.time-calculate-section {
  position: relative;
  height: 400px;
}
.time-calculate-section > div {
  position: absolute;
  right: 100px;
  top: 70px;
}
.time-calculate-header {
  position: absolute;
  right: 50%;
  margin-right: 50px;
  top: 20px;
}
</style>