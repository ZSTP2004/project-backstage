<template>
  <div>
    <el-card style="margin:20px 0">
      <CategorySelect @getCategoryId = "getCategoryId" :show="!isShowTable"/>
    </el-card>
    <el-card>
      <div v-show="isShowTable">
        <el-button type="primary" icon="el-icon-plus" @click="addAttr" :disabled="!category3Id">添加属性</el-button>
        <!-- 平台属性 -->
        <el-table :data="attrList" style="width: 100%" border  >
          <el-table-column type="index" label="序号" width="80" align="center">
          </el-table-column>
          <el-table-column prop="attrName" label="属性名称" width="150">
          </el-table-column>
          <el-table-column prop="prop" label="属性值列表" width="width">
            <!-- row  是数据源本身...  上面的 data -->
            <template slot-scope="{row, $index}">
              <el-tag type="success" v-for="(attrValue, index) in row.attrValueList" :key="attrValue.id" style="margin:0 5px">{{ attrValue.valueName }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="prop" label="操作" width="180">
            <template slot-scope="{row, $index}">
              <el-button type="primary" icon="el-icon-edit" size="mini" @click="updateAttr(row)">修改</el-button>
              <el-button type="danger" icon="el-icon-delete" size="mini">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 添加及修改平台属性 -->
      <div v-show="!isShowTable">
        <el-form ref="form" :model="attrInfo" label-width="80px" :inline="true">
          <el-form-item label="属性名">
            <el-input v-model="attrInfo.attrName" placeholder="请输入属性名" ></el-input>
          </el-form-item>
        </el-form>
          <el-button type="primary" :disabled="!attrInfo.attrName" @click="addAttrValue">添加属性值</el-button>
            <el-button @click="isShowTable = true">取消</el-button>
            <el-table :data="attrInfo.attrValueList" style="width: 100%; margin:20px 0" border>
              <el-table-column type="index" label="序号" width="50" align="center">
              </el-table-column>
              <el-table-column prop="prop" label="属性值名称" width="width">
                <template slot-scope="{row, $index}">
                    <el-input v-model="row.valueName" placeholder="请输入属性值名称" size="mini" v-if="row.flag" @blur="toLook(row)" @keyup.native.enter="toLook(row)" :ref="$index"></el-input>
                    <span v-else @click="toEdit(row,$index)" style="display:block">{{ row.valueName }}</span>
                </template>
              </el-table-column>
              <el-table-column prop="prop" label="操作" width="width">
                <template slot-scope="{ row, $index }">
                  <!-- 气泡确认框 -->
                  <el-popconfirm :title="`确定删除${row.valueName}?`" @onConfirm='deleteAttrValue($index)'>
                    <el-button type="danger" icon="el-icon-delete" size="mini" slot="reference">删除</el-button>
                  </el-popconfirm>
                </template>
              </el-table-column>
            </el-table>
            <el-button type="primary" @click="addOrUpdateAttr" :disabled="attrInfo.attrValueList.length < 1">保存</el-button>
            <el-button @click="isShowTable = true">取消</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
// 按需引入 lodash 中的深拷贝
import cloneDeep from 'lodash/cloneDeep'
export default {
    name:'Attr',
    data() {
      return {
        category1Id:'',
        category2Id:'',
        category3Id:'',
        attrList:[],
        isShowTable: true,
        // 新增属性 | 修改属性
        attrInfo:{
          attrName: '',   //属性名
          attrValueList:[   //属性值
           
          ],
          categoryId: 0,    //三级分类ID
          categoryLevel: 3,   //用于服务器区分三级ID
        }
      }
    },
    methods:{
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
          this.getAttrList()
        }
      },
      async getAttrList(){
        const { category1Id, category2Id, category3Id } = this
        let result = await this.$API.attr.reqAttrList(category1Id, category2Id, category3Id)
        if(result.code == 200){
          this.attrList = result.data
        }
      },
        // 添加属性值
      addAttrValue(){
        this.attrInfo.attrValueList.push({
          attrId: this.attrInfo.attrId,
          valueName: '',
          flag:true
        })
        this.$nextTick(()=>{
          this.$refs[this.attrInfo.attrValueList.length - 1].focus()
        })
      },
      //添加属性 
      addAttr(){
        this.isShowTable = false
        this.attrInfo = {
           attrName: '',   //属性名
           attrValueList:[], //属性值
           categoryId: this.category3Id,    //三级分类ID
           categoryLevel: 3,   //用于服务器区分三级ID
        }
      },
      // 修改某一个属性
      updateAttr(row){
        this.isShowTable = false
        this.attrInfo = cloneDeep(row)
        this.attrInfo.attrValueList.forEach(item => {
          this.$set(item,'flag',false)
        });
      },
      // 失去焦点
      toLook(row){
        // 提示 属性值不能为空
        if(row.valueName.trim() == ''){
          this.$message('输入的属性值不能为空')
          return
        }
        // 属性值不能重复
        let isRepat = this.attrInfo.attrValueList.some((item) =>{
          if(row !== item){
            return row.valueName == item.valueName
          }
        })
        if(isRepat) return
        row.flag = false
      },
      // 点击span 并获取当前焦点
      toEdit(row,index){
        row.flag = true
        // 因为点击的span的时候，数据还没回来...
        this.$nextTick(()=>{
          this.$refs[index].focus()
        })
      },
      // 气泡确认删除框
      deleteAttrValue(index){
        this.attrInfo.attrValueList.splice(index,1)
      },
      // 保存按钮及属性添加
      async addOrUpdateAttr(){
        this.attrInfo.attrValueList = this.attrInfo.attrValueList.filter(item=>{
          // 过滤掉文本不为空的
          if(item.valueName != ''){
            // 删除掉 flag 属性
            delete item.flag
            return true
          }
        })
        try {
          await this.$API.attr.reqAddAttr(this.attrInfo)
          this.isShowTable = true
          this.$message({type:'success',message:'保存成功'})
          this.getAttrList()
        } catch (error) {
          this.$message('保存失败')
        }
      }
    }, 
    // reqAddAttr
}
</script>

<style>

</style>