<template>
  <div>
    <el-form ref="form" :model="spu" label-width="80px">
      <el-form-item label="SPU名称">
        <el-input v-model="spu.spuName" placeholder="SPU名称"></el-input>
      </el-form-item>
      <el-form-item label="品牌">
        <el-select v-model="spu.tmId" placeholder="请选择品牌" >
          <el-option :label="tm.tmName" :value="tm.id" v-for="(tm, index) in tradeMarkList" :key="tm.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="SPU描述">
        <el-input v-model="spu.description" type="textarea" rows="3" placeholder="SPU描述"></el-input>
      </el-form-item>
      <el-form-item label="SPU图片">
        <el-upload
          action="/dev-api/admin/product/fileUpload "
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :file-list="spuImageList"
          :on-success="handlerSuccess">
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img :src="dialogImageUrl" width="100%" alt="">
        </el-dialog>
      </el-form-item>
      <el-form-item label="销售属性">
        <el-select v-model="attrId" :placeholder="`还有${unSelectSaleAttr.length}种属性未选择`">
          <el-option :label="unselect.name" :value="`${unselect.id}:${unselect.name}`" v-for="(unselect, index) in unSelectSaleAttr" :key="unselect.id"></el-option>
        </el-select>
        <el-button type="primary" icon="el-icon-plus" :disabled="!attrId" @click="addSaleAttr">添加销售属性值</el-button>
        <el-table :data="spu.spuSaleAttrList" style="width: 100%" border> 
          <el-table-column type="index" label="序号" width="80px" align=" center">
          </el-table-column>
          <el-table-column prop="saleAttrName" label="属性名" width="width">
          </el-table-column>
          <el-table-column prop="prop" label="属性值名称" width="width">
            <template slot-scope="{ row,$index }">    
              <el-tag closable :key="tag.id" v-for="(tag, index) in row.spuSaleAttrValueList" :disabled-transition="false"  @close="row.spuSaleAttrValueList.splice(index, 1)">{{ tag.saleAttrValueName }}</el-tag>          
              <!-- @keyup.enter.native="handleInputConfirm" -->
              <el-input class="input-new-tag" v-if="row.inputVisible" v-model="row.inputValue" ref="savetTagInput" size="small"  @blur="handleInputConfirm(row)"></el-input>
              <!-- @click="showInput" -->
              <el-button v-else class="button-new-tag" size="small" @click="addSaleAttrValue(row)">添加</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="prop" label="操作" width="width">
            <template slot-scope="{ row, $index }">
                <el-button type="danger" icon="el-icon-delete" size="mini" @click="spu.spuSaleAttrList.splice($index, 1)"></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item >
        <el-button type="primary" @click="addOrUpdateSpu">保存</el-button>
        <el-button @click="cancel">取消</el-button>
      </el-form-item>
      
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogImageUrl: "",
      dialogVisible: false,
      // SPU 信息的数据
      spu: {
        // 三级分类ID
        category3Id: 0,
        // 描述
        description: "",
        // spu 名称
        spuName: "",
        // 平台的ID
        tmId: '',
        // 收集 spu 图片
        spuImageList:[
          {
            id: 0,
            imgName: "string",
            imgUrl: "string",
            spuId: 0,
          }
        ],
        // 平台的属性与属性值收集
        spuSaleAttrList:[]
      },
      // 品牌信息
      tradeMarkList: [],
      // spu 图片
      spuImageList: [],
      // spu 销售属性
      saleAttrList: [],
      // 为选中的销售属性的ID
      attrId:'',
    }
  },
  methods:{
    handleRemove(file, fileList){
      console.log(file,fileList);
      this.spuImageList = fileList
    },
    handlePictureCardPreview(file){
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    async initSpuData(spu){
      // SPU数据
      let spuResult = await this.$API.spu.reqSpu(spu.id) 
      if(spuResult.code == 200){
        this.spu = spuResult.data
      }
      // 品牌信息
      let tradeMarkResult = await this.$API.spu.reqTradeMarkList()
      if(tradeMarkResult.code == 200){
        this.tradeMarkList = tradeMarkResult.data
      }
      // spu 图片
      let spuImageResult = await this.$API.spu.reqSpuImageList(spu.id)
      if(spuImageResult.code == 200 ){
        let listAttr = spuImageResult.data
        listAttr.forEach(item => {
          item.name = item.imgName
          item.url = item.imgUrl
        });
        this.spuImageList = listAttr
      }
      // spu全部的销售属性
      let saleResult = await this.$API.spu.reqBaseSaleAttrList()
      if(saleResult.code == 200){
        this.saleAttrList = saleResult.data
      }
    },
    // 照片墙图片上传成功
    handlerSuccess(response, file, fileList){
      this.spuImageList = fileList
    },
    // 添加新的销售属性
    addSaleAttr(){
      const [ baseSaleAttrId,saleAttrName ] = this.attrId.split(':')
      let newSaleAttr = { baseSaleAttrId, saleAttrName, spuSaleAttrValueList:[]}
      this.spu.spuSaleAttrList.push(newSaleAttr)
      this.attrId = ""
    },
    // 添加按钮
    addSaleAttrValue(row){
      this.$set(row,'inputVisible',true)
      this.$set(row,'inputValue','')
    },
    // 失焦
    handleInputConfirm(row){
      const { baseSaleAttrId, inputValue } = row
      if(inputValue.trim()==''){
        this.$message('属性值不能为空')
        return 
      }
      // 属性值不能重复调用
      let result = row.spuSaleAttrValueList.every(item => item.saleAttrValueName!=inputValue)
      if(!result) return 
      let newSaleAttrValue  = { baseSaleAttrId, saleAttrValueName:inputValue }
      row.spuSaleAttrValueList.push(newSaleAttrValue)
      row.inputVisible = false
    },
    async addOrUpdateSpu(){
      this.spu.spuImageList = this.spuImageList.map((item) =>{
        return {
          imageName: item.name,
          imageUrl: (item.response && item.response.data) || item.url
        }
      })
      let result = await this.$API.spu.reqAddOrUpdateSpu(this.spu)
      if(result.code == 200 ){
        this.$message({type:'success',message:'保存成功'})
        this.$emit('changeScene',{
          scene:0,
          flag: this.spu.id? "修改" : "添加"
        })
      }
      Object.assign(this._data, this.$options.data())
    },
    // 点击添加SPU
    async addSpuData(category3Id){
      // 添加spu时收集三级分类id
      this.spu.category3Id = category3Id
      // 品牌信息
      let tradeMarkResult = await this.$API.spu.reqTradeMarkList()
      if(tradeMarkResult.code == 200){
        this.tradeMarkList = tradeMarkResult.data
      }
       // spu全部的销售属性
      let saleResult = await this.$API.spu.reqBaseSaleAttrList()
      if(saleResult.code == 200){
        this.saleAttrList = saleResult.data
      }
    },
    cancel(){
      this.$emit('changeScene',{scene:0,flag:''})
      Object.assign(this._data, this.$options.data())

    }
  },
  computed: {
    unSelectSaleAttr() {
      let result = this.saleAttrList.filter((item) => {
        return this.spu.spuSaleAttrList.every((item1) => {
          return item.name != item1.saleAttrName
        })
      })
      return result
    }
  }
}
</script>

<style>
  .el-tag + .el-tag{
    margin-left: 10px;
  }
  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }
</style>