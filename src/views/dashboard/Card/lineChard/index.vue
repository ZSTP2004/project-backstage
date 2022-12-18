<template>
  <div class="charts" ref="charts"></div>
</template>

<script>
import * as echarts from "echarts";
import { mapState } from "vuex";
export default {
  mounted() {
    // 初始化 Ecahrts
    this.lineCharts = echarts.init(this.$refs.charts);
    // 配置数据
    this.lineCharts.setOption({
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
          type: "line",
          // 曲线...
          smooth: true,
          data: [],
          // 拐点的样式
          itemStyle: {
            opacity: 0,
          },
          // 线条样式
          lineStyle: {
            color: "#409EFF",
            opacity: 0.7,
          },
          // 填充色
          areaStyle: {
            color: {
              type: "linear",
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: "#409EFF", // 0% 的颜色
                },
                {
                  offset: 1,
                  color: "#fff", // 100% 的颜色
                },
              ],
              global: false,
            },
          },
        },
      ],
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
      linelist: state=> state.home.list,
    }),
  },
  watch: {
    linelist() {
      this.lineCharts.setOption({
        series: [
          {
            data: this.linelist.visitTrend,
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