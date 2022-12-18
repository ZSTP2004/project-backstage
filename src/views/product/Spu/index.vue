<template>
  <div>
    <el-card style="margin:20px 0">
      <!-- 三级分类 -->
      <CategorySelect @getCategoryId = "getCategoryId" :show="scene!=0"/>
    </el-card>    
    <el-card>
      <!-- 有三部分进行切换 展示Spu 添加Spu 修改Spu -->
      <div v-show="scene==0">
        <!-- 展示Spu -->
        <el-button type="primary" icon="el-icon-plus" :disabled="!category3Id" @click="addSpu">添加SPU</el-button>

        <el-table :data="records" style="width: 100%" border>
          <el-table-column type="index" label="序号" width="80" align=" center">
          </el-table-column>
          <el-table-column prop="spuName" label="SPU名称" width="width">
          </el-table-column>
          <el-table-column prop="description" label="SPU描述" width="width">
          </el-table-column>
          <el-table-column prop="prop" label="操作" width="width">
            <template slot-scope="{row,$index}">
              <hint-button type="primary" icon="el-icon-plus" size="mini" title="添加sku" @click="addSku(row)" ></hint-button>
              <hint-button type="success" icon="el-icon-edit" size="mini" title="修改spu" @click="updateSpu(row)"></hint-button>
              <hint-button type="warning" icon="el-icon-info" size="mini" title="查看spu全部的sku" @click="handler(row)"></hint-button>
              <el-popconfirm title="确定要删除吗？" @onConfirm="deleteSpu(row) " >
                <hint-button type="danger" icon="el-icon-delete" size="mini" title="删除spu" slot="reference"></hint-button>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
        style="text-align:center"
          :current-page="page"
          :page-sizes="[3, 5, 10]"
          :page-size="3"
          layout="prev, pager, next, jumper, ->, sizes, total"
          :total="total"
          @current-change="getSpuList"
          @size-change="handleSizeChange">
        </el-pagination>
      </div>
      <SpuForm v-show="scene==1" @changeScene="changeScene" ref="spu"/>
      <SkuForm v-show="scene==2" @changeScenes="changeScenes" ref="sku"/>
      <el-dialog :title="`${spu.spuName}的sku列表`" :visible.sync="dialogTableVisible" :before-close="close" >
        <el-table :data="skuList" style="width: 100%" border v-loading="loading">
          <el-table-column prop="skuName" label="名称" width="width">
          </el-table-column>
          <el-table-column prop="price" label="价格" width="width">
          </el-table-column>
          <el-table-column prop="weight" label="重量" width="width">
          </el-table-column>
          <el-table-column  label="默认图片" width="width">
            <template slot-scope="{row, $index}">
              <img :src="row.skuDefaultImg" alt="" style="width:100px; heigth:100px">
            </template>
          </el-table-column>
        </el-table>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
import SkuForm from './SkuForm'
import SpuForm from './SpuForm'
export default {
    name:'Spu',
    data() {
      return {
        // 三级分类的相关ID
        category1Id:'',
        category2Id:'',
        category3Id:'',
        page:1,
        limit:3,
        total:0,
        records:[],  //spu的数据
        scene:0,
        //查看sku  对话框的显示与隐藏状态
        dialogTableVisible:false,
        spu:{},
        // 存储sku列表的数据
        skuList:[],
        // 懒加载
        loading:true
      }
    },
    methods:{
      // 三级联动
      getCategoryId({categoryId,level}){
        if(level == 1){
          this.category1Id = categoryId
          this.category2Id = ''
          this.category3Id = ''
        }else if(level == 2){
          this.category2Id = categoryId
          this.category3Id = ''
        }else if(level == 3){
          this.category3Id = categoryId
          //
          this.getSpuList()
        }
      },
      // 获取Spu列表数据 reqSpuList
      async getSpuList(page1 = 1){
        this.page = page1
        const { page,limit,category3Id } = this
        let result = await this.$API.spu.reqSpuList(page,limit,category3Id)
        if(result.code == 200){
          this.total = result.data.total
          this.records = result.data.records
        }
      },
      handleSizeChange(limit){
        this.limit = limit
        this.getSpuList()
      },
      // 添加Spu
      addSpu(){
        this.scene = 1
        this.$refs.spu.addSpuData(this.category3Id)
      },
      // 修改Spu
      updateSpu(row){
        this.scene = 1
        // 获取子组件 Spuform 里的东西（在它里面发请求） 并带row过去
        this.$refs.spu.initSpuData(row)
      },
      changeScene({scene,flag}){
        this.scene = scene
        if(flag=="修改"){
          this.getSpuList(this.page)
        }else{
          this.getSpuList()
        }
      },
      async deleteSpu(row){
        let result = await this.$API.spu.reqDeleteSpu(row.id) 
        if(result.code == 200){
          this.$message({type:'success',message:'删除成功'})
          this.getSpuList(this.records.length > 1? this.page:this.page-1)
        }
      },
      // 添加Sku
      addSku(row){
        this.scene = 2
        this.$refs.sku.getData(this.category1Id,this.category2Id,row)
      },
      // 添加sku里的取消
      changeScenes(scene){
        this.scene = scene
      },
      //查看sku的数据  
      async handler(spu){
        this.dialogTableVisible = true
        this.spu = spu
        // 发请求
        let result = await this.$API.spu.reqSkuList(spu.id)
        if(result.code == 200){
          this.skuList = result.data
          // 懒加载
          this.loading = false
        }
      },
      //关闭对话框
      close(done){
        this.loading = true
        this.skuList = []
        // 关闭对话框
        done()
      }

    },
    components:{SkuForm,SpuForm},
}
</script>

<style>

</style>