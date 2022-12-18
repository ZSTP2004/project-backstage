<template>
  <el-card>
    <div slot="header" class="header">
      <div class="catrgory-header">
        <span>销售额类别占比</span>
        <el-radio-group v-model="saleRank" size="mini">
          <el-radio-button label="全部渠道" name="onlineAndShop"></el-radio-button>
          <el-radio-button label="线上" name="online"></el-radio-button>
          <el-radio-button label="门店" name="shop"></el-radio-button>
        </el-radio-group>
      </div>
    </div>
    <div>
      <div class="charts" ref="charts"></div>
    </div>
  </el-card>
</template>

<script>
import * as echarts from "echarts";

export default {
  data() {
    return {
      saleRank: "全部渠道",
    }
  },
  mounted() {
    let mychart = echarts.init(this.$refs.charts);
    mychart.setOption({
      title: {
        text: "家用电器",
        subtext: "244",
        left: "center",
        top: "center",
      },
      series: [
        {
          name: "Access From",
          type: "pie",
          radius: ["40%", "70%"],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            borderColor: "#fff",
            borderWidth: 2,
          },
          label: {
            show: true,
            position: "outside",
          },
          labelLine: {
            show: true,
          },
          data: [
            { value: 244, name: "家用电器" },
            { value: 321, name: "食用酒水" },
            { value: 301, name: "个护健康" },
            { value: 41, name: "服饰箱包" },
            { value: 111, name: "母婴产品" },
            { value: 69, name: "其他" }
          ],
        },
      ],
    });
    mychart.on("mouseover", (params) => {
      const { name, value } = params.data;
      mychart.setOption({
        title: {
          text: name,
          subtext: value,
        },
      });
    });
  },
  
};
</script>

<style scoped>
.catrgory-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.header {
  padding-bottom: 6px;
  border-bottom: 1px solid #eee;
}
.charts {
  width: 100%;
  height: 300px;
}
</style>