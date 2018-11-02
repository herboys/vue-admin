<template>


<div>
     
      <div>
        <section>
         <!--头部查询-->
        <el-row class="table-top">
            <el-col :span="24" class="grid-content bg-purple-light">
                <el-form :inline="true">
                    <el-form-item label="姓名">
                        <el-input placeholder="请输入姓名" v-model="filter.name"></el-input>
                    </el-form-item>
                    <!-- <el-form-item>
                        <el-button type="primary" @click="getUserList">查询</el-button>
                    </el-form-item> -->
                    <el-form-item>
                        <el-button type="primary" @click="handleAdd">新增</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
      <!--表格-->

        <!-- <el-table class="table_box" highlight-current-row :data="names" style="width:100%" v-loading="loading" @selection-change="handleSelectionChange"> -->
          <!-- <el-table class="table_box" highlight-current-row :data="userList" style="width:100%" v-loading="loading" @selection-change="handleSelectionChange"> -->
              <el-table class="table_box" highlight-current-row :data="names" border :row-class-name="tableRowClassName" style="width:100%" v-loading="loading" >
            <!-- <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column type="index" width="60" :index="typeIndex"></el-table-column> -->
            <el-table-column label="姓名"  prop="address"></el-table-column>
               <el-table-column label="姓名"  prop="description"></el-table-column>
                  <el-table-column label="姓名"  prop="name"></el-table-column>
                     <el-table-column label="姓名"  prop="phone"></el-table-column>
              <el-table-column label="姓名"  prop="photo"></el-table-column>
            <el-table-column label="操作">
                <template scope="scope">
                    <!-- <el-button size="mini" @click="handleEdit(scope.$index,scope.row)">编辑</el-button> -->
                    <el-button size="mini" type="danger" @click="delUserList(scope.$index,scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <!-- 分页 -->
       
        <!-- 新增 -->
        <el-dialog :visible.sync="dialogAddVisible" title="新增门店" :close-on-click-modal="false">
            <el-form  label-width="80px" :model="addForm" :rules="addFromRules" ref="addForm">
                <el-form-item  prop="name">
                   <p>门店名称（必填）</p>
                    <el-input v-model="addForm.name" auto-complete="off"></el-input>
                </el-form-item>       
 <el-autocomplete 
  v-model="addForm.ccccccc"
  :fetch-suggestions="querySearchAsync"
  placeholder="请输入内容"
  @select="handleSelect">
  <template  slot-scope="{ item }">
       <div>{{ item.value }}</div>
       <div>{{ item.id }} </div> 
     
  </template>
</el-autocomplete>    
            </el-form>
            <div class="dialog-footer" slot="footer">
                <el-button @click="dialogAddVisible=false">取消</el-button>
                <el-button type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
            </div>
        </el-dialog>
    </section>
      </div>
      </div>
</template>
<script>
  import {requestHeadaermain,requestregion,requeststore} from '@/api/api';
  export default {
    data() {
      return {
          Result:'',
          aaaa:'',
           restaurants: [],
         regionId:'',
        timeout:  null,
          houseNumberList:'',
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
             
              name:'',
              sex:-1,
              age:0,
              birth:'',
              addr:'',
              province:'',
              city:'',
              country:'',
              houseNumberList:''

          },
          addFromRules:{
              name:[
                  {required:true,message:'请输入门店名称',trigger:'blur'}
              ],
               regionId:[
                  {required:true,message:'请输入区域',trigger:'blur'}
              ]
          },
          selected:[],
          //编辑数据初始化
          dialogEditVisible:false,
          editLoading:false,
          editForm:{
              houseNumberList:'',
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
             //提交新增信息
     addSubmit(){
         this.$refs.addForm.validate((valid)=>{
             if(valid){
               
                 var xinzhengParams = { name: this.addForm.name,ccccccc:this.addForm.ccccccc};
                 console.log(xinzhengParams)
                   requeststore(xinzhengParams).then(data => {
              // console.log(loginParams);
              this.logining = false;
              let { msg, code, token } = data;
              if(code == '00000000'){
                this.$message({
                  message: msg,
                  type: 'success'
                  
                })
                // this.$router.push({ path: '/home' });
              }else{
                this.$message({
                  message: msg,
                  type: 'error'
                });
              }

            });
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
         changeShop(){
                this.namess.forEach(item=>{
                    if(this.selected === item.name){
                      this.ssssss = item.id;
                    }
                    console.log(ssssss)
                })
            },
        tableRowClassName({row, rowIndex}) {
        if (rowIndex === 1) {
          return 'warning-row';
        } else if (rowIndex === 3) {
          return 'success-row';
        }
        return '';
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
//删除页面
 delUserList(index,row){
         this.$confirm('确认删除信息吗?','提示',{
             type:'warning'
         }).then(()=>{
             this.loading=true
             let para={id:row.id}
             removeUser(para).then((res)=>{
                 this.loading=false
                 this.$message({
                    type: 'success',
                    message: '删除成功!'
                 })
                 this.getUserList()
             })
         }).catch(()=>{
            this.$message({
                type: 'info',
                message: '已取消删除'
            });
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



      querySearchAsync(queryString, cb) {
        let likeThis=this;
  let areaKey= {
    "Condition": {
      "LBLongitude": "",
      "LBLatitude": "",
      "RTLongitude": "",
      "RTLatitude": "",
      "Key": this.addForm.controlArea
    },
    "Page": 1,
    "Size": 2
  };
 requestregion().then(data => {
     console.log('AAAAAAAAAAAAAAAAAAAAAAAAAAA')
    console.log(data.data);
   this.loadAl = data.data
    let correctAreaNames=[];
    let  createFilter=[];
    for(let i=0;i<this.loadAl.length;i++){
        correctAreaNames.push({id: this.loadAl[i].id,value: this.loadAl[i].name})
    }
    likeThis.areaNames=correctAreaNames;
    let areaNames = likeThis.areaNames;
    console.log(areaNames)
    let results = queryString ? areaNames.filter(likeThis.createFilter(queryString)) : areaNames;
    // 调用 callback 返回建议列表的数据
    cb(results);createFilter
  });

      },
      createFilter(queryString) {
        return (areaNames) => {
          return (areaNames.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0 );
        };
      },
      handleSelect(item) {
             console.log(item)
          let aa= item.id
          let bb= item.value
          console.log(aa)
          console.log(bb)
        //   console.log(item)
        //  let regionId = item.id;
        // console.log(regionId)
      },
       handleIconClick(ev) {
        console.log(ev);
      }
    },
    mounted: function() {
        
			let strs = sessionStorage.getItem("objs");
            this.names = JSON.parse(strs)
			let strss = sessionStorage.getItem("objss");
            this.namess = JSON.parse(strss)
			
	
			 
			
    },
  }

</script>


<style>
.el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }
</style>