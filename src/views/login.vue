<template>
<div>
 <div class="login-wrap">
    <div class="ms-login">
        <div style="height:460px;width: 400px ;border-top-left-radius: 10px;border-bottom-left-radius: 10px; background:#5e75e6">
          <div style="text-align: center">
            <div style="padding-top: 110px"><img src="../assets/logo.png"/></div>
            <div  style="padding-top: 108px;color: white"><img src="../assets/Slogan.png"/></div>
          </div>
        </div>
        <div class="ms-title">
          <div class="cl-main font-size-40 pa-t-50">国房管理系统</div>
         <!-- <i class="iconfont icon-icon_yuechi "></i>
         <el-button type="primary" icon="iconfont icon-icon_yuechi ">搜索</el-button>
        <img src="../views/icon1.svg" height="30" width="30"> -->
        <el-form  :model="account" :rules="rules" ref="AccountFrom" label-width="0px" class="ms-content mg-t-46">

          <el-form-item prop="employeeAccount" >
            <el-input
              
              placeholder="请输入账号" 
              v-model="account.employeeAccount"
              prefix-icon="iconfont icon-icon_S-wuye cl-main pd-rg-10"
              clearable>
            </el-input>
          </el-form-item>
          <el-form-item prop="password">

            <el-input
            
             @keyup.enter.native="handleLogin"
                      type="password"
                      class="el-input ww"
                      placeholder="请输入密码"
                      v-model="account.password"
                       prefix-icon="iconfont icon-icon_yuechi cl-main pd-rg-10"
                      clearable>
            </el-input>
          </el-form-item>
          <div  style="margin-top: -20px">
            <el-checkbox v-model="checked">记住密码</el-checkbox>
            <router-link to="/forget">
              <a class="el-register">忘记密码</a>
            </router-link>
          </div>
          <div class="login-btn">
            <el-button type="primary" class="cl-main" style="width:100%;background:white !important;"  @click.native.prevent="handleLogin" :loading="logining" >登录</el-button>
          </div>
         
        </el-form>
         <div class="Register">
          <router-link class="Register" to="/Register">
           没有账号？免费注册
          </router-link>
          </div>
      </div>
  </div>
<div class="qwe">  国房网络科技</div>
</div>

</div>

</template>
<script>
  import {requestLogin, requestHeadaermain,requestHeadaer,} from '@/api/api';
  export default {
    data() {
      return {
        name: '',

       
        logining: false,
        account: {
          
          employeeAccount: 'admin',
          password: '123456'
        },
        rules: {
        

           employeeAccount: [
            {required: true, message: '请输入账号', trigger: 'blur'},
            { min: 1, max: 20, message: '长度在 1 到20个字符', trigger: 'blur' }


          ],

          password: [
            {required: true, message: '请输入密码', trigger: 'blur'},
            { min: 1, max: 20, message: '长度在 1 到20个字符', trigger: 'blur' }


          ]
        },
        checked: true
      };
    },
    methods: {
      handleLogin() {
        this.$refs.AccountFrom.validate((valid) => {
          if (valid) {
            this.logining = true;
            var loginParams = { employeeAccount: this.account.employeeAccount, password: this.account.password };
            requestLogin(loginParams).then(data => {
              // console.log(loginParams);
              this.logining = false;
              let { msg, code, token } = data;
              if(code == '00000000'){
                this.$message({
                  message: msg,
                  type: 'success'
                  
                })
                this.$router.push({ path: '/sidebar' });
              }else{
                this.$message({
                  message: msg,
                  type: 'error'
                });
              }

            });
            requestHeadaer().then(data => {

              sessionStorage.obj = JSON.stringify(data.data);
            });

          }
          else {
            console.log('error submit!!');
            return false;
          }
        });
      }
    }
  }

</script>


<style >

.qwe{
  z-index: 99;
  color: #999999;
  position: absolute;
  top: 95%;
left: 47%;
}
.ww{
  border: 0px
}
 @import '../assets/css/login';
 html{
   width: 100%;
   height: 100%;
    background: url('../assets/bj.jpg') center center no-repeat;
        background-position: center center;
    background-attachment: fixed;
    background-size: cover;
    position: relative;
 }
 .login-wrap{
  
    
    background-size: 100%;
    border: 0px;  
    width: 100%;
    height:100%
  /* overflow: hidden; */
}  
  

  .ms-login{
    position: absolute;
    left:43%;
    top:38%;
    width:800px;
     margin:-190px 0 0 -300px;
    border-radius: 5px;
    background: rgba(255,255,255, 0.3);
    overflow: hidden;
    background:white;border-radius: 10px; 
 
  }
    .ms-title{
      /* background-color: burlywood; */
      margin-left:400px; 
    width:100%;
    line-height: 50px;
    text-align: center;
    font-size:20px;
    height: 460px;
    width: 400px;
    /* color: #fff; */
    border-bottom: 1px solid #ddd;
    position: absolute;
    margin-top: -460px;
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px 
  }
  .ms-content{
    border-top: 0px;
    margin-left: 85px;
    width: 230px;
  }
  .login-btn{
    text-align: center;
  }
  .login-btn button{
    width:220px;;
    height:36px;
    margin-bottom: 10px;
  }
  .el-register{
    margin-left: 75px;
    font-size: 14px;
  }
  .el-input{
    height: 40px !important;
    padding-top: -30px !important;

  }
  .Register{
  margin-top: 50px;
  background-color: #F5F5F5;
  color: #333333 !important;
}
  a{
    color:#999999;
    text-align: center;
    font-size:14px ;
    padding-top: -50px;
  }

.el-checkbox__label {
     color:#999999;
}
.el-checkbox
  .el-checkbox__input.is-checked+.el-checkbox__label{
   
    color:#5e75e6;
  }
  .el-checkbox__input.is-checked .el-checkbox__inner, .el-checkbox__input.is-indeterminate .el-checkbox__inner{
    background:#5e75e6;
    color: #5e75e6;
  }
  .el-checkbox__input.is-checked .el-checkbox__inner, .el-checkbox__input.is-indeterminate .el-checkbox__inner{
    border:#5e75e6 ;
  }
  .el-input--prefix .el-input__inner{
    padding-left: 38px; 
  } 
  
.el-button--primary{
border-color: #5E75E6 !important 
}
.el-input__inner {
    border: 0px !important;
    border-bottom: 1px solid #dcdfe6 !important;
    border-radius:0px 
}
.el-input__inner:focus{
  border: 0px !important;
    border-bottom: 1px solid #5E75E6 !important;
    border-radius:0px 

}
</style>