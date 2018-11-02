<template>
	<div>

		<div style="background-color:#F5F5F5;">
			<section>
				<!--头部查询-->
				<el-row class="table-top">
					<el-col :span="24" class="grid-content bg-purple-light">
						<el-form :inline="true" class="mg-l-30">
							<el-form-item label="">
								<el-input clearable placeholder="请输入员工名称" v-model="filter.name"></el-input>
							</el-form-item>
							<el-form-item>
								<el-button  class="button-zeng" type="primary" @click="getUserList">搜索</el-button>
							</el-form-item>
							<el-form-item class="side">
								<el-button class="button-zeng" type="primary" @click="handleAdd">添加员工</el-button>
							</el-form-item>
								<el-form-item>
								<router-link :to="{path:'/plusemployeeManage'}">
									娃哈哈
								</router-link>
							</el-form-item>
						</el-form>
					</el-col>
				</el-row>
				<!--表格-->
				<el-table class="table_box" highlight-current-row :data="userList" border :row-class-name="tableRowClassName" style="width:100%;border:#E6E6E6">
					<!-- <el-table-column type="selection" width="55"></el-table-column>
					<el-table-column type="index" width="60" :index="typeIndex"></el-table-column> -->
				    <el-table-column  width="100" height="10" label="部门名称" prop="departmentName"></el-table-column>
					<el-table-column  width="180" height="10" label="入职时间" class="hide" prop="entryTime"></el-table-column>
					<el-table-column  width="120" label="手机号" prop="phone"></el-table-column>
                    <el-table-column  width="100" label="员工名称" prop="name"></el-table-column>
					<el-table-column  width="150" label="任职岗位" prop="roleName"></el-table-column>
                    <el-table-column label="家庭地址" prop="contactAddress"></el-table-column>
					<el-table-column label="员工编号" prop="employeeId"></el-table-column>
					<el-table-column  width="100" label="任职门店" prop="storeName"></el-table-column>
                    <el-table-column width="180" label="email" prop="email"></el-table-column>
					<el-table-column label="岗位状态" prop="status"></el-table-column>
					<el-table-column  width="200" label="操作">
						<template scope="scope">
							<el-button size="mini" @click="handleEdit(scope.$index,scope.row)">编辑</el-button>
							<el-button size="mini" type="danger" @click="delUserList(scope.$index,scope.row)">删除</el-button>
						</template>
					</el-table-column>
				</el-table>
				<el-row class="toobar" style="padding-right:100px;bottom:100px;position:fixed; right:0px">
					<el-col :span="24">
						<el-pagination background layout="prev, pager, next,jumper,total" :total="total" :page-count="pagecount" @current-change="handleCurrentChange" :page-size="5"></el-pagination>
					</el-col>
				
				</el-row>
				<!-- 新增弹出框 -->
				<el-dialog :visible.sync="dialogAddVisible" title="添加岗位" :close-on-click-modal="false">
					<el-form label-width="80px" :model="addForm" :rules="addFromRules" ref="addForm">
						<el-form-item label="员工编号" prop="employeeId">
							<el-input v-model="addForm.employeeId" auto-complete="off"></el-input>
						</el-form-item>
						 <el-form-item label="入职时间" >
                    <el-date-picker type="date" class="date-item" v-model="addForm.entryTime" value-format="yyyy-MM-dd"></el-date-picker>
                </el-form-item>
						<el-form-item label="员工名称" prop="employeeName">
							<el-input v-model="addForm.employeeName" auto-complete="off"></el-input>
						</el-form-item>
						<el-form-item label="手机号" prop="phone">
							<el-input v-model="addForm.phone" auto-complete="off"></el-input>
						</el-form-item>
						<el-form-item label="email" prop="email">
							<el-input v-model="addForm.email" auto-complete="off"></el-input>
						</el-form-item>

						<el-form-item label="家庭地址" prop="contactAddress">
							<el-input v-model="addForm.contactAddress" auto-complete="off"></el-input>
						</el-form-item>
						<!-- <el-form-item label="入职时间" prop="entryTime">
							<el-input v-model="addForm.entryTime" auto-complete="off"></el-input>
						</el-form-item> -->
	                    <el-autocomplete v-model="addForm.ccccc" :fetch-suggestions="querySearchAsync" placeholder="请输入区域"  @select="handleSelect" clearable>
                        <template slot-scope="{ item }">
                        </template>
                        </el-autocomplete> 
						 <el-autocomplete v-model="addForm.cccccs" :fetch-suggestions="querySearchAsyncs" placeholder="请输入部门"  @select="handleSelects" clearable>
                        <template slot-scope="{ items }">
                        </template>
                        </el-autocomplete> 
                        <el-select v-model="addForm.value" placeholder="请选择门店"  @click.native.prevent="ming()">
                        <el-option
                        v-for="item1 in areaNamesss"
                        :key="item1.value"
                        :label="item1.label"
                        :value="item1.value">
                        </el-option>
                        </el-select>
                        <el-select v-model="addForm.values" placeholder="请选择岗位"  @click.native.prevent="mings">
                        <el-option
                        v-for="item1 in areaNamess"
                        :key="item1.value"
                        :label="item1.label"
                        :value="item1.value">
                        </el-option>
                        </el-select>
						<el-form-item label="岗位状态" prop="status">
							<el-input v-model="addForm.status" auto-complete="off"></el-input>
						</el-form-item>
					</el-form>
					<div class="dialog-footer" slot="footer">
						<el-button @click="dialogAddVisible=false">取消</el-button>
						<el-button type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
					</div>
				</el-dialog>
				<!-- 编辑弹出框 -->
				<el-dialog :visible.sync="dialogEditVisible" title="编辑用户信息" :close-on-click-modal="false">
					<el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">
						
						<el-form-item label="员工编号" prop="employeeId">
							<el-input v-model="editForm.employeeId" auto-complete="off"></el-input>
						</el-form-item>
						<el-form-item label="岗位状态">
							<el-radio-group class="radio-sex" v-model="editForm.sex">
								<el-radio :label="0">启用</el-radio>
								<el-radio :label="1">停用</el-radio>
							</el-radio-group>
						</el-form-item>
						<el-form-item label="岗位名称" prop="name">
							<el-input v-model="editForm.name" auto-complete="off"></el-input>
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
<script>
	import { employeefind,employeeupdate,employeedelete ,employeeadd,requestHeadaermain,departmentfindDepartment,rolefindRole} from '@/api/api';
	import Vue from 'vue';
	export default {
		inject: ['reload'],
		data() {
			return {
				aa:[],
				bb:[],
				cc:[],
				userList: [],
				filter: {
					name: ''
				},
				total: 0,
				page: 1,
				loading: false,
				sels: [],
				//新增数据初始化
				dialogAddVisible: false,
				addLoading: false,
				addForm: {
					id: 0,
					name: '',
					entryTime: '',
					storeName:'',
				},
				addFromRules: {
					name: [{
						required: true,
						message: '请输入姓名',
						trigger: 'blur'
					}]
				},
				selected: [],
				//编辑数据初始化
				dialogEditVisible: false,
				editLoading: false,
				editForm: {
					id: 0,
					name: '',
					sex: -1,
					age: 0,
					birth: '',
					addr: '',
					province: '',
					city: '',
					country: ''
				},
				editFormRules: {
					name: [{
						required: true,
						message: '请输入姓名',
						trigger: 'blur'
					}]
				},
				 myVal:0 ,
        options:[
            // {
            //     name:'apple',
            //     value:0
            // },
            // {
            //     name:'banana',
            //     value:1
            // },
            // {
            //     name:'orange',
            //     value:2
            // },
        ]
			}
		},
		methods: {
			formatSex: function(row, column) {
				return row.sex == 1 ? '男' : row.sex == 0 ? '女' : '未知'
			},
			// 搜索
			getUserList() {
				let page = 1
				let para = {
					["page.pageNumber"]: (page - 1) * 5,
					["page.pageSize"]: 5,
					name: this.filter.name
				}
				employeefind(para).then(res => {
					let role = JSON.stringify(res.data);
					this.userList = JSON.parse(role)
					console.log(this.userList)
					this.total = JSON.stringify(res.total)
					this.pagecount = Math.ceil(JSON.stringify(res.total) / 5)
				});
			},
			// 分页
			handleCurrentChange(val) {
				this.pages = val;
				let page = this.pages
				let para = {
					["page.pageNumber"]: (page - 1) * 5,
					["page.pageSize"]: 5,
				}
			employeefind(para).then(res => {
					let role = JSON.stringify(res.data);
					this.userList = JSON.parse(role)
				});
			},
			// 删除
			delUserList(index, row) {
				this.$confirm('确认删除信息吗?', '提示', {
					type: 'warning'
				}).then(() => {
					this.loading = true
					let para = {
						id: row.employeeId
					}
					employeedelete(para).then((res) => {
						this.loading = false
						this.$message({
							type: 'success',
							message: '删除成功!'
						})
						this.getUserList()
					})
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					});
				})
			},
			handleAdd() {
				this.dialogAddVisible = true
				this.addForm = {
					name: '',
					sex: -1,
					age: 0,
					birth: '',
					addr: ''
				}
			},
			//新增
			addSubmit() {
				this.$refs.addForm.validate((valid) => {
					if(valid) {
						this.$confirm('确认提交信息吗', '提示', {
							type: 'warning'
						}).then(() => {
							this.addLoading = true
							var para = {
								employeeName: this.addForm.employeeName,//员工姓名
								 phone: this.addForm.phone,//员工电话
								 entryTime: this.addForm.entryTime,//入职时间
								// storeId: this.addForm.storeId,
								// roleId: this.addForm.roleId,
								// employeeName: this.addForm.employeeName,
								// departmentId: this.addForm.departmentId	,
									departmentId: this.aa,//任职门店
									
								   storeId: this.addForm.value	,//任职门店
								   roleId: this.addForm.values	,//任职岗位
							};
							console.log(para,'para')
							console.log(para)
							//  let para=Object.assign({},this.addForm)
							employeeadd(para).then((res) => {
								this.addLoading = false
								this.$message({
									type: 'success',
									message: '添加成功'
								})
								var para = {
									["page.pageNumber"]: 0,
									["page.pageSize"]: 5,
								};
								employeefind(para).then(res => {
									let role = JSON.stringify(res.data);
									this.userList = JSON.parse(role)
								});
								this.$refs['addForm'].resetFields();
								this.getUserList()
							})
						})
					}
				})
			},
			//显示编辑页面
			handleEdit(index, row) {
				console.log(row)
				this.dialogEditVisible = true
				this.editForm = Object.assign({}, row)
			},
			//修改
			editSubmit() {
				this.$refs.editForm.validate((valid) => {
					if(valid) {
						this.$confirm('确认提交信息吗？', '提示', {
							type: 'warning'
						}).then(() => {
							var para = {
								employeeId: this.editForm.employeeId,
								name: this.editForm.name,
								// status: this.editForm.sex,
							};
							console.log(para)
							employeeupdate(para).then((res) => {
								let {
									msg,
									code,
									token
								} = data;
								if(code == '00000000') {
									this.$message({
										message: msg,
										type: 'success'
									})
									this.$refs['editForm'].resetFields()
									this.getUserList()
								} else {
									this.$message({
										message: msg,
										type: 'error'
									});
								}
							})
							var para = {
								["page.pageNumber"]: 0,
								["page.pageSize"]: 5,
							};
							employeefind(para).then(res => {
								let role = JSON.stringify(res.data);
								this.userList = JSON.parse(role)
							});
							this.handleCurrentChange(val)
						})
					}
				})
			},
			handleSelectionChange(val) {
				console.log(val)
				this.sels = val
			},
			//批量删除用户信息
			batchDel() {
				var ids = this.sels.map(item => item.id).toString()
				this.$confirm('确认删除信息吗?', '提示', {
						type: 'warning'
					})
					.then(() => {
						this.loading = true
						let para = {
							ids: ids
						}
						batchUsers(para).then((res) => {
							this.loading = false
							this.$message({
								type: 'success',
								message: '批量删除成功'
							})
							this.getUserList()
						})
					}).catch(() => {})
			},



			//查询部门
	 querySearchAsyncs(queryString, cb) {
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
 departmentfindDepartment().then(data => {
    
   this.loadAl = data.data
    let correctAreaNames=[];
    let  createFilter=[];
    for(let i=0;i<this.loadAl.length;i++){
        correctAreaNames.push({id: this.loadAl[i].departmentId,value: this.loadAl[i].name})
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
          console.log(areaNames.value)
          console.log(areaNames.value)
          
        };
      },
      handleSelects(item1) {
		  
			this.aa=(item1.id)
			console.log(this.aa)
				 },
						 
						
						mings(){
					let paras = {
						departmentId:this.aa,
					}
					 departmentfindDepartment().then(data => {})
					rolefindRole(paras).then(res => {

						  this.loadAl = res.data
    let correctAreaNames=[];
    let  createFilter=[];
    for(let i=0;i<this.loadAl.length;i++){
        correctAreaNames.push({label: this.loadAl[i].name,value: this.loadAl[i].roleId})
    }
    this.areaNamess=correctAreaNames;
    let areaNamess = JSON.stringify( this.areaNamess);
    console.log(areaNamess)			
					})

			} ,




				 

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
 requestHeadaermain().then(data => {
    
   this.loadAl = data.data
    let correctAreaNames=[];
    let  createFilter=[];
    for(let i=0;i<this.loadAl.length;i++){
        correctAreaNames.push({id: this.loadAl[i].regionId,value: this.loadAl[i].regionName})
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
          console.log(areaNames.value)
          console.log(areaNames.value)
          
        };
      },
      handleSelect(item) {
			this.bb=(item.id)
			console.log(this.bb)
				 },

ming(){
					let paras = {
						regionId:this.bb,
					}
					
					requestHeadaermain(paras).then(res => {

						  this.loadAl = res.data
    let correctAreaNames=[];
    let  createFilter=[];
    for(let i=0;i<this.loadAl.length;i++){
        correctAreaNames.push({label: this.loadAl[i].name,value: this.loadAl[i].storeId})
    }
    this.areaNamesss=correctAreaNames;
    let areaNamesss = JSON.stringify( this.areaNamesss);
    console.log(areaNamesss)			
					})
			} ,
		},
		mounted() {
		
			// 刷新时以当前路由做为tab加入tabs    
			if(this.$route.path !== '/' && this.$route.path.indexOf('index') == -1) {
				// this.$store.commit('add_tabs', {
				// 	route: '/employeeManage',
				// 	name: '员工管理'
				// });
				// this.$store.commit('add_tabs', {
				// 	route: this.$route.path,
				// 	name: this.$route.name
				// });
				// this.$store.commit('set_active_index', this.$route.path);
				// this.$store.commit('save_index', this.$route.query.num);
			} else {
				// this.$store.commit('add_tabs', {
				// 	route: '/employeeManage',
				// 	name: '员工管理'
				// });
				this.$store.commit('set_active_index', '/');
				this.$router.push('/');
			}
			//刷新时当前路由为首页
			//  this.$store.commit('add_tabs', {route: '/', name: '首页'});
			//  this.$store.commit('set_active_index', '/');
			//  this.$router.push('/');
			//获取菜单
			let str = sessionStorage.getItem("obj");
			this.name = JSON.parse(str)
			// console.log(0)
			console.log();

		
			this.getUserList()
			var para = {
				["page.pageNumber"]: (page - 1) * 5,
				["page.pageSize"]: 5,
			};
			employeefind(para).then(res => {
				let role = JSON.stringify(res.data);
				this.total = JSON.stringify(res.total)
				console.log(this.total)
				this.page = Math.ceil(JSON.stringify(res.total) / 5)

				this.userList = JSON.parse(role)
			});

		},
		created() {
			this.userList()
		}
	}
</script>
<style <style lang="less">


.el-button--primary {
	background-color:#5E75E6;
	border: #5E75E6 ;
}
.button-zeng{
	padding: 10px 20px
}
.el-input__inner:focus{
	border:1px solid #5E75E6
}
.side{
	padding-right:43px;
	float:right;
	overflow: hidden;  
}
.el-input__inner{
	width: 130px;
	height: 34px;
}
.table-fixed {
  .el-table__fixed-right {
  height: 100% !important; 
  }
}
.el-pagination.is-background
 .el-pager li:not(.disabled).active{
background: #5E75E6
}
.el-pagination__jump {
	display: none !important;
}
.el-table .cell{
	height: 40px;
}
</style>