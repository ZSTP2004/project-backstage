<template>
  <div>
    <el-table style="width: 100%" border :data="records">
      <el-table-column type="index" label="序号" width="50" align=" center"></el-table-column>
      <el-table-column prop="skuName" label="名称" width="width"></el-table-column>
      <el-table-column prop="skuDesc" label="描述" width="width"></el-table-column>
      <el-table-column label="默认图片" width="110">
        <template slot-scope="{row, $index}">
          <img :src="row.skuDefaultImg" alt="" style="width:100px; height:100px">            
        </template>
      </el-table-column>
      <el-table-column prop="weigth" label="重量" width="60"></el-table-column>
      <el-table-column prop="price" label="价格" width="60"></el-table-column>
      <el-table-column prop="prop" label="操作" width="width">
        <template slot-scope="{row, $index}">
          <el-button type="success" icon="el-icon-top" size="mini" v-if="row.isSale == 0" @click="sale(row)"></el-button>
          <el-button type="info" icon="el-icon-bottom" size="mini" v-else @click="cancel(row)"></el-button>
          <el-button type="primary" icon="el-icon-edit" size="mini" @click="edit"></el-button>
          <el-button type="warning" icon="el-icon-info" size="mini" @click="getSkuInfo(row)"></el-button>
          <el-button type="danger" icon="el-icon-delete" size="mini"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页器 -->
    <el-pagination
      style="text-align: center"
      :current-page="page"
      @size-change="handleSizeChange"
      @current-change="getSkuList"
      :page-sizes="[3, 5, 10]"
      :page-size="limit"
      layout="prev, pager, next, jumper, ->, sizes, total"
      :total="total">
    </el-pagination>
    <!-- 浏览的抽屉效果 -->
    <el-drawer :visible.sync="show" :show-close="false" size="40%">
      <el-row >
        <el-col :span="5">名称</el-col>
        <el-col :span="16">{{ skuInfo.skuName }}</el-col>
      </el-row>
      <el-row >
        <el-col :span="5">描述</el-col>
        <el-col :span="16">{{ skuInfo.skuDesc }}</el-col>
      </el-row>
      <el-row >
        <el-col :span="5">价格</el-col>
        <el-col :span="16">{{ skuInfo.price }}元</el-col>
      </el-row>
      <el-row >
        <el-col :span="5">平台属性</el-col>
        <el-col :span="16">
          <template>
            <el-tag type="success" v-for="(attr, index) in skuInfo.skuAttrValueList" :key="attr.id" style="margin-right:10px">{{ attr.attrId }}-{{ attr.valueId }}</el-tag>              
          </template>
        </el-col>
      </el-row>
      <el-row >
        <el-col :span="5">商品图片</el-col>
        <el-col :span="16">
          <el-carousel height="200px" >
            <el-carousel-item v-for="(skuImg, index) in skuInfo.skuImageList" :key="skuImg.id" >
              <img :src="skuImg.imgUrl" alt="" style="width:300px; heigth:300px">
            </el-carousel-item>
          </el-carousel>
        </el-col>
      </el-row>
    </el-drawer>

  </div>
</template>

<script>
export default {
    name:'Sku',
    data() {
      return {
        page: 1,
        limit: 3,
        records:[],
        total: 0,
        // 存储sku 浏览的数据
        skuInfo:{},
        // 浏览的抽屉..
        show:false
      }
    },
    mounted(){
      this.getSkuList()
    },
    methods:{
      async getSkuList(page1 = 1){
        this.page = page1
        const {page ,limit} = this
        let result = await this.$API.sku.reqSkuList(page, limit)
        if(result.code == 200){
          this.records = result.data.records
          this.total = result.data.total
        }
      },
      // 分页器
      handleSizeChange(limit){
        this.limit = limit
        this.getSkuList()
      },
      // 上架
      async sale(row){
        let result = await this.$API.sku.reqSale(row.id)
        if(result.code == 200){
          row.isSale = 1
          this.$message({
            message: '上架成功',
            type: 'success'
          })
        }
      },
       // 上架 
      async cancel(row){
        let result = await this.$API.sku.reqCancel(row.id)
        if(result.code == 200){
          row.isSale = 0
          this.$message({
            message: '下架成功',
          })
        }
      },
      // 第二个小按钮  正在开发
      edit(){
        this.$message({
          message: '正在开发...',
        })
      },
      // sku 浏览...   
      async getSkuInfo(row){
        let result = await this.$API.sku.reqSkuById(row.id)
        if(result.code == 200){
          this.skuInfo = result.data
          this.show = true
        }
      }
    }
}
</script>

<style sccope>
  .el-row .el-col-5{
    font-size: 18px;
    text-align: right;
  }
  .el-col{
    margin: 10px 10px;
  }
</style>
<style >
  .el-carousel__item h3{
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 150px;
    margin: 0;
  }
  .el-carousel__item:nth-child(2n){
    background-color: #99a9bf;
  }
  .el-carousel__item:nth-child(2n+1){
    background-color: #d3dce6;
  }
  .el-carousel__button{
    width: 10px;
    height: 10px;
    background: #409EFF;
    border-radius: 50%;
  }
</style>