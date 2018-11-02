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
				<el-table class="table_box" highlight-current-row :data="userList" border :row-class-name="tableRowClassName" style="width:100%">
					<!-- <el-table-column type="selection" width="55"></el-table-column>
					<el-table-column type="index" width="60" :index="typeIndex"></el-table-column> -->
				<el-table-column label="部门名称" prop="departmentName"></el-table-column>
					<el-table-column label="入职时间" prop="entryTime"></el-table-column>
					<el-table-column label="手机号" prop="phone"></el-table-column>
                    <el-table-column label="员工名称" prop="name"></el-table-column>
					<el-table-column label="任职岗位" prop="roleName"></el-table-column>
                    <el-table-column label="家庭地址" prop="contactAddress"></el-table-column>
					<el-table-column label="员工编号" prop="employeeId"></el-table-column>
					<el-table-column label="任职门店" prop="storeName"></el-table-column>
                    <el-table-column label="email" prop="email"></el-table-column>
					<el-table-column label="岗位状态" prop="status"></el-table-column>
					<el-table-column label="操作">
						<template scope="scope">
							<el-button size="mini" @click="handleEdit(scope.$index,scope.row)">编辑</el-button>
							<el-button size="mini" type="danger" @click="delUserList(scope.$index,scope.row)">删除</el-button>
						</template>
					</el-table-column>
				</el-table>
				<el-row class="toobar">
					<el-col :span="24">
						<el-button type="danger" :span="6" class="dels" @click="batchDel" :disabled="this.sels.length===0">批量删除</el-button>
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
                    <el-date-picker type="date" class="date-item" v-model="addForm.entryTime" value-format="yyyy/MM/dd"></el-date-picker>
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
						<!-- <el-form-item label="任职门店" prop="roleId">
							<el-input v-model="addForm.roleId" auto-complete="off"></el-input>
						</el-form-item> -->
	                    <el-autocomplete v-model="addForm.ccccc" :fetch-suggestions="querySearchAsync" placeholder="请输入内容"  @select="handleSelect">
                        <template slot-scope="{ item }">
                        <!-- <div>{{ item.value }}</div>  -->
                        </template>
                        </el-autocomplete> 

                        <el-select v-model="addForm.value" placeholders="请选择门店"  @click.native.prevent="ming">
                        <el-option
                        v-for="item1 in areaNames"
                        :key="item1.value"
                        :label="item1.label"
                        :value="item1.value">
                        </el-option>
                        </el-select>



						<el-form-item label="任职岗位" prop="storeId	">
							<el-input v-model="addForm.storeId	" auto-complete="off"></el-input>
						</el-form-item>
						<el-form-item label="部门名称" prop="departmentId">
							<el-input v-model="addForm.departmentId" auto-complete="off"></el-input>
						</el-form-item>
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
	import { employeefind,employeeupdate,employeedelete ,employeeadd,requestHeadaermain,departmentfindDepartment} from '@/api/api';
	import Vue from 'vue';
	export default {
		inject: ['reload'],
		data() {
			return {
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
    this.areaNames=correctAreaNames;
    let areaNames = JSON.stringify( this.areaNames);
    console.log(areaNames)
					
							
					})

			} ,




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
								// employeeName: this.addForm.employeeName,
								// phone: this.addForm.phone,
								// // entryTime: this.addForm.entryTime,
								// storeId: this.addForm.storeId,
								// roleId: this.addForm.roleId,
								// employeeName: this.addForm.employeeName,
								// departmentId: this.addForm.departmentId	,
								departmentId: this.addForm.value	,
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



			//查询区域
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
		},




		mounted() {
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
<style>