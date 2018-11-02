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
								<el-button type="primary" @click="handleAdd">添加部门</el-button>
							</el-form-item>
															<el-form-item>
								<router-link :to="{path:'/plusdepartmentManage'}">
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
					<el-table-column label="部门编号" prop="departmentId"></el-table-column>
					<el-table-column label="部门名称" prop="name"></el-table-column>
					<el-table-column label="部门描述" prop="description"></el-table-column>
					<el-table-column label="部门状态" prop="status"></el-table-column>
					<!-- <el-table-column label="岗位状态" prop="status"></el-table-column> -->
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
				<el-dialog :visible.sync="dialogAddVisible" title="添加部门" :close-on-click-modal="false">
					<el-form label-width="80px" :model="addForm" :rules="addFromRules" ref="addForm">
						<el-form-item label="部门名字" prop="name">
							<el-input v-model="addForm.name" auto-complete="off"></el-input>
						</el-form-item>
						<el-form-item label="部门编号" prop="departmentId">
							<el-input v-model="addForm.departmentId" auto-complete="off"></el-input>
						</el-form-item>
						<el-form-item label="部门描述" prop="description">
							<el-input v-model="addForm.description" auto-complete="off"></el-input>
						</el-form-item>
						<el-form-item label="部门状态">
							<el-radio-group class="radio-sex" v-model="addForm.sex">
								<el-radio :label="0">启用</el-radio>
								<el-radio :label="1">停用</el-radio>
							</el-radio-group>
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
						<el-form-item label="部门编号" prop="departmentId">
							<el-input v-model="editForm.departmentId" auto-complete="off"></el-input>
						</el-form-item>
						<el-form-item label="部门状态">
							<el-radio-group class="radio-sex" v-model="editForm.sex">
								<el-radio :label="0">启用</el-radio>
								<el-radio :label="1">停用</el-radio>
							</el-radio-group>
						</el-form-item>

						<el-form-item label="部门名称" prop="name">
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
	import { departmentfindDepartment,departmentaddDepartment,departmentupdateDepartment,departmentdeleteDepartment} from '@/api/api';
	import Vue from 'vue';
	export default {
		inject: ['reload'],
		data() {
			return {
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
				departmentfindDepartment(para).then(res => {
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
				departmentfindDepartment(para).then(res => {
					let role = JSON.stringify(res.data);
					this.userList = JSON.parse(role)
				});
			},
			delUserList(index, row) {
				this.$confirm('确认删除信息吗?', '提示', {
					type: 'warning'
				}).then(() => {
					let para = {
						departmentId: row.departmentId,
					}
					departmentdeleteDepartment(para).then((res) => {
						
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
								tatus: this.addForm.sex,
							};
							departmentaddDepartment(para).then((res) => {
								this.addLoading = false
								this.$message({
									type: 'success',
									message: '添加成功'
								})
								var para = {
									["page.pageNumber"]: 0,
									["page.pageSize"]: 5,
								};
								departmentfindDepartment(para).then(res => {
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
								departmentId: this.editForm.departmentId,
								name: this.editForm.name,
								status: this.editForm.sex,
							};
							console.log(para)
							departmentupdateDepartment(para).then((res) => {
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
							departmentfindDepartment(para).then(res => {
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
			departmentfindDepartment(para).then(res => {
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