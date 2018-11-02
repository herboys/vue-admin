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
								<el-button type="primary" @click="handleAdd">新增门店</el-button>
							</el-form-item>
																	<el-form-item>
								<router-link :to="{path:'/plusstoreManage'}">
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
				<el-table-column label="门店名称" prop="name"></el-table-column>
					<el-table-column label="区域编号" prop="regionName"></el-table-column>
					<el-table-column label="地址" prop="address"></el-table-column>
                    <el-table-column label="门头照" prop="photo"></el-table-column>
					<el-table-column label="电话" prop="phone"></el-table-column>
                    <el-table-column label="备注" prop="description"></el-table-column>
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
						<el-form-item label="门店名称" prop="name">
							<el-input v-model="addForm.name" auto-complete="off"></el-input>
						</el-form-item>

					<el-autocomplete v-model="addForm.ccccc" :fetch-suggestions="querySearchAsync" placeholder="请输入内容"  @select="handleSelect">
                        <template slot-scope="{ item }">
                            <div>{{ item.value }}</div>
                                 <!-- <span>{{ item.id }}</span>  -->
                        </template>
                    </el-autocomplete>
						 
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
						<el-form-item label="门店名称" prop="name">
							<el-input v-model="editForm.name" auto-complete="off"></el-input>
						</el-form-item>
						
						<el-form-item label="门店编号" prop="storeId">
							<el-input v-model="editForm.storeId" auto-complete="off"></el-input>
						</el-form-item>
						<el-autocomplete v-model="editForm.ccccc" :fetch-suggestions="querySearchAsync" placeholder="请输入内容"  @select="handleSelect">
                        <template slot-scope="{ item }">
                            <div>{{ item.value }}</div>
                                 <span>{{ item.id }}</span> 
                        </template>
                    </el-autocomplete>
						<!-- 缺失区域编号 -->
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
 import {requestHeadaermain,requestregion,requeststore,requeststoredelete,requeststoreupdate} from '@/api/api';
	import Vue from 'vue';
	export default {
		inject: ['reload'],
		data() {
			return {
					bb:[],
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
				}
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
					storeName: this.filter.name
				}
				requestHeadaermain(para).then(res => {
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
			requestHeadaermain(para).then(res => {
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
						id: row.storeId
					}
					requeststoredelete(para).then((res) => {
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
								name: this.addForm.name,
								

								regionId:this.bb
									
							};
							//  let para=Object.assign({},this.addForm)
							requeststore(para).then((res) => {
								this.addLoading = false
								this.$message({
									type: 'success',
									message: '添加成功'
								})
								var para = {
									["page.pageNumber"]: 0,
									["page.pageSize"]: 5,
								};
								requestHeadaermain(para).then(res => {
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
								id: this.editForm.storeId,
								name: this.editForm.name,
								regionId:this.bb
							};
							console.log(para)
							requeststoreupdate(para).then((res) => {
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
							requestHeadaermain(para).then(res => {
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
			requestHeadaermain(para).then(res => {
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