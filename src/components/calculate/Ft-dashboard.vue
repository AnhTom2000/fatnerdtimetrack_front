<template>
  <div ref="cricleCharts" style="width: 400px;height:400px;margin-left:100px"></div>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      percentage: 0
    };
  },
  methods: {
    drawChart() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(this.$refs.cricleCharts);
      // 指定图表的配置项和数据
      let option = {
        tooltip: {
          formatter: "{a} <br/>{b} : {c}%"
        },
        toolbox: {
          feature: {
            restore: {},
            saveAsImage: {}
          }
        },
        series: [
          {
            name: "所有事件",
            type: "gauge",
            detail: { formatter: "{value}%" },
            data: [{ value: this.percentage, name: "所有事件" }]
          }
        ]
      };
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    }
  },
  computed: {
    ...mapState({
      todo_list: state => state.todo_list
    })
  },
  watch: {
    todo_list() {
      const finished = this.todo_list.filter(event => event.finished);
      finished.length > 0
        ? (this.percentage =
            ((finished.length / this.todo_list.length) * 100).toFixed(2) - 0)
        : 0;

      this.drawChart();
    }
  }
};
</script>

