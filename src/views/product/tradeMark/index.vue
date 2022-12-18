<template>
  <div>
    <el-button type="primary" icon="el-icon-plus" style="margin: 10px 0" @click="showDialog">添加</el-button>
    <el-table style="width: 100%" border :data="list">
      <!-- data：表格所展示的数据类型   label:标题  prop：对应列内容的字段 -->
      <el-table-column type="index" label="序号" width="80px" align="center"></el-table-column>
      <el-table-column prop="tmName" label="品牌名称" width="width"></el-table-column>
      <el-table-column prop="logoUrl" label="品牌LOGO" width="width">
        <!-- row 是作用域插槽回传数组   $index 数组里面相应的索引值 -->
        <template slot-scope="{row, $index}">
          <img :src="row.logoUrl" style="width: 50px; height: 50px">
        </template>
      </el-table-column>
      <el-table-column prop="prop" label="操作" width="width">
        <template slot-scope="{row, $index}">
          <el-button type="primary" icon="el-icon-edit" size="mini" @click="updateTradeMark(row)">修改</el-button>
          <el-button type="danger" icon="el-icon-delete" size="mini" @click="deleteTradeMar(row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页器 -->
    <!-- current-page：当前页码   total：总数据    page-size：所展示的数据个数
    page-count：页码的按钮数    layout：按钮的布局！！！！！！！！
    current-change 改变页码的函数 能直接获取 page
    size-change    改变所展示的数据  获取limit 
    -->
    <el-pagination
      style="margin-top:20px; textAlign:center"
      :current-page="page"
      :total="total"
      :page-size="limit"
      :page-count="7"
      :page-sizes="[3, 5, 10]"
      @current-change="getPageList"
      @size-change="handleSizeChange"
      layout="prev, pager, next, jumper,->,sizes,total"
      >
    </el-pagination>
    <!-- 对话框 -->
    <!-- :visible.sync 控制显示与隐藏 -->
    <el-dialog :title="tmForm.id? '修改品牌':'添加品牌'" :visible.sync="dialogVisible">
      <!-- form表单   :model 是将表单的数据收集到对象身上-->
      <el-form style="width: 85%" :model="tmForm" :rules="rules" ref="ruleForm">
        <el-form-item label="品牌名称" label-width="100px" prop="tmName">
          <el-input auto-complete="off" v-model="tmForm.tmName"></el-input>
        </el-form-item>
        <el-form-item label="品牌LOGO" label-width="100px" prop="logoUrl">
          <el-upload class="avatar-uploader" 
            action="dev-api/admin/product/fileUpload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <img v-if="tmForm.logoUrl" :src="tmForm.logoUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            <div slot="tip" class="el-upload__tip">只能上穿jpg文件，且不能超过500kb</div>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addOrUpdateTradeMark">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "TradeMark",
  data() {
    return {
      // 当前页
      page: 1,
      // 所展示的数量
      limit: 3,
      // 总数据
      total: 0,
      // 列表展示的数据
      list:[],
      dialogVisible:false,
      // 上传图片所使用的属性
      tmForm:{
        tmName:'',
        logoUrl:''
      },
      // 表单验证
      rules:{
        // 品牌名称校验
        tmName:[
          // required 必要的校验（带*的）  trigger 用户的行为设置
          { required: true, message:'请输入品牌名称', trigger:'blur' },
          { min:2, max:10, message:'长度在2~10个字符', trigger:'change' }
        ],
        // 品牌图片校验
        logoUrl:[
          { required: true, message:'请选择品牌图片' }
        ]
      }
    }
  },
  mounted(){
    this.getPageList()
  },
  methods:{
    async getPageList(pager = 1){
      this.page = pager
      const {page, limit} = this
      let result = await this.$API.trademark.reqTradeMarkList(page,limit)
      if(result.code == 200){
        this.total = result.data.total
        this.list = result.data.records
      }
    },
    handleSizeChange(limit){
      this.limit = limit
      this.getPageList()
    },
    // 弹出对话框
    showDialog(){
      this.dialogVisible = true
      // 清除相关数据
      this.tmForm = {tmName:'', logoUrl:''}
    },
    updateTradeMark(row){
      // row 当前用户选中的品牌信息
      this.dialogVisible = true
      // 浅拷贝
      this.tmForm = {...row}
    },
    // 上传照片
    handleAvatarSuccess(res, file){
      this.imageUrl = URL.createObjectURL(file.raw)
    },
    beforeAvatarUpload(file){
      const isJPG = file.type === "image/jpeg"
      const isLt2M = file.size / 1024 / 1024 < 2 
      if(!isJPG){
        this.$message.error("上传头像图片只能是 JPG 格式！")
      }
      if(!isLt2M){
        this.$message.error("上传头像图片大小不能超过 2MB!")
      }
      return isJPG && isLt2M
    },
    // 图片上传成功   res 上传后的前端数据     file上传后服务器返回的前端数据
    handleAvatarSuccess(res,file){
      this.tmForm.logoUrl = res.data
    },
    // 添加按钮
    addOrUpdateTradeMark(){
      // 当校验通过，才给提交
      this.$refs.ruleForm.validate(async (success)=>{
        if(success){
          this.dialogVisible = false
        // 发请求
          let result = await this.$API.trademark.reqAddOrUpdateTradeMark(this.tmForm)
          if(result.code == 200){
          // 弹出信息
            this.$message({
            type: 'success',
            message:this.tmForm.id? '修改品牌成功':'添加品牌成功'
            })
            this.getPageList(this.tmForm.id? this.page : 1)
          }
        }else{
          return false
        }
      })  
    },
    // 删除按钮 
    deleteTradeMar(row){
      // 弹窗 
      this.$confirm(`你确定删除${row.tmName}?`,"提示",{
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
      .then(async () => {
        let result = await this.$API.trademark.reqDeleteTradeMark(row.id)
        if(result.code == 200){
           this.$message({
            type: 'success',
            message: '删除成功',
          })
          this.getPageList(this.list.length > 1? this.page:this.page-1)
        }
      })
      // 点击取消按钮
      .catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  }
};
</script>

<style>
  .avatar-uploader .el-upload{
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover{
    border-color: #409EFF;
  }
  .avatar-uploader-icon{
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>