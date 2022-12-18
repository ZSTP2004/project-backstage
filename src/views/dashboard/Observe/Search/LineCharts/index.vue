<template>
  <div>
    <div class="header">
      <span class="search-header">搜索用户数</span>
      <svg t="1670573263718" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4178" width="16" height="16"><path d="M512 85.333333C276.48 85.333333 85.333333 276.48 85.333333 512S276.48 938.666667 512 938.666667 938.666667 747.52 938.666667 512 747.52 85.333333 512 85.333333z m0 796.444445c-203.662222 0-369.777778-166.115556-369.777778-369.777778S308.337778 142.222222 512 142.222222 881.777778 308.337778 881.777778 512 715.662222 881.777778 512 881.777778z" p-id="4179" fill="#8a8a8a"></path><path d="M549.546667 641.706667l-29.582223 15.928889c2.275556-12.515556 14.791111-62.577778 35.271112-152.462223 2.275556-9.102222 4.551111-36.408889-15.928889-47.786666-6.826667-3.413333-14.791111-3.413333-22.755556 0-9.102222 3.413333-17.066667 7.964444-23.893333 12.515555-4.551111 3.413333-25.031111 18.204444-60.302222 44.373334-6.826667 5.688889-9.102222 14.791111-4.551112 22.755555s13.653333 10.24 20.48 5.688889l34.133334-20.48-35.271111 150.186667c-3.413333 13.653333 1.137778 22.755556 7.964444 30.72 5.688889 6.826667 14.791111 11.377778 23.893333 11.377777 4.551111 0 7.964444-1.137778 11.377778-2.275555 6.826667-3.413333 31.857778-17.066667 76.231111-43.235556 7.964444-4.551111 11.377778-14.791111 5.688889-22.755555-3.413333-5.688889-13.653333-9.102222-22.755555-4.551111z" p-id="4180" fill="#8a8a8a"></path><path d="M523.377778 364.088889m-45.511111 0a45.511111 45.511111 0 1 0 91.022222 0 45.511111 45.511111 0 1 0-91.022222 0Z" p-id="4181" fill="#8a8a8a"></path></svg>
    </div>
    <div class="main">
      <span class="main-title">12841</span>
      <span class="main-content">17.7</span>
      <svg t="1670575911926" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="11938" width="12" height="12"><path d="M458.854 701.962l-234.8-318.605a73.059 73.059 0 0 1 15.262-102.048l2.619-1.806a78.026 78.026 0 0 1 44.612-13.817h469.6a75.588 75.588 0 0 1 76.762 74.413 72.246 72.246 0 0 1-14.269 43.258l-234.8 318.605a78.477 78.477 0 0 1-107.195 17.25 77.213 77.213 0 0 1-17.791-17.25z" p-id="11939" fill="#11af08"></path></svg>
    </div>
    <div class="footer">
      <div class="charts" ref="charts">
      </div>
    </div>
  </div>
</template>

<script>
import * as echarts from 'echarts'
export default {
  mounted(){
        // 初始化 Ecahrts
        let lineCharts = echarts.init(this.$refs.charts)
        // 配置数据
        lineCharts.setOption({
            xAxis:{
                // 隐藏轴
                show:false,
                // 均分...
                type:'category'
            },
            yAxis:{// 隐藏轴
                show:false,
                },
            // 系列
            series:[
                {
                    // 折线图
                    type:'line',
                     // 曲线...
                    smooth:true,
                    data:[12,78,49,98,62,15,51,36,110,22],
                    // 拐点的样式
                    itemStyle:{
                        opacity:0
                    },
                    // 线条样式
                    lineStyle:{
                        color:'#409EFF',
                        opacity:.7
                    },
                    // 填充色
                    areaStyle:{
                        color:{
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
                                    color: '#fff', // 100% 的颜色
                                }
                            ],
                            global: false, 
                        }
                    },
                   
                }
            ],
            // 布局
            grid:{
                left:0,
                top:0,
                rigth:0,
                bottom:0
            }
        })
    }
}
</script>

<style scoped>
  .header {
    display: flex;
    align-items: center;
  }
  .search-header {
    margin-right: 20px;
    color: #b9b9b9;
    font-size: 14px;
  }
  .main {
    margin: 10px 0;
  }
  .main-title {
    margin-right: 30px;
    font-size: 22px;
  }
  .main-content {
    margin-right: 5px;
    font-size: 14px;
    color: #b9b9b9;
  }
  .charts {
    width: 100%;
    height: 50px;
  }
</style>