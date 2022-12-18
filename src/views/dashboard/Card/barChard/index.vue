<template>
  <div class="charts" ref="charts"></div>
</template>

<script>
import * as echarts from "echarts";
import { mapState } from "vuex";
export default {
  mounted() {
    // 初始化 Ecahrts
    this.barCharts = echarts.init(this.$refs.charts);
    // 配置数据
    this.barCharts.setOption({
      xAxis: {
        // 隐藏轴
        show: false,
        // 均分...
        type: "category",
      },
      yAxis: {
        // 隐藏轴
        show: false,
      },
      // 系列
      series: [
        {
          // 折线图
          type: "bar",
          data: [],
          color: "#67C23A",
        },
      ],
      // 提示...
      tooltip: {},
      // 布局
      grid: {
        left: 0,
        top: 0,
        rigth: 0,
        bottom: 0,
      },
    });
  },
  computed: {
    ...mapState({
       barlist: state => state.home.list,
    }),
    
  },
  watch: {
    barlist() {
      this.barCharts.setOption({
        series: [
          {
            data: this.barlist.payTrend,
          },
        ],
      });
    },
  },
};
</script>

<style>
.charts {
  width: 100%;
  height: 100%;
}
</style>