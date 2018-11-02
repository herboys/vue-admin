<template>
<div id="home">
	<div class="headBar">

		<div class="title" ><img src="@/assets/img/logo-gf.png"/> </div>
        
	<div class="menuDiv">
			<ul>
				<li v-for="(item,index) in name" :key="index">
					<a> 
						 <img class="img mm" style="margin-top:15px"  src="@/assets/img/banner2.png" height="30" width="30"/> 
                 
						<p>{{item.name}}</p>

					</a>
					<!--index1是索引 c是循环的数据 c.id循环数据的下的id-->
					<ul>
						<li v-for="(c,index1) in item.findMenuList" :key="index1"  >
            <!-- <el-button type="primary"   @click.native.prevent="handleLogins" > -->
                <router-link :to="c.url">
                {{c.name}}
                </router-link>
                 <!-- </el-button> -->
        
						</li>
           
					</ul>
				</li>

			</ul>

		</div>
       
  
	</div>
     <div class="qq"> <img class="mm" style="margin-right:112px ;" src="@/assets/img/banner2.png" height="30" width="30"/><div style="margin-left:-15px">退出登录</div></div>
  <div style="background-color:#F5F5F5"><router-view></router-view></div>
   </div>
</template>
<script type="text/ecmascript-6">
 import {requestHeadaermain ,departmentfindDepartment,rolefindRole,employeefind} from  '@/api/api';
  export default {
    name:'home',
  
    data(){
      return {

        name: '',
        //  page: {
          
        // pageNumber: '0', 
        //   pageSize: '5'
        // },
      }
    },
		mounted: function() {
			let str = sessionStorage.getItem("obj");
			this.name = JSON.parse(str)
			// console.log(0)
			console.log();
			 
			
    },
  }
</script>
<style scoped>
.qq{float: right;
margin-top:-62px ;

}
.mm{

 border-radius:100%;
  overflow:hidden;

}
	.el-menu-headBar {
		width: 80%;
		min-width: 950px;
		font-size: 12px;
		border-bottom: 1px #000000;
	}
	
	.headBar {
		width: 100%;
		height: 80px;
		display: flex;
		background-color:white;
        margin-top:-4px 
	}
	
	.title {
		background-color:white;
        /* margin-top:10px;  */
		color: #000;
		height: 100%;
		min-width: 200px;
		width: 200px;
        padding-left:30px;
        padding-right:60px;  
		display: flex;
		justify-content: center;
		align-items: center;
		letter-spacing: 5px;
		font-size: 17px;
	}

    /* -------------菜单css代码----------begin---------- */
    
    
    
    .menuDiv {
    
        border: 0px solid #aac;
    
        overflow: hidden;
    
        display: inline-block;
    
    }
    
    
    
    
    
    /* 去掉a标签的下划线 */
    
    
    
    .menuDiv a {
    
        text-decoration: none;
    
    }
    
    
    
    
    
    /* 设置ul和li的样式 */
    
    
    
    .menuDiv ul,
    
    .menuDiv li {
    
        list-style: none;
    
        margin: 0;
    
        padding: 0;
    
        float: left;
    
    }
    
    
    
    
    
    /* 设置二级菜单绝对定位，并隐藏 */
    
    
    
    .menuDiv>ul>li>ul {
    
        position: absolute;
    
        display: none;
    
    }
    
    
    
    
    
    /* 设置二级菜单的li的样式 */
    
    
    
    .menuDiv>ul>li>ul>li {
    
        float: none;
        z-index:999;
    
    }
    
    
    
    
    
    /* 鼠标放在一级菜单上，显示二级菜单 */
    
    
    
    .menuDiv>ul>li:hover ul {
    
        display: block;
         z-index:999;
    
    }
    
    
    
    
    
    /* 一级菜单 */
    
    
    
    .menuDiv>ul>li>a {
    
        width: 80px;
        height: 80px;
    
        line-height: 0px;
    
        color: black;
    
        background-color:white;
    
        text-align: center;
    
        border-left: 0px solid #bbf;
    
        display: block;
    
        overflow: hidden;
    
        white-space: nowrap;
        margin-right:3px 
    
    }
     .img{
         /* padding-top:15px;  */
     }
    
    
    
    
    
    /* 在一级菜单中，第一个不设置左边框 */
    
    
    
    .menuDiv>ul>li:first-child>a {
    
        border-left: none;
    
    }
    
    
    
    
    
    /* 在一级菜单中，鼠标放上去的样式 */
    
    
    
    .menuDiv>ul>li>a:hover {
    
        color: #333333;
    
        background-color:white;
    
    }
    
    
    
    
    
    /* 二级菜单 */
    
    
    
    .menuDiv>ul>li>ul>li>a {
    
        width: 120px;
    
        line-height: 36px;
    
        color: #456;
    
        background-color:white;
    
        text-align: center;
    
        border: 1px solid #ccc;
    
        border-top: none;
    
        display: block;
        font-size: 14px
    
    }
    
    
    
    
    
    /* 在二级菜单中，第一个设置顶边框 */
    
    
    
    .menuDiv>ul>li>ul>li:first-child>a {
    
        border-top: 1px solid #ccc;
    
    }
    
    
    
    
    
    /* 在二级菜单中，鼠标放上去的样式 */
    
    
    
    .menuDiv>ul>li>ul>li>a:hover {
    
        color:#333333;
    
        background-color: #cdf;
    
    }
    
    
    
    
    
    /* -------------菜单css代码----------end---------- */
    
    
    
    level-one {
    
        text-indent: 1em;
    
    }
    
    
    
    level-two {
    
        text-indent: 2em;
    
    }
    
    
    
    level-three {
    
        text-indent: 3em;
    
    }

</style>

 