<template>
  <div class="change-calculate">
    <div ref="lineCharts" class="lineCharts" style="width: 600px;height:400px;"></div>
  </div>
</template>

<script>
export default {
  props: {
    todo_list: Array,
    tag_list: Array,
    types: {
      type: String,
      default: "最近数据"
    }
  },
  data() {
    return {};
  },
  methods: {
    drawChart() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(this.$refs.lineCharts);
      // 指定图表的配置项和数据
      let option = {
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: this.tagNames
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: this.dates
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            name: "邮件营销",
            type: "line",
            stack: "总量",
            data: [120, 132, 101, 134, 90, 230, 210]
          },
          {
            name: "联盟广告",
            type: "line",
            stack: "总量",
            data: [220, 182, 191, 234, 290, 330, 310]
          },
          {
            name: "视频广告",
            type: "line",
            stack: "总量",
            data: [150, 232, 201, 154, 190, 330, 410]
          },
          {
            name: "直接访问",
            type: "line",
            stack: "总量",
            data: [320, 332, 301, 334, 390, 330, 320]
          },
          {
            name: "搜索引擎",
            type: "line",
            stack: "总量",
            data: [820, 932, 901, 934, 1290, 1330, 1320]
          }
        ]
      };
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    }
  },
  computed: {
    tagNames() {
      let tagname = [];
      for (let i = 0; i < this.tag_list.length; i++) {
        tagname.push(this.tag_list[i].tagName);
      }
      return tagname;
    },
    values() {
      let value = [];
      let now = new Date();
      let day1 = new Date(now);
      let day2 = new Date(now);
     
      switch (this.types) {
        case "最近数据":
          day1.setDate(day1.getDate() - 3);
          day2.setDate(day2.getDate() + 3);
          for(let i = 0;i<this.todo_list.length;i++){
            if(this.todo_list[i].endDate){
              
            }
          }
          break;
        case "一周":
          day1.setDate(day1.getDate() - 7);
          day2.setDate(day2.getDate() + 7);
          break;
        case "一个月":
          day1.setMonth(day1.getMonth());
          day2.setMonth(day2.getMonth() + 2);
          break;
        case "半年":
          day1.setMonth(day1.getMonth() + 1 - 6);
          day2.setMonth(day2.getMonth() + 1 + 6);
          break;
        case "一年":
          day1.setFullYear(day1.getFullYear() + 1);
          day2.setFullYear(day2.getFullYear() - 1);
          break;
      }
      for (let i = 0; i < this.todo_list.length; i++) {
        let edays = this.todo_list[i].endDate;
        if (edays) {
        }
      }
      return value;
    },
    dates() {
      let year = [];
      let now = new Date();
      let day1 = new Date(now);
      let day2 = new Date(now);
      switch (this.types) {
        case "最近数据":
          console.log(3);

          day1.setDate(day1.getDate() - 3);
          day2.setDate(day2.getDate() + 3);

          for (let i = day1.getDate(); i < day2.getDate(); i++) {
            year.push(i);
          }
          break;
        case "一周":
          console.log(7);
          day1.setDate(day1.getDate() - 7);
          day2.setDate(day2.getDate() + 7);
          for (let i = day1.getDate(); i < day2.getDate(); i++) {
            year.push(i);
          }
          break;
        case "一个月":
          console.log(30);

          day1.setMonth(day1.getMonth());
          day2.setMonth(day2.getMonth() + 2);
          console.log(day1.getMonth());
          console.log(day2.getMonth());
          
          for (let i = 1; i <=30; i++) {
            year.push(i);
          }
          break;
        case "半年":
          console.log(180);
          day1.setMonth(day1.getMonth() - 6);
          day2.setMonth(day2.getMonth() ); 
          for (let i = 1; i <=6; i++) {
            year.push(i+'月');
          }
          break;
        case "一年":
          console.log(365);
          day1.setFullYear(day1.getFullYear() - 1);
          day2.setFullYear(day2.getFullYear() );
          console.log(day1.getFullYear());
          console.log(day2.getFullYear());

          for (let i = 1; i <=12; i++) {
            year.push(i+'月');
          }
          break;
      }

      return year;
    }
  },
  watch: {
    todo_list() {
      this.drawChart();
    },
    types() {
      this.drawChart();
    }
  }
};
</script>

<style scoped>
.lineCharts {
  position: absolute;
  right: 100px;
  top: 100px;
}

.change-calculate {
  /* margin-top: 10px; */
  height: 500px;
}
</style>