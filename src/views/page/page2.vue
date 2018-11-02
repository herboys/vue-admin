<template>


<div>
      <div>
            <el-button   @click.native.prevent="handleLogin" >查询</el-button>
      </div>
      <div>
        <section>
         <!--头部查询-->
        <el-row class="table-top">
            <el-col :span="24" class="grid-content bg-purple-light">
                <el-form :inline="true">
                    <el-form-item label="姓名">
                        <el-input placeholder="请输入姓名" v-model="filter.name"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="getUserList">查询</el-button>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="handleAdd">新增</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
      <!--表格-->

        <el-table class="table_box" highlight-current-row :data="names" style="width:100%" v-loading="loading" @selection-change="handleSelectionChange">
          <!-- <el-table class="table_box" highlight-current-row :data="userList" style="width:100%" v-loading="loading" @selection-change="handleSelectionChange"> -->
            <!-- <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column type="index" width="60" :index="typeIndex"></el-table-column> -->
            <el-table-column label="姓名" sortable prop="address"></el-table-column>
               <el-table-column label="姓名" sortable prop="description"></el-table-column>
                  <el-table-column label="姓名" sortable prop="name"></el-table-column>
                     <el-table-column label="姓名" sortable prop="phone"></el-table-column>
              <el-table-column label="姓名" sortable prop="photo"></el-table-column>
            <el-table-column label="操作">
                <template scope="scope">
                    <!-- <el-button size="mini" @click="handleEdit(scope.$index,scope.row)">编辑</el-button> -->
                    <el-button size="mini" type="danger" @click="delUserList(scope.$index,scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <!-- 分页 -->
        <!-- <el-row class="toobar">
            <el-col :span="24">
                <el-button type="danger" :span="6" class="dels" @click="batchDel" :disabled="this.sels.length===0">批量删除</el-button>
                <el-pagination background layout="prev, pager, next,jumper,total" :total="total" @current-change="handleCurrentChange" :page-size="20"></el-pagination>
            </el-col>
        </el-row> -->
        <!-- 新增 -->
        <el-dialog :visible.sync="dialogAddVisible" title="新增门店" :close-on-click-modal="false">
            <el-form  label-width="80px" :model="addForm" :rules="addFromRules" ref="addForm">
                <el-form-item  prop="name">
                   <p>门店名称（必填）</p>
                    <el-input v-model="addForm.name" auto-complete="off"></el-input>
                </el-form-item>
                 <el-form-item  prop="name">
                   <p>地址</p>
                    <el-input v-model="addForm.name" auto-complete="off"></el-input>
                </el-form-item>
                 <el-form-item  prop="name">
                   <p>电话</p>
                    <el-input v-model="addForm.name" auto-complete="off"></el-input>
                </el-form-item>
            
                <!-- <el-upload class="upload-demo" action="" ref="upload" :auto-upload='false' :on-change='changeUpload' accept="image/jpeg,image/gif,image/png,image/bmp">
    <div size="small" class="upload_btn"><div style="height:40px;color:red"></div><i class="iconfont icon-jiahao"></i><p style="line-height:0">点击上传</p></div>
  </el-upload> -->

             
                <el-form-item label="地址">
                    <el-input type="textarea" v-model="addForm.addr"></el-input>
                </el-form-item>
            </el-form>
            <div class="dialog-footer" slot="footer">
                <el-button @click="dialogAddVisible=false">取消</el-button>
                <el-button type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
            </div>
        </el-dialog>
        <!-- 编辑 -->
        <el-dialog :visible.sync="dialogEditVisible" title="编辑用户信息" :close-on-click-modal="false">
            <el-form  :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">
                <el-form-item label="姓名" prop="name">
                    <el-input v-model="editForm.name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="性别">
                    <el-radio-group class="radio-sex" v-model="editForm.sex">
                        <el-radio :label="1">男</el-radio>
                        <el-radio :label="0">女</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="年龄">
                    <el-input-number :min="0" :max="200" v-model="editForm.age"></el-input-number>
                </el-form-item>
                <el-form-item label="日期">
                    <el-date-picker type="date" class="date-item" v-model="editForm.birth" value-format="yyyy-MM-dd"></el-date-picker>
                </el-form-item>
                <el-form-item label="地址">
                    <el-input type="textarea" v-model="editForm.addr"></el-input>
                </el-form-item>
            </el-form>
            <div class="dialog-footer" slot="footer">
                <el-button @click="dialogEditVisible=false">取消</el-button>
                <el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
            </div>
        </el-dialog>
    </section>
      </div>
      </div>
      
</template>
</template>

<script>
  import {requestHeadaermain} from '@/api/api';
  export default {
    data() {
      return {
          names:'',
           name:'',
          imageUrl: '',
      imgthing: {},
          userList:[],
          filter:{
              name:''
          },
          total:0,
          page:1,
          loading:false,
          sels:[],
          //新增数据初始化
          dialogAddVisible:false,
          addLoading: false,
          addForm:{
              id:0,
              name:'',
              sex:-1,
              age:0,
              birth:'',
              addr:'',
              province:'',
              city:'',
              country:''
          },
          addFromRules:{
              name:[
                  {required:true,message:'请输入姓名',trigger:'blur'}
              ]
          },
          selected:[],
          //编辑数据初始化
          dialogEditVisible:false,
          editLoading:false,
          editForm:{
              id:0,
              name:'',
              sex:-1,
              age:0,
              birth:'',
              addr:'',
              province:'',
              city:'',
              country:''
          }
      };
    },
    methods: {
      //获取信息
      handleLogin() {
            requestHeadaermain().then(data => {
              sessionStorage.oo = JSON.stringify(data.data);
              console.log(sessionStorage.oo)
            });
          },
           //显示新增页面
     handleAdd(){
         this.dialogAddVisible=true
         this.addForm={
             name:'',
             sex:-1,
             age:0,
             birth:'',
             addr:''
         }
     },
     //提交新增信息
     addSubmit(){
         this.$refs.addForm.validate((valid)=>{
             if(valid){
                 this.$confirm('确认提交信息吗','提示',{type:'warning'}).then(()=>{
                    this.addLoading=true
                    let para=Object.assign({},this.addForm)
                    console.log(para)
                    //para.birth=(!para.birth||para.birth=="")?'':(moment(para.birth).format('yyyy-MM-dd'))
                    addUser(para).then((res)=>{
                        this.addLoading=false
                        this.$message({
                            type:'success',
                            message:'添加成功'
                        })
                        this.$refs['addForm'].resetFields();
                        this.dialogAddVisible=false
                        this.getUserList()
                    })
                 })
             }
         })
     },
     //显示编辑页面
     handleEdit(index,row){
         console.log(row)
         this.dialogEditVisible=true
         this.editForm=Object.assign({},row)
     },
     //提交编辑信息
     editSubmit(){
         this.$refs.editForm.validate((valid)=>{
             if(valid){
                 this.$confirm('确认提交信息吗？','提示',{type:'warning'}).then(()=>{
                     this.editLoading=true
                     let para=Object.assign({},this.editForm)
                     console.log(para)
                     editUser(para).then((res)=>{
                        this.editLoading=false
                        this.$message({
                            type:'success',
                            message:'编辑成功'
                        })
                        this.$refs['editForm'].resetFields()
                        this.dialogEditVisible=false
                        this.getUserList()
                     })
                 })
             }
         })
     },
     handleSelectionChange(val){
         console.log(val)
         this.sels=val
     },
     //批量删除用户信息
    batchDel(){
        var ids=this.sels.map(item=>item.id).toString()
        this.$confirm('确认删除信息吗?','提示',{type:'warning'})
        .then(()=>{
            this.loading=true
            let para={ids:ids}
            batchUsers(para).then((res)=>{
                this.loading=false
                this.$message({
                    type:'success',
                    message:'批量删除成功'
                })
                this.getUserList()
            })
        }).catch(()=>{})
    },
     changeUpload (file, fileList) {
      console.log(file)
      // 判断图片大小
      if (fileList[0].size < 1100000) {
        // 判断图片格式是否为jpg,png,jepg,gif
        var fileName=fileList[0].name
        // var suffixIndex=fileName.lastIndexOf(".")
        // var suffix=fileName.substring(suffixIndex+1).toUpperCase()
        var suffix = fileName.substring(fileName.lastIndexOf(".")+1).toUpperCase()
        if (suffix=="BMP"||suffix=="JPG"||suffix=="JPEG"||suffix=="PNG"||suffix=="GIF") {
            this.fileList = fileList
            this.$nextTick(
            () => {
              var i = this.imgN
              let uploadLists = document.getElementsByClassName('el-upload-list')
              let uploadListsN = uploadLists[i]
              let uploadListLi = uploadListsN.children
              uploadListsN.setAttribute('style', 'position: absolute;height: 160px;margin-top: 0;margin-left: 300px;width: 260px;overflow: hidden')
              let liA = uploadListLi[0]
              // 试着获取bolb里面的数据------------S
              //获取图片的Blob值
              function getImageBlob(url, cb) {
                  var xhr          = new XMLHttpRequest()
                  xhr.open("get", url, true)
                  xhr.responseType = "blob"
                  xhr.onload       = function() {
                      if (this.status == 200) {
                          if(cb) cb(this.response)
                      }
                  }
                  xhr.send()
              }
              function preView(url){
                  let reader    = new FileReader()
                  getImageBlob(url, function(blob){
                      reader.readAsDataURL(blob)
                  })
                  reader.onload = function(e) {
                      // 获取bolb里面数据时,生成预览
                      var img = document.createElement("img")
                      img.src = e.target.result
                      // 获取bolb里面数据时,生成预览
                      let imgElement = document.createElement('img')
                      imgElement.setAttribute('src', fileList[0].url)
                      imgElement.setAttribute('style', 'max-width:100%;padding-left:0')
                      if (liA.lastElementChild.nodeName !== 'IMG') {
                        liA.appendChild(imgElement)
                      }
                      // 把base64的信息放到imgthing的file里
                      file.base64 = e.target.result
                  }
              }
              preView(fileList[0].url)
              // 试着获取bolb里面的数据-------------E
              // 不获取bolb里面数据时,生成预览
              // let imgElement = document.createElement('img')
              // imgElement.setAttribute('src', fileList[0].url)     
              // imgElement.setAttribute('style', 'max-width:100%;padding-left:0')
              // if (liA.lastElementChild.nodeName !== 'IMG') {
              //   liA.appendChild(imgElement)
              // }
            }
          )
          // 修改nameN名字对应的数据,在一个页面使用多个不同字段图片上传，为了复用组件
          if (this.nameN === 'identityCard_Z') {
            this.imgthing.identityCard_Z = file
          }
          if (this.nameN === 'identityCard_F') {
            this.imgthing.identityCard_F = file
          }
          if (this.nameN === 'identityCard_S') {
            this.imgthing.identityCard_S = file
          }
          this.$emit('imgthing', this.imgthing)
        } else {
          this.$message.error('文件类型不正确,请重新上传！')
        }
      } else {
        this.$message.error('图片大小超过1M,请重新上传')
      }
    }
    },
    mounted: function() {
			let strs = sessionStorage.getItem("oo");
			this.names = JSON.parse(strs)
			console.log(ssssssssssssssssss)
			console.log(names);
			 
			
    },
  }

</script>


<style>

</style>