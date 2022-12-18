<template>
<el-row :gutter="10">
    <el-col :span="6">
        <el-card>
            <Detail title="总销售额" :count="'￥'+list.salesTotal">
                <template slot="charts">
                    <span>月同比:&nbsp;{{ list.salesGrowthLastMonth }}%</span><svg t="1670575838351" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="9626" width="12" height="12"><path d="M583.93 296.842l234.8 318.515a73.059 73.059 0 0 1-14.99 102.048l-2.62 1.806a78.116 78.116 0 0 1-44.612 13.908h-469.6a75.588 75.588 0 0 1-76.762-74.414 72.878 72.878 0 0 1 14.269-43.348l234.8-318.515a78.568 78.568 0 0 1 106.834-16.888 77.574 77.574 0 0 1 17.881 16.888z" p-id="9627" fill="#d81e06"></path></svg>&nbsp;
                    <span>日同比:&nbsp;{{ list.salesGrowthLastDay }}%</span><svg t="1670575911926" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="11938" width="12" height="12"><path d="M458.854 701.962l-234.8-318.605a73.059 73.059 0 0 1 15.262-102.048l2.619-1.806a78.026 78.026 0 0 1 44.612-13.817h469.6a75.588 75.588 0 0 1 76.762 74.413 72.246 72.246 0 0 1-14.269 43.258l-234.8 318.605a78.477 78.477 0 0 1-107.195 17.25 77.213 77.213 0 0 1-17.791-17.25z" p-id="11939" fill="#11af08"></path></svg>
                </template>
                <template slot="footer">
                    <span>日销售额￥{{ list.salesToday }}</span>
                </template>
            </Detail>
        </el-card>
    </el-col>
    <el-col :span="6">
        <el-card>
            <Detail title="访问量" :count="list.visitTotal">
                <template slot="charts">
                    <LineChard></LineChard>
                </template>
                <template slot="footer">
                    <span>日访问量{{list.visitToday}}</span>
                </template>
            </Detail>
        </el-card>
    </el-col>
    <el-col :span="6">
        <el-card>
            <Detail title="支付笔数" :count="list.payTotal">
                <template slot="charts">
                    <BarChard></BarChard>
                </template>
                <template slot="footer">
                    <span>转化率:{{ list.payRate }}%</span>
                </template>
            </Detail>
        </el-card>
    </el-col>
    <el-col :span="6">
        <el-card>
            <Detail title="运营活动效果" :count="list.activityRate+'%'">
                <template slot="charts">
                    <ProgressChard></ProgressChard>
                </template>
                <template slot="footer">
                    <span>月同比:&nbsp;{{ list.activityGrowthLastMonth }}%</span><svg t="1670575838351" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="9626" width="12" height="12"><path d="M583.93 296.842l234.8 318.515a73.059 73.059 0 0 1-14.99 102.048l-2.62 1.806a78.116 78.116 0 0 1-44.612 13.908h-469.6a75.588 75.588 0 0 1-76.762-74.414 72.878 72.878 0 0 1 14.269-43.348l234.8-318.515a78.568 78.568 0 0 1 106.834-16.888 77.574 77.574 0 0 1 17.881 16.888z" p-id="9627" fill="#d81e06"></path></svg>&nbsp;
                    <span>日同比:&nbsp;{{ list.activityGrowthLastDay }}%</span><svg t="1670575911926" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="11938" width="12" height="12"><path d="M458.854 701.962l-234.8-318.605a73.059 73.059 0 0 1 15.262-102.048l2.619-1.806a78.026 78.026 0 0 1 44.612-13.817h469.6a75.588 75.588 0 0 1 76.762 74.413 72.246 72.246 0 0 1-14.269 43.258l-234.8 318.605a78.477 78.477 0 0 1-107.195 17.25 77.213 77.213 0 0 1-17.791-17.25z" p-id="11939" fill="#11af08"></path></svg>
                </template>
            </Detail>
        </el-card>
    </el-col>
</el-row>
</template>

<script>
import Detail from './Detail'
import LineChard from './lineChard'
import BarChard from './barChard'
import ProgressChard from './progressChard'
import { mapState } from 'vuex'
export default {
    name:'Card',
    components:{
        Detail,
        LineChard,
        BarChard,
        ProgressChard
    },
    computed:{
        ...mapState({
            list: state=>state.home.list
        })
    }
}
</script>

<style>

</style>