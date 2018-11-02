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
								<el-button type="primary" @click="handleAdd">新增岗位</el-button>
							</el-form-item>
															<el-form-item>
								<router-link :to="{path:'/plusroleManage'}">
									娃哈哈
								</router-link>
							</el-form-item>
						</el-form>
					</el-col>
				</el-row>
				<!--表格-->
				<el-table class="table_box" highlight-current-row :data="userList" border :row-class-name="tableRowClassName" style="width:100%">
					<!-- <el-table-column type="selection" width="55"></el-table-column>
					<el-table-column type="index" width="60" :index="typeIndex"></el-table-column> -->
					<el-table-column label="岗位编号" prop="roleId"></el-table-column>
					<el-table-column label="岗位名称" prop="name"></el-table-column>
					<el-table-column label="部门编号" prop="departmentId"></el-table-column>
					<el-table-column label="部门名称" prop="department"></el-table-column>
					<el-table-column label="岗位状态" prop="status"></el-table-column>
					<el-table-column label="操作">
						<template scope="scope">
							<el-button size="mini" @click="handleEdit(scope.$index,scope.row)">编辑</el-button>
							<el-button size="mini" type="danger" @click="delUserList(scope.$index,scope.row)">是否启用</el-button>
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
				<el-dialog :visible.sync="dialogAddVisible" :close-on-click-modal="false">
					<div class="e">www</div>
					<div class="dialog-main">
						<div class="c">
							<el-form label-width="80px" class="a" :model="addForm" :rules="addFromRules" ref="addForm">
								<p>所选部门</p>
								<el-select v-model="addForm.values" placeholder="请选择部门" clearable @click.native.prevent="mings()">
									<el-option v-for="item1 in areaNamess" :key="item1.value" :label="item1.label" :value="item1.value">
									</el-option>
								</el-select>
								<el-form-item class="b" prop="name">
									<p>岗位名称</p>
									<el-input v-model="addForm.name" auto-complete="off"></el-input>
								</el-form-item>

							</el-form>
							<!-- <div style="">分配权限</div>
						<vroleaddRole></vroleaddRole> -->
						</div>
						<div style="">分配权限</div>
						<div class="f">

							<div style="border:1px solid#ddd">
								<ul>
									<li v-for="(item,index) in dataList" :key="index">
										<a>
											<div class="line "></div>
											<el-checkbox style="color:red" v-model="checked">{{item.name}}
											</el-checkbox>
											<ul>
													<!--二级菜单-->
												<li class="www" v-for="(c,index1) in item.findMenuList" :key="index1">
													<el-checkbox style="color:red" v-model="checked">
														{{c.name}}
													</el-checkbox>
													<!--功能-->
													<ul>
														<li v-for="(item,index) in dataL" :key="index">
															<ul>
																<li class="wwww" v-for="(d,index1) in item.functionList" :key="index1">
																	<el-checkbox style="color:blue" v-model="checked">
																		<a>
																			{{d.name}}
																		</a>
																	</el-checkbox>

																</li>
															</ul>
														</li>
													</ul>
												</li>

											</ul>
											<div class="line "></div>
										</a>

									</li>
								</ul>
							</div>
						</div>
					</div>
					<div class="dialog-footer" slot="footer">
						<el-button @click="dialogAddVisible=false">取消保存</el-button>
						<el-button type="primary" @click.native="addSubmit" :loading="addLoading">保存</el-button>
					</div>

				</el-dialog>
				<!-- 编辑弹出框 -->
				<el-dialog :visible.sync="dialogEditVisible" title="编辑用户信息" :close-on-click-modal="false">
					<el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">
						<el-form-item label="岗位编号" prop="roleId">
							<el-input v-model="editForm.roleId" auto-complete="off"></el-input>
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
	import { rolefindRole, roleaddRole, roledeleteRole, roleupdateRole, departmentfindDepartment, requestHeadaer, functionfind } from '@/api/api';
	import Vue from 'vue';
	import vroleaddRole from '@/views/homes/vroleaddRole'
	const cityOptions = ['上海', '北京', '广州', '深圳'];
	export default {
		inject: ['reload'],
		components: {
			vroleaddRole
		},
		data() {
			return {
				emails: {},
				checkAll: false,
				checkedCities: [],
				cities: cityOptions,
				isIndeterminate: true,
				value: '',
				    selVal: '',
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
					sex: -1,
					age: 0,
					birth: '',
					addr: '',
					province: '',
					city: '',
					country: ''
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
				}
			}
		},
		methods: {

			handleCheckAllChange(val) {
				this.checkedCities = val ? cityOptions : [];
				this.isIndeterminate = false;
			},
			handleCheckedCitiesChange(value) {
				let checkedCount = value.length;
				this.checkAll = checkedCount === this.cities.length;
				this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
			},

			mings() {

			},
			formatSex: function(row, column) {
				return row.sex == 1 ? '男' : row.sex == 0 ? '女' : '未知'
			},
			getUserList() {
				let page = 1
				let para = {
					["page.pageNumber"]: (page - 1) * 5,
					["page.pageSize"]: 5,
					name: this.filter.name
				}
				rolefindRole(para).then(res => {
					let role = JSON.stringify(res.data);
					this.userList = JSON.parse(role)
					console.log(this.userList)
					this.total = JSON.stringify(res.total)
					this.pagecount = Math.ceil(JSON.stringify(res.total) / 5)
				});
			},
			handleCurrentChange(val) {
				this.pages = val;
				let page = this.pages
				let para = {
					["page.pageNumber"]: (page - 1) * 5,
					["page.pageSize"]: 5,
				}
				rolefindRole(para).then(res => {
					let role = JSON.stringify(res.data);
					this.userList = JSON.parse(role)
				});
			},
			delUserList(index, row) {
				this.$confirm('确认删除信息吗?', '提示', {
					type: 'warning'
				}).then(() => {
					this.loading = true
					let para = {
						id: row.id
					}
					removeUser(para).then((res) => {
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
			//显示新增页面
			handleAdd() {
				this.dialogAddVisible = true
				this.addForm = {
					name: '',
					sex: -1,
					age: 0,
					birth: '',
					addr: ''
				}
				let paras = {
					status: 0,
				}
				departmentfindDepartment(paras).then(res => {
					this.loadAl = res.data
					console.log(this.loadAl, 'sssssssssssss')
					let correctAreaNames = [];
					let createFilter = [];
					for(let i = 0; i < this.loadAl.length; i++) {
						correctAreaNames.push({
							label: this.loadAl[i].name,
							value: this.loadAl[i].departmentId
						})
					}
					this.areaNamess = correctAreaNames;
					let areaNamess = JSON.stringify(this.areaNamess);
					console.log(areaNamess)
				})

				requestHeadaer().then(data => {
					this.lo = data.data
					let str = JSON.stringify(data.data);
					this.dataList = JSON.parse(str)
					let correct = [];
					let Filter = [];
					let min = [];
					let twomun =[];
					for(let i = 0; i < this.lo.length; i++) {
						for(let j = 0; j < this.lo.length; j++) {
							min.push(this.lo[i].findMenuList[j])
						}
					}
					this.area = (min);
					sessionStorage.objz = JSON.stringify(min);
					for(let i = 0; i < this.area.length; i++) {
						if(this.area[i] != null) {
							Filter.push(this.area[i].id)
							twomun.push(this.area[i].id)
						}
					}
					console.log(twomun,'VVVVVVVVVVVVVVVVVVVVVVVV')
					this.Namess = (Filter);
					var ee=this.Namess
					var ss = {
						menuList: this.Namess
					};
					functionfind(ss).then(data => {
					
					    this.gong=(data.data)//功能下的所有数据
					    console.log(this.gong,'wwww')
						let mun=[];
						let munn=[];
						let qwe=[];
						let mm =JSON.stringify(ee)
						this.mm =mm
						console.log(this.mm,'id')//二级菜单下的所有id
						//下面是判断二级菜单id 与 功能下的id进行对比 
						for(let i = 0; i < this.gong.length; i++) {
							mun.push(this.gong[i].menuId)
						for(let j = 0; j < this.mm.length; j++) {
						
					 		 if(mm[j]==mun[i]){
							  qwe.push(this.gong[i].functionList)
							  }
					 	 }
					 }
					 this.dataLi=(qwe)
					
					console.log(mun,'menuId')
					console.log(this.dataLi,'name')
					let nn=[];
					 for(let i = 0; i < this.dataLi.length; i++) {
					          nn.push({functionList:this.dataLi[i]})
					 }
					 this.dataL= (nn)
					 console.log(this.dataL,'NNNNNNNNNNNNN')
				    	 
					
					});
	

				});
			
			},
			//提交新增信息
			addSubmit() {
				this.$refs.addForm.validate((valid) => {
					if(valid) {
						this.$confirm('确认提交信息吗', '提示', {
							type: 'warning'
						}).then(() => {
							this.addLoading = true
							var para = {
								name: this.addForm.name,
								departmentId: this.addForm.values,
							};
							console.log(para, 'ssss')
							roleaddRole(para).then((res) => {

								this.addLoading = false
								this.$message({
									type: 'success',
									message: '添加成功'
								})
								var para = {
									["page.pageNumber"]: 0,
									["page.pageSize"]: 5,
								};
								rolefindRole(para).then(res => {
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
			//提交编辑信息
			editSubmit() {
				this.$refs.editForm.validate((valid) => {
					if(valid) {
						this.$confirm('确认提交信息吗？', '提示', {
							type: 'warning'
						}).then(() => {
							var para = {
								roleId: this.editForm.roleId,
								name: this.editForm.name,
								status: this.editForm.sex,
							};
							console.log(para)
							roleupdateRole(para).then((res) => {
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
							rolefindRole(para).then(res => {
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
			}
		},
		mounted() {

			this.getUserList()
			var para = {
				["page.pageNumber"]: (page - 1) * 5,
				["page.pageSize"]: 5,
			};
			rolefindRole(para).then(res => {
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
	.fl {
		float: left;
	}
	
	.www {
		padding-left: 105px;
		padding-top: 15px;
	}
	
	.wwww {
		padding-left: 85px;
		padding-top: 15px;
		color: #337ab7;
		display: inline-block
	}
	
	.f {
		position: absolute;
		top: 35%;
		left: 116px;
		right: 10px;
		width: 100%;
		height: 400px;
		overflow-y: auto;
	}
	
	.dialog-main {
		display: inline-block;
		margin-left: 0px
	}
	
	.a {
		display: inline-block;
	}
	
	.b {
		display: inline-block;
	}
	
	.c {
		display: table;
		/* 调教webkit*/
		word-spacing: -1em;
		/*其他浏览器*/
	}
	
	.e {
		display: inline-block;
		width: 100px;
		height: 200px;
		background: red;
	}
	/* 分页 */
	
	.page-bar {
		margin: 40px;
	}
	
	ul,
	li {
		margin: 0px;
		padding: 0px;
	}
	
	li {
		list-style: none
	}
	
	.page-bar li:first-child>a {
		margin-left: 0px
	}
	
	.page-bar a {
		border: 1px solid #ddd;
		text-decoration: none;
		position: relative;
		float: left;
		padding: 6px 12px;
		margin-left: -1px;
		line-height: 1.42857143;
		color: #337ab7;
		cursor: pointer
	}
	
	.page-bar a:hover {
		background-color: #eee;
	}
	
	.page-bar a.banclick {
		cursor: not-allowed;
	}
	
	.page-bar .active a {
		color: #fff;
		cursor: default;
		background-color: #337ab7;
		border-color: #337ab7;
	}
	
	.page-bar i {
		font-style: normal;
		color: #d44950;
		margin: 0px 4px;
		font-size: 12px;
	}
	
	.el-dialog__footer {
		text-align: left;
		padding-top: 130px;
	}
	
	.el-button {
		display: flex;
	}
	
	.el-input__inner {
		width: 184px;
	}
	
	.el-dialog__body {
		margin-left: 0px
	}
	
	.role-table {
		border: 1px solid #e0e0e0;
		border-bottom: none;
		padding: 0;
		position: relative;
	}
	
	.header {
		height: 40px;
		line-height: 40px;
		border-bottom: 1px solid #e7e7e7;
		background: #F8F8F9;
		text-align: center;
	}
	
	.vertical-line {
		width: 1px;
		height: 100%;
		background: #ddd;
		position: absolute;
		left: 150px;
	}
	
	.left {
		display: inline-block;
		position: relative;
		width: 100px;
		padding-left: 10px;
		user-select: none;
		cursor: pointer;
	}
	
	.ones {
		padding-left: 20px;
	}
	
	.right {
		display: inline-block;
		position: absolute;
		width: 100%;
		/* position: absolute; */
		/* float: left; */
		left: 160PX;
		overflow: hidden;
	}
	
	.item-icon {
		margin-left: -5px;
		padding: 5px;
	}
	
	.line {
		clear: both;
		width: 100%;
		height: 1px;
		background: #e0e0e0;
	}
	
	.h40 {
		height: 200px;
		line-height: 39px;
	}
	
	[v-cloak] {
		display: none;
	}
	
	.shu {
		position: relative;
	}
	
	.one {
		display: inline-block;
	}
</style>