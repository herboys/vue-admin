import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import login from '@/views/login'
import home from '@/views/home/home'
// import TopNav from '@/views/home/TopNav/TopNav'
import table from '@/views/table/table'
import sidebar from "@/components/sidebar.vue";
import page from '@/views/page/page'
import page3 from '@/views/page/page3'
import storeManage from '@/views/page/storeManage'
import vroleaddRole from '@/views/homes/vroleaddRole'
import homes from '@/views/homes/homes'
import departmentManage from '@/views/page/departmentManage'
import roleManage from '@/views/page/roleManage'
import employeeManage from '@/views/page/employeeManage'
//plus
import plusemployeeManage from '@/views/plus/plusemployeeManage'
import plusroleManage from '@/views/plus/plusroleManage'
import plusstoreManage from '@/views/plus/plusstoreManage'
import plusdepartmentManage from '@/views/plus/plusdepartmentManage'


const Login = resolve => require(['@/views/login'], resolve)
Vue.use(Router)

const red = { template: '<div style="background-color:#de5b5b;color:#fff; font-size:30px;line-height:100px;text-align:center;">red页面</div>' }
const yellow = { template: '<div style="background-color:#dee066;color:#fff; font-size:30px;line-height:100px;text-align:center;">yellow页面</div>' }
const blue = { template: '<div style="background-color:#6680e0;color:#fff; font-size:30px;line-height:100px;text-align:center;">blue页面</div>' }
const customerFind = { template: '<div style="background-color:#6680e0;color:#fff; font-size:30px;line-height:100px;text-align:center;">customerFind</div>' }


export default new Router({
  
  routes: [
    {
      path: '/',
      name: 'login',
      component: login
    },
    {
      path: '/vroleaddRole',
      name: 'vroleaddRole',
      component: vroleaddRole
    },
    {
      path: '/home',
      name: 'home',
      component:home,
      // children:[
      //   { path: '/red', name: 'red', component: red,},
      //   { path: '/yellow', name: 'yellow', component: yellow,},
      //   { path: '/departmentManage', name: 'departmentManage', component: departmentManage,},
      //   { path: '/storeManage', name: 'storeManage', component: storeManage,},
      //   { path: '/roleManage', name: 'roleManage', component: roleManage,},
      //   { path: '/employeeManage', name: 'employeeManage', component: employeeManage,},
      // ] 
    },
    {
      path: '/sidebar',
      name: '首页',
      component: sidebar,
    },
    {
      path: '/homes',
      name: 'homes',
      component: homes,
      children:[
        { path: '/departmentManage', name: '部门管理', component: departmentManage,},
        { path: '/plusdepartmentManage', name: '新增部门', component: plusdepartmentManage,},
        { path: '/storeManage', name: '门店管理', component: storeManage,},
        { path: '/plusstoreManage', name: '新增门店', component: plusstoreManage,},
        { path: '/roleManage', name: '岗位管理', component: roleManage,},
        { path: '/plusroleManage', name: '新增岗位', component: plusroleManage,},
        { path: '/employeeManage', name: '员工管理', component: employeeManage,},
        { path: '/plusemployeeManage', name: '新增员工', component: plusemployeeManage,},
      ] 
      
    },
    {
      path: '/table',
      name: 'table',
      component: table
    },
    {
      path: '/HelloWorld',
      name: 'HelloWorld',
      component: HelloWorld
    },
    // {
    //   path: '/salesManage',
    //   name: 'salesManage',
    //   component: salesManage
    // }
  ]
})
