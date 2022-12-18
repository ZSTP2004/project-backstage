<template>
  <div>
    <el-form ref="form" label-width="80px">
      <el-form-item label="SPU名称">
        {{ spu.spuName }}
      </el-form-item>
      <el-form-item label="SKU名称">
        <el-input placeholder="sku名称" v-model="skuInfo.skuName"></el-input>
      </el-form-item>
      <el-form-item label="价格(元)">
      <el-input placeholder="价格(元素)" type="number" v-model="skuInfo.price"></el-input>
      </el-form-item>
      <el-form-item label="重量(千克)">
        <el-input placeholder="重量(千克)" type="number" v-model="skuInfo.weigth"></el-input>
      </el-form-item>
      <el-form-item label="规格描述">
        <el-input type="textarea" rows="3" placeholder="规格描述" v-model="skuInfo.skuDesc"></el-input>
      </el-form-item>
      <el-form-item label="平台属性">
        <el-form :inline="true" ref="form" label-width="80px">
          <el-form-item :label="attr.attrName" v-for="(attr, index) in attrInfoList" :key="attr.id">
            <el-select placeholder="请选择" v-model="attr.attrIdAndValueId">
              <el-option :label="attrValue.valueName" :value="`${attr.id}:${attrValue.id}`"  v-for="(attrValue, index) in attr.attrValueList" :key="attrValue.id"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>
      <el-form-item label="销售属性">
        <el-form :inline="true" ref="form" label-width="80px">
          <el-form-item :label="saleAttr.saleAttrName" v-for="(saleAttr, index) in spuSaleAttrList" :key="saleAttr.id">
            <el-select placeholder="请选择" v-model="saleAttr.attrIdAndValueId">
              <el-option :label="saleAttrValue.saleAttrValueName" :value="`${saleAttr.id}:${saleAttrValue.id}`" v-for="(saleAttrValue, index) in saleAttr.spuSaleAttrValueList" :key="saleAttrValue.id"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>
      <el-form-item label="图片列表">
        <el-table style="width: 100%" border :data="spuImageList" @selection-change="handlerSelectionChange">
          <el-table-column type="selection" prop="prop" label="label" width="80"></el-table-column>
          <el-table-column prop="prop" label="图片" width="width">
            <template slot-scope="{row,$index}">
                <img :src="row.imgUrl" style="width: 100px; heigth: 100px">
            </template>
          </el-table-column>
          <el-table-column prop="imgName" label="名称" width="width"></el-table-column>
          <el-table-column prop="prop" label="操作" width="width">
             <template slot-scope="{row, $index}">
              <el-button type="primary" size="mini" v-if="row.isDefault == 0" @click="changDefault(row)">设置默认</el-button>
              <el-button size="mini" v-else>默认</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item >
        <el-button type="primary" @click="save">保存</el-button>
        <el-button @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 存储图片信息
      spuImageList:[],
      // 存储销售属性
      spuSaleAttrList:[],
      // 存储平台属性
      attrInfoList:[],
      spu:{},
      // sku 数据的字段
      skuInfo: {
        // 父组件给的数据
        category3Id: 0,
        spuId: 0,
        tmId: 0,
        // 双向绑定的数据
        skuName: "",
        price: "",
        weigth: "",
        skuDesc: "",
        // 通过代码实现收集到的数据
        //  默认图片
        skuDefaultImg: "",
        //  图片的字段
        skuImageList: [],
        //  平台属性
        skuAttrValueList: [],
        //  销售属性
        skuSaleAttrValueList: [],

      },
      // 收集图片的数据字段
      imageList:[]
    }
  },
  methods:{ //reqSpuImageList reqSpuSaleAttrList reqAttrInfoList
    async getData(category1Id, category2Id, spu){
      this.spu = spu
      // 收集SkuInfo的数据
      this.skuInfo.category3Id = spu.category3Id
      this.skuInfo.spuId = spu.id
      this.skuInfo.tmId = spu.tmId
      // 图片数据
      let resultImg = await this.$API.spu.reqSpuImageList(spu.id)
      if(resultImg.code == 200){
        let list = resultImg.data
        list.forEach(item=>{
          item.isDefault = 0
        })
        this.spuImageList = list
      }
      // 销售属性
      let resultSale = await this.$API.spu.reqSpuSaleAttrList(spu.id)
      if(resultSale.code == 200){
        this.spuSaleAttrList = resultSale.data
      }
      // 平台属性
      let resultAttr = await this.$API.spu.reqAttrInfoList(category1Id,category2Id,spu.category3Id)
      if(resultAttr.code == 200){
        this.attrInfoList = resultAttr.data
      }
    },
    // table复选框的点击事件
    handlerSelectionChange(params){
      this.imageList = params
    },
    // 设置默认与默认切换 排他
    changDefault(row){
      this.spuImageList.forEach(item=>{
        item.isDefault = 0
      })
      row.isDefault = 1
      // 收集默认图片的地址
      this.skuInfo.skuDefaultImg = row
    },
    // 取消按钮...
    cancel(){
      this.$emit('changeScenes',0)
      // 清除数据(data里的)
      Object.assign(this._data,this.$options.data())
    },
    // 保存事件 
    async save(){
      // 平台属性
      const {attrInfoList, skuInfo, spuSaleAttrList, imageList} = this
      skuInfo.skuAttrValueList = attrInfoList.reduce((prev, item)=>{
        if(item.attrIdAndValueId){
          const [attrId, valueId] = item.attrIdAndValueId.split(":")
          prev.push({attrId, valueId})
        }
        return prev
      },[])
      // 销售属性
      skuInfo.skuSaleAttrValueList = spuSaleAttrList.reduce((prev, item)=>{
        if(item.attrIdAndValueId){
          const [saleAttrId, saleAttrValueId] = item.attrIdAndValueId.split(":")
          prev.push({saleAttrId, saleAttrValueId})
        }
        return prev
      },[])
      // 整理图片的数据u
      skuInfo.skuImageList = imageList.map(item=>{
        return {
          imgName: item.imgName,
          imgUrl: item.imgUrl,
          isDefault: item.isDefault,
          spuImgId: item.id
        }
      })
      let result = await this.$API.spu.reqAddSku(skuInfo)
      if(result.code == 200){
        this.$message({type:'success', message:'添加sku成功'})
        this.$emit('changeScenes',0)
      }
        
    }
  }
}
</script>

<style>

</style>