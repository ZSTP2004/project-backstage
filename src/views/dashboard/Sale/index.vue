<template>
  <el-card class="box-card" style="margin: 10px 0">
    <div slot="header" class="clearfix">
      <!-- 头部左侧内容 -->
      <!--  @tab-click="handleClick" -->
      <el-tabs class="left" v-model="activeName">
        <el-tab-pane label="销售额" name="sale"></el-tab-pane>
        <el-tab-pane label="访问量" name="visite"></el-tab-pane>
      </el-tabs>
      <!-- 头部右侧内容 -->
      <div class="rigth">
        <span @click="setDay">今日</span>
        <span @click="setWeek">本周</span>
        <span @click="setMonth">本月</span>
        <span @click="setYear">本年</span>
        <!-- 日历 -->
        <el-date-picker
          v-model="date"
          class="date"
          type="daterange"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          size="mini"
          value-format="yyyy-MM-dd"
        >
        </el-date-picker>
      </div>
    </div>
    <div>
      <el-row :gutter="10">
        <el-col :span="18">
          <div class="charts" ref="charts"></div>
        </el-col>
        <el-col :span="6" class="eright">
            <h4>门店{{ title }}排名</h4>
            <ul v-if="activeName == 'sale'">
                <li v-for="(orderRank, index) in listState.orderRank" :key="index">
                    <span class="rindex">{{ orderRank.no}}</span>
                    <span>{{ orderRank.name}}</span>
                    <span class="rvalue">{{  orderRank.money}}</span>
                </li>
            </ul>
            <ul v-else>
                <li v-for="(userRank, index) in listState.userRank" :key="index">
                    <span class="rindex">{{ userRank.no}}</span>
                    <span>{{ userRank.name}}</span>
                    <span class="rvalue">{{  userRank.money}}</span>
                </li>
            </ul>
        </el-col>
      </el-row>
    </div>
  </el-card>
</template>

<script>
import * as echarts from "echarts";
import dayjs from 'dayjs'
import {mapState} from 'vuex'

export default {
    data() {
      return {
        activeName: "sale",
        myecharts:null,
        // 日期数据
        date:[],
      };
    },
    mounted() {
      this.myecharts = echarts.init(this.$refs.charts);
      this.myecharts.setOption({
          title:{
              text:'销售额趋势',
              textStyle:{
                fontSize: 16
              }
          },
          textStyle:{
              fontSize: 12
          },
          tooltip: {
              trigger: "axis",
              axisPointer: {
              type: "shadow",
              },
          },
          grid: {
              left: "3%",
              right: "4%",
              bottom: "3%",
              containLabel: true,
          },
          xAxis: [
              {
              type: "category",
              data: [],
              axisTick: {
                  alignWithLabel: true,
              },
              },
          ],
          yAxis: [
              {
              type: "value",
              },
          ],
          series: [
              {
              name: "Direct",
              type: "bar",
              barWidth: "50%",
              data: [],
              color:'#409EFF'
              },
          ],
      });
    },
    computed:{
      title() {
        return this.activeName == 'sale'? '销售额' : '访问量'
      },
      ...mapState({
        listState: state => state.home.list
      })
    },
    watch:{
      title(){
        this.myecharts.setOption({
          title:{
            text:this.title + '趋势'
          },
          xAxis: [
              {
              type: "category",
              data: this.title == "销售额" ? this.listState.orderFullYearAxis : this.listState.userFullYearAxis,
              axisTick: {
                  alignWithLabel: true,
              },
              },
          ],
          series: [
              {
              name: "Direct",
              type: "bar",
              barWidth: "50%",
              data: this.title == "销售额" ? this.listState.orderFullYear : this.listState.userFullYear,
              color:'#409EFF'
              },
          ],
        })
      },
      listState(){
        this.myecharts.setOption({
          xAxis: [
              {
              type: "category",
              data:  this.listState.orderFullYearAxis,
              axisTick: {
                  alignWithLabel: true,
              },
              },
          ],
          series: [
              {
              name: "Direct",
              type: "bar",
              barWidth: "50%",
              data: this.listState.orderFullYear,
              color:'#409EFF'
              },
          ],
      });
      }
    },
    methods: {
      // 今日
      setDay() {
        const day = dayjs().format('YYYY-MM-DD')
        this.date = [day,day]
      },
      // 本周
      setWeek(){
        const start = dayjs().day(0).format('YYYY-MM-DD')
        const end = dayjs().day(6).format('YYYY-MM-DD')
        this.date = [start, end]
      },
      // 本月
      setMonth() {
        const start = dayjs().startOf('month').format('YYYY-MM-DD')
        const end = dayjs().endOf('month').format('YYYY-MM-DD')
        this.date = [start, end]
      },
      // 本年
      setYear() {
        const start = dayjs().startOf('year').format('YYYY-MM-DD')
        const end = dayjs().endOf('year').format('YYYY-MM-DD')
        this.date = [start, end]
      }
    }
};
</script>

<style scoped>
    .clearfix {
      position: relative;
      display: flex;
      justify-content: space-between;
    }
    .left {
    width: 100%;
    }
    .rigth {
    position: absolute;
    right: 0px;
    }
    .rigth span {
      margin: 0 10px;
    }
    .date {
    width: 220px;
    margin: 0 20px;
    }
    .charts {
    width: 100%;
    height: 300px;
    }
    h4 {
        margin-top: 0;
    }
    .eright span {
        margin: 0 10px;
    }
    ul {
        list-style: none;
        width: 100%;
        height: 300px;
        padding: 0;
    }
    ul li {
        margin: 10px 0;
        height: 8%;
    }
    .rindex {
        float: left;
        width: 18px;
        height: 18px;
        border-radius: 50%;
        background: #409EFF;
        color: #fff;
        text-align: center;
        line-height: 18px;
    }
    .rvalue {
        float: right;
    }
</style>