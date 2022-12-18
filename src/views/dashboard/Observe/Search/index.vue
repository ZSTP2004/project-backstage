<template>
  <el-card>
    <div slot="header" class="header">
      <div class="search-header">
        <span>线上热门搜索</span>
        <el-dropdown>
          <span>
            <i class="el-icon-more"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>黄金糕</el-dropdown-item>
            <el-dropdown-item>黄金糕</el-dropdown-item>
            <el-dropdown-item>黄金糕</el-dropdown-item>
            <el-dropdown-item>黄金糕</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <div>
      <el-row :gutter="10">
        <el-col :span="12">
          <LineCharts></LineCharts>
        </el-col>
        <el-col :span="12">
          <LineChart></LineChart>
        </el-col>
      </el-row>
      <el-table :data="tableData" style="width: 100%" border class="mian-tab">
        <el-table-column label="排名" width="80" type="index">
        </el-table-column>
        <el-table-column label="搜索关键字" width="180" prop="word">
        </el-table-column>
        <el-table-column label="用户数" sortable prop="user"> </el-table-column>
        <el-table-column label="周涨幅" sortable prop="count"> </el-table-column>
      </el-table>
      <!-- 分页器 @current-change="getSkuList"-->
      <el-pagination layout="prev, pager, next" :total="1" class="pagination">
      </el-pagination>
    </div>
  </el-card>
</template>

<script>
import LineCharts from "./LineCharts";
import LineChart from "./LineChart";
import { mapState } from "vuex";
export default {
  data() {
    return {
      tableData: [
        {
          word: "北京",
          count: 3440,
          user: 1626,
        },
        {
          word: "上海",
          count: 8101,
          user: 6660,
        },
      ],
    };
  },
  components: {
    LineCharts,
    LineChart,
  },
  computed: {
    ...mapState({
      list: (state) => state.home.list,
    }),
  },
};
</script>

<style scoped>
.header {
  padding-bottom: 15px;
  border-bottom: 1px solid #ebeef5;
}
.search-header {
  display: flex;
  justify-content: space-between;
}
.mian-tab {
  font-size: 12px;
}
.pagination {
  text-align: center;
}
</style>