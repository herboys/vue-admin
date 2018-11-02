import axios from 'axios'

axios.defaults.baseURL = 'http://localhost';

let config = {transformRequest: data => {var str = [];
    for (var i in data) {
       str.push(
          encodeURIComponent(i) + "=" + encodeURIComponent(data[i])
        );
      }
    return str.join("&");
   
     }
  } 
//员工登录
export const requestLogin = params => {return axios.post('/employee/login', params, config).then(res => res.data)}

//添加员工
export const employeeadd = params => {return axios.post('/employee/add', params, config).then(res => res.data)}

//员工查询
export const employeefind = params => {return axios.post('/employee/find', params, config).then(res => res.data)}

//员工删除
export const employeedelete = params => {return axios.post('/employee/delete', params, config).then(res => res.data)}

//修改员工
export const employeeupdate = params => {return axios.post('/employee/update', params, config).then(res => res.data)}

//二级菜单
export const requestHeadaer = params => {return axios.post('/menu/find', params, config).then(res => res.data)}

//查询门店
export const requestHeadaermain = params => {return axios.post('/store/find', params, config).then(res => res.data)}

//添加门店
export const requeststore = params => {return axios.post('/store/add', params, config).then(res => res.data)}

//删除门店
export const requeststoredelete = params => {return axios.post('/store/delete', params, config).then(res => res.data)}

//修改门店
export const requeststoreupdate = params => {return axios.post('/store/update', params, config).then(res => res.data)}
//查询区域数据
export const requestregion = params => {return axios.post('/region/find', params, config).then(res => res.data)}

//查询部门信息
export const departmentfindDepartment = params => {return axios.get('/department/find',{params}, config).then(res => res.data)}

//添加部门
export const departmentaddDepartment = params => {return axios.post('/department/add', params, config).then(res => res.data)}

//删除部门
export const departmentdeleteDepartment = params => {return axios.get('/department/delete', {params}, config).then(res => res.data)}

//修改部门信息
export const departmentupdateDepartment = params => {return axios.get('/department/update', {params}, config).then(res => res.data)}

//查询岗位
export const rolefindRole  = params => {return axios.get('/role/find',{params}, config).then(res => res.data)}

//添加岗位
export const roleaddRole = params => {return axios.get('/role/add',{params}, config).then(res => res.data)}

//删除岗位
export const  roledeleteRole= params => {return axios.get('/role/delete', {params}, config).then(res => res.data)}

//修改岗位
export const  roleupdateRole= params => {return axios.post('/role/update', params, config).then(res => res.data)}

//查询功能记录
export const functionfind = params => {return axios.post('/function/find', params, config).then(res => res.data)}

