<template>
  <div class="charts" ref="charts"></div>
</template>

<script>
import * as echarts from 'echarts'
import { mapState } from 'vuex'
export default {
    mounted(){
        // 初始化 Ecahrts
        let lineCharts = echarts.init(this.$refs.charts)
        // 配置数据
        lineCharts.setOption({
            xAxis:{
                // 隐藏轴
                show:false,
                min:0,
                max:100
            },
            yAxis:{// 隐藏轴
                show:false,
                // 均分...
                type:'category'
                },
            // 系列
            series:[
                {
                    // 折线图
                    type:'bar',
                    data: [78],
                    color:'#E6A23C',
                    // 柱状图的宽度
                    barWidth:11,
                    // 柱状图的背景及颜色
                    showBackground: true,
                    backgroundStyle: {
                        color:'#909399'
                    },
                    // 文本
                    label: {
                        show:true,
                        // 文本内容
                        formatter: '|',
                        // 文本标签的位置...
                        position: 'right'
                    }
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
    },
   computed:{
        ...mapState({
            list: state=>state.home.list
        })
    }
    
}
</script>

<style>
    .charts {
        width: 100%;
        height: 100%;
    }
</style>